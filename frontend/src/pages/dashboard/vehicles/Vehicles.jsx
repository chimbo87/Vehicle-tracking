import React, { useState, useEffect } from "react";
import { Table, Tag, Button, Input, Space } from "antd";
import { SearchOutlined } from '@ant-design/icons';

function Vehicles() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/schedules/get");
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      // Map the API data to match our table structure
      const mappedData = result.map((item) => ({
        key: item._id,
        vehicleBrand: item.vehicleBrand,
        regNumber: item.registrationNumber,
        type: item.vehicleType,
        status: item.vehicleStatus,
        position: item.position,
      }));
      setData(mappedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => confirm()}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
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
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
  });

  const columns = [
    {
      title: 'Brand',
      dataIndex: 'vehicleBrand',
      key: 'vehicleBrand',
      ...getColumnSearchProps('vehicleBrand'),
    },
    {
      title: 'Reg Number',
      dataIndex: 'regNumber',
      key: 'regNumber',
      ...getColumnSearchProps('regNumber'),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      filters: [
        { text: 'Car', value: 'car' },
        { text: 'Truck', value: 'truck' },
        { text: 'Van', value: 'van' },
      ],
      onFilter: (value, record) => record.type === value,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: 'Moving', value: 'moving' },
        { text: 'Parked', value: 'parked' },
      ],
      onFilter: (value, record) => record.status === value,
      render: (status) => (
        <Tag color={status === 'moving' ? 'green' : 'orange'}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Tag>
      ),
    },
    {
      title: 'Position',
      dataIndex: 'position',
      key: 'position',
      ...getColumnSearchProps('position'),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button type="link">View More</Button>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <h4 style={{ marginBottom: '24px', fontSize: '24px', fontWeight: 'bold' }}>
        The Vehicles List
      </h4>
      <Table
        dataSource={data}
        columns={columns}
        pagination={{ pageSize: 10 }}
        bordered
        loading={loading}
      />
    </div>
  );
}

export default Vehicles;