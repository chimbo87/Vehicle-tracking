import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
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
import bus from "../../../assets/icons/bus.png";
import motorcycle from "../../../assets/icons/bike.png";
import "./Overview.css";

const vehicleIcons = {
  car: new L.Icon({ iconUrl: car, iconSize: [30, 30] }),
  truck: new L.Icon({ iconUrl: truck, iconSize: [30, 30] }),
  bus: new L.Icon({ iconUrl: bus, iconSize: [30, 30] }),
  motorcycle: new L.Icon({ iconUrl: motorcycle, iconSize: [30, 30] }),
};

// South Africa boundary coordinates
const southAfricaBounds = {
  latMin: -35,
  latMax: -22,
  lngMin: 16,
  lngMax: 33,
};

function Overview() {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState([]);
  const [lineChartData, setLineChartData] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    fetch("/api/schedules/get")
      .then((response) => response.json())
      .then((data) => {
        // Filter vehicles within South Africa's boundaries
        const filteredData = data.filter((vehicle) => {
          const [lng, lat] = vehicle.location.coordinates;
          return (
            lat >= southAfricaBounds.latMin &&
            lat <= southAfricaBounds.latMax &&
            lng >= southAfricaBounds.lngMin &&
            lng <= southAfricaBounds.lngMax
          );
        });
        setVehicles(filteredData);

        // Prepare data for line chart
        const lineChartData = filteredData.map((vehicle) => ({
          name: vehicle.registrationNumber,
          count: 1,
        }));
        setLineChartData(lineChartData);

        // Prepare data for pie chart
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
  }, []);

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
      title: "Position",
      key: "position",
      render: (_, record) =>
        `${record.location.coordinates[1]}, ${record.location.coordinates[0]}`,
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Button type="primary" onClick={() => navigate("/dashboard/vehicle-details")}>
          Details
        </Button>
      ),
    },
  ];

  return (
    <div className="overview-page">
      <div className="row">
        <div className="col-lg-8 col-md-4">
          <div className="overview-map-box">
            <MapContainer
              center={[-26.2041, 28.0473]}
              zoom={10}
              style={{ height: "450px", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {vehicles.map((vehicle) => (
                <Marker
                  key={vehicle._id}
                  position={[
                    vehicle.location.coordinates[1],
                    vehicle.location.coordinates[0],
                  ]}
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
                    {vehicle.address}, {vehicle.town}, {vehicle.country}
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
        <div className="col-lg-4 col-md-4">
          <div>
            <div id="LineChart">
              <h5>Vehicle Status</h5>
              <LineChart width={100} height={200} data={lineChartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="count" stroke="#8884d8" />
              </LineChart>
            </div>
            <div id="LineChart">
              <h5>Vehicle Types</h5>
              <PieChart width={300} height={200}>
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
                      fill={`#${(((1 << 24) * Math.random()) | 0).toString(
                        16
                      )}`}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div id="latest-up">
          <h5>Latest Update</h5>
          <button type="link" onClick={() => navigate("/dashboard/vehicles")}>View All</button>
        </div>
        <div className="col-lg-12 col-md-4">
          <Table
            columns={columns}
            dataSource={vehicles}
            rowKey="_id"
            pagination={{ pageSize: 5 }}
          />
        </div>
      </div>
    </div>
  );
}

export default Overview;
