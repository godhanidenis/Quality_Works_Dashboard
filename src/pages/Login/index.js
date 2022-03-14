import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Paper,
  styled,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import callSampleIcon from "../../assest/icon/callSampleIcon.svg";
import background from "../../assest/login/background.svg";
import sidetheme from "../../assest/login/theme.svg";
import musicIcon from "../../assest/icon/musicIconWhite.svg";
import userIcon from "../../assest/icon/fillUserIcon.svg";
import lockIcon from "../../assest/icon/lockIcon.svg";
import Typography from "@mui/material/Typography";
import { login } from "../../actions";
import axios from "axios";
import appConfig from "../../config";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";
import googleIcon from "./../../assest/google.svg";
import Alert from "@mui/material/Alert";
import "./login.scss";


const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
}));

const Login = (props) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({
    userName: "",
    password: "",
  });
  const [invalid, setInvalid] = useState(false);

  const handleLogin = async () => {
    let allError = {};
    if (!userName) {
      allError.userName = "Username is require";
    } else {
      allError.userName = "";
    }
    if (!password) {
      allError.password = "Password is require";
    } else {
      allError.password = "";
    }
    if (!userName || !password) {
      setError(allError);
    } else {
      const response = await login({ username: userName, password: password });
      if (response.message && !response.success) {
        console.log("snfdsbf");
        setInvalid(true);
      }

      if (response.success && response?.data?.data) {
        console.log(response)
        //  LogIn({ accessToken: response.data.access_token });
        localStorage.setItem("token", response.data?.data?.access_token);
        props.history.push("/dashboard");
        // await axios.post(`${appConfig.appUrl}/api/refresh_token/`);
      }
    }
  };

  return (
    <div className="sign-up">
      <Box sx={{ flexGrow: 1 }}>
        <Grid container>
          <Grid
            item
            lg={6}
            md={6}
            sx={{ display: { xs: "none", sm: "none", md: "grid" } }}
            className="w-100"
          >
            <div className="enable-sample-content">
              {/* <div className="fs-20 text-dark-blue">
                  Enabling 100% call sampling
                </div>
                <div className="mt-8 custom-tab" /> */}
              <img src={sidetheme} alt="callSampleIcon" className="mt-35" />
            </div>

            <div></div>
          </Grid>
          <Grid
            item
            lg={6}
            md={6}
            sm={12}
            sx={{ display: { md: "grid" } }}
            className="w-100"
          >
            <div className="signup-box">
              <div>
                {invalid && userName && password && (
                  <>
                    <Alert className="mb-50" severity="error">
                      username and password invalid
                    </Alert>
                  </>
                )}
                <div className="logo">
                  <img src={musicIcon} alt="musicIcon" />
                </div>

                <div className="mt-40 fs-24 fw-bold text-dark-black">Login</div>
                <div>
                  <div className="mt-15">
                    <Typography variant="h6" gutterBottom component="div">
                      Email
                    </Typography>
                    <TextField
                      value={userName}
                      placeholder="Enter Your Email"
                      className="text-field"
                      id="outlined-start-adornment"
                      onChange={(e) => {
                        setUserName(e.target.value);
                        setInvalid(false);
                      }}
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <MailOutlineIcon />
                          // <img
                          //   src={MailOutlineIcon}
                          //   alt="userIcon"
                          //   className="pr-13"
                          // />
                        ),
                      }}
                    />
                    <span className="text-red">{error.userName || ""}</span>
                  </div>
                  <div className="mt-15">
                    <Typography variant="h6" gutterBottom component="div">
                      Password
                    </Typography>
                    <FormControl fullWidth variant="outlined">
                      <OutlinedInput
                        placeholder="Password"
                        id="outlined-adornment-password"
                        type={showPassword ? "text" : "password"}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          setInvalid(false);
                        }}
                        className="pl-10"
                        value={password}
                        startAdornment={<VpnKeyOutlinedIcon />}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() => setShowPassword(!showPassword)}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                    <span className="text-red">{error.password || ""}</span>
                  </div>
                  {/* <div className="text-light-blue fs-14  mt-8">
                    Forgot Password?
                  </div> */}
                  <div className="mt-20 justify-content-around d-flex">
                    <Button
                      variant="contained"
                      size="large"
                      className="submit-btn"
                      onClick={handleLogin}
                    >
                      Submit
                    </Button>
                  </div>
                  {/* <div className="mt-20">
                    <Button
                      variant="contained"
                      size="large"
                      fullWidth
                      className="g-sign-in "
                      onClick={handleLogin}
                    >
                      <img src={googleIcon} alt="musicIcon" /> Submit
                    </Button>
                  </div>
                  <div className="mt-12 justify-content-around d-flex ">
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      component="div"
                    >
                      Not Registerd Yet? <span>Sign Up</span>
                    </Typography>
                  </div> */}
                </div>
              </div>
              <div />
            </div>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Login;
