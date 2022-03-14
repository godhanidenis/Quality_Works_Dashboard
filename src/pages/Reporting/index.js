/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Paper,
  styled,
  Table,
  TableBody,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import TableSortLabel from "@mui/material/TableSortLabel";
import { DataGrid, GridOverlay } from "@mui/x-data-grid";
import LinearProgress from "@mui/material/LinearProgress";
import TableCell from "@mui/material/TableCell/TableCell";
import AddIcon from "@mui/icons-material/Add";
import Sidebar from "../../components/common/SideBar";
import downloadIcon from "../../assest/icon/downloadIocn.svg";
import AddColumnModal from "./addColumnModal";
import { CSVLink } from "react-csv";
import {
  getAgentBasedTeam,
  getLOB,
  getLobTeam,
  getReportingData,
  getReportingMinMax,
} from "../../actions";
import { SidebarComponent } from "../../CONST";
import "./Reporting.scss";
import Drawer from "@mui/material/Drawer";
import Grid from "@mui/material/Grid";
import moment from "moment";
import Header from "../../components/Header";

function CustomLoadingOverlay() {
  return (
    <GridOverlay>
      <div style={{ position: "absolute", top: 0, width: "100%" }}>
        <LinearProgress />
      </div>
    </GridOverlay>
  );
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#FFFFFF;",
    fontWeight: "bold",
    color: "#262626",
    fontSize: 14,
    minWidth: 100,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    color: "#262626",
    borderBottom: "unset",
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
  reportingDetailsRows: [],
  reportingHeaders: [],
  lob: [{ label: "Prepaid", value: 1 }],
  team: [],
  agent: [],
  rangeDate: ["2021-01-15", "2022-04-15"],
  isFilterLoading: false,
  isDataFetching: false,
  filters: [],
  addColumnData: [],
  isOpen: false,
  addColumnSelectedValues: [],
  call_duration: [],
  tenure: [],
   min_max_call_duration: [],
  isClearAll: false,
  isAddColumns: false,
  reportingdata: [],
};

