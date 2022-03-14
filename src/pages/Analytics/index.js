/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import moment from "moment";
import { useForm } from "react-hook-form";
import TabContext from "@mui/lab/TabContext/TabContext";
import TabList from "@mui/lab/TabList";
// import TabPanel from "@mui/lab/TabPanel/TabPanel";
import { Box, Button, Fade, Paper, Popper, Typography } from "@mui/material";
import Sidebar from "../../components/common/SideBar/index";
import Agent from "./agent";
import Customer from "./customer";
import {
  getMinMax,
  getLOB,
  getAgentBasedTeam,
  getLobTeam,
  allFilter,
  getCustomerData,
  allFilters,
} from "../../actions";
import { SidebarComponent } from "../../CONST";
import FilterListIcon from "@material-ui/icons/FilterList";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { withRouter } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import TabsUnstyled from "@mui/base/TabsUnstyled";
import TabsListUnstyled from "@mui/base/TabsListUnstyled";
import TabPanelUnstyled from "@mui/base/TabPanelUnstyled";
import { buttonUnstyledClasses } from "@mui/base/ButtonUnstyled";
import TabUnstyled, { tabUnstyledClasses } from "@mui/base/TabUnstyled";
import Avatar from "@mui/material/Avatar";
import selectFeatures from "../../assest/selectFetures.svg";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import musicIcon from "../../assest/icon/musicIcon.svg";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import Tooltip from "@mui/material/Tooltip";

import "./Analytics.scss";
import Header from "../../components/Header";
import { fetchAnalaticfilter, fetchAnalaticfilterdata } from "../../store/actions/actionCreators";

const blue = {
  50: "#0171C3",
  100: "#C2E0FF",
  200: "#80BFFF",
  300: "#66B2FF",
  400: "#3399FF",
  500: "#FFFFFF",
  600: "#FFFFFF",
  700: "#0059B2",
  800: "#004C99",
  900: "#003A75",
};
const Roots = styled("div")(({ theme }) => ({
  width: "100%",
  ...theme.typography.body2,
  "& > :not(style) + :not(style)": {
    marginTop: theme.spacing(2),
  },
}));
const Root = styled("div")(({ theme }) => ({
  padding: theme.spacing(1),
  [theme.breakpoints.down("md")]: {},
  [theme.breakpoints.up("md")]: {},
  [theme.breakpoints.down("lg")]: {},
}));
const Tab = styled(TabUnstyled)`
  font-family: IBM Plex Sans, sans-serif;
  color: #000000;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: bold;
  background-color: transparent;
  width: 100%;
  padding: 12px 16px;
  margin: 6px 6px;
  border: none;
  border-radius: 5px;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: ${blue[400]};
  }

  &.${buttonUnstyledClasses.focusVisible} {
    color: #fff;
    outline: none;
    background-color: ${blue[200]};
  }

  &.${tabUnstyledClasses.selected} {
    background-color: ${blue[50]};
    color: ${blue[600]};
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TabPanel = styled(TabPanelUnstyled)`
  width: 100%;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
`;

const TabsList = styled(TabsListUnstyled)`
  margin-top: 13px;
  min-width: 320px;
  background-color: ${blue[500]};
  border-radius: 8px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
