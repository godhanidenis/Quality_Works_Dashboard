import * as actionTypes from "../actions/actionTypes";

const initialState = {
  data: {},
};

const FilterReducer = (
  state = initialState,
  { type, payload }
) => {
  console.log(type, payload);
  switch (type) {
    case actionTypes.SET_FILTER_PAYLOAD_DATA:
      return {
        ...state,
        data: payload,
      };
  }
  return state;
};

export default FilterReducer;
