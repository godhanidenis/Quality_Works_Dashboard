/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react"
import CustomModal from "../../../components/common/CustomModal";
import closeIcon from "../../../assest/icon/closeIcon.svg";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { getLOB, postLOB, putLOB } from "../../../actions"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LobModal = ({ values, setValue, lobModalVisible, isEditMode, resetModal, selectedLob, getLobDetails }) => {
    const toastId = React.useRef(null);
    const notify = (item) => toastId.current = toast(item, { autoClose: 800 });
    const getLOBDetails = async () => {
        const response = await getLOB();
        if (response.success && response?.data?.data) {
            let lob = [];
            response.data.data.forEach((item) => {
                lob.push({
                    label: item.Lob_name,
                    value: item.id
                })
            });
            setValue("lobOption", lob)
        }
    };

    useEffect(() => {
        if (lobModalVisible) {
            getLOBDetails()
        }
    }, [lobModalVisible]);

    const onSubmit = async () => {


        if (!values.lobName) {
            notify("name Required")
        } else if (!values.lobTeamNumber) {
            notify("number of team Required")
        } else {
            if (isEditMode) {
                const bodyFormData = new FormData();
                bodyFormData.append('Lob_name', values.lobName);
                bodyFormData.append('No_of_teams', values.lobTeamNumber);
                const response = await putLOB(bodyFormData, selectedLob.id);
                if (response.success) {
                    notify("Successfully Updated")
                    resetModal()
                    getLobDetails()
                }
            } else {
                const bodyFormData = new FormData();
                bodyFormData.append('lob_name', values.lobName);
                bodyFormData.append('No_of_teams', values.lobTeamNumber);
                const response = await postLOB(bodyFormData);
                if (response.success) {
                    notify("Successfully Added")
                    resetModal()
                    getLobDetails()
                }
            }
        }

    };

    return (
        <>
            <CustomModal
                visible={values.lobModalVisible}
                handleClose={() => resetModal()}
                customClass="lob-modal"
            >
                <div className="common-modal-header">
                    <div className="fs-16 fw-700 text-black">{isEditMode ? "Edit" : "Add"} LOB</div>
                    <img src={closeIcon} className="cursor-pointer" alt="closeIcon" onClick={() => resetModal()} />
                </div>
                <div className="gray-divider" />
                <div className="common-modal-body">
                    <div className="fs-14 text-black fw-bold">LOB Name</div>
                    <TextField
                        value={values.lobName}
                        placeholder="Prepaid, Postpaid"
                        id="filled-hidden-label-normal"
                        className="mt-8"
                        required
                        InputProps={{
                            disableUnderline: true,
                        }}
                        onChange={(e) => setValue("lobName", e.target.value)}
                        fullWidth
                        variant="filled"
                    />
                    <div className="fs-14 text-black fw-bold mt-32">No.of Teams</div>
                    <TextField
                        type="number"
                        id="filled-hidden-label-normal"
                        value={values.lobTeamNumber}
                        placeholder="00"
                        required
                        inputProps={{
                            min: 0,
                            max: 100
                        }}
                        InputProps={{
                            disableUnderline: true,
                        }}
                        className="mt-8"
                        onChange={(e) => setValue("lobTeamNumber", e.target.value)}
                        fullWidth
                        variant="filled"
                    />
                    <div className="mt-40">
                        <Button variant="contained" fullWidth className="blue-button" onClick={onSubmit} >
                            {isEditMode ? "SAVE LOB" : "ADD LOB"}
                        </Button>
                    </div>
                </div>
            </CustomModal>
            <ToastContainer />
        </>
    )
}

export default LobModal
