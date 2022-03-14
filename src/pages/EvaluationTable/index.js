/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { withRouter } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";
import { DataGrid, GridOverlay } from "@mui/x-data-grid";
import LinearProgress from "@mui/material/LinearProgress";
import Button from "@mui/material/Button";
import {
  Paper,
  styled,
  Table,
  TableBody,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Box,
} from "@mui/material";
import TableCell from "@mui/material/TableCell/TableCell";
import Sidebar from "../../components/common/SideBar/index";
import { useDispatch, useSelector } from "react-redux";
import {
  getAgentBasedTeam,
  getLOB,
  getLobTeam,
  getMinMaxForEvaluation,
  postEvaluation,
} from "../../actions";
import { SidebarComponent } from "../../CONST";
import { getRectangleColor } from "../../utils/comman";
import { getCqScoreColor } from "../../utils/comman";

import "./EvaluationTable.scss";
import moment from "moment";
import Header from "../../components/Header";
import Drawer from "@mui/material/Drawer";
import Grid from "@mui/material/Grid";
import { JSONParser } from "@amcharts/amcharts4/core";
import { fetchAnalaticfilterdata } from "../../store/actions/actionCreators";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#FFFFFF;",
    fontWeight: "bold",
    color: "#262626",
    fontSize: 14,
    textAlign: "left",
    paddingLeft: "32px",
    paddingTop: "20px",
    lineHeight: "20px",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    color: "#262626",
    borderBottom: "unset",
    textAlign: "left",
    paddingLeft: "32px",
    paddingTop: "20px",
    lineHeight: "20px",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(even)": {
    backgroundColor: "#F7F7F7",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const defaultValues = {
  lob: null,
  team: null,
  agent: null,
  rangeDate: ["2021-01-15", "2022-04-15"],
  isFilterLoading: false,
  isDataFetching: false,
  filters: [],
  isOpen: false,
  evaluationRows: [],
  call_duration: [],
  tenure: [],
  min_max_call_duration: [],
  isClearAll: false,
};

