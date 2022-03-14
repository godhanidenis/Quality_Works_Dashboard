/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from "react";
import {
    Box,
    Paper,
    styled,
    Table,
    TableBody,
    tableCellClasses,
    TableContainer,
    TableHead,
    TableRow,
    TextField
} from "@mui/material";
import TableCell from "@mui/material/TableCell/TableCell";
import fileIcon from "../../assest/icon/fileIcon.svg"
import Vector from "../../assest/icon/Vector.png"
import Button from "@mui/material/Button";
import "./Dashboard.scss"
import LocalizationProvider from "@mui/lab/LocalizationProvider/LocalizationProvider";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DateRangePicker from "@mui/lab/DateRangePicker";
import CustomSelectInput from "../../components/common/customSelectInput";
import {useForm} from "react-hook-form";
import {getAgentBasedTeam, getLOB, getLobTeam, getReportingData} from "../../actions";
import moment from "moment";

const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        color: "#262626",
        fontWeight: "bold",
        paddingLeft : "48px",
        lineHeight : "20px"
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        color: "#262626",
        borderBottom: "unset",
        paddingLeft : "48px",
        lineHeight : "20px"
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(even)': {
        backgroundColor: "#F7F7F7",
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const defaultValues = {
    location: null,
    optionsLoB: [],
    optionsTeam: [],
    optionsAgent: [],
    optionsDate: [],
    lob: null,
    team: null,
    agent: [],
    rangeDate: ["2021-01-15", "2022-04-15"],
    callQuality:[],
    csta: [],
    reportingDetailsRows: [],
    reportingHeaders: []
};

const Reporting = (props) => {
    const {setValue, watch} = useForm({defaultValues});
    const {
        lob,
        team,
        rangeDate,
        reportingDetailsRows,
        reportingHeaders,
        agent,
        optionsAgent
    } = watch()

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
            setValue("optionsLoB", lob)
        }
    };

    const getAgentList = async () => {
        const teamList = {
            "team_list": [1,2]
        };
        const response = await getAgentBasedTeam(teamList);
        if (response.success && response?.data?.data) {
            let agentList = [];
            (response.data.data || []).forEach((item) => {
                agentList.push({
                    label: item.Agent_name,
                    value: item.id
                })
            });
            setValue("optionsAgent", agentList)
            setValue("agent", agentList)
        }
    };

    const getTeamDetail = async() => {
        const lobList = {
            "lob_list":[lob.value]
        };
        const response = await getLobTeam(lobList);
        if (response.success && response?.data?.data) {
            let team = [];
            response.data.data.forEach((item, index) => {
                team.push({
                    label: item.Team_name,
                    value: item.id
                })
            });
            setValue("optionsTeam", team)
        }
    };

    const getReportingDetails = async () => {

        const reportingData = {
            lob_id: [1,2],
            team_id: [1,2],
            agent_id: agent.length ? agent.map((v) => v.value) : [],
            start_date: moment(new Date(rangeDate?.[0])).format('YYYY-MM-DD'),
            end_date: moment(new Date(rangeDate?.[1])).format('YYYY-MM-DD'),
            filter:{},
            fields: [],
            tenure: [],
            callduration: [],
        };

        const response = await getReportingData(reportingData);

        if (response.success && response?.data?.data) {
            const rest = response.data.data.basic_call_info && response.data.data.basic_call_info.map((row) => {
                return Object.keys(row).map((key) => {
                    return row[key]
                })
            });
            setValue("reportingDetailsRows", rest)
            setValue("reportingHeaders", response.data.data.fields)
        }
    }


    useEffect(() => {
        getLOBDetails()
        getAgentList()
    }, []);

    useEffect(() => {
        if (lob) {
            getTeamDetail()
        }
    }, [lob]);

    useEffect(() => {
        getReportingDetails()
    }, [lob, team, agent, rangeDate]);

    return (
        <div>
            <div className="mt-56 d-flex justify-content-between">
                <div className="fs-16 fw-bold text-black">Reporting</div>
                <div className="text-right d-flex justify-content-flex-end">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateRangePicker
                            startText="From Date"
                            endText="To Date"
                            value={rangeDate}
                            onChange={(newValue) => {
                                setValue('rangeDate', newValue)
                            }}
                            renderInput={(startProps, endProps) => (
                                <React.Fragment>
                                    <TextField {...startProps} size="small" sx={{fontSize: 14, background: "white"}} className="sidebar-datepicker"/>
                                    <Box sx={{ mx: 1 }} />
                                    <TextField {...endProps} size="small"  sx={{fontSize: 14, background: "white"}} className="sidebar-datepicker" />
                                </React.Fragment>
                            )}
                        />
                    </LocalizationProvider>
                    <CustomSelectInput
                        selectedValue={agent}
                        handleSelectChange={(value) => setValue('agent', value)}
                        placeholder='Select Agent'
                        options={optionsAgent}
                        customClass="ml-12"
                        isMulti={true}
                    />
                    <div className="ml-12">
                        <Button
                            onClick={() => props.history.push('/reporting')}
                            variant="outlined" className="reporting-button mh-36" startIcon={<img src={fileIcon} alt='file'/>}
                            endIcon={<img src={Vector} alt='vector'/>}>
                            Go to Reporting
                        </Button>
                    </div>
                </div>
            </div>
            <div className="mt-12">
                <div>
                    <div className="mt-8">
                        <TableContainer component={Paper} className="custom-table">
                            <Table aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        {reportingHeaders.map((v, index) => (
                                            <StyledTableCell key={v+index} align="center">{v}</StyledTableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {reportingDetailsRows && reportingDetailsRows.map((row, index) => {
                                        return (
                                            (
                                                <StyledTableRow key={row + index}>
                                                    { row.map((value, i) => {
                                                        let colValue = 0;
                                                        if (typeof value === "string") {
                                                            colValue = value
                                                        } else if (typeof value === "number") {
                                                            colValue = parseInt(value)
                                                        }
                                                        return (
                                                            <StyledTableCell align="center" key={value + i}>
                                                                {colValue}
                                                            </StyledTableCell>
                                                        )
                                                    })}
                                                </StyledTableRow>
                                            )
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Reporting;
