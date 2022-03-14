/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from "react"
import { Box, Paper, styled, Table, TableBody, tableCellClasses, TableContainer, TableHead, TableRow } from "@mui/material";
import TableCell from "@mui/material/TableCell/TableCell";
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import {deleteLOB, getLOB} from "../../../actions";
import editIcon from "../../../assest/icon/editIcon.svg";
import deleteIcon from "../../../assest/icon/deleteIcon.svg";
import LobModal from "../Modal/lobModal";
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
        borderBottom: "unset",
        textAlign: "center",
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

const ProcessLoBTab = ({values, setValue}) => {
    const toastId = React.useRef(null);
    const notify = (item) => toastId.current = toast(item, { autoClose: 800 });

    const {isLobUpdate, selectedTab, lobModalVisible, lobRows} = values;

    const [isEditMode, setEditMode] = useState(false)

    const [selectedLob, setSelectedLob] = useState({})

    const getLobDetails = async () => {
        const response = await getLOB();
        if (response.success && response?.data?.data) {
            setValue("lobRows", response.data.data)
        }
    }
    useEffect(()=> {
        getLobDetails();
    },[isLobUpdate, selectedTab]);

    const handleEdit = (row) => {
        setEditMode(true)
        setSelectedLob(row)
        setValue("lobName", row.Lob_name)
        setValue("lobTeamNumber", row.No_of_teams)
        setValue('lobModalVisible', !values.lobModalVisible)
    }

    const handleDelete = async (id) => {
        const response = await deleteLOB(id);
        if (response.success && response?.data?.data) {
            getLobDetails();
            notify("Record Deleted")

        }
    }

    const resetModal = () => {
        setValue("isLobUpdate", !values.isLobUpdate);
        setValue("lobName", "");
        setValue("lobTeamNumber", "")
        setEditMode(false)
        setSelectedLob({})
        setValue('lobModalVisible', !values.lobModalVisible)
    }

    return (
        <>
        <Box
            component="main"
            sx={{width: "100%"}}
            className="workspace-body"
        >
            <LobModal
                values={values}
                setValue={setValue}
                lobModalVisible={values.lobModalVisible}
                isEditMode={isEditMode}
                resetModal={resetModal}
                selectedLob={selectedLob}
                getLobDetails={getLobDetails}
            />
            <div className="pt-16">
                <div className="mh-64">
                    <div className="workspace-header-content fw-500 fs-16 text-black">
                        <Button variant="outlined" className="setting-outlined-button"
                                endIcon={<AddIcon fontSize='inherit'/>} onClick={() => setValue("lobModalVisible", !lobModalVisible)}>
                            Add LOB
                        </Button>
                    </div>
                </div>
                <div className="pt-15">
                    <TableContainer component={Paper}>
                        <Table aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>LOB</StyledTableCell>
                                    <StyledTableCell>No.of Teams</StyledTableCell>
                                    <StyledTableCell align="center">Actions</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {lobRows.map((row, index) => (
                                    <StyledTableRow key={index}>
                                        <StyledTableCell>{row?.Lob_name}</StyledTableCell>
                                        <StyledTableCell>{row?.No_of_teams}</StyledTableCell>
                                        <StyledTableCell align="center">
                                            {/* <div className="d-flex"> */}
                                            <span className="pr-13">
                                                <img src={editIcon} alt="edit-icon" className="cursor-pointer " onClick={() => handleEdit(row)} />
                                            </span>
                                            <span>
                                                <img src={deleteIcon} alt="delet-icon" className="cursor-pointer" onClick={() => handleDelete(row?.id)}/>
                                                </span>
                                            {/* </div> */}
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

export default ProcessLoBTab
