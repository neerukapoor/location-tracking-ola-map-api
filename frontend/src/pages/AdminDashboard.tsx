import React, { useEffect, useState } from 'react';
import Map from '../components/Map';

interface Location {
  latitude: number;
  longitude: number;
}

const AdminDashboard: React.FC = () => {
  const [currentLocation, setCurrentLocation] = useState<Location>({ latitude: 0, longitude: 0 });

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');

    ws.onmessage = (event) => {
      const { latitude, longitude } = JSON.parse(event.data);
      setCurrentLocation({ latitude, longitude });
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <Map latitude={currentLocation.latitude} longitude={currentLocation.longitude} />
    </div>
  );
};

export default AdminDashboard;
