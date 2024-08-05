import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const [locations, setLocations] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
        navigate('/admin/login');
        return;
    }

    const fetchLocations = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/admin/locations/${selectedUser}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setLocations(response.data);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    if (selectedUser) {
      fetchLocations();
    }
  }, [selectedUser, navigate]);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div>
        <label>User ID:</label>
        <input type="text" value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)} />
      </div>
      <ul>
        {locations.map((location: any, index) => (
          <li key={index}>
            {location.latitude}, {location.longitude} at {new Date(location.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