const EvaluationTable = (props) => {
  window.scrollTo(0, 0);
  const allfiltyerData = useSelector((state) => state?.Analayticsreducer?.data);
  const filtyerpayloads = useSelector((state) => state?.FilterReducer?.data);
  const [pageSize, setPageSize] = React.useState(10);
  console.log(allfiltyerData);
  console.log(filtyerpayloads);
  const dispatch = useDispatch();
  const [drawerValue, setDrawerValue] = React.useState(false);
  const [isLoading, setIsLoding] = React.useState(true);
  const { watch, setValue, control } = useForm({
    defaultValues,
    mode: "onChange",
  });

  const {
    evaluationRows,
    filters,
    isFilterLoading,
    lob,
    team,
    agent,
    rangeDate,
    isDataFetching,
    call_duration,
    tenure,
    isClearAll,
    min_max_call_duration,
  } = watch();

  const columns = [
    {
      field: "call_duration",
      headerName: "Call Duration",
      flex: 1,
      minWidth: 120,
      fontWeight: 600,
      headerAlign: "center",
      renderCell: (params) => {
        // console.log(params);
        return (
          <TableCell align="center" className="cqScoreCell">
            {params.row.call_duration} min
          </TableCell>
          // <TableCell
          //   align="center"
          //   onClick={() => viewEvaluation(params.row.call_id)}
          //   sx={{ color: "#0171C3 !important" }}
          // >
          //   view
          // </TableCell>
          // <div onClick={() => viewEvaluation(params.row.call_id)}>view</div>
        );
      },
    },
    //  {
    //   field: "lob_name",
    //   headerName: "LoB Name",
    //   minWidth: 120,
    //   headerAlign: "center",
    // },

    // {
    //   field: "agent_name",
    //   headerName: "Agent Name",
    //   minWidth: 120,
    //   headerAlign: "center",
    // },
    {
      field: "cq_score",
      headerName: "CQ Score",
      flex: 1,
      // width: 150, minWidth: 200, maxWidth: 250,
      headerAlign: "center",
      renderCell: (params) => {
        // console.log(params);
        return (
          <>
            <img
              src={getRectangleColor(params.row.cq_score, 0, 100)}
              alt="score"
            />
            <span className="ml-8"> {params.row.cq_score}%</span>
            {/* <TableCell
            align="center"
            className="cqScoreCell"
            sx={{
              color: getCqScoreColor(params.row.cq_score, 0, 100),
            }}
          >
            {params.row.cq_score}
          </TableCell> */}
          </>
          // <TableCell
          //   align="center"
          //   onClick={() => viewEvaluation(params.row.call_id)}
          //   sx={{ color: "#0171C3 !important" }}
          // >
          //   view
          // </TableCell>
          // <div onClick={() => viewEvaluation(params.row.call_id)}>view</div>
        );
      },
    },
    {
      field: "date_of_call",
      headerName: "Call Date",
      // width: 150, minWidth: 150, maxWidth: 250,
      flex: 1,
      headerAlign: "center",
    },
    {
      field: "start_time",
      headerName: "Call Time",
      // width: 150, minWidth: 150, maxWidth: 250,
      flex: 1,
      headerAlign: "center",
    },
    {
      field: "critical_miss",
      headerName: "Critical Miss",
      // width: 150, minWidth: 150, maxWidth: 250,
      flex: 1,
      headerAlign: "center",
    },
    {
      field: "non_critical_miss",
      headerName: "Non Critical Miss",
      flex: 1,
      // width: 150, minWidth: 150, maxWidth: 250,
      headerAlign: "center",
    },
    {
      field: "tagging_name",
      headerName: "Tagging",
      flex: 1,
      // width: 150, minWidth: 150, maxWidth: 200,
      headerAlign: "center",
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      // width: 150, minWidth: 150, maxWidth: 200,
      headerAlign: "center",
      renderCell: (params) => {
        // console.log(params);
        return (
          <Button variant="text">
            <TableCell
              align="center"
              onClick={() => viewEvaluation(params.row.call_id)}
              sx={{ color: "#0171C3 !important" }}
            >
              view
            </TableCell>
          </Button>
          // <div onClick={() => viewEvaluation(params.row.call_id)}>view</div>
        );
      },
    },
  ];

  // console.log(evaluationRows);
  const viewEvaluation = (id) => {
    props.history.push(`/evaluation/${id}`);
  };

  const getEvaluationDetails = async () => {
    let filterPayload = {};
    let tenure = [];
    console.log();
    // console.log(filters)
    // console.log("dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa::::::",JSON.parse(allfiltyerData).filters)
    // console.log(JSON.parse(allfiltyerData))
    // setValue("lob", JSON.parse(allfiltyerData).lob);
    // if (allfiltyerData) {
    //   const filterData = {
    //     team_id: team?.value || null,
    //     agent_id: agent?.value || null,
    //     lob_id: lob?.value || 1,
    //     start_date: moment(new Date(rangeDate?.[0])).format("YYYY-MM-DD"),
    //     end_date: moment(new Date(rangeDate?.[1])).format("YYYY-MM-DD"),
    //     callduration: call_duration || [],
    //     tenure: tenure || [],
    //     filter: filtyerpayloads,
    //   };
    //   const response = await postEvaluation(filterData);
    //   if (response.success && response?.data?.data?.basic_call_info) {
    //     console.log(response?.data?.data?.basic_call_info);
    //     response?.data?.data?.basic_call_info.map((item, index) => {
    //       item["id"] = index;
    //       return { ...item };
    //     });
    //     console.log(response?.data?.data?.basic_call_info);
    //     setValue("evaluationRows", response.data.data.basic_call_info);
    //     setIsLoding(false);
    //   } else {
    //     setValue("evaluationRows", {});
    //   }
    //   setValue("filters", allfiltyerData);

    // } else {
    // console.log(filters)
    if (allfiltyerData) {
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
    } else {
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
    //  console.log(filterPayload)
    // filters.forEach((filter) => {
    //   if (!Array.isArray(filter.value) && filter.value) {
    //     filterPayload[filter.name] = filter.value;
    //   }
    // });

    // console.log(filters)
    // console.log(filterPayload)
    // const callDuration = filters.find((v) => v.name === "call_duration")?.value || [];
    // const tenureData = filters.find((v) => v.name === "tenure")?.value || [];
    console.log(team);
    console.log(lob);
    const filterData = {
      team_id: allfiltyerData?.team?.value || team?.value || null,
      agent_id: allfiltyerData?.agent?.value || agent?.value || null,
      lob_id: allfiltyerData?.lob?.value || lob?.value || null,
      start_date: moment(new Date(rangeDate?.[0])).format("YYYY-MM-DD"),
      end_date: moment(new Date(rangeDate?.[1])).format("YYYY-MM-DD"),
      callduration: call_duration || [],
      tenure: tenure || [],
      filter: { ...filterPayload },
    };
    // console.log(filterData)
    const response = await postEvaluation(filterData);
    if (response.success && response?.data?.data?.basic_call_info) {
      // console.log(response?.data?.data?.basic_call_info);
      response?.data?.data?.basic_call_info.map((item, index) => {
        item["id"] = index;
        return { ...item };
      });
      // console.log(response?.data?.data?.basic_call_info);
      setValue("evaluationRows", response.data.data.basic_call_info);
      setIsLoding(false);
 
    } else {
      setValue("evaluationRows", {});
    }

    // setValue("isDataFetching", false);
  };

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

  // const getdefaultFilters = async () => {
  //   console.log("dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa::::::",JSON.parse(allfiltyerData).filters)
  //   setValue("isFilterLoading", true);
  //   const prefilterlist = allfiltyerData.filters;
  //   console.log(prefilterlist)

  //   const res = await getMinMaxForEvaluation();
  //   if (res.success && res?.data?.data) {
  //     setValue("min_max_call_duration", res?.data?.data?.call_duration);
  //     const { call_duration, tenure, sub_category } = res?.data?.data;
  //     const filterList = [];
  //     if (sub_category.length) {
  //       sub_category.forEach((value) => {
  //         filterList.push({
  //           label: value.Sub_category,
  //           name: value.slug,
  //           value: null,
  //           component: SidebarComponent.RADIO,
  //         });
  //       });
  //     }
  //     filterList.push({
  //       label: "Call Duration",
  //       name: "call_duration",
  //       value: call_duration,
  //       component: SidebarComponent.SLIDER,
  //     });
  //     filterList.push({
  //       label: "Tenure",
  //       name: "tenure",
  //       value: tenure,
  //       component: SidebarComponent.MULTIRADIO,
  //     });
  //     setValue("filters", prefilterlist.length>0 ? prefilterlist : filterList);
  //   }
  //   setValue("isFilterLoading", false);
  // };
  const getFilters = async () => {
    setValue("isFilterLoading", true);

    const res = await getMinMaxForEvaluation();
    if (res.success && res?.data?.data) {
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
      console.log(allfiltyerData.filters);
      if (allfiltyerData) {
        setValue("filters", allfiltyerData?.filters);
      }
      if (!allfiltyerData.filters) {
        setValue("filters", filterList);
      }
    }
    setValue("isFilterLoading", false);
  };

  useEffect(() => {
    // setValue("isDataFetching", false);
    // console.log(isFilterLoading)
    // dispatch(fetchAnalaticfilterdata(JSON.stringify(watch())))
  }, [filters, lob, team, agent, isClearAll, call_duration, tenure]);

  useEffect(() => {
    getLoBList();
    setValue("lob", allfiltyerData?.lob);
    setValue("team", allfiltyerData?.team);
    setValue("agent", allfiltyerData?.agent);

    // console.log(allfiltyerData);
    // const filterData = allfiltyerData;
    // console.log(filterData);
    getFilters();
    // getdefaultFilters();
    // if(allfiltyerData){

    // }else{
    // }
    // if (allfiltyerData.length) {
    //   // getFilters();
    //   const filterData = JSON.parse(localStorage.getItem("filterData"));
    //   console.log(filterData);
    //   if (filterData) {
    //     console.log(filterData)

    //     // setValue("rangeDate", filterData.rangeDate);
    //   }
    // }else{
    //   //  getFilters();
    // }
    // if (filterData) {

    //   setValue("lob", filterData.lob);
    //   setValue("team", filterData.team);
    //   setValue("agent", filterData.agent);
    //   setValue("rangeDate", filterData.rangeDate);
    //   dispatch(fetchAnalaticfilterdata(filterData.filters))

    // }
    console.log("row data", evaluationRows);
  }, []);

  useEffect(() => {
    if (lob) {
      // dispatch(fetchAnalaticfilterdata(JSON.stringify(watch())))
      setIsLoding(true)
      getTeamList();
    }
  }, [lob]);
  useEffect(() => {
    if (allfiltyerData) {
      // dispatch(fetchAnalaticfilterdata(JSON.stringify(watch())))
      if (!isFilterLoading) {
        getEvaluationDetails();
      }
    }
  }, [allfiltyerData]);

  useEffect(() => {
    setIsLoding(true)
    if (team) {
      // dispatch(fetchAnalaticfilterdata(JSON.stringify(watch())))
      getAgentList();
    }
  }, [team]);

  useEffect(() => {
    setIsLoding(true)
    if (agent) {
      // dispatch(fetchAnalaticfilterdata(JSON.stringify(watch())))
    }
  }, [agent]);

  const handleFilterChange = (event, name, value) => {
    // if(name = "tenure"){

    // }
    setIsLoding(true)
    if (name === "call_duration") {
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
    console.log(updatedFilterValues);
    setValue("filters", updatedFilterValues);
    dispatch(fetchAnalaticfilterdata(JSON.stringify(watch())));

    event.stopPropagation();
  };

  const handleSliderChange = (event, name, value) => {
    // const defaultTenure = filters?.find(
    //   (item) => item.component === "SLIDER" && item.name === "tenure"
    // ).value;
    //    const defaultTenure = filters?.find(
    //   (item) => item.component === "SLIDER" && item.name === "tenure"
    // ).value;
    // const defaultCallDuration = filters?.find(
    //   (item) => item.component === "SLIDER" && item.name === "call_duration"
    // ).value;
    console.log("evaluation", name, value);

    if (name === "call_duration") {
      setValue("call_duration", value);
    }
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

  function CustomLoadingOverlay() {
    return (
      <GridOverlay>
        <div style={{ width: "100%" ,zIndex: 1000,position: "absolute",left: "50%",top: "35%",height: "120px",
  // animation: spin 2s linear infinite;
  }}>
        <BeatLoader loading={isLoading} size={15} />
        </div>
      </GridOverlay>
    );
  }

  const toggleDrawerValue = (params) => {
    // console.log("calleds");
    setDrawerValue(!drawerValue);
  };

  return (
    <>
      <Grid container>
        <Header {...props} toggleDrawerValue={toggleDrawerValue} />
      </Grid>
      <div className="evaluation-table">
        <Grid container>
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
            <div className="sidebar">
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
            </div>
          </Grid>
          <Grid
            item
            xl={10.4}
            lg={10.2}
            md={12}
            sm={12}
            sx={{
              pl: 2,
              [`@media screen and (min-width: 1536px)`]: {
                pl: 2,
              },
              [`@media screen and (min-width: 1200px)`]: {
                pl: 5,
              },
              [`@media screen and (min-width: 1300px)`]: {
                pl: 2,
              },
              pt: 1,
              pr: 2,
              mt: 4,
              pb: 2,
              background: "F5F8FA",
            }}
          >
            <Box component="main" sx={{ width: "100%", background: "#FFFFFF" }}>
              {/* <div className="pl-320 pt-65"> */}

              <div className="mt-12">
                <div>
                  <div className="mt-8">
                    {/* <div style={{ width: "100%" }}>
                      
                    </div> */}
                    <div style={{ width: "100%" }}>
                      <DataGrid
                        components={{
                          LoadingOverlay: CustomLoadingOverlay,
                        }}
                        pagination
                        pageSize={pageSize}
                        onPageSizeChange={(newPageSize) =>
                          setPageSize(newPageSize)
                        }
                        rowsPerPageOptions={[5, 10, 20]}
                        rows={evaluationRows || []}
                        columns={columns}
                        // pageSize={12}

                        autoHeight
                        disableExtendRowFullWidth={false}
                        // rowsPerPageOptions={[12]}
                        checkboxSelection={false}
                        loading={isLoading || isDataFetching || isFilterLoading}
                        // loading={isLoading}
                      />
                    </div>
                    {/* <Table
                      sx={{
                        borderCollapse: "separate",
                        borderSpacing: "0 5px",
                      }}
                      aria-label="customized table"
                    >
                      <TableHead>
                        <TableRow className="evaluation-table-head">
                          <TableCell align="center">Call Duration</TableCell>
                          <TableCell align="center">Agent Name</TableCell>
                          <TableCell align="center">CQ Score</TableCell>
                          <TableCell align="center">Call Time</TableCell>
                          <TableCell align="center">Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      {isFilterLoading || isDataFetching ? (
                        <div
                          style={{
                            display: "flex",
                            position: "absolute",
                            top: "44%",
                            left: "53%",
                          }}
                        >
                          <BeatLoader
                            loading={isFilterLoading || isDataFetching}
                            size={15}
                          />
                        </div>
                      ) : (
                        <TableBody>
                          {(evaluationRows || []).map((row) => (
                            <TableRow
                              key={row.call_duration}
                              className="evaluation-table-body"
                            >
                              <TableCell align="center">
                                {row.call_duration} min
                              </TableCell>
                              <TableCell align="center">
                                {row.agent_name}
                              </TableCell>
                              <TableCell
                                align="center"
                                className="cqScoreCell"
                                sx={{
                                  color: getCqScoreColor(row.cq_score, 0, 100),
                                }}
                              >
                                {row.cq_score}
                              </TableCell>
                              <TableCell align="center">
                                {row.date_of_call}
                              </TableCell>
                              <TableCell
                                align="center"
                                onClick={() => viewEvaluation(row.call_id)}
                                sx={{ color: "#0171C3 !important" }}
                              >
                                view
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      )}
                    </Table> */}
                  </div>
                </div>
                {/* </div> */}
              </div>
            </Box>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default withRouter(EvaluationTable);
