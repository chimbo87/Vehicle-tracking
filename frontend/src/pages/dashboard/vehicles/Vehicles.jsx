import React from "react";
import { Table, Tag, Button } from "antd";

function Vehicles() {
  // Mock data for the table
  const dataSource = [
    {
      key: '1',
      regNumber: 'BG007',
      type: 'Truck',
      status: 'Moving',
      position: '21 M1 Road',
    },
    {
      key: '2',
      regNumber: 'BG008',
      type: 'Van',
      status: 'Parked',
      position: '15 Main Street',
    },
    {
      key: '3',
      regNumber: 'BG009',
      type: 'Truck',
      status: 'Moving',
      position: '45 Highway Dr',
    },
  ];

  // Column definitions
  const columns = [
    {
      title: 'Reg Number',
      dataIndex: 'regNumber',
      key: 'regNumber',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'Moving' ? 'green' : 'orange'}>
          {status}
        </Tag>
      ),
    },
    {
      title: 'Position',
      dataIndex: 'position',
      key: 'position',
    },
    {
      title: 'Action',
      key: 'action',
      render: () => (
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
        dataSource={dataSource} 
        columns={columns}
        pagination={{ pageSize: 10 }}
        bordered
      />
    </div>
  );
}

export default Vehicles;