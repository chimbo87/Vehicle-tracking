import React, { useState } from "react";
import Banner from "../../../assets/images/banner.jpg";
import Logo from "../../../assets/icons/tracking.png";
import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { Input, Checkbox, message } from "antd";
import userAtom from "../../../atoms/userAtom"; // Assuming userAtom is correctly imported
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userAtom);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckbox = (e) => {
    setFormData((prev) => ({
      ...prev,
      rememberMe: e.target.checked,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email.trim() || !formData.password.trim()) {
      message.error("Please enter both email and password");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Store user data in Recoil state and localStorage if 'Remember Me' is checked
      setUser(data);
      if (formData.rememberMe) {
        localStorage.setItem("user-data", JSON.stringify(data));
      }

      message.success("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      message.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid" id="login-page">
      <div className="row">
        <div className="col-lg-6 col-md-6">
          <div className="login-page-card">
            <img src={Banner} alt="banner" />
          </div>
        </div>
        <div className="col-lg-6 col-md-6">
          <div className="login-form-card">
            <form className="login-form" onSubmit={handleSubmit}>
              <div className="login-form-logo">
                <img src={Logo} alt="logo" />
                <h5>Tracking Company</h5>
              </div>
              <div className="login-forminput">
                <label>Email</label>
                <Input
                  size="large"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="login-forminput">
                <label>Password</label>
                <Input
                  size="large"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <Checkbox
                onChange={handleCheckbox}
                checked={formData.rememberMe}
              >
                Remember me
              </Checkbox>
              <div className="login-form-btn">
                <button
                  size="large"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
                <p>
                  Don't have an account?{" "}
                  <a href="#" onClick={() => navigate("signup")}>
                    Register
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

export default Login;
