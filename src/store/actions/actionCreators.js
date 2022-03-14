import { allFilter } from "../../actions";
import * as actionTypes from "./actionTypes";




export const fetchAnalaticfilterdata = (updatedFilterValues) => async (dispatch) => {
console.log(updatedFilterValues)
  dispatch({ type: actionTypes.SET_FILTER_DATA, payload:updatedFilterValues});
};


export const fetchAnalaticfilter = (filterdata) => async (dispatch) => {
  dispatch({ type: actionTypes.SET_FILTER_PAYLOAD_DATA, payload:filterdata});
};

// export const fetchAnalaticsdata = () => async (dispatch) => {
//   const requestOptions = {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     // body: JSON.stringify({ id: e.target.value }),
//   };
//   const response = await authFetch(
//     `${api_base_url}/elastic/allfilter/`,
//     requestOptions
//   ).then((res) => res.json());

//   console.log(response);
// };

// export const fetchAnalaticsdataOnLob =
//   (startDate?, endDate?, lobId?) => async (dispatch) => {
//     const requestOptions = {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         start_date: startDate,
//         end_date: endDate,
//         Lob_id: lobId,
//       }),
//     };
//     const response = await authFetch(
//       `${api_base_url}/elastic/allfilter/`,
//       requestOptions
//     ).then((res) => res.json());

//     console.log(response);
//     dispatch({
//       type: actionTypes.FETCH_ANALATIC_DATA,
//       payload: response?.data,
//       startDate,
//       endDate,
//       lobId,
//     });
//   };

// export const fetchAnalaticsdataOnTeam =
//   (startDate?, endDate?, MatrixListId?, teamsId?, Agentlist?, lobvalue?) =>
//   async (dispatch) => {
//     const requestOptions = {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         start_date: startDate,
//         Agent_list: Agentlist,
//         Team_list: teamsId,
//         end_date: endDate,
//         Lob_id: lobvalue,
//         Matrix_list: MatrixListId,
//       }),
//     };
//     const response = await authFetch(
//       `${api_base_url}/elastic/allfilter/`,
//       requestOptions
//     ).then((res) => res.json());

//     console.log(response);
//     dispatch({
//       type: actionTypes.FETCH_ANALATIC_DATA,
//       payload: response?.data,
//       startDate,
//       endDate,
//       Agentlist,
//       lobvalue,
//       MatrixListId,
//       teamsId,
//     });
//   };

// export const fetchAnalaticsdataOnAgent =
//   (startDate?, endDate?, MatrixListId?, agentsId?, Teamlist?, lobvalue?) =>
//   async (dispatch) => {
//     const requestOptions = {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         start_date: startDate,
//         Agent_list: agentsId,
//         Team_list: Teamlist,
//         end_date: endDate,
//         Lob_id: lobvalue,
//         Matrix_list: MatrixListId,
//       }),
//     };
//     const response = await authFetch(
//       `${api_base_url}/elastic/allfilter/`,
//       requestOptions
//     ).then((res) => res.json());

//     console.log(response);
//     dispatch({
//       type: actionTypes.FETCH_ANALATIC_DATA,
//       payload: response?.data,
//       startDate,
//       agentsId,
//       Teamlist,
//       endDate,
//       lobvalue,
//       MatrixListId,
//     });
//   };

// export const fetchAnalaticsdataOnMatrixtype =
//   (startDate?, endDate?, matrixListId?, Agentlist?, Teamlist?, lobvalue?) =>
//   async (dispatch) => {
//     const requestOptions = {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         start_date: startDate,
//         Agent_list: Agentlist,
//         Team_list: Teamlist,
//         end_date: endDate,
//         Lob_id: lobvalue,
//         Matrix_list: matrixListId,
//       }),
//     };
//     const response = await authFetch(
//       `${api_base_url}/elastic/allfilter/`,
//       requestOptions
//     ).then((res) => res.json());

//     console.log(response);
//     dispatch({
//       type: actionTypes.FETCH_ANALATIC_DATA,
//       payload: response?.data,
//       startDate,
//       Agentlist,
//       Teamlist,
//       endDate,
//       lobvalue,
//       matrixListId,
//     });
//   };

export const storedata = (props) => async (dispatch) => {
  dispatch({ type: actionTypes.SET_FILTER_DATA, payload: props });
};
