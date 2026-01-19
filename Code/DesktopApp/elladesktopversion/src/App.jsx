import { useState } from 'react'
import './App.css'
import LandingPage from './pages/LandingPage'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'

function App() {
  const [isAdminView, setIsAdminView] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleAdminLogin = () => {
    setIsAdminView(true)
  }

  const handleLogout = () => {
    setIsAdminView(false)
    setIsLoggedIn(false)
  }

  const handleLoginSuccess = () => {
    setIsLoggedIn(true)
  }

  return (
    <>
      {isAdminView && !isLoggedIn ? (
        <AdminLogin onLoginSuccess={handleLoginSuccess} onBack={handleLogout} />
      ) : isAdminView && isLoggedIn ? (
        <AdminDashboard onLogout={handleLogout} />
      ) : (
        <LandingPage onAdminClick={handleAdminLogin} />
      )}
    </>
  )
}

export default App
