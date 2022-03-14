import axios from "axios";
import appConfig from "../config";
import { setHeader } from "../utils/comman";

export const getReportingMinMax = async () => {
    let result = {};
    try {
        const res = await axios.get(
            `${appConfig.appUrl}/elastic/reportingminmax/`,  {
                headers: setHeader()
            }
        );
        result = res.data || {};
        return {success: true, data: result};
    } catch (err) {
        return {
            success: false,
            message: (err) || "something went wrong"
        };
    }
}

export const getReportingData = async (reportingData) => {
    let result = {};
    try {
        const res = await axios.post(
            `${appConfig.appUrl}/elastic/reportingtable/`, reportingData,  {
                headers: setHeader()
            }
        );
        result = res.data || {};
        return {success: true, data: result};
    } catch (err) {
        return {
            success: false,
            message: (err) || "something went wrong"
        };
    }
}


