import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api/client.js'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    try {
      // Backend implemented GET /auth/adminLogin expecting body; axios allows data in GET via config
      const res = await api.get('/auth/adminLogin', { data: { username, password } })
      const { token, expirationTime } = res.data || {}
      localStorage.setItem('admin_jwt', token || res.data?.jwtToken || res.data?.token)
      navigate('/')
    } catch (err) {
      setError('Login failed')
    }
  }

  return (
    <div style={{ maxWidth: 420, margin: '80px auto', padding: 24, border: '1px solid #ddd', borderRadius: 8 }}>
      <h2>Admin Login</h2>
      <form onSubmit={onSubmit}>
        <label>Username</label>
        <input value={username} onChange={(e)=>setUsername(e.target.value)} required />
        <label>Password</label>
        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
        <button type="submit" style={{ marginTop: 12 }}>Login</button>
      </form>
      {error && <p style={{ color:'crimson' }}>{error}</p>}
    </div>
  )
}


