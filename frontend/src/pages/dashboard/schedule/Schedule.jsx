import React, { useState } from "react";
import { Button, Input, Select, message, Steps, theme, Divider, Form } from "antd";
import PhoneInput from "react-phone-input-2";
import { useNavigate } from "react-router-dom";
import "react-phone-input-2/lib/style.css";
import "./Schedule.css";

const { Option } = Select;

const steps = [
  {
    title: "Vehicle Details",
    content: (formData, handleInputChange, form) => (
      <>
        <div className="row">
   <div class="schedule-head-text"> <h5>Add Vehicle On Schedule</h5></div>
          <div className="col-lg-6 col-md-4">
            <Form.Item
              name="vehicleBrand"
              rules={[{ required: true, message: 'Please enter vehicle brand' }]}
            >
              <Input
                size="large"
                type="text"
                placeholder="Vehicle Brand"
                name="vehicleBrand"
                value={formData.vehicleBrand}
                onChange={handleInputChange}
              />
            </Form.Item>
          </div>
          <div className="col-lg-6 col-md-4">
            <Form.Item
              name="vehicleType"
              rules={[{ required: true, message: 'Please select vehicle type' }]}
            >
              <Select
                size="large"
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
            </Form.Item>
          </div>
          <div className="col-lg-6 col-md-4">
            <Form.Item
              name="registrationNumber"
              rules={[{ required: true, message: 'Please enter registration number' }]}
            >
              <Input
                size="large"
                placeholder="Registration Number"
                name="registrationNumber"
                value={formData.registrationNumber}
                onChange={handleInputChange}
              />
            </Form.Item>
          </div>
          <div className="col-lg-6 col-md-4">
            <Form.Item
              name="vehicleStatus"
              rules={[{ required: true, message: 'Please select vehicle status' }]}
            >
              <Select
                size="large"
                placeholder="Select status"
                style={{ width: "100%" }}
                value={formData.vehicleStatus}
                onChange={(value) => handleInputChange({ target: { name: "vehicleStatus", value } })}
              >
                <Option value="moving">Moving</Option>
                <Option value="parked">Parked</Option>
                <Option value="idle">Idle</Option>
              </Select>
            </Form.Item>
          </div>
        </div>
        <Divider>Add Vehicle Location</Divider>
        <div className="row">
          <div className="col-lg-6 col-md-4">
            <Form.Item
              name="address"
              rules={[{ required: true, message: 'Please enter address' }]}
            >
              <Input
                size="large"
                placeholder="Address e.g., Road, Street"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
              />
            </Form.Item>
          </div>
          <div className="col-lg-6 col-md-4">
            <Form.Item
              name="town"
              rules={[{ required: true, message: 'Please enter town/city' }]}
            >
              <Input
                size="large"
                placeholder="Town / City"
                name="town"
                value={formData.town}
                onChange={handleInputChange}
              />
            </Form.Item>
          </div>
          <div className="col-lg-6 col-md-4">
            <Form.Item
              name="country"
              rules={[{ required: true, message: 'Please select country' }]}
            >
              <Select
                size="large"
                placeholder="Select Country"
                style={{ width: "100%" }}
                value={formData.country}
                onChange={(value) => handleInputChange({ target: { name: "country", value } })}
              >
                <Option value="southAfrica">South Africa</Option>
                <Option value="botswana">Botswana</Option>
                <Option value="zimbabwe">Zimbabwe</Option>
                <Option value="namibia">Namibia</Option>
                <Option value="zambia">Zambia</Option>
                <Option value="mozambique">Mozambique</Option>
              </Select>
            </Form.Item>
          </div>
          <div className="col-lg-6 col-md-4">
            <Form.Item
              name="destination"
              rules={[{ required: true, message: 'Please enter destination' }]}
            >
              <Input
                size="large"
                placeholder="Destination"
                name="destination"
                value={formData.destination}
                onChange={handleInputChange}
              />
            </Form.Item>
          </div>
          <div className="col-lg-6 col-md-4">
            <Form.Item
              name="longitude"
              rules={[
                { required: true, message: 'Please enter longitude' },
                {
                  validator: (_, value) => {
                    const num = parseFloat(value);
                    if (isNaN(num)) {
                      return Promise.reject('Longitude must be a number');
                    }
                    if (num < -180 || num > 180) {
                      return Promise.reject('Longitude must be between -180 and 180');
                    }
                    return Promise.resolve();
                  }
                }
              ]}
            >
              <Input
                size="large"
                placeholder="Longitude (-180 to 180)"
                name="longitude"
                value={formData.longitude}
                onChange={handleInputChange}
              />
            </Form.Item>
          </div>
          <div className="col-lg-6 col-md-4">
            <Form.Item
              name="latitude"
              rules={[
                { required: true, message: 'Please enter latitude' },
                {
                  validator: (_, value) => {
                    const num = parseFloat(value);
                    if (isNaN(num)) {
                      return Promise.reject('Latitude must be a number');
                    }
                    if (num < -90 || num > 90) {
                      return Promise.reject('Latitude must be between -90 and 90');
                    }
                    return Promise.resolve();
                  }
                }
              ]}
            >
              <Input
                size="large"
                placeholder="Latitude (-90 to 90)"
                name="latitude"
                value={formData.latitude}
                onChange={handleInputChange}
              />
            </Form.Item>
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
          <Form.Item
            name="name"
            rules={[{ required: true, message: 'Please enter name' }]}
          >
            <Input
              placeholder="Name"
              size="large"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </Form.Item>
        </div>
        <div className="col-lg-6 col-md-4">
          <Form.Item
            name="surname"
            rules={[{ required: true, message: 'Please enter surname' }]}
          >
            <Input
              placeholder="Surname"
              size="large"
              name="surname"
              value={formData.surname}
              onChange={handleInputChange}
            />
          </Form.Item>
        </div>
        <div className="col-lg-6 col-md-4">
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please enter email' },
              { type: 'email', message: 'Please enter a valid email' }
            ]}
          >
            <Input
              placeholder="Email"
              size="large"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </Form.Item>
        </div>
        <div className="col-lg-6 col-md-4">
          <Form.Item
            name="phoneNumber"
            rules={[{ required: true, message: 'Please enter phone number' }]}
          >
            <PhoneInput
              country={"za"}
              inputProps={{
                required: true,
                autoFocus: false,
              }}
              value={formData.phoneNumber}
              onChange={handlePhoneChange}
              style={{ width: "100%" }}
            />
          </Form.Item>
        </div>
      </div>
    ),
  },
];

