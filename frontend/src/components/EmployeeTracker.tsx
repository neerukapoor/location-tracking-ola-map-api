// src/components/EmployeeTracker.tsx
import React, { useEffect, useState } from 'react';

const EmployeeTracker: React.FC = () => {
  const [isTracking, setIsTracking] = useState(false);
  const [ws, setWs] = useState<WebSocket | null>(null);

  const employeeId = '66b245d9f1e1b359f970cad1'; // Replace with the actual employee ID

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isTracking && ws) {
      intervalId = setInterval(() => {
        navigator.geolocation.watchPosition(
          (position) => {
            const { latitude, longitude, accuracy } = position.coords;
            console.log(`neeru Latitude: ${latitude}, Longitude: ${longitude}, Accuracy: ${accuracy} meters`);
            ws.send(JSON.stringify({ employeeId, latitude, longitude }));
          },
          (error) => {
            console.error('Error getting position:', error);
          },
          {
            enableHighAccuracy: true,
            timeout: 5000, // Allow up to 30 seconds to obtain a position
            maximumAge: 0, // No cached positions allowed
          }
        );
      }, 3000); // Fetch the position every 1 second

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [isTracking, ws]);

  const handleStart = () => {
    const socket = new WebSocket('ws://localhost:8080');
    setWs(socket);
    setIsTracking(true);
  };

  return (
    <div>
      <h1>Employee Tracker</h1>
      <button onClick={handleStart}>Start</button>
    </div>
  );
};

export default EmployeeTracker;
