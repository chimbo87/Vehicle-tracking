import React from "react";
import Banner from "../../../assets/images/banner.jpg";
import Logo from "../../../assets/icons/tracking.png";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
import { Input, Checkbox } from "antd";

function Signup() {
  const navigate = useNavigate();
  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };
  return (
    <div className="container-fluid" id="login-page">
      <div class="row">
        <div class="col-lg-6 col-md-6">
          <div class="login-page-card">
            <img src={Banner} alt="banner" />
          </div>
        </div>
        <div class="col-lg-6 col-md-6">
          <div class="login-form-card">
            <form class="login-form">
              <div class="login-form-logo">
                <img src={Logo} alt="logo" />
                <h5>Tracking Company</h5>
              </div>
              <div class="login-forminput">
                <label>Email</label>
                <Input size="large" type="text" />
              </div>
              <div class="login-forminput">
                <label>Password</label>
                <Input size="large" type="password" />
              </div>
              <div class="login-forminput">
                <label>Confirm Password</label>
                <Input size="large" type="password" />
              </div>
              <Checkbox onChange={onChange}>Agree to T&Cs</Checkbox>
              <div class="login-form-btn">
                <button size="large" onClick={() => navigate("/dashboard")}>
                  Login
                </button>
                <p>
                  Already have account ?{" "}
                  <a href="#" onClick={() => navigate("/")}>
                    Login
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
