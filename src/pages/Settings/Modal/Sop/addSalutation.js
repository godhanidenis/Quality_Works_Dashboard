import React, {useState} from "react"
import CustomModal from "../../../../components/common/CustomModal";
import closeIcon from "../../../../assest/icon/closeIcon.svg";
import Button from "@mui/material/Button";
import {TextField} from "@mui/material";

const AddSalutationModal = ({setValue, values, visible, handleAddSalutation}) => {

    const [name, setName] = useState('');

    const handleClose = () => {
        setValue("addSalutationModalVisible", !values.addSalutationModalVisible)
    };

    return(
        <CustomModal
            visible={visible}
            handleClose={handleClose}
            customClass="setting-modal"
        >
            <div className="common-modal-header">
                <div className="fs-16 fw-700 text-black">Add Salutation</div>
                <img src={closeIcon} alt='closeIcon' className="cursor-pointer" onClick={handleClose} />
            </div>
            <div className="gray-divider" />
            <div className="common-modal-body">
                <div className="fs-14 text-black fw-bold">Salutation Name<span className="text-red">*</span></div>
                <TextField
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Name"
                    id="outlined-start-adornment"
                    className="mt-8"
                    fullWidth
                />
                <div className="mt-40">
                    <Button variant="contained" fullWidth className="blue-button" onClick={() => handleAddSalutation(name)}>
                        Add Salutation
                    </Button>
                </div>
            </div>
        </CustomModal>
    )
}

export default AddSalutationModal
