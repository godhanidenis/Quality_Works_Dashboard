/* eslint-disable react-hooks/exhaustive-deps */
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
  TableContainer,
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
  getDefectParetoDetails,
} from "../../actions";
import LocalizationProvider from "@mui/lab/LocalizationProvider/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import moment from "moment";
import Divider from "@mui/material/Divider";
import { getGraphColor, getRectangleColor } from "../../utils/comman";
import { createStyles, makeStyles } from "@mui/styles";
import HighchartsReact from "highcharts-react-official";
import pareto from "highcharts/modules/pareto";
import Highcharts from "highcharts";
import { height } from "@mui/system";

const breakpoints = {
  values: {
    xs: 0,
    sm: 0, // Phone
    md: 1200, // Tablet/Laptop
    lg: 1400, // Desktop
    xl: 1500,
  },
};

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  boxShadow: "none",
  borderRadius: "10px",
  letterSpacing: "0.02em",
  padding: "15px 15px 15px 15px",
}));
const Itemtable = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  boxShadow: "none",
  borderRadius: "10px",
  letterSpacing: "0.02em",
  padding: "0px 0px 30px 0px",
}));

var date = new Date();
var defectdate = new Date();
const defaultValues = {
  location: null,
  optionsLoB: [],
  optionsTeam: [],
  optionsAgent: [],
  cqScoreLabel: [],
  callIndexDetails: [],
  defectpareto: {},
  optionsAgent: [],
  cqscoreDetails: [],
  csatDetails: [],
  cstaScoreLabel: [],
  CriticalNonCriticalDetails: {},
  optionsDate: [],
  lob: null,
  team: null,
  rangeDate: [date.setDate(date.getDate() - 30), new Date()],
  defectrangeDate: [defectdate.setDate(defectdate.getDate() - 30), new Date()],
  callQuality: [],
  csta: [],
};

const callQualityOptions = {
  responsive: true,
  scale: {
    ticks: {
      max: 100,
      min: 0,
      stepSize: 25,
    },
  },
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Call Quality",
    },
  },
};

const callIndexDetailsdummy = [
  {
    key: "refund",
    doc_count: 71,
    cq_score: 42.71830985915493,
  },
  {
    key: "no_refund",
    doc_count: 8,
    cq_score: 51.125,
  },
  {
    key: "refund",
    doc_count: 58,
    cq_score: 42.71830985915493,
  },
  {
    key: "no_refund",
    doc_count: 98,
    cq_score: 54.125,
  },
  {
    key: "refund",
    doc_count: 60,
    cq_score: 38.71830985915493,
  },
  {
    key: "no_refund",
    doc_count: 98,
    cq_score: 54.125,
  },
  {
    key: "refund",
    doc_count: 60,
    cq_score: 38.71830985915493,
  },
];

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "First dataset",
      data: [33, 53, 85, 41, 44, 65],
      fill: true,
      backgroundColor: "rgba(75,192,192,0.2)",
      borderColor: "rgba(75,192,192,1)",
    },
    {
      label: "Second dataset",
      data: [33, 25, 35, 51, 54, 76],
      fill: false,
      borderColor: "#742774",
    },
  ],
};

const cstaOption = {
  responsive: true,
  scale: {
    ticks: {
      max: 100,
      min: 0,
      stepSize: 25,
    },
  },
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "CSAT",
    },
  },
};

