import React from "react";
import {
  Button,
  Input,
  Select,
  message,
  Steps,
  theme,
  Divider,
  Form,
} from "antd";

function VehicleDetails() {
  return (
    <div>
      <div class="row">
        <div class="col-lg-12 col-md-4">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114584.73585386139!2d28.04002455!3d-26.1715215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e950c68f0406a51%3A0x238ac9d9b1d34041!2sJohannesburg!5e0!3m2!1sen!2sza!4v1713689111402!5m2!1sen!2sza"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <Divider>Vehicle Details</Divider>
        <div class="col-lg-12 col-md-4">
          <div class="vehicle-details-card">
            <div class="vehicle-details-text">
              <p>Brand</p>
              <p>Reg number</p>
              <p>Vehicle Type</p>
              <p>Status</p>
              <p>Location</p>
              <p>Destination</p>
            </div>
            <div class="vehicle-details-text">
              <p>BMW</p>
              <p>RYU8980GP</p>
              <p>Car</p>
              <p>Moving</p>
              <p>Rosebank Johannesburg</p>
              <p>Pretoria</p>
            </div>
          </div>
        </div>
        <Divider>Owner Details</Divider>
        <div class="col-lg-12 col-md-4">
        <div class="vehicle-details-card">
          <div class="vehicle-details-text">
            <p>Name</p>
            <p>Surname</p>
            <p>Phone Number</p>
            <p>Email</p>
          </div>
          <div class="vehicle-details-text">
            <p>John</p>
            <p>Doe</p>
            <p>+257800000</p>
            <p>test@example.com</p>
          </div>
          </div>
        </div>
      </div>
      <div>
        <button>Remove</button>
      </div>
    </div>
  );
}

export default VehicleDetails;
