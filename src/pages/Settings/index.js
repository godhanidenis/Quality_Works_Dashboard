import React from "react";
import { useForm } from "react-hook-form";
import WorkspaceModal from "./Modal/workspaceModal";
import SettingSideBar from "./sideBar";
import SopConfigurationTab from "./sopConfiguration";
import ProcessWorkSpaceTab from "./ProcessMangement/workSpace";
import ProcessLoBTab from "./ProcessMangement/lob";
import ProcessAgentTab from "./ProcessMangement/agents";
import ProcessTeamTab from "./ProcessMangement/team";
import Drawer from "@mui/material/Drawer";
import Grid from "@mui/material/Grid";
import Header from "../../components/Header";
import AccountSetting from "./accountSetting";
import Reporting from "./Reporting";
import HelpLine from "./HelpLine";

const defaultValues = {
  selectedTab: "SOP Configuration",
  lobRows: [],
  agentRows: [],
  selectedTeamForAgent: null,
  lobModalVisible: false,
  lobName: "",
  lobTeamNumber: "",
  isLobUpdate: false,
  teamRows: [],
  sopTypes: [],
  teamModalVisible: false,
  progressSelectedTab: false,
  anchorEl: null,
  open: false,
  teamName: "",
  agentNumber: "",
  lobOption: [],
  teamLead: "",
  selectedLob: null,
  processManagementOpen: false,
  addSalutationModalVisible: false,
  addSubSopModalVisible: false,
  workspaceModalVisible: false,
  agentModalVisible: false,
  isTeamUpdate: false,
  agentName: "",
  agentId: "",
  agentDateOfJoining: "",
  agentCloudCallNo: "",
};

const Settings = (props) => {
  const { watch, setValue } = useForm({ defaultValues, mode: "onChange" });
  const [drawerValue, setDrawerValue] = React.useState(false);
  const { selectedTab, workspaceModalVisible, progressSelectedTab } = watch();
  console.log(selectedTab)
  const handleWorkSpaceModal = () => {
    setValue("workspaceModalVisible", !workspaceModalVisible);
  };

  const toggleDrawerValue = (params) => {
    // console.log("calleds");
    setDrawerValue(!drawerValue);
  };
  

  const list = (anchor) => (
    <>
      <div className="settings-page">
        {/* <Typography variant="h6" noWrap component="div" className="navbar-logo">
              <img className="logo-icon" src={musicIcon} alt="hamburgerManu" />
            </Typography> */}
        <div className="sidebar-popup">
          <SettingSideBar values={watch()} setValue={setValue} />
        </div>
      </div>
    </>
  );
  const defaultpage = (e) =>{
    if(e.target.value=="0"){
      setValue("selectedTab","Reporting")
    }
  }

  return (
    <div className="settings-page">
      <Grid container>
        <Header {...props}  toggleDrawerValue={toggleDrawerValue} defaultpage={defaultpage} />
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
          {/* <div className="sidebar"> */}
            <SettingSideBar values={watch()} setValue={setValue} />
            <Drawer
              anchor="left"
              open={drawerValue}
              onClose={() => setDrawerValue(false)}
            >
              {list("left")}
            </Drawer>
          {/* </div> */}
        </Grid>
        <Grid
          item
          xl={10.4}
          lg={10.2}
          md={12}
          sm={12}
          xs={12}
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
              pt: 2,
              pr: 2,
            background: "#F5F8FA",
          }}
        >
          <WorkspaceModal
            visible={workspaceModalVisible}
            values={watch()}
            setValue={setValue}
          />

          {selectedTab === "SOP Configuration" && (
            <SopConfigurationTab setValue={setValue} values={watch()} />
          )}
            {selectedTab === "Account Settings" && (
            <AccountSetting setValue={setValue} values={watch()} />
          )}
           {selectedTab === "helpline" && (
            <HelpLine setValue={setValue} values={watch()} />
          )}
           {selectedTab === "Reporting" && (
            <Reporting setValue={setValue} values={watch()} />
          )}
          {progressSelectedTab === "Workspace" && (
            <ProcessWorkSpaceTab handleWorkSpaceModal={handleWorkSpaceModal} />
          )}
          {progressSelectedTab === "LOB" && (
            <ProcessLoBTab values={watch()} setValue={setValue} />
          )}
          {progressSelectedTab === "Team" && (
            <ProcessTeamTab values={watch()} setValue={setValue} />
          )}
          {progressSelectedTab === "Agents" && (
            <ProcessAgentTab values={watch()} setValue={setValue} />
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default Settings;