const Graph = () => {
  const { setValue, watch } = useForm({ defaultValues });
  const [agentvalue, setAgentvalue] = React.useState([]);
  const [lobvalue, setLobvalue] = React.useState([]);
  const [teamvalue, setTeamvalue] = React.useState([]);
  const [agentdefectvalue, setAgentdefectvalue] = React.useState([]);
  const [lobdefectvalue, setLobdefectvalue] = React.useState([]);
  const [teamdefectvalue, setTeamdefectvalue] = React.useState([]);
  const [datevalue, setDatevalue] = React.useState(0);
  const chart = useRef(null);
  const classes = useStyles();
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
    defectpareto,
    cqscoreDetails,
    defectrangeDate,
    optionsAgent,
    csatDetails,
    CriticalNonCriticalDetails,
    cqScoreLabel,
    cstaScoreLabel,
  } = watch();

  const callQualityData = useMemo(() => {
    return {
      labels: cqScoreLabel,
      datasets: [
        {
          label: "Call Quality",
          data: callQuality,
          backgroundColor: callQuality.map((a) => getGraphColor(a, 0)),
          maxWidth: 1,
        },
      ],
    };
  }, [cqScoreLabel, callQuality]);

  const cstaData = {
    labels: cstaScoreLabel,
    datasets: [
      {
        label: "CSAT",
        data: csta,
        backgroundColor: csta.map((a) => getGraphColor(a, 0)),
        maxWidth: 1,
      },
    ],
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

  console.log(defectpareto);

  const getTeamDetail = async () => {
    const lobList = {
      lob_list: [lob.value],
    };
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
  };

  const getCallIndexData = async () => {
    // const lobList = {
    //   lob_list: [lob.value],
    // };
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
    const response = await getCallIndexDetails(filterData);
    if (response.success && response?.data?.data) {
      // console.log(response?.data?.data)
      // let team = [];
      // response.data.data.forEach((item, index) => {
      //   team.push({
      //     label: item.Team_name,
      //     value: item.id,
      //   });
      // });
      // setValue("callIndexDetails", response?.data?.data || {});
    }
  };

  const CriticalNonCriticalData = async () => {
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
    const response = await getCriticalNonCriticalData(filterData);
    if (response.success && response?.data?.data) {
      // console.log(response?.data?.data)
      // let team = [];
      // response.data.data.forEach((item, index) => {
      //   team.push({
      //     label: item.Team_name,
      //     value: item.id,
      //   });
      // });
      setValue("CriticalNonCriticalDetails", response?.data?.data);
    }
  };

  const CsatCQDetails = async () => {
    const filterData = {
      lob_id: lob?.value,
      team_id: team?.value,
      agent_id: agent?.value,
      start_date: moment(new Date(rangeDate?.[0])).format("YYYY-MM-DD"),
      end_date: moment(new Date(rangeDate?.[1])).format("YYYY-MM-DD"),
      // callduration: call_duration || [],
      // tenure: tenure || [],
      // filter: {...filtyerpayloads,  ...filterPayload},
    };
    const response = await getCsatCQDetails(filterData);
    if (response.success && response?.data?.data) {
      // console.log(response?.data?.data)
      // let team = [];
      // response.data.data.forEach((item, index) => {
      //   team.push({
      //     label: item.Team_name,
      //     value: item.id,
      //   });
      // });
      setValue("cqscoreDetails", response?.data?.data);
      setValue("csatDetails", response?.data?.data);
    }
  };

  // const getGraphDetail = async () => {
  //   const graphPayload = {
  //     team_id: team?.value,
  //     lob_id: lob?.value,
  //     start_date: moment(new Date(rangeDate?.[0])).format("YYYY-MM-DD"),
  //     end_date: moment(new Date(rangeDate?.[1])).format("YYYY-MM-DD"),
  //   };
  //   const response = await getGraph(graphPayload);
  //   if (response.success && response?.data?.data) {
  //     const labelOfCqScore = (response.data.data?.cq_score || []).map(
  //       (a) => a.date
  //     );
  //     const labelOfCsta = (response.data.data?.csat_score || []).map(
  //       (a) => a.date
  //     );
  //     const callQualityList = (response.data.data?.cq_score || []).map(
  //       (a) => a.cq_score
  //     );
  //     const cstaQualityList = (response.data.data?.csat_score || []).map(
  //       (a) => a.cq_score
  //     );
  //     setValue("cqScoreLabel", labelOfCqScore);
  //     setValue("cstaScoreLabel", labelOfCsta);
  //     setValue("callQuality", callQualityList);
  //     setValue("csta", cstaQualityList);
  //   }
  // };

  useEffect(() => {
    // CsatCQDetails();

    getLOBDetails();
    getCallIndexData();
    CriticalNonCriticalData();
  }, []);

  useEffect(() => {
    if (agentvalue || teamvalue || lobvalue || rangeDate) {
      CriticalNonCriticalData();
      getCallIndexData();
    }
  }, [agentvalue, teamvalue, lobvalue, rangeDate]);

  const handleChangelob = async (e) => {
    console.log(e);
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
  const handleDefectChangelob = async (e) => {
    console.log(e);
    setLobdefectvalue(e.target.value);
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
    console.log(e);
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

  const handleDefectChangeteam = async (e) => {
    console.log(e);
    setTeamdefectvalue(e.target.value);
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

  const handleChangeagent = async (e) => {
    console.log(e);
    setAgentvalue(e.target.value);
  };
  const handleDefectChangeagent = async (e) => {
    console.log(e);
    setAgentdefectvalue(e.target.value);
  };

  const handlecallIndexdatefilter = (e) => {
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

  useEffect(() => {
    // getGraphDetail();
  }, [lob, team, rangeDate]);

  return (
    <div className="graph">
      {/* <Divider textAlign="right" className="d-flex mt-20">
        <Grid container spacing={2}>
          <Grid item xs={12} className="d-flex">
            <DateRangePicker
              format="yyyy-MM-dd"
              placeholder="select date"
              placement="leftStart"
              showOneCalendar
              style={{ minWidth: "200px" }}
              value={rangeDate}
              onChange={(newValue) => {
                console.log(newValue);
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
                  // console.log(item)
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
                team
              </MenuItem>
              {optionsTeam &&
                optionsTeam.map((item, index) => {
                  // console.log(item)
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
                  // console.log(item)
                  return (
                    <MenuItem
                      className={classes.MenuItem}
                      key={item.id}
                      value={item.id}
                    >
                      {item.Agent_name}
                    </MenuItem>
                  );
                })}
            </Select>
          </Grid>
       
        </Grid>
      </Divider> */}
      <div className="graph-content">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item md={4} sm={6}>
              <Item>
                <Box sx={{ pl: "0px", height: "250px" }}>
                  <Grid container>
                    <Grid item lg={12} md={12} sm={12}>
                      <Grid container spacing={2} className="pb-6">
                        <Grid item xs={6} className="text-left">
                          <Typography
                            variant="subtitle1"
                            sx={{ color: "#001B34", fontWeight: 600 }}
                            gutterBottom
                            component="div"
                          >
                            Call Drivers
                          </Typography>
                        </Grid>
                        <Grid item xs={6} className="text-right">
                          <Select
                            value={datevalue}
                            onChange={handlecallIndexdatefilter}
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
                      <div style={{ overflow: "auto" }}>
                        <Table
                          sx={{
                            borderCollapse: "separate",
                            borderSpacing: "0 2px",
                            mt: "0px",
                          }}
                          aria-label="customized table"
                          stickyHeader
                        >
                          <TableHead>
                            <TableRow className="metric-table-head">
                              <TableCell
                                align="center"
                                sx={{
                                  width: "33.33%",
                                  color: "#667685 !important",
                                }}
                              >
                                Call Intent
                              </TableCell>
                              <TableCell
                                sx={{
                                  width: "33.33%",
                                  textAlign: "center",
                                  color: "#667685 !important",
                                }}
                              >
                                Call Count
                              </TableCell>
                              <TableCell
                                sx={{
                                  width: "33.33%",
                                  textAlign: "center",
                                  color: "#667685 !important",
                                }}
                              >
                                CQ Score
                              </TableCell>
                            </TableRow>
                          </TableHead>
                        </Table>
                        <div style={{ overflow: "auto", height: "165px" }}>
                          <Table style={{ tableLayout: "fixed" }}>
                            <TableBody>
                              {/* <Box style={{ height: "180px", overflowY: "auto" }}> */}
                              {callIndexDetailsdummy.length > 0 &&
                                callIndexDetailsdummy?.map((item,index) => {
                                  // console.log(item);
                                  return (
                                    <TableRow className="metric-table-body" style ={ index % 2? { background : "#f5f8fa" }:{ background : "white" }}>
                                      <TableCell align="center">
                                        {item?.key}
                                      </TableCell>

                                      <TableCell align="center">
                                        {" "}
                                        {item?.doc_count}
                                      </TableCell>
                                      <TableCell align="center">
                                        <div className="d-flex justify-content-centre">
                                          <Grid item xs={1} sx={{ mr: "4px" }}>
                                            <img
                                              src={getRectangleColor(
                                                parseFloat(
                                                  item?.cq_score
                                                ).toFixed(2),
                                                0,
                                                100
                                              )}
                                              alt="score"
                                            />
                                            {/* <Item>xs=8</Item> */}
                                          </Grid>
                                          <Grid item xs={4}>
                                            <span>
                                              {parseFloat(
                                                item?.cq_score
                                              ).toFixed(2)}
                                            </span>
                                          </Grid>
                                        </div>
                                        {/* {parseFloat(item?.cq_score).toFixed(2)} */}
                                      </TableCell>
                                    </TableRow>
                                  );
                                })}
                              {/* <TableRow className="metric-table-body">
                            <TableCell align="start">
                              Rate Cutter Offers
                            </TableCell>

                            <TableCell align="right">350</TableCell>
                          </TableRow>
                          <TableRow className="metric-table-body">
                            <TableCell align="start">Rate Offers</TableCell>

                            <TableCell align="right">850</TableCell>
                          </TableRow>
                          <TableRow className="metric-table-body">
                            <TableCell align="start">
                              Rate Cutter Offers
                            </TableCell>

                            <TableCell align="right">250</TableCell>
                          </TableRow>


                          <TableRow className="metric-table-body">
                            <TableCell align="start">Rate Offers</TableCell>

                            <TableCell align="right">200</TableCell>
                          </TableRow>
                          <TableRow className="metric-table-body">
                            <TableCell align="start">Rate Offers</TableCell>

                            <TableCell align="right">360</TableCell>
                          </TableRow>
                          <TableRow className="metric-table-body">
                            <TableCell align="start">
                              Rate Cutter Offers
                            </TableCell>

                            <TableCell align="right">450</TableCell>
                          </TableRow> */}
                              {/* </Box> */}
                            </TableBody>
                          </Table>
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                </Box>
              </Item>
            </Grid>
            <Grid item md={4} sm={6}>
              <Item>
                <Grid container spacing={2} className="pb-6">
                  <Grid item xs={8} className="text-left">
                    <Typography
                      variant="subtitle1"
                      sx={{ color: "#001B34", fontWeight: 600 }}
                      gutterBottom
                      component="div"
                    >
                      Critical Vs Non-Critical
                    </Typography>
                  </Grid>
                  <Grid item xs={4} className="text-right">
                    <Select
                      value={datevalue}
                      onChange={handlecallIndexdatefilter}
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
                <ProgressCircleCharts value={CriticalNonCriticalDetails} />
              </Item>
            </Grid>
            <Grid item md={4} sm={6}>
              <Item>
                <Grid container spacing={2} className="pb-6">
                  <Grid item xs={6} className="text-left">
                    <Typography
                      variant="subtitle1"
                      sx={{ color: "#001B34", fontWeight: 600 }}
                      gutterBottom
                      component="div"
                    >
                      Call Sentiment
                    </Typography>
                  </Grid>
                  <Grid item xs={6} className="text-right">
                    <Select
                      value={datevalue}
                      onChange={handlecallIndexdatefilter}
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
                <Callsentimentchart />
                {/* <Piechart title={"Team Lead wise snapshot"} /> */}
              </Item>
            </Grid>
          </Grid>
        </Box>
      </div>
      {/* <div className="graph-content">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item sm={6}>
              <Item>
                <Areachart title={"LOB Wise Scores"} />
              </Item>
            </Grid>
            <Grid item sm={6}>
              <Item>
                <Areachart title={"Team Lead wise snapshot"} />
              </Item>
            </Grid>
          </Grid>
        </Box>
      </div> */}

      {/* <div className="graph-content">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item sm={12}>
              <Item>
                <Defectpetrochart value={defectpareto} />
              </Item>
            </Grid>
          </Grid>
        </Box>
      </div> */}
    </div>
  );
};

const ProgressCircleCharts = (props) => {
  // console.log(props.value)
  const options = {
    chart: {
      height: "210px",
      type: "pie",
    },
    credits: {
      enabled: false,
    },
    title: {
      align: "left",
      text: "",
      style: {
        fontSize: ".875rem",
        fontWeight: "bold",
        letterSpacing: "0.02em",
      },
    },
    // plotOptions: {
    //   pie: {
    //     showInLegend: true,
    //     size: "60%",

    //     allowPointSelect: true,
    //     cursor: "pointer",
    //     dataLabels: {
    //       enabled: true,
    //       connectorShape: "straight",
    //       alignment: "right",
    //       format: "<b>{point.y}</b>%",
    //       connectorShape: function (labelPosition, connectorPosition, options) {
    //         var connectorPadding = options.connectorPadding,
    //           touchingSliceAt = connectorPosition.touchingSliceAt,
    //           series = this.series,
    //           plotWidth = series.chart.plotWidth,
    //           plotLeft = series.chart.plotLeft,
    //           alignment = labelPosition.alignment,
    //           stepDistance = 150, // in px - distance betwenn the step and vertical plot border
    //           stepX =
    //             alignment === "right"
    //               ? plotLeft + plotWidth - stepDistance
    //               : plotLeft + stepDistance;

    //         return [
    //           "M",
    //           labelPosition.x +
    //             (alignment === "right" ? 1 : -1) * connectorPadding,
    //           labelPosition.y,
    //           "L",
    //           stepX,
    //           labelPosition.y,
    //           "L",
    //           stepX,
    //           touchingSliceAt.y,
    //           "L",
    //           touchingSliceAt.x,
    //           touchingSliceAt.y,
    //         ];
    //       },
    //     },
    //   },
    // },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          format: "<b>{point.y}</b>%",
          // alignTo: 'connectors',
          connectorShape: "straight",
          crookDistance: "70%",
          enabled: true,
          distance: 20,
        },
        legend: {},
        showInLegend: true,
      },
    },
    subtitle: {
      // text: `<div style='font-size: 40px'><b>{point.y}</b>%</div> Fixed issues`,
      align: "center",
      verticalAlign: "middle",
      style: {
        textAlign: "center",
      },
      x: 0,
      y: -2,
      useHTML: true,
    },
    legend: {
      //  text: `<div style='font-size: 40px'><b>{point.z}</b>%</div> Fixed issues`,
      // title: {
      //   text:'<b>{point.z} %</b>',
      //   style: {
      //     fontSize: "1.25rem",
      //   },
      // },
      format: "<b>{point.y}</b>%",
      layout: "vertical",
      align: "right",
      verticalAlign: "middle",
      x: 0,
      y: 20,
      padding: 3,
      itemMarginBottom: 25,
      itemStyle: {
        lineHeight: "14px",
      },
    },

    tooltip: {
      headerFormat: "",
      pointFormat:
        "in percentage <b>{point.y}</b><br/>" +
        "in value: <b>{point.z}</b><br/>",
    },

    series: [
      {
        type: "pie",
        // enableMouseTracking: false,
        innerSize: "88%",
        minPointSize: 10,
        zMin: 0,
        // dataLabels: {
        //   enabled: false,
        // },
        name: "countries",
        data: [
          {
            name: "Critical",
            y: props.value.critical_miss_in_percentage,
            color: "#0171C3",
            z: props.value.critical_miss,
          },
          {
            name: "Non-Critical",
            y: props.value.non_critical_miss_in_percentage,
            color: "#FAB143",
            z: props.value.non_critical_miss,
          },
        ],
      },
    ],
  };
  const classes = useStyles();
  return (
    <>
      <HighchartsReact
        highcharts={Highcharts}
        sx={{ height: "200px" }}
        options={options}
      />
    </>
  );
};

const Defectpetrochart = (props) => {
  const opts = {
    chart: {
      height: 250,
    },
    title: {
      text: "Defect Pareto",
      style: {
        fontSize: ".875rem",
        fontWeight: "bold",
        letterSpacing: "0.02em",
      },
    },
    credits: {
      enabled: false,
    },
    xAxis: {
      categories: props?.value?.features_list,
    },
    plotOptions: {
      column: {
        zones: [
          {
            value: 35, // Values up to 10 (not including) ...
            color: "#DE3C3C", // ... have the color blue.
          },
          {
            value: 70, // Values up to 10 (not including) ...
            color: "#FAB143", // ... have the color blue.
          },
          {
            color: "#3BD999", // Values from 10 (including) and up have the color red
          },
        ],
      },
    },
    yAxis: {
      title: {
        text: "",
      },
      labels: {
        formatter: function () {
          return this.value + "%";
        },
      },
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
    labels: {
      items: [
        {
          html: "",
          style: {
            left: "50px",
            top: "18px",
            color:
              (Highcharts.defaultOptions.title.style &&
                Highcharts.defaultOptions.title.style.color) ||
              "#FAB143",
          },
        },
      ],
    },
    series: [
      {
        type: "column",
        name: "CQ",
        data: props?.value?.frequency_percentage
          ? props?.value?.frequency_percentage
          : [],
      },

      {
        type: "spline",
        name: "# Error",
        data: props?.value?.frequency ? props?.value?.frequency : [],
        marker: {
          lineWidth: 2,
          lineColor: "#FAB143",
          fillColor: "#FAB143",
        },
      },
    ],
  };

  return (
    <>
      <HighchartsReact highcharts={Highcharts} options={opts} />
    </>
  );
};

const Callsentimentchart = (props) => {
  const option = {
    chart: {
      height: "210px",
      zoomType: "x",
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
    credits: {
      enabled: false,
    },
    xAxis: {
      type: "datetime",
    },
    yAxis: {
      title: {
        text: "",
      },
      labels: {
        formatter: function () {
          return this.value / 1000 + "%";
        },
      },
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
      area: {
        fillColor: {
          linearGradient: {
            color:
              "linear-gradient(180deg, rgba(250, 177, 67, 0) 0%, rgba(250, 177, 67, 0.2) 100%)",
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
          },
          stops: [
            [0, "#FAB143"],
            [1, "#FFFFFF"],
          ],
        },

        lineWidth: 1,
        states: {
          hover: {
            lineWidth: 1,
          },
        },
        threshold: null,
      },
    },

    series: [
      {
        type: "area",
        name: "Sentiment",
        data: [
          null,
          null,
          null,
          null,
          null,
          6,
          11,
          32,
          110,
          235,
          369,
          640,
          1005,
          1436,
          2063,
          3057,
          4618,
          6444,
          9822,
          15468,
          20434,
          24126,
          27387,
          29459,
          31056,
          31982,
          32040,
          31233,
          29224,
          27342,
          26662,
          26956,
          27912,
          28999,
          28965,
          27826,
          25579,
          25722,
          24826,
          24605,
          24304,
          23464,
          23708,
          24099,
          24357,
          24237,
          24401,
          24344,
          23586,
          22380,
          21004,
          17287,
          14747,
          13076,
          12555,
          12144,
          11009,
          10950,
          10871,
          10824,
          10577,
          10527,
          10475,
          10421,
          10358,
          10295,
          10104,
          9914,
          9620,
          9326,
          5113,
          5113,
          4954,
          4804,
          4761,
          4717,
          4368,
          4018,
        ],
        color: "#FAB143",
        pointStart: Date.UTC(2010, 0, 1),
        pointInterval: 3600 * 1000 * 12,
      },
    ],
  };
  return (
    <>
      <HighchartsReact highcharts={Highcharts} options={option} />
    </>
  );
};

export default Graph;

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
      marginLeft: "0px",
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
