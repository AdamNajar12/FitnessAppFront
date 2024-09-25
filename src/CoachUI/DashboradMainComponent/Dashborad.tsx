import React, { Component } from "react";
import DashboardSlider from "../DashboardComponent/DashboradSlider";
import CoachDashboard from "../Satistics/PatientStatistics";


class Dashboard extends Component{

render(){
    return(
      <DashboardSlider>
    <CoachDashboard />

     </DashboardSlider>
    )
}

}export default Dashboard