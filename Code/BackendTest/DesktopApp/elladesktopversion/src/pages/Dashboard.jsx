import { Link, useNavigate } from 'react-router-dom'

export default function Dashboard(){
  const navigate = useNavigate()
  function logout(){
    localStorage.removeItem('admin_jwt')
    navigate('/login')
  }
  return (
    <div style={{ padding: 24 }}>
      <h2>Admin Dashboard</h2>
      <div style={{ display:'flex', gap:16, flexWrap:'wrap' }}>
        <Link to="/stations" className="btn">Manage Stations</Link>
        <Link to="/trains" className="btn">Manage Trains & Times</Link>
      </div>
      <button onClick={logout} style={{ marginTop:24 }}>Logout</button>
    </div>
  )
}


