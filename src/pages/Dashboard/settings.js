import React, {useEffect, useState} from "react";
import {styled, Paper, Grid, Box} from "@mui/material";
import { settingState } from "../../actions";
import CustomCard from "../../components/common/CustomCard";
import teamsIcon from "../../assest/icon/teamsIcon.svg";
import qualityIcon from "../../assest/icon/qualityIcon.svg";
import batchIcon from "../../assest/icon/batchicon.svg";
import uploadIcon1 from "../../assest/icon/uploadIcon1.svg";
import Button from "@mui/material/Button";
import settingBlueIcon from "../../assest/icon/settingBlueIcon.svg";
import Vector from "../../assest/icon/Vector.png";
import "./Dashboard.scss"

const Item = styled(Paper)(({theme}) => ({
    ...theme.typography.body2
}));


// eslint-disable-next-line no-unused-vars
const settings = [
    {
        title: "Teams Onboarded",
        number: "5",
        titleLargeIcon: teamsIcon
    },
    {
        title: "Quality Metrics",
        number: "25",
        titleLargeIcon: qualityIcon
    },
    {
        title: "Batches Processed",
        number: "35",
        titleLargeIcon: batchIcon
    },
    {
        title: "Data Uploaded",
        number: "25GB",
        titleLargeIcon: uploadIcon1
    },
]

const Settings = (props) => {
    const [settingDetail, setSettingDetail] = useState({});

    const getSettings = async () => {
        const response = await settingState();
        if (response.success && response?.data?.data) {
            setSettingDetail(response?.data?.data)
        }
    };

    useEffect(() => {
        getSettings()
    }, []);

    return (
        <div className="setting">
            <div className="d-flex justify-content-between align-item-center">
                <div className="fw-bold fs-14 text=black">Settings</div>
                <div>
                    <Button
                        variant="outlined"
                        className="reporting-button"
                        onClick={() => props.history.push('/settings')}
                        startIcon={<img src={settingBlueIcon} alt='setting'/>}
                        endIcon={<img src={Vector} alt='vector'/>}>
                        Go to Settings
                    </Button>
                </div>
            </div>
            <div className="mt-12">
                <Box sx={{flexGrow: 1}}>
                    <Grid container spacing={2}>
                        <Grid item sm={3} className="w-100">
                            <Item className="enable-sample-content">
                                <CustomCard
                                    title="Teams Onboarded"
                                    number={settingDetail["Teams Onboarded"]}
                                    titleLargeIcon={teamsIcon}
                                    customClass="dashboard-setting-card"
                                    customCardClass="br-4"
                                    loading={false}
                                    hidePercentage
                                    {...props}
                                />
                            </Item>
                        </Grid>
                        <Grid item sm={3} className="w-100">
                            <Item className="enable-sample-content">
                                <CustomCard
                                    title="Quality Metrics"
                                    number={settingDetail["Quality Works"]}
                                    titleLargeIcon={qualityIcon}
                                    customClass="dashboard-setting-card"
                                    customCardClass="br-4"
                                    loading={false}
                                    hidePercentage
                                    {...props}
                                />
                            </Item>
                        </Grid>
                        <Grid item sm={3} className="w-100">
                            <Item className="enable-sample-content">
                                <CustomCard
                                    title="Batches Processed"
                                    number={settingDetail["Batches processed"]}
                                    titleLargeIcon={batchIcon}
                                    customClass="dashboard-setting-card"
                                    customCardClass="br-4"
                                    loading={false}
                                    hidePercentage
                                    {...props}
                                />
                            </Item>
                        </Grid>
                        <Grid item sm={3} className="w-100">
                            <Item className="enable-sample-content">
                                <CustomCard
                                    title="Data Uploaded"
                                    number={settingDetail["Data Uploaded"]}
                                    titleLargeIcon={uploadIcon1}
                                    customClass="dashboard-setting-card"
                                    customCardClass="br-4"
                                    loading={false}
                                    hidePercentage
                                    {...props}
                                />
                            </Item>
                        </Grid>
                    </Grid>
                </Box>
            </div>
        </div>
    );
};


export default Settings;
