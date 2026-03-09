import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import PassengerLogin from './pages/PassengerLogin';
import PassengerRegister from './pages/PassengerRegister';
import CustomerDashboard from './pages/CustomerDashboard';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/login" element={<PassengerLogin />} />
        <Route path="/register" element={<PassengerRegister />} />
        <Route path="/dashboard" element={<CustomerDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
