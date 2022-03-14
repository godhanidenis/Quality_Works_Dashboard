import React, { useEffect, useState } from "react";
import { Box, Grid, Paper, styled } from "@mui/material";
import { getoverallholdDetails, getsimplingDetails, getTotalcallDetails, processingState } from "../../actions";
import CustomCard from "../../components/common/CustomCard";
import teamIcon from "../../assest/icon/teamIcon.svg";
import agentIcon from "../../assest/icon/agentIcon.svg";
import rateIcon from "../../assest/icon/rateIcon.svg";
import uploadIcon from "../../assest/icon/uploadIcon.svg";
import callIcon from "../../assest/analyticpage/totalCalls.svg";
import bprocesingI from "../../assest/dashboardpage/blueprocess.svg";
import gprocesingI from "../../assest/dashboardpage/greenprocess.svg";
import rprocesingI from "../../assest/dashboardpage/redprocess.svg";
import yprocesingI from "../../assest/dashboardpage/yellowprocess.svg";
import { useForm } from "react-hook-form";
import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import "./Dashboard.scss";
import Divider from "@mui/material/Divider";
import { createStyles, makeStyles } from "@mui/styles";
import moment from "moment";

const Item = styled(Paper)(({ theme }) => ({
  // ...theme.typography.body2,
  boxShadow: "none",
  borderRadius: "5px",
  padding: "10px 10px 20px 10px",
  background: "#ffffff",
}));
var date = new Date();
const defaultValues = {
  location: null,
  optionsLoB: [],
  optionsTeam: [],
  optionsAgent: [],
  cqScoreLabel: [],
  cstaScoreLabel: [],
  optionsDate: [],
  lob: null,
  team: null,
  rangeDate: [date.setDate(date.getDate() - 30), new Date()],
  simlingDate: [date.setDate(date.getDate() - 30), new Date()],
  overHoldDate: [date.setDate(date.getDate() - 30), new Date()],
  callQuality: [],
  csta: [],
  totalCalldata:[],
  overallholddata:[]
};

