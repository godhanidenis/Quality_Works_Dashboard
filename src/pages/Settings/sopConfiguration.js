/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Fade,
  Grid,
  Paper,
  MenuItem,
  Select,
  Popper,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import threeDotIcon from "../../assest/icon/threeDotIcon.svg";
import TextField from "@mui/material/TextField";
import searchIcon from "../../assest/icon/SearchIcon.svg";
import { createStyles, makeStyles } from "@mui/styles";
import Chip from "@mui/material/Chip";
import { DataGrid } from "@mui/x-data-grid";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import {
  addSalutation,
  addSubSop,
  editSubSop,
  getSopTypes,
  getCallFeature,
  getCallFeatureList,
  updateCallFeature,
} from "../../actions";
import AddSalutationModal from "./Modal/Sop/addSalutation";
import AddSubSopModal from "./Modal/Sop/subCategory";
import { styled } from "@mui/material/styles";
import { IconButton, InputAdornment } from "@mui/material";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import TabsUnstyled from "@mui/base/TabsUnstyled";
import TabsListUnstyled from "@mui/base/TabsListUnstyled";
import TabPanelUnstyled from "@mui/base/TabPanelUnstyled";
import { buttonUnstyledClasses } from "@mui/base/ButtonUnstyled";
import TabUnstyled, { tabUnstyledClasses } from "@mui/base/TabUnstyled";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: "8px",
  textAlign: "center",
  marginTop: "15px",
  marginLeft: "20px",
  color: theme.palette.text.secondary,
}));
const blue = {
  50: "#0171C3",
  100: "#C2E0FF",
  200: "#80BFFF",
  300: "#66B2FF",
  400: "#3399FF",
  500: "rgba(0, 0, 0, 0.06)",
  600: "#FFFFFF",
  700: "#0059B2",
  800: "#004C99",
  900: "#003A75",
};

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const min = 1;
const max = 100;

const currencies = [
  {
    value: "0",
    label: "Adhered",
  },
  {
    value: "1",
    label: "Not Adhered",
  },
  {
    value: "2",
    label: "Select type",
  },
];

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

const columns = [
  {
    field: "call_feature",
    headerName: "call opening",
    headerAlign: "center",
    width: 300,
  },
  {
    field: "score",
    headerName: "score",
    editable: true,
    headerAlign: "center",
    width: 300,
  },
];

// const rows = [
//   {
//     id: 1,
//     call_feature: "call_opening",

//     score: "33%",
//   },
//   {
//     id: 2,
//     call_feature: "call_opening",

//     score: "53%",
//   },
//   {
//     id: 3,
//     call_feature: "call_opening",

//     score: "35%",
//   },
//   {
//     id: 4,
//     call_feature: "call_opening",

//     score: "83%",
//   },
//   {
//     id: 5,
//     call_feature: "call_opening",

//     score: "73%",
//   },
//   {
//     id: 6,
//     call_feature: "call_opening",

//     score: "93%",
//   },
//   {
//     id: 7,
//     call_feature: "call_opening",

//     score: "33%",
//   },
//   {
//     id: 8,
//     call_feature: "call_opening",

//     score: "33%",
//   },
//   {
//     id: 9,
//     call_feature: "call_opening",

//     score: "33%",
//   },
// ];
const Div = styled("div")(({ theme }) => ({
  ...theme.typography.button,
  textTransform: "none",
  backgroundColor: "rgba(0, 0, 0, 0.06)",
  fontFamily: "helveticaneue",
  padding: "10px",
  marginLeft: "20px",
  lineHeight: "20px",
}));

