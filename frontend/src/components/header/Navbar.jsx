import React, { useState } from "react";
import { useNavigate} from "react-router-dom";
import { GoHome } from "react-icons/go";
import { TiMessages } from "react-icons/ti";
import usericon from "../../assets/images/person.jpeg";
import logo from "../../assets/icons/tracking.png";
import { IoNotificationsOutline } from "react-icons/io5";
import { AiOutlineSchedule } from "react-icons/ai";
import {Badge} from "antd";
import "./Navbar.css";

function Navbar() {
  
  const [activeLink, setActiveLink] = useState("Overview");
  const navigate = useNavigate();

  const handleLinkClick = (link, path) => {
    setActiveLink(link);
    navigate(path);
  };

  return (
    <div className="navbar-container">
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
          onClick={() => handleLinkClick("Notifications", "/dashboard/notifications")}
        >
          <Badge count={99}>
            <IoNotificationsOutline className="navbar-links-icon" />
          </Badge>

          <a href="#">Notifications</a>
        </div>
      </div>
      <div className="navbar-user-details">
        <div className="navbar-user-img">
          <img src={usericon} alt="user" />
        </div>
        <div className="navbar-user-info">
          <small className="navbar-user-name">John Doe</small>
          <small className="navbar-user-title">Technical Officer</small>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
