/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react"
import { Box, Paper, styled, Table, TableBody, tableCellClasses, TableContainer, TableHead, TableRow } from "@mui/material";
import TableCell from "@mui/material/TableCell/TableCell";
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import editIcon from "../../../assest/icon/editIcon.svg"
import deleteIcon from "../../../assest/icon/deleteIcon.svg"
import AgentModal from "../Modal/agentModal";
import { deleteAgent, getAgentList } from "../../../actions";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#FFFFFF;",
        fontWeight: "bold",
        color: "#262626",
        fontSize: 14,
        textAlign: "center",
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        color: "#262626",
        borderBottom: "unset",
        textAlign: "center",
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: "#F7F7F7",
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const ProcessAgentTab = ({ setValue, values }) => {
    const toastId = React.useRef(null);
    const notify = (item) => toastId.current = toast(item, { autoClose: 800 });

    const { isLobUpdate, selectedTab, agentModalVisible, agentRows } = values;

    const [isEditMode, setEditMode] = useState(false);

    const [selectedAgent, setSelectedAgent] = useState({});

    const handleAgentModal = () => {
        setValue('agentModalVisible', !agentModalVisible)
    }

    const getAgentDetails = async () => {
        const response = await getAgentList();
        if (response.success && response?.data?.data) {
            setValue("agentRows", response.data.data)
        }
    }

    useEffect(() => {
        getAgentDetails();
    }, [isLobUpdate, selectedTab]);

    const handleEdit = (row) => {
        setEditMode(true);
        setSelectedAgent(row);
        setValue("agentId", row.Agent_id);
        setValue("agentName", row.Agent_name);
        setValue("agentCloudCallNo", row.phone_no);
        setValue("agentDateOfJoining", row.Date_of_join);
        setValue("selectedTeamForAgent", { label: row?.Team?.Team_name, value: row?.Team?.id });
        setValue('agentModalVisible', !values.agentModalVisible)
    }

    const resetModal = () => {
        setValue("agentId", "");
        setValue("agentName", "");
        setValue("agentCloudCallNo", "");
        setValue("agentDateOfJoining", "");
        setValue("selectedTeamForAgent", null);
        setEditMode(false);
        setSelectedAgent({});
        setValue('agentModalVisible', !values.agentModalVisible)
    }

    const handleDelete = async (id) => {
        const response = await deleteAgent(id);
        if (response.success && response?.data?.data) {
            notify("Record Deleted")
            getAgentDetails();

        }
    }

    return (
        <>
            <AgentModal
                visible={agentModalVisible}
                handleClose={handleAgentModal}
                setValue={setValue}
                values={values}
                isEditMode={isEditMode}
                resetModal={resetModal}
                selectedAgent={selectedAgent}
                getAgentDetails={getAgentDetails}
            />
            <Box
                component="main"
                sx={{ width: "100%" }}
                className="workspace-body"
            >
                <div className=" pt-16">
                    <div className="mh-64">
                        <div className="workspace-header-content fw-500 fs-16 text-black">
                            <Button variant="outlined" className="setting-outlined-button"
                                endIcon={<AddIcon fontSize='inherit' />} onClick={handleAgentModal}>
                                Add Agent
                            </Button>
                        </div>
                    </div>
                    <div className="pt-15">
                        <TableContainer component={Paper}>
                            <Table aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>Agent Name</StyledTableCell>
                                        <StyledTableCell>Agent ID</StyledTableCell>
                                        <StyledTableCell>Date of Join</StyledTableCell>
                                        <StyledTableCell>Team</StyledTableCell>
                                        <StyledTableCell>Lob</StyledTableCell>
                                        <StyledTableCell align="center">Actions</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {agentRows.map((row, index) => (
                                        <StyledTableRow key={index}>
                                            <StyledTableCell>{row.Agent_name}</StyledTableCell>
                                            <StyledTableCell>{row.Agent_id}</StyledTableCell>
                                            <StyledTableCell>{row.Date_of_join}</StyledTableCell>
                                            <StyledTableCell>{row?.Team?.Team_name}</StyledTableCell>
                                            <StyledTableCell >{row?.Team?.LOB?.[0]?.Lob_name}</StyledTableCell>
                                            <StyledTableCell align="center">
                                                <span className="pr-13">
                                                    <img src={editIcon} alt="edit-icon" className="cursor-pointer" onClick={() => handleEdit(row)} />
                                                </span>
                                                <span>
                                                    <img src={deleteIcon} alt="delet-icon" className="cursor-pointer" onClick={() => handleDelete(row?.id)} />
                                                </span>
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </Box>
            <ToastContainer />
        </>
    )
};

export default ProcessAgentTab
