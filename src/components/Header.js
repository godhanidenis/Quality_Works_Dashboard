import React, { useEffect } from "react";
import musicIcon from "../assest/icon/musicIcon.svg";
import dashboardIcon from "../assest/icon/dashboardIcon.svg";
import analyticsIcon from "../assest/icon/analyticsIcon.svg";
import evaluationIcon from "../assest/icon/evaluationIcon.svg";
import reportIcon from "../assest/icon/reportIcon.svg";
import settingIcon from "../assest/icon/settingIcon.svg";
import notificationIcon from "../assest/notification.svg";
import questionIcon from "../assest/ques.svg";
import userIcon from "../assest/icon/userIcon.svg";
import Menu from "@mui/material/Menu";
import Grid from "@mui/material/Grid";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import Stack from "@mui/material/Stack";
import WatchLaterOutlinedIcon from "@mui/icons-material/WatchLaterOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Divider from "@mui/material/Divider";
import { border } from "@mui/system";
import MenuIcon from "../assest/menu.svg";
import filterIcon from "../assest/filter.svg";
import profileLogo from "../assest/profileLogo.svg"
import logoMiddleIcon from "../assest/logosmdevice.svg";
import MailIcon from "@mui/icons-material/Mail";
import SideBar from "./common/SideBar/index";
const pages = ["Dashboard", "Reporting", "Evaluation", "Analytics", "Settings"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];
const options = [
  "defual notification",
  "notification message sample",
  "fake notification generator",
];

const ITEM_HEIGHT = 48;
const Headers = [
  {
    name: "Dashboard",
    path: "dashboard",
    icon: <GridViewOutlinedIcon />,
  },
  {
    name: "Analytics",
    path: "analytics",
    icon: <WatchLaterOutlinedIcon />,
  },
  {
    name: "Evaluation",
    path: "evaluation",
    icon: <RemoveRedEyeOutlinedIcon />,
  },
  {
    name: "Reporting",
    path: "reporting",
    icon: <ArticleOutlinedIcon />,
  },
  {
    name: "Settings",
    path: "settings",
    icon: <SettingsOutlinedIcon />,
  },
];

const headerTabs = {
  marginLeft: "50px",
  "&.Mui-selected": {
    background: "red",
  },
  "& .indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "white",
    "& > span": {
      maxWidth: 42,
      width: "100%",
      backgroundColor: "#1976d2",
    },
  },
};

