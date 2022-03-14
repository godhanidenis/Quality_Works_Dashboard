import React, { useEffect, useMemo, useRef, useLayoutEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell/TableCell";
import {
  Box,
  Grid,
  Paper,
  MenuItem,
  FormControl,
  Select,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import CustomSelectInput from "../../components/common/customSelectInput";
import {
  getLOB,
  getLobTeam,
  getGraph,
  getCallIndexDetails,
  getCriticalNonCriticalData,
  getCsatCQDetails,
  getAgentBasedTeam,
} from "../../actions";
import LocalizationProvider from "@mui/lab/LocalizationProvider/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import moment from "moment";
import Divider from "@mui/material/Divider";
import { getGraphColor } from "../../utils/comman";
import { createStyles, makeStyles } from "@mui/styles";
import HighchartsReact from "highcharts-react-official";
import pareto from "highcharts/modules/pareto";
import Highcharts from "highcharts";
import { height } from "@mui/system";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  boxShadow: "none",
  borderRadius: "10px",
  letterSpacing: "0.02em",
  padding: "15px 15px 15px 15px",
}));

var date = new Date();
const defaultValues = {
  location: null,
  optionsLoB: [],
  optionsTeam: [],
  optionsAgent: [],
  cqScoreLabel: [],
  callIndexDetails: [],
  optionsAgent: [],
  cqscoreDetails: [],
  csatDetails: [],
  cstaScoreLabel: [],
  CriticalNonCriticalDetails: {},
  optionsDate: [],
  lob: null,
  team: null,
  rangeDate: [date.setDate(date.getDate() - 30), new Date()],
  callQuality: [],
  csta: [],
};

