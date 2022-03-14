/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from "react"
import { Box, Paper, styled, Table, TableBody, tableCellClasses, TableContainer, TableHead, TableRow } from "@mui/material";
import TableCell from "@mui/material/TableCell/TableCell";
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { deleteTeam, getTeam } from "../../../actions";
import editIcon from "../../../assest/icon/editIcon.svg";
import deleteIcon from "../../../assest/icon/deleteIcon.svg";
import TeamModal from "../Modal/teamModal";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const StyledTableCell = styled(TableCell)(({theme}) => ({
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
        borderBottom: "unset", textAlign: "center",
    },
}));

const StyledTableRow = styled(TableRow)(({theme}) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: "#F7F7F7",
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const ProcessTeamTab = ({values, setValue}) => {
    const {isLobUpdate, selectedTab, teamModalVisible, teamRows} = values;
    const toastId = React.useRef(null);
    const notify = (item) => toastId.current = toast(item, { autoClose: 800 });
    const [isEditMode, setEditMode] = useState(false)

    const [selectedTeam, setSelectedTeam] = useState({})

    const fetchTeams = async () => {
        const response = await getTeam();
        if (response.success && response?.data?.data) {
            setValue("teamRows", response.data.data)
        }
    }

    useEffect(()=> {
        fetchTeams()
    },[isLobUpdate, selectedTab]);

    const handleEdit = (row) => {
        setValue("teamName", row.Team_name);
        setValue("agentNumber", row.No_agentns);
        setValue("selectedLob", { label : row.LOB?.[0]?.Lob_name, value : row.LOB?.[0]?.id} );
        setValue("teamLead", row?.Team_lead?.TeamLead_name);
        setEditMode(true);
        setSelectedTeam(row);
        setValue("teamModalVisible", !values.teamModalVisible)
    }

    const resetModal = () => {
        setEditMode(false)
        setSelectedTeam({})
        setValue("teamModalVisible", !values.teamModalVisible)
        setValue("isTeamUpdate", !values.isTeamUpdate)
        setValue("teamName", "")
        setValue("agentNumber", "")
    }

    const handleDelete = async (id) => {
        const response = await deleteTeam(id);
        if (response.success && response?.data?.data) {
            notify("Record Deleted")
            fetchTeams();
        }
    }

    return (
        <>
            <TeamModal
                values={values}
                setValue={setValue}
                isEditMode={isEditMode}
                resetModal={resetModal}
                selectedTeam={selectedTeam}
                fetchTeams={fetchTeams}
            />
            <Box
            component="main"
            sx={{width: "100%"}}
            className="workspace-body"
        >
            <div className="pt-16">
                <div className="mh-64">
                    <div className="workspace-header-content fw-500 fs-16 text-black">
                        <Button variant="outlined" className="setting-outlined-button"
                                endIcon={<AddIcon fontSize='inherit'/>} onClick={() => setValue("teamModalVisible", !teamModalVisible)}>
                            Add Team
                        </Button>
                    </div>
                </div>
                <div className="pt-15">
                    <TableContainer component={Paper}>
                        <Table aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Team</StyledTableCell>
                                    <StyledTableCell>No.of Agents</StyledTableCell>
                                    <StyledTableCell>LOB</StyledTableCell>
                                    <StyledTableCell>Team Lead</StyledTableCell>
                                    <StyledTableCell align="center">Actions</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {(teamRows || []).map((row, index) => (
                                    <StyledTableRow key={row?.Team_name + index}>
                                        <StyledTableCell>{row?.Team_name}</StyledTableCell>
                                        <StyledTableCell>{row?.No_agentns}</StyledTableCell>
                                        <StyledTableCell>{row?.LOB[0]?.Lob_name}</StyledTableCell>
                                        <StyledTableCell>{row?.Team_lead?.TeamLead_name}</StyledTableCell>
                                        <StyledTableCell align="center">
                                            <span className="pr-13">
                                                <img src={editIcon} alt="edit-icon" className="cursor-pointer" onClick={() => handleEdit(row)}/>
                                            </span>
                                            <span>
                                                <img src={deleteIcon} alt="delet-icon" className="cursor-pointer"  onClick={() => handleDelete(row?.id)}/>
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

export default ProcessTeamTab
