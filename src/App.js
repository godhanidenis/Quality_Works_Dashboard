import React, { useRef, useLayoutEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Sidebar from "./components/Header";
import Evaluation from "./pages/Evaluation";
import EvaluationTable from "./pages/EvaluationTable";
import login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Reporting from "./pages/Reporting";
import Settings from "./pages/Settings";

import PrivateRoute from "./PrivateRoute";
import "@fontsource/inter";
import "./App.css";

const App = () => {
  return (
    <div className="evaluation">
      <Router>
        {/* <PrivateRoute component={Sidebar} /> */}
        <Switch>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route path="/login" exact component={login} />
          <PrivateRoute path="/analytics" exact component={Analytics} />
          <PrivateRoute path="/evaluation" exact component={EvaluationTable} />
          <PrivateRoute path="/evaluation/:id" exact component={Evaluation} />
          <PrivateRoute path="/dashboard" exact component={Dashboard} />
          <PrivateRoute path="/reporting" exact component={Reporting} />
          <PrivateRoute path="/settings" exact component={Settings} />
        </Switch>
      </Router>
    </div>
  );
};
export default App;
