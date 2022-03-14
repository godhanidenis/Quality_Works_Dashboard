import axios from "axios";
import appConfig from "../config";
import { setHeader } from "../utils/comman";
import Cookies from "js-cookie";
import { authFetch } from "../Provider/AuthProvider";



export const allFilters = () => {
  return authFetch(`${appConfig.appUrl}/elastic/allfilter/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  }).then((res) => res.json());
};

const _token = localStorage.getItem("token");
export const allFilter = async(filterData) => {
    let result = {};
    try {
        const res = await axios.post(
            `${appConfig.appUrl}/elastic/allfilter/`, filterData, {
                headers: {'Authorization': `Bearer ${_token}`,
                 "X-CSRFToken": Cookies.get("csrftoken") || ""}
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

export const getCustomerData  = async(filterData) => {
    let result = {};
    try {
        const res = await axios.post(
            `${appConfig.appUrl}/elastic/customer/`, filterData, {
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