const Reporting = (props) => {
  window.scrollTo(0, 0);
  const [drawerValue, setDrawerValue] = React.useState(false);
  const { watch, setValue, control } = useForm({
    defaultValues,
    mode: "onChange",
  });
  const {
    filters,
    addColumnData,
    lob,
    team,
    agent,
    rangeDate,
    reportingDetailsRows,
    reportingHeaders,
    isClearAll,
    call_duration,
    tenure,
    isAddColumns,
    reportingdata,
    min_max_call_duration,
  } = watch();

  const [visible, setVisible] = useState(false);

  const [columns, setColumns] = useState([]);
  const [headerList, setHeaderList] = useState([]);

  const colomn = [
    {
      field: "lob_name",
      headerName: "Lob Name",
      width: 120,
      headerAlign: "center",
    },
    {
      field: "No_of_teams",
      headerName: "No of Teams",
      headerAlign: "center",
      width: 120,
    },
    // {
    //   field: "No of Lobs",
    //   headerName: "No of Lobs",
    //   width: 120,
    // },
    // {
    //   field: "Team Name",
    //   headerName: "Team Name",
    //   width: 120,
    // },
    {
      field: "No_of_agents",
      headerName: "No of Agents",
      headerAlign: "center",
      width: 120,
    },
    {
      field: "No_of_calls",
      headerName: "No of Calls",
      headerAlign: "center",
      width: 120,
    },
    {
      field: "CQ Score",
      headerName: "CQ Score",
      headerAlign: "center",
      width: 120,
      
    },
    {
      field: "CSAT Score",
      headerName: "CSAT Score",
      headerAlign: "center",
      width: 120,
    },
  ];

  const [addColumnSelectedValues, setAddColumnSelectedValues] = useState([]);

  const handleClose = () => {
    setVisible(false);
  };

  const addColumn = () => {
    setVisible(true);
  };

  const handleCheckBox = (value) => {
    setValue("checked", value);
  };

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

  const getAgentList = async () => {
    const teamList = {
      team_list: (team || []).map((v) => v.value) || [],
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
      lob_list: (lob || []).map((v) => v.value) || [],
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
    const res = await getReportingMinMax();
    if (res.success && res?.data?.data) {
        setValue("min_max_call_duration", res?.data?.data?.call_duration);
      const { call_duration, tenure, sub_category } = res?.data?.data;
      const filterList = [];
      const addColumnData = [];
      if (sub_category.length) {
        sub_category.forEach((value) => {
          filterList.push({
            label: value?.Sub_category,
            name: value.slug,
            value: null,
            component: SidebarComponent.RADIO,
          });
          addColumnData.push({
            id: value?.id,
            slug: value?.slug,
            categoryName: value?.Category?.Category_name,
            subcategoryName: value?.Sub_category,
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
      setValue("filters", filterList);
      setValue("addColumnData", addColumnData);
    }
    setValue("isFilterLoading", false);
  };

  const getReportingList = async () => {
    let fields = [];
    let filterPayload = {};
    let tenure = [];
    console.log(filters)
    filters.forEach((filter) => {
      if (!Array.isArray(filter.value) && filter.value) {
      if(filter.component === "MULTIREDIO"){
            tenure = JSON.parse(filter.value)
        }else{
            filterPayload[filter.name] = filter.value;
        }
      }
    });

    Array.isArray(addColumnSelectedValues) &&
      addColumnSelectedValues.forEach((a) =>
        (a?.values || [])?.forEach((b) => fields?.push(b))
      );

    const reportingData = {
      lob_id: lob.length ? lob.map((v) => v.value) : [],
      team_id: team.length ? team.map((v) => v.value) : [],
      agent_id: agent.length ? agent.map((v) => v.value) : [],
      start_date: moment(new Date(rangeDate?.[0])).format("YYYY-MM-DD"),
      end_date: moment(new Date(rangeDate?.[1])).format("YYYY-MM-DD"),
      callduration: call_duration || [],
      tenure:  tenure || [],
      filter: filterPayload,
      fields: fields,
    };

    const response = await getReportingData(reportingData);

    if (response.success && response?.data?.data) {
        console.log("getreportingdata",response?.data?.data)
      if(response?.data?.data){
          setColumns([]);

      const listofdata = [];
      const header = [];
      response?.data?.data?.fields?.map((item) => {
        listofdata.push({
          field: item,
          headerName: item,
          flex:1,
          minWidth: 130,
          // width: 130, minWidth: 130, maxWidth: 200,
          headerAlign: "center",
        });
          header.push({
          key: item,
          label: item,
        });
        return listofdata , header;
      });
      console.log(header)
         console.log(header)
      setHeaderList(header)
      setColumns(listofdata);
      const rest =
        response.data.data.basic_call_info &&
        response.data.data.basic_call_info?.map((row) => {
          return Object.keys(row).map((key) => {
            return row[key];
          });
        });
      response?.data?.data?.basic_call_info?.map((item, index) => {
        item["id"] = index;
        return { ...item };
      });
      const restt = response?.data?.data?.basic_call_info?.map((row) => {
        return Object.keys(row).map((key) => {
          if (typeof row[key] === "string") {
            row[key] = row[key];
          } else if (typeof row[key] === "number") {
            row[key] = parseInt(row[key]);
          }
          return row;
        });
      });


      setValue("reportingdata", response?.data?.data?.basic_call_info);

      // console.log(rest);
      setValue("reportingDetailsRows", rest);
      setValue("reportingHeaders", response.data.data.fields);
      }else{
         setValue("reportingdata", {});
      setValue("reportingDetailsRows", {});
      setValue("reportingHeaders", {});
      }
    
    } else {
      setValue("reportingdata", {});
      setValue("reportingDetailsRows", {});
      setValue("reportingHeaders", {});
    }
    // console.log();
  };

  console.log(headerList)
  const csvtableReport = {
  data: reportingdata ? reportingdata : [],
  headers: headerList ? headerList : [],
  filename: new Date()
};

  useEffect(() => {
    setValue("isFilterLoading", true);
    getLoBList();
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
    getReportingList();
  }, [
    team,
    lob,
    agent,
    rangeDate,
    filters,
    isClearAll,
    tenure,
    call_duration,
    isAddColumns,
    isAddColumns,
  ]);

  const handleFilterChange = (event, name, value) => {
    const updatedFilterValues = filters.map((filter) => {
      if (filter.name === name) {
        return {
          ...filter,
          value,
        };
      }
      return filter;
    });
    setValue("filters", updatedFilterValues);
    event.stopPropagation();
  };

  const handleSliderChange = (event, name, value) => {
    // const defaultTenure = filters?.find(
    //   (item) => item.component === "SLIDER" && item.name === "tenure"
    // ).value;
    // const defaultCallDuration = filters?.find(
    //   (item) => item.component === "SLIDER" && item.name === "call_duration"
    // ).value;
   if (
      name === "call_duration"
    ) {
      setValue("call_duration", value);
    }
    if(name === "tenure"){
      setValue("tenure", value);
    }
  };

  const saveColumns = () => {
    setVisible(false);
    setValue("isAddColumns", !isAddColumns);
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
            isMulti={true}
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
  const defaultpage = (e) =>{
    if(e.target.value=="0"){
      
      setValue("selectedTab","Reporting")
    }
  }

  return (
    <div className="reporting">
      <Grid container>
        <Header {...props} toggleDrawerValue={toggleDrawerValue} defaultpage={defaultpage}/>
      </Grid>
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
              isMulti={true}
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
              pl: 3,
            },
            pt: 4,
            pr: 2,
            background: "#F5F8FA",
          }}
        >
          <AddColumnModal
            visible={visible}
            handleClose={handleClose}
            values={watch().checked}
            handleCheckBox={handleCheckBox}
            addColumnData={addColumnData}
            setAddColumnSelectedValues={setAddColumnSelectedValues}
            addColumnSelectedValues={addColumnSelectedValues}
            getReportingList={getReportingList}
            saveColumns={saveColumns}
          />
          <div className="mt-12">
            <div className="d-flex justify-content-between align-item-center">
              <div className="d-flex">
                <Button
                  variant="outlined"
                  onClick={addColumn}
                  className="reporting-button btn-textTransform"
                  endIcon={<AddIcon fontSize="inherit" />}
                  autoCapitalize={false}
                >
                  Add Coloumn
                </Button>
                <div className="ml-16">
                  <Button
                    variant="outlined"
                    className="reporting-button btn-textTransform"
                    // eslint-disable-next-line jsx-a11y/alt-text
                    endIcon={<img src={downloadIcon} />}
                  >
                   <CSVLink {...csvtableReport}>Download Report</CSVLink> 
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              width: "100%",
              marginTop: "24px",
              background: "#FFFFFF",
            }}
          >
            <DataGrid
              rows={reportingdata ? reportingdata : []}
              columns={columns}
              autoHeight
              checkboxSelection={false}
            />
          </div>

          {/* <Box component="main" sx={{ width: "100%" }}>
            <div className="pt-40">
              <div className="mt-12">
                <div>
                  <div className="mt-8">
                    <TableContainer component={Paper} className="custom-table">
                      <Table aria-label="customized table">
                        <TableHead>
                          <TableRow>
                            {reportingHeaders.map((v, index) => (
                              <StyledTableCell key={v + index} align="center">
                                {v}
                              </StyledTableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {reportingDetailsRows &&
                            reportingDetailsRows.map((row, index) => {
                              console.log(row);
                              return (
                                <StyledTableRow key={row + index}>
                                  {row.map((value) => {
                                    let colValue = 0;
                                    if (typeof value === "string") {
                                      colValue = value;
                                    } else if (typeof value === "number") {
                                      colValue = parseInt(value);
                                    }
                                    return (
                                      <StyledTableCell align="center">
                                        {colValue}
                                      </StyledTableCell>
                                    );
                                  })}
                                </StyledTableRow>
                              );
                            })}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                </div>
              </div>
            </div>
          </Box> */}
        </Grid>
      </Grid>
    </div>
  );
};

export default Reporting;
