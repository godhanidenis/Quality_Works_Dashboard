import React, {useEffect, useState} from "react"
import CustomModal from "../../../../components/common/CustomModal";
import closeIcon from "../../../../assest/icon/closeIcon.svg";
import Button from "@mui/material/Button";
import {TextField} from "@mui/material";
import CustomSelectInput from "../../../../components/common/customSelectInput";
import {getTeam} from "../../../../actions";

const AddSubSopModal = ({ visible, handleSubmitSubSopType, selectedSalutation, subSop, isFromSubSop, handleCloseSubSopModal }) => {

    const [name, setName] = useState('');
    const [teams, setTeams] = useState([]);
    const [selectedTeams, setSelectedTeams] = useState([])

    const fetchTeams = async () => {
        const response = await getTeam();
        if (response.success && response?.data?.data) {
            if(isFromSubSop){
              const updated = (subSop.Teams || []).map(a => {
                   const find = (response.data.data || [])?.find((team) => team.id === a)
                  return {label: find.Team_name, value: find.id}
                })
                setSelectedTeams(updated)
            }
            setTeams((response.data.data || []).map((team) => {
                return {label: team.Team_name, value: team.id}
            }))
        }
    }

    useEffect(() => {
        if(visible){
            if(isFromSubSop){
                setName(subSop.Sop_sub_type)
                setTeams([])
            }else {
                setName('')
                setTeams([])
                setSelectedTeams([])
            }
            fetchTeams()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[visible]);


    return(
        <CustomModal
            visible={visible}
            handleClose={handleCloseSubSopModal}
            customClass="setting-modal"
        >
            <div className="common-modal-header">
                <div className="fs-16 fw-700 text-black">{isFromSubSop ? "Edit" : "Add"} {selectedSalutation.Sop_name}</div>
                <img src={closeIcon} alt='closeIcon' className="cursor-pointer" onClick={handleCloseSubSopModal} />
            </div>
            <div className="gray-divider" />
            <div className="common-modal-body">
                <div className="fs-14 text-black fw-bold">Name<span className="text-red">*</span></div>
                <TextField
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    id="outlined-start-adornment"
                    className="mt-8"
                    fullWidth
                />
                <div className="fs-14 text-black fw-bold mt-32">Select Team<span className="text-red">*</span></div>
                <CustomSelectInput
                    selectedValue={selectedTeams}
                    handleSelectChange={(value) => setSelectedTeams(value)}
                    placeholder='Select Team'
                    options={teams}
                    customClass="mt-8"
                    isMulti={true}
                />
                <div className="mt-40">
                    <Button variant="contained" fullWidth className="blue-button" onClick={() => handleSubmitSubSopType({name, selectedTeams})}>
                        Save {selectedSalutation.Sop_name}
                    </Button>
                </div>
            </div>
        </CustomModal>
    )
}

export default AddSubSopModal
