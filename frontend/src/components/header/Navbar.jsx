import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { TiMessages } from "react-icons/ti";
import usericon from "../../assets/images/person.jpeg";
import { PiBroadcastFill } from "react-icons/pi";
import { IoAnalyticsSharp } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { TbReportAnalytics } from "react-icons/tb";
import { LuTruck } from "react-icons/lu";
import { FaUser } from "react-icons/fa";
import logo from "../../assets/icons/tracking.png";
import { IoNotificationsOutline } from "react-icons/io5";
import { RiMenu3Fill } from "react-icons/ri";
import { AiOutlineSchedule } from "react-icons/ai";
import { Button, Drawer, Badge } from "antd";
import "./Navbar.css";

function Navbar() {
  const [activeLink, setActiveLink] = useState("Overview");
  const navigate = useNavigate();

  const handleLinkClick = (link, path) => {
    setActiveLink(link);
    navigate(path);
  };
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const showLoading = () => {
    setOpen(true);
    setLoading(true);

    // Simple loading mock. You should add cleanup logic in real world.
    setTimeout(() => {
      setLoading(false);
    }, 2000);
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
        <div className="navbar-user-details"  onClick={() => navigate("/dashboard/profile")}>
          <div className="navbar-user-img">
            <img src={usericon} alt="user" />
          </div>
          <div className="navbar-user-info">
            <small className="navbar-user-name">John Doe</small>
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
        title={<p>John Doe</p>}
        placement="right"
        open={open}
        loading={loading}
        onClose={() => setOpen(false)}
      >
        <div className="drawer-wrap">
         <div className="drawer-wrap-top">
         <button><FaUser className="drawer-wrap-icon"/> Profile</button>
          <button><LuTruck className="drawer-wrap-icon"/> Vehicles</button>
          <button><TbReportAnalytics className="drawer-wrap-icon"/>Reports</button>
          <button> <PiBroadcastFill className="drawer-wrap-icon"/>Trips</button>
          <button><IoAnalyticsSharp className="drawer-wrap-icon"/> Anayltics</button>
          <button><IoMdSettings className="drawer-wrap-icon"/> Settings</button>
         </div>

          <div>
            <button>Logout</button>
          </div>
        </div>
      </Drawer>
    </div>
  );
}

export default Navbar;
