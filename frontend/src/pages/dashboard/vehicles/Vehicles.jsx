import React, { useState, useEffect } from "react";
import { Table, Tag, Button, Input, Space, Divider } from "antd";
import { useNavigate } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import car from "../../../assets/icons/car.png";
import truck from "../../../assets/icons/truck.png";
import bus from "../../../assets/icons/bus.png";
import motorcycle from "../../../assets/icons/bike.png";
import "./Vehicles.css";

const Vehicles = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    fetchVehicles();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/schedules/get");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      const mappedData = result.map((item) => ({
        key: item._id,
        vehicleBrand: item.vehicleBrand,
        regNumber: item.registrationNumber,
        type: item.vehicleType,
        status: item.vehicleStatus,
        position: `${item.address}, ${item.town}`,
        address: item.address,
        town: item.town,
      }));
      setData(mappedData.reverse());
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleViewDetails = (vehicleId) => {
    navigate(`/dashboard/vehicle-details/${vehicleId}`);
  };
  const getVehicleIcon = (type) => {
    switch (type.toLowerCase()) {
      case "car":
        return car;
      case "truck":
        return truck;
      case "bus":
        return bus;
      case "motorcycle":
        return motorcycle;
      default:
        return car;
    }
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => confirm()}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => confirm()}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => {
              clearFilters();
              confirm();
            }}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
  });

  const columns = [
    {
      title: "Brand",
      dataIndex: "vehicleBrand",
      key: "vehicleBrand",
      ...getColumnSearchProps("vehicleBrand"),
    },
    {
      title: "Reg Number",
      dataIndex: "regNumber",
      key: "regNumber",
      ...getColumnSearchProps("regNumber"),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      filters: [
        { text: "Car", value: "car" },
        { text: "Truck", value: "truck" },
        { text: "Motorcycle", value: "motorcycle" },
        { text: "Bus", value: "bus" },
      ],
      onFilter: (value, record) => record.type === value,
      render: (type) => (
        <Space>
          <img
            src={getVehicleIcon(type)}
            alt={type}
            style={{
              width: "20px",
              height: "20px",
              verticalAlign: "middle",
              marginRight: "8px",
            }}
          />
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </Space>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "Moving", value: "moving" },
        { text: "Parked", value: "parked" },
      ],
      onFilter: (value, record) => record.status === value,
      render: (status) => (
        <Tag color={status === "moving" ? "green" : "orange"}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Tag>
      ),
    },
    {
      title: "Location",
      dataIndex: "position",
      key: "position",
      ...getColumnSearchProps("position"),
      render: (_, record) => (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span>{record.address}</span>
          <span style={{ color: "#666" }}>{record.town}</span>
        </div>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button type="primary">
          Details
        </Button>
      ),
    },
  ];

  const getStatusStyle = (status) => {
    const baseStyle = {
      padding: "6px 16px",
      borderRadius: "20px",
      border: "none",
      color: "white",
      fontWeight: "500",
      textTransform: "capitalize",
    };

    switch (status.toLowerCase()) {
      case "moving":
        return { ...baseStyle, backgroundColor: "#52c41a" }; 
      case "parked":
        return { ...baseStyle, backgroundColor: "#faad14" }; 
      case "idle":
        return { ...baseStyle, backgroundColor: "#1890ff" }; 
      default:
        return { ...baseStyle, backgroundColor: "#d9d9d9" }; // grey
    }
  };

  const renderMobileView = () => (

  <div class="vehicle-mobile-box">
    <Divider>Vehicle List</Divider>
      <div className="row">
      {data.map((vehicle) => (
        <div key={vehicle.key} className="col-lg-6 col-md-4">
          <div className="vehicle-mobile-card">
            <div className="vehicle-mobile-cardimg">
              <img src={getVehicleIcon(vehicle.type)} alt={vehicle.type} />
            </div>
            <p>{vehicle.vehicleBrand}</p>
            <p>{vehicle.regNumber}</p>
            <button
              className="status-btn"
              style={getStatusStyle(vehicle.status)}
            >
              {vehicle.status}
            </button>
            <p>
              {vehicle.address}, {vehicle.town}
            </p>
            <p>2 mins ago</p>
            <Button onClick={() => handleViewDetails(vehicle.key)}>View More</Button>
          </div>
        </div>
      ))}
    </div>
  </div>
  );
  


  const renderDesktopView = () => (
    <div style={{ padding: "24px" }}>
      <div className="vehicle-list-box">
        <h5>Vehicle List</h5>
      </div>
      <Table
        dataSource={data}
        columns={columns}
        pagination={{ pageSize: 10 }}
        bordered
        loading={loading}
        onRow={(record) => ({
          onClick: () => handleViewDetails(record.key),
        })}
      />
    </div>
  );

  return (
    <div>{windowWidth <= 768 ? renderMobileView() : renderDesktopView()}</div>
  );
};

export default Vehicles;