function CsatCqgraph() {
  const { setValue, watch } = useForm({ defaultValues });
  const classes = useStyles();
  const [agentvalue, setAgentvalue] = React.useState([]);
  const [lobvalue, setLobvalue] = React.useState([]);
  const [datevalue, setDatevalue] = React.useState(0);
  const [teamvalue, setTeamvalue] = React.useState([]);
  const {
    optionsLoB,
    optionsTeam,
    lob,
    team,
    agent,
    rangeDate,
    callQuality,
    csta,
    callIndexDetails,
    cqscoreDetails,
    optionsAgent,
    csatDetails,
    CriticalNonCriticalDetails,
    cqScoreLabel,
    cstaScoreLabel,
  } = watch();

  const handleChangelob = async (e) => {
    // console.log(e);
    setLobvalue(e.target.value);
    const lobList = {
      lob_list: [e.target.value],
    };
    if (e.target.value !== "") {
      const response = await getLobTeam(lobList);
      if (response.success && response?.data?.data) {
        let team = [];
        response.data.data.forEach((item, index) => {
          team.push({
            label: item.Team_name,
            value: item.id,
          });
        });
        setValue("optionsTeam", response?.data?.data);
      }
    }
  };

  const handleChangeteam = async (e) => {
    // console.log(e);
    setTeamvalue(e.target.value);
    const teamList = {
      team_list: [e.target.value],
    };
    if (e.target.value !== "") {
      const response = await getAgentBasedTeam(teamList);
      if (response.success && response?.data?.data) {
        let team = [];
        response.data.data.forEach((item, index) => {
          team.push({
            label: item.Team_name,
            value: item.id,
          });
        });
        setValue("optionsAgent", response?.data?.data);
      }
    }
  };

  const CsatCQDetails = async () => {
    const filterData = {
      lob_id: lobvalue,
      team_id: teamvalue,
      agent_id: agentvalue,
      start_date: moment(new Date(rangeDate?.[0])).format("YYYY-MM-DD"),
      end_date: moment(new Date(rangeDate?.[1])).format("YYYY-MM-DD"),
      // callduration: call_duration || [],
      // tenure: tenure || [],
      // filter: {...filtyerpayloads,  ...filterPayload},
    };
    const response = await getCsatCQDetails(filterData);
    if (
      response.success &&
      response?.data?.data &&
      !response?.data?.data?.error
    ) {
      console.log("response ::::::::::", response);

      console.log(response?.data?.data);
      // let team = [];
      // response.data.data.forEach((item, index) => {
      //   team.push({
      //     label: item.Team_name,
      //     value: item.id,
      //   });
      // });
      setValue("cqscoreDetails", response?.data?.data);
      setValue("csatDetails", response?.data?.data);
    } else {
      setValue("cqscoreDetails", {});
      setValue("csatDetails", {});
    }
  };

  console.log(cqscoreDetails);
  const handleChangeagent = async (e) => {
    // console.log(e);
    setAgentvalue(e.target.value);
  };

  const handlecqcsatdatefilter = (e) => {
    var date = new Date();
    console.log(e.target.value);
    setDatevalue(e.target.value);
    if (e.target.value === "0") {
      console.log("zero", [date.setDate(date.getDate() - 30), new Date()]);
      setValue("rangeDate", [date.setDate(date.getDate() - 6), new Date()]);
    } else if (e.target.value === "1") {
      setValue("rangeDate", [date.setDate(date.getDate() - 1), new Date()]);
      console.log("one".datevalue);
    } else if (e.target.value === "2") {
      console.log("two", datevalue);
      setValue("rangeDate", [date.setDate(date.getDate()), new Date()]);
    }
  };

  const getLOBDetails = async () => {
    const response = await getLOB();
    if (response.success && response?.data?.data) {
      let lob = [];
      response.data.data.forEach((item) => {
        lob.push({
          label: item.Lob_name,
          value: item.id,
        });
      });
      setValue("optionsLoB", response?.data?.data);
    }
  };

  useEffect(() => {
    if (agentvalue || teamvalue || lobvalue || rangeDate) {
      CsatCQDetails();
    }
  }, [agentvalue, teamvalue, lobvalue, rangeDate]);

  useEffect(() => {
    getLOBDetails();
    CsatCQDetails();
  }, []);

  return (
    <div className="graph">
      {" "}
      <div className="text-right justify-content-flex-end">
        {/* <Divider textAlign="right" className="d-flex">
                <Grid container spacing={2}>
                    <Grid item xs={12} className="d-flex">
                        <DateRangePicker
                            format="yyyy-MM-dd"
                            placeholder="select date"
                            showOneCalendar
                            placement="leftStart"
                            style={{ minWidth: "200px" }}
                            value={rangeDate}
                            onChange={(newValue) => {
                                // console.log(newValue);
                                setValue("rangeDate", newValue);
                            }}
                            className={classes.dateRange}
                        />
                        <Select
                            value={lobvalue}
                            onChange={handleChangelob}
                            displayEmpty
                            disableUnderline={true}
                            className={classes.Select}
                            inputProps={{
                                "aria-label": "Without label",
                            }}
                        >
                            <MenuItem
                                className={classes.MenuItem}
                                sx={{ pr: "0px", width: "100%" }}
                                value=""
                            >
                                lob
                            </MenuItem>
                            {optionsLoB &&
                                optionsLoB.map((item, index) => {
                                    console.log(item)
                                    return (
                                        <MenuItem
                                            className={classes.MenuItem}
                                            key={item.id}
                                            value={item.id}
                                        >
                                            {item.Lob_name}
                                        </MenuItem>
                                    )
                                })}
                        </Select>
                        <Select
                            value={teamvalue}
                            onChange={handleChangeteam}
                            displayEmpty
                            disableUnderline={true}
                            className={classes.Select}
                            inputProps={{
                                "aria-label": "Without label",
                            }}
                        >
                            <MenuItem
                                className={classes.MenuItem}
                                sx={{ pr: "0px", width: "100%" }}
                                value=""
                            >
                                team
                            </MenuItem>
                            {optionsTeam &&
                                optionsTeam.map((item, index) => {
                                    console.log(item)
                                    return (<MenuItem
                                        className={classes.MenuItem}
                                        key={item.id}
                                        value={item.id}
                                    >
                                        {item.Team_name}
                                    </MenuItem>
                                    )
                                }
                                )}
                        </Select>
                        <Select
                            value={agentvalue}
                            onChange={handleChangeagent}
                            displayEmpty
                            disableUnderline={true}
                            className={classes.Select}
                            inputProps={{
                                "aria-label": "Without label",
                            }}
                        >
                            <MenuItem
                                className={classes.MenuItem}
                                sx={{ pr: "0px", width: "100%" }}
                                value=""
                            >
                                agent
                            </MenuItem>
                            {optionsAgent &&
                                optionsAgent.map((item, index) => {
                                    console.log(item)
                                    return (<MenuItem
                                        className={classes.MenuItem}
                                        key={item.id}
                                        value={item.id}
                                    >
                                        {item.Agent_name}
                                    </MenuItem>
                                    )
                                }
                                )}
                        </Select>
                    </Grid>
                </Grid>
            </Divider> */}
      </div>
      <div className="graph-content">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item sm={8}>
              <Item>
                {/* <Grid item xs={9}></Grid> */}
                <Grid container spacing={2} className="pb-6">
                  <Grid item xs={6} className="text-left">
                    <Typography
                      variant="subtitle1"
                      sx={{ color: "#001B34", fontWeight: 600 }}
                      gutterBottom
                      component="div"
                    >
                      CSAT and CQ Score Index
                    </Typography>
                  </Grid>
                  <Grid item xs={6} className="text-right">
                    <Select
                      value={lobvalue}
                      onChange={handleChangelob}
                      displayEmpty
                      disableUnderline={true}
                      className={classes.Select}
                      inputProps={{
                        "aria-label": "Without label",
                      }}
                    >
                      <MenuItem
                        className={classes.MenuItem}
                        sx={{ pr: "0px", width: "100%" }}
                        value=""
                      >
                        Lob
                      </MenuItem>
                      {optionsLoB &&
                        optionsLoB.map((item, index) => {
                          console.log(item);
                          return (
                            <MenuItem
                              className={classes.MenuItem}
                              key={item.id}
                              value={item.id}
                            >
                              {item.Lob_name}
                            </MenuItem>
                          );
                        })}
                    </Select>
                    <Select
                      value={teamvalue}
                      onChange={handleChangeteam}
                      displayEmpty
                      disableUnderline={true}
                      className={classes.Select}
                      inputProps={{
                        "aria-label": "Without label",
                      }}
                    >
                      <MenuItem
                        className={classes.MenuItem}
                        sx={{ pr: "0px", width: "100%" }}
                        value=""
                      >
                        Team
                      </MenuItem>
                      {optionsTeam &&
                        optionsTeam.map((item, index) => {
                          console.log(item);
                          return (
                            <MenuItem
                              className={classes.MenuItem}
                              key={item.id}
                              value={item.id}
                            >
                              {item.Team_name}
                            </MenuItem>
                          );
                        })}
                    </Select>
                    <Select
                      value={datevalue}
                      onChange={handlecqcsatdatefilter}
                      displayEmpty
                      disableUnderline={true}
                      className={classes.Select}
                      inputProps={{
                        "aria-label": "Without label",
                      }}
                    >
                      <MenuItem
                        className={classes.MenuItem}
                        sx={{ pr: "0px", width: "100%" }}
                        value="0"
                      >
                        Last 7 Days
                      </MenuItem>
                      <MenuItem
                        className={classes.MenuItem}
                        sx={{ pr: "0px", width: "100%" }}
                        value="1"
                      >
                        yesterday
                      </MenuItem>
                      <MenuItem
                        className={classes.MenuItem}
                        sx={{ pr: "0px", width: "100%" }}
                        value="2"
                      >
                        today
                      </MenuItem>
                    </Select>
                  </Grid>
                </Grid>
                <Barchart
                  title={"CSAT and CQ Score Index"}
                  name={"CSAT"}
                  value={csatDetails}
                />
              </Item>
            </Grid>
            <Grid item sm={4}>
              <Item>
              <Grid container spacing={2} className="pb-6">
                <Grid item xs={6} className="text-left">
                  <Typography
                    variant="subtitle1"
                    sx={{ color: "#001B34", fontWeight: 600 }}
                    gutterBottom
                    component="div"
                  >
                    Categories
                  </Typography>
                </Grid>
                <Grid item xs={6} className="text-right">
                <Select
                      value={datevalue}
                      onChange={handlecqcsatdatefilter}
                      displayEmpty
                      disableUnderline={true}
                      className={classes.Select}
                      inputProps={{
                        "aria-label": "Without label",
                      }}
                    >
                      <MenuItem
                        className={classes.MenuItem}
                        sx={{ pr: "0px", width: "100%" }}
                        value="0"
                      >
                        Last 7 Days
                      </MenuItem>
                      <MenuItem
                        className={classes.MenuItem}
                        sx={{ pr: "0px", width: "100%" }}
                        value="1"
                      >
                        yesterday
                      </MenuItem>
                      <MenuItem
                        className={classes.MenuItem}
                        sx={{ pr: "0px", width: "100%" }}
                        value="2"
                      >
                        today
                      </MenuItem>
                    </Select>
                </Grid>
              </Grid>
                <Category
                  name={"CQ Score"}
                  value={cqscoreDetails}
                />
              </Item>
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
}

const Barchart = (props) => {
  // console.log(props);
  console.log(props.value);
  const opts = {
    chart: {
      height: 250,
      type: "column",
    },
    title: {
      text: "",
      align: "left",
      style: {
        fontSize: ".875rem",
        fontWeight: "bold",
        letterSpacing: "0.02em",
      },
    },
    subtitle: {
      text: "",
    },
    accessibility: {
      announceNewData: {
        enabled: true,
      },
    },

    //   xAxis: {
    //     type: 'datetime',
    // labels: {
    //   format: '{value:%Y-%b-%e}'
    // },
    xAxis: {
      type: "datetime",
      labels: {
        format: "{value:%b-%e}",
      },
      categories: props.value.csat_dates,
      // dateTimeLabelFormats: {
      //   // do display the year
      //   month: "%b %y",
      //   year: "%Y",
      // },
    },

    yAxis: {
      title: {
        text: "",
      },
    },
    credits: {
      enabled: false,
    },
    legend: {
      enabled: true,
      align: "right",
      verticalAlign: "top",
      padding: 0,

      itemStyle: {
        lineHeight: "14px",
      },
    },
    plotOptions: {
      column: {
        // pointStart: Date.UTC(2022,2,2),
        zones: [
          // {
          //     value: 35, // Values up to 10 (not including) ...
          //     color: "#DE3C3C", // ... have the color blue.
          // },
          // {
          //     value: 70, // Values up to 10 (not including) ...
          //     color: "#FAB143", // ... have the color blue.
          // },
          // {
          //     color: "#3BD999", // Values from 10 (including) and up have the color red
          // },
        ],
      },

      series: {
        groupPadding: 0.65,
        pointWidth: 15,
        borderRadius: 2,
        borderWidth: 0,
        dataLabels: {
          enabled: true,
          format: "{point.y:.1f}%",
          style: {
            fontWeight: "bold",
            fontSize: "10px",
          },
        },
      },
    },

    tooltip: {
      headerFormat: '<span style="font-size:10px">{series.name}</span><br>',
      pointFormat:
        '<span style="color:{point.color}">{point.name}</span><b>{point.y:.2f}%</b> of total<br/>',
    },

    series: [
      {
        name: "CSAT Index",
        data: props?.value?.csat_score_value
          ? props?.value?.csat_score_value
          : [],
        color: {
          linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
          stops: [
            [0, "#C4E6FF"],
            [1, "#87CDFF"],
          ],
        },
      },
      {
        name: "CQ Score Index",
        data: props?.value?.cq_score_value ? props?.value?.cq_score_value : [],
        color: {
          linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
          stops: [
            [0, "#008CF0"],
            [1, "#4EB5FF"],
          ],
        },
      },
    ],
  };

  // const abc ={
  //     data: {
  //       table: 'datatable'
  //     },
  //     chart: {
  //       type: 'column'
  //     },
  //     title: {
  //       text: 'Data extracted from a HTML table in the page'
  //     },
  //     yAxis: {
  //       allowDecimals: false,
  //       title: {
  //         text: 'Units'
  //       }
  //     },
  //     tooltip: {
  //       formatter: function () {
  //         return '<b>' + this.series.name + '</b><br/>' +
  //           this.point.y + ' ' + this.point.name.toLowerCase();
  //       }
  //     }
  //   }

  return (
    <>
      <HighchartsReact highcharts={Highcharts} options={opts} />
    </>
  );
};

const Category = (props) => {
  // console.log(props);
  var colors = ["#3B97B2", "#67BC42", "#FF56DE", "#E6D605", "#BC36FE", "#000"];

  console.log(props.value);
  const opts = {
    chart: {
      type: "bar",
      height: 250,
    },
    title: {
      text: "",
    },
    subtitle: {
      text: "",
    },
    credits: {
      enabled: false,
    },
    xAxis: {
      type: "category",
    },
    yAxis: {
      // labels: {
      //   format: "{point.y}%",
      // },
      labels: {
        formatter: function () {
            return Math.abs(this.value);
        }
    },
      title: {
        text: "",
      },
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      series: {
        borderWidth: 0,
        dataLabels: {
          enabled: false,
        },
      },
    },

    series: [
      {
        name: "",
        colorByPoint: true,
        data: [
          {
            name: "Booking",
            y: 5.78,
            color: colors[0],
          },
          {
            name: "flight",
            y: 5.19,
            color: colors[1],
          },
          {
            name: "refund",
            y: 32.11,
            color: colors[2],
          },
          {
            name: "payment",
            y: 10.04,
            color: colors[3],
          },
          {
            name: " service",
            y: 19.33,
            color: colors[4],
          },
        ],
      },
    ],
  };

  return (
    <>
      <HighchartsReact highcharts={Highcharts} options={opts} />
    </>
  );
};

export default CsatCqgraph;

const useStyles = makeStyles((theme) =>
  createStyles({
    MenuItem: {
      color: "#212121",
      height: "40px",
      fontWeight: "normal",
      fontSize: ".825rem",
      lineHeight: "20px",
    },
    Select: {
      backgroundColor: "#F5F8FA",
      color: "#667685",
      height: "36px",
      fontWeight: "normal",
      fontSize: ".825rem",
      lineHeight: "20px",
      borderRadius: "4px",
      marginLeft: "15px",
      letterSpacing: "0.02em",
      "& .dropdown-container": {
        "& .gray": {
          color: "#212121",
        },
        fontStyle: "normal",
        color: "#212121",
        fontWeight: "normal",
        fontSize: ".825rem",
        lineHeight: "20px",
        backgroundColor: "#FFFFFF !important",
        border: "0px solid !important",
        borderRadius: "4px !important",
      },
      "& .MuiOutlinedInput-notchedOutline": {
        borderWidth: "0px",
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        border: "0px",
      },
    },
    dateRange: {
      width: "100%",
      marginTop: "0px",
      fontSize: "small",
      letterSpacing: "0.02em !important",
      "& .rs-picker-toggle.rs-btn.rs-btn-default": {
        backgroundColor: "#FFFFFF !important",
        padding: "8px",
        width: "100%",
      },
      "& .rs-picker-toggle-textbox": {
        // marginLeft: "15px",
        paddingLeft: "24px !important",
        paddingRight: "10px !important",
      },

      "& .rs-picker-toggle": {
        borderRadius: "10px",
        borderWidth: "1px",
        borderColor: "#F1F2F6",
      },
      "& .rs-picker-toggle-value": {
        paddingLeft: "22px",
        fontSize: ".7rem",
      },
      "& span.rs-picker-toggle-placeholder": {
        fontSize: ".825rem",
        color: "#667685",
        paddingLeft: "22px",
      },
      "& svg.rs-picker-toggle-caret.rs-icon": {
        color: "#667685",
        left: "6px !important",
        top: "8px !important",
        fontSize: ".875rem",
      },
      "& .rs-picker-toggle.rs-btn .rs-picker-toggle-clean": {
        color: "#667685",
        right: "10px !important",
        top: "9px !important",
      },
    },
  })
);