const SopConfigurationTab = ({ setValue, values }) => {
  const {
    anchorEl,
    open,
    text,
    min,
    max,
    score,
    sopTypes,
    callFeatureListdata,
    addSalutationModalVisible,
    addSubSopModalVisible,
  } = values;
  const toastId = React.useRef(null);
  const notify = (item) => toastId.current = toast(item, { autoClose: 800 });

  const [selectedSalutation, setSelectedSalutation] = useState({});
  const [callFeatureData, setCallFeatureData] = useState();
  const [minvalue, setMinValue] = React.useState();
  const [maxvalue, setMaxValue] = React.useState();
  const [editrecord, setEditrecord] = React.useState();
  const [isEdit, setIsEdit] = React.useState(false);
  // const [score, setScore] = React.useState();
  const [subSop, setSop] = useState({});
  const [isFromSubSop, setFromSubSop] = useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState();
  // const [text, setText] = React.useState();
  const classes = useStyles();
  const [lobvalue, setLobvalue] = React.useState([]);
  const [currency, setCurrency] = React.useState(2);
  const [chipData, setChipData] = React.useState([]);
  const [tagchipData, setTagchipData] = React.useState([]);
  const [tagtypechipData, setTagtypechipData] = React.useState([]);
  const handleChange = (event) => {
    setCurrency(event.target.value);
  };

  const onEdit = async () => {
    console.log("hello");

    console.log("bskjajbnd", callFeatureData[0]?._source?.doctype);
    // const bodyFormData = new FormData();
    // bodyFormData.append('doctype',callFeatureData[0]?._source?.doctype);
    // bodyFormData.append('text',text);
    // bodyFormData.append('min',min);
    // bodyFormData.append('max',max);
    // bodyFormData.append('score', score);
    // bodyFormData.append('uploaded_date',callFeatureData[0]?._source?.uploaded_date);
    const chiplist = [];
    chipData.map((item) => chiplist.push(item.label));
    const tagchiplist = [];
    tagchipData.map((item) => tagchiplist.push(item.label));
    const tagtype = [];
    tagtypechipData.map((item) => tagtype.push(item.label));
    if (editrecord?._source?.keywords) {
      const bodyFormData = {
        doctype: editrecord._source?.doctype,
        text: text,
        min: min,
        max: max,
        score: score,
        uploaded_date: editrecord._source?.uploaded_date,
        keywords: chiplist,
        // tag_list: tagchiplist
      };
      console.log(bodyFormData);
      const response = await updateCallFeature(bodyFormData, editrecord?._id);
      if (response.success) {
        notify("successfully updated");
        console.log(response?.data?.data);
      }
      console.log(bodyFormData);
    } else if (editrecord?._source?.tag_list) {
      const bodyFormData = {
        doctype: editrecord?._source?.doctype,
        text: text,
        min: min,
        max: max,
        score: score,
        uploaded_date: editrecord?._source?.uploaded_date,
        // keywords: chiplist,
        tag_list: tagchiplist,
      };
      console.log(bodyFormData);
      const response = await updateCallFeature(bodyFormData, editrecord?._id);
      if (response.success) {
        notify("successfully updated");
        console.log(response?.data?.data);
      }
      console.log(bodyFormData);
    } else if (editrecord?._source?.tag_type) {
      const bodyFormData = {
        doctype: editrecord?._source?.doctype,
        text: text,
        min: min,
        max: max,
        score: score,
        uploaded_date: editrecord?._source?.uploaded_date,
        // keywords: chiplist,
        tag_type: tagtype,
      };
      console.log(bodyFormData);
      const response = await updateCallFeature(bodyFormData, editrecord?._id);
      if (response.success) {
        notify("successfully updated");
        console.log(response?.data?.data);
      }
      console.log(bodyFormData);
    } else if (callFeatureData[0]?._source?.tag_list) {
      const bodyFormData = {
        doctype: callFeatureData[0]?._source?.doctype,
        text: text,
        min: min,
        max: max,
        score: score,
        uploaded_date: callFeatureData[0]?._source?.uploaded_date,
        // keywords: chiplist,
        tag_list: tagchiplist,
      };
      console.log(bodyFormData);
      const response = await updateCallFeature(
        bodyFormData,
        callFeatureData[0]?._id
      );
      if (response.success) {
        notify("successfully updated");
        console.log(response?.data?.data);
      }
      console.log(bodyFormData);
    } else {
      const bodyFormData = {
        doctype: callFeatureData[0]?._source?.doctype,
        text: text,
        min: min,
        max: max,
        score: score,
        uploaded_date: callFeatureData[0]?._source?.uploaded_date,
        // keywords: chiplist,
        // tag_list: tagchiplist
      };
      console.log(bodyFormData);
      const response = await updateCallFeature(
        bodyFormData,
        callFeatureData[0]?._id
      );
      if (response.success) {
        notify("successfully updated");
        console.log(response?.data?.data);
      }
      console.log(bodyFormData);
    }
  };

  const handleListItemClick = async (event, index, item) => {
    // console.log(item)
    setIsEdit(false);
    const sopType = new FormData();
    //  sopType.append();
    console.log(sopType);
    const response = await getCallFeature({ doctype: item?.Sub_category });
    console.log(response.data.error);
    if (!response.data.error && response?.data?.data) {
      setSelectedIndex(index);
      setCallFeatureData(response?.data?.data || []);

      const keywordlist = [];
      const taglist = [];
      const tagtypelist = [];
      if (response?.data?.data[0]?._source?.keywords) {
        response?.data?.data[0]?._source?.keywords?.map((item, index) => {
          console.log(item);
          keywordlist.push({ key: index, label: item });
          return keywordlist;
        });
      }
      if (response?.data?.data[0]?._source?.tag_list) {
        response?.data?.data[0]?._source?.tag_list?.map((item, index) => {
          console.log(item);
          taglist.push({ key: index, label: item });
          return taglist;
        });
      }
      if (response?.data?.data[0]?._source?.tag_type) {
        response?.data?.data[0]?._source?.tag_type?.map((item, index) => {
          console.log(item);
          tagtypelist.push({ key: index, label: item });
          return tagtypelist;
        });
      }
      setValue("text", response?.data?.data[0]?._source.text);
      setValue("min", response?.data?.data[0]?._source.min);
      setValue("max", response?.data?.data[0]?._source.max);
      setValue("score", response?.data?.data[0]?._source.score);
      setTagtypechipData(tagtypelist);
      setTagchipData(taglist);
      setChipData(keywordlist);
      console.log(response?.data?.data);
      console.log(text, max);
    }else{
      setCallFeatureData([]);
    }
  };
  console.log(chipData);

  // const handlePopover = (event) => {
  //     setValue("anchorEl", event.currentTarget);
  //     setValue("open", !open)
  // };

  const fetchSopTypes = async () => {
    const response = await getSopTypes();
    if (response.success && response?.data?.data) {
      setValue("sopTypes", response.data.data);
    }
  };
  const searchHandler = () => {};

  const handleChangelob = (e) => {
    console.log(e);
    setLobvalue(e.target.value);
  };

  const keyPress = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      this.searchHandler();
    }
  };

  const handleSearch = (event, newValue) => {};

  const handleAddSalutation = async (name) => {
    const bodyFormData = new FormData();
    bodyFormData.append("Sop_name", name);
    const response = await addSalutation(bodyFormData);
    if (response.success) {
      setValue("addSalutationModalVisible", !addSalutationModalVisible);
      fetchSopTypes();
    }
  };

  const handleEditSubSop = async ({ sop, subSop }) => {
    setSelectedSalutation(sop);
    setSop(subSop);
    setFromSubSop(true);
    setValue("addSubSopModalVisible", !addSubSopModalVisible);
  };

  const handleSubmitSubSopType = async ({ name, selectedTeams }) => {
    if (isFromSubSop) {
      const payload = {
        sop_type_id: subSop.Sop_types,
        sub_sop: name,
        sop_team: selectedTeams.map((a) => a.value),
      };
      const response = await editSubSop(subSop.id, payload);
      if (response.success) {
        setValue("addSubSopModalVisible", !addSubSopModalVisible);
        setSelectedSalutation({});
        handleCloseSubSopModal();
        fetchSopTypes();
      }
    } else {
      const payload = {
        sop_type_id: selectedSalutation.id,
        sub_sop: name,
        sop_team: selectedTeams.map((a) => a.value),
      };
      const response = await addSubSop(payload);
      if (response.success) {
        setValue("addSubSopModalVisible", !addSubSopModalVisible);
        setSelectedSalutation({});
        handleCloseSubSopModal();
        fetchSopTypes();
      }
    }
  };

  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
  };
  const handletagDelete = (chipToDelete) => () => {
    setTagchipData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
  };
  const handletagtypeDelete = (chipToDelete) => () => {
    setTagtypechipData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
  };

  const handleCloseSubSopModal = () => {
    setValue("addSubSopModalVisible", !values.addSubSopModalVisible);
    setSelectedSalutation({});
    setSop({});
    setFromSubSop(false);
  };
  const getdata = (e) => {
    if (e.keyCode === 13) {
      setChipData([
        ...chipData,
        { key: chipData.length, label: e.target.value },
      ]);
      console.log(e.target.value);
      console.log(chipData);
    }
  };
  const gettaglistdata = (e) => {
    if (e.keyCode === 13) {
      setTagchipData([
        ...tagchipData,
        { key: tagchipData.length, label: e.target.value },
      ]);
      console.log(e.target.value);
      console.log(tagchipData);
    }
  };
  const gettagtypedata = (e) => {
    if (e.keyCode === 13) {
      setTagtypechipData([
        ...tagtypechipData,
        { key: tagtypechipData.length, label: e.target.value },
      ]);
      console.log(e.target.value);
      console.log(tagchipData);
    }
  };
  const callFeatureList = async () => {
    const response = await getCallFeatureList();
    if (response.success && response?.data?.data) {
      console.log(response?.data?.data);
      // setValue("email", response?.data?.data?.email);
      setValue("callFeatureListdata", response.data.data);
    }
  };
  const openpopup = async (item) => {
    if(item){
      setIsEdit(true);
      setValue("text", item._source.text);
      setValue("min", item._source.min);
      setValue("max", item._source.max);
      setValue("score", item._source.score);
      await setEditrecord(item);
    }else{
      setEditrecord({})
    }
    console.log(item);
  };


  const handledefaultcustomer = async () => {
    handleListItemClick(
      "e",
      callFeatureListdata?.Customer[0]?.id,
      callFeatureListdata?.Customer[0]
    );
  };

  const handledefaultagent = async () => {
    handleListItemClick(
      "e",
      callFeatureListdata?.Agent[0]?.id,
      callFeatureListdata?.Agent[0]
    );
  };
  console.log(text, min);
  console.log(editrecord);

  useEffect(() => {
    fetchSopTypes();
    callFeatureList();
  }, []);

  useEffect(() => {
    if (callFeatureListdata) {
      handleListItemClick(
        "e",
        callFeatureListdata?.Agent[0]?.id,
        callFeatureListdata?.Agent[0]
      );
    }
  }, [callFeatureListdata]);

  return (
    <>
      <ToastContainer />
      <Box>
        <Item>
          <Grid container spacing={2} sx={12} sx={{ display: "inline" }}>
            <TabsUnstyled defaultValue={0}>
              <Grid
                container
                sx={{
                  flexWrap: "nowrap",
                  display: { lg: "flex", xl: "flex" },
                }}
              >
                <Grid item lg={12}>
                  <Divider orientation="horizontal" flexItem>
                    <Grid
                      container
                      direction="row"
                      alignItems="flex-start"
                      justifyContent="flex-end"
                    >
                      <TabsList className="tab-bar">
                        <Tab onClick={handledefaultagent}>Agent</Tab>
                        <Tab onClick={handledefaultcustomer}>Customer</Tab>
                      </TabsList>
                    </Grid>
                  </Divider>
                </Grid>
                <Grid item>
                  <Divider orientation="horizontal" flexItem>
                    <Grid
                      container
                      direction="row"
                      alignItems="flex-start"
                      justifyContent="flex-end"
                    ></Grid>
                  </Divider>
                </Grid>
              </Grid>

              <TabPanel value={0} className="pt-32">
                <Grid item container sx={{ p: "8px !important" }}>
                  <Grid item xs={3} lg={3} md={3}>
                    <List
                      component="nav"
                      aria-label="main mailbox folders"
                      sx={{
                        borderRight: "2px solid lightgray",
                        height: "668px",
                        overflow: "auto",
                        pt: 0,
                      }}
                    >
                      {callFeatureListdata?.Agent &&
                        callFeatureListdata?.Agent?.map((item) => {
                          return (
                            <ListItemButton
                              selected={selectedIndex === item.id}
                              onClick={(event) =>
                                handleListItemClick(event, item.id, item)
                              }
                            >
                              <ListItemText
                                disableTypography
                                primary={
                                  <Typography
                                    type="body2"
                                    style={{
                                      fontSize: "1rem",
                                      color: "#001B34",
                                      fontWeight: 600,
                                    }}
                                  >
                                    {item?.Sub_category}
                                  </Typography>
                                }
                              />
                            </ListItemButton>
                          );
                        })}
                    </List>
                  </Grid>
                  <Grid item xs={9} lg={9} md={9} sx={{ pt: 1 }}>
                    <Grid container spacing={2}>
                      <Grid container spacing={2} className="pb-16">
                        <Grid item xs={0.5}></Grid>
                        <Grid item xs={6}>
                          {callFeatureListdata?.Agent &&
                            callFeatureListdata?.Agent?.map((item) => {
                              return (
                                <>
                                  {" "}
                                  {selectedIndex === item.id && (
                                    <Typography
                                      variant="h5"
                                      gutterBottom
                                      component="div"
                                      disableTypography={true}
                                      sx={{
                                        textAlign: "start",
                                        color: "#001B34",
                                        fontWeight: 600,
                                      }}
                                    >
                                      {item?.Sub_category}
                                    </Typography>
                                  )}
                                </>
                              );
                            })}
                          {callFeatureListdata?.Customer &&
                            callFeatureListdata?.Customer?.map((item) => {
                              return (
                                <>
                                  {" "}
                                  {selectedIndex === item.id && (
                                    <Typography
                                      variant="h5"
                                      gutterBottom
                                      component="div"
                                      disableTypography={true}
                                      sx={{
                                        textAlign: "start",
                                        color: "#001B34",
                                        fontWeight: 600,
                                      }}
                                    >
                                      {item?.Sub_category}
                                    </Typography>
                                  )}
                                </>
                              );
                            })}
                        </Grid>
                        {isEdit && (
                          <Grid
                            item
                            xs={5}
                            sx={{
                              alignSelf: "center",
                              display: "flex",
                              justifyContent: "end",
                            }}
                          >
                            <Button
                              variant="contained"
                              size="small"
                              onClick={onEdit}
                            >
                              Save
                            </Button>
                          </Grid>
                        )}
                      </Grid>
                      {callFeatureData &&
                        callFeatureData?.map((item) => {
                          console.log(item);
                          if (item._source.text) {
                            return (
                              <>
                                {!isEdit && (
                                  <Grid container spacing={2} className="pt-16">
                                    <Grid item xs={0.5}></Grid>
                                    <Grid item xs={8}>
                                      <Div>{item?._source?.text} </Div>
                                    </Grid>
                                    <Grid item xs={1}>
                                      <Button
                                        variant="contained"
                                        onClick={() => openpopup(item)}
                                        className=""
                                      >
                                        Edit
                                      </Button>
                                      {/* <Button variant="text" onClick={()=>openpopup(item)} className="pt-15">Edit</Button> */}
                                    </Grid>
                                  </Grid>
                                )}
                              </>
                            );
                          } else {
                            return (
                              <>
                                {/* <Box
                                  sx={{
                                    padding: "8px",
                                  }}
                                > */}
                                  <Grid container spacing={2}>
                                    <Grid item xs={0.5}></Grid>
                                    <Grid item xs={6}>
                                      {/* {callFeatureListdata?.Agent && callFeatureListdata?.Agent?.map((item) => {
                                    return (<> {selectedIndex === item.id && <Typography variant="h5" gutterBottom component="div" disableTypography={true} sx={{ textAlign: "start", color: "#001B34", fontWeight: 600, }}>
                                      {item?.Sub_category}
                                    </Typography>}</>)
                                  })}
                                  {callFeatureListdata?.Customer && callFeatureListdata?.Customer?.map((item) => {
                                    return (<> {selectedIndex === item.id && <Typography variant="h5" gutterBottom component="div" disableTypography={true} sx={{ textAlign: "start", color: "#001B34", fontWeight: 600, }}>
                                      {item?.Sub_category}
                                    </Typography>}</>)
                                  })} */}
                                    </Grid>
                                    <Grid
                                      item
                                      xs={5}
                                      sx={{
                                        alignSelf: "center",
                                        display: "flex",
                                        justifyContent: "end",
                                      }}
                                    >
                                      <Button
                                        variant="contained"
                                        size="small"
                                        onClick={onEdit}
                                      >
                                        Save
                                      </Button>
                                    </Grid>

                                    {callFeatureData &&
                                      callFeatureData[0]?._source?.text && (
                                        <Grid container className="pt-40">
                                          <Grid item xs={1}></Grid>
                                          <Grid
                                            item
                                            xs={8}
                                            sx={{ textAlign: "start" }}
                                          >
                                            <div className="fs-14 text-black fw-bold pb-6">
                                              Text
                                              <span className="text-red"></span>
                                            </div>
                                            <TextField
                                              id="filled-multiline-static"
                                              InputProps={{
                                                disableUnderline: true,
                                              }}
                                              multiline
                                              rows={2}
                                              onChange={(e) =>
                                                setValue("text", e.target.value)
                                              }
                                              value={text}
                                              fullWidth
                                              variant="filled"
                                            />
                                          </Grid>
                                        </Grid>
                                      )}
                                    {callFeatureData &&
                                      callFeatureData[0]?._source?.tag_list && (
                                        <Grid
                                          container
                                          className="pt-40"
                                          spacing={2}
                                        >
                                          <Grid
                                            item
                                            xs={1}
                                            sm={1}
                                            md={1}
                                            lg={1}
                                          ></Grid>
                                          <Grid
                                            item
                                            xs={3.5}
                                            sm={3.5}
                                            md={3.5}
                                            lg={3.5}
                                            sx={{ textAlign: "start" }}
                                          >
                                            <div className="fs-14 text-black fw-bold pb-6">
                                              Add Tag
                                              <span className="text-red"></span>
                                            </div>
                                            <TextField
                                              hiddenLabel
                                              id="filled-hidden-label-small"
                                              placeholder="add tag"
                                              variant="filled"
                                              size="small"
                                              InputProps={{
                                                disableUnderline: true,
                                              }}
                                              fullWidth
                                              onKeyDown={gettaglistdata}
                                            />
                                          </Grid>

                                          <Grid
                                            item
                                            xs={7.5}
                                            sx={{ alignSelf: "end" }}
                                          >
                                            <Paper
                                              sx={{
                                                display: "flex",
                                                justifyContent: "start",
                                                flexWrap: "wrap",
                                                listStyle: "none",
                                                boxShadow: "none",
                                                p: 0,
                                                m: 0,
                                              }}
                                              component="ul"
                                            >
                                              {tagchipData.map((data) => {
                                                let icon;

                                                if (data.label === "React") {
                                                  icon = <TagFacesIcon />;
                                                }
                                                console.log(data);
                                                return (
                                                  <ListItem key={data.key}>
                                                    <Chip
                                                      icon={icon}
                                                      label={data.label}
                                                      onDelete={
                                                        data.label === "React"
                                                          ? undefined
                                                          : handletagDelete(
                                                              data
                                                            )
                                                      }
                                                    />
                                                  </ListItem>
                                                );
                                              })}
                                            </Paper>
                                          </Grid>
                                        </Grid>
                                      )}
                                    {callFeatureData &&
                                      callFeatureData[0]?._source?.tag_type && (
                                        <Grid
                                          container
                                          className="pt-40"
                                          spacing={2}
                                        >
                                          <Grid
                                            item
                                            xs={1}
                                            sm={1}
                                            md={1}
                                            lg={1}
                                          ></Grid>
                                          <Grid
                                            item
                                            xs={3.5}
                                            sm={3.5}
                                            md={3.5}
                                            lg={3.5}
                                            sx={{ textAlign: "start" }}
                                          >
                                            <div className="fs-14 text-black fw-bold pb-6">
                                              Add Tag Type
                                              <span className="text-red"></span>
                                            </div>
                                            <TextField
                                              hiddenLabel
                                              id="filled-hidden-label-small"
                                              placeholder="add tag"
                                              variant="filled"
                                              size="small"
                                              InputProps={{
                                                disableUnderline: true,
                                              }}
                                              fullWidth
                                              onKeyDown={gettagtypedata}
                                            />
                                          </Grid>

                                          <Grid
                                            item
                                            xs={7.5}
                                            sx={{ alignSelf: "end" }}
                                          >
                                            <Paper
                                              sx={{
                                                display: "flex",
                                                justifyContent: "start",
                                                flexWrap: "wrap",
                                                listStyle: "none",
                                                boxShadow: "none",
                                                p: 0,
                                                m: 0,
                                              }}
                                              component="ul"
                                            >
                                              {tagtypechipData.map((data) => {
                                                let icon;

                                                if (data.label === "React") {
                                                  icon = <TagFacesIcon />;
                                                }
                                                console.log(data);
                                                return (
                                                  <ListItem key={data.key}>
                                                    <Chip
                                                      icon={icon}
                                                      label={data.label}
                                                      onDelete={
                                                        data.label === "React"
                                                          ? undefined
                                                          : handletagDelete(
                                                              data
                                                            )
                                                      }
                                                    />
                                                  </ListItem>
                                                );
                                              })}
                                            </Paper>
                                          </Grid>
                                        </Grid>
                                      )}

                                    {callFeatureData &&
                                      callFeatureData[0]?._source?.max && (
                                        <Grid
                                          container
                                          spacing={2}
                                          className="pt-40"
                                        >
                                          <Grid item xs={0.5}></Grid>
                                          <>
                                            <Grid
                                              item
                                              xs={2.5}
                                              sx={{ textAlign: "start" }}
                                            >
                                              <div className="fs-14 text-black fw-bold pb-6">
                                                Min Value
                                                <span className="text-red"></span>
                                              </div>

                                              <TextField
                                                type="number"
                                                id="filled-hidden-label-normal"
                                                placeholder="min"
                                                fullWidth
                                                InputProps={{
                                                  disableUnderline: true,

                                                  // inputProps: {
                                                  //   max: 100, min: 0
                                                  // }
                                                }}
                                                value={min}
                                                onChange={(e) => {
                                                  var value = parseInt(
                                                    e.target.value,
                                                    10
                                                  );
                                                  console.log(value);
                                                  // if (value > max) value = max;
                                                  // if (value < min) value = min;
                                                  setValue("min", value);
                                                }}
                                                variant="filled"
                                              />
                                            </Grid>
                                            <Grid
                                              item
                                              xs={2.5}
                                              sx={{ textAlign: "start" }}
                                            >
                                              <div className="fs-14 text-black fw-bold pb-6">
                                                Max Value
                                                <span className="text-red"></span>
                                              </div>
                                              <TextField
                                                type="number"
                                                id="filled-hidden-label-normal"
                                                placeholder="max"
                                                fullWidth
                                                InputProps={{
                                                  disableUnderline: true,

                                                  // inputProps: {
                                                  //   max: 100, min: 0
                                                  // }
                                                }}
                                                value={max}
                                                onChange={(e) => {
                                                  var value = parseInt(
                                                    e.target.value,
                                                    10
                                                  );
                                                  // if (value > max) value = max;
                                                  // if (value < min) value = min;
                                                  setValue("max", value);
                                                }}
                                                variant="filled"
                                              />
                                            </Grid>
                                          </>

                                          <Grid
                                            item
                                            xs={3}
                                            sx={{ textAlign: "center" }}
                                          ></Grid>
                                        </Grid>
                                      )}
                                    {callFeatureData &&
                                      callFeatureData[0]?._source?.score && (
                                        <Grid
                                          container
                                          className="pt-40"
                                          spacing={2}
                                        >
                                          <Grid
                                            item
                                            xs={0.5}
                                            sm={0.5}
                                            md={0.5}
                                            lg={0.5}
                                          ></Grid>
                                          <Grid
                                            item
                                            xs={2}
                                            sm={2}
                                            md={2}
                                            lg={2}
                                            sx={{ textAlign: "start" }}
                                          >
                                            <div className="fs-14 text-black fw-bold pb-6">
                                              Score
                                              <span className="text-red"></span>
                                            </div>
                                            <TextField
                                              type="number"
                                              id="filled-hidden-label-normal"
                                              placeholder="score"
                                              fullWidth
                                              InputProps={{
                                                disableUnderline: true,

                                                inputProps: {
                                                  max: 100,
                                                  min: 0,
                                                },
                                              }}
                                              value={score}
                                              onChange={(e) => {
                                                var value = parseInt(
                                                  e.target.value,
                                                  10
                                                );
                                                if (value > max) value = max;
                                                if (value < min) value = min;
                                                setValue("score", value);
                                              }}
                                              variant="filled"
                                            />
                                          </Grid>
                                        </Grid>
                                      )}
                                    {callFeatureData &&
                                      callFeatureData[0]?._source?.keywords && (
                                        <Grid
                                          container
                                          className="pt-40"
                                          spacing={2}
                                        >
                                          <Grid
                                            item
                                            xs={1}
                                            sm={1}
                                            md={1}
                                            lg={1}
                                          ></Grid>
                                          <Grid
                                            item
                                            xs={3.5}
                                            sm={3.5}
                                            md={3.5}
                                            lg={3.5}
                                            sx={{ textAlign: "start" }}
                                          >
                                            <div className="fs-14 text-black fw-bold pb-6">
                                              Add Keyword
                                              <span className="text-red"></span>
                                            </div>
                                            <TextField
                                              hiddenLabel
                                              id="filled-hidden-label-small"
                                              placeholder="add keyword"
                                              variant="filled"
                                              size="small"
                                              InputProps={{
                                                disableUnderline: true,
                                              }}
                                              fullWidth
                                              onKeyDown={getdata}
                                            />
                                          </Grid>

                                          <Grid
                                            item
                                            xs={7.5}
                                            sx={{ alignSelf: "end" }}
                                          >
                                            <Paper
                                              sx={{
                                                display: "flex",
                                                justifyContent: "start",
                                                flexWrap: "wrap",
                                                listStyle: "none",
                                                boxShadow: "none",
                                                p: 0,
                                                m: 0,
                                              }}
                                              component="ul"
                                            >
                                              {chipData.map((data) => {
                                                let icon;

                                                if (data.label === "React") {
                                                  icon = <TagFacesIcon />;
                                                }
                                                console.log(data);
                                                return (
                                                  <ListItem key={data.key}>
                                                    <Chip
                                                      icon={icon}
                                                      label={data.label}
                                                      onDelete={
                                                        data.label === "React"
                                                          ? undefined
                                                          : handleDelete(data)
                                                      }
                                                    />
                                                  </ListItem>
                                                );
                                              })}
                                            </Paper>
                                          </Grid>
                                        </Grid>
                                      )}
                                  </Grid>
                                {/* </Box>{" "} */}
                              </>
                            );
                          }
                        })}
                    </Grid>
                    {isEdit && (
                      <Box
                        sx={{
                          padding: "8px",
                        }}
                      >
                        {/* <Grid container spacing={2} >
                                <Grid item xs={.5}></Grid>
                                <Grid item xs={6}>
                                  {callFeatureListdata?.Agent && callFeatureListdata?.Agent?.map((item) => {
                                    return (<> {selectedIndex === item.id && <Typography variant="h5" gutterBottom component="div" disableTypography={true} sx={{ textAlign: "start", color: "#001B34", fontWeight: 600, }}>
                                      {item?.Sub_category}
                                    </Typography>}</>)
                                  })}
                                  {callFeatureListdata?.Customer && callFeatureListdata?.Customer?.map((item) => {
                                    return (<> {selectedIndex === item.id && <Typography variant="h5" gutterBottom component="div" disableTypography={true} sx={{ textAlign: "start", color: "#001B34", fontWeight: 600, }}>
                                      {item?.Sub_category}
                                    </Typography>}</>)
                                  })}


                                </Grid>
                                <Grid item xs={5} sx={{ alignSelf: "center", display: "flex", justifyContent: "end" }}>
                                  <Button variant="contained" size='small' onClick={onEdit}>Save</Button>
                                </Grid>

                              </Grid> */}

                        {editrecord && editrecord?._source?.text && (
                          <Grid container className="pt-40">
                            <Grid item xs={0.5}></Grid>
                            <Grid item xs={8} sx={{ textAlign: "start" }}>
                              <div className="fs-14 text-black fw-bold pb-6">
                                Text<span className="text-red"></span>
                              </div>
                              <TextField
                                id="filled-multiline-static"
                                InputProps={{
                                  disableUnderline: true,
                                }}
                                multiline
                                rows={2}
                                onChange={(e) =>
                                  setValue("text", e.target.value)
                                }
                                value={text}
                                fullWidth
                                variant="filled"
                              />
                            </Grid>
                          </Grid>
                        )}
                        {editrecord && editrecord?._source?.tag_list && (
                          <Grid container className="pt-40" spacing={2}>
                            <Grid
                              item
                              xs={0.5}
                              sm={0.5}
                              md={0.5}
                              lg={0.5}
                            ></Grid>
                            <Grid
                              item
                              xs={3.5}
                              sm={3.5}
                              md={3.5}
                              lg={3.5}
                              sx={{ textAlign: "start" }}
                            >
                              <div className="fs-14 text-black fw-bold pb-6">
                                Add Tag<span className="text-red"></span>
                              </div>
                              <TextField
                                hiddenLabel
                                id="filled-hidden-label-small"
                                placeholder="add tag"
                                variant="filled"
                                size="small"
                                InputProps={{
                                  disableUnderline: true,
                                }}
                                fullWidth
                                onKeyDown={gettaglistdata}
                              />
                            </Grid>

                            <Grid item xs={7.5} sx={{ alignSelf: "end" }}>
                              <Paper
                                sx={{
                                  display: "flex",
                                  justifyContent: "start",
                                  flexWrap: "wrap",
                                  listStyle: "none",
                                  boxShadow: "none",
                                  p: 0,
                                  m: 0,
                                }}
                                component="ul"
                              >
                                {tagchipData.map((data) => {
                                  let icon;

                                  if (data.label === "React") {
                                    icon = <TagFacesIcon />;
                                  }
                                  console.log(data);
                                  return (
                                    <ListItem key={data.key}>
                                      <Chip
                                        icon={icon}
                                        label={data.label}
                                        onDelete={
                                          data.label === "React"
                                            ? undefined
                                            : handletagDelete(data)
                                        }
                                      />
                                    </ListItem>
                                  );
                                })}
                              </Paper>
                            </Grid>
                          </Grid>
                        )}
                        {editrecord && editrecord?._source?.tag_type && (
                          <Grid container className="pt-40" spacing={2}>
                            <Grid
                              item
                              xs={0.5}
                              sm={0.5}
                              md={0.5}
                              lg={0.5}
                            ></Grid>
                            <Grid
                              item
                              xs={3.5}
                              sm={3.5}
                              md={3.5}
                              lg={3.5}
                              sx={{ textAlign: "start" }}
                            >
                              <div className="fs-14 text-black fw-bold pb-6">
                                Add Tag Type<span className="text-red"></span>
                              </div>
                              <TextField
                                hiddenLabel
                                id="filled-hidden-label-small"
                                placeholder="add tag"
                                variant="filled"
                                size="small"
                                InputProps={{
                                  disableUnderline: true,
                                }}
                                fullWidth
                                onKeyDown={gettagtypedata}
                              />
                            </Grid>

                            <Grid item xs={7.5} sx={{ alignSelf: "end" }}>
                              <Paper
                                sx={{
                                  display: "flex",
                                  justifyContent: "start",
                                  flexWrap: "wrap",
                                  listStyle: "none",
                                  boxShadow: "none",
                                  p: 0,
                                  m: 0,
                                }}
                                component="ul"
                              >
                                {tagtypechipData.map((data) => {
                                  let icon;

                                  if (data.label === "React") {
                                    icon = <TagFacesIcon />;
                                  }
                                  console.log(data);
                                  return (
                                    <ListItem key={data.key}>
                                      <Chip
                                        icon={icon}
                                        label={data.label}
                                        onDelete={
                                          data.label === "React"
                                            ? undefined
                                            : handletagDelete(data)
                                        }
                                      />
                                    </ListItem>
                                  );
                                })}
                              </Paper>
                            </Grid>
                          </Grid>
                        )}

                        {editrecord && editrecord?._source?.max && (
                          <Grid container spacing={2} className="pt-40">
                            <Grid item xs={0.5}></Grid>
                            <>
                              <Grid item xs={2.5} sx={{ textAlign: "start" }}>
                                <div className="fs-14 text-black fw-bold pb-6">
                                  Min Value<span className="text-red"></span>
                                </div>

                                <TextField
                                  type="number"
                                  id="filled-hidden-label-normal"
                                  placeholder="min"
                                  fullWidth
                                  InputProps={{
                                    disableUnderline: true,

                                    // inputProps: {
                                    //   max: 100, min: 0
                                    // }
                                  }}
                                  value={min}
                                  onChange={(e) => {
                                    var value = parseInt(e.target.value, 10);
                                    console.log(value);
                                    // if (value > max) value = max;
                                    // if (value < min) value = min;
                                    setValue("min", value);
                                  }}
                                  variant="filled"
                                />
                              </Grid>
                              <Grid item xs={2.5} sx={{ textAlign: "start" }}>
                                <div className="fs-14 text-black fw-bold pb-6">
                                  Max Value<span className="text-red"></span>
                                </div>
                                <TextField
                                  type="number"
                                  id="filled-hidden-label-normal"
                                  placeholder="max"
                                  fullWidth
                                  InputProps={{
                                    disableUnderline: true,

                                    // inputProps: {
                                    //   max: 100, min: 0
                                    // }
                                  }}
                                  value={max}
                                  onChange={(e) => {
                                    var value = parseInt(e.target.value, 10);
                                    // if (value > max) value = max;
                                    // if (value < min) value = min;
                                    setValue("max", value);
                                  }}
                                  variant="filled"
                                />
                              </Grid>
                            </>

                            <Grid
                              item
                              xs={3}
                              sx={{ textAlign: "center" }}
                            ></Grid>
                          </Grid>
                        )}
                        {editrecord && editrecord?._source?.score && (
                          <Grid container className="pt-40" spacing={2}>
                            <Grid
                              item
                              xs={0.5}
                              sm={0.5}
                              md={0.5}
                              lg={0.5}
                            ></Grid>
                            <Grid
                              item
                              xs={2}
                              sm={2}
                              md={2}
                              lg={2}
                              sx={{ textAlign: "start" }}
                            >
                              <div className="fs-14 text-black fw-bold pb-6">
                                Score<span className="text-red"></span>
                              </div>
                              <TextField
                                type="number"
                                id="filled-hidden-label-normal"
                                placeholder="score"
                                fullWidth
                                InputProps={{
                                  disableUnderline: true,

                                  inputProps: {
                                    max: 100,
                                    min: 0,
                                  },
                                }}
                                value={score}
                                onChange={(e) => {
                                  var value = parseInt(e.target.value, 10);
                                  if (value > max) value = max;
                                  if (value < min) value = min;
                                  setValue("score", value);
                                }}
                                variant="filled"
                              />
                            </Grid>
                          </Grid>
                        )}
                        {editrecord && editrecord?._source?.keywords && (
                          <Grid container className="pt-40" spacing={2}>
                            <Grid
                              item
                              xs={0.5}
                              sm={0.5}
                              md={0.5}
                              lg={0.5}
                            ></Grid>
                            <Grid
                              item
                              xs={3.5}
                              sm={3.5}
                              md={3.5}
                              lg={3.5}
                              sx={{ textAlign: "start" }}
                            >
                              <div className="fs-14 text-black fw-bold pb-6">
                                Add Keyword<span className="text-red"></span>
                              </div>
                              <TextField
                                hiddenLabel
                                id="filled-hidden-label-small"
                                placeholder="add keyword"
                                variant="filled"
                                size="small"
                                InputProps={{
                                  disableUnderline: true,
                                }}
                                fullWidth
                                onKeyDown={getdata}
                              />
                            </Grid>

                            <Grid item xs={7.5} sx={{ alignSelf: "end" }}>
                              <Paper
                                sx={{
                                  display: "flex",
                                  justifyContent: "start",
                                  flexWrap: "wrap",
                                  listStyle: "none",
                                  boxShadow: "none",
                                  p: 0,
                                  m: 0,
                                }}
                                component="ul"
                              >
                                {chipData.map((data) => {
                                  let icon;

                                  if (data.label === "React") {
                                    icon = <TagFacesIcon />;
                                  }
                                  console.log(data);
                                  return (
                                    <ListItem key={data.key}>
                                      <Chip
                                        icon={icon}
                                        label={data.label}
                                        onDelete={
                                          data.label === "React"
                                            ? undefined
                                            : handleDelete(data)
                                        }
                                      />
                                    </ListItem>
                                  );
                                })}
                              </Paper>
                            </Grid>
                          </Grid>
                        )}
                      </Box>
                    )}
                  </Grid>
                </Grid>
              </TabPanel>
              <TabPanel value={1} className="pt-32">
                <Grid item container sx={{ p: "8px !important" }}>
                  <Grid item xs={3.5} lg={3.5} md={3.5}>
                    <List
                      component="nav"
                      aria-label="main mailbox folders"
                      sx={{
                        borderRight: "2px solid lightgray",
                        height: "668px",
                        overflow: "auto",
                        minWidth: "280px",
                        pt: 0,
                      }}
                    >
                      {callFeatureListdata?.Customer &&
                        callFeatureListdata?.Customer?.map((item) => {
                          return (
                            <ListItemButton
                              selected={selectedIndex === item.id}
                              onClick={(event) =>
                                handleListItemClick(event, item.id, item)
                              }
                            >
                              <ListItemText
                                disableTypography
                                primary={
                                  <Typography
                                    type="body2"
                                    style={{
                                      fontSize: "1rem",
                                      color: "#001B34",
                                      fontWeight: 600,
                                    }}
                                  >
                                    {item?.Sub_category}
                                  </Typography>
                                }
                              />
                            </ListItemButton>
                          );
                        })}
                    </List>
                  </Grid>
                  <Grid item xs={8.5} lg={8.5} md={8.5} sx={{ pt: 1 }}>
                    <Box
                      sx={{
                        padding: "8px",
                      }}
                    >
                      <Grid container spacing={2}>
                        <Grid item xs={0.5}></Grid>
                        <Grid item xs={6}>
                          {callFeatureListdata?.Agent &&
                            callFeatureListdata?.Agent?.map((item) => {
                              return (
                                <>
                                  {" "}
                                  {selectedIndex === item.id && (
                                    <Typography
                                      variant="h5"
                                      gutterBottom
                                      component="div"
                                      disableTypography={true}
                                      sx={{
                                        textAlign: "start",
                                        color: "#001B34",
                                        fontWeight: 600,
                                      }}
                                    >
                                      {item?.Sub_category}
                                    </Typography>
                                  )}
                                </>
                              );
                            })}
                          {callFeatureListdata?.Customer &&
                            callFeatureListdata?.Customer?.map((item) => {
                              return (
                                <>
                                  {" "}
                                  {selectedIndex === item.id && (
                                    <Typography
                                      variant="h5"
                                      gutterBottom
                                      component="div"
                                      disableTypography={true}
                                      sx={{
                                        textAlign: "start",
                                        color: "#001B34",
                                        fontWeight: 600,
                                      }}
                                    >
                                      {item?.Sub_category}
                                    </Typography>
                                  )}
                                </>
                              );
                            })}
                        </Grid>
                        <Grid
                          item
                          xs={5}
                          sx={{
                            alignSelf: "center",
                            display: "flex",
                            justifyContent: "end",
                          }}
                        >
                          <Button
                            variant="contained"
                            size="small"
                            onClick={onEdit}
                          >
                            Save
                          </Button>
                        </Grid>
                      </Grid>

                      {callFeatureData && callFeatureData[0]?._source?.text && (
                        <Grid container className="pt-40">
                          <Grid item xs={0.5}></Grid>
                          <Grid item xs={8} sx={{ textAlign: "start" }}>
                            <div className="fs-14 text-black fw-bold pb-6">
                              Text<span className="text-red"></span>
                            </div>
                            <TextField
                              id="filled-multiline-static"
                              InputProps={{
                                disableUnderline: true,
                              }}
                              multiline
                              rows={2}
                              onChange={(e) => setValue("text", e.target.value)}
                              value={text}
                              fullWidth
                              variant="filled"
                            />
                          </Grid>
                        </Grid>
                      )}
                      {callFeatureData && callFeatureData[0]?._source?.max && (
                        <Grid container spacing={2} className="pt-40">
                          <Grid item xs={0.5}></Grid>
                          <>
                            <Grid item xs={2.5} sx={{ textAlign: "start" }}>
                              <div className="fs-14 text-black fw-bold pb-6">
                                Min Value<span className="text-red"></span>
                              </div>

                              <TextField
                                type="number"
                                id="filled-hidden-label-normal"
                                placeholder="min"
                                fullWidth
                                InputProps={{
                                  disableUnderline: true,
                                }}
                                value={min}
                                onChange={(e) => {
                                  var value = parseInt(e.target.value, 10);

                                  setValue("min", value);
                                }}
                                variant="filled"
                              />
                            </Grid>
                            <Grid item xs={2.5} sx={{ textAlign: "start" }}>
                              <div className="fs-14 text-black fw-bold pb-6">
                                Max Value<span className="text-red"></span>
                              </div>
                              <TextField
                                type="number"
                                id="filled-hidden-label-normal"
                                placeholder="max"
                                fullWidth
                                InputProps={{
                                  disableUnderline: true,
                                }}
                                value={max}
                                onChange={(e) => {
                                  var value = parseInt(e.target.value, 10);

                                  setValue("max", value);
                                }}
                                variant="filled"
                              />
                            </Grid>
                          </>

                          <Grid item xs={3} sx={{ textAlign: "center" }}></Grid>
                        </Grid>
                      )}
                      {callFeatureData && callFeatureData[0]?._source?.score && (
                        <Grid container className="pt-40" spacing={2}>
                          <Grid item xs={0.5} sm={0.5} md={0.5} lg={0.5}></Grid>
                          <Grid
                            item
                            xs={2}
                            sm={2}
                            md={2}
                            lg={2}
                            sx={{ textAlign: "start" }}
                          >
                            <div className="fs-14 text-black fw-bold pb-6">
                              Score<span className="text-red"></span>
                            </div>
                            <TextField
                              type="number"
                              id="filled-hidden-label-normal"
                              placeholder="score"
                              fullWidth
                              InputProps={{
                                disableUnderline: true,

                                inputProps: {
                                  max: 100,
                                  min: 0,
                                },
                              }}
                              value={score}
                              onChange={(e) => {
                                var value = parseInt(e.target.value, 10);
                                if (value > max) value = max;
                                if (value < min) value = min;
                                setValue("score", value);
                              }}
                              variant="filled"
                            />
                          </Grid>
                        </Grid>
                      )}
                      {callFeatureData &&
                        callFeatureData[0]?._source?.keywords && (
                          <Grid container className="pt-40" spacing={2}>
                            <Grid
                              item
                              xs={0.5}
                              sm={0.5}
                              md={0.5}
                              lg={0.5}
                            ></Grid>
                            <Grid
                              item
                              xs={3.5}
                              sm={3.5}
                              md={3.5}
                              lg={3.5}
                              sx={{ textAlign: "start" }}
                            >
                              <div className="fs-14 text-black fw-bold pb-6">
                                Add Keyword<span className="text-red"></span>
                              </div>
                              <TextField
                                hiddenLabel
                                id="filled-hidden-label-small"
                                placeholder="add keyword"
                                variant="filled"
                                size="small"
                                InputProps={{
                                  disableUnderline: true,
                                }}
                                fullWidth
                                onKeyDown={getdata}
                              />
                            </Grid>

                            <Grid item xs={7.5} sx={{ alignSelf: "end" }}>
                              <Paper
                                sx={{
                                  display: "flex",
                                  justifyContent: "start",
                                  flexWrap: "wrap",
                                  listStyle: "none",
                                  boxShadow: "none",
                                  p: 0,
                                  m: 0,
                                }}
                                component="ul"
                              >
                                {chipData.map((data) => {
                                  let icon;

                                  if (data.label === "React") {
                                    icon = <TagFacesIcon />;
                                  }
                                  console.log(data);
                                  return (
                                    <ListItem key={data.key}>
                                      <Chip
                                        icon={icon}
                                        label={data.label}
                                        onDelete={
                                          data.label === "React"
                                            ? undefined
                                            : handleDelete(data)
                                        }
                                      />
                                    </ListItem>
                                  );
                                })}
                              </Paper>
                            </Grid>
                          </Grid>
                        )}
                    </Box>
                  </Grid>
                </Grid>
              </TabPanel>
            </TabsUnstyled>
          </Grid>
        </Item>
      </Box>
    </>
  );
};

export default SopConfigurationTab;

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
      border: "1px solid lightgray",
      backgroundColor: "#FFFFFF",
      color: "#667685",
      height: "36px",
      fontWeight: "normal",
      fontSize: ".825rem",
      lineHeight: "20px",
      borderRadius: "10px",

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
  })
);
