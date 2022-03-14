import React from "react";
import Select, { components } from "react-select";
import "./customSelectInput.scss";
import Selectteamflt from "../../../assest/sidebarfilter/selectTeam.svg";
import Selectagentflt from "../../../assest/sidebarfilter/selectAgent.svg";
import Selectdateflt from "../../../assest/sidebarfilter/selectDate.svg";
import Selectlobflt from "../../../assest/sidebarfilter/selectLob.svg";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";

import Grid from "@mui/material/Grid";

const optionss = [
  {
    value: "England",
    label: "England",
    icon: "../../../assest/sidebarfilter/selectTeam.svg",
  },
  {
    value: "Germany",
    label: "Germany",
    icon: "../../../assest/sidebarfilter/selectTeam.svg",
  },
];

const iconlist = [Selectdateflt, Selectlobflt, Selectteamflt, Selectagentflt];

const { Option } = components;
const customStyles = {
  control: (base, state) => ({
    ...base,
    fontFamily: "helveticaneue",
    color: "#667685",
    fontStyle: "Roman",
    display: "flex",
    webkitLineClamp: 3,
    borderRadius: "10px",
    backgroundColor: state.isFocused ? "#ffffff" : "#F5F8FA",
    borderColor: state.isFocused ? "#667685" : "#F1F2F6",
    boxShadow: state.isFocused ? "#667685" : "#F1F2F6",
    "&:hover": {
      borderColor: state.isFocused ? "#667685" : "rgb(179, 179, 179)",
    },
    "& .indicatorContainer": {
      padding: "0px !important",
      paddingRight: "8px",
    },
    "& .vyrill__single-value.css-qc6sy-singleValue": {
      marginLeft: "12px",
      color: "#1675e0",
      fontWeight:600
    },
  }),
  placeholder: (base) => ({
    ...base,
    color: "#667685",
    fontSize: ".875rem !important",
    letterSpacing: "0.00938em",
    fontFamily: "helveticaneue",
    paddinRight: "0px",
    marginLeft: "8px",
  }),
  option: (provided, state) => ({
    ...provided,
    textAlign: "left",
    color: "#667685",
   
    paddinLeft: "0px",
  }),
  valueContainer: (base) => ({
    ...base,
    paddingLeft: "22px !important",
    display: "inline-flex !important",
    fontSize: "13px",
    flexDirection: "row",
    flexWrap: "nowrap",
    "& .css-1rhbuit-multiValue": {
      backgroundColor: "transparent",
      minWidth: "60px",
      display: "-webkit-inline-box",
    },
  }),
};

const CustomSelectInput = ({
  options,
  selectedValue,
  handleSelectChange,
  customClass,
  placeholder,
  icon,
  isMulti,
}) => {
  const ValueContainer = ({ children, ...props }) => {
    // console.log(props);
    // console.log(children);
    return (
      components.ValueContainer && (
        <components.ValueContainer {...props}>
          {!!children && (
            <img
              src={iconlist[icon]}
              style={{ position: "absolute", left: 6, width: "9%" }}
              alt={props.text}
            />
          )}
          {children}
        </components.ValueContainer>
      )
    );
  };

  return (
    <div>
      {isMulti ? (
        <Select
          options={options}
          styles={customStyles}
          className={`inputFilter ${customClass}`}
          onChange={handleSelectChange}
          placeholder={placeholder}
          value={selectedValue}
          isSearchable={false}
          hideSelectedOptions={false}
          components={{
            ValueContainer,
            IndicatorSeparator: () => null,
          }}
          isMulti
        />
      ) : (
        <Select
          options={options}
          className={`inputFilter ${customClass}`}
          styles={customStyles}
          // components={{ IndicatorSeparator: () => null }}
          onChange={handleSelectChange}
          value={selectedValue}
          classNamePrefix="vyrill"
          isSearchable={false}
          components={{
            ValueContainer,
            IndicatorSeparator: () => null,
          }}
          placeholder={placeholder}
        />
      )}
    </div>
  );
};

const PlaceholderComponent = (props) => {
  console.log("placeholder", props);
  return (
    <Grid container spacing={1}>
      <Grid item xs={2}>
        <img src={Selectteamflt} style={{ width: "115%" }} alt={props.text} />
      </Grid>
      <Grid item xs={10}>
        &nbsp;{props.text}
      </Grid>
    </Grid>
    // <div style={{ display: "flex" }}>

    //   <div>
    //     <img src={Selectteamflt} style={{ width: 20 }} alt={props.text} />
    //   </div>
    //   <div>&nbsp;{props.text}</div>
    // </div>
  );
};

export default CustomSelectInput;
