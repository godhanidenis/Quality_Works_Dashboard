import axios from "axios";
import appConfig from "../config";
import { setHeader } from "../utils/comman";

export const getAgentTeam = async(lobList) => {
    let result = {};
    try {
        const res = await axios.post(
            `${appConfig.appUrl}/api/showagentbasedonlob/`,lobList,  {
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

export const getAgentBasedTeam = async(teamList) => {
    let result = {};
    try {
        const res = await axios.post(
            `${appConfig.appUrl}/api/showagentbasedonteam/`,teamList, {
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

export const getMinMax = async() => {
    let result = {};
    try {
        const res = await axios.get(
            `${appConfig.appUrl}/elastic/minmixvalueforfilter/`,  {
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


