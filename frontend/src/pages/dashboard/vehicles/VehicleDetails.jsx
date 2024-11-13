import React, { useEffect, useState } from "react";
import {
  Button,
  Input,
  Select,
  message,
  Steps,
  theme,
  Divider,
  Form,
  Spin,
  Modal,
} from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Import vehicle icons
import car from "../../../assets/icons/car.png";
import truck from "../../../assets/icons/truck.png";
import bus from "../../../assets/icons/bus.png";
import motorcycle from "../../../assets/icons/bike.png";

const vehicleIcons = {
  car: new L.Icon({ iconUrl: car, iconSize: [30, 30] }),
  truck: new L.Icon({ iconUrl: truck, iconSize: [30, 30] }),
  bus: new L.Icon({ iconUrl: bus, iconSize: [30, 30] }),
  motorcycle: new L.Icon({ iconUrl: motorcycle, iconSize: [30, 30] }),
};

function VehicleDetails() {
  const { id: vehicleId } = useParams(); // Updated line
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const { modal } = Modal;

  useEffect(() => {
    // Check if vehicleId exists before fetching
    if (vehicleId) {
      fetchVehicleDetails();
    } else {
      setLoading(false);
      message.error("Invalid vehicle ID");
      navigate("/dashboard/overview");
    }
  }, [vehicleId]);

  const fetchVehicleDetails = async () => {
    try {
      console.log("Fetching vehicle with ID:", vehicleId); // Debug log
      const response = await fetch(`/api/schedules/get/${vehicleId}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Vehicle not found");
      }
      const data = await response.json();
      console.log("Received vehicle data:", data); // Debug log
      setVehicle(data);
    } catch (error) {
      message.error(error.message || "Failed to fetch vehicle details");
      console.error("Error:", error);
      navigate("/dashboard/overview");
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = () => {
    if (!vehicleId) {
      message.error("Invalid vehicle ID");
      return;
    }

    modal.confirm({
      title: "Are you sure you want to remove this vehicle?",
      icon: <ExclamationCircleOutlined />,
      content: "This action cannot be undone.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        try {
          const response = await fetch(`/api/schedules/${vehicleId}`, {
            method: "DELETE",
          });
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to remove vehicle");
          }
          message.success("Vehicle removed successfully");
          navigate("/dashboard/overview");
        } catch (error) {
          message.error(error.message || "Failed to remove vehicle");
          console.error("Error:", error);
        }
      },
    });
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  if (!vehicle || !vehicle.location) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>Vehicle not found</h2>
        <Button type="primary" onClick={() => navigate("/dashboard/overview")}>
          Back to Overview
        </Button>
      </div>
    );
  }

  // Get coordinates from the vehicle data
  const latitude = vehicle.location?.coordinates[1] || -26.1715215;
  const longitude = vehicle.location?.coordinates[0] || 28.04002455;

  return (
    <div id="vehicle-detail-page">
      <div className="row">
        <div className="col-lg-12 col-md-4">
          <MapContainer
            center={[latitude, longitude]}
            zoom={13}
            style={{ height: "350px", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker
              position={[latitude, longitude]}
              icon={vehicleIcons[vehicle.vehicleType] || vehicleIcons.car}
            >
              <Popup>
                <strong>
                  {vehicle.vehicleBrand} {vehicle.vehicleType}
                </strong>
                <br />
                Reg: {vehicle.registrationNumber}
                <br />
                Status: {vehicle.vehicleStatus}
                <br />
                {vehicle.address}
              </Popup>
            </Marker>
          </MapContainer>
        </div>
        <Divider style={{ color: "brown", fontWeight: "700" }}>
          Vehicle Details
        </Divider>
        <div className="col-lg-12 col-md-4">
          <div className="vehicle-details-card">
            <div className="vehicle-details-text">
              <p>Brand</p>
              <p>Reg number</p>
              <p>Vehicle Type</p>
              <p>Status</p>
              <p>Location</p>
              <p>Destination</p>
            </div>
            <div className="vehicle-details-text">
              <p>{vehicle.vehicleBrand}</p>
              <p>{vehicle.registrationNumber}</p>
              <p>{vehicle.vehicleType}</p>
              <p>{vehicle.vehicleStatus}</p>
              <p>{vehicle.address}</p>
              <p>{vehicle.destination || "N/A"}</p>
            </div>
          </div>
        </div>
        <Divider style={{ color: "brown", fontWeight: "700" }}>Owner Details</Divider>
        <div className="col-lg-12 col-md-4">
          <div className="vehicle-details-card">
            <div className="vehicle-details-text">
              <p>Name</p>
              <p>Surname</p>
              <p>Phone Number</p>
              <p>Email</p>
            </div>
            <div className="vehicle-details-text">
              <p>{vehicle.name || "N/A"}</p>
              <p>{vehicle.surname || "N/A"}</p>
              <p>{vehicle.phoneNumber || "N/A"}</p>
              <p>{vehicle.email || "N/A"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VehicleDetails;
