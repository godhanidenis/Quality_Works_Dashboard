import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material";
import Paper from "@mui/material/Paper";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import TabContext from "@mui/lab/TabContext/TabContext";
import TabPanel from "@mui/lab/TabPanel/TabPanel";
import searchIcon from "../../assest/icon/SearchIcon.svg"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import transcriptFile from "../../components/callGraph/transcript-editor/bbc-kaldi.json";
import TranscriptEditor from "../callGraph/transcript-editor";
import "../../App.css"


const Item = styled(Paper)(({theme}) => ({
    ...theme.typography.body2
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#F7F7F7",
        color: "#262626",
        fontWeight: "bold",
        borderBottom: "unset"
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        color: "#262626",
        borderBottom: "unset"
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(even)': {
        backgroundColor: "#F5F8FA",
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


class Tabs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            transcriptData: transcriptFile,
            tabValue : "1",
            searchValue : "",
            mediaUrl: 'https://download.ted.com/talks/KateDarling_2018S-950k.mp4',
            isTextEditable: true,
            spellCheck: false,
            sttType: "bbckaldi",
            analyticsEvents: [],
            title: "Ted Talk",
            fileName: "KateDarling_2018S-950k.mp4",
            autoSaveData: {},
            autoSaveContentType: "draftjs",
            autoSaveExtension: "json"
        };
        this.transcriptEditorRef = React.createRef();
    }

    static getDerivedStateFromProps(nextProps) {
        if (nextProps.transcriptData !== null) {
            return {
                transcriptData: nextProps.transcriptData
            };
        }

        return null;
    }

    // performance optimization
    shouldComponentUpdate = (nextProps, nextState) => {
        if (nextProps.mediaUrl !== this.props.mediaUrl) {
            return true;
        }

        return nextState !== this.state;
    };

    componentDidMount = () => {
        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions);
    };


    createData(metric, agent, customer) {
        return { metric, agent, customer};
    }

    handleChange = (event, newValue) => {
        this.setState({tabValue : newValue})
    };

    handleSearch = (event, newValue) => {
        this.setState({searchValue : newValue})
    };

    handleAnalyticsEvents = event => {
        this.setState({ analyticsEvents: [...this.state.analyticsEvents, event] });
    };

    localSave = (mediaUrl, fileName, data) => {
        let mediaUrlName = mediaUrl;
        // if using local media instead of using random blob name
        // that makes it impossible to retrieve from on page refresh
        // use file name
        if (mediaUrlName.includes('blob')) {
            mediaUrlName = fileName;
        }

        localStorage.setItem(`draftJs-${ mediaUrlName }`, JSON.stringify(data));
    };

    handleAutoSaveChanges = newAutoSaveData => {
        // console.log("handleAutoSaveChanges", newAutoSaveData);
        const { data, ext } = newAutoSaveData;
        this.setState({ autoSaveData: data, autoSaveExtension: ext });
        // Saving to local storage
        this.localSave(this.state.mediaUrl, this.state.fileName, data);
    };
    render() {
        const talktimeRows = [
            this.createData('Silent Ratio', "0.2%", "0.2%"),
            this.createData('Overtalk Incidents', "10.2%", "10.2%"),
            this.createData('Silent Incidents', "15.00%", "15.00%"),
        ];

        const sentimentRows = [
            this.createData("Call Start Sentiment", "0.2%", "0.2%"),
            this.createData('Call End Sentiment', "11.4%", "11.4%"),
            this.createData('Overall Call Sentiment', "10.2%", "10.2%"),
        ];
        return (
            <Grid item sm={9}>
                <Item>
                    <div>
                        <div className="tabs-header mh-515 ">
                            <Box sx={{width: '100%', typography: 'body1'}}>
                                <TabContext value={this.state.tabValue}>
                                    <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                                        <TabList onChange={this.handleChange}
                                                 aria-label="lab API tabs example">
                                            <Tab label="Transcript" value="1"/>
                                            <Tab label="Metrics" value="2"/>
                                            <Tab label="Call Summary" value="3"/>
                                        </TabList>
                                        {/*<Box*/}
                                        {/*    component="form"*/}
                                        {/*    sx={{*/}
                                        {/*        "& .MuiTextField-root": { m: 1, width: "25ch" }*/}
                                        {/*    }}*/}
                                        {/*    noValidate*/}
                                        {/*    autoComplete="off"*/}
                                        {/*>*/}
                                        {/*    <div className="position-relative">*/}
                                        {/*        <TextField*/}
                                        {/*            id="outlined-multiline-flexible"*/}
                                        {/*            multiline*/}
                                        {/*            maxRows={1}*/}
                                        {/*            value={this.state.searchValue}*/}
                                        {/*            onChange={this.handleSearch}*/}
                                        {/*            placeholder="Find words in transcript"*/}
                                        {/*            className="search-input"*/}
                                        {/*        />*/}
                                        {/*        <img src={searchIcon} className="search-icon" alt="searchIcon"/>*/}
                                        {/*    </div>*/}
                                        {/*</Box>*/}
                                    </Box>
                                    <TabPanel value="1">
                                        <div>
                                            <TranscriptEditor
                                                transcriptData={this.state.transcriptData}
                                                fileName={this.state.fileName}
                                                mediaUrl={this.state.mediaUrl}
                                                isEditable={this.state.isTextEditable}
                                                spellCheck={this.state.spellCheck}
                                                sttJsonType={this.state.sttType}
                                                handleAnalyticsEvents={this.handleAnalyticsEvents}
                                                title={this.state.title}
                                                ref={this.transcriptEditorRef}
                                                handleAutoSaveChanges={this.handleAutoSaveChanges}
                                                autoSaveContentType={this.state.autoSaveContentType}
                                                mediaType={ 'video' }
                                            />
                                        </div>
                                    </TabPanel>
                                    <TabPanel value="2">
                                        <div className="p-30 metrics">
                                            <Box>
                                                <Grid container spacing={4}>
                                                    <Grid item sm={6}>
                                                        <Item>
                                                            <div className="fs-16 fw-bold text-black">Talktime</div>
                                                            <div className="mt-8">
                                                                <TableContainer component={Paper}>
                                                                    <Table sx={{ mainWidth: 435, maxWidth: "fitContent" }} aria-label="customized table">
                                                                        <TableHead>
                                                                            <TableRow>
                                                                                <StyledTableCell>Metric</StyledTableCell>
                                                                                <StyledTableCell align="right">Agent</StyledTableCell>
                                                                                <StyledTableCell align="right">Customer</StyledTableCell>
                                                                            </TableRow>
                                                                        </TableHead>
                                                                        <TableBody>
                                                                            {talktimeRows.map((row) => (
                                                                                <StyledTableRow key={row.name}>
                                                                                    <StyledTableCell component="th" scope="row">
                                                                                        {row.metric}
                                                                                    </StyledTableCell>
                                                                                    <StyledTableCell align="right">{row.agent}</StyledTableCell>
                                                                                    <StyledTableCell align="right">{row.customer}</StyledTableCell>
                                                                                </StyledTableRow>
                                                                            ))}
                                                                        </TableBody>
                                                                    </Table>
                                                                </TableContainer>
                                                            </div>
                                                        </Item>
                                                    </Grid>
                                                    <Grid item sm={6}>
                                                        <Item>
                                                            <div className="fs-16 fw-bold text-black">Sentiment</div>
                                                            <div className="mt-8">
                                                                <TableContainer component={Paper}>
                                                                    <Table sx={{ mainWidth: 435, maxWidth: "fitContent" }} aria-label="customized table">
                                                                        <TableHead>
                                                                            <TableRow>
                                                                                <StyledTableCell>Metric</StyledTableCell>
                                                                                <StyledTableCell align="right">Agent</StyledTableCell>
                                                                                <StyledTableCell align="right">Customer</StyledTableCell>
                                                                            </TableRow>
                                                                        </TableHead>
                                                                        <TableBody>
                                                                            {sentimentRows.map((row) => (
                                                                                <StyledTableRow key={row.metric}>
                                                                                    <StyledTableCell component="th" scope="row">
                                                                                        {row.metric}
                                                                                    </StyledTableCell>
                                                                                    <StyledTableCell align="right">{row.agent}</StyledTableCell>
                                                                                    <StyledTableCell align="right">{row.customer}</StyledTableCell>
                                                                                </StyledTableRow>
                                                                            ))}
                                                                        </TableBody>
                                                                    </Table>
                                                                </TableContainer>
                                                            </div>
                                                        </Item>
                                                    </Grid>
                                                </Grid>
                                            </Box>
                                        </div>
                                    </TabPanel>
                                    <TabPanel value="3">
                                        <div className="mt-65">
                                            <div className="call-summary fs-16 text-gray-800">
                                                Alex carlson of thrive air helps change a flight. Heather smith was originally scheduled to fly from Dallas to Detroit on September 8th. The flight was changed to September 13th. A small fee of fifty dollars was charged to change the flight. The new flight was set to take off at 4pm.
                                            </div>
                                        </div>
                                    </TabPanel>
                                </TabContext>
                            </Box>
                        </div>
                    </div>
                </Item>
            </Grid>
        );
    }
}

export default Tabs;
