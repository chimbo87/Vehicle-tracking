import React, { useState } from "react";
import { Button, Input, Select, message, Steps, theme, Divider } from "antd";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./Schedule.css";

const { Option } = Select;

const steps = [
  {
    title: "Vehicle Details",
    content: (formData, handleInputChange) => (
      <>
        <div className="row">
          <div className="col-lg-6 col-md-4">
            <div className="vehicle-details-input">
              <Input
                size="large"
                type="text"
                name="vehicleBrand"
                placeholder="Vehicle Brand"
                value={formData.vehicleBrand}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="col-lg-6 col-md-4">
            <div className="vehicle-details-input">
              <Select
                size="large"
                name="vehicleType"
                placeholder="Select type"
                style={{ width: "100%" }}
                value={formData.vehicleType}
                onChange={(value) => handleInputChange({ target: { name: "vehicleType", value } })}
              >
                <Option value="car">Car</Option>
                <Option value="truck">Truck</Option>
                <Option value="bus">Bus</Option>
                <Option value="motorcycle">Motorcycle</Option>
              </Select>
            </div>
          </div>
          <div className="col-lg-6 col-md-4">
            <div className="vehicle-details-input">
              <Input
                size="large"
                name="registrationNumber"
                placeholder="Registration Number"
                value={formData.registrationNumber}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="col-lg-6 col-md-4">
            <Select
              size="large"
              name="vehicleStatus"
              placeholder="Select status"
              style={{ width: "100%", marginTop: "10px" }}
              value={formData.vehicleStatus}
              onChange={(value) => handleInputChange({ target: { name: "vehicleStatus", value } })}
            >
              <Option value="moving">Moving</Option>
              <Option value="parked">Parked</Option>
              <Option value="idle">Idle</Option>
            </Select>
          </div>
        </div>
        <Divider>Add Vehicle Location</Divider>
        <div className="row">
          <div className="col-lg-6 col-md-4">
            <div className="vehicle-details-input">
              <Input
                size="large"
                name="position"
                placeholder="Position e.g Road, Street etc"
                value={formData.position}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="col-lg-6 col-md-4">
            <div className="vehicle-details-input">
              <Input
                size="large"
                name="town"
                placeholder="Town / City"
                value={formData.town}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="col-lg-6 col-md-4">
            <div className="vehicle-details-input">
              <Select
                size="large"
                name="country"
                placeholder="Select Country"
                style={{ width: "100%" }}
                value={formData.country}
                onChange={(value) => handleInputChange({ target: { name: "country", value } })}
              >
                <Option value="southAfrica">South Africa</Option>
                <Option value="botswana">Botswana</Option>
                <Option value="zimbabwe">Zimbabwe</Option>
                <Option value="zambia">Zambia</Option>
                <Option value="mozambique">Mozambique</Option>
              </Select>
            </div>
          </div>
          <div className="col-lg-6 col-md-4">
            <div className="vehicle-details-input">
              <Input
                size="large"
                name="destination"
                placeholder="Destination"
                value={formData.destination}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    title: "Owner Details",
    content: (formData, handleInputChange, handlePhoneChange) => (
      <div className="row">
        <div className="col-lg-6 col-md-4">
          <div className="vehicle-details-input">
            <Input
              placeholder="Name"
              size="large"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="col-lg-6 col-md-4">
          <div className="vehicle-details-input">
            <Input
              placeholder="Surname"
              size="large"
              name="surname"
              value={formData.surname}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="col-lg-6 col-md-4">
          <div className="vehicle-details-input">
            <Input
              placeholder="Email"
              size="large"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="col-lg-6 col-md-4">
          <div className="vehicle-details-input">
            <PhoneInput
              country={"us"}
              inputProps={{
                name: "phoneNumber",
                required: true,
                autoFocus: false,
              }}
              value={formData.phoneNumber}
              onChange={handlePhoneChange}
              style={{ width: "100%" }}
            />
          </div>
        </div>
      </div>
    ),
  },
];

function Schedule() {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [formData, setFormData] = useState({
    vehicleBrand: '',
    vehicleType: '',
    registrationNumber: '',
    vehicleStatus: '',
    position: '',
    town: '',
    country: '',
    destination: '',
    name: '',
    surname: '',
    email: '',
    phoneNumber: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handlePhoneChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      phoneNumber: value
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/schedules/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        message.success('Schedule created successfully');
        setFormData({
          vehicleBrand: '',
          vehicleType: '',
          registrationNumber: '',
          vehicleStatus: '',
          position: '',
          town: '',
          country: '',
          destination: '',
          name: '',
          surname: '',
          email: '',
          phoneNumber: ''
        });
        setCurrent(0);
      } else {
        const error = await response.json();
        message.error(`Error creating schedule: ${error.message}`);
      }
    } catch (error) {
      message.error(`Error creating schedule: ${error.message}`);
    }
  };

  const next = () => setCurrent(current + 1);
  const prev = () => setCurrent(current - 1);

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  return (
    <div className="schedule-page">
      <Steps current={current} items={items} />
      <div style={{ textAlign: "start", color: token.colorTextTertiary, backgroundColor: token.colorFillAlter, borderRadius: token.borderRadiusLG, marginTop: 16 }}>
        {steps[current].content(formData, handleInputChange, handlePhoneChange)}
      </div>
      <div style={{ marginTop: 24 }}>
        {current < steps.length - 1 && <Button type="primary" onClick={next}>Next</Button>}
        {current === steps.length - 1 && <Button type="primary" onClick={handleSubmit}>Submit</Button>}
        {current > 0 && <Button style={{ margin: "0 8px" }} onClick={prev}>Previous</Button>}
      </div>
    </div>
  );
}

export default Schedule;
