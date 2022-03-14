import React, { useEffect } from "react";
import { TextField, FormControl, Slider, Box } from "@mui/material";
import Drawer from "@mui/material/Drawer/Drawer";
import { DateRangePicker } from "rsuite";
import LocalizationProvider from "@mui/lab/LocalizationProvider/LocalizationProvider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import BeatLoader from "react-spinners/BeatLoader";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon/ListItemIcon";
import Collapse from "@mui/material/Collapse";
import RadioGroup from "@mui/material/RadioGroup/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel/FormControlLabel";
import Radio from "@mui/material/Radio/Radio";
import StaticDateRangePicker from "@mui/lab/StaticDateRangePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import radioIcon from "../../../assest/icon/radioIcon.svg";
import CustomSelectInput from "../../../components/common/customSelectInput";
import { SidebarComponent } from "../../../CONST";
import musicIcon from "../../../assest/icon/musicIcon.svg";
import Typography from "@mui/material/Typography";
import { Grid, MenuItem, Select } from "@mui/material";
import Selectlobflt from "../../../assest/sidebarfilter/selectLob.svg";
import Selectteamflt from "../../../assest/sidebarfilter/selectTeam.svg";
import Selectagentflt from "../../../assest/sidebarfilter/selectAgent.svg";
import { createStyles, makeStyles } from "@mui/styles";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import "./SideBar.scss";
import callOpening from "../../../assest/sidebarfilter/callOpning.svg";
import customerVarification from "../../../assest/sidebarfilter/customerVarification.svg";
import onHold from "../../../assest/sidebarfilter/onHold (2).svg";
import callCloser from "../../../assest/sidebarfilter/callCloser.svg";
import activeListening from "../../../assest/sidebarfilter/activeListening (2).svg";
import filterIcon from "../../../assest/filter.svg";
import { DateRange } from "react-date-range";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CancelIcon from "@mui/icons-material/Cancel";
import InputAdornment from "@mui/material/InputAdornment";
import { addDays } from "date-fns";
import { useState } from "react";
import Button from "@mui/material/Button";
import { fontSize } from "@mui/system";
import EventNoteIcon from "@mui/icons-material/EventNote";
import { DatePicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import moment from "moment";
import { getLOB, getLobTeam, getMinMax } from "../../../actions";
import { fetchAnalaticfilterdata } from "../../../store/actions/actionCreators";
import { useDispatch } from "react-redux";
const styles = (theme) => ({
  minWidth: "195px",
  // maxWidth: "250",
  width: "12% !important",
  position: "fixed",
  marginTop: "58px",
  flexShrink: 0,
  zIndex: 2,
  "& .MuiDrawer-paper": {
    boxSizing: "border-box",
  },
});

const buttonText = (theme) => ({
  [theme.breakpoints.up("xl")]: {
    paddingRight: "4px !important",
    display: "inline-block",
    maxWidth: "150px !important",
    whiteSpace: "nowrap",
    overflow: "hidden !important",
    textOverflow: "ellipsis",
  },
});

const iconList = [
  callOpening,
  customerVarification,
  onHold,
  callCloser,
  activeListening,
  callOpening,
  customerVarification,
  onHold,
  callCloser,
  activeListening,
  callOpening,
  customerVarification,
  onHold,
  callCloser,
  activeListening,
  callOpening,
  customerVarification,
  onHold,
  callCloser,
  callOpening,
  customerVarification,
  callOpening,
  callOpening,
];

const min = 2;
const max = 10;
const datarange = ["2021-01-15", "2022-04-15"];

const SideBar = ({
  values,
  setValue,
  handleFilterChange,
  isMulti,
  handleSliderChange,
}) => {
  const {
    isOpen,
    selectedIndex,
    lob,
    team,
    agent,
    rangeDate,
    filters,
    isFilterLoading,
    call_duration,
    min_max_call_duration,
    optionsLoB,
  } = values;
  // console.log(values);
  // console.log(lob);
  // console.log("testing:::::",filters,rangeDate)
  const classes = useStyles();
  const [isactive, setIsactive] = React.useState(false);
  const [lobvalue, setLobvalue] = React.useState([]);
  const [minvalue, setMinValue] = React.useState();
  const dispatch = useDispatch();
  const [maxvalue, setMaxValue] = React.useState();
  const [startdate, setStartdate] = React.useState([]);

  const [enddate, setEnddate] = React.useState([]);
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);

  useEffect(() => {}, []);

  const valuetext = (value) => `${value}°C`;
  // console.log(filters);
  const handleFilterTab = (index) => {
    setValue("isOpen", !isOpen);
    setValue("selectedIndex", index);
  };

  const handleChangelob = (e) => {
    // console.log(e);
    setLobvalue(e.target.value);
  };
  const daterange = (e) => {
    setValue(e);
  };

  if (isFilterLoading) {
    return (
      <div
        style={{
          display: "flex",
          position: "absolute",
          top: "50%",
          left: "8%",
        }}
      >
        <BeatLoader loading={isFilterLoading} size={15} />
      </div>
    );
  }

  const clearFilterData = () => {
    filters.map((item) => {
      return (item.value = null);
    });
    setValue("filters", filters);
    setValue("isFilterLoading", false);
    setValue("isClearAll", !values.isClearAll);
  };

  const add3Dots = (string) => {
    var dots = "...";
    if (string.length > 17) {
      // you can also use substr instead of substring
      string = string.substring(0, 15) + dots;
    }

    return string;
  };

  const selectionRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  };
  const defaultmin = 0;
  const defaultmax = 0;

  const getLoBList = async () => {
    const response = await getLOB();
    if (response.success && response?.data?.data) {
      let lobList = [];

      (response.data.data || []).forEach((item, index) => {
        lobList.push({
          label: item.Lob_name,
          value: item.id,
        });
      });
      setValue("optionsLoB", lobList);
    }
  };

  return (
    <div>
      <Grid container>
        <Grid item xs={12} sx={styles}>
          {/* <Typography
            variant="h6"
            noWrap
            component="div"
            className="navbar-logo"
          >
            <img className="logo-icon" src={musicIcon} alt="hamburgerManu" />
          </Typography> */}
          <div className="drawer-body  select-bar">
            <div className="fw-700 fs-14 text-black">Select</div>
            {/* <DatePicker
              showWeekNumbers
              className=" mt-12"
              format="yyyy-MM-dd"
              placeholder="From Date"
              style={{ width: 200 }}
              onChange={(newValue) => {
                setValue("rangeDate", [
                  newValue,
                  moment(newValue, "DD-MM-YYYY").add(6, "days"),
                ]);
                setStartdate(newValue);
                console.log(newValue);
              }}
            />
            <DatePicker
              showWeekNumbers
              className=" mt-12"
              format="yyyy-MM-dd"
              placeholder="To Date"
              style={{ width: 200 }}
              onChange={(newValue) => {
                console.log(newValue);

                setEnddate(newValue);
                if (startdate) {
                  setValue("rangeDate", [startdate, newValue]);
                }
              }}
            /> */}
            <DateRangePicker
              format="yy-MMM-d"
              placeholder="Last 7 Days"
              style={{ width: 225 }}
              // value={""}
              onChange={(newValue) => {
                if (newValue.length > 0) {
                  setValue("rangeDate", newValue);
                } else {
                  setValue("rangeDate", datarange);
                }
              }}
              className={classes.dateRange}
            />
            {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateRangePicker
                startText="From Date"
                endText="To Date"
                value={rangeDate}
                onChange={(newValue) => {
                  setValue("rangeDate", newValue);
                }}
                renderInput={(startProps, endProps) => (
                  <React.Fragment>
                    <TextField
                      size="small"
                      {...startProps}
                      sx={{ fontSize: 14, background: "white" }}
                      id="input-with-icon-textfield"
                      label=""
                      className="sidebar-datepicker"
                      disableUnderline={true}
                      variant="filled"
                      InputProps={{
                        disableUnderline: true,
                        startAdornment: (
                          <InputAdornment position="start">
                            <EventNoteIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <TextField
                      size="small"
                      {...endProps}
                      sx={{ fontSize: 14, background: "white" }}
                      id="input-with-icon-textfield"
                      label=""
                      className="sidebar-datepicker"
                      disableUnderline={true}
                      variant="filled"
                      InputProps={{
                        disableUnderline: true,
                        startAdornment: (
                          <InputAdornment position="start">
                            <EventNoteIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
              
                  </React.Fragment>
                )}
              />
            </LocalizationProvider> */}
            {/*<LocalizationProvider dateAdapter={AdapterDateFns}>*/}
            {/*    <Stack spacing={3}>*/}
            {/*        <Box sx={{flexGrow: 1}}>*/}
            {/*            <Grid container spacing={2}>*/}
            {/*                <Grid item sm={6} className="">*/}
            {/*                    <Item>*/}
            {/*                        <DatePicker*/}
            {/*                            label="From Date"*/}
            {/*                            value={fromDate}*/}
            {/*                            onChange={(newValue) => {*/}
            {/*                                setValue('fromDate', newValue)*/}
            {/*                            }}*/}
            {/*                            renderInput={(params) =>*/}
            {/*                                <TextField*/}
            {/*                                     size="small"*/}
            {/*                                     sx={{fontSize: 14, background: "white"}}*/}
            {/*                                     className="sidebar-datepicker"*/}
            {/*                                     {...params}*/}
            {/*                                />}*/}
            {/*                        />*/}
            {/*                    </Item>*/}
            {/*                </Grid>*/}
            {/*                <Grid item sm={6}>*/}
            {/*                    <Item className="custom-white-bg">*/}
            {/*                        <DatePicker*/}
            {/*                            label="To Date"*/}
            {/*                            value={toDate}*/}
            {/*                            onChange={(newValue) => {*/}
            {/*                                setValue('toDate', newValue)*/}
            {/*                            }}*/}
            {/*                            renderInput={(params) =>*/}
            {/*                                <TextField*/}
            {/*                                    {...params}*/}
            {/*                                    size="small"*/}
            {/*                                    sx={{fontSize: 14}}*/}
            {/*                                    className="sidebar-datepicker"*/}
            {/*                                />}*/}
            {/*                        />*/}
            {/*                    </Item>*/}
            {/*                </Grid>*/}
            {/*            </Grid>*/}
            {/*        </Box>*/}
            {/*    </Stack>*/}
            {/*</LocalizationProvider>*/}
            {/* <DateRangePicker
                format="yyyy-MM-dd"
                placeholder="Select Date"
                onChange={daterange}
                className={classes.dateRange}
              /> */}
            <div className="mt-4">
              {/* <div className="pt-6 pb-6">
                <CustomSelectInput
                  selectedValue={lob}
                  handleSelectChange={(value) => setValue("lob", value)}
                  placeholder="Select Date"
                  icon={0}
                  options={values?.optionsLoB || []}
                  isMulti={isMulti}
                  // startIcon={<img src={Selectlobflt} alt='lob'/>}
                />
              </div> */}
              {/* <DateRange
                editableDateInputs={true}
                onChange={(item) => setState([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={state}
              /> */}

              <div className="pt-6 pb-6">
                <CustomSelectInput
                  selectedValue={lob}
                  handleSelectChange={(value) => {
                    // console.log(value);
                    setValue("lob", value);
                    setValue("team", "");
                    setValue("agent", "");
                    dispatch(fetchAnalaticfilterdata(JSON.stringify(values)))
                    
                  }}
                  placeholder="select lob"
                  icon={1}
                  options={values?.optionsLoB || []}
                  isMulti={isMulti}
                  // startIcon={<img src={Selectlobflt} alt='lob'/>}
                />
              </div>
              <div className="pt-6 pb-6">
                <CustomSelectInput
                  selectedValue={team}
                  handleSelectChange={(value) => {
                    // if (typeof value[0].value !== "string") {
                    // } else {
                    //   setValue("team", values?.optionsTeam);
                    // }

                    setValue("team", value);
                    setValue("agent", "");
                    dispatch(fetchAnalaticfilterdata(JSON.stringify(values)))

                  }}
                  placeholder="select team"
                  icon={2}
                  options={values?.optionsTeam || []}
                  isMulti={isMulti}
                  // startIcon={<img src={Selectteamflt} alt='team'/>}
                />
              </div>
              <div className="pt-6 pb-6">
                <CustomSelectInput
                  selectedValue={agent}
                  handleSelectChange={(value) => {
                    // if (typeof value[0].value !== "string") {
                    // } else {
                    //   setValue("agent", values?.optionsAgent);
                    // }

                    setValue("agent", value);
                    dispatch(fetchAnalaticfilterdata(JSON.stringify(values)))

                  }}
                  placeholder="select agent"
                  icon={3}
                  options={values?.optionsAgent || []}
                  isMulti={isMulti}
                  // startIcon={<img src={Selectagentflt} alt='agent'/>}
                />
              </div>
              <div className="justify-content-between pt-16 align-item-center ">
                <div className="d-flex justify-content-between align-item-center ">
                  <div className="fw-700 fs-16 text-black">
                    {" "}
                    <img src={filterIcon} height="16px" alt="filter icon" />
                    &nbsp; Filters
                  </div>
                  <div
                    className="fs-12 fw-600 pr-16 text-blue cursor-pointer"
                    onClick={clearFilterData}
                  >
                    clear all
                  </div>
                </div>
                <div>
                  <List>
                    {filters &&
                      filters.map((item, index) => {
                        // console.log(filters)
                        const isSelectedIndex = selectedIndex === index;
                        const { component, value, name, label } = item;
                        const isRadioComponent =
                          component === SidebarComponent.RADIO;
                        const ismulRadioComponent =
                          component === SidebarComponent.MULTIRADIO;
                        const isSliderComponent =
                          component === SidebarComponent.SLIDER;

                        // setMinValue(

                        // );
                        // setMaxValue(
                        //   name === "call_duration" &&
                        //     (values?.call_duration?.[1] || value?.[1])
                        // );

                        return (
                          <>
                            {/* {isSelectedIndex} */}
                            <div
                              key={value + index}
                              className={
                                (value && isRadioComponent) ||
                                value != value ||
                                value === "[0,30]" ||
                                value === "[31,60]" ||
                                value === "[61,90]" ||
                                value === "[91,180]" ||
                                value === "[181,270]" ||
                                value === "[271,365]" ||
                                value === "[366,10000]" ||
                                (isactive && isSliderComponent)
                                  ? "score-body-active"
                                  : "score-body"
                              }
                            >
                              {/* {value} */}
                              {isRadioComponent}

                              {isSliderComponent}
                              <div style={{ display: "flex" }}>
                                <ListItem
                                  button
                                  onClick={() => handleFilterTab(index)}
                                  className="custom-expand-tab"
                                  sx={{
                                    // maxWidth: "94%",
                                    paddingTop: "4px",
                                    paddingBottom: "4px",
                                    paddingRight: "4px",
                                    paddingLeft: "8px",
                                  }}
                                >
                                  {/* <ListItemIcon>
                             
                            </ListItemIcon> */}

                                  <ListItemText
                                    primary={
                                      <>
                                        <img
                                          src={iconList[index]}
                                          alt={name}
                                          style={{
                                            width: "9%",
                                            paddingTop: "3px",
                                          }}
                                        />
                                        <Typography
                                          type="body2"
                                          style={{ pl: 1, fontSize: "14px" }}
                                        >
                                          &nbsp; {label}
                                        </Typography>
                                      </>
                                    }
                                    className={classes.listitemtext}
                                    // className="text-dark"
                                    disableTypography={true}
                                  />
                                  {isOpen && selectedIndex === index ? (
                                    <KeyboardArrowDownIcon />
                                  ) : (
                                    <ChevronRightIcon />
                                  )}
                                </ListItem>
                              </div>
                              {isSelectedIndex && isSliderComponent && (
                                <Collapse
                                  in={isOpen}
                                  timeout="auto"
                                  className={classes.slider}
                                  unmountOnExit
                                >
                                  {/* <div className="slider-main"> */}
                                  {/* <Slider
                                    getAriaLabel={() => "Temperature range"}
                                    value={
                                      (name === "tenure" &&
                                        (values?.tenure?.length > 0
                                          ? values?.tenure
                                          : value)) ||
                                      (name === "call_duration" &&
                                        (values?.call_duration?.length > 0
                                          ? values?.call_duration
                                          : value))
                                    }
                                    onChange={(e, value) => {
                                      console.log("slider", e, value);
                                      handleSliderChange(e, name, value);
                                    }}
                                    valueLabelDisplay="auto"
                                    getAriaValueText={valuetext}
                                  /> */}
                                  {isactive && (
                                    <ListItemIcon
                                      sx={{
                                        // position: "fixed",
                                        minWidth: "0px",
                                        [`@media screen and (max-width: 2500px)`]:
                                          {
                                            position: "absolute",
                                            right: "6%",
                                          },
                                      }}
                                      onClick={(event) => {
                                        handleFilterChange(event, name, "");
                                        setIsactive(false);
                                        setMinValue(min_max_call_duration[0]);
                                        setMaxValue(min_max_call_duration[1]);
                                        handleFilterChange(event, name, [
                                          min_max_call_duration[0],
                                          min_max_call_duration[1],
                                        ]);
                                      }}
                                    >
                                      <CancelIcon sx={{ fontSize: "100%" }} />
                                    </ListItemIcon>
                                  )}
                                  {/* <div className=""> */}
                                  <Grid container sx={{ mt: 0.2 }} spacing={2}>
                                    <Grid item xs={6}>
                                      <TextField
                                        fullWidth
                                        type="number"
                                        size="small"
                                        sx={{
                                          fontSize: 14,
                                        }}
                                        inputProps={{
                                            min:min_max_call_duration[0],
                                          max:min_max_call_duration[1],
                                        }}
                                        InputProps={{
                                          disableUnderline: true,
                                        }}
                                        placeholder="min"
                                        value={parseFloat(
                                          minvalue || 0
                                        ).toFixed(0)}
                                        onChange={(e) => {
                                          var value = parseInt(
                                            e.target.value,
                                            10
                                          );

                                          if (value > parseFloat(
                                          min_max_call_duration[1] || 0
                                        ).toFixed(0)) value = parseFloat(
                                          min_max_call_duration[1] || 0
                                        ).toFixed(0);
                                          if (value < parseFloat(
                                          min_max_call_duration[0] || 0
                                        ).toFixed(0)) value = parseFloat(
                                          min_max_call_duration[0] || 0
                                        ).toFixed(0);

                                          setMinValue(value);
                                          setIsactive(true);
                                        }}
                                        variant="filled"
                                      />
                                    </Grid>

                                    <Grid item xs={6}>
                                      <TextField
                                        fullWidth
                                        type="number"
                                        size="small"
                                        sx={{
                                          fontSize: 14,
                                        }}
                                        inputProps={{
                                          min:min_max_call_duration[0],
                                          max:min_max_call_duration[1],
                                        }}
                                        InputProps={{
                                          disableUnderline: true,
                                        }}
                                        placeholder="max"
                                        value={parseFloat(
                                          maxvalue || 0
                                        ).toFixed(0)}
                                        onChange={(e) => {
                                          var value = parseInt(
                                            e.target.value,
                                            10
                                          );
                                          if (value >  parseFloat(
                                          min_max_call_duration[1] || 0
                                        ).toFixed(0)) value =  parseFloat(
                                          min_max_call_duration[1] || 0
                                        ).toFixed(0);
                                          if (value < parseFloat(
                                          min_max_call_duration[0] || 0
                                        ).toFixed(0)) value = parseFloat(
                                          min_max_call_duration[0] || 0
                                        ).toFixed(0);

                                          setMaxValue(value);
                                          setIsactive(true);
                                        }}
                                        variant="filled"
                                      />
                                    </Grid>
                                  </Grid>

                                  {/* </div> */}

                                  <div className="mt-4 mb-12 d-flex justify-content-between align-item-center">
                                    <div className="timer-box">
                                      <span className="fs-12 text-dark-black ">
                                        <span className="text-gray fs-12 pl-10 pt-1 ">
                                          Min:
                                        </span>
                                        {parseFloat(
                                          min_max_call_duration[0] || 0
                                        ).toFixed(2)}
                                      </span>
                                    </div>
                                    <div className="timer-box">
                                      <span className="fs-12 text-dark-black pr-13">
                                        <span className="text-gray fs-12 pt-1 ">
                                          Max:
                                        </span>
                                        {parseFloat(
                                          min_max_call_duration[1] || 0
                                        ).toFixed(2)}
                                      </span>
                                    </div>
                                  </div>
                                  <Button
                                    variant="contained"
                                    size="small"
                                    sx={{ mb: 2 }}
                                    onClick={(e) => {
                                      // console.log([minvalue, maxvalue]);
                                      handleFilterChange(e, name, [
                                        minvalue,
                                        maxvalue,
                                      ]);
                                    }}
                                  >
                                    apply flter
                                  </Button>

                                  {/* <Button
                                    variant="contained"
                                    size="small"
                                    sx={{ mb: 2, ml: 1 }}
                                    onClick={(e) => {
                                      handleSliderChange(e, name, "");
                                    }}
                                  >
                                    reset
                                  </Button> */}
                                  {/* </div> */}
                                </Collapse>
                              )}
                              {isSelectedIndex && isRadioComponent && (
                                <Collapse
                                  in={isOpen}
                                  timeout="auto"
                                  className="collapse"
                                  unmountOnExit
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "flex-start",
                                      paddingTop: "6px",
                                      paddingLeft: "15px",
                                    }}
                                  >
                                    <FormControl component="fieldset">
                                      <RadioGroup
                                        aria-label="gender"
                                        name="controlled-radio-buttons-group"
                                        value={value}
                                        sx={{
                                          fontSize: ".78rem",
                                          margin: "-5px 0px 3px 0px",
                                          color: "#667685",
                                        }}
                                        onChange={(event) =>
                                          handleFilterChange(
                                            event,
                                            name,
                                            event.target.value
                                          )
                                        }
                                      >
                                        <FormControlLabel
                                          value="True"
                                          control={
                                            <Radio
                                              size="small"
                                              className="radioIcon"
                                              sx={{
                                                p: 0.5,
                                                "& .MuiSvgIcon-root": {
                                                  fontSize: 15,
                                                },
                                              }}
                                            />
                                          }
                                          disableTypography={true}
                                          label="Adhered"
                                          className="radio-button-male"
                                        >
                                          {" "}
                                        </FormControlLabel>
                                        <FormControlLabel
                                          value="False"
                                          control={
                                            <Radio
                                              size="small"
                                              className="radioIcon"
                                              sx={{
                                                p: 0.5,
                                                "& .MuiSvgIcon-root": {
                                                  fontSize: 15,
                                                },
                                              }}
                                            />
                                          }
                                          disableTypography={true}
                                          label="Not Adhered"
                                          className="radio-button-female"
                                        />
                                      </RadioGroup>

                                      {((!isSliderComponent &&
                                        !ismulRadioComponent &&
                                        value) ||
                                        (isSliderComponent &&
                                          name === "call_duration" &&
                                          values?.tenure?.length > 0)) && (
                                        <ListItemIcon
                                          sx={{
                                            // position: "fixed",
                                            minWidth: "0px",
                                            [`@media screen and (max-width: 2500px)`]:
                                              {
                                                position: "absolute",
                                                right: "-15%",
                                              },
                                          }}
                                          onClick={(event) =>
                                            handleFilterChange(event, name, "")
                                          }
                                        >
                                          <CancelIcon
                                            sx={{ fontSize: "100%" }}
                                          />
                                          {/* <img src={} alt={name} /> */}
                                        </ListItemIcon>
                                      )}
                                    </FormControl>
                                  </div>
                                </Collapse>
                              )}
                              {isSelectedIndex && ismulRadioComponent && (
                                <Collapse
                                  in={isOpen}
                                  timeout="auto"
                                  className="collapse"
                                  unmountOnExit
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "flex-start",
                                      paddingTop: "6px",
                                      paddingLeft: "15px",
                                    }}
                                  >
                                    <FormControl component="fieldset">
                                      <RadioGroup
                                        aria-label="gender"
                                        name="controlled-radio-buttons-group"
                                        value={value}
                                        sx={{
                                          fontSize: ".78rem",
                                          margin: "-5px 0px 3px 0px",
                                          color: "#667685",
                                        }}
                                        onChange={(event) => {
                                          handleFilterChange(
                                            event,
                                            name,
                                            event.target.value
                                          );
                                        }}
                                      >
                                        <FormControlLabel
                                          value="[0,30]"
                                          control={
                                            <Radio
                                              size="small"
                                              className="radioIcon"
                                              sx={{
                                                p: 0.5,
                                                "& .MuiSvgIcon-root": {
                                                  fontSize: 15,
                                                },
                                              }}
                                            />
                                          }
                                          disableTypography={true}
                                          label="0-30 Days"
                                          className="radio-button-male"
                                        >
                                          {" "}
                                        </FormControlLabel>
                                        <FormControlLabel
                                          value="[31,60]"
                                          control={
                                            <Radio
                                              size="small"
                                              className="radioIcon"
                                              sx={{
                                                p: 0.5,
                                                "& .MuiSvgIcon-root": {
                                                  fontSize: 15,
                                                },
                                              }}
                                            />
                                          }
                                          disableTypography={true}
                                          label="31-60 Days"
                                          className="radio-button-female"
                                        />
                                        <FormControlLabel
                                          value="[61,90]"
                                          control={
                                            <Radio
                                              size="small"
                                              className="radioIcon"
                                              sx={{
                                                p: 0.5,
                                                "& .MuiSvgIcon-root": {
                                                  fontSize: 15,
                                                },
                                              }}
                                            />
                                          }
                                          disableTypography={true}
                                          label="61-90 Days"
                                          className="radio-button-male"
                                        >
                                          {" "}
                                        </FormControlLabel>
                                        <FormControlLabel
                                          value="[91,180]"
                                          control={
                                            <Radio
                                              size="small"
                                              className="radioIcon"
                                              sx={{
                                                p: 0.5,
                                                "& .MuiSvgIcon-root": {
                                                  fontSize: 15,
                                                },
                                              }}
                                            />
                                          }
                                          disableTypography={true}
                                          label="91-181 Days"
                                          className="radio-button-female"
                                        />
                                        <FormControlLabel
                                          value="[181,270]"
                                          control={
                                            <Radio
                                              size="small"
                                              className="radioIcon"
                                              sx={{
                                                p: 0.5,
                                                "& .MuiSvgIcon-root": {
                                                  fontSize: 15,
                                                },
                                              }}
                                            />
                                          }
                                          disableTypography={true}
                                          label="181-270 Days"
                                          className="radio-button-male"
                                        >
                                          {" "}
                                        </FormControlLabel>
                                        <FormControlLabel
                                          value="[271,365]"
                                          control={
                                            <Radio
                                              size="small"
                                              className="radioIcon"
                                              sx={{
                                                p: 0.5,
                                                "& .MuiSvgIcon-root": {
                                                  fontSize: 15,
                                                },
                                              }}
                                            />
                                          }
                                          disableTypography={true}
                                          label="271-365 Days"
                                          className="radio-button-female"
                                        />
                                        <FormControlLabel
                                          value="[366,10000]"
                                          control={
                                            <Radio
                                              size="small"
                                              className="radioIcon"
                                              sx={{
                                                p: 0.5,
                                                "& .MuiSvgIcon-root": {
                                                  fontSize: 15,
                                                },
                                              }}
                                            />
                                          }
                                          disableTypography={true}
                                          label="> 365 Days"
                                          className="radio-button-male"
                                        >
                                          {" "}
                                        </FormControlLabel>
                                      </RadioGroup>
                                      {((!isSliderComponent &&
                                        value === "[0,30]") ||
                                        value === "[31,60]" ||
                                        value === "[61,90]" ||
                                        value === "[91,180]" ||
                                        value === "[181,270]" ||
                                        value === "[271,365]" ||
                                        value === "[366,10000]" ||
                                        (isSliderComponent &&
                                          name === "tenure" &&
                                          values?.tenure?.length > 0)) && (
                                        <ListItemIcon
                                          sx={{
                                            // position: "fixed",
                                            minWidth: "0px",
                                            [`@media screen and (max-width: 2500px)`]:
                                              {
                                                position: "absolute",
                                                right: "-15%",
                                              },
                                          }}
                                          onClick={(event) =>
                                            handleFilterChange(event, name, "[]")
                                          }
                                        >
                                          <CancelIcon
                                            sx={{ fontSize: "100%" }}
                                          />
                                          {/* <img src={} alt={name} /> */}
                                        </ListItemIcon>
                                      )}
                                    </FormControl>
                                  </div>
                                </Collapse>
                              )}
                              {/* <ListItem
                        button
                        onClick={() => handleFilterTab(index)}
                        className="custom-expand-tab"
                        // sx={{ width: "150px" }}
                        disableGutters={true}
                        disablePadding={true}
                      >
                        {isOpen && selectedIndex === index ? (
                          <ArrowDropDownIcon />
                        ) : (
                          <ArrowRightIcon />
                        )}
                        <ListItemText
                          inset
                          primary={label}
                          className="text-dark"
                        />
                        {((!isSliderComponent && value) ||
                          (isSliderComponent &&
                            ((name === "tenure" &&
                              values?.tenure?.length > 0) ||
                              (name === "call_duration" &&
                                values?.tenure?.length > 0)))) && (
                          <ListItemIcon
                            className="radio-icon"
                            onClick={(event) =>
                              handleFilterChange(event, name, "")
                            }
                          >
                            <img src={radioIcon} alt={name} />
                          </ListItemIcon>
                        )}
                      </ListItem>
                    
                      {isSelectedIndex && isSliderComponent && (
                        <Collapse in={isOpen} timeout="auto" unmountOnExit>
                          <div className="slider-main">
                            <Slider
                              getAriaLabel={() => "Temperature range"}
                              value={
                                (name === "tenure" &&
                                  (values?.tenure?.length > 0
                                    ? values?.tenure
                                    : value)) ||
                                (name === "call_duration" &&
                                  (values?.call_duration?.length > 0
                                    ? values?.call_duration
                                    : value))
                              }
                              onChange={(e, value) =>
                                handleSliderChange(e, name, value)
                              }
                              valueLabelDisplay="auto"
                              getAriaValueText={valuetext}
                            />
                            <div className="mt-25 d-flex justify-content-between align-item-center">
                              <div className="timer-box">
                                <span className="fs-14 text-dark-black">
                                  {parseFloat(
                                    (name === "tenure" &&
                                      (values?.tenure?.[0] || value?.[0])) ||
                                      (name === "call_duration" &&
                                        (values?.call_duration?.[0] ||
                                          value?.[0])) ||
                                      0
                                  ).toFixed(2)}
                                </span>
                                <span className="text-gray fs-14 ml-2">
                                  Min
                                </span>
                              </div>
                              <div className="timer-box">
                                <span className="fs-14 text-dark-black">
                                  {parseFloat(
                                    (name === "tenure" &&
                                      (values?.tenure?.[1] || value?.[1])) ||
                                      (name === "call_duration" &&
                                        (values?.call_duration?.[1] ||
                                          value?.[1])) ||
                                      0
                                  )}
                                </span>
                                <span className="text-gray fs-14 ml-2">
                                  Min
                                </span>
                              </div>
                            </div>
                          </div>
                        </Collapse>
                      )} */}
                              {/* <div className="gray-divider" /> */}
                            </div>
                          </>
                        );
                      })}
                  </List>
                </div>
              </div>
              {/* <div className="mt-56">
                <div className="d-flex justify-content-between align-item-center">
                  <div className="fw-700 fs-14 text-black">Filters</div>
                  <div
                    className="fs-12 text-blue cursor-pointer"
                    onClick={clearFilterData}
                  >
                    CLEAR ALL
                  </div>
                </div>
                <div className="gray-divider mt-15" />
                <div>
                  <div>
                    <List component="nav">
                      {filters &&
                        filters.map((item, index) => {
                          const isSelectedIndex = selectedIndex === index;
                          const { component, value, name, label } = item;
                          const isRadioComponent =
                            component === SidebarComponent.RADIO;
                          const isSliderComponent =
                            component === SidebarComponent.SLIDER;
                          return (
                            <div key={value + index} className="score-body">
                              <ListItem
                                button
                                onClick={() => handleFilterTab(index)}
                                className="custom-expand-tab"
                              >
                                {isOpen && selectedIndex === index ? (
                                  <ArrowDropDownIcon />
                                ) : (
                                  <ArrowRightIcon />
                                )}
                                <ListItemText
                                  inset
                                  primary={label}
                                  className="text-dark"
                                />
                                {((!isSliderComponent && value) ||
                                  (isSliderComponent &&
                                    ((name === "tenure" &&
                                      values?.tenure?.length > 0) ||
                                      (name === "call_duration" &&
                                        values?.tenure?.length > 0)))) && (
                                  <ListItemIcon
                                    className="radio-icon"
                                    onClick={(event) =>
                                      handleFilterChange(event, name, "")
                                    }
                                  >
                                    <img src={radioIcon} alt={name} />
                                  </ListItemIcon>
                                )}
                              </ListItem>
                              {isSelectedIndex && isRadioComponent && (
                                <Collapse
                                  in={isOpen}
                                  timeout="auto"
                                  unmountOnExit
                                >
                                  <FormControl component="fieldset">
                                    <RadioGroup
                                      aria-label="gender"
                                      name="controlled-radio-buttons-group"
                                      value={value}
                                      onChange={(event) =>
                                        handleFilterChange(
                                          event,
                                          name,
                                          event.target.value
                                        )
                                      }
                                    >
                                      <FormControlLabel
                                        value="True"
                                        control={
                                          <Radio
                                            size="small"
                                            sx={{ height: 17, width: 17 }}
                                          />
                                        }
                                        label="Found"
                                        className="radio-button-male"
                                      />
                                      <FormControlLabel
                                        value="False"
                                        control={
                                          <Radio
                                            size="small"
                                            sx={{ height: 17, width: 17 }}
                                          />
                                        }
                                        label="Not Found"
                                        className="radio-button-female"
                                      />
                                    </RadioGroup>
                                  </FormControl>
                                </Collapse>
                              )}
                              {isSelectedIndex && isSliderComponent && (
                                <Collapse
                                  in={isOpen}
                                  timeout="auto"
                                  unmountOnExit
                                >
                                  <div className="slider-main">
                                    <Slider
                                      getAriaLabel={() => "Temperature range"}
                                      value={
                                        (name === "tenure" &&
                                          (values?.tenure?.length > 0
                                            ? values?.tenure
                                            : value)) ||
                                        (name === "call_duration" &&
                                          (values?.call_duration?.length > 0
                                            ? values?.call_duration
                                            : value))
                                      }
                                      onChange={(e, value) =>
                                        handleSliderChange(e, name, value)
                                      }
                                      valueLabelDisplay="auto"
                                      getAriaValueText={valuetext}
                                    />
                                    <div className="mt-25 d-flex justify-content-between align-item-center">
                                      <div className="timer-box">
                                        <span className="fs-14 text-dark-black">
                                          {parseFloat(
                                            (name === "tenure" &&
                                              (values?.tenure?.[0] ||
                                                value?.[0])) ||
                                              (name === "call_duration" &&
                                                (values?.call_duration?.[0] ||
                                                  value?.[0])) ||
                                              0
                                          ).toFixed(2)}
                                        </span>
                                        <span className="text-gray fs-14 ml-2">
                                          Min
                                        </span>
                                      </div>
                                      <div className="timer-box">
                                        <span className="fs-14 text-dark-black">
                                          {parseFloat(
                                            (name === "tenure" &&
                                              (values?.tenure?.[1] ||
                                                value?.[1])) ||
                                              (name === "call_duration" &&
                                                (values?.call_duration?.[1] ||
                                                  value?.[1])) ||
                                              0
                                          )}
                                        </span>
                                        <span className="text-gray fs-14 ml-2">
                                          Min
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </Collapse>
                              )}
                              <div className="gray-divider" />
                            </div>
                          );
                        })}
                    </List>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default SideBar;

const useStyles = makeStyles((theme) =>
  createStyles({
    // downloadbtn: {
    //   border: "1px solid #E0E0E0",
    //   padding: "8px 12px",
    //   color: "#212121",
    //   fontFamily: "Roboto",
    //   fontWeight: "normal",
    //   fontSize: "14px",
    //   lineHeight: "20px",
    // },
    // noBorder: {
    //   border: "none",
    // },
    // button: {
    //   border: "1px solid #338DCD",
    //   background: "#E6F1F9",
    //   color: "black",
    //   fontStyle: "normal",
    //   fontWeight: 500,
    //   fontSize: "14px",
    //   lineHeight: "20px",
    //   padding: "8px 16px",
    // },
    radioIcon: {
      "& .MuiSvgIcon-root": {
        fontSize: "115% !important",
      },
      "& .css-n5p0mp-MuiSvgIcon-root": {
        fontSize: "115%",
        width: ".8rem",
        height: ".8rem",
      },
    },
    collapse: {
      "& .MuiCollapse-wrapperInner": {
        display: "flex",
        justifyContent: "center",
      },
    },
    slider: {
      padding: "0px 16px ",
    },
    listitemtext: {
      fontFamily: "helveticaneue",
      color: "#667685",
      fontStyle: "Roman",
      overflow: "hidden",
      width: "7.8vw",
      display: "-webkit-box",
      webkitLineClamp: 3,
      "& .MuiTypography-root": {
        fontFamily: "helveticaneue !important",
        overflow: "hidden",
        width: "20.8vw !important ",
        display: "-webkit-box",
        webkitLineClamp: 3,
      },
      // -webkit-box-orient: vertical;
    },
    dateInput: {
      backgroundColor: "#ECEFF1",
      border: "none",
      borderRadius: "5px",
      padding: "10px",
      fontSize: "14px",
      fontWeight: "normal",
      lineHeight: "20px",
      fontFamily: "Roboto",
      color: "#212121",
      height: "40px",
    },
    MenuItem: {
      color: "#212121",
      height: "40px",
      fontWeight: "normal",
      fontSize: "14px",
      lineHeight: "20px",
    },
    // viewbtn: {
    //   padding: "0px",
    //   "&:hover": {
    //     border: "1px solid #0070C0",
    //   },
    // },
    dateRange: {
      border: "1px solid #F1F2F6",
      borderRadius: "10px",
      width: "100%",
      marginTop: "10px",
      fontSize: "small",
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

      "& .rs-picker-toggle-value": {
        paddingLeft: "22px",
        fontSize: ".725rem",
        fontWeight: 600
      },
      "& span.rs-picker-toggle-placeholder": {
        fontSize: ".875rem",
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
    Select: {
      width: "95%",
      backgroundColor: "#FFFFFF",
      color: "#212121",
      height: "40px",
      fontWeight: "normal",
      fontSize: "14px",
      lineHeight: "20px",
      borderRadius: "4px",
      // "& .dropdown-container": {
      //   "& .gray": {
      //     color: "#212121",
      //   },
      //   fontFamily: "Roboto",
      //   fontStyle: "normal",
      //   color: "#212121",
      //   fontWeight: "normal",
      //   fontSize: "14px",
      //   lineHeight: "20px",
      //   backgroundColor: "#FFFFFF !important",
      //   border: "0px solid !important",
      //   borderRadius: "4px !important",
      // },
      // "& .MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.MuiSelect-select":
      //   {
      //     minHeight: "1.4375em",
      //     textOverflow: "ellipsis",
      //     whiteSpace: "nowrap",
      //     overflow: "hidden",
      //     width: "50% !important",
      //   },
      "& .MuiOutlinedInput-notchedOutline": {
        borderWidth: "0px",
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        border: "0px",
      },
      "&.MuiInputBase-input-MuiOutlinedInput-input": {
        paddingRight: "4px",
      },
    },
  })
);
