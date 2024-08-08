import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EmployeeTracker from './components/EmployeeTracker';
import AdminDashboard from './components/AdminDashboard';
import Home from './pages/Home';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        {/* <Route path="/admin/login" element={<AdminLogin/>} />
        <Route path="/admin" element={<AdminDashboard/>} /> */}
        <Route path="/employee" element={<EmployeeTracker/>} />
        <Route path="/admin" element={<AdminDashboard/>} />
      </Routes>
    </Router>
  );
};

export default App;
