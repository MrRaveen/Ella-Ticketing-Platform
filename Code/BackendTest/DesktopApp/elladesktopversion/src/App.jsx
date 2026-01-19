import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom'
import './App.css'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Stations from './pages/Stations.jsx'
import CreateStation from './pages/CreateStation.jsx'
import TrainMgmt from './pages/TrainMgmt.jsx'

function Protected({ children }) {
  const token = localStorage.getItem('admin_jwt')
  if (!token) return <Navigate to="/login" replace />
  return children
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <Protected>
              <Dashboard />
            </Protected>
          }
        />
        <Route
          path="/stations"
          element={
            <Protected>
              <Stations />
            </Protected>
          }
        />
        <Route
          path="/stations/new"
          element={
            <Protected>
              <CreateStation />
            </Protected>
          }
        />
        <Route
          path="/trains"
          element={
            <Protected>
              <TrainMgmt />
            </Protected>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
