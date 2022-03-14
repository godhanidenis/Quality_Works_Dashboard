import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import { DataGrid } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import CustomCard from "../../components/common/CustomCard";
import callIcon from "../../assest/analyticpage/totalCalls.svg";
import BeatLoader from "react-spinners/BeatLoader";
import { DateRangePicker, DatePicker } from "rsuite";
import { useForm } from "react-hook-form";
import { createStyles, makeStyles } from "@mui/styles";
import playerIcon from "../../assest/icon/playericon.svg";
import {
  getAgentBasedTeam,
  getDefectParetoDetails,
  getEveluationTable,
  getFocusGroupTable,
  getLOB,
  getLobTeam,
  getReportingTable,
  getTopCallDriverTable,
} from "../../actions";
import moment from "moment";
import Table from "@mui/material/Table";
import {
  Box,
  MenuItem,
  Select,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { getRectangleColor } from "../../utils/comman";

const columns = [
  //   { field: "id", headerName: "ID", width: 70 },
  { field: "Date", headerAlign: "center", headerName: "Date", width: 130 },
  {
    field: "AuditCoverage",
    headerAlign: "center",
    headerName: "Audit Coverage %",
    width: 80,
  },
  {
    field: "Calltype",
    headerAlign: "center",
    headerName: "Call type / Customer Demand",
    width: 130,
  },
  {
    field: "CriticalError",
    headerAlign: "center",
    headerName: "Critical Error #",
    width: 90,
  },
  {
    field: "NonCriticalError",
    headerAlign: "center",
    headerName: "Non Critical Error #",
    width: 90,
  },
  {
    field: "CQ",
    headerAlign: "center",
    headerName: "CQ Score",
    type: "number",
    width: 80,
  },
];
const topcalldrivercolumns = [
  //   { field: "id", headerName: "ID", width: 70 },
  { field: "date", headerAlign: "center", headerName: "Date", width: 130 },
  {
    field: "Audit Coverage",
    headerAlign: "center",
    headerName: "Audit Coverage",
    width: 80,
  },
  {
    field: "call type",
    headerAlign: "center",
    headerName: "Call type",
    width: 130,
  },
  {
    field: "Critical Miss",
    headerAlign: "center",
    headerName: "Critical Miss",
    width: 90,
  },
  {
    field: "Non Critical Miss",
    headerAlign: "center",
    headerName: "Non Critical Miss",
    width: 90,
  },
  {
    field: "CQ Score",
    headerAlign: "center",
    headerName: "CQ Score",
    type: "number",
    width: 80,
  },
];
const evaluationcolumns = [
  //   { field: "id", headerName: "ID", width: 70 },
  {
    field: "Team Name",
    headerAlign: "center",
    headerName: "Team Name",

    width: 130,
  },
  {
    field: "Team Leader",
    headerAlign: "center",
    headerName: "Team Leader",
    width: 130,
  },

  {
    field: "CQ Score",
    headerAlign: "center",
    headerName: "CQ Score",
    width: 130,
  },
  {
    field: "CSAT Score",
    headerAlign: "center",
    headerName: "CSAT Score",
    width: 130,
  },
];

const reportingcolumns = [
  //   { field: "id", headerName: "ID", width: 70 },
  {
    field: "Team Name",
    headerAlign: "center",
    headerName: "Team Name",

    width: 80,
  },
  {
    field: "Team Leader",
    headerAlign: "center",
    headerName: "Team Leader",

    width: 80,
  },
  // {
  //   field: "No of Lobs",
  //   headerAlign: "center",
  //   headerName: "No of Lobs",
  //   width: 80,
  // },
  // {
  //   field: "No of Agents",
  //   headerAlign: "center",
  //   headerName: "No of Agents",
  //   width: 90,
  // },
  {
    field: "No of Calls",
    headerAlign: "center",
    headerName: "No of Calls",
    width: 90,
  },
  {
    field: "CQ Score",
    headerAlign: "center",
    headerName: "CQ Score",
    width: 130,
  },
  {
    field: "CSAT Score",
    headerAlign: "center",
    headerName: "CSAT Score",
    width: 80,
  },
  {
    field: "Critical Miss",
    headerAlign: "center",
    headerName: "Critical Miss",
    width: 130,
  },

  {
    field: "Non Critical Miss",
    headerAlign: "center",
    headerName: "Non Critical Miss",

    width: 80,
  },
];

const focusGroupcolumns = [
  //   { field: "id", headerName: "ID", width: 70 },
  {
    field: "agent_name",
    headerAlign: "center",
    headerName: "Agent Name",
    width: 110,
    minWidth: 110,
    maxWidth: 250,
  },
  {
    field: "doc_count",
    headerAlign: "center",
    headerName: "No of Calls",
    width: 110,
    minWidth: 110,
    maxWidth: 250,
  },
  {
    field: "cq_score",
    headerAlign: "center",
    headerName: "CQ Score",
    width: 110,
    minWidth: 110,
    maxWidth: 250,
  },
  {
    field: "critical_miss",
    headerAlign: "center",
    headerName: "Critical Miss",
    width: 110,
    minWidth: 110,
    maxWidth: 250,
  },
  {
    field: "non_critical_miss",
    headerAlign: "center",
    headerName: "Non Critical Miss",
    width: 110,
    minWidth: 110,
    maxWidth: 250,
  },
];

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: "12px 16px",
  boxShadow: "0px 13px 26px rgba(0, 0, 0, 0.07)",
  borderRadius: "10px",
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const rows = [
  {
    id: 1,
    Date: "17-Dec-2021",
    AuditCoverage: "67%",
    Calltype: "Vas Geactivation",
    CriticalError: "45",
    NonCriticalError: "11",
    CQ: "33%",
  },
  {
    id: 2,
    Date: "17-Dec-2021",
    AuditCoverage: "67%",
    Calltype: "Vas Geactivation",
    CriticalError: "45",
    NonCriticalError: "11",
    CQ: "33%",
  },
  {
    id: 3,
    Date: "17-Dec-2021",
    AuditCoverage: "67%",
    Calltype: "Vas Geactivation",
    CriticalError: "45",
    NonCriticalError: "11",
    CQ: "33%",
  },
  {
    id: 4,
    Date: "17-Dec-2021",
    AuditCoverage: "67%",
    Calltype: "Vas Geactivation",
    CriticalError: "45",
    NonCriticalError: "11",
    CQ: "33%",
  },
  {
    id: 5,
    Date: "17-Dec-2021",
    AuditCoverage: "67%",
    Calltype: "Vas Geactivation",
    CriticalError: "45",
    NonCriticalError: "11",
    CQ: "33%",
  },
  {
    id: 6,
    Date: "17-Dec-2021",
    AuditCoverage: "67%",
    Calltype: "Vas Geactivation",
    CriticalError: "45",
    NonCriticalError: "11",
    CQ: "33%",
  },
  {
    id: 7,
    Date: "17-Dec-2021",
    AuditCoverage: "67%",
    Calltype: "Vas Geactivation",
    CriticalError: "45",
    NonCriticalError: "11",
    CQ: "33%",
  },
  {
    id: 8,
    Date: "17-Dec-2021",
    AuditCoverage: "67%",
    Calltype: "Vas Geactivation",
    CriticalError: "45",
    NonCriticalError: "11",
    CQ: "33%",
  },
  {
    id: 9,
    Date: "17-Dec-2021",
    AuditCoverage: "67%",
    Calltype: "Vas Geactivation",
    CriticalError: "45",
    NonCriticalError: "11",
    CQ: "33%",
  },
];
var date = new Date();
var focussdate = new Date();
var rangedate = new Date();
var reportingdate = new Date();
var defectdate = new Date();
var eveluationdate = new Date();
const defaultValues = {
  location: null,
  optionsLoB: [],
  optionsTeam: [],
  optionsAgent: [],
  focusgrouptabledata: [],
  reportingtabledata: [],
  topcalldrivertabledata: [],
  cqScoreLabel: [],
  cstaScoreLabel: [],
  optionsDate: [],
  eveluationtabledata: [],
  lob: null,
  date: date.setDate(date.getDate() - 30),
  team: null,
  reportingrangeDate: [
    reportingdate.setDate(reportingdate.getDate() - 30),
    new Date(),
  ],
  focusrangeDate: [focussdate.setDate(focussdate.getDate() - 30), new Date()],
  rangeDate: [rangedate.setDate(rangedate.getDate() - 30), new Date()],
  defectrangeDate: [defectdate.setDate(defectdate.getDate() - 30), new Date()],
  eveluationDate: [
    eveluationdate.setDate(eveluationdate.getDate() - 30),
    new Date(),
  ],
  callQuality: [],
  csta: [],
};
const Tables = (props) => {
  console.log("table props", props);
  const [agentdefectvalue, setAgentdefectvalue] = React.useState([]);
  const [datevalue, setDatevalue] = React.useState(0);
  const [lobdefectvalue, setLobdefectvalue] = React.useState([]);
  const [teamdefectvalue, setTeamdefectvalue] = React.useState([]);
  const { setValue, watch } = useForm({ defaultValues });
  const {
    optionsLoB,
    optionsTeam,
    focusgrouptabledata,
    reportingtabledata,
    focusrangeDate,
    rangeDate,
    defectrangeDate,
    defectpareto,
    date,
    eveluationtabledata,
    topcalldrivertabledata,
    reportingrangeDate,
    eveluationDate,
  } = watch();
  // const [value, setValue] = React.useState([new Date('2017-02-01'), new Date('2017-05-20')]);
  // const [values, setValues] = React.useState([(new Date() - 7),new Date()]);
  const FocusGroupTable = async () => {
    const filterData = {
      start_date: moment(new Date(focusrangeDate?.[0])).format("YYYY-MM-DD"),
      end_date: moment(new Date(focusrangeDate?.[1])).format("YYYY-MM-DD"),
    };
    const response = await getFocusGroupTable(filterData);
    if (!response.data.error && response?.data?.data) {
      console.log(response.data.data);
      let focustabledata = [];
      response?.data?.data?.map((item, index) => {
        focustabledata.push({ ...item, id: index + 1 });
        console.log(item);
      });
      console.log(focustabledata);

      setValue("focusgrouptabledata", focustabledata);
    } else {
      setValue("focusgrouptabledata", []);
    }
  };

  const viewEvaluation = (id) => {
    props.history.push(`/evaluation/${id}`);
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

  const ReportingTable = async () => {
    const filterData = {
      start_date: moment(new Date(reportingrangeDate?.[0])).format(
        "YYYY-MM-DD"
      ),
      end_date: moment(new Date(reportingrangeDate?.[1])).format("YYYY-MM-DD"),
    };
    const response = await getReportingTable(filterData);
    if (!response.data.error && response?.data?.data) {
      console.log(response.data.data);
      let reportingtabledata = [];
      response?.data?.data?.map((item, index) => {
        reportingtabledata.push({ ...item, id: index + 1 });
        console.log(item);
      });
      console.log(reportingtabledata);

      setValue("reportingtabledata", reportingtabledata);
    } else {
      setValue("reportingtabledata", []);
    }
  };

  const getEvaluation = async () => {
    const filterData = {
      start_date: moment(new Date(eveluationDate?.[0])).format("YYYY-MM-DD"),
      end_date: moment(new Date(eveluationDate?.[1])).format("YYYY-MM-DD"),
    };
    const response = await getEveluationTable(filterData);
    if (!response.data.error && response?.data?.data) {
      console.log(response.data.data);
      let eveluationtable = [];
      response?.data?.data?.basic_ten_calls?.map((item, index) => {
        eveluationtable.push({ ...item, id: index + 1 });
        console.log(item);
      });
      console.log(eveluationtable);

      setValue("eveluationtabledata", eveluationtable);
    } else {
      setValue("eveluationtabledata", []);
    }
  };

  const TopCallDriverTable = async () => {
    console.log("date",moment(new Date(date)).format("YYYY-MM-DD"))
    const filterData = {
      date: moment(new Date('2022-02-12')).format("YYYY-MM-DD"),
      // end_date: moment(new Date(reportingrangeDate?.[1])).format("YYYY-MM-DD"),
    };
    const response = await getTopCallDriverTable(filterData);
    console.log(response?.data?.data);
    if (response.success && response?.data?.data.length > 0) {
      console.log(response.data.data);
      let topcalldrivertabledata = [];
      response?.data?.data.map((item, index) => {
        topcalldrivertabledata.push({ ...item, id: index + 1 });
        console.log(item);
      });
      console.log(topcalldrivertabledata);
      setValue("topcalldrivertabledata", topcalldrivertabledata);
    } else {
      setValue("topcalldrivertabledata", {});
    }
  };
  useEffect(() => {
    if (focusrangeDate) {
      FocusGroupTable();
    }
  }, [focusrangeDate]);

  useEffect(() => {
    if (reportingrangeDate) {
      ReportingTable();
    }
  }, [reportingrangeDate]);
  useEffect(() => {
    if (eveluationDate) {
      getEvaluation();
    }
  }, [eveluationDate]);

  const getDefectPareto = async () => {
    const filterData = {
      lob_id: lobdefectvalue,
      team_id: teamdefectvalue,
      agent_id: agentdefectvalue,
      start_date: moment(new Date(defectrangeDate?.[0])).format("YYYY-MM-DD"),
      end_date: moment(new Date(defectrangeDate?.[1])).format("YYYY-MM-DD"),
      // callduration: call_duration || [],
      // tenure: tenure || [],
      // filter: {...filtyerpayloads,  ...filterPayload},
    };
    const response = await getDefectParetoDetails(filterData);
    if (response.success && response?.data?.data) {
      console.log(response?.data?.data);
      // let team = [];
      // response.data.data.forEach((item, index) => {
      //   team.push({
      //     label: item.Team_name,
      //     value: item.id,
      //   });
      // });
      setValue("defectpareto", response?.data?.data);
    }
  };

  const handleChangelob = async (e) => {
    // console.log(e);
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
    // console.log(e);
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

  useEffect(() => {
    if (defectrangeDate) {
      getDefectPareto();
    }
    // getGraphDetail();
  }, [defectrangeDate, teamdefectvalue, lobdefectvalue, agentdefectvalue]);
  useEffect(() => {
    if (date) {
      TopCallDriverTable();
    }
  }, [date]);
  useEffect(() => {
    getEvaluation();
    getLOBDetails();
    getDefectPareto();
    FocusGroupTable();
    ReportingTable();
    TopCallDriverTable();
  }, []);

  const handledefectparetodatefilter = (e) => {
    var date = new Date();
    console.log(e.target.value);
    setDatevalue(e.target.value);
    if (e.target.value === "0") {
      console.log("zero", [date.setDate(date.getDate() - 30), new Date()]);
      setValue("defectrangeDate", [
        date.setDate(date.getDate() - 6),
        new Date(),
      ]);
    } else if (e.target.value === "1") {
      setValue("defectrangeDate", [
        date.setDate(date.getDate() - 1),
        new Date(),
      ]);
      console.log("one".datevalue);
    } else if (e.target.value === "2") {
      // console.log("two", datevalue);
      setValue("defectrangeDate", [date.setDate(date.getDate()), new Date()]);
    }
  };
  const classes = useStyles();
  return (
    <div className="table">
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={6}>
          <Item>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography
                  variant="h5"
                  sx={{
                    pb: 1,
                    fontSize: ".875rem",
                    fontWeight: "bold",
                    color: "#001B34",
                    textAlign: "start",
                    pt: "12px",
                  }}
                  component="div"
                >
                  Focus Group
                </Typography>
              </Grid>
              <Grid
                item
                xs={8}
                sx={{
                  textAlign: "end",
                  pb: "6px",
                }}
              >
                {" "}
                <DateRangePicker
                  format="yy-MMM-dd"
                  placeholder="select date"
                  showOneCalendar
                  placement="leftStart"
                  style={{ maxWidth: "200px" }}
                  value={focusrangeDate}
                  onChange={(newValue) => {
                    // console.log(newValue);
                    setValue("focusrangeDate", newValue);
                  }}
                  className={classes.dateRange}
                />
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
                        width: "20%",
                        color: "#667685 !important",
                      }}
                    >
                      Agent
                    </TableCell>
                    <TableCell
                      sx={{
                        width: "20%",
                        textAlign: "center",
                        color: "#667685 !important",
                      }}
                    >
                      No of Calls
                    </TableCell>
                    <TableCell
                      sx={{
                        width: "20%",
                        textAlign: "center",
                        color: "#667685 !important",
                      }}
                    >
                      CQ Score
                    </TableCell>
                    <TableCell
                      sx={{
                        width: "20%",
                        textAlign: "center",
                        color: "#667685 !important",
                      }}
                    >
                      Critical Miss
                    </TableCell>
                    <TableCell
                      sx={{
                        width: "20%",
                        textAlign: "center",
                        color: "#667685 !important",
                      }}
                    >
                      Non Critical Mis
                    </TableCell>
                  </TableRow>
                </TableHead>
              </Table>
              <div style={{ overflow: "auto", height: "175px" }}>
                <Table style={{ tableLayout: "fixed" }}>
                  <TableBody>
                    {focusgrouptabledata.length > 0 &&
                      focusgrouptabledata?.map((item,index) => {
                        // console.log(item);
                        return (
                          <TableRow className="metric-table-body" style ={ index % 2? { background : "#f5f8fa" }:{ background : "white" }}>
                            <TableCell align="center">
                              {item?.agent_name}
                            </TableCell>

                            <TableCell align="center">
                              {" "}
                              {item?.doc_count}
                            </TableCell>
                            <TableCell align="center">
                            <div className="d-flex justify-content-centre">
                                          <Grid item xs={2} sx={{ mr: "4px" }}>
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
                              {/* {" "}
                              <div>
                                <img
                                  src={getRectangleColor(
                                    parseFloat(item?.cq_score).toFixed(2),
                                    0,
                                    100
                                  )}
                                  alt="score"
                                />
                                &nbsp; {parseFloat(item?.cq_score).toFixed(2)}
                              </div> */}
                            </TableCell>
                            <TableCell align="center">
                              {item?.critical_miss}
                            </TableCell>

                            <TableCell align="center">
                              {" "}
                              {item?.non_critical_miss}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>

                {/* <DataGrid
                rows={focusgrouptabledata}
                columns={focusGroupcolumns}
                headerHeight={40}
                autoHeight
                className="datatable"
                hideFooter={true}
                rowHeight={32}
                checkboxSelection={false}
              /> */}
              </div>
            </div>
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography
                  variant="h5"
                  sx={{
                    pb: 1,
                    pt: "12px",
                    fontSize: ".875rem",
                    fontWeight: "bold",
                    color: "#001B34",
                    textAlign: "start",
                  }}
                  component="div"
                >
                  Top Call Drivers
                </Typography>
              </Grid>
              <Grid
                item
                xs={8}
                sx={{
                  textAlign: "end",
                  pb: "6px",
                }}
              >
                {" "}
                <DatePicker
                  isoWeek
                  format="yy-MMM-dd"
                  value={date}
                  className={classes.dateRange}
                  placement="leftStart"
                  placeholder="select date"
                  onChange={(newValue) => {
                    // console.log(newValue);
                    setValue("date", newValue);
                  }}
                  style={{ width: 130 }}
                />
                {/* <DateRangePicker
                  format="yyyy-MM-dd"
                  placeholder="select date"
                  showOneCalendar
                  placement="leftStart"
                  style={{ maxWidth: "200px" }}
                  value={rangeDate}
                  onChange={(newValue) => {
                    // console.log(newValue);
                    setValue("rangeDate", newValue);
                  }}
                  className={classes.dateRange}
                /> */}
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
                        width: "25%",
                        color: "#667685 !important",
                      }}
                    >
                      Date
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        width: "15%",
                        color: "#667685 !important",
                      }}
                    >
                      Audit Coverage
                    </TableCell>
                    <TableCell
                      sx={{
                        width: "15%",
                        textAlign: "center",
                        color: "#667685 !important",
                      }}
                    >
                      Call type
                    </TableCell>
                    <TableCell
                      sx={{
                        width: "15%",
                        textAlign: "center",
                        color: "#667685 !important",
                      }}
                    >
                      CQ Score
                    </TableCell>
                    <TableCell
                      sx={{
                        width: "15%",
                        textAlign: "center",
                        color: "#667685 !important",
                      }}
                    >
                      Critical Miss
                    </TableCell>
                    <TableCell
                      sx={{
                        width: "15%",
                        textAlign: "center",
                        color: "#667685 !important",
                      }}
                    >
                      Non Critical Mis
                    </TableCell>
                  </TableRow>
                </TableHead>
              </Table>
              <div style={{ overflow: "auto", height: "175px" }}>
                <Table style={{ tableLayout: "fixed" }}>
                  <TableBody>
                    {/* <Box style={{ height: "180px", overflowY: "auto" }}> */}
                    {topcalldrivertabledata.length > 0 &&
                      topcalldrivertabledata?.map((item,index) => {
                        // console.log(item);
                        return (
                          <TableRow className="metric-table-body" style ={ index % 2? { background : "#f5f8fa" }:{ background : "white" }}>
                            <TableCell align="center">{item?.date}</TableCell>
                            <TableCell align="center">
                              {item?.["Audit Coverage"]}
                            </TableCell>
                            <TableCell align="center">
                              {" "}
                              {item?.["call type"]}
                            </TableCell>
                            <TableCell align="center">
                            <div className="d-flex justify-content-centre">
                                          <Grid item xs={2} sx={{ mr: "4px" }}>
                                            <img
                                              src={getRectangleColor(
                                                parseFloat(
                                                  item?.["CQ Score"]
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
                                                item?.["CQ Score"]
                                              ).toFixed(2)}
                                            </span>
                                          </Grid>
                                        </div>
                              {/* {" "}
                              <div>
                                <img
                                  src={getRectangleColor(
                                    parseFloat(item?.["CQ Score"]).toFixed(2),
                                    0,
                                    100
                                  )}
                                  alt="score"
                                />
                                &nbsp;{" "}
                                {parseFloat(item?.["CQ Score"]).toFixed(2)}
                              </div> */}
                            </TableCell>

                            <TableCell align="center">
                              {" "}
                              {item?.["Critical Miss"]}
                            </TableCell>
                            <TableCell align="center">
                              {" "}
                              {item?.["Non Critical Miss"]}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </div>
              {/* <DataGrid
                rows={topcalldrivertabledata}
                columns={topcalldrivercolumns}
                checkboxSelection={false}
                // hideFooterPagination={true}
                className="datatable"
                hideFooter={true}
                headerHeight={40}
                rowHeight={32}
              /> */}
            </div>
          </Item>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item sm={12}>
          <Item>
            <Grid container spacing={2} className="pb-6">
              <Grid item xs={6}>
                <Typography
                  variant="subtitle1"
                  sx={{ color: "#001B34", fontWeight: 600, textAlign: "start" }}
                  gutterBottom
                  component="div"
                >
                  Defect Pareto
                </Typography>
              </Grid>
              <Grid item xs={6} className="text-right">
                <Select
                  value={lobdefectvalue}
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
                  value={teamdefectvalue}
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
                  onChange={handledefectparetodatefilter}
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
            <Grid item xs={12} className="pb-6">
              <Defectpetrochart value={defectpareto} />
            </Grid>
          </Item>
        </Grid>
        {/* </div>  */}
      </Grid>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={6}>
          <Item>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography
                  variant="h5"
                  sx={{
                    pt: "12px",
                    fontSize: ".875rem",
                    fontWeight: "bold",
                    color: "#001B34",
                    textAlign: "start",
                  }}
                  component="div"
                >
                  Reporting
                </Typography>
              </Grid>
              <Grid
                item
                xs={8}
                sx={{
                  textAlign: "end",
                }}
              >
                <DateRangePicker
                  format="yy-MMM-dd"
                  placeholder="select date"
                  showOneCalendar
                  placement="leftStart"
                  style={{ maxWidth: "200px", marginRight: "15px" }}
                  value={reportingrangeDate}
                  onChange={(newValue) => {
                    // console.log(newValue);
                    setValue("reportingrangeDate", newValue);
                  }}
                  className={classes.dateRange}
                />
                <Button
                  variant="contained"
                  className="reporting-btn"
                  size="small"
                  onClick={() => props.history.push("/reporting")}
                >
                  Go To Reporting
                </Button>
              </Grid>
            </Grid>
            {/* <div style={{ height: 210, width: "100%" }} className="mt-12"> */}
            <div style={{ overflow: "auto" }}>
              <Table
                sx={{
                  borderCollapse: "separate",
                  borderSpacing: "0 2px",
                  mt: "6px",
                }}
                aria-label="customized table"
                stickyHeader
              >
                <TableHead>
                  <TableRow className="metric-table-head">
                    <TableCell
                      align="center"
                      sx={{
                        width: "20%",
                        color: "#667685 !important",
                      }}
                    >
                      Team
                    </TableCell>
                    <TableCell
                      sx={{
                        width: "20%",
                        textAlign: "center",
                        color: "#667685 !important",
                      }}
                    >
                      Team Leader
                    </TableCell>
                    <TableCell
                      sx={{
                        width: "20%",
                        textAlign: "center",
                        color: "#667685 !important",
                      }}
                    >
                      No of Calls
                    </TableCell>
                    <TableCell
                      sx={{
                        width: "20%",
                        textAlign: "center",
                        color: "#667685 !important",
                      }}
                    >
                      CQ Score
                    </TableCell>
                    {/* <TableCell
                              sx={{
                                width: "20%",
                                textAlign: "center",
                                color: "#667685 !important",
                              }}
                            >
                              CSAT Score
                            </TableCell> */}
                    <TableCell
                      sx={{
                        width: "20%",
                        textAlign: "center",
                        color: "#667685 !important",
                      }}
                    >
                      C/N Miss
                    </TableCell>
                  </TableRow>
                </TableHead>
              </Table>
              <div style={{ overflow: "auto", height: "175px" }}>
                <Table style={{ tableLayout: "fixed" }}>
                  <TableBody>
                    {/* <Box style={{ height: "180px", overflowY: "auto" }}> */}
                    {reportingtabledata.length > 0 &&
                      reportingtabledata?.map((item ,index) => {
                        // console.log(item);
                        return (
                          <TableRow className="metric-table-body h-40" style ={ index % 2? { background : "#f5f8fa" }:{ background : "white" }}>
                            <TableCell align="center">
                              {item?.["Team Name"]}
                            </TableCell>

                            <TableCell align="center">
                              {" "}
                              {item?.["Team Leader"]}
                            </TableCell>
                            <TableCell align="center">
                              {" "}
                              {item?.["No of Calls"]}
                            </TableCell>
                            <TableCell align="center">
                            <div className="d-flex justify-content-centre">
                                          <Grid item xs={2} sx={{ mr: "4px" }}>
                                            <img
                                              src={getRectangleColor(
                                                parseFloat(
                                                  item?.["CQ Score"]
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
                                                item?.["CQ Score"]
                                              ).toFixed(2)}
                                            </span>
                                          </Grid>
                                        </div>
                            </TableCell>
                            {/* <TableCell align="center">
                                    {item?.['CSAT Score']}
                                  </TableCell> */}

                            <TableCell align="center">
                              <div className="d-flex justify-content-centre">
                              <Grid
                                  item
                                  xs={4}
                                  sx={{ mr: "4px" }}
                                  className={
                                    item?.["Critical Miss"] < 30
                                      ? "green-circle"
                                      : "red-circle"
                                  }
                                >
                                  {item?.["Critical Miss"]}
                                  {/* <Item>xs=8</Item> */}
                                </Grid>
                                <Grid
                                  item
                                  xs={4}
                                  className={
                                    item?.["Non Critical Miss"] < 30
                                      ? "green-circle"
                                      : "red-circle"
                                  }
                                >
                                  {item?.["Non Critical Miss"]}
                                </Grid>
                              </div>
                              
                              {/* <Grid
                                container
                                spacing={2}
                                sx={{ justifyContent: "center", margin: "1px" }}
                              >
                                <Grid
                                  item
                                  xs={4}
                                  className={
                                    item?.["Non Critical Miss"] < 30
                                      ? "green-circle"
                                      : "red-circle"
                                  }
                                >
                                  {item?.["Non Critical Miss"]}
                                </Grid>
                           
                              </Grid> */}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </div>

              {/* <DataGrid
                rows={reportingtabledata}
                columns={reportingcolumns}
                className="datatable"
                headerHeight={40}
                hideFooter={true}
                rowHeight={32}
                checkboxSelection={false}
              /> */}
            </div>
          </Item>
          {/* <Typography
            variant="h5"
            sx={{ pb: 1, fontSize: "1.2rem" }}
            component="div"
          >
            Top Call Drivers
          </Typography>
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid rows={rows} columns={columns} checkboxSelection={false} />
          </div>*/}
        </Grid>
        <Grid item xs={6}>
          <Item>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography
                  variant="h5"
                  sx={{
                    pt: "12px",
                    fontSize: ".875rem",
                    fontWeight: "bold",
                    color: "#001B34",
                    textAlign: "start",
                  }}
                  component="div"
                >
                  Evaluation
                </Typography>
              </Grid>
              <Grid
                item
                xs={8}
                sx={{
                  textAlign: "end",
                }}
              >
                <DateRangePicker
                  format="yy-MMM-dd"
                  placeholder="select date"
                  showOneCalendar
                  placement="leftStart"
                  style={{ maxWidth: "200px", marginRight: "15px" }}
                  value={eveluationDate}
                  onChange={(newValue) => {
                    // console.log(newValue);
                    setValue("eveluationDate", newValue);
                  }}
                  className={classes.dateRange}
                />
                <Button
                  variant="contained"
                  className="reporting-btn"
                  size="small"
                  onClick={() => props.history.push("/evaluation")}
                >
                  Go To Evaluation
                </Button>
              </Grid>
            </Grid>

            <div style={{ overflow: "auto" }}>
            {/* <BeatLoader loading={loading} size={15} /> */}
              <Table
                sx={{
                  borderCollapse: "separate",
                  borderSpacing: "0 2px",
                  mt: "6px",
                }}
                aria-label="customized table"
                stickyHeader
              >
                <TableHead>
                  <TableRow className="metric-table-head">
                    <TableCell
                      align="center"
                      sx={{
                        width: "25%",
                        color: "#667685 !important",
                      }}
                    >
                      Agent
                    </TableCell>
                    <TableCell
                      sx={{
                        width: "25%",
                        textAlign: "center",
                        color: "#667685 !important",
                      }}
                    >
                      Date
                    </TableCell>

                    <TableCell
                      sx={{
                        width: "25%",
                        textAlign: "center",
                        color: "#667685 !important",
                      }}
                    >
                      CQ Score
                    </TableCell>
                    <TableCell
                      sx={{
                        width: "25%",
                        textAlign: "center",
                        color: "#667685 !important",
                      }}
                    >
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
              </Table>
              <div style={{ overflow: "auto", height: "175px" }}>
                <Table style={{ tableLayout: "fixed" }}>
                  <TableBody>
                    {/* <Box style={{ height: "180px", overflowY: "auto" }}> */}
                    {eveluationtabledata?.length > 0 &&
                      eveluationtabledata?.map((item,index) => {
                        // console.log(item);
                        return (
                          <TableRow className="metric-table-body" style ={ index % 2? { background : "#f5f8fa" }:{ background : "white" }}>
                            <TableCell align="center">
                              {item?.agent_name}
                            </TableCell>

                            <TableCell align="center">
                              {" "}
                              {item?.date_of_call}
                            </TableCell>

                            <TableCell align="center">
                            <div className="d-flex justify-content-centre">
                                          <Grid item xs={1} sx={{ mr: "0px" }}>
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
                            </TableCell>
                            <TableCell align="center">
                              <div
                                style={{ display: "inline-table" }}
                                onClick={() => viewEvaluation(item?.call_id)}
                              >
                                <div className="player-icon ">
                                  {" "}
                                  <img src={playerIcon} alt="score" className="pb-6" />
                                </div>
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </div>
              {/* <DataGrid
                rows={reportingtabledata}
                columns={evaluationcolumns}
                className="datatable"
                headerHeight={40}
                hideFooter={true}
                rowHeight={32}
                checkboxSelection={false}
              /> */}
            </div>
          </Item>
        </Grid>
      </Grid>
    </div>
  );
};

const Defectpetrochart = (props) => {
  const opts = {
    chart: {
      height: 250,
    },
    title: {
      text: "",
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
        // zones: [
        //   {
        //     value: 35, // Values up to 10 (not including) ...
        //     color: "#DE3C3C", // ... have the color blue.
        //   },
        //   {
        //     value: 70, // Values up to 10 (not including) ...
        //     color: "#FAB143", // ... have the color blue.
        //   },
        //   {
        //     color: "#3BD999", // Values from 10 (including) and up have the color red
        //   },
        // ],
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
      // {
      //   type: "column",
      //   name: "John",
      //   data: [2, 3, 5, 7, 6],
      // },
      // {
      //   type: "column",
      //   name: "Joe",
      //   data: [4, 3, 3, 9, 0],
      // },
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
      // {
      //   type: "pie",
      //   name: "Total consumption",
      //   data: [
      //     {
      //       name: "Jane",
      //       y: 13,
      //       color: Highcharts.getOptions().colors[0], // Jane's color
      //     },
      //     {
      //       name: "John",
      //       y: 23,
      //       color: Highcharts.getOptions().colors[1], // John's color
      //     },
      //     {
      //       name: "Joe",
      //       y: 19,
      //       color: Highcharts.getOptions().colors[2], // Joe's color
      //     },
      //   ],
      //   center: [100, 80],
      //   size: 100,
      //   showInLegend: false,
      //   dataLabels: {
      //     enabled: false,
      //   },
      // },
    ],
  };

  return (
    <>
      <HighchartsReact highcharts={Highcharts} options={opts} />
    </>
  );
};

export default Tables;
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
      "& .MuiOutlinedInput-input": {
        // padding: "11.5px 14px !important"
      },
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
        backgroundColor: "#F5F8FA !important",
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
