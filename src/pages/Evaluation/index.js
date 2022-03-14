/* eslint-disable array-callback-return */
import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Scores from "../../components/Evaluation/scores";
import TranscriptEditor from "../../components/callGraph/transcript-editor";
import transcriptFile from "../../components/callGraph/transcript-editor/bbc-kaldi.json";
import TabContext from "@mui/lab/TabContext/TabContext";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import TextField from "@mui/material/TextField/TextField";
import searchIcon from "../../assest/icon/SearchIcon.svg";
import TabPanel from "@mui/lab/TabPanel/TabPanel";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import { styled, tableCellClasses } from "@mui/material";
import TableCell from "@mui/material/TableCell/TableCell";
import Header from "../../components/callGraph/transcript-editor/src/Header";
import MediaPlayer from "../../components/callGraph/media-player";
import VideoPlayer from "../../components/callGraph/video-player";
import { secondsToTimecode } from "../../components/callGraph/util/timecode-converter";
import { viewPlayer } from "../../actions";
import { IconButton, InputAdornment } from "@mui/material";
import { getRectangleColor } from "../../utils/comman";
import Headers from "../../components/Header";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
}));

const headerTabs = {
  "&.Mui-selected": {
    background: "red",
  },
  "& .indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "white",
    "& > span": {
      maxWidth: 42,
      width: "100%",
      backgroundColor: "#1976d2",
    },
  },
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#F7F7F7",
    color: "#262626",
    fontWeight: "bold",
    borderBottom: "unset",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    color: "#262626",
    borderBottom: "unset",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(even)": {
    backgroundColor: "#F5F8FA",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

class Evaluation extends React.Component {
  constructor(props) {
    super(props);
    window.scrollTo(0, 0);
    this.videoRef = React.createRef();
    this.state = {
      currentTime: 0,
      transcriptData: transcriptFile,
      mediaUrl: "",
      isTextEditable: true,
      spellCheck: false,
      sttType: "bbckaldi",
      analyticsEvents: [],
      title: "Ted Talk",
      fileName: "KateDarling_2018S-950k.mp4",
      autoSaveData: {},
      autoSaveContentType: "draftjs",
      autoSaveExtension: "json",
      previewIsDisplayed: false,
      timecodeOffset: 0,
      rollBackValueInSeconds: 15,
      mediaDuration: "00:00",
      tabValue: "0",
      searchValue: "",
      playerDetails: {},
      aaa: false,
      salutations: {},
    };
    this.transcriptEditorRef = React.createRef();
  }

  async componentDidMount() {
    const callId =
      this.props &&
      this.props.location &&
      this.props.location.pathname &&
      this.props.location.pathname.split("/") &&
      this.props.location.pathname.split("/")[2];
    const response = await viewPlayer({ call_id: callId });
    if (response.success && response?.data?.data) {
      const playerData = response.data.data;
      let transScriptData = [];
      playerData &&
        playerData.transcript &&
        playerData.transcript.map((item) => {
          item &&
            item.alignment.map((text, i) => {
              transScriptData.push({
                start: text.start,
                confidence: text.start,
                end: text.end,
                word: text.word,
                punct:
                  item.alignment.length - 1 === i ? `${text.word}.` : text.word,
                index: item.index,
                speaker: item.speaker,
              });
            });
        });
      this.setState({
        salutations: playerData.salutations,
        playerDetails: playerData,
        transcriptData: {
          words: transScriptData,
        },
        tabValue: "1",
        mediaUrl: playerData?.basic_info?.call_url,
      });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.transcriptData !== this.state.transcriptData) {
      this.setState({ aaa: !this.state.aaa });
    }
  }

  createData(metric, agent, customer) {
    return { metric, agent, customer };
  }

  handleChange = (event, newValue) => {
    this.setState({ tabValue: newValue });
  };

  handleSearch = (event, newValue) => {
    this.setState({ searchValue: event.target.value });
  };

