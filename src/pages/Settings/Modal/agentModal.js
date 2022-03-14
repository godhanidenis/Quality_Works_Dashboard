import React, { useEffect, useState } from "react"
import CustomModal from "../../../components/common/CustomModal";
import closeIcon from "../../../assest/icon/closeIcon.svg";
import {TextField} from "@mui/material";
import CustomSelectInput from "../../../components/common/customSelectInput";
import Button from "@mui/material/Button";
import DatePicker from "@mui/lab/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider/LocalizationProvider";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { getTeam, postAgent, putAgent } from "../../../actions";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

// const options = [
//     {label: "Marketing, Sales, Accounts", value: null},
//     {label: "option 1", value: 1},
// ];

const AgentModal = ({visible, setValue, values, selectedAgent, isEditMode, resetModal, getAgentDetails}) => {
    // const notify = (item) => toast(item);
    const toastId = React.useRef(null);
    const notify = (item) => toastId.current = toast(item, { autoClose: 800 });

    // const update = () => toast.update(toastId.current, { type: toast.TYPE.INFO, autoClose: 5000 });
    const [teamList, setTeamList] = useState([]);

    const fetchTeams = async () => {
        if(values.agentModalVisible){
            const response = await getTeam();
            if (response.success && response?.data?.data) {
                setTeamList(response?.data?.data.map((v) => {return {label : v.Team_name, value : v.id}}))
            }
        }
    }

    useEffect(()=> {
        fetchTeams()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[values.agentModalVisible]);

    const onSubmit = async () => {
        const bodyFormData = new FormData();
        bodyFormData.append('Agent_name', values.agentName);
        bodyFormData.append('Agent_id', values.agentId);
        bodyFormData.append('phone_no', values.agentCloudCallNo);
        bodyFormData.append('team_id', values?.selectedTeamForAgent?.value);
        if(!values.agentName){
            notify("Agent Name required")
        }else if(!values.agentId){
            notify("Agent Id required")
        }else if(!values.agentCloudCallNo){
            notify("Select team ")
        }else if(!values?.selectedTeamForAgent?.value){
            notify("Enter call no")
        }else{
            if(isEditMode){
                const response = await putAgent(bodyFormData, selectedAgent.id);
                if (response.success) {
                    notify("Successfully Updated")
                    resetModal()
                    getAgentDetails()
                }
            } else {
                const response = await postAgent(bodyFormData);
                if (response.success) {
                    notify("Successfully Added")
                    resetModal();
                    getAgentDetails()
                }
            }
        }

    };

    return (
        <>
        <CustomModal
            visible={visible}
            handleClose={resetModal}
            customClass="agent-modal"
        >
            <div className="common-modal-header">
                <div className="fs-16 fw-700 text-black">{isEditMode ? "Edit" : "Add"} Agent</div>
                <img src={closeIcon} className="cursor-pointer" onClick={resetModal} alt="closeIcon"/>
            </div>
            <div className="gray-divider"/>
            <div className="common-modal-body">
                <div className="fs-14 text-black fw-bold">Agent Name<span className="text-red">*</span></div>
                <TextField
                    value={values.agentName}
                    placeholder="Full Name"
                    id="filled-hidden-label-normal"
                    className="mt-8"
                    onChange={(e) => setValue("agentName", e.target.value)}
                    fullWidth
                    InputProps={{
                        disableUnderline: true,
                    }}
                    variant="filled"
                />
                <div className="fs-14 text-black fw-bold mt-32">Agent ID<span className="text-red">*</span></div>
                <TextField
                    value={values.agentId}
                    placeholder="Eg:323344"
                     id="filled-hidden-label-normal"
                     variant="filled"
                    className="mt-8"
                    onChange={(e) => setValue("agentId", e.target.value)}
                    fullWidth
                    InputProps={{
                        disableUnderline: true,
                    }}
                />
                <div className="fs-14 text-black fw-bold mt-32">Select Team<span className="text-red">*</span></div>
                <CustomSelectInput
                    selectedValue={values.selectedTeamForAgent}
                    handleSelectChange={(value) => setValue("selectedTeamForAgent", value)}
                    placeholder='Teams'
                    options={teamList}
                    customClass="mt-8"
                />
                <div className="fs-14 text-black fw-bold mt-32">Date of Joining<span className="text-red">*</span></div>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                   <div className="mt-8 agent-datepicker">
                       <DatePicker
                      
                           value={isEditMode ? values.agentDateOfJoining : new Date()}
                           onChange={(newValue) => setValue("agentDateOfJoining", newValue)}
                           renderInput={(params) => <TextField {...params} />}
                       />
                   </div>
                </LocalizationProvider>
                <div className="fs-14 text-black fw-bold mt-32">Agent Cloud Call no<span className="text-red">*</span>
                </div>
                <TextField
                    value={values.agentCloudCallNo}
                    placeholder="12345678"
                     id="filled-hidden-label-normal"
                     variant="filled"
                    className="mt-8"
                    onChange={(e) => setValue("agentCloudCallNo", e.target.value)}
                    fullWidth
                    InputProps={{
                        disableUnderline: true,
                    }}
                />
                <div className="mt-40">
                    <Button variant="contained"  className="blue-button"  onClick={onSubmit}>
                        { isEditMode ? "SAVE AGENT" : "ADD AGENT" }
                    </Button>
                </div>
            </div>
        </CustomModal>
        <ToastContainer position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover />
        </>
    )
}

export default AgentModal
