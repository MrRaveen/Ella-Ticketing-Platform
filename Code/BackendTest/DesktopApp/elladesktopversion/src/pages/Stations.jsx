import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { adminApi } from '../api/client.js'

export default function Stations(){
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  async function load(){
    setLoading(true)
    try{
      const res = await adminApi.getAllStations()
      setData(res.data || [])
    }catch(err){
      setError('Failed to load stations')
    }finally{ setLoading(false) }
  }
  useEffect(()=>{ load() },[])

  return (
    <div style={{ padding:24 }}>
      <h2>Stations</h2>
      <Link to="/stations/new" className="btn">Create Station</Link>
      {loading ? <p>Loading...</p> : error ? <p style={{color:'crimson'}}>{error}</p> : (
        <table style={{ width:'100%', marginTop:16 }}>
          <thead>
            <tr><th>ID</th><th>Name</th><th>Code</th><th>Contact</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {data.map(s => (
              <tr key={s.stationID}>
                <td>{s.stationID}</td>
                <td>{s.stationNameString}</td>
                <td>{s.stationCodeString}</td>
                <td>{s.contactNoString}</td>
                <td>
                  <button onClick={async ()=>{ await adminApi.removeStation(s.stationID); load() }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}


