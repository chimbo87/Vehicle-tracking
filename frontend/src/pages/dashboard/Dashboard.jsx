import React from "react";
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

  return (
    <div className="container-fluid" id="dashboard-page">
      <Navbar />
      <div className="row">
        <div className="col-lg-2 col-md-4">
          <div className="dashboard-wrapper">
            <div className="dashboard-links">
              <button onClick={() => navigate("/dashboard/overview")}>
                <RxDashboard className="dashboard-links-icon" /> Dashboard
              </button>
              <button onClick={() => navigate("/dashboard/vehicles")}>
                <BsTruck className="dashboard-links-icon" /> Vehicles
              </button>
              <button onClick={() => navigate("/dashboard/reports")}>
                <TbReportSearch className="dashboard-links-icon" /> Reports
              </button>
              <button onClick={() => navigate("/dashboard/analytics")}>
                <IoAnalyticsOutline className="dashboard-links-icon" /> Analytics
              </button>
              <button onClick={() => navigate("/dashboard/trips")}>
                <RiRoadMapLine className="dashboard-links-icon" /> Trips
              </button>
              <button onClick={() => navigate("/dashboard/settings")}>
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
        <div className="col-lg-10 col-md-4">
          <div className="dashboard-views">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
