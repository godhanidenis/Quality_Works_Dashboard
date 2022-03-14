import React from "react"
import { Box, Paper, styled, Table, TableBody, tableCellClasses, TableContainer, TableHead, TableRow } from "@mui/material";
import TableCell from "@mui/material/TableCell/TableCell";
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        textAlign: "center",
        backgroundColor: "#FFFFFF;",
        fontWeight: "bold",
        color: "#262626",
        fontSize: 14,
        
    },
    [`&.${tableCellClasses.body}`]: {
        textAlign: "center",
        fontSize: 14,
        color: "#262626",
        borderBottom: "unset"
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

const createWorkspaceData = (agentName, location, location2, createOn) => {
    return {agentName, location, location2, createOn};
}

const workspaceRows = [
    createWorkspaceData("Arlene McCoy", "Andra Pradesh", "Kerala", "Aug-16-2021"),
    createWorkspaceData("Cameron Williamson", "Tamil Nadu", "Kerala", "Aug-17-2021"),
    createWorkspaceData("Annette Black", "Karnataka", "Tamil Nadu", "Sep-11-2021"),
    createWorkspaceData("Cameron Williamson", "Kerala", "Andra Pradesh", "Sep-21-2021"),
    createWorkspaceData("Leslie Alexander", "Andra Pradesh", "Kerala", "Sep-26-2021"),
    createWorkspaceData("Cameron Williamson", "Karnataka", "Karnataka", "Sep-26-2021"),
    createWorkspaceData("Annette Black", "Andra Pradesh", "Tamil Nadu", "Oct-11-2021"),
    createWorkspaceData("Cameron Williamson", "Tamil Nadu", "Andra Pradesh", "Oct-12-2021"),
    createWorkspaceData("Leslie Alexander", "Kerala", "Andra Pradesh", "Oct-14-2021"),
];

const ProcessWorkSpaceTab = ({handleWorkSpaceModal}) => {
    return (
        <Box
            component="main"
            sx={{width: "100%" }}
            className="workspace-body"
        >
            <div className="pt-16">
                <div className="mh-64">
                    <div className="workspace-header-content fw-500 fs-16 text-black">
                        <Button variant="outlined" className="setting-outlined-button"
                                endIcon={<AddIcon fontSize='inherit'/>} onClick={handleWorkSpaceModal}>
                            Add Workspace
                        </Button>
                    </div>
                </div>
                <div className="pt-15" >
                    <TableContainer component={Paper}>
                        <Table aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Agent Name</StyledTableCell>
                                    <StyledTableCell>Location</StyledTableCell>
                                    <StyledTableCell>Location-2</StyledTableCell>
                                    <StyledTableCell>Created On</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {workspaceRows.map((row, index) => (
                                    <StyledTableRow key={index}>
                                        <StyledTableCell>{row.agentName}</StyledTableCell>
                                        <StyledTableCell>{row.location}</StyledTableCell>
                                        <StyledTableCell>{row.location2}</StyledTableCell>
                                        <StyledTableCell>{row.createOn}</StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </Box>
    )
};

export default ProcessWorkSpaceTab
