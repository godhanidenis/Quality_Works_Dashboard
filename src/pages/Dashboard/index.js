import React from "react";
import { withRouter } from "react-router-dom";
import Statistics from "./statistics";
import Reporting from "./reporting";
import Settings from "./settings";
import Graph from "./graph";
import Header from "../../components/Header";
import Table from "./tables";
import CsatCqgraph from "./CsatCqgraph";

const Dashboard = (props) => {
  window.scrollTo(0, 0);
  return (
    <div className="dashboard">
      <div className="dashboard-body">
        <Header {...props} />
        <Statistics {...props} />
        <CsatCqgraph {...props} />
        <Graph {...props} />
        <Table  {...props}/>
        {/* <Reporting {...props} />
        <Settings {...props} /> */}
      </div>
    </div>
  );
};

export default withRouter(Dashboard);
