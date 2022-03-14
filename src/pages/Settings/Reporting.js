import React, { useEffect } from 'react';
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
import { styled } from '@mui/material/styles';
import { DataGrid, GridApi, useGridApiRef } from '@mui/x-data-grid';
import TabsUnstyled from "@mui/base/TabsUnstyled";
import Divider from '@mui/material/Divider';
import TabsListUnstyled from "@mui/base/TabsListUnstyled";
import TabPanelUnstyled from "@mui/base/TabPanelUnstyled";
import { buttonUnstyledClasses } from "@mui/base/ButtonUnstyled";
import TabUnstyled, { tabUnstyledClasses } from "@mui/base/TabUnstyled";
import TextField from '@mui/material/TextField';
import Alert from "@mui/material/Alert";
import { createStyles, makeStyles } from "@mui/styles";
import { useForm } from "react-hook-form";
import { getcustomertabledata, gettabledata, updatecustomertabledata, updatetabledata } from '../../actions';
import Tabs from '@mui/material/Tabs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const min = 1;
const max = 100;



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

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const defaultValues = {
  weightage: "",
  call_opning: "",
  cus_varification: "", on_hold: "", call_ref: "", call_closure: "", active_listening: "", paraphrasing: "", probing: "", calladditionalinfo: "", callalternatechannel: "", rateofspeech: "", responsiveness: "", clarity: "", call_start_sentiment: "", call_end_sentiment: "", overall_call_sentiment: "", overtalk_incidents: "", silence_incidents: ""

};