function Schedule() {
  const navigate = useNavigate();
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    vehicleBrand: "", vehicleType: "", registrationNumber: "", vehicleStatus: "",
    address: "", town: "", country: "", destination: "", name: "", surname: "",
    email: "", phoneNumber: "", longitude: "", latitude: ""
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const newValue = name === "longitude" || name === "latitude" ? parseFloat(value) : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue
    }));
  };

  const handlePhoneChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      phoneNumber: value,
    }));
  };

  const validateCurrentStep = async () => {
    try {
      await form.validateFields();
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      const isValid = await validateCurrentStep();
      if (!isValid) {
        message.error('Please fill in all required fields correctly');
        return;
      }

      const scheduleData = {
        vehicleBrand: formData.vehicleBrand,
        vehicleType: formData.vehicleType,
        registrationNumber: formData.registrationNumber,
        vehicleStatus: formData.vehicleStatus,
        position: formData.address,
        town: formData.town,
        country: formData.country,
        destination: formData.destination,
        name: formData.name,
        surname: formData.surname,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        longitude: parseFloat(formData.longitude),
        latitude: parseFloat(formData.latitude)
      };

      const requiredFields = [
        'vehicleBrand', 'vehicleType', 'registrationNumber', 'vehicleStatus', 'position',
        'town', 'country', 'destination', 'name', 'surname', 'email', 'phoneNumber',
        'longitude', 'latitude'
      ];

      const missingFields = requiredFields.filter(field => !scheduleData[field]);
      if (missingFields.length > 0) {
        message.error(`Missing required fields: ${missingFields.join(', ')}`);
        return;
      }

      if (isNaN(scheduleData.longitude) || isNaN(scheduleData.latitude)) {
        message.error('Longitude and Latitude must be valid numbers');
        return;
      }
      if (scheduleData.longitude < -180 || scheduleData.longitude > 180) {
        message.error('Longitude must be between -180 and 180');
        return;
      }
      if (scheduleData.latitude < -90 || scheduleData.latitude > 90) {
        message.error('Latitude must be between -90 and 90');
        return;
      }

      const response = await fetch('/api/schedules/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(scheduleData)
      });

      const data = await response.json();
      if (response.ok) {
        message.success('Schedule created successfully');
        form.resetFields();
        setFormData({
          vehicleBrand: '', vehicleType: '', registrationNumber: '', vehicleStatus: '',
          address: '', town: '', country: '', destination: '', name: '', surname: '',
          email: '', phoneNumber: '', longitude: '', latitude: ''
        });
        setCurrent(0);
        navigate("/dashboard/vehicles");
      } else {
        throw new Error(data.message || 'Failed to create schedule');
      }
    } catch (error) {
      message.error(error.message || 'Error creating schedule');
    } finally {
      setIsSubmitting(false);
    }
  };

  const next = async () => {
    const isValid = await validateCurrentStep();
    if (isValid) {
      setCurrent(current + 1);
    } else {
      message.error('Please fill in all required fields correctly');
    }
  };

  const prev = () => setCurrent(current - 1);

  return (
    <div id="schedule-container">
      <div className="steps-content">
        <Form form={form} layout="vertical">
          {steps[current].content(formData, handleInputChange, handlePhoneChange, form)}
        </Form>
      </div>
      <div className="steps-action">
        {current < steps.length - 1 && (
          <Button type="primary" onClick={next} style={{ marginRight: 8 }}  size="large">
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button size="large"
            type="primary"
            onClick={handleSubmit}
            loading={isSubmitting}
          >
            Submit
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: "0 8px" }} onClick={prev}  size="large">
            Previous
          </Button>
        )}
      </div>
    </div>
  );
}

export default Schedule;
