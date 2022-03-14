import axios from "axios";
import appConfig from "../config";

export const login = async (payload) => {
  let result = {};
  try {
    const res = await axios.post(`${appConfig.appUrl}/api/login/`, payload);
    console.log(res)
    result = res.data || {};

    return { success: true, data: result };
  } catch (err) {
    console.log("error in getting info : ", err);
    return {
      success: false,
      message: err || "something went wrong",
    };
  }
};
