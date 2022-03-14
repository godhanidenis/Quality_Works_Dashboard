import axios from "axios";
import appConfig from "../config";
import { setHeader } from "../utils/comman";

export const postEvaluation = async(evalutionData) => {
    let result = {};
    try {
        const res = await axios.post(
            `${appConfig.appUrl}/elastic/evalution/`,evalutionData,  {
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

export const getMinMaxForEvaluation = async () => {
    let result = {};
    try {
        const res = await axios.get(
            `${appConfig.appUrl}/elastic/evalutionminmax/`,  {
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

export const  viewPlayer = async (id) => {
    let result = {};
    try {
        const res = await axios.post(
            `${appConfig.appUrl}/elastic/playerview/`, id, {
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
