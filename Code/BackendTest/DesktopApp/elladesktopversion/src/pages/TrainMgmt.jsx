import { useState } from 'react'
import { adminApi } from '../api/client.js'

export default function TrainMgmt(){
  const [route, setRoute] = useState({ routeName:'', routeCode:'', startStationID:0, endStationID:0 })
  const [train, setTrain] = useState({ driverNameString:'', status:true, trainNameString:'', trainInfoID:0, adminID:1, stationID:0 })
  const [trainTime, setTrainTime] = useState({ deparTime:'08:00', dateOfTrain:'', arrivalDateOfTrain:'', arrivaLocalTime:'12:00', routeId:0, trainId:0, platformId:0, status:'ACTIVE' })
  const [seatClass, setSeatClass] = useState({ pricePerson:0, classNameString:'' })
  const [msg, setMsg] = useState('')

  async function save(fn, payload){
    setMsg('')
    try{ await fn(payload); setMsg('Saved.') }catch{ setMsg('Failed') }
  }
  return (
    <div style={{ padding:24, display:'grid', gap:24 }}>
      <h2>Train Management</h2>
      <section style={{ border:'1px solid #ddd', padding:16 }}>
        <h3>Create Route</h3>
        <div className="form-grid">
          <input placeholder="Route Name" value={route.routeName} onChange={e=>setRoute(s=>({...s, routeName:e.target.value}))}/>
          <input placeholder="Route Code" value={route.routeCode} onChange={e=>setRoute(s=>({...s, routeCode:e.target.value}))}/>
          <input placeholder="Start Station ID" type="number" value={route.startStationID} onChange={e=>setRoute(s=>({...s, startStationID:Number(e.target.value)}))}/>
          <input placeholder="End Station ID" type="number" value={route.endStationID} onChange={e=>setRoute(s=>({...s, endStationID:Number(e.target.value)}))}/>
          <button onClick={()=>save(adminApi.createRoute, route)}>Save Route</button>
        </div>
      </section>

      <section style={{ border:'1px solid #ddd', padding:16 }}>
        <h3>Create Train Seat Class</h3>
        <div className="form-grid">
          <input placeholder="Class Name" value={seatClass.classNameString} onChange={e=>setSeatClass(s=>({...s, classNameString:e.target.value}))}/>
          <input placeholder="Price Per Person" type="number" value={seatClass.pricePerson} onChange={e=>setSeatClass(s=>({...s, pricePerson:Number(e.target.value)}))}/>
          <button onClick={()=>save(adminApi.createTrainSeatClass, seatClass)}>Save Class</button>
        </div>
      </section>

      <section style={{ border:'1px solid #ddd', padding:16 }}>
        <h3>Create Train Time</h3>
        <div className="form-grid">
          <input type="date" value={trainTime.dateOfTrain} onChange={e=>setTrainTime(s=>({...s, dateOfTrain:e.target.value}))}/>
          <input type="time" value={trainTime.deparTime} onChange={e=>setTrainTime(s=>({...s, deparTime:e.target.value}))}/>
          <input type="time" value={trainTime.arrivaLocalTime} onChange={e=>setTrainTime(s=>({...s, arrivaLocalTime:e.target.value}))}/>
          <input placeholder="Route ID" type="number" value={trainTime.routeId} onChange={e=>setTrainTime(s=>({...s, routeId:Number(e.target.value)}))}/>
          <input placeholder="Train ID" type="number" value={trainTime.trainId} onChange={e=>setTrainTime(s=>({...s, trainId:Number(e.target.value)}))}/>
          <input placeholder="Platform ID" type="number" value={trainTime.platformId} onChange={e=>setTrainTime(s=>({...s, platformId:Number(e.target.value)}))}/>
          <button onClick={()=>save(adminApi.createTrainTime, trainTime)}>Save Train Time</button>
        </div>
      </section>

      {msg && <p>{msg}</p>}
    </div>
  )
}


