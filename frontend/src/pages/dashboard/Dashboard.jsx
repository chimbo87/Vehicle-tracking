
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { RiLogoutBoxLine } from "react-icons/ri";
import { TbReportSearch } from "react-icons/tb";
import { RxDashboard } from "react-icons/rx";
import { IoAnalyticsOutline, IoSettingsOutline } from "react-icons/io5";
import { RiRoadMapLine } from "react-icons/ri";
import { BsTruck } from "react-icons/bs";
import { Outlet } from "react-router-dom";
import { useResetRecoilState } from "recoil";
import { message } from "antd";
import userAtom from "../../atoms/userAtom";
import Navbar from "../../components/header/Navbar";

function Dashboard() {
  const navigate = useNavigate();
  const resetUser = useResetRecoilState(userAtom);
  const [activeButton, setActiveButton] = useState("overview");

  const handleNavigation = (path, buttonName) => {
    navigate(`/dashboard/${path}`);
    setActiveButton(buttonName);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/users/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Logout failed");
      }

      // Clear user data from Recoil state and localStorage
      resetUser();
      localStorage.removeItem("user-data");

      message.success("Logout successful!");
      navigate("/");
    } catch (error) {
      message.error(error.message || "Something went wrong during logout");
    }
  };

  // Style for active button
  const getButtonStyle = (buttonName) => {
    return {
      backgroundColor: activeButton === buttonName ? "#0897d4" : "transparent",
      color: activeButton === buttonName ? "white" : "inherit",
    };
  };
  return (
    <div className="container-fluid">
      <Navbar />
      <div id="theDashboard">
        <div id="dashboardSideBar">
   
            <div className="dashboard-links">
        <div>
        <button
                onClick={() => handleNavigation("overview", "overview")}
                style={getButtonStyle("overview")}
              >
                <RxDashboard className="dashboard-links-icon" /> Administration
              </button>
              <button
                onClick={() => handleNavigation("vehicles", "vehicles")}
                style={getButtonStyle("vehicles")}
              >
                <BsTruck className="dashboard-links-icon" /> Vehicles
              </button>
              <button
                onClick={() => handleNavigation("reports", "reports")}
                style={getButtonStyle("reports")}
              >
                <TbReportSearch className="dashboard-links-icon" /> Reports
              </button>
              <button
                onClick={() => handleNavigation("analytics", "analytics")}
                style={getButtonStyle("analytics")}
              >
                <IoAnalyticsOutline className="dashboard-links-icon" />{" "}
                Analytics
              </button>
              <button
                onClick={() => handleNavigation("trips", "trips")}
                style={getButtonStyle("trips")}
              >
                <RiRoadMapLine className="dashboard-links-icon" /> Trips
              </button>
              <button
                onClick={() => handleNavigation("settings", "settings")}
                style={getButtonStyle("settings")}
              >
                <IoSettingsOutline className="dashboard-links-icon" /> Settings
              </button>
        </div>
              <div className="dashboard-logout">
              <button onClick={handleLogout}>
                <RiLogoutBoxLine className="dashboard-links-icon" /> Logout
              </button>
            </div>
            </div>
         
      
        </div>

        <div id="dashBoardContent">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
