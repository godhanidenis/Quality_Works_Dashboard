import React, { useEffect } from "react";
import BeatLoader from "react-spinners/BeatLoader";
import {
  Card,
  CardContent,
  createStyles,
  MenuItem,
  Select,
} from "@mui/material";
import { getlineColor, getRectangleColor } from "../../../utils/comman";
import Grid from "@mui/material/Grid";
import "./CustomCard.scss";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useHistory } from "react-router-dom";
import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import { makeStyles } from "@mui/styles";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { setDate } from "date-fns";
const CustomCard = ({
  setValue,
  values,
  customClass,
  title,
  number,
  titleSmallIcon,
  titleLargeIcon,
  isIconRequired,
  customCardClass,
  teams,
  agents,
  loading,
  simlingDate,
  overHoldDate,
  agentteam,
  processingStates,
  hidePercentage,
  handleClick,
  dashboard,
  chartdata,
  rangeDate,
  color,
}) => {

  let history = useHistory();
  const classes = useStyles();
  const [datevalue, setDatevalue] = React.useState(0);
  const handedatefilter = (e) => {
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
  const handesiplingdatefilter = (e) => {
    var date = new Date();
    console.log(e.target.value);
    setDatevalue(e.target.value);
    if (e.target.value === "0") {
      console.log("zero", [date.setDate(date.getDate() - 30), new Date()]);
      setValue("simlingDate", [date.setDate(date.getDate() - 6), new Date()]);
    } else if (e.target.value === "1") {
      setValue("simlingDate", [date.setDate(date.getDate() - 1), new Date()]);
      console.log("one".datevalue);
    } else if (e.target.value === "2") {
      console.log("two", datevalue);
      setValue("simlingDate", [date.setDate(date.getDate()), new Date()]);
    }
  };
  const handeoveralldatefilter = (e) => {
    var date = new Date();
    console.log(e.target.value);
    setDatevalue(e.target.value);
    if (e.target.value === "0") {
      console.log("zero", [date.setDate(date.getDate() - 30), new Date()]);
      setValue("overHoldDate", [date.setDate(date.getDate() - 6), new Date()]);
    } else if (e.target.value === "1") {
      setValue("overHoldDate", [date.setDate(date.getDate() - 1), new Date()]);
      console.log("one".datevalue);
    } else if (e.target.value === "2") {
      console.log("two", datevalue);
      setValue("overHoldDate", [date.setDate(date.getDate()), new Date()]);
    }
  };

  // console.log(rangeDate);
  return (
    <>
      {dashboard ? (
        <div className="dashboard-card" onClick={handleClick}>
          <div className={titleLargeIcon && "custom-card-box"}>
            <Grid container className="justify-content-around">
              {/* {titleLargeIcon && (
                  <img
                    alt="titleLargeIcon"
                    src={titleLargeIcon}
                    className="mr-8 w-45"
                  />
                )} */}
                {teams && <Grid item xs={4}>
                {" "}
                <div className="d-flex flex-column card-content">
                  <span className="fw-500 fs-16 text-gray l-s pb-6">
                    {"Teams" || ""}
                  </span>
                  <div className="fs-20 fw-700 lh-28 pl-16 text-dark-black l-s">
                    <BeatLoader loading={loading} size={15} />
                    {!loading && (
                      <>
                        <span className="pr-13 ">
                          {teams ||
                            0}
                          {!hidePercentage && "%"}
                        </span>
                        {!teams && 
                        <span
                          className="fs-12"
                          style={{
                            color: chartdata?.percentage < 0 ? "red" : "green",
                          }}
                        >
                          {chartdata?.percentage < 0 ? chartdata?.percentage+"%" : "+"+chartdata?.percentage+"%"}
                          {!hidePercentage && "%"}
                        </span>
                        }
                      </>
                    )}
                  </div>
                </div>
                </Grid>
           }
                { agents && <Grid item xs={4}>
                {" "}
                <div className="d-flex flex-column card-content">
                  <span className="fw-500 fs-16 text-gray l-s pb-6">
                    {"Agents" || ""}
                  </span>
                  <div className="fs-20 fw-700 lh-28 pl-16 text-dark-black l-s">
                    <BeatLoader loading={loading} size={15} />
                    {!loading && (
                      <>
                        <span className="pr-13 ">
                          {agents ||
                            0}
                          {!hidePercentage && "%"}
                        </span>
                        {!agents && 
                        <span
                          className="fs-12"
                          style={{
                            color: chartdata?.percentage < 0 ? "red" : "green",
                          }}
                        >
                          {chartdata?.percentage < 0 ? chartdata?.percentage+"%" : "+"+chartdata?.percentage+"%"}
                          {!hidePercentage && "%"}
                        </span>
                        }
                      </>
                    )}
                  </div>
                </div>
                
              </Grid>}
            {!agents && <Grid item xs={6}>
                {" "}
                <div className="d-flex flex-column card-content">
                  <span className="fw-500 fs-16 text-gray l-s pb-6 w-s-nowrap">
                    {title || ""}
                  </span>
                  <div className="fs-20 fw-700 lh-28 pl-16 text-dark-black l-s">
                    <BeatLoader loading={loading} size={15} />
                    {!loading && (
                      <>
                        <span className="pr-13">
                          {chartdata?.Total_no_calls ||
                            chartdata?.sampleling_rate ||
                            chartdata?.overall_call_sentiment ||
                            0}
                          {!hidePercentage && "%"}
                        </span>
                        {!agents && 
                        <span
                          className="fs-12"
                          style={{
                            color: chartdata?.percentage < 0 ? "red" : "green",
                          }}
                        >
                          {chartdata?.percentage < 0 ? chartdata?.percentage+"%" : "+"+chartdata?.percentage+"%"}
                          {!hidePercentage && "%"}
                        </span>
                        }
                      </>
                    )}
                  </div>
                </div>
                
              </Grid>}

              {rangeDate && (
                <Grid item xs={6}>
                  {" "}
                  <div className="d-flex flex-column card-content">
                    <Select
                      value={datevalue}
                      onChange={handedatefilter}
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
                    {/* <DateRangePicker
                    format="MMM-dd"
                    placeholder="Last 7 Days"
                    showOneCalendar
                    placement="leftStart"
                    onChange={(newValue) => {
                      console.log(newValue);
                      if(newValue){
                        setValue("rangeDate", newValue);
                      }else{
                        setValue("rangeDate", );
                      }
                    }}
                    className={classes.dateRange}
                  /> */}
                  </div>
                </Grid>
              )}
              {simlingDate && (
                <Grid item xs={6}>
                  {" "}
                  <div className="d-flex flex-column card-content">
                    <Select
                      value={datevalue}
                      onChange={handesiplingdatefilter}
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
           
                  </div>
                </Grid>
              )}
                 {overHoldDate && (
                <Grid item xs={6}>
                  {" "}
                  <div className="d-flex flex-column card-content">
                    <Select
                      value={datevalue}
                      onChange={handeoveralldatefilter}
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
           
                  </div>
                </Grid>
              )} 
              {chartdata && (
                <Grid item xs={12} className="pt-10">
                  <Callsentimentchart value={chartdata} />
                </Grid>
              )}
            </Grid>

            {/* <div className="d-flex "> */}

            <div>
              {titleSmallIcon && (
                <img src={titleSmallIcon} alt="titleSmallIcon" />
              )}
            </div>
            {/* </div> */}
          </div>
        </div>
      ) : (
        <div className="card">
          <div className={titleLargeIcon && "custom-card-box"}>
            <Grid container sx={{ flexWrap: "nowrap" }}>
              <Grid
                md={10}
                sm={10}
                lg={10}
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
              >
                {isIconRequired && (
                  <img
                    // className={customClass}
                    style={{ padding: 4, height: "62px" }}
                    src={getlineColor(number, 0, 100)}
                    alt="score"
                  />
                  // <span className={customClass} ></span>
                )}
                <div className="d-flex flex-column card-content">
                  <span className="fw-600 fs-14 text-gray">{title || ""}</span>

                  <div className="fs-20 fw-700 lh-28 text-dark-black mt-8 cursor-pointer">
                    <BeatLoader loading={loading} size={15} />
                    {!loading && (
                      <span onClick={handleClick}>
                        {number || 0}
                        {!hidePercentage && "%"}
                      </span>
                    )}
                  </div>
                </div>
              </Grid>

              <Grid
                md={2}
                sm={2}
                lg={2}
                container
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
                sx={{ display: "contents" }}
              >
                {processingStates && (
                  <img
                    src={processingStates}
                    alt="titleSmallIcon"
                    className="mr-8"
                  />
                )}

                {titleLargeIcon && (
                  // <ChevronRightIcon />
                  <img
                    alt="titleLargeIcon"
                    src={titleLargeIcon}
                    className="mr-8 w-45"
                  />
                )}
              </Grid>
            </Grid>

            {/* <div className="d-flex "> */}

            <div>
              {titleSmallIcon && (
                <img src={titleSmallIcon} alt="titleSmallIcon" />
              )}
            </div>
            {/* </div> */}
          </div>
        </div>
      )}
    </>
  );
};

export default CustomCard;

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
      fontSize: "small",
      "& .rs-picker-toggle.rs-btn.rs-btn-default": {
        backgroundColor: "#F5F8FA !important",
        padding: "4px 12px",
        width: "100%",
        border: "none",
      },
      "& .rs-picker-toggle-textbox": {
        // marginLeft: "15px",
        // paddingLeft: "24px !important",
        paddingRight: "10px !important",
      },
      "& .rs-picker-toggle": {
        borderRadius: "4px",
        borderWidth: "1px",
        borderColor: "#F1F2F6",
      },
      "& .rs-picker-toggle-value": {
        fontSize: ".725rem",
        fontWeight: 600,
      },
      "& span.rs-picker-toggle-placeholder": {
        fontSize: ".875rem",
        color: "#667685",
      },
      "& svg.rs-picker-toggle-caret.rs-icon": {
        color: "#667685",
        left: "6px !important",
        top: "8px !important",
        display: "none",
        fontSize: ".875rem",
      },
      "& .rs-picker-toggle.rs-btn .rs-picker-toggle-clean": {
        color: "#667685",
        right: "10px !important",
        top: "4px !important",
      },
    },
  })
);

const Callsentimentchart = (props) => {
  const option = {
    chart: {
      height: "60px",
      zoomType: "x",
      padding: 0,
      margin: 0,
      backgroundColor: "transparent",
      // marginLeft:"0px",
      // marginRight:"0px"
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
      visible: false,
      type: "datetime",
      categories: props?.value?.date_list || props?.value?.date_list,
    },
    yAxis: {
      visible: false,
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
      enabled: false,
      align: "right",
      verticalAlign: "top",
      padding: 0,

      itemStyle: {
        lineHeight: "14px",
      },
    },
    plotOptions: {
      series: {
        marker: {
          enabled: false,
        },
      },
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
        name: "calls",
        data:
          props?.value?.no_of_calls_list || props?.value?.sampleling_rate_list || props?.value?.no_of_calls_list,
        color: "#FAB143",
        // pointStart: Date.UTC(2010, 0, 1),
        // pointInterval: 3600 * 1000 * 12,
      },
    ],
  };
  return (
    <>
      <HighchartsReact
        highcharts={Highcharts}
        sx={{ height: "25px" }}
        options={option}
      />
    </>
  );
};
