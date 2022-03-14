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
    TextField
} from "@mui/material";
import { getAccountDetails, updateAccountDetails } from '../../actions';
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const defaultValues = {
    manageDetails: [],
    username:"",
    firstname:"",
    lastname:"",
    email:"",
    phone:"",
    imageurl:""

};



function AccountSetting() {
    const toastId = React.useRef(null);
    const notify = (item) => toastId.current = toast(item, { autoClose: 800 });
    const [imagePreviewUrl, setImagePreviewUrl] = React.useState();
    const { setValue, watch } = useForm({ defaultValues });
    const {
        username,firstname,lastname,email,phone,imageurl,
        manageDetails
    } = watch();

    useEffect(() => {
        getAccountSettingDetails();       
    },[]);

    const onChange = (e) => {
        console.log(e.target.value)
    }

    const photoUpload = (e) => {
        e.preventDefault();
        console.log(e.target.files[0])
        const reader = new FileReader();
        const file = e.target.files[0];
        console.log(file);
        // setImagePreviewUrl(e.target.files[0].name)
        reader.onloadend = (event) => {
            setImagePreviewUrl(file);

        }
        reader.readAsDataURL(file);
        console.log(imagePreviewUrl)
    }
    console.log(imagePreviewUrl)

    const getAccountSettingDetails = async () => {
        const response = await getAccountDetails();
        if (response.success && response?.data?.data) {
            setValue("manageDetails", response?.data?.data);
            setValue("firstname", response?.data?.data?.first_name);
            setValue("username", response?.data?.data?.username);
            setValue("lastname", response?.data?.data?.last_name);
            setValue("email", response?.data?.data?.email);
               setValue("phone", response?.data?.data?.phone_number);
               setValue("imageurl", response?.data?.data?.profile_picture);
               console.log(imageurl)
            // setImagePreviewUrl(response?.data?.data?.profile_picture);
        }
    }
    const onEdit = async() =>
    {
        const bodyFormData = new FormData();
        bodyFormData.append('username',username);
        bodyFormData.append('first_name',firstname);
        bodyFormData.append('last_name',lastname);
        bodyFormData.append('email', email);
        bodyFormData.append('phone_number', phone);
        bodyFormData.append('profile_picture', imagePreviewUrl);
          console.log(bodyFormData)
        const response = await updateAccountDetails(bodyFormData, manageDetails.id);
         if (response.success) {
            notify("Record Updated")
                getAccountSettingDetails();
            }
    }   

console.log(manageDetails)

    return <div className='accountsetting'>
        <Grid container spacing={2} >
            {/* <Grid item xs={12}>
                <Typography variant="h5" gutterBottom component="div" disableTypography={true} sx={{
                    textAlign: "start", pl: 1,
                    background: "rgba(0, 0, 0, 0.06)",
                    padding: "10px"
                }}>
                    Account Setting
                </Typography>
            </Grid> */}

        </Grid>

        <Grid container item spacing={2} className='pt-65' >
            <Grid item xs={1}></Grid>
            <Grid item xs={3}>
                <Typography variant="h5" gutterBottom component="div" disableTypography={true} sx={{
                    textAlign: "start", pl: 1,

                    padding: "10px"
                }}>
                    Account Form
                </Typography>
            </Grid>
            <Grid item xs={7} sx={{ alignSelf: "center", display: "flex", justifyContent: "end" }}>
                {/* <Button variant="contained" sx={{ mr: 1 }} size='small'>Edit</Button> */}
                <Button variant="contained" size='small' onClick={onEdit}>Save</Button>
            </Grid>

        </Grid>
        <Grid container item spacing={2} className="pt-24" >
            {/* <Grid item xs={3}></Grid>
            <Grid item xs={10}>
                <Typography variant="h6" gutterBottom component="div" disableTypography={true} sx={{
                    textAlign: "center", pl: 1,

                    padding: "10px"
                }}>
                    Upload profile
                </Typography>
            </Grid> */}

        </Grid>
        <Grid container item spacing={2} >
            <Grid item xs={3}></Grid>
            <Grid item xs={6} sx={{ textAlign: "center" }}>
                <ImgUpload onChange={photoUpload} src={imagePreviewUrl} />
            </Grid>

        </Grid>
        <Grid container item spacing={2} className='pt-24' >

            <Grid item xs={3}></Grid>
            <Grid item xs={6}>
            <div className="fs-14 text-black fw-bold pb-6 ">Username<span className="text-red"></span></div>
                        <TextField
                          id="filled-multiline-static"
                          InputProps={{
                            disableUnderline: true
                          }}
                          onChange={(e) => setValue("username", e.target.value)}
                          value={username}
                          fullWidth
                          variant="filled"
                        />
                {/* <TextField
                    id="outlined-helperText"
                    label="Username"
                    size="small"
                    fullWidth
                     onChange={(e) => setValue("username", e.target.value)}
                    value={username}
                    defaultValue="Default Value"
              
                /> */}

            </Grid>
        </Grid>
        <Grid container item spacing={2} className='pt-24' >

            <Grid item xs={3}></Grid>
            <Grid item xs={6}>
            <div className="fs-14 text-black fw-bold pb-6 ">First Name<span className="text-red"></span></div>
                        <TextField
                          id="filled-multiline-static"
                          InputProps={{
                            disableUnderline: true
                          }}
                          onChange={(e) => setValue("firstname", e.target.value)}
                          value={firstname}
                          fullWidth
                          variant="filled"
                        />
                {/* <TextField
                    id="outlined-helperText"
                    label="First Name"
                    size="small"
                    fullWidth
                    value={firstname}
                    defaultValue="Default Value"
               
                /> */}

            </Grid>
        </Grid>
        <Grid container item spacing={2} className='pt-24' >

            <Grid item xs={3}></Grid>
            <Grid item xs={6}>
            <div className="fs-14 text-black fw-bold pb-6 ">Last Name<span className="text-red"></span></div>
            <TextField
                          id="filled-multiline-static"
                          InputProps={{
                            disableUnderline: true
                          }}
                          onChange={(e) => setValue("lastname", e.target.value)}
                          value={lastname}
                          fullWidth
                          variant="filled"
                        />
                {/* <TextField
                    id="outlined-helperText"
                    label="Last Name"
                    fullWidth
                    size="small"
                    onChange={(e) => setValue("lastname", e.target.value)}
                    value={lastname}
                    defaultValue="Default Value"
 
                /> */}

            </Grid>
        </Grid>
        <Grid container item spacing={2} className='pt-24' >

            <Grid item xs={3}></Grid>
            <Grid item xs={6}>
            <div className="fs-14 text-black fw-bold pb-6 ">Email<span className="text-red"></span></div>
                        <TextField
                          id="filled-multiline-static"
                          InputProps={{
                            disableUnderline: true
                          }}
                          onChange={(e) => setValue("email", e.target.value)}
                          value={email}
                          fullWidth
                          variant="filled"
                        />
                {/* <TextField
                    id="outlined-helperText"
                    label="Email"
                    fullWidth
                    value={email}
                    onChange={(e) => setValue("email", e.target.value)}
                    size="small"
                    defaultValue="Default Value"
                /> */}

            </Grid>
        </Grid>
        <Grid container item spacing={2} className='pt-24' >

            <Grid item xs={3}></Grid>
            <Grid item xs={6}>
            <div className="fs-14 text-black fw-bold pb-6 ">Phone<span className="text-red"></span></div>
                        <TextField
                          id="filled-multiline-static"
                          InputProps={{
                            disableUnderline: true
                          }}
                          onChange={(e) => setValue("phone", e.target.value)}
                          value={phone}
                          fullWidth
                          variant="filled"
                        />
                {/* <TextField
                    id="outlined-helperText"
                    label="phone"
                    fullWidth
                    value={phone}
                    onChange={(e) => setValue("phone", e.target.value)}
                    size="small"
                    defaultValue="Default Value"
               
                /> */}

            </Grid>
        </Grid>
        {/* <Grid container item spacing={2} className='pt-24' >

            <Grid item xs={3}></Grid>
            <Grid item xs={6}>
                <TextField
                    id="outlined-multiline-static"
                    label="Message"
                    multiline
                    fullWidth
                    size="small"
                    rows={3}
                    defaultValue="Enter Message"
                />
     
            </Grid>
        </Grid> */}




        {/* <Grid container item className="pt-24" spacing={2}>
            <Grid item xs={3}></Grid>
            <Grid item xs={10}>
                
            </Grid>
        </Grid> */}
         <ToastContainer />
    </div>;
}

const ImgUpload = ({
    onChange,
    src
}) =>
    <label htmlFor="photo-upload" className="custom-file-upload fas">
        <div className="img-wrap img-upload" >
            <img for="photo-upload" src={src} />
        </div>
        <input id="photo-upload" type="file" onChange={onChange} />
    </label>
export default AccountSetting;