const Reporting = () => {
  const toastId = React.useRef(null);
  const notify = (item) => toastId.current = toast(item, { autoClose: 800 });
  const columns = [
    { field: 'Sub_category', headerName: 'call opening', headerAlign: "center", width: 400 },
    {
      field: 'weightage', headerName: 'score', editable: true, headerAlign: "center", width: 500, disableClickEventBubbling: true,
      valueFormatter: (params) => {
        const valueFormatted = Number(params.value).toLocaleString();
        return `${valueFormatted} %`;
      },
      // renderCell: (params) => {
      //         // console.log(params);

      //         return (
      //           <>

      //             <span className="ml-8" onChange={getupdatedvalue(params.row)}> {params.row.weightage}%</span>
      //           </>
      //         );
      //       },
    },
  ]
  const [minvalue, setMinValue] = React.useState();
  const [values, setValues] = React.useState(0);
  const [agentreportingdata, setAgentreportingdata] = React.useState();
  const [customerreportingdata, setCustomerReportingdata] = React.useState();
  const [updatedlists, setUpdatedlists] = React.useState([]);
  const [isError, setIsError] = React.useState(false);
  const [isErrormsg, setIsErrorMsg] = React.useState("");
  const [row, setRow] = React.useState();
  const { setValue, watch, register, handleSubmit, formState: { errors } } = useForm();
  const classes = useStyles();
  // const { register2, handleSubmit2, watch2, errors2, setError2, control2 } = useForm()
  const {
    weightage,
    call_opning,
    customer_verification, on_hold, call_refreshment, call_closures, active_listening, paraphrasing, probing, call_additional_info, call_alternate_channel, rate_of_speech, responsiveness, clarity, call_start_sentiment, call_end_sentiment, overall_call_sentiment, overtalk_incidents, silence_incidents
  } = watch();
  const onSubmit = async (data) => {

    // let selectedValue = null;
    // const bodyFormData = new FormData();
    // Object.keys(data).forEach((key,index) => {
    //   if (key.includes("type")) {
    //      const text = key.replace("type:", "")
    //     const obj={[text]:data[key]}
    //     const obj1 ={...obj}
    //      console.log(text,data[key])
        //  bodyFormData.append(text,data[key]);
        //  console.log(bodyFormData)
    //   }
    // });
    // console.log(selectedKeys)
    if (data) {
      const response = await updatetabledata(data);
        console.log(response)
        notify(response?.data?.message)
      console.log(data)
      // console.log(values)
      // if (values ===0) {
      
      //   if (response?.data?.message) {
      //   }
      // } else {
      //   const response = await updatecustomertabledata(data);
      //   notify(response?.data?.message)
      //   console.log(response)
      // }

      // if (response.success) {
      //   setIsError(response.data.error)
      //   if (response.data.error) {
      //     setIsErrorMsg(response.data.message)
      //     console.log(response.data.message)
      //   } else {
      //     getagentdata();
      //     console.log(response)
      //   }
      // } else {
      // }
      console.log(data)
    }
  }
  const onSubmits = async (data) => {
    const response = await updatecustomertabledata(data);
    notify(response?.data?.message)
    console.log(response)
  }

  const apiRef = useGridApiRef();


  useEffect(() => {
    getagentdata();
  }, []);

  const getagentdata = async () => {
    const response = await gettabledata();
   

    if (response.success) {
      setAgentreportingdata(response?.data?.data?.Agent)
      // setValue("call_opning",response?.data?.data?.Agent[0]?.weightage)
      // setValue("customer_verification",response?.data?.data?.Agent[1]?.weightage)
      // setValue("on_hold",response?.data?.data?.Agent[2]?.weightage)
      // setValue("call_refreshment",response?.data?.data?.Agent[3]?.weightage)
      // setValue("call_closures",response?.data?.data?.Agent[4]?.weightage)
      // setValue("active_listening",response?.data?.data?.Agent[5]?.weightage)
      // setValue("paraphrasing",response?.data?.data?.Agent[6]?.weightage)
      // setValue("probing",response?.data?.data?.Agent[7]?.weightage)
      // setValue("call_additional_info",response?.data?.data?.Agent[8]?.weightage)
      // setValue("call_alternate_channel",response?.data?.data?.Agent[9]?.weightage)
      // setValue("responsiveness",response?.data?.data?.Agent[10]?.weightage)
      // setValue("clarity",response?.data?.data?.Agent[11]?.weightage)
      // setValue("call_start_sentiment",response?.data?.data?.Agent[12]?.weightage)
      // setValue("call_end_sentiment",response?.data?.data?.Agent[13]?.weightage)
      // setValue("overall_call_sentiment",response?.data?.data?.Agent[14]?.weightage)
      // setValue("overtalk_incidents",response?.data?.data?.Agent[15]?.weightage)
      // setValue("call_opning",response?.data?.data?.Agent[16]?.weightage)
      // setValue("silence_incidents",response?.data?.data?.Agent[17]?.weightage)



    }
    const res = await getcustomertabledata(); 
    if(res.success){
      setCustomerReportingdata(res?.data?.data?.Customer)
    }
    console.log(res)
    console.log(response)
  }
  console.log(customerreportingdata)

  const getupdatedvalue = (e) => {
    let updatedlist = [];

    // console.log(e)

    //   agentreportingdata.map((item) => {

    //     if (e.weightage !== item.weightage && e.Sub_category === item.Sub_category) {
    //       setUpdatedlists([...updatedlists,e])

    // setUpdatedlists()
    // setUpdatedlists(...updatedlist)
    //   }

    // })

    console.log(updatedlists)
    // console.log(updatedlist)
    // setUpdatedlists(updatedlist)

    // if (e.keyCode === 13) {
    //   console.log(e)
    // }
  }

  const handleOnRowClick = React.useCallback(async (params, details, event) => {
    // const row = apiRef.current.getRow(params.id);
    setIsError(false)
    console.log(params.row)

    setRow(params.row)
    console.log(params, details, event)
  })

  const handleCellEditCommit = React.useCallback(async (params, details, event) => {
    // const row = apiRef.current.getRow(params.id);

    console.log(params)
    const data = { ...row, weightage: params.value }
    console.log(data)
    setUpdatedlists([...updatedlists, { ...row, weightage: JSON.parse(params.value) }])
    console.log(params, details, event)
  })
  // console.log(updatedlists)
  const onEdit = async () => {
    if (updatedlists) {
      const response = await updatetabledata(updatedlists);
      if (response.success) {
        setIsError(response.data.error)
        if (response.data.error) {
          setIsErrorMsg(response.data.message)
          console.log(response.data.message)
        } else {
          getagentdata();
          console.log(response)
        }
        // setAgentreportingdata(response?.data?.data?.Agent)
        // setCustomerReportingdata(response?.data?.data?.Customer
      } else {
        console.log(response)
      }
    }
    // console.log(agentreportingdata)
    // console.log("edit:::")
  }

  const handleChange = (event, newValue) => {
    setValues(newValue)
    console.log(newValue)
  };

  const onReset = () => {
    setUpdatedlists([])
    setIsError(false)
    getagentdata();
  }
  return <div>
     <ToastContainer />
     <Box className='ml-20 mt-20'>
        <Item>
    <Grid container className="pt-40 pb-16" spacing={2}>
      <Grid item xs={.5}>

      </Grid>
      <Grid item xs={11}>
        <Grid item xs={12} spacing={2}>
          {isError && (
            <>
              <Alert className="mb-50" severity="error">
                {isErrormsg}
              </Alert>
            </>
          )}
        </Grid>
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
                    <Tab>Agent</Tab>
                    <Tab>Customer</Tab>

                  </TabsList>
                </Grid>
              </Divider>

            </Grid>
            {/* <Grid item  >
              <Divider orientation="horizontal" flexItem>
                <Grid
                  container
                  direction="row"
                  alignItems="flex-start"
                  justifyContent="flex-end"
                >

                </Grid>
              </Divider>

            </Grid> */}


            {/* <Grid container item >
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

              </Grid>
            </Grid> */}
          </Grid>



          <TabPanel value={0} className="pt-32">
            <Grid container className='justify-content-flex-end pb-16' spacing={2}>
              <Button variant="contained" size='small' className='mr-8' onClick={onReset}>Reset</Button>
              <Button variant="contained" size='small' onClick={handleSubmit(onSubmit)}>Save</Button>
            </Grid>

            <Grid container spacing={2}>

              <Grid item xs={6}>
                <Item>
                  <Grid container spacing={2} className="p-10" >
                    <Grid item xs={5} sx={{ textAlign: "start" }}>
                      <Typography variant="h6" gutterBottom className='fw-600 fs-16' component="div">
                        Feature
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography variant="h6" gutterBottom className='fw-600 fs-16' component="div">

                        Weightage
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography variant="h6" gutterBottom className='fw-600 fs-16' component="div">
                        type
                      </Typography>
                    </Grid>
                  </Grid>
                  {
                    agentreportingdata && agentreportingdata.map((item, index) => {
                      // console.log(item)
                      // console.log(item.id)
                      if (index <= 8) {
                        return (
                          <>
                            <Grid container spacing={2} className="p-10">
                              <Grid item xs={6} sx={{ textAlign: "start" }}>
                                <Typography variant="subtitle1" gutterBottom component="div">
                                  {item?.Sub_category}
                                </Typography>
                              </Grid>
                              <Grid item xs={2}>
                                <TextField
                                  // type="number"

                                  id="filled-hidden-label-normal"
                                  placeholder="weightage"
                                  fullWidth
                                  // {...register(`weightage.${item?.id.toString()}`)}

                                  {...register(item?.id.toString())}
                                  InputProps={{

                                    disableUnderline: true,

                                    // inputProps: {
                                    //   max: 100, min: 0
                                    // }
                                  }}
                                  defaultValue={item?.weightage}
                                  // value={item?.weightage}
                                  // onChange={(e) => {
                                  //   console.log("on change",e.target.value)
                                  //   item.weightage=e.target.value

                                  // }}
                                  variant="filled"
                                />
                              </Grid>
                              <Grid item xs={2}>
                                <Select
                                  defaultValue={item?.type}
                                  // value={lobvalue}
                                  sx={{ width: "117px" }}
                                  // onChange={handleChangelob}
                                  // {...register(item?.id.toString())}
                                  {...register(`type${item?.id.toString()}`)}
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
                                    value="2"
                                  >
                                    Non Critical
                                  </MenuItem>
                                  <MenuItem
                                    className={classes.MenuItem}
                                    sx={{ pr: "0px", width: "100%" }}
                                    value="1"
                                  >
                                    Critical
                                  </MenuItem>
                                  <MenuItem
                                    className={classes.MenuItem}
                                    sx={{ pr: "0px", width: "100%" }}
                                    value=""
                                  >
                                    select type
                                  </MenuItem>
                                </Select>
                              </Grid>
                            </Grid>
                          </>
                        )
                      }
                    })
                  }
                </Item>
              </Grid>
              <Grid item xs={6}>
                <Item>
                  <Grid container spacing={2} className="p-10" >
                  <Grid item xs={5} sx={{ textAlign: "start" }}>
                      <Typography variant="h6" gutterBottom className='fw-600 fs-16' component="div">
                        Feature
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography variant="h6" gutterBottom className='fw-600 fs-16' component="div">

                        Weightage
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography variant="h6" gutterBottom className='fw-600 fs-16' component="div">
                        type
                      </Typography>
                    </Grid>
                  </Grid>
                  {
                    agentreportingdata && agentreportingdata.map((item, index) => {
                      // console.log(item)

                      if (index > 8) {
                        return (
                          <>
                            <Grid container spacing={2} className="p-10">
                              <Grid item xs={6} sx={{ textAlign: "start" }}>
                                <Typography variant="subtitle1" gutterBottom component="div">
                                  {item?.Sub_category}
                                </Typography>
                              </Grid>
                              <Grid item xs={2}>
                                <TextField
                                  // type="number"

                                  id="filled-hidden-label-normal"
                                  placeholder="weightage"
                                  fullWidth
                                  // {...register(`weightage.${item?.id.toString()}`)}
                                  {...register(item?.id.toString())}
                                  InputProps={{

                                    disableUnderline: true,

                                    // inputProps: {
                                    //   max: 100, min: 0
                                    // }
                                  }}
                                  defaultValue={item?.weightage}
                                  // value={item?.weightage}
                                  // onChange={(e) => {
                                  //   console.log("on change",e.target.value)
                                  //   item.weightage=e.target.value

                                  // }}
                                  variant="filled"
                                />
                              </Grid>
                              <Grid item xs={2}>
                                <Select
                                  defaultValue={item?.type}
                                  // value={lobvalue}
                                  sx={{ width: "117px" }}
                                  // {...register(item?.id.toString())}
                                  {...register(`type${item?.id.toString()}`)}
                                  // onChange={handleChangelob}
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
                                    value="2"
                                  >
                                    Non Critical
                                  </MenuItem>
                                  <MenuItem
                                    className={classes.MenuItem}
                                    sx={{ pr: "0px", width: "100%" }}
                                    value="1"
                                  >
                                    Critical
                                  </MenuItem>
                                  <MenuItem
                                    className={classes.MenuItem}
                                    sx={{ pr: "0px", width: "100%" }}
                                    value=""
                                  >
                                    select type
                                  </MenuItem>
                                  {/* <MenuItem
                                    className={classes.MenuItem}
                                    sx={{ pr: "0px", width: "100%" }}
                                    value=""
                                  >select type</MenuItem> */}
                                </Select>
                              </Grid>
                            </Grid>
                          </>
                        )
                      }
                    })
                  }</Item>
              </Grid>

            </Grid>
            {/* <div style={{ height: 400, width: "100%" }}>
              <DataGrid rows={agentreportingdata} autoHeight  columns={columns} apiRef={apiRef} onRowClick={handleOnRowClick} onCellEditCommit={handleCellEditCommit}
              />
            </div> */}
          </TabPanel>
          <TabPanel value={1} className="pt-32">
            <Grid container className='justify-content-flex-end pb-16' spacing={2}>
              <Button variant="contained" size='small' className='mr-8' onClick={onReset}>Reset</Button>
              <Button variant="contained" size='small' onClick={handleSubmit
                (onSubmits)}>Save</Button>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={9}>
                <Item>
                  <Grid container spacing={2} className="p-10" >
                  <Grid item xs={5} sx={{ textAlign: "start" }}>
                      <Typography variant="h6" gutterBottom className='fw-600 fs-16' component="div">
                        Feature
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography variant="h6" gutterBottom className='fw-600 fs-16' component="div">

                        Weightage
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography variant="h6" gutterBottom className='fw-600 fs-16' component="div">
                        type
                      </Typography>
                    </Grid>
                  
                
                  </Grid>
                  {
                    customerreportingdata && customerreportingdata.map((item, index) => {
                      console.log(item)
                      if (index <= 8) {
                        return (
                          <>
                            <Grid container spacing={2} className="p-10">
                              <Grid item xs={6} sx={{ textAlign: "start" }}>
                                <Typography variant="subtitle1" gutterBottom component="div">
                                  {item?.Sub_category}
                                </Typography>
                              </Grid>
                              <Grid item xs={2}>
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
                                  {...register(`customer${item?.id.toString()}`)}
                                  defaultValue={item?.weightage}
                                  // value={item?.weightage}
                                  // onChange={(e) => {
                                  //   var value = parseInt(
                                  //     e.target.value,
                                  //     10
                                  //   );
                                  //   if (value > max) value = max;
                                  //   if (value < min) value = min;
                                  //   setValue("weightage", value);
                                  // }}
                                  variant="filled"
                                />
                              </Grid>
                              <Grid item xs={4}>
                                <Select
                                  defaultValue={item?.type}
                                  // value={lobvalue}
                                  sx={{ width: "117px" }}
                                  // {...register(item?.id.toString())}
                                  {...register(`customertype${item?.id.toString()}`)}
                                  // onChange={handleChangelob}
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
                                    value="2"
                                  >
                                    Non Critical
                                  </MenuItem>
                                  <MenuItem
                                    className={classes.MenuItem}
                                    sx={{ pr: "0px", width: "100%" }}
                                    value="1"
                                  >
                                    Critical
                                  </MenuItem>
                                  <MenuItem
                                    className={classes.MenuItem}
                                    sx={{ pr: "0px", width: "100%" }}
                                    value=""
                                  >
                                    select type
                                  </MenuItem>
                                  {/* <MenuItem
                                    className={classes.MenuItem}
                                    sx={{ pr: "0px", width: "100%" }}
                                    value=""
                                  >select type</MenuItem> */}
                                </Select>
                              </Grid>
                            </Grid>
                          </>
                        )
                      }
                    })
                  }
                </Item>
              </Grid>
              {/* <Grid item xs={6}>
                <Item>
                  <Grid container spacing={2} className="p-10" >
                    <Grid item xs={8} sx={{ textAlign: "start" }}>
                      <Typography variant="h6" gutterBottom component="div">
                        Feature
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography variant="h6" gutterBottom component="div">

                        Weightage
                      </Typography>
                    </Grid>
                  </Grid>
                  {
                    customerreportingdata && customerreportingdata.map((item, index) => {
                      // console.log(item)
                      if (index > 8) {
                        return (
                          <>
                            <Grid container spacing={2} className="p-10">
                              <Grid item xs={8} sx={{ textAlign: "start" }}>
                                <Typography variant="h6" gutterBottom component="div">
                                  {item?.Sub_category}
                                </Typography>
                              </Grid>
                              <Grid item xs={4}>
                                <TextField
                                  type="number"

                                  id="filled-hidden-label-normal"
                                  placeholder="min"
                                  fullWidth
                                  InputProps={{

                                    disableUnderline: true,

                                    inputProps: {
                                      max: 100, min: 0
                                    }
                                  }}
                                  value={item?.weightage}
                                  onChange={(e) => {
                                    var value = parseInt(
                                      e.target.value,
                                      10
                                    );
                                    if (value > max) value = max;
                                    if (value < min) value = min;
                                    setValue("weightage", value);
                                  }}
                                  variant="filled"
                                />
                              </Grid>
                            </Grid>
                          </>
                        )
                      }
                    })
                  }</Item>
              </Grid> */}

            </Grid>
            {/* <div style={{ height: 400, width: "100%" }}>

              <DataGrid rows={customerreportingdata} autoHeight  columns={columns} apiRef={apiRef}  onRowClick={handleOnRowClick} onCellEditCommit={handleCellEditCommit} />
            </div> */}

          </TabPanel>

        </TabsUnstyled> </Grid>
    </Grid>
    {/* <Grid item xs={1.5} sx={{ alignSelf: "center" }}>
                      <Typography variant="h6" sx={{ fontSize: ".825rem", fontWeight: "bold", textAlign: "start", pl: "5px" }} gutterBottom component="div">
                        Min
                      </Typography>
                    </Grid>
                    <Grid item xs={10}>
                      <TextField
                        fullWidth
                        type="number"
                        size="small"
                        sx={{
                          fontSize: 14,
                        }}
                        inputProps={{
                          min,
                          max,
                        }}
                        InputProps={{
                          disableUnderline: true,
                        }}
                        placeholder="min"
                        value={minvalue}
                        onChange={(e) => {
                          var value = parseInt(
                            e.target.value,
                            10
                          );
                          setMinValue(value);
                          if (value > max) value = max;
                          if (value < min) value = min;

                        }}

                      />
                    </Grid>  */}
                     </Item>
      </Box>
  </div>
}

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
      backgroundColor: "rgba(0, 0, 0, 0.06)",
      color: "#667685",
      height: "36px",
      fontWeight: "normal",
      fontSize: ".825rem",
      lineHeight: "20px",
      borderRadius: "10px",
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

  })
);

export default Reporting;
