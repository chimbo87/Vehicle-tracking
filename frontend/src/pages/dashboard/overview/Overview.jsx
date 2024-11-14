import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Table, Button } from "antd";
import { useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import car from "../../../assets/icons/car.png";
import truck from "../../../assets/icons/truck.png";
import trucks from "../../../assets/icons/trucks.png";
import bus from "../../../assets/icons/bus.png";
import motorcycle from "../../../assets/icons/bike.png";
import "./Overview.css";

const ZoomToVehicle = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.flyTo(position, 8);
    }
  }, [position, map]);
  return null;
};

const vehicleIcons = {
  car: new L.Icon({ iconUrl: car, iconSize: [30, 30] }),
  truck: new L.Icon({ iconUrl: truck, iconSize: [30, 30] }),
  bus: new L.Icon({ iconUrl: bus, iconSize: [30, 30] }),
  motorcycle: new L.Icon({ iconUrl: motorcycle, iconSize: [30, 30] }),
};

const worldBounds = {
  latMin: -90,
  latMax: 90,
  lngMin: -180,
  lngMax: 180,
};

function Overview() {
  const navigate = useNavigate();
  const [selectedVehiclePosition, setSelectedVehiclePosition] = useState(null);
  const [vehicles, setVehicles] = useState([]);
  const [lineChartData, setLineChartData] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      fetch("/api/schedules/get")
        .then((response) => response.json())
        .then((data) => {
          // Update this part:
          const filteredData = data.filter((vehicle) => {
            const [lng, lat] = vehicle.location.coordinates;
            return (
              lat >= worldBounds.latMin && // Changed from southAfricaBounds to worldBounds
              lat <= worldBounds.latMax && // Changed from southAfricaBounds to worldBounds
              lng >= worldBounds.lngMin && // Changed from southAfricaBounds to worldBounds
              lng <= worldBounds.lngMax // Changed from southAfricaBounds to worldBounds
            );
          });
          setVehicles(filteredData);

          // Prepare the data for the line chart
          const vehicleStatusData = filteredData.reduce((acc, vehicle) => {
            const month = new Date(vehicle.updatedAt).toLocaleString(
              "default",
              {
                month: "short",
              }
            );
            if (!acc[month]) {
              acc[month] = { moving: 0, idle: 0, parked: 0 };
            }
            acc[month][vehicle.vehicleStatus.toLowerCase()]++;
            return acc;
          }, {});

          setLineChartData(
            Object.keys(vehicleStatusData).map((month) => ({
              month,
              moving: vehicleStatusData[month].moving,
              idle: vehicleStatusData[month].idle,
              parked: vehicleStatusData[month].parked,
            }))
          );

          // Prepare the data for the pie chart
          const vehicleTypes = {};
          filteredData.forEach((vehicle) => {
            if (vehicleTypes[vehicle.vehicleType]) {
              vehicleTypes[vehicle.vehicleType]++;
            } else {
              vehicleTypes[vehicle.vehicleType] = 1;
            }
          });
          const pieChartData = Object.keys(vehicleTypes).map((type) => ({
            name: type,
            value: vehicleTypes[type],
          }));
          setPieChartData(pieChartData);
        })
        .catch((error) => console.error("Error fetching data:", error));
    };

    fetchData();

    // Set interval to refresh the data every 30 seconds
    const intervalId = setInterval(() => {
      fetchData();
    }, 30000); // 30 seconds

    // Clear the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Function to handle navigation to vehicle details
  const handleViewDetails = (vehicleId) => {
    navigate(`/dashboard/vehicle-details/${vehicleId}`);
  };

  const columns = [
    { title: "Brand", dataIndex: "vehicleBrand", key: "vehicleBrand" },
    {
      title: "Reg Number",
      dataIndex: "registrationNumber",
      key: "registrationNumber",
    },
    { title: "Type", dataIndex: "vehicleType", key: "vehicleType" },
    { title: "Status", dataIndex: "vehicleStatus", key: "vehicleStatus" },
    {
      title: "Location",
      key: "position",
      render: (_, record) =>
        `${record.location.coordinates[1]}, ${record.location.coordinates[0]}`,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button type="primary" onClick={() => handleViewDetails(record._id)}>
          Details
        </Button>
      ),
    },
  ];

  return (
    <div className="overview-page">
      <div className="row">
        <div className="overview-map-box">
          <MapContainer
            center={[-30.5595, 22.9375]}
            zoom={4.2}
            style={{ height: "450px", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />

            {vehicles.map((vehicle) => (
              <Marker
                key={vehicle._id}
                position={[
                  vehicle.location.coordinates[1],
                  vehicle.location.coordinates[0],
                ]}
                icon={vehicleIcons[vehicle.vehicleType] || vehicleIcons.car}
                eventHandlers={{
                  click: () =>
                    setSelectedVehiclePosition([
                      vehicle.location.coordinates[1],
                      vehicle.location.coordinates[0],
                    ]),
                }}
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
                  {vehicle.address}, {vehicle.town}, {vehicle.country}
                  <br />
                  <Button
                    type="link"
                    onClick={() => handleViewDetails(vehicle._id)}
                  >
                    View Details
                  </Button>
                </Popup>
              </Marker>
            ))}
            {selectedVehiclePosition && (
              <ZoomToVehicle position={selectedVehiclePosition} />
            )}
          </MapContainer>
        </div>
      </div>
      <div class="row">
        <div id="LineChart">
          <h6>Vehicle Distribution By Status</h6>
          <LineChart width={300} height={350} data={lineChartData}>
            <XAxis dataKey="month" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="moving" stroke="#8884d8" />
            <Line type="monotone" dataKey="idle" stroke="#82ca9d" />
            <Line type="monotone" dataKey="parked" stroke="#ffc658" />
          </LineChart>
        </div>
        <div id="LineChart">
          <h6>Vehicle Distribution By Types</h6>
          <PieChart width={300} height={350}>
            <Pie
              data={pieChartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
            >
              {pieChartData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={`#${(((1 << 24) * Math.random()) | 0).toString(16)}`}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>
      <div className="row">
        <div id="latest-up">
          <h5>Latest Update</h5>
          <button type="link" onClick={() => navigate("/dashboard/vehicles")}>
            View All
          </button>
        </div>

        <div class="overview-tables">
          <Table
            columns={columns}
            dataSource={vehicles}
            rowKey="_id"
            pagination={{ pageSize: 5 }}
          />
        </div>
        <div class="overview-small-card">
          <div class="overview-small-cardwrap">
            <h6>Total Vehicles: {vehicles.length}</h6>
            <img src={trucks} alt="fleet" />
            <Button
              size="large"
              onClick={() => navigate("/dashboard/vehicles")}
            >
              View More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Overview;
