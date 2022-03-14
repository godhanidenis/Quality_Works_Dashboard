import React from "react"
import CustomModal from "../../../components/common/CustomModal";
import closeIcon from "../../../assest/icon/closeIcon.svg";
import Button from "@mui/material/Button";
import {TextField} from "@mui/material";

const WorkspaceModal = ({visible, setValue, values}) => {

    const handleClose = () => {
        setValue("workspaceModalVisible", !values.workspaceModalVisible)
    }

    return(
        <CustomModal
            visible={visible}
            handleClose={handleClose}
            customClass="setting-modal"
        >
            <div className="common-modal-header">
                <div className="fs-16 fw-700 text-black">Add Workspace</div>
                <img src={closeIcon} alt='closeIcon' className="cursor-pointer" onClick={handleClose}/>
            </div>
            <div className="gray-divider" />
            <div className="common-modal-body">
                <div className="fs-14 text-black fw-bold">Workspace Name<span className="text-red">*</span></div>
                <TextField
                    value={""}
                    placeholder="Full Name"
                    id="filled-hidden-label-normal"
                    helperText=""
                    className="mt-8"
                    InputProps={{
                        disableUnderline: true,
                    }}
                    onChange={(e) => {}}
                    fullWidth
                    variant="filled"
                />
                <div className="fs-14 text-black fw-bold mt-32">Location<span className="text-red">*</span></div>
                <TextField
                    value={""}
                    placeholder="Hyderabad, India"
                    id="filled-hidden-label-normal"
                    className="mt-8"
                    InputProps={{
                        disableUnderline: true,
                    }}
                    onChange={(e) => {}}
                    fullWidth
                    variant="filled"
                />
                <div className="text-right text-blue mt-12 add-location">+ Add another Location</div>
                <div className="mt-40">
                    <Button variant="contained" fullWidth className="blue-button">
                        ADD WORKSPACE
                    </Button>
                </div>
            </div>
        </CustomModal>
    )
}

export default WorkspaceModal
