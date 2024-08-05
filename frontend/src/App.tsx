import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/admin/login" element={<AdminLogin/>} />
        <Route path="/admin" element={<AdminDashboard/>} />
      </Routes>
    </Router>
  );
};

export default App;
