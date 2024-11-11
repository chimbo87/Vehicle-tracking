import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Checkbox, message } from "antd";
import { useSetRecoilState } from "recoil";
import userAtom from '../../../atoms/userAtom';
import Banner from "../../../assets/images/banner.jpg";
import Logo from "../../../assets/icons/tracking.png";
import "./Signup.css";

function Signup() {
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userAtom);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckbox = (e) => {
    setFormData(prev => ({
      ...prev,
      agreeToTerms: e.target.checked
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      message.error("Name is required");
      return false;
    }
    if (!formData.surname.trim()) {
      message.error("Surname is required");
      return false;
    }
    if (!formData.email.trim()) {
      message.error("Email is required");
      return false;
    }
    if (!formData.password) {
      message.error("Password is required");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      message.error("Passwords do not match");
      return false;
    }
    if (!formData.agreeToTerms) {
      message.error("Please agree to Terms and Conditions");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      setLoading(true);
      const response = await fetch("/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          surname: formData.surname,
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }

      // Save user data to localStorage and Recoil state
      localStorage.setItem("user-details", JSON.stringify(data.data));
      setUser(data.data);

      message.success("Signup successful!");
      navigate("/dashboard");
    } catch (error) {
      message.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
  <>
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
                <div className="row">
                  <div className="col-lg-6 col-md-4">
                    <label>Name</label>
                    <Input
                      size="large"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-lg-6 col-md-4">
                    <label>Surname</label>
                    <Input
                      size="large"
                      type="text"
                      name="surname"
                      value={formData.surname}
                      onChange={handleChange}
                    />
                  </div>
                </div>
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
              <div className="login-forminput">
                <label>Confirm Password</label>
                <Input
                  size="large"
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
              <Checkbox 
                onChange={handleCheckbox}
                checked={formData.agreeToTerms}
              >
                Agree to T&Cs
              </Checkbox>
              <div className="login-form-btn">
                <button 
                  size="large" 
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Signing up..." : "Sign Up"}
                </button>
                <p>
                  Already have account?{" "}
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
  </>
  );
}

export default Signup;