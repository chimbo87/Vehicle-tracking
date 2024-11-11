import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Card, Alert, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix the missing Leaflet marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom CSS for the map container
const mapContainerStyle = {
  height: '450px',
  width: '100%',
  position: 'relative',
  zIndex: 1  // Ensure proper stacking context
};

const Overview = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Johannesburg coordinates as default center
  const defaultCenter = [-26.1715215, 28.040024];

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const fetchVehicleData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/schedules/get");
      if (!response.ok) {
        throw new Error('Failed to fetch vehicle data');
      }
      const data = await response.json();
      
      // Process the data to include coordinates - limiting requests to avoid rate limiting
      const processedData = await Promise.all(
        data.map(async (vehicle) => {
          if (!vehicle.position || !vehicle.town || !vehicle.country) {
            return { ...vehicle, coordinates: null };
          }

          try {
            // Add delay between geocoding requests to avoid rate limiting
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            const geocodeResponse = await fetch(
              `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
                `${vehicle.position}, ${vehicle.town}, ${vehicle.country}`
              )}`
            );
            
            if (!geocodeResponse.ok) {
              throw new Error('Geocoding failed');
            }
            
            const geocodeData = await geocodeResponse.json();
            
            if (geocodeData && geocodeData.length > 0) {
              return {
                ...vehicle,
                coordinates: [
                  parseFloat(geocodeData[0].lat),
                  parseFloat(geocodeData[0].lon)
                ]
              };
            }
          } catch (error) {
            console.error('Geocoding error for vehicle:', vehicle.registrationNumber, error);
          }
          return { ...vehicle, coordinates: null };
        })
      );
      
      setVehicles(processedData);
    } catch (error) {
      console.error('Error fetching vehicle data:', error);
      setError('Failed to load vehicle data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicleData();
    // Refresh every 60 seconds to avoid rate limiting
    const interval = setInterval(fetchVehicleData, 60000);
    return () => clearInterval(interval);
  }, []);

  if (error) {
    return (
      <Alert
        message="Error"
        description={error}
        type="error"
        showIcon
        style={{ marginBottom: 16 }}
      />
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: '16px' }}>
        <Card bodyStyle={{ padding: 0 }} className="map-card">
          <div style={mapContainerStyle}>
            {loading && (
              <div style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'rgba(0,0,0,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000
              }}>
                <Spin indicator={antIcon} />
              </div>
            )}
            {typeof window !== 'undefined' && (
              <MapContainer
                key={vehicles.length} // Force re-render when vehicles update
                center={defaultCenter}
                zoom={12}
                style={{ height: '100%', width: '100%' }}
                scrollWheelZoom={true}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {vehicles
                  .filter(vehicle => vehicle.coordinates)
                  .map((vehicle) => (
                    <Marker
                      key={vehicle._id}
                      position={vehicle.coordinates}
                    >
                      <Popup>
                        <div style={{ padding: 8 }}>
                          <h5 style={{ fontWeight: 'bold', marginBottom: 8 }}>{vehicle.vehicleBrand}</h5>
                          <p style={{ fontSize: '14px' }}><strong>Registration:</strong> {vehicle.registrationNumber}</p>
                          <p style={{ fontSize: '14px' }}><strong>Status:</strong> {vehicle.vehicleStatus}</p>
                          <p style={{ fontSize: '14px' }}><strong>Driver:</strong> {vehicle.name} {vehicle.surname}</p>
                          <p style={{ fontSize: '14px' }}><strong>Contact:</strong> {vehicle.phoneNumber}</p>
                          <p style={{ fontSize: '14px' }}><strong>Location:</strong> {vehicle.position}</p>
                          {vehicle.destination && (
                            <p style={{ fontSize: '14px' }}><strong>Destination:</strong> {vehicle.destination}</p>
                          )}
                        </div>
                      </Popup>
                    </Marker>
                  ))}
              </MapContainer>
            )}
          </div>
        </Card>

        {/* Rest of the component remains the same */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Card title="Vehicle Statistics">
            <p><strong>Total:</strong> {vehicles.length}</p>
            <p><strong>Moving:</strong> {vehicles.filter(v => v.vehicleStatus === 'moving').length}</p>
            <p><strong>Parked:</strong> {vehicles.filter(v => v.vehicleStatus === 'parked').length}</p>
            <p><strong>Tracked:</strong> {vehicles.filter(v => v.coordinates).length} of {vehicles.length}</p>
          </Card>

          <Card title="Recent Updates">
            {vehicles.slice(0, 3).map(vehicle => (
              <div key={vehicle._id} style={{ marginBottom: 16 }}>
                <p style={{ fontWeight: 500 }}>{vehicle.vehicleBrand} ({vehicle.registrationNumber})</p>
                <p>Status: {vehicle.vehicleStatus}</p>
                <p>Location: {vehicle.position}</p>
              </div>
            ))}
          </Card>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        <Card title="Vehicle Types">
          <p>Cars: {vehicles.filter(v => v.vehicleType === 'car').length}</p>
          <p>Trucks: {vehicles.filter(v => v.vehicleType === 'truck').length}</p>
          <p>Vans: {vehicles.filter(v => v.vehicleType === 'van').length}</p>
        </Card>

        <Card title="Active Regions">
          {Array.from(new Set(vehicles.map(v => v.town))).map(town => (
            <p key={town}>
              {town}: {vehicles.filter(v => v.town === town).length} vehicles
            </p>
          ))}
        </Card>

        <Card title="System Status">
          <p>Last Updated: {new Date().toLocaleTimeString()}</p>
          <p>Status: {loading ? 'Updating...' : 'Active'}</p>
          <p>Coverage: {vehicles.filter(v => v.coordinates).length} of {vehicles.length}</p>
        </Card>
      </div>
    </div>
  );
};

export default Overview;