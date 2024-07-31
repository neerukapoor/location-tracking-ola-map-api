import { useEffect, useState } from 'react';
import axios from 'axios';

const useLocation = (userId: string) => {
  const [location, setLocation] = useState<{ latitude: number, longitude: number } | null>(null);

  useEffect(() => {
    const sendLocation = async (latitude: number, longitude: number) => {
      try {
        await axios.post(`http://localhost:5000/api/locations`, {
          latitude,
          longitude,
          userId,
        });
      } catch (error) {
        console.error('Error sending location:', error);
      }
    };

    const handlePosition = (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;
      setLocation({ latitude, longitude });
      sendLocation(latitude, longitude);
    };

    const handleError = (error: GeolocationPositionError) => {
      console.error('Error getting location:', error);
    };

    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(handlePosition, handleError, {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000,
      });

      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, [userId]);

  return location;
};

export default useLocation;
