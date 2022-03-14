import React from "react";
import Box from "@mui/material/Box";
import {
  Grid,
  Paper,
  Stack,
  styled,
  TextField,
  FormControl,
  Slider,
} from "@mui/material";
import Drawer from "@mui/material/Drawer/Drawer";
import LocalizationProvider from "@mui/lab/LocalizationProvider/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon/ListItemIcon";
import Collapse from "@material-ui/core/Collapse/Collapse";
import RadioGroup from "@mui/material/RadioGroup/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel/FormControlLabel";
import Radio from "@mui/material/Radio/Radio";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import radioIcon from "../../assest/icon/radioIcon.svg";
import CustomSelectInput from "../../components/common/customSelectInput";
import expandIcon from "../../assest/icon/ExpandIcon.svg";
import "./Analytics.scss";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
}));

const optionsLoB = [
  { label: "Select LoB", value: null },
  { label: "option 1", value: 1 },
  { label: "option 2", value: 2 },
  { label: "option 3", value: 3 },
];

const optionsTeam = [
  { label: "Select Team", value: null },
  { label: "option 1", value: 1 },
  { label: "option 2", value: 2 },
  { label: "option 3", value: 3 },
];

const optionsAgent = [
  { label: "Select Agent", value: null },
  { label: "option 1", value: 1 },
  { label: "option 2", value: 2 },
  { label: "option 3", value: 3 },
];

const filterDetails = [
  {
    name: "Call Opening",
    icon: expandIcon,
    type: "Call Opening",
  },
  {
    name: "Call Duration",
    icon: expandIcon,
    type: "Call Duration",
  },
  {
    name: "Call Hold",
    icon: expandIcon,
    type: "Call Hold",
  },
];

const sideBar = ({ values, setValue }) => {
  const {
    isOpen,
    selectedIndex,
    lob,
    team,
    agent,
    fromDate,
    toDate,
    callOpening,
    callHold,
    callDuration,
  } = values;

  const valuetext = (value) => `${value}°C`;

  const handleFilterTab = (index) => {
    setValue("isOpen", !isOpen);
    setValue("selectedIndex", index);
  };

  return (
    <Drawer
      sx={{
        width: 225,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          // marginTop: "65px",
          width: 225,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
      className="drawer"
    >
      <div className="drawer-body">
        <div className="fw-700 fs-14 text-black">Select</div>
        <div className="mt-15">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={3}>
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                  <Grid item sm={6}>
                    <Item>
                      <DatePicker
                        label="From Date"
                        value={fromDate}
                        onChange={(newValue) => {
                          setValue("fromDate", newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </Item>
                  </Grid>
                  <Grid item sm={6}>
                    <Item>
                      <DatePicker
                        label="To Date"
                        value={toDate}
                        onChange={(newValue) => {
                          setValue("toDate", newValue);
                        }}
                        style={{ height: 50 }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </Item>
                  </Grid>
                </Grid>
              </Box>
            </Stack>
          </LocalizationProvider>
        </div>
        <div className="mt-15">
          <div className="pt-6 pb-6">
            <CustomSelectInput
              selectedValue={lob}
              handleSelectChange={(value) => setValue("lob", value)}
              placeholder="Select LoB"
              options={optionsLoB}
            />
          </div>
          <div className="pt-6 pb-6">
            <CustomSelectInput
              selectedValue={team}
              handleSelectChange={(value) => setValue("team", value)}
              placeholder="Select Team"
              options={optionsTeam}
            />
          </div>
          <div className="pt-6 pb-6">
            <CustomSelectInput
              selectedValue={agent}
              handleSelectChange={(value) => setValue("agent", value)}
              placeholder="Select Agent"
              options={optionsAgent}
            />
          </div>
          <div className="mt-56">
            <div className="d-flex justify-content-between align-item-center">
              <div className="fw-700 fs-14 text-black">Filters</div>
              <div className="fs-12 text-blue">CLEAR ALL</div>
            </div>
            <div className="gray-divider mt-15" />
            <div>
              <div>
                <List component="nav">
                  {filterDetails &&
                    filterDetails.map((item, index) => {
                      const isSelectedIndex = selectedIndex === index;
                      const { type } = item;
                      const isCallOpeningSelected = type === "Call Opening";
                      const isCallDurationSelected = type === "Call Duration";
                      const isCallHoldSelected = type === "Call Hold";
                      return (
                        <div key={index} className="score-body">
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
                              primary={item.name}
                              className="text-dark"
                              sx={{
                                fontFamily: "helveticaneue",
                                fontStyle: "Roman",
                                fontSize: "8.25rem",
                                letterSpacing: "2%",
                              }}
                              disableTypography={true}
                            />
                            <ListItemIcon
                              sx={{ justifyContent: "center" }}
                              className="radio-icon"
                            >
                              <img src={radioIcon} />
                            </ListItemIcon>
                          </ListItem>
                          {isSelectedIndex && isCallOpeningSelected && (
                            <Collapse in={isOpen} timeout="auto" unmountOnExit>
                              <FormControl component="fieldset">
                                <RadioGroup
                                  aria-label="gender"
                                  name="controlled-radio-buttons-group"
                                  value={callOpening}
                                  onChange={(event) =>
                                    setValue("callOpening", event.target.value)
                                  }
                                >
                                  <FormControlLabel
                                    value="Found"
                                    control={<Radio />}
                                    label="Found"
                                    className="radio-button-male"
                                  />
                                  <FormControlLabel
                                    value="Not Found"
                                    control={<Radio />}
                                    label="Not Found"
                                    className="radio-button-female"
                                  />
                                </RadioGroup>
                              </FormControl>
                            </Collapse>
                          )}
                          {isSelectedIndex && isCallDurationSelected && (
                            <Collapse in={isOpen} timeout="auto" unmountOnExit>
                              <div className="slider-main">
                                <Slider
                                  getAriaLabel={() => "Temperature range"}
                                  value={callDuration}
                                  onChange={(e, value) =>
                                    setValue("callDuration", value)
                                  }
                                  valueLabelDisplay="auto"
                                  getAriaValueText={valuetext}
                                />
                                <div className="mt-25 d-flex justify-content-between align-item-center">
                                  <div className="timer-box">
                                    <span className="fs-14 text-dark-black">
                                      {callDuration?.[0] || 0}
                                    </span>
                                    <span className="text-gray fs-14 ml-2">
                                      Min
                                    </span>
                                  </div>
                                  <div className="timer-box">
                                    <span className="fs-14 text-dark-black">
                                      {callDuration?.[1] || 0}
                                    </span>
                                    <span className="text-gray fs-14 ml-2">
                                      Min
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </Collapse>
                          )}
                          {isSelectedIndex && isCallHoldSelected && (
                            <Collapse in={isOpen} timeout="auto" unmountOnExit>
                              <FormControl component="fieldset">
                                <RadioGroup
                                  aria-label="gender"
                                  name="controlled-radio-buttons-group"
                                  value={callHold}
                                  onChange={(event) =>
                                    setValue("callHold", event.target.value)
                                  }
                                >
                                  <FormControlLabel
                                    value="Found"
                                    control={<Radio />}
                                    label="Found"
                                    className="radio-button-male"
                                  />
                                  <FormControlLabel
                                    value="Not Found"
                                    control={<Radio />}
                                    label="Not Found"
                                    className="radio-button-female"
                                  />
                                </RadioGroup>
                              </FormControl>
                            </Collapse>
                          )}
                          <div className="gray-divider" />
                        </div>
                      );
                    })}
                </List>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default sideBar;
