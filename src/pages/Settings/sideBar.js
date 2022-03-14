import React from "react";
import Drawer from "@mui/material/Drawer/Drawer";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";
import { Grid } from "@mui/material";
import sopIcon from "../../assest/icon/sopIcon.svg";
import dataIcon from "../../assest/icon/dataIcon.svg";
import processIcon from "../../assest/icon/processIcon.svg";
import accountIcon from "../../assest/icon/accountIcon.svg";
import billingIcon from "../../assest/icon/billingIcon.svg";
import "./Settings.scss";


const styles = (theme) => ({
  minWidth: "195px",
  // maxWidth: "250",
  width: "12% !important",
  position: "fixed",
  marginTop: "14px",
  flexShrink: 0,
  zIndex: 2,
  "& .MuiDrawer-paper": {
    boxSizing: "border-box",
  },
});

const ProcessManagmentTabList = ["Workspace", "LOB", "Team", "Agents"];

const SettingSideBar = ({ values, setValue }) => {
  const { selectedTab, processManagementOpen, progressSelectedTab } = values;

  const processManagement = () => {
    setValue("processManagementOpen", !values.processManagementOpen);
  };

  const handleProcessTab = (value) => {
    setValue("progressSelectedTab", value);
    setValue("selectedTab", "");
  };

  const handleSelectedTab = (value) => {
    setValue("selectedTab", value);
    setValue("progressSelectedTab", "");
  };

  return (
  <Grid container>
        <Grid item xs={12} sx={styles}  className="setting-drawer">
      <div className="drawer-body">
        <div
          className={`custom-box-shadow ${
            selectedTab === "SOP Configuration" && "selected-tab"
          }`}
          onClick={() => handleSelectedTab("SOP Configuration")}
        >
          <div className="drawer-tab">
            <img src={sopIcon} alt="sopIcon" />
            <div className="ml-8">SOP Configuration</div>
          </div>
        </div>
        <div
          className={`custom-box-shadow ${
            selectedTab === "Data Management" && "selected-tab"
          }`}
          onClick={() => handleSelectedTab("Data Management")}
        >
          <div className="drawer-tab">
            <img src={dataIcon} alt="dataIcon" />
            <div className=" ml-8">Data Management</div>
          </div>
        </div>
        <div className="process-nav-main">
          <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            className="process-nav"
          >
            <ListItemButton
              sx={{
                ...(values.processManagementOpen && {
                  border: "1px solid #667685",
                }),
              }}
              onClick={processManagement}
            >
              <ListItemIcon className="mw-unset">
                <img src={processIcon} alt="processIcon" />
              </ListItemIcon>
              <ListItemText
                disableTypography={true}
                primary="Management"
                className="pl-8"
              />
              {processManagementOpen ? (
                <ArrowDropUpIcon />
              ) : (
                <ArrowDropDownIcon />
              )}
            </ListItemButton>
            <Collapse in={processManagementOpen} timeout="auto" unmountOnExit>
              <div>
                {ProcessManagmentTabList.map((item, index) => {
                  return (
                    <List
                      component="div"
                      disablePadding
                      key={index}
                      className={`progress-child ${
                        progressSelectedTab === item && "progress-selected-tab"
                      }`}
                      onClick={() => handleProcessTab(item)}
                    >
                      <ListItemButton className="list-item-button">
                        <ListItemText
                          disableTypography={true}
                          primary={item}
                          className="pl-64 progress-selected-tab-text"
                        />
                      </ListItemButton>
                    </List>
                  );
                })}
              </div>
            </Collapse>
          </List>
        </div>
            <div
          className={`custom-box-shadow ${
            selectedTab === "Reporting" && "selected-tab"
          }`}
          onClick={() => handleSelectedTab("Reporting")}
        >
          <div className="drawer-tab">
            <img src={accountIcon} alt="accountIcon" />
            <div className=" ml-8">Reporting</div>
          </div>
        </div>
        <div
          className={`custom-box-shadow ${
            selectedTab === "Account Settings" && "selected-tab"
          }`}
          onClick={() => handleSelectedTab("Account Settings")}
        >
          <div className="drawer-tab">
            <img src={accountIcon} alt="accountIcon" />
            <div className=" ml-8">Account Settings</div>
          </div>
        </div>
        <div
          className={`custom-box-shadow ${
            selectedTab === "Billing Settings" && "selected-tab"
          }`}
          onClick={() => handleSelectedTab("Billing Settings")}
        >
          <div className="drawer-tab">
            <img src={billingIcon} alt="billingIcon" />
            <div className=" ml-8">Billing Settings</div>
          </div>
        </div>
          <div
          className={`custom-box-shadow ${
            selectedTab === "helpline" && "selected-tab"
          }`}
          onClick={() => handleSelectedTab("helpline")}
        >
          <div className="drawer-tab">
            <img src={billingIcon} alt="billingIcon" />
            <div className=" ml-8">Help Center</div>
          </div>
        </div>
      </div>
    </Grid>
    </Grid>
  );
};

export default SettingSideBar;
