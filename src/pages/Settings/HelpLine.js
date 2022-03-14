import React,{ useEffect } from 'react'
import {
    Grid,
    TextField, Button,Typography
} from "@mui/material";
import { useForm } from "react-hook-form";
import { getHelpCenterDetails, updateHelpCenterDetails } from '../../actions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const defaultValues = {
    msg: "",
    issue:"",
    helpCenterDetails:{}
};

function HelpLine() {
  const toastId = React.useRef(null);
  const notify = (item) => toastId.current = toast(item, { autoClose: 800 });
    const { setValue, watch } = useForm({ defaultValues });
    const {
        msg,issue,helpCenterDetails
    } = watch();

    const getHelpCenter = async () => {
        const response = await getHelpCenterDetails();
        console.log(response)
        if (response.success && response?.data?.data) {
            setValue("helpCenterDetails", response?.data?.data);
            setValue("issue", response?.data?.data[0]?.issue);
            setValue("msg", response?.data?.data[0]?.text);
            // setImagePreviewUrl(response?.data?.data?.profile_picture);
        }
        console.log(helpCenterDetails)
    }

    const onEdit = async() =>{
        const bodyFormData ={
          issue:issue,
          text:msg,
            // min:min,
            // max:max,
            // score:score,
            // uploaded_date:callFeatureData[0]?._source?.uploaded_date
          }
          // console.log(helpCenterDetails[0])
          const response = await updateHelpCenterDetails(bodyFormData, helpCenterDetails[0]?.id);
          if (response.success) {
            notify(response?.data?.message)
            console.log(response?.data?.message)
             }
    }

    useEffect(() => {
        getHelpCenter();       
    },[]);


  return (
    <div><Grid container spacing={2} className="pl-32 pt-24" sx={{ justifyContent:"center"}} >
        <Typography variant="h5" gutterBottom component="div" disableTypography={true} className="pt-48" sx={{ justifyContent:"center", color: "#001B34", fontWeight: 600, }}>
                        help center
                      </Typography>
          <Grid container item spacing={2} className='pt-24' >

            <Grid item xs={3}></Grid>
            <Grid item xs={6}>
            <div className="fs-14 text-black fw-bold pb-6">Issue<span className="text-red"></span></div>
                        <TextField
                          id="filled-multiline-static"
                          InputProps={{
                            disableUnderline: true
                          }}
                          onChange={(e) => setValue("issue", e.target.value)}
                          value={issue}
                          fullWidth
                          variant="filled"
                        />

                {/* <TextField
                    id="outlined-helperText"
                    label="issue"
                    fullWidth
                    size="small"
                    defaultValue="Default Value"
                /> */}

            </Grid>
        </Grid>
              <Grid container item spacing={2} className='pt-24' >

            <Grid item xs={3}></Grid>
            <Grid item xs={6}>
            <div className="fs-14 text-black fw-bold pb-6">Text<span className="text-red"></span></div>
            <TextField
                          id="filled-multiline-static"
                          InputProps={{
                            disableUnderline: true
                          }}
                          multiline
                          rows={2}
                          onChange={(e) => setValue("msg", e.target.value)}
                          value={msg}
                          fullWidth
                          variant="filled"
                        />
            
            </Grid>
        </Grid>
        <Grid container item spacing={2} className='pt-24' >

<Grid item xs={3}></Grid>
<Grid item xs={6}>
<Button variant="contained" size='small' onClick={onEdit}>Save</Button>
</Grid>
</Grid>
         
        </Grid>
        <ToastContainer />
        </div>
  )
}

export default HelpLine