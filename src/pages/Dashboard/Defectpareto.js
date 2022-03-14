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
import { getGraphColor } from "../../utils/comman";
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
  rangeDate: [date.setDate(date.getDate() - 6), new Date()],
  defectrangeDate: [defectdate.setDate(defectdate.getDate() - 6), new Date()],
  callQuality: [],
  csta: [],
};



const Defectpareto = () => {
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
      setValue("callIndexDetails", response?.data?.data || {});
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
    getDefectPareto();
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
  useEffect(() => {
    if (defectrangeDate) {
      getDefectPareto();
    }
    // getGraphDetail();
  }, [defectrangeDate, teamdefectvalue, lobdefectvalue, agentdefectvalue]);

  return (
    <div className="graph">
      <div className="graph-content">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item sm={12}>
              <Item>
                {/* <div
                  id="chartdiv"
                  style={{ width: "100%", height: "500px" }}
                ></div> */}
                {/* <Defectpetrochart value={defectpareto} /> */}
              </Item>
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
};





export default Defectpareto;

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
