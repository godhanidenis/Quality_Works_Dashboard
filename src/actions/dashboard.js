import axios from "axios";
import appConfig from "../config";
import { setHeader } from "../utils/comman";

export const processingState = async () => {
  let result = {};
  try {
    const res = await axios.get(
      `${appConfig.appUrl}/elastic/processingstate/`,  {
        headers: setHeader()
      }
    );
    result = res.data || {};
    return {success: true, data: result};
  } catch (err) {
    // console.log("error in getting time info : ", err);
    return {
      success: false,
      message: (err) || "something went wrong"
    };
  }
};

export const getTotalcallDetails = async (daterange) => {
  let result = {};
  try {
    const res = await axios.post(
      `${appConfig.appUrl}/elastic/dashboardtotalcalls/`,daterange, {
        headers: setHeader()
      }
    );
    result = res.data || {};
    return {success: true, data: result};
  } catch (err) {
    // console.log("error in getting time info : ", err);
    return {
      success: false,
      message: (err) || "something went wrong"
    };
  }
};

export const getsimplingDetails = async (daterange) => {
  let result = {};
  try {
    const res = await axios.post(
      `${appConfig.appUrl}/elastic/dashboardsamplingrate/`,daterange, {
        headers: setHeader()
      }
    );
    result = res.data || {};
    return {success: true, data: result};
  } catch (err) {
    // console.log("error in getting time info : ", err);
    return {
      success: false,
      message: (err) || "something went wrong"
    };
  }
};

export const getoverallholdDetails = async (daterange) => {
  let result = {};
  try {
    const res = await axios.post(
      `${appConfig.appUrl}/elastic/dashboardoverallsentiment/`,daterange, {
        headers: setHeader()
      }
    );
    result = res.data || {};
    return {success: true, data: result};
  } catch (err) {
    // console.log("error in getting time info : ", err);
    return {
      success: false,
      message: (err) || "something went wrong"
    };
  }
};

export const settingState = async () => {
  let result = {};
  try {
    const res = await axios.get(
      `${appConfig.appUrl}/elastic/setting/`, {
      headers: setHeader()
    }
    );
    result = res.data || {};
    return { success: true, data: result };
  } catch (err) {
    return {
      success: false,
      message: (err) || "something went wrong"
    };
  }
}

export const getLOB = async () => {
  let result = {};
  try {
    const res = await axios.get(
      `${appConfig.appUrl}/api/managelob/`, {
      headers: setHeader()
    }
    );
    result = res.data || {};
    return { success: true, data: result };
  } catch (err) {
    return {
      success: false,
      message: (err) || "something went wrong"
    };
  }
}

export const getDefectParetoDetails = async (filterData) => {
  let result = {};
  try {
    const res = await axios.post(
      `${appConfig.appUrl}/elastic/defectpareto/`,filterData, {
      headers: setHeader()
    }
    );
    result = res.data || {};
    return { success: true, data: result };
  } catch (err) {
    return {
      success: false,
      message: (err) || "something went wrong"
    };
  }
}

export const getLobTeam = async (lobList) => {
  let result = {};
  try {
    const res = await axios.post(
      `${appConfig.appUrl}/api/showteambasedonlob/`, lobList, {
      headers: setHeader(),
    }
    );
    result = res.data || {};
    return { success: true, data: result };
  } catch (err) {
    return {
      success: false,
      message: (err) || "something went wrong"
    };
  }
}

export const getGraph = async (graphDetail) => {
  let result = {};
  try {
    const res = await axios.post(
      `${appConfig.appUrl}/elastic/cqscore/`, graphDetail, {
      headers: setHeader()
    }
    );
    result = res.data || {};
    return { success: true, data: result };
  } catch (err) {
    return {
      success: false,
      message: (err) || "something went wrong"
    };
  }
}

export const getFocusGroupTable = async (datefilter) => {
  let result = {};
  try {
    const res = await axios.post(
      `${appConfig.appUrl}/elastic/focusgroup/`, datefilter, {
      headers: setHeader()
    }
    );
    result = res.data || {};
    return { success: true, data: result };
  } catch (err) {
    return {
      success: false,
      message: (err) || "something went wrong"
    };
  }
}

export const getReportingTable = async (datefilter) => {
  let result = {};
  try {
    const res = await axios.post(
      `${appConfig.appUrl}/elastic/dashboardreporting/`, datefilter, {
      headers: setHeader()
    }
    );
    result = res.data || {};
    return { success: true, data: result };
  } catch (err) {
    return {
      success: false,
      message: (err) || "something went wrong"
    };
  }
}

export const getEveluationTable = async (datefilter) => {
  let result = {};
  try {
    const res = await axios.post(
      `${appConfig.appUrl}/elastic/evalution/`, datefilter, {
      headers: setHeader()
    }
    );
    result = res.data || {};
    return { success: true, data: result };
  } catch (err) {
    return {
      success: false,
      message: (err) || "something went wrong"
    };
  }
}

export const getTopCallDriverTable = async (datefilter) => {
  let result = {};
  try {
    const res = await axios.post(
      `${appConfig.appUrl}/elastic/topcalldeivers/`, datefilter, {
      headers: setHeader()
    }
    );
    result = res.data || {};
    return { success: true, data: result };
  } catch (err) {
    return {
      success: false,
      message: (err) || "something went wrong"
    };
  }
}

export const getCallIndexDetails = async (datefilter) => {
  let result = {};
  try {
    const res = await axios.post(
      `${appConfig.appUrl}/elastic/callindex/`, datefilter, {
      headers: setHeader()
    }
    );
    result = res.data || {};
    return { success: true, data: result };
  } catch (err) {
    return {
      success: false,
      message: (err) || "something went wrong"
    };
  }
}

export const getCriticalNonCriticalData = async (datefilter) => {
  let result = {};
  try {
    const res = await axios.post(
      `${appConfig.appUrl}/elastic/criticalvsnoncritical/`,datefilter, {
      headers: setHeader()
    }
    );
    result = res.data || {};
    return { success: true, data: result };
  } catch (err) {
    return {
      success: false,
      message: (err) || "something went wrong"
    };
  }
}

export const getCsatCQDetails = async (datefilter) => {
  let result = {};
  try {
    const res = await axios.post(
      `${appConfig.appUrl}/elastic/cqscore/`,datefilter, {
      headers: setHeader()
    }
    );
    result = res.data || {};
    return { success: true, data: result };
  } catch (err) {
    return {
      success: false,
      message: (err) || "something went wrong"
    };
  }
}
