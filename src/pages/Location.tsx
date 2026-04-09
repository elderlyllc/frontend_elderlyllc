import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import MainLayout from './layout/mainLayout';

interface LocationData {
  latitude: number;
  longitude: number;
  accuracy: number;
  address?: string;
}

// Custom hook to handle map clicks
const MapClickHandler: React.FC<{
  onMapClick: (lat: number, lng: number) => void;
}> = ({ onMapClick }) => {
  useMapEvents({
    click(e: any) {
      onMapClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
};

const Location: React.FC = () => {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getLocation = () => {
      if (!navigator.geolocation) {
        setError('Geolocation is not supported by your browser');
        setLoading(false);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude, accuracy } = position.coords;
          const locationData = {
            latitude,
            longitude,
            accuracy,
          };
          setLocation(locationData);
          setSelectedLocation(locationData);
          setError(null);
          setLoading(false);
        },
        (error) => {
          setError(`Error getting location: ${error.message}`);
          setLoading(false);
          // Set default location if geolocation fails
          setLocation({
            latitude: 40.7128,
            longitude: -74.0060,
            accuracy: 0,
          });
          setSelectedLocation({
            latitude: 40.7128,
            longitude: -74.0060,
            accuracy: 0,
          });
        }
      );
    };

    getLocation();
  }, []);

  const handleMapClick = (lat: number, lng: number) => {
    const newLocation = {
      latitude: lat,
      longitude: lng,
      accuracy: 0,
    };
    setSelectedLocation(newLocation);
  };

  return (
    <MainLayout>
      <div className="location-container">
        <h2>Current Location</h2>
        
        {loading && <p>Getting your location...</p>}
        
        {error && <p style={{ color: 'orange' }}>Note: {error}</p>}
        
        {location && (
          <div className="location-details">
            <h3>Current Location:</h3>
            <p><strong>Latitude:</strong> {location.latitude.toFixed(6)}</p>
            <p><strong>Longitude:</strong> {location.longitude.toFixed(6)}</p>
            <p><strong>Accuracy:</strong> {location.accuracy.toFixed(2)} meters</p>
          </div>
        )}

        {selectedLocation && (
          <>
            <div className="selected-location-details">
              <h3>Selected Location:</h3>
              <p><strong>Latitude:</strong> {selectedLocation.latitude.toFixed(6)}</p>
              <p><strong>Longitude:</strong> {selectedLocation.longitude.toFixed(6)}</p>
            </div>

            <div className="map-container" style={{ height: '400px', marginTop: '20px' }}>
              <MapContainer
                center={[selectedLocation.latitude, selectedLocation.longitude] as LatLngExpression}
                zoom={13}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; OpenStreetMap contributors'
                />
                <Marker position={[selectedLocation.latitude, selectedLocation.longitude] as LatLngExpression}>
                  <Popup>
                    Selected Location<br />
                    Lat: {selectedLocation.latitude.toFixed(6)}<br />
                    Lng: {selectedLocation.longitude.toFixed(6)}
                  </Popup>
                </Marker>
                <MapClickHandler onMapClick={handleMapClick} />
              </MapContainer>
            </div>

            <p style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
              Click on the map to select a different location
            </p>
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default Location;
