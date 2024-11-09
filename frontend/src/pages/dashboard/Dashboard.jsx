import React from "react";
import { useNavigate} from "react-router-dom";
import "./Dashboard.css";
import { RiLogoutBoxLine } from "react-icons/ri";
import { TbReportSearch } from "react-icons/tb";
import { RxDashboard } from "react-icons/rx";
import { IoAnalyticsOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { RiRoadMapLine } from "react-icons/ri";
import { BsTruck } from "react-icons/bs";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/header/Navbar";

function Dashboard() {
  const navigate = useNavigate();
  return (
    <div className="container-fluid" id="dashboard-page">
        <Navbar/>
      <div class="row">
        <div class="col-lg-2 col-md-4">
          <div class="dashboard-wrapper">
            <div class="dashboard-links">
              <button     onClick={() => navigate("/dashboard/overview")}>
                <RxDashboard class="dashboard-links-icon" /> Dashboard
              </button>
              <button onClick={() => navigate("/dashboard/vehicles")}>
                {" "}
                <BsTruck class="dashboard-links-icon" /> Vehicles
              </button>
              <button onClick={() => navigate("/dashboard/reports")}>
                <TbReportSearch class="dashboard-links-icon" /> Reports
              </button>
              <button onClick={() => navigate("/dashboard/analytics")}>
                <IoAnalyticsOutline class="dashboard-links-icon" /> Analytics
              </button>
              <button onClick={() => navigate("/dashboard/trips")}>
                <RiRoadMapLine class="dashboard-links-icon" /> Trips
              </button>
              <button onClick={() => navigate("/dashboard/settings")}>
                <IoSettingsOutline class="dashboard-links-icon" /> Settings
              </button>
            </div>
            <div class="dashboard-logout">
              <button onClick={() => navigate("/")}>
                <RiLogoutBoxLine class="dashboard-links-icon" /> logout
              </button>
            </div>
          </div>
        </div>
        <div class="col-lg-10 col-md-4">
          <div class="dashboard-views">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
