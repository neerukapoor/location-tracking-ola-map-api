import React from 'react';
import useLocation from '../hooks/useLocation';
import Map from '../components/Map';

const Home: React.FC = () => {
  const userId = '123'; // Replace with actual user ID
  const location = useLocation(userId);
  console.log("neeru location " + location)

  return (
    <div>
      {location ? (
        <Map latitude={location.latitude} longitude={location.longitude} />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Home;
