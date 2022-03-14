import React from "react";
import WeekPicker from "./weekPicker";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import "moment/locale/de";

export const theme = createTheme();
export default function DatePicker() {
  return (
    <div>
      <MuiThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={MomentUtils} locale="en">
          <WeekPicker />
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
      {/* <MuiPickersUtilsProvider utils={MomentUtils} locale="en">
     
        </MuiPickersUtilsProvider> */}
    </div>
  );
}
