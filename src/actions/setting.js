import axios from "axios";
import appConfig from "../config";
import { setHeader } from "../utils/comman";

export const postLOB = async(lobData) => {
    let result = {};
    try {
        const res = await axios.post(
            `${appConfig.appUrl}/api/managelob/`,lobData,  {
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

export const putLOB = async(lobData, id) => {
    let result = {};
    try {
        const res = await axios.put(
            `${appConfig.appUrl}/api/managelob/${id}/`, lobData,  {
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

export const deleteLOB = async(id) => {
    let result = {};
    try {
        const res = await axios.delete(
            `${appConfig.appUrl}/api/managelob/${id}/`,  {
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

export const getTeam = async() => {
    let result = {};
    try {
        const res = await axios.get(
            `${appConfig.appUrl}/api/manageteam/`,  {
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

export const getTeamLead = async() => {
    let result = {};
    try {
        const res = await axios.get(
            `${appConfig.appUrl}/api/manageteamlead/`,  {
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


export const getSopTypes = async() => {
    let result = {};
    try {
        const res = await axios.get(
            `${appConfig.appUrl}/api/managesoptypes/`,  {
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

export const addSalutation = async (data) => {
    let result = {};
    try {
        const res = await axios.post(
            `${appConfig.appUrl}/api/managesoptypes/`,  data,{
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

export const addSubSop = async (data) => {
    let result = {};
    try {
        const res = await axios.post(
            `${appConfig.appUrl}/api/subsop/`,  data,{
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

export const editSubSop = async (sopId,data) => {
    let result = {};
    try {
        const res = await axios.put(
            `${appConfig.appUrl}/api/subsop/${sopId}/`,  data,{
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

export const postTeam = async(teamData) => {
    let result = {};
    try {
        const res = await axios.post(
            `${appConfig.appUrl}/api/manageteam/`,teamData,  {
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

export const putTeam = async(teamData, id) => {
    let result = {};
    try {
        const res = await axios.put(
            `${appConfig.appUrl}/api/manageteam/${id}/`,teamData,  {
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

export const deleteTeam = async(id) => {
    let result = {};
    try {
        const res = await axios.delete(
            `${appConfig.appUrl}/api/manageteam/${id}/`,  {
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

export const getAgentList = async() => {
    let result = {};
    try {
        const res = await axios.get(
            `${appConfig.appUrl}/api/manageagent/`,  {
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

export const postAgent = async(agentData) => {
    let result = {};
    try {
        const res = await axios.post(
            `${appConfig.appUrl}/api/manageagent/`,agentData,  {
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

export const putAgent = async(agentData, id) => {
    let result = {};
    try {
        const res = await axios.put(
            `${appConfig.appUrl}/api/manageagent/${id}/`,agentData,  {
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

export const deleteAgent = async(id) => {
    let result = {};
    try {
        const res = await axios.delete(
            `${appConfig.appUrl}/api/manageagent/${id}/`,  {
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

export const getCallFeature = async(soptype) => {
    let result = {};
    try {
        const res = await axios.post(
            `${appConfig.appUrl}/elastic/getsopelasticsearch/`, soptype, {
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

export const updateCallFeature = async(soptype,id) => {
    let result = {};
    try {
        const res = await axios.put(
            `${appConfig.appUrl}/elastic/sopelasticsearch/`, {id:id,record:soptype}, {
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
export const    getCallFeatureList = async() => {
    let result = {};
    try {
        const res = await axios.get(
            `${appConfig.appUrl}/api/sopconfiguration/`, {
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

export const getAccountDetails = async() => {
    let result = {};
    try {
        const res = await axios.get(
            `${appConfig.appUrl}/api/manageuser`, {
                headers: setHeader(),
              
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

export const getHelpCenterDetails = async() => {
    let result = {};
    try {
        const res = await axios.get(
            `${appConfig.appUrl}/api/managehelp/`, {
                headers: setHeader(),
              
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
export const updateHelpCenterDetails = async(bodyFormData,id) => {
    let result = {};
    try {
        const res = await axios.put(
            `${appConfig.appUrl}/api/managehelp/${id}/`,bodyFormData, {
                headers: setHeader(),
              
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

export const updateAccountDetails = async(accountDetails, id) => {
    let result = {};
    try {
        const res = await axios.put(
            `${appConfig.appUrl}/api/manageuser/${id}/`,accountDetails, {
                headers: setHeader(),
              
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

export const gettabledata = async() => {
    let result = {};
    try {
        const res = await axios.get (
            `${appConfig.appUrl}/api/managesettingreporting/`, {
                headers: setHeader(),
              
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

export const getcustomertabledata = async() => {
    let result = {};
    try {
        const res = await axios.get(
            `${appConfig.appUrl}/api/managesettingcustomerreporting/`, {
                headers: setHeader(),
              
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

export const updatecustomertabledata = async(updatedlists) => {
    let result = {};
    try {
        const res = await axios.post(
            `${appConfig.appUrl}/api/managesettingcustomerreporting/`,{data:{weightage:updatedlists}}, {
                headers: setHeader(),
              
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

export const updatetabledata = async(updatedlists) => {
    let result = {};
    try {
        const res = await axios.post (
            `${appConfig.appUrl}/api/managesettingreporting/`,{data:{weightage:updatedlists}}, {
                headers: setHeader(), 
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
