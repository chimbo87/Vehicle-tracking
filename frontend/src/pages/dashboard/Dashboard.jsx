import React from "react";
import "./Dashboard.css";
import { RiLogoutBoxLine } from "react-icons/ri";
import { TbReportSearch } from "react-icons/tb";
import { RxDashboard } from "react-icons/rx";
import { IoAnalyticsOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { RiRoadMapLine } from "react-icons/ri";
import { BsTruck } from "react-icons/bs";
import { Outlet } from "react-router-dom";

function Dashboard() {
  return (
    <div className="container-fluid" id="dashboard-page">
      <div class="row">
        <div class="col-lg-2 col-md-4">
          <div class="dashboard-wrapper">
            <div class="dashboard-links">
              <button>
                <RxDashboard class="dashboard-links-icon" /> Dashboard
              </button>
              <button>
                {" "}
                <BsTruck class="dashboard-links-icon" /> Vehicles
              </button>
              <button>
                <TbReportSearch class="dashboard-links-icon" /> Reports
              </button>
              <button>
                <IoAnalyticsOutline class="dashboard-links-icon" /> Analytics
              </button>
              <button>
                <RiRoadMapLine class="dashboard-links-icon" /> Trips
              </button>
              <button>
                <IoSettingsOutline class="dashboard-links-icon" /> Settings
              </button>
            </div>
            <div class="dashboard-logout">
              <button>
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
