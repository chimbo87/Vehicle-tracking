import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { TiMessages } from "react-icons/ti";
import usericon from "../../assets/images/person.jpeg";
import { PiBroadcastFill } from "react-icons/pi";
import { IoAnalyticsSharp, IoNotificationsOutline } from "react-icons/io5";
import { RiLogoutBoxLine } from "react-icons/ri";
import { IoMdSettings } from "react-icons/io";
import { TbReportAnalytics } from "react-icons/tb";
import { LuTruck } from "react-icons/lu";
import { FaUser } from "react-icons/fa";
import logo from "../../assets/icons/tracking.png";
import { RiMenu3Fill } from "react-icons/ri";
import { AiOutlineSchedule } from "react-icons/ai";
import { useRecoilState, useResetRecoilState } from "recoil";
import userAtom from "../../atoms/userAtom";
import { Button, Drawer, Badge, message } from "antd";
import "./Navbar.css";

function Navbar() {
  const [profile] = useRecoilState(userAtom);
  const resetUser = useResetRecoilState(userAtom); // Add this line
  const [activeLink, setActiveLink] = useState("Overview");
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleLinkClick = (link, path) => {
    setActiveLink(link);
    navigate(path);
  };

  const showLoading = () => {
    setOpen(true);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
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
      setOpen(false); // Close the drawer after successful logout

      message.success("Logout successful!");
      navigate("/");
    } catch (error) {
      message.error(error.message || "Something went wrong during logout");
    }
  };

  // Helper function to handle navigation and drawer closing
  const handleDrawerClick = (path) => {
    setOpen(false); // Close the drawer
    navigate(path); // Navigate to the specified path
  };

  return (
    <div className="navbar-container">
      <div className="navbar-container-top">
        <div className="logo">
          <img src={logo} alt="logo" />
          <h6>VehicleTracking</h6>
        </div>

        <div className="navbar-card-links">
          <div
            className={`navbar-links ${
              activeLink === "Overview" ? "active" : ""
            }`}
            onClick={() => handleLinkClick("Overview", "/dashboard/overview")}
          >
            <GoHome className="navbar-links-icon" />
            <a href="#">Overview</a>
          </div>
          <div
            className={`navbar-links ${
              activeLink === "Messages" ? "active" : ""
            }`}
            onClick={() => handleLinkClick("Messages", "/dashboard/messages")}
          >
            <Badge count={99}>
              <TiMessages className="navbar-links-icon" />
            </Badge>
            <a href="#">Messages</a>
          </div>
          <div
            className={`navbar-links ${
              activeLink === "Schedule" ? "active" : ""
            }`}
            onClick={() => handleLinkClick("Schedule", "/dashboard/schedule")}
          >
            <AiOutlineSchedule className="navbar-links-icon" />
            <a href="#">Schedule</a>
          </div>
          <div
            className={`navbar-links ${
              activeLink === "Notifications" ? "active" : ""
            }`}
            onClick={() =>
              handleLinkClick("Notifications", "/dashboard/notifications")
            }
          >
            <Badge count={99}>
              <IoNotificationsOutline className="navbar-links-icon" />
            </Badge>
            <a href="#">Notifications</a>
          </div>
        </div>

        <div
          className="navbar-user-details"
          onClick={() => navigate("/dashboard/profile")}
        >
          <div className="navbar-user-img">
            <img src={usericon} alt="user" />
          </div>
          <div className="navbar-user-info">
            <small className="navbar-user-name">
              {profile?.name || "User Name"}
            </small>
            <small className="navbar-user-title">Technical Officer</small>
          </div>
          <div className="navbar-user-menu">
            <RiMenu3Fill
              className="navbar-user-menuicon"
              onClick={showLoading}
            />
          </div>
        </div>
      </div>

      <div className="navbar-container-bottom">
        <div className="navbar-card-bottom">
          <div
            className={`navbar-links ${
              activeLink === "Overview" ? "active" : ""
            }`}
            onClick={() => handleLinkClick("Overview", "/dashboard/overview")}
          >
            <GoHome className="navbar-links-icon" />
            <a href="#">Overview</a>
          </div>
          <div
            className={`navbar-links ${
              activeLink === "Messages" ? "active" : ""
            }`}
            onClick={() => handleLinkClick("Messages", "/dashboard/messages")}
          >
            <Badge count={99}>
              <TiMessages className="navbar-links-icon" />
            </Badge>
            <a href="#">Messages</a>
          </div>
          <div
            className={`navbar-links ${
              activeLink === "Schedule" ? "active" : ""
            }`}
            onClick={() => handleLinkClick("Schedule", "/dashboard/schedule")}
          >
            <AiOutlineSchedule className="navbar-links-icon" />
            <a href="#">Schedule</a>
          </div>
          <div
            className={`navbar-links ${
              activeLink === "Notifications" ? "active" : ""
            }`}
            onClick={() =>
              handleLinkClick("Notifications", "/dashboard/notifications")
            }
          >
            <Badge count={99}>
              <IoNotificationsOutline className="navbar-links-icon" />
            </Badge>
            <a href="#">Notifications</a>
          </div>
        </div>
      </div>

      <Drawer
        closable
        destroyOnClose
        title={<p>{profile?.name || "User Name"}</p>}
        placement="right"
        open={open}
        onClose={() => setOpen(false)}
      >
        <div className="drawer-wrap">
          <div className="drawer-wrap-top">
            <button onClick={() => handleDrawerClick("/dashboard/profile")}>
              <FaUser className="drawer-wrap-icon" /> Profile
            </button>
            <button onClick={() => handleDrawerClick("/dashboard/vehicles")}>
              <LuTruck className="drawer-wrap-icon" /> Vehicles
            </button>
            <button onClick={() => handleDrawerClick("/dashboard/reports")}>
              <TbReportAnalytics className="drawer-wrap-icon" /> Reports
            </button>
            <button onClick={() => handleDrawerClick("/dashboard/trips")}>
              <PiBroadcastFill className="drawer-wrap-icon" /> Trips
            </button>
            <button onClick={() => handleDrawerClick("/dashboard/analytics")}>
              <IoAnalyticsSharp className="drawer-wrap-icon" /> Analytics
            </button>
            <button onClick={() => handleDrawerClick("/dashboard/settings")}>
              <IoMdSettings className="drawer-wrap-icon" /> Settings
            </button>
          </div>
          <div className="drawer-wrap-top">
            <button onClick={handleLogout}>
              <RiLogoutBoxLine className="drawer-wrap-icon" /> Logout
            </button>
          </div>
        </div>
      </Drawer>
    </div>
  );
}

export default Navbar;