const Header = (props) => {
  // console.log("abc", props);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [value, setValue] = React.useState(0);
  const open = Boolean(anchorEl);
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const pagelogout = ()=>{
        localStorage.clear();
        props.history.push("/login");
  }
  useEffect(() => {
    console.log(pathname)
    if (pathname == "/dashboard") {
      setValue(0);
    } else if (pathname == "/analytics") {
      setValue(1);
    } else if (pathname.includes('/evaluation')) {
      setValue(2);
    }else if (pathname == "/reporting") {
      setValue(3);
    } else if (pathname == "/settings") {
      setValue(4);
    }
  }, [value]);
  const { pathname } = props?.location;
  const path = pathname.split("/") || [];


  if (pathname === "/login") {
    return <div />;
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (remove) => {
    setAnchorEl(null);
    if (remove) {
      localStorage.clear();
      props.history.push("/");
    }
  };
  const handleNotificationClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    console.log(event.currentTarget)
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    // console.log(newValue);
  };

  return (
    <>
      <AppBar position="fixed" className="nav-bar">
        <Container maxWidth="xxl" className="nav-bar-container">
          <Toolbar disableGutters sx={{ height: "60px" }}>
            <Grid item lg={1.5}>
              <Typography
                variant="h6"
                noWrap
                component="div"
                className="navbar-logo"
                sx={{
                  display: { xs: "none", md: "none", lg: "flex" },
                }}
              >
                <img
                  className="logo-icon"
                  src={musicIcon}
                  alt="hamburgerManu"
                />
              </Typography>
            </Grid>

            <Box
              sx={{ ml: 2, display: { xs: "flex", md: "flex", lg: "none" } }}
            >
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                onClick={handleOpenNavMenu}
                color="inherit"
                className="header-menuIcon"
              >
                <img src={MenuIcon} alt="menu" />
              </IconButton>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                onClick={props.toggleDrawerValue}
                color="inherit"
                className="header-menuIcon"
              >
                <img src={filterIcon} alt="filter" />
              </IconButton>
              <Menu
                id="long-menu"
                MenuListProps={{
                  "aria-labelledby": "long-button",
                }}
                anchorEl={anchorElNav}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "block", lg: "none" },
                }}
              >
                {Headers.map((item, index) => (
                  <MenuItem key={index} onClick={handleCloseNavMenu}>
                    <Typography
                      onClick={() => props.history.push(`${item.path}`)}
                      textAlign="center"
                    >
                      {item.name}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                flexGrow: 1,
                alignItems: "center",
                justifyContent: "center",
                display: {
                  xs: "flex",
                  MozTextDecorationStyle: "flex",
                  lg: "none",
                },
              }}
            >
              <img src={logoMiddleIcon} alt="hamburgerManu" />
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "none", lg: "grid" },
              }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="icon position tabs example"
                variant="fullWidth"
                className="header-tabs"
                sx={headerTabs}
                classes={{
                  flexContainer: "flexContainer",
                  indicator: "indicator",
                }}
                TabIndicatorProps={{ children: <span /> }}
                centered
              >
                {Headers.map((item, index) => (
                  <Tab
                    key={index}
                    icon={item.icon}
                    iconPosition="start"
                    label={`${item.name}`}
                    onClick={() => props.history.push(`/${item.path}`)}
                  />
                ))}
              </Tabs>
            </Box>
            <Box className="header-profile pr-13">
              <Stack direction="row">
                <IconButton
                  aria-label="more"
                  id="long-button"
                  aria-controls={open ? "long-menu" : undefined}
                  aria-expanded={open ? "true" : undefined}
                  className="header-icon"
                  // onClick={handleClick}
                >
                  <img src={questionIcon} alt="hamburgerManu" />
                </IconButton>
                <IconButton
                  aria-label="more"
                  id="long-button"
                  aria-controls={open ? "long-menu" : undefined}
                  aria-expanded={open ? "true" : undefined}
                  aria-haspopup="true"
                  onClick={handleClick}
                  className="header-icon pr-16"
                >
                  <Badge
                    badgeContent={4}
                    className="notification-badge"
                    color="secondary"
                  >
                    <img src={notificationIcon} alt="hamburgerManu" />
                  </Badge>
                </IconButton>
                <Menu
                  id="long-menu"
                  MenuListProps={{
                    "aria-labelledby": "long-button",
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleNotificationClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&:before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 200,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  }}
                >
                  {options.map((option, index) => (
                    <>
                      <MenuItem
                        key={option}
                        selected={option === "default notification"}
                        onClick={handleNotificationClose}
                      >
                        {option}
                      </MenuItem>
                      <Divider />
                    </>
                  ))}
                </Menu>

                <Tooltip title="Open settings">
                  <Button
                    id="demo-customized-button"
                    aria-controls="demo-customized-menu"
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    disableElevation
                    onClick={handleOpenUserMenu}
                    endIcon={<KeyboardArrowDownIcon />}
                    className="profile-details"
                    startIcon={
                //        <img
                //   className="logo-icon"
                //   src={profileLogo}
                //   alt="hamburgerManu"
                // />
                      <Avatar
                        className="profile"
                        alt="Remy Sharp"
                        src={profileLogo}
                      />
                    }
                  >
                    Servicepack
                  </Button>
                </Tooltip>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: "45px",
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&:before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  }}
                >
                  {/* <MenuItem className="profile-name"></MenuItem> */}
                  {/* <MenuItem className="profile-email">
                    demo@minimals.cc
                  </MenuItem> */}
                  {/* <Divider /> */}
                  <MenuItem onClick={props.defaultpage} value={0}>Reporting</MenuItem>
                  <MenuItem onClick={props.defaultpage} value={1}>Billing</MenuItem>
                  <MenuItem onClick={props.defaultpage} value={1}>Account</MenuItem>
                  <Divider />
                  <MenuItem onClick={pagelogout}>Logout</MenuItem>
                </Menu>
              </Stack>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default Header;