`;
// var date = new Date();
const defaultValues = {
  lob: null,
  team: null,
  agent: null,
  rangeDate: ["2021-01-15", "2022-04-15"],
  tabValue: "1",
  selectedIndex: "",
  isOpen: false,
  isFilterLoading: false,
  isAgentDataFetching: false,
  isCustomerDataFetching: false,
  filters: [],
  minMaxData: [],
  agentDetail: {},
  customerDetails: {},
  selectedFeature: [],
  call_duration: [],
  tenure: [],
  min_max_call_duration: [],
  isClearAll: false,
};

// const checkboxList = [
//   "Salutations",
//   "Soft Skills",
//   "Process Knowledge",
//   "Communication Skills",
//   "Talktime Metrics",
//   "Call Closure",
//   "Sentiment Metrics"
// ];

// const customerCheckboxList = [
//   "Communication Skills",
//   "Talktime Metrics",
//   "Sentiment Metrics",
//   "keywords"
// ];

const Analytics = (props) => {
  window.scrollTo(0, 0);
  // const [defualtmin,setdefualtmin ] = useState();
  const allfiltyerData = useSelector((state) => state?.Analayticsreducer?.data);
  //  const [filtyerpayloads, setFiltyerpayloads] = useState(useSelector((state) => state?.FilterReducer?.data));
  const filtyerpayloads = useSelector((state) => state?.FilterReducer?.data);
  console.log("filtyerpayloads::",filtyerpayloads)
  console.log("filtyerpayloads::",allfiltyerData)
  const [checkboxList, setCheckboxList] = useState([
    "Salutations",
    "Soft Skills",
    "Process Knowledge",
    "Communication Skills",
    "Talktime Metrics",
    "Call Closure",
    "Sentiment Metrics"
  ]);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  // const open = Boolean(anchorEl);
  const [drawerValue, setDrawerValue] = useState(false);
  const { watch, setValue, control } = useForm({
    defaultValues,
    mode: "onChange",
  });
  const {
    tabValue,
    filters,
    isFilterLoading,
    lob,
    team,
    agentDetail,
    customerDetails,
    agent,
    isAgentDataFetching,
    rangeDate,
    isCustomerDataFetching,
    selectedFeature,
    isClearAll,
    tenure,
    call_duration,
    min_max_call_duration,
  } = watch();

  const getLoBList = async () => {
    const response = await getLOB();
    if (response.success && response?.data?.data) {
      let lobList = [];
      (response.data.data || []).forEach((item) => {
        lobList.push({
          label: item.Lob_name,
          value: item.id,
        });
      });
      setValue("optionsLoB", lobList);
    }
  };

  const getCustomerdata = async () => {
    const response = await getLOB();
    if (response.success && response?.data?.data) {
      let lobList = [];
      (response.data.data || []).forEach((item) => {
        lobList.push({
          label: item.Lob_name,
          value: item.id,
        });
      });
      setValue("optionsLoB", lobList);
    }
  };

  const getAgentList = async () => {
    const teamList = {
      team_list: [team?.value],
    };
    const response = await getAgentBasedTeam(teamList);
    if (response.success && response?.data?.data) {
      let agentList = [];
      (response.data.data || []).forEach((item) => {
        agentList.push({
          label: item.Agent_name,
          value: item.id,
        });
      });
      setValue("optionsAgent", agentList);
    }
  };

  const getTeamList = async () => {
    const lobList = {
      lob_list: [lob?.value],
    };
    const response = await getLobTeam(lobList);
    if (response.success && response?.data?.data) {
      let teamList = [];
      (response.data.data || []).forEach((item) => {
        teamList.push({
          label: item.Team_name,
          value: item.id,
        });
      });
      setValue("optionsTeam", teamList);
    }
  };

  const getFilters = async () => {
    const res = await getMinMax();

    console.log(res?.data?.data);
    if (res.success && res?.data?.data) {
      // const call_duration = res?.data?.data?.call_duration;
      setValue("min_max_call_duration", res?.data?.data?.call_duration);
      const { call_duration, tenure, sub_category } = res?.data?.data;
      const filterList = [];
      if (sub_category.length) {
        sub_category.forEach((value) => {
          filterList.push({
            label: value.Sub_category,
            name: value.slug,
            value: null,
            component: SidebarComponent.RADIO,
          });
        });
      }
      filterList.push({
        label: "Call Duration",
        name: "call_duration",
        value: call_duration,
        component: SidebarComponent.SLIDER,
      });
      filterList.push({
        label: "Tenure",
        name: "tenure",
        value: tenure,
        component: SidebarComponent.MULTIRADIO,
      });
     
      if (allfiltyerData) {
        setValue("filters", allfiltyerData?.filters);
      }
      if (!allfiltyerData.filters) {
        setValue("filters", filterList);
      }
    }
    setValue("isFilterLoading", false);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const fetchAgentTabDetail = async () => {
    setValue("isAgentDataFetching", true);
    let filterPayload = {};
    let tenure = [];
    

    if(allfiltyerData){
      allfiltyerData?.filters?.forEach((filter) => {
        // console.log(filter)
        if (!Array.isArray(filter.value) && filter.value) {
          if (filter.component === "MULTIREDIO") {
            tenure = JSON.parse(filter.value);
          } else {
            filterPayload[filter.name] = filter.value;
          }
        }
      });
    }else{
      filters.forEach((filter) => {
        // console.log(filter)
        if (!Array.isArray(filter.value) && filter.value) {
          if (filter.component === "MULTIREDIO") {
            tenure = JSON.parse(filter.value);
          } else {
            filterPayload[filter.name] = filter.value;
          }
        }
      });

    }
    console.log("filterpayl0oad::::::",filtyerpayloads)
    const filterData = {
      team_id: allfiltyerData?.team?.value || team?.value || null,
      agent_id: allfiltyerData?.agent?.value ||  agent?.value || null,
      lob_id: allfiltyerData?.lob?.value || lob?.value || null,
      start_date: moment(new Date(rangeDate?.[0])).format("YYYY-MM-DD"),
      end_date: moment(new Date(rangeDate?.[1])).format("YYYY-MM-DD"),
      callduration: call_duration || [],
      tenure: tenure || [],
      filter: {...filterPayload},
    };
    // dispatch(fetchAnalaticfilter(filterPayload))
    console.log("filterpaylsafdsfdfdfdfdsfdsf0oad::::::",filterData)
    const response = await allFilter(filterData);
    // const res = await allFilters(filterData);
    console.log(response);
    // console.log(res);
    if (response.success && response?.data?.data) {
      setValue("agentDetail", response.data.data);
    } else {
      setValue("agentDetail", {});
    }

    //  if(allfiltyerData.length){
    //     setValue("filters", allfiltyerData);
    //   }
    setValue("isFilterLoading", false);
    setValue("isAgentDataFetching", false);
  };

  const fetchCustomerTabDetail = async () => {
    setValue("isCustomerDataFetching", true);
    let filterPayload = {};
    let tenure = [];
    // 
    filters.forEach((filter) => {
      // 
      if (!Array.isArray(filter.value) && filter.value) {
        if (filter.component === "MULTIREDIO") {
          tenure = JSON.parse(filter.value)
        } else {
          filterPayload[filter.name] = filter.value;
        }
      }
    });

    const filterData = {
      lob_id: lob?.value,
      team_id: team?.value,
      agent_id: agent?.value,
      start_date: moment(new Date(rangeDate?.[0])).format("YYYY-MM-DD"),
      end_date: moment(new Date(rangeDate?.[1])).format("YYYY-MM-DD"),
      callduration: call_duration || [],
      tenure: tenure || [],
      filter: filterPayload,
    };

    const response = await getCustomerData(filterData);
    // console.log(response);
    if (response.success && response?.data?.data) {
      setValue("customerDetails", response.data.data);
    } else {
      setValue("customerDetails", {});
    }
    setValue("isFilterLoading", false);
    setValue("isCustomerDataFetching", false);
  };

  useEffect(() => {
    setValue("isFilterLoading", true);
    setValue("lob", allfiltyerData?.lob);
    setValue("team", allfiltyerData?.team);
    setValue("agent", allfiltyerData?.agent);
    getLoBList();
    getCustomerdata();
    getFilters();
  }, []);

  useEffect(() => {
    if (lob) {
      getTeamList();
    }
  }, [lob]);

  useEffect(() => {
    if (team) {
      getAgentList();
    }
  }, [team]);

  useEffect(() => {
      fetchAgentTabDetail();
      fetchCustomerTabDetail();
  }, [filters, lob, team, agent, call_duration, tenure]);

  const handleFilterChange = async(event, name, value) => {

    console.log(event,name,value)
     if (
      name === "call_duration"
    ) {
      setValue("call_duration", value);
    }
    const updatedFilterValues = filters.map((filter) => {
      if (filter.name === name) {
        return {
          ...filter,
          value,
        };
      }
      return filter;
    });
    event.stopPropagation();
    console.log("testing",value,name)
    setValue("filters", updatedFilterValues);
  };

  const handlePopover = (event) => {
    // setAnchorElUser(event.currentTarget);
    setAnchorEl(event.currentTarget);
    setOpen(!open);
  };

  const closehandlePopover = () => {
    if (open) {
      setOpen(false);
    }
  }
  const handleClosefeatureMenu = () => {
    setOpen(!open);
  };

  const handleCheckBox = (e, item) => {
    if (e.target.checked) {
      setValue("selectedFeature", [...selectedFeature, item]);
    } else {
      const index = selectedFeature.indexOf(item);
      const remainingData = selectedFeature.filter((item, i) => i !== index);
      setValue("selectedFeature", remainingData);
    }
  };

  const handleCardClick = () => {
    dispatch(fetchAnalaticfilterdata(JSON.stringify(watch())))
    // localStorage.setItem("filterData", );
    props.history.push("/evaluation");
  };

  const handleCustomerCardClick = () => {
    setCheckboxList([
      "Communication Skills",
      "Talktime Metrics",
      "Sentiment Metrics",
      "keywords"
    ])
  };

  const handleAgentCardClick = () => {
    setCheckboxList([
      "Salutations",
      "Soft Skills",
      "Process Knowledge",
      "Communication Skills",
      "Talktime Metrics",
      "Call Closure",
      "Sentiment Metrics"
    ])
  };

  const handleSliderChange = (e, name, value) => {
    // console.log("analytic page", name, value);
    // if (name === "call_duration") {
    //   setValue("call_duration", value);
    // }
    // const defaultTenure = filters?.find(
    //   (item) => item.component === "SLIDER" && item.name === "tenure"
    // ).value;
    // ;
    // const defaultCallDuration = filters?.find(
    //   (item) => item.name === "call_duration"
    // ).value;
    // console.log(defaultCallDuration);
   
    if (name === "tenure") {
      setValue("tenure", value);
    }
  };

  const list = (anchor) => (
    <>
      <div>
        {/* <Typography variant="h6" noWrap component="div" className="navbar-logo">
          <img className="logo-icon" src={musicIcon} alt="hamburgerManu" />
        </Typography> */}
        <div className="sidebar-popup">
          <Sidebar
            values={watch()}
            setValue={setValue}
            control={control}
            handleFilterChange={handleFilterChange}
            handleSliderChange={handleSliderChange}
          />
        </div>
      </div>
    </>
  );

  const toggleDrawerValue = (params) => {
    // console.log("calleds");
    setDrawerValue(!drawerValue);
  };

  return (
    <>
      <Root onClick={closehandlePopover}>
        <Grid container>
          <Header {...props} toggleDrawerValue={toggleDrawerValue} />
        </Grid>
        <Grid container className="anaylatic">
          <Grid
            item
            xl={1.6}
            lg={1.8}
            sx={{
              display: { xs: "none", md: "none", lg: "grid", xl: "grid" },
              padding: "15px 12px 0px 8px",
              background: "#F5F8FA",

              // minWidth: "225px",
            }}
          >
            <Sidebar
              values={watch()}
              setValue={setValue}
              control={control}
              handleFilterChange={handleFilterChange}
              handleSliderChange={handleSliderChange}
            />
            <Drawer
              anchor="left"
              open={drawerValue}
              onClose={() => setDrawerValue(false)}
            >
              {list("left")}
            </Drawer>
          </Grid>
          <Grid
            item
            xl={10.4}
            lg={10.2}
            md={12}
            sm={12}
            xs={12}
            sx={{
              pl: 2,
              [`@media screen and (min-width: 1536px)`]: {
                pl: 2,
              },
              [`@media screen and (min-width: 1200px)`]: {
                pl: 5,
              },
              [`@media screen and (min-width: 1300px)`]: {
                pl: 3,
              },
              pt: 8,
              pr: 2,
              background: "#F5F8FA",
            }}
          >
            <Popper
              open={open}
              onClick={handleClosefeatureMenu}
              anchorEl={anchorEl}
              placement="bottom-end"
              transition
            >
              {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={350}>
                  <Paper className="aa">
                    <Typography sx={{ p: 2 }}>
                      <FormGroup>
                        {checkboxList.map((item, index) => {
                          console.log(selectedFeature)
                          console.log(item)
                          return (
                            <FormControlLabel
                              key={index}
                              control={
                                <Checkbox
                                  checked={selectedFeature.includes(item)}
                                  onChange={(e) => handleCheckBox(e, item)}
                                />
                              }
                              label={item}
                              className="feature-checkbox"
                            />
                          );
                        })}
                      </FormGroup>
                    </Typography>
                  </Paper>
                </Fade>
              )}
            </Popper>{" "}
            <TabsUnstyled defaultValue={0}>
              <Grid
                container
                sx={{
                  flexWrap: "nowrap",
                  display: { xs: "none", md: "none", lg: "flex", xl: "flex" },
                }}
              >
                {/* <Box sx={{ borderBottom: 2, borderColor: "divider" }}></Box> */}
                <Grid item lg={10} md={3}>
                  <Divider orientation="horizontal" flexItem>
                    <Grid
                      container
                      direction="row"
                      alignItems="flex-start"
                      justifyContent="flex-end"
                    >
                      <TabsList className="tab-bar">
                        <Tab onClick={handleAgentCardClick}>Agent</Tab>
                        <Tab onClick={handleCustomerCardClick} >Customer</Tab>
                        {/* <Tab>Three</Tab> */}
                      </TabsList>
                    </Grid>
                  </Divider>
                </Grid>
                <Grid container item lg={2} md={9}>
                  <Grid
                    container
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="flex-start"
                    sx={{
                      alignSelf: "center",
                      p: 2,
                      marginTop: "-4px !important",
                    }}
                  >
                    <Divider orientation="horizontal" flexItem></Divider>

                    <Tooltip title="Open settings">
                      <Button
                        id="demo-customized-button"
                        aria-controls="demo-customized-menu"
                        className="reporting-button btn-textTransform"
                        endIcon={<KeyboardArrowDownIcon />}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        disableElevation
                        sx={{ p: 2 }}
                        startIcon={
                          <img alt="Remy Sharp" src={selectFeatures} />
                        }
                        // autoCapitalize={false}
                        onClick={handlePopover}
                      >
                        Select Features
                      </Button>
                    </Tooltip>
                  </Grid>
                </Grid>
              </Grid>
              <Root>
                <Grid
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  sx={{
                    display: { sm: "flex", md: "flex", lg: "none", xl: "none" },
                  }}
                >
                  <Grid item md={4} sm={6}>
                    <TabsList className="tab-bar">
                      <Tab>Agent</Tab>
                      <Tab>Customer</Tab>
                    </TabsList>
                  </Grid>
                  <Grid
                    md={8}
                    sm={6}
                    sx={{ display: "flow-root", alignSelf: "center" }}
                  >
                    <Divider
                      textAlign="right"
                      className="leftdivider"
                      sx={{ mt: 2 }}
                    >
                      {" "}
                      <Button
                        className="reporting-button btn-textTransform"
                        endIcon={<KeyboardArrowDownIcon />}
                        startIcon={
                          <img alt="Remy Sharp" src={selectFeatures} />
                        }
                        autoCapitalize={false}
                        onClick={handlePopover}
                      >
                        Select Features
                      </Button>
                    </Divider>
                  </Grid>
                </Grid>
              </Root>

              {/* <Grid
                  item
                  md={2}
               
                >
                  <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                  >
                    <TabsList className="tab-bar">
                      <Tab>Agent</Tab>
                      <Tab>Customer</Tab>
                     
                    </TabsList>
                  </Grid>
                </Grid>
                <Divider orientation="horizontal" flexItem>
                  <Grid item md={7.5}></Grid>
                </Divider>
                <Grid item md={2.5}>
                  <Divider orientation="horizontal" flexItem>
                    <Grid
                      container
                      direction="row"
                      justifyContent="flex-end"
                      alignItems="center"
                      sx={{ alignSelf: "center", p: 2 }}
                    >
                      <Button
                        className="reporting-button btn-textTransform"
                        endIcon={<KeyboardArrowDownIcon />}
                        startIcon={
                          <Avatar alt="Remy Sharp" src={selectFeatures} />
                        }
                        autoCapitalize={false}
                        onClick={handlePopover}
                      >
                        Select Features
                      </Button>
                    </Grid>
                  </Divider>
                </Grid> */}
              {/* </Grid> */}
              <TabPanel value={0}>
                <Agent
                  values={agentDetail}
                  filterValues={filters}
                  isAgentDataFetching={isAgentDataFetching}
                  selectedFeature={selectedFeature}
                  setValue={setValue}
                  handleClick={handleCardClick}

                />
              </TabPanel>
              <TabPanel value={1}>
                {" "}
                <Customer customerDetails={customerDetails} handleClick={handleCardClick} isCustomerDataFetching={isCustomerDataFetching} selectedFeature={selectedFeature} />
              </TabPanel>
              {/* <TabPanel value={2}>Third content</TabPanel> */}
            </TabsUnstyled>
            {/* <TabsUnstyled defaultValue={0}>
            <TabsList
              onChange={(event, value) => setValue("tabValue", value)}
              aria-label="lab API tabs example"
            >
              <Tab label="Agent" value={0} />
              <Tab label="Customer" value={1} />
            </TabsList>
            <TabPanel value={0}>
             
            </TabPanel>
            <TabPanel value={1}>
             
            </TabPanel>
          </TabsUnstyled> */}
            {/* <TabContext value={tabValue}>
                <Box
                sx={{ borderBottom: 1, borderColor: "divider" }}
                className="tabs d-flex justify-content-between align-item-center"
                >
                <TabList
                    onChange={(event, value) => setValue("tabValue", value)}
                    aria-label="lab API tabs example"
                >
                    <Tab label="Agent" value="1" />
                    <Tab label="Customer" value="2" />
                </TabList>
                <div className="pr-32">
                    <Button
                    variant="outlined"
                    className="reporting-button btn-textTransform"
                    startIcon={<FilterListIcon fontSize="inherit" />}
                    autoCapitalize={false}
                    onClick={handlePopover}
                    >
                    Select Features
                    </Button>
                </div>
                </Box>
                <div className="analytics-body">
                <TabPanel value="1" sx={{ padding: "0 !important" }}>
                    <Agent
                    values={agentDetail}
                    filterValues={filters}
                    isAgentDataFetching={isAgentDataFetching}
                    selectedFeature={selectedFeature}
                    setValue={setValue}
                    handleClick={handleCardClick}
                    />
                </TabPanel>
                <TabPanel value="2">
                    <Customer agentDetail={agentDetail} />
                </TabPanel>
                </div>
            </TabContext> */}
          </Grid>
        </Grid>
      </Root>
    </>
  );
};

export default withRouter(Analytics);