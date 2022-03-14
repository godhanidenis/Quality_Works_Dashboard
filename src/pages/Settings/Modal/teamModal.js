/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react"
import { TextField, Button } from "@mui/material";
import CustomModal from "../../../components/common/CustomModal";
import CustomSelectInput from "../../../components/common/customSelectInput";
import closeIcon from "../../../assest/icon/closeIcon.svg";
import { getLOB, getTeamLead, postTeam, putTeam } from "../../../actions";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TeamModal = ({ values, setValue, isEditMode, resetModal, selectedTeam, fetchTeams }) => {
    const toastId = React.useRef(null);
    const notify = (item) => toastId.current = toast(item, { autoClose: 800 });
    const [lobList, setLobList] = useState([])
    const [teamLead, setTteamLead] = useState([])

    const onSubmit = async () => {
        if (!values.teamName) {
            notify("teamname required")
        } else if (!values.agentNumber) {
            notify("agent no. required")
        } else if (!values.selectedLob) {
            notify("select Lob ")
        } else if (!values.selectedTeamLead) {
            notify("select teamlead")
        } else {
            if (isEditMode) {
                const teamData = {
                    Team_name: values.teamName,
                    No_agentns: Number(values.agentNumber),
                    Locations: 1,
                    Reporting_manager: values.selectedTeamLead.value,
                    LOB: [values.selectedLob.value]
                }
                const response = await putTeam(teamData, selectedTeam.id)
                if (response.success) {
                    notify("Successfully Updated")
                    resetModal()
                    fetchTeams()
                }
            } else {
                const teamData = {
                    team_name: values.teamName,
                    no_agents: Number(values.agentNumber),
                    locations: 1,
                    reporting_manager_id: values.selectedTeamLead.value,
                    lob_id_list: [values.selectedLob.value]
                }
                const response = await postTeam(teamData)
                if (response.success) {
                    notify("Successfully Added")
                    resetModal()
                    fetchTeams()
                }
            }
        }
    }

    const getLobDetails = async () => {
        const response = await getLOB();
        if (response.success && response?.data?.data) {
            setLobList(response?.data?.data.map(v => { return { label: v.Lob_name, value: v.id } }))
            setValue("lobRows", response.data.data)
        }
    }
    const getTeamleadDetails = async () => {
        const response = await getTeamLead();
        if (response.success && response?.data?.data) {
            setTteamLead(response?.data?.data.map(v => { return { label: v.TeamLead_name, value: v.id } }))
            setValue("teamleadRows", response.data.data)
        }
    }

    useEffect(() => {
        if (values.teamModalVisible) {
            getLobDetails();
        }
    }, [values.teamModalVisible]);
    useEffect(() => {
        getTeamleadDetails();
    }, []);

    return (
        <>
            <CustomModal
                visible={values.teamModalVisible}
                handleClose={() => resetModal()}
                customClass="team-modal"
            >
                <div className="common-modal-header">
                    <div className="fs-16 fw-700 text-black">{isEditMode ? "Edit" : "Add"} Team</div>
                    <img src={closeIcon} className="cursor-pointer" alt="closeIcon" onClick={() => resetModal()} />
                </div>
                <div className="gray-divider" />
                <div className="common-modal-body">
                    <div className="fs-14 text-black fw-bold">Team Name<span className="text-red">*</span></div>
                    <TextField
                        value={values.teamName}
                        placeholder="Full Name"
                        id="filled-hidden-label-normal"
                        required
                        InputProps={{
                            disableUnderline: true,
                        }}
                        className="mt-8"
                        onChange={(e) => setValue("teamName", e.target.value)}
                        fullWidth
                        variant="filled"
                    />
                    <div className="fs-14 text-black fw-bold mt-32">No.of Agents<span className="text-red">*</span></div>
                    <TextField
                        value={values.agentNumber}
                        placeholder="Eg:323344"
                        id="filled-hidden-label-normal"
                        required
                        InputProps={{
                            disableUnderline: true,
                        }}
                        className="mt-8"
                        onChange={(e) => setValue("agentNumber", e.target.value)}
                        fullWidth
                        variant="filled"
                    />
                    <div className="fs-14 text-black fw-bold mt-32">Select LOB<span className="text-red">*</span></div>
                    <CustomSelectInput
                        selectedValue={values.selectedLob}
                        handleSelectChange={(value) => setValue("selectedLob", value)}
                        placeholder='Marketing, Sales, Accounts'
                        options={lobList}
                        customClass="mt-8"
                    />

                    <div className="fs-14 text-black fw-bold mt-32">Team Lead<span className="text-red">*</span></div>
                    <CustomSelectInput
                        selectedValue={values.selectedTeamLead}
                        handleSelectChange={(value) => setValue("selectedTeamLead", value)}
                        placeholder='select team lead'
                        options={teamLead}
                        customClass="mt-8"
                    />
                    {/* <TextField
                    value={values.teamLead}
                    placeholder="Vinay, Ashok"
                    id="filled-hidden-label-normal"
                    InputProps={{
                        disableUnderline: true,
                    }}
                    className="mt-8"
                    onChange={(e) => setValue("teamLead", e.target.value)}
                    fullWidth
                    variant="filled"
                /> */}
                    <div className="mt-40">
                        <Button variant="contained" fullWidth className="blue-button" onClick={onSubmit}>
                            {isEditMode ? "SAVE TEAM" : "ADD TEAM"}
                        </Button>
                    </div>
                </div>
            </CustomModal>
            <ToastContainer />
        </>
    )
}

export default TeamModal
