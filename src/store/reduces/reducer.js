import * as actionTypes from "../actions/actionTypes";

const initialState = {
  data: [],
};

const Analayticsreducer = (state = initialState, { type, payload }) => {
  console.log(type, payload);
  switch (type) {
    case actionTypes.SET_FILTER_DATA:
      return {
        ...state,
        data: JSON.parse(payload),
      };
  }
  return state;
};



export default Analayticsreducer;
