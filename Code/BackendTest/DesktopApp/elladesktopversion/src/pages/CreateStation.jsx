import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { adminApi } from '../api/client.js'

export default function CreateStation(){
  const [form, setForm] = useState({
    contactNoString:'', distanceFromFort:0, elevation:0, stationCodeString:'', stationNameString:''
  })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  function set(k,v){ setForm(prev=>({ ...prev, [k]:v })) }

  async function onSubmit(e){
    e.preventDefault(); setError('')
    try{
      await adminApi.createStation(form)
      navigate('/stations')
    }catch(err){ setError('Failed to create station') }
  }

  return (
    <div style={{ padding:24, maxWidth:640 }}>
      <h2>Create Station</h2>
      <form onSubmit={onSubmit} className="form-grid">
        <label>Name</label>
        <input value={form.stationNameString} onChange={e=>set('stationNameString', e.target.value)} required/>
        <label>Code</label>
        <input value={form.stationCodeString} onChange={e=>set('stationCodeString', e.target.value)} required/>
        <label>Contact No</label>
        <input value={form.contactNoString} onChange={e=>set('contactNoString', e.target.value)} />
        <label>Distance From Fort (km)</label>
        <input type="number" value={form.distanceFromFort} onChange={e=>set('distanceFromFort', Number(e.target.value))} />
        <label>Elevation (m)</label>
        <input type="number" value={form.elevation} onChange={e=>set('elevation', Number(e.target.value))} />
        <button type="submit" style={{ marginTop:12 }}>Save</button>
      </form>
      {error && <p style={{ color:'crimson' }}>{error}</p>}
    </div>
  )
}