  keyPress = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      this.searchHandler();
    }
  };

  searchHandler = () => {
    const searchValue = this.state.searchValue?.toLowerCase()?.trim();
    const dataCopy = this.state.playerDetails.transcript?.slice();
    console.log(dataCopy)
    const findSearch = dataCopy.find((item) =>
      item.text
        ?.toLowerCase()
        ?.trim()
        .includes(searchValue?.toLowerCase()?.trim())
    );
    if (findSearch) {
      const wordSearch = findSearch.alignment.find((item) =>
        item.word
          ?.toLowerCase()
          ?.trim()
          .includes(searchValue?.toLowerCase()?.trim())
      );
      if (wordSearch) {
        this.setCurrentTime(wordSearch.start, true);
      }
    }
  };

  handleAnalyticsEvents = (event) => {
    this.setState({ analyticsEvents: [...this.state.analyticsEvents, event] });
  };

  localSave = (mediaUrl, fileName, data) => {
    let mediaUrlName = mediaUrl;
    // if using local media instead of using random blob name
    // that makes it impossible to retrieve from on page refresh
    // use file name
    if (mediaUrlName.includes("blob")) {
      mediaUrlName = fileName;
    }

    localStorage.setItem(`draftJs-${mediaUrlName}`, JSON.stringify(data));
  };

  handleAutoSaveChanges = (newAutoSaveData) => {
    // console.log("handleAutoSaveChanges", newAutoSaveData);
    const { data, ext } = newAutoSaveData;
    this.setState({ autoSaveData: data, autoSaveExtension: ext });
    // Saving to local storage
    this.localSave(this.state.mediaUrl, this.state.fileName, data);
  };

  handleTimeUpdate = (e) => {
    // console.log("e.target.currentTime", e.target.currentTime);
    const currentTime = e.target.currentTime;
    this.setState({
      currentTime,
    });
  };

  onLoadedDataGetDuration = (e) => {
    const currentDuration = e.target.duration;
    // console.log(e.target.duration);
    const currentDurationWithOffset =
      currentDuration + this.state.timecodeOffset;
    // console.log(currentDurationWithOffset);
    const durationInSeconds = secondsToTimecode(currentDurationWithOffset);
    // console.log(durationInSeconds);

    this.setState({
      mediaDuration: durationInSeconds,
    });

    if (this.props.handleAnalyticsEvents) {
      this.props.handleAnalyticsEvents({
        category: "TranscriptEditor",
        action: "onLoadedDataGetDuration",
        name: "durationInSeconds-WithoutOffset",
        value: secondsToTimecode(currentDuration),
      });
    }
  };

  //     getMaxValue = () => {
  //         const { playerDetails } = this.state
  //         return Math.max.apply(Math, playerDetails?.transcript?.map( (a)=> { return a.end }))
  //     }
  // 3

  render() {
    const { playerDetails } = this.state;
    const basicInfo = (playerDetails && playerDetails.basic_info) || {};
    const callSummary =
      (playerDetails && playerDetails.call_summarization) || {};
    // const talktimeRows = [
    //     this.createData('Silent Ratio', "0.2%", "0.2%"),
    //     this.createData('Overtalk Incidents', "10.2%", "10.2%"),
    //     this.createData('Silent Incidents', "15.00%", "15.00%"),
    // ];

    // const sentimentRows = [
    //     this.createData("Call Start Sentiment", "0.2%", "0.2%"),
    //     this.createData('Call End Sentiment', "11.4%", "11.4%"),
    //     this.createData('Overall Call Sentiment', "10.2%", "10.2%"),
    // ];

    const videoPlayer = (
      <VideoPlayer
        mediaUrl={this.state.mediaUrl}
        onTimeUpdate={this.handleTimeUpdate}
        videoRef={this.videoRef}
        previewIsDisplayed={this.state.previewIsDisplayed}
        onLoadedDataGetDuration={this.onLoadedDataGetDuration}
      />
    );

    const mediaControls = (
      <MediaPlayer
        title={this.state.title ? this.state.title : ""}
        mediaDuration={this.state.mediaDuration}
        currentTime={this.state.currentTime}
        hookSeek={(foo) => (this.setCurrentTime = foo)}
        hookPlayMedia={(foo) => (this.playMedia = foo)}
        hookIsPlaying={(foo) => (this.isPlaying = foo)}
        rollBackValueInSeconds={this.state.rollBackValueInSeconds}
        timecodeOffset={this.state.timecodeOffset}
        mediaUrl={this.state.mediaUrl}
        handleAnalyticsEvents={this.state.handleAnalyticsEvents}
        videoRef={this.videoRef}
      />
    );

    const header = (
      <Header
        mediaUrl={this.state.mediaUrl}
        mediaControls={this.videoRef.current ? mediaControls : null}
      />
    );

    // const headerbar = (props) => {
    //   return <Headers {...this.props} />;
    // };

    return (
      <>
        <Grid container>
          <Headers {...this.props} />
        </Grid>
        <div className="evaluation-card">
          <div
            className="d-flex justify-content-between evaluation-date-content"
            sx={{ p: 3 }}
          >
            <div className="mt-60">
              <span className="fw-bold fs-14 text-black font-inter">
                {basicInfo.agent_name} on -
              </span>
              <span className="fw-500 text-black font-inter">
                {basicInfo.date_of_call || ""}
              </span>
            </div>
            <div className="font-inter mt-60">
              <span className="fw-500 fs-14 text-black pl-30 font-inter">
                Call ID:
              </span>
              <span className="fw-bold fs-14 text-black pl-8 font-inter">
                {basicInfo.call_id || ""}
              </span>
              <span className="fw-500 fs-14 text-black pl-30 font-inter">
                CQ Scores:
              </span>
              <span className="fw-bold fs-14 text-black pl-8 font-inter">
                Score
              </span>
              <img
                src={getRectangleColor(playerDetails?.cq_score, 0, 100)}
                alt="score"
                className="ml-8"
              />
              <span className="fw-bold fs-14 text-black pl-8 font-inter">
                {playerDetails?.cq_score}%
              </span>
              <span className="fw-500 fs-14 text-black pl-30 font-inter">
                CSAT Score:
              </span>
              <span className="fw-bold fs-14 text-black pl-8 font-inter">
                Score
              </span>
              <img
                src={getRectangleColor(playerDetails?.csat_score, 0, 100)}
                alt="score"
                className="ml-8"
              />
              <span className="fw-bold fs-14 text-black pl-8 font-inter">
                {playerDetails?.csat_score}%
              </span>
            </div>
          </div>
          <div
            style={{
              background: "#FFFFFF",
              marginLeft: "15px",
              marginRight: "15px",
              borderRadius: "20px",
            }}
          >
            <div
              className="pl-50"
              style={{ paddingTop: "18px", paddingRight: "1em" }}
            >
              <div className="d-flex rangeBar">
                <div
                  className="fs-14 text-blue fw-bold mw-75 text-left font-inter"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  Agent
                </div>
                <div className="ml-122 voice-data-agent">
                  {playerDetails?.transcript?.map((item, index) => {
                    // console.log("abcd", playerDetails?.transcript);
                    return (
                      <React.Fragment key={index}>
                        {item.speaker === 2 ? (
                          <React.Fragment>
                            <div
                              className={`custom-voice-box`}
                              style={{
                                width: `${item.end - item.start}%`,
                                background: `${item.end !==
                                  playerDetails?.transcript[index + 1]
                                    ?.start && "#73C5FF"
                                  }`,
                              }}
                            />
                            <div
                              style={{
                                width: `${playerDetails?.transcript[index + 1]?.start -
                                  item?.end
                                  }%`,
                              }}
                            />
                          </React.Fragment>
                        ) : (
                          <React.Fragment>
                            <div
                              className="custom-voice-box"
                              style={{ width: `${item.end - item.start}%` }}
                            />
                            <div
                              style={{
                                width: `${playerDetails?.transcript[index + 1]?.start -
                                  item?.end
                                  }%`,
                              }}
                            />
                          </React.Fragment>
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
              <div className="d-flex mt-20 rangeBar">
                <div
                  className="fs-14  fw-bold text-orange mw-75 text-right font-inter"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  Customer
                </div>
                <div className="ml-122 voice-data-customer">
                  {playerDetails?.transcript?.map((item, index) => {
                    return (
                      <React.Fragment key={index}>
                        {item.speaker === 1 ? (
                          <React.Fragment>
                            <div
                              className={`custom-voice-box`}
                              style={{
                                width: `${item.end - item.start}%`,
                                background: `${item.end !==
                                  playerDetails?.transcript[index + 1]
                                    ?.start && "#FAB143"
                                  }`,
                              }}
                            />
                            <div
                              style={{
                                width: `${playerDetails?.transcript[index + 1]?.start -
                                  item?.end
                                  }%`,
                              }}
                            />
                          </React.Fragment>
                        ) : (
                          <React.Fragment>
                            <div
                              className="custom-voice-box"
                              style={{ width: `${item.end - item.start}%` }}
                            />
                            <div
                              style={{
                                width: `${playerDetails?.transcript[index + 1]?.start -
                                  item?.end
                                  }%`,
                              }}
                            />
                          </React.Fragment>
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="gray-divider" style={{ marginTop: "20px" }} />
            <div style={{ paddingBottom: "10px" }}>
              {this.state.mediaUrl ? header : null}
              {this.state.mediaUrl ? videoPlayer : null}
            </div>
          </div>

          <div style={{ display: "flex" }}>
            <div className=" w-100">
              <Box sx={{ flexGrow: 1 }}>
                <Grid
                  container
                  spacing={2}
                  sx={{ p: "15px" }}
                  display="flex"
                  // alignItems="center"
                  justifyContent="space-between"
                >
                  <Grid item sm={4} md={2.7}>
                    <Scores
                      data={playerDetails}
                      setCurrentTime={this.setCurrentTime}
                      salutations={this.state.salutations}
                    />
                  </Grid>

                  <Grid item sm={8} md={9.3}>
                    <Item
                      sx={{
                        background: "#FFFFFF",
                        borderRadius: "20px",
                        boxShadow: "none",
                      }}
                    >
                      {/* <div className="minh-50"> */}
                      <Box sx={{ width: "100%", typography: "body1" }}>
                        <TabContext value={this.state.tabValue}>
                          <Grid
                            container
                            style={{
                              background: "#f5ffa",
                              boxSizing: "border-box",
                              borderRadius: "20px",
                            }}
                          >
                            <Grid item sm={12} md={6}>
                              <TabList
                                onChange={this.handleChange}
                                aria-label="icon position tabs example"
                                className="header-tabs-evaluation"
                                sx={headerTabs}
                                classes={{
                                  flexContainer: "flexContainer",
                                  indicator: "indicator",
                                }}
                                TabIndicatorProps={{ children: <span /> }}
                              >
                                <Tab label="Transcript" value="1" />
                                <Tab label="Metrics" value="2" />
                                <Tab label="Call Summary" value="3" />
                              </TabList>
                            </Grid>
                            <Grid
                              item
                              sm={6}
                              md={6}
                              className="search-pos"
                              display="flex"
                              alignItems="center"
                              justifyContent="flex-end"
                            >
                              <TextField
                                type="text"
                                value={this.state.searchValue}
                                onChange={this.handleSearch}
                                onKeyDown={this.keyPress}
                                placeholder="Find words in transcript"
                                className="search-input"
                                autoComplete="off"
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment>
                                      <IconButton>
                                        <img
                                          src={searchIcon}
                                          className="search-icon"
                                          alt="searchIcon"
                                          onClick={this.searchHandler}
                                        />
                                      </IconButton>
                                    </InputAdornment>
                                  ),
                                }}
                              />
                            </Grid>
                          </Grid>

                          <TabPanel value="1">
                            <TranscriptEditor
                              transcriptData={this.state.transcriptData}
                              fileName={this.state.fileName}
                              mediaUrl={this.state.mediaUrl}
                              isEditable={this.state.isTextEditable}
                              spellCheck={this.state.spellCheck}
                              sttJsonType={this.state.sttType}
                              setCurrentTime={this.setCurrentTime}
                              handleAnalyticsEvents={this.handleAnalyticsEvents}
                              title={this.state.title}
                              ref={this.transcriptEditorRef}
                              handleAutoSaveChanges={this.handleAutoSaveChanges}
                              autoSaveContentType={
                                this.state.autoSaveContentType
                              }
                              mediaType={"video"}
                              currentTime={this.state.currentTime}
                              timecodeOffset={this.state.timecodeOffset}
                            />
                          </TabPanel>

                          <TabPanel value="2">
                            <div className="metrics">
                              <Box>
                                <Grid container>
                                  <Grid
                                    item
                                    lg={6}
                                    md={6}
                                    sm={12}
                                    sx={{ pl: 2, pr: 2 }}
                                  >
                                    <div className="talkTime-sentiment">
                                      TalkTime
                                    </div>

                                    <Table
                                      sx={{
                                        borderCollapse: "separate",
                                        borderSpacing: "0 5px",
                                      }}
                                      aria-label="customized table"
                                    >
                                      <TableHead>
                                        <TableRow className="metric-table-head">
                                          <TableCell
                                            align="center"
                                            sx={{
                                              width: "33%",
                                              fontWeight: "bold !important",
                                            }}
                                          >
                                            Metric
                                          </TableCell>
                                          <TableCell
                                            align="center"
                                            sx={{
                                              width: "33%",
                                              fontWeight: "bold !important",
                                            }}
                                          >
                                            Agent
                                          </TableCell>
                                          <TableCell
                                            align="center"
                                            sx={{
                                              width: "33%",
                                              fontWeight: "bold !important",
                                            }}
                                          >
                                            Customer
                                          </TableCell>
                                        </TableRow>
                                      </TableHead>
                                      <TableBody>
                                        {/* <TableRow className="metric-table-body">
                                          <TableCell align="center">
                                            dead_air
                                          </TableCell>
                                          <TableCell align="center">
                                            {
                                              playerDetails?.talktime_metrics
                                                ?.dead_air
                                            }
                                            %
                                          </TableCell>
                                          <TableCell align="center">
                                            {
                                              playerDetails?.customer_talktime
                                                ?.dead_air
                                            }
                                            %
                                          </TableCell>
                                        </TableRow> */}
                                        <TableRow className="metric-table-body">
                                          <TableCell align="center">
                                            overtalk_incidents
                                          </TableCell>
                                          <TableCell align="center">
                                            {
                                              parseFloat(
                                                playerDetails?.talktime_metrics
                                                  ?.overtalk_incidents
                                              ).toFixed(2)
                                            }

                                          </TableCell>
                                          <TableCell align="center">
                                            {
                                              parseFloat(
                                                playerDetails?.customer_talktime_metrics
                                                  ?.customer_overtalk_incidents
                                              ).toFixed(2)
                                            }

                                          </TableCell>
                                        </TableRow>
                                        <TableRow className="metric-table-body">
                                          <TableCell align="center">
                                            silent_incidents
                                          </TableCell>
                                          <TableCell align="center">
                                            {
                                              parseFloat(
                                                playerDetails?.talktime_metrics
                                                  ?.silence_incidents
                                              ).toFixed(2)

                                            }

                                          </TableCell>
                                          <TableCell align="center">
                                            {
                                              parseFloat(
                                                playerDetails?.customer_talktime_metrics
                                                  ?.customer_silence_incidents
                                              ).toFixed(2)

                                            }

                                          </TableCell>
                                        </TableRow>
                                      </TableBody>
                                    </Table>
                                  </Grid>
                                  <Grid
                                    item
                                    lg={6}
                                    md={6}
                                    sm={12}
                                    sx={{ pl: 2, pb: 2 }}
                                  >
                                    <div className="talkTime-sentiment">
                                      Sentiment
                                    </div>

                                    <Table
                                      sx={{
                                        borderCollapse: "separate",
                                        borderSpacing: "0 5px",
                                      }}
                                      aria-label="customized table"
                                    >
                                      <TableHead>
                                        <TableRow className="metric-table-head">
                                          <TableCell
                                            align="center"
                                            sx={{
                                              width: "33%",
                                              fontWeight: "bold !important",
                                            }}
                                          >
                                            Metric
                                          </TableCell>
                                          <TableCell
                                            align="center"
                                            sx={{
                                              width: "33%",
                                              fontWeight: "bold !important",
                                            }}
                                          >
                                            Agent
                                          </TableCell>
                                          <TableCell
                                            align="center"
                                            sx={{
                                              width: "33%",
                                              fontWeight: "bold !important",
                                            }}
                                          >
                                            Customer
                                          </TableCell>
                                        </TableRow>
                                      </TableHead>
                                      <TableBody>
                                        <TableRow className="metric-table-body">
                                          <TableCell align="center">
                                            Call Start Sentiment
                                          </TableCell>
                                          <TableCell align="center">
                                            {
                                              parseFloat(
                                                playerDetails?.sentiment_metrics
                                                  ?.call_start_sentiment
                                              ).toFixed(2)

                                            }

                                          </TableCell>
                                          <TableCell align="center">
                                            {
                                              parseFloat(
                                                playerDetails?.customer_sentiment_metrics
                                                  ?.customer_call_start_sentiment
                                              ).toFixed(2)

                                            }

                                          </TableCell>
                                        </TableRow>

                                        <TableRow className="metric-table-body">
                                          <TableCell align="center">
                                            Call End Sentiment
                                          </TableCell>
                                          <TableCell align="center">
                                            {
                                              parseFloat(
                                                playerDetails?.sentiment_metrics
                                                  ?.call_end_sentiment
                                              ).toFixed(2)

                                            }

                                          </TableCell>
                                          <TableCell align="center">
                                            {
                                              parseFloat(
                                                playerDetails?.customer_sentiment_metrics
                                                  ?.customer_call_end_sentiment
                                              ).toFixed(2)

                                            }

                                          </TableCell>
                                        </TableRow>

                                        <TableRow className="metric-table-body">
                                          <TableCell align="center">
                                            Overall Call Sentiment
                                          </TableCell>
                                          <TableCell align="center">
                                            {
                                              parseFloat(
                                                playerDetails?.sentiment_metrics
                                                  ?.overall_call_sentiment
                                              ).toFixed(2)

                                            }

                                          </TableCell>
                                          <TableCell align="center">
                                            {
                                              parseFloat(
                                                playerDetails?.customer_sentiment_metrics
                                                  ?.customer_overall_call_sentiment
                                              ).toFixed(2)

                                            }

                                          </TableCell>
                                        </TableRow>
                                      </TableBody>
                                    </Table>
                                  </Grid>
                                </Grid>
                              </Box>
                            </div>
                          </TabPanel>
                          <TabPanel value="3">
                            <div className="mt-15">
                              <div className="call-summary">
                                {callSummary.doctext || ""}
                              </div>
                            </div>
                          </TabPanel>
                        </TabContext>
                      </Box>
                      {/* </div> */}
                    </Item>
                  </Grid>
                </Grid>
              </Box>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Evaluation;