const Statistics = () => {
  const [data, setData] = useState({});
  const classes = useStyles();
  const { watch, setValue, control } = useForm({
    defaultValues,
    mode: "onChange",
  });
  const {
    rangeDate,
    simlingDate,
    overHoldDate,
    totalCalldata,
    simplinradedata,
    overallholddata
  } = watch();

  const getStatistics = async () => {
    const response = await processingState();
    if (response.success && response?.data?.data) {
      setData(response?.data?.data);
    }
  };

    const getTotalcall = async () => {
      const filterData = {
        start_date: moment(new Date(rangeDate?.[0])).format("YYYY-MM-DD"),
        end_date: moment(new Date(rangeDate?.[1])).format("YYYY-MM-DD"),
        // callduration: call_duration || [],
        // tenure: tenure || [],
        // filter: {...filtyerpayloads,  ...filterPayload},
      };
      const response = await getTotalcallDetails(filterData);
      if (response.success && response?.data?.data) {
        // setData(response?.data?.data);
        console.log(response?.data?.data)
        setValue("totalCalldata",response?.data?.data)
      }
    };

    const getsimpling = async () => {
      const filterData = {
        start_date: moment(new Date(simlingDate?.[0])).format("YYYY-MM-DD"),
        end_date: moment(new Date(simlingDate?.[1])).format("YYYY-MM-DD"),
        // callduration: call_duration || [],
        // tenure: tenure || [],
        // filter: {...filtyerpayloads,  ...filterPayload},
      };
      const response = await getsimplingDetails(filterData);
      if (response.success && response?.data?.data) {
        // setData(response?.data?.data);
        console.log(response?.data?.data)
        setValue("simplinradedata",response?.data?.data)
      }
    };

    const getoverallhold = async () => {
      const filterData = {
        start_date: moment(new Date(overHoldDate?.[0])).format("YYYY-MM-DD"),
        end_date: moment(new Date(overHoldDate?.[1])).format("YYYY-MM-DD"),
        // callduration: call_duration || [],
        // tenure: tenure || [],
        // filter: {...filtyerpayloads,  ...filterPayload},
      };
      const response = await getoverallholdDetails(filterData);
      if (response.success && response?.data?.data) {
        // setData(response?.data?.data);
        console.log(response?.data?.data)
        setValue("overallholddata",response?.data?.data)
      }
    };

  useEffect(() => {
    getStatistics();
    getTotalcall()
    getsimpling()
    getoverallhold()
  }, []);

  useEffect(() => {
    if(rangeDate){
      getTotalcall()
    }
  }, [rangeDate]);

  useEffect(() => {
    if(simlingDate){
      getsimpling()
    }
  }, [simlingDate]);
  useEffect(() => {
    if(overHoldDate){
      getoverallhold()
    }
  }, [overHoldDate]);

  return (
    <>
      <div className="statistic">
        <div className="pt-32 pb-16 fs-16 fw-bold text-black"></div>
        <div>
          <div className="text-right justify-content-flex-end mb-12">
            {/* <Divider textAlign="right" className="d-flex">
              <Grid container> */}
                {/* <Grid item xs={12} lg={12} className="d-flex">
                  <DateRangePicker
                    format="y-MMM-dd"
                    placeholder="select date"
                    showOneCalendar
                    placement="leftStart"
                    onChange={(newValue) => {
                      // console.log(newValue);
                      setValue("rangeDate", newValue);
                    }}
                    className={classes.dateRange}
                  />
                </Grid> */}
                {/* <MultiSelect
                  options={lob}
                  onChange={handleChangelob}
                  value={lobvalue}
                  className={classes.Select}
                  labelledBy="Lob"
                  hasSelectAll={false}
                  // valueRenderer={customValueRenderer}
                  overrideStrings={{
                    allItemsAreSelected: "All items are selected.",
                    clearSearch: "Clear Search",
                    noOptions: "No options",
                    search: "Search",
                    selectAll: "Select All",
                    selectAllFiltered: "Select All (Filtered)",
                    selectSomeItems: "Select Lob",
                  }}
                /> */}

                {/* <CustomSelectInput
                selectedValue={lob}
                handleSelectChange={(value) => setValue("lob", value)}
                placeholder="Select LoB"
                options={optionsLoB}
                customClass="ml-12"
              />
              <CustomSelectInput
                selectedValue={team}
                handleSelectChange={(value) => setValue("team", value)}
                placeholder="Select Team"
                options={optionsTeam}
                customClass="ml-12"
              /> */}
              {/* </Grid>
            </Divider> */}
          </div>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={4} >
              {/* <Grid item xs={12} sm={6} md={3} lg={2.4} className="w-100">
                <Item className="enable-sample-content">
                  <CustomCard
                    title="No.of Teams"
                    number="2"
                    titleLargeIcon={callIcon}
                    customClass={`process${0}  cursor-pointer custome-line0`}
                    loading={false}
                    values={watch()}
                    control={control}
                    setValue={setValue}
                    hidePercentage
                    dashboard={true}
                  />
                </Item>
              </Grid> */}
               <Grid item xs={12} sm={6} md={3} lg={3} className="w-100">
                <Item className="enable-sample-content">
                  <CustomCard
                    title="Agents"
                    number={data["total no.agents"]}
                    titleLargeIcon={agentIcon}
                    values={watch()}
                    control={control}
                    agents={totalCalldata?.no_of_agents}
                    teams={totalCalldata?.no_of_teams}
                    setValue={setValue}
                    customClass={`process${3}  cursor-pointer custome-line1`}
                    loading={false}
                    hidePercentage
                    dashboard={true}
                  />
                </Item>
              </Grid>
              <Grid item xs={12} sm={6} md={3} lg={3} className="w-100">
                <Item className="enable-sample-content">
                  <CustomCard
                    title="Calls Flow"
                    number={data["Total no .of calls"]}
                    titleLargeIcon={uploadIcon}
                    values={watch()}
                    control={control}
                    setValue={setValue}
                    chartdata={totalCalldata}
                    rangeDate={rangeDate}
                    customClass={`process${1}  cursor-pointer custome-line2`}
                    loading={false}
                    hidePercentage
                    dashboard={true}
                  />
                </Item>
              </Grid>
              <Grid item xs={12} sm={6} md={3} lg={3} className="w-100">
                <Item className="enable-sample-content">
                  <CustomCard
                    title="Sampling Rate"
                    number={(data["no.of calls processed"] || 100) + "%"}
                    titleLargeIcon={rateIcon}
                    values={watch()}
                    control={control}
                    simlingDate={simlingDate}
                    chartdata={simplinradedata}
                    setValue={setValue}
                    customCardClass="br-4"
                    customClass={`process${2}  cursor-pointer custome-line3`}
                    loading={false}
                    hidePercentage
                    dashboard={true}
                  />
                </Item>
              </Grid>
             
              <Grid item xs={12} sm={6} md={3} lg={3} className="w-100">
                <Item className="enable-sample-content">
                  <CustomCard
                    title="Call Sentiment"
                    number={data["Overall hold time"]}
                    titleLargeIcon={agentIcon}
                    values={watch()}
                    control={control}
                    overHoldDate={overHoldDate}
                    chartdata={overallholddata}
                    setValue={setValue}
                    customClass={`process${3}  cursor-pointer custome-line1`}
                    loading={false}
                    hidePercentage
                    dashboard={true}
                  />
                </Item>
              </Grid>
            </Grid>
          </Box>
        </div>
        {/* <div className="pt-16 pb-16 fs-16 fw-bold text-black">Analytics</div> */}
        {/* <div>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4} lg={3} xl={3} className="w-100">
                <Item className="enable-sample-content">
                  <CustomCard
                    title="Overall call duration"
                    number="0"
                    titleLargeIcon={callIcon}
                    customClass={`process${0}  cursor-pointer custome-line0`}
                    loading={false}
                    // processingStates={bprocesingI}
                    hidePercentage
                  />
                </Item>
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3} xl={3} className="w-100">
                <Item className="enable-sample-content">
                  <CustomCard
                    title="Overall hold time"
                    number={0}
                    titleLargeIcon={uploadIcon}
                    customClass={`process${1}  cursor-pointer custome-line2`}
                    loading={false}
                    // processingStates={yprocesingI}
                    hidePercentage
                  />
                </Item>
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3} xl={3} className="w-100">
                <Item className="enable-sample-content">
                  <CustomCard
                    title="Call transfer rate"
                    number={0}
                    titleLargeIcon={rateIcon}
                    customCardClass="br-4"
                    customClass={`process${2}  cursor-pointer custome-line3`}
                    loading={false}
                    // processingStates={rprocesingI}
                    hidePercentage
                  />
                </Item>
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3} xl={3} className="w-100">
                <Item className="enable-sample-content">
                  <CustomCard
                    title="Critical miss count"
                    number={0}
                    titleLargeIcon={agentIcon}
                    customClass={`process${3}  cursor-pointer custome-line1`}
                    loading={false}
                    // processingStates={gprocesingI}
                    hidePercentage
                  />
                </Item>
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3} xl={3} className="w-100">
                <Item className="enable-sample-content">
                  <CustomCard
                    title="Critical miss count"
                    number={0}
                    titleLargeIcon={agentIcon}
                    customClass={`process${3}  cursor-pointer custome-line4`}
                    loading={false}
                    // processingStates={bprocesingI}
                    hidePercentage
                  />
                </Item>
              </Grid>
            </Grid>
          </Box>
        </div> */}
      </div>
    </>
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
    dateRange: {
      width: "100%",
      marginTop: "0px",
      fontSize: "small",
      letterSpacing: "0.02em !important",
      "& .rs-picker-toggle.rs-btn.rs-btn-default": {
        backgroundColor: "#FFFFFF !important",
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

export default Statistics;
