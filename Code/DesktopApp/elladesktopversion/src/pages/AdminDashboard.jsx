import React, { useState } from 'react'
import { Shield, Zap, MapPin } from 'lucide-react'
import AdminManagement from './components/AdminManagement'
import BusManagement from './components/BusManagement'
import StationManagement from './components/StationManagement'
import AddAdminModal from './components/AddAdminModal'
import AddBusModal from './components/AddBusModal'
import AddStationModal from './components/AddStationModal'
import UpdateStationModal from './components/UpdateStationModal'

export default function AdminDashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState('admins')
  const [showAddAdmin, setShowAddAdmin] = useState(false)
  const [showAddBus, setShowAddBus] = useState(false)
  const [showAddStation, setShowAddStation] = useState(false)
  const [showUpdateStation, setShowUpdateStation] = useState(false)
  
  // Admin form state
  const [adminForm, setAdminForm] = useState({
    username: '',
    password: '',
    fname: '',
    lname: '',
    contactNo: '',
    address: '',
    role: 'OPERATOR'
  })
  
  // Bus form state
  const [busForm, setBusForm] = useState({
    name: '',
    reportingNo: '',
    engineCode: '',
    serviceStartedYear: new Date().getFullYear(),
    manufacturedYear: new Date().getFullYear(),
    avgSpeed: '',
    totOperationHours: '',
    accidentCount: 0,
    trainStatus: 'ACTIVE',
    trainClass: 'STANDARD',
    trainSeatsCount: ''
  })

  // Station form state
  const [stationForm, setStationForm] = useState({
    stationNameString: '',
    stationCodeString: '',
    contactNoString: '',
    distanceFromFort: '',
    elevation: ''
  })

  // Update station form state
  const [updateStationForm, setUpdateStationForm] = useState({
    stationID: '',
    stationNameString: '',
    stationCodeString: '',
    contactNoString: '',
    distanceFromFort: '',
    elevation: ''
  })

  const [adminError, setAdminError] = useState('')
  const [busError, setBusError] = useState('')
  const [stationError, setStationError] = useState('')
  const [updateStationError, setUpdateStationError] = useState('')
  const [adminSuccess, setAdminSuccess] = useState('')
  const [busSuccess, setBusSuccess] = useState('')
  const [stationSuccess, setStationSuccess] = useState('')
  const [updateStationSuccess, setUpdateStationSuccess] = useState('')
  const [adminLoading, setAdminLoading] = useState(false)
  const [busLoading, setBusLoading] = useState(false)
  const [stationLoading, setStationLoading] = useState(false)
  const [updateStationLoading, setUpdateStationLoading] = useState(false)
  const [admins, setAdmins] = useState([])
  const [buses, setBuses] = useState([])
  const [stations, setStations] = useState([])

  const roles = ['ADMIN', 'OPERATOR', 'SUPPORT', 'MANAGER']
  const trainStatuses = ['ACTIVE', 'INACTIVE', 'MAINTENANCE', 'RETIRED']
  const trainClasses = ['STANDARD', 'DELUXE', 'SUPER_DELUXE', 'SLEEPER']

  // Admin handlers
  const handleAdminInputChange = (e) => {
    const { name, value } = e.target
    setAdminForm(prev => ({
      ...prev,
      [name]: value
    }))
    setAdminError('')
  }

  const validateAdminForm = () => {
    if (!adminForm.username.trim()) {
      setAdminError('Username is required')
      return false
    }
    if (!adminForm.password.trim()) {
      setAdminError('Password is required')
      return false
    }
    if (adminForm.password.length < 6) {
      setAdminError('Password must be at least 6 characters')
      return false
    }
    if (!adminForm.fname.trim()) {
      setAdminError('First name is required')
      return false
    }
    if (!adminForm.lname.trim()) {
      setAdminError('Last name is required')
      return false
    }
    if (!adminForm.contactNo.trim()) {
      setAdminError('Contact number is required')
      return false
    }
    if (!adminForm.address.trim()) {
      setAdminError('Address is required')
      return false
    }
    return true
  }

  const handleAdminSubmit = (e) => {
    e.preventDefault()
    setAdminError('')
    setAdminSuccess('')

    if (!validateAdminForm()) {
      return
    }

    setAdminLoading(true)

    setTimeout(() => {
      const newAdmin = {
        id: Date.now(),
        ...adminForm
      }
      setAdmins(prev => [...prev, newAdmin])
      setAdminSuccess(`Admin ${adminForm.fname} ${adminForm.lname} added successfully!`)
      
      setAdminForm({
        username: '',
        password: '',
        fname: '',
        lname: '',
        contactNo: '',
        address: '',
        role: 'OPERATOR'
      })
      
      setTimeout(() => {
        setShowAddAdmin(false)
      }, 2000)
      
      setAdminLoading(false)
    }, 1000)
  }

  // Bus handlers
  const handleBusInputChange = (e) => {
    const { name, value } = e.target
    setBusForm(prev => ({
      ...prev,
      [name]: value
    }))
    setBusError('')
  }

  const validateBusForm = () => {
    if (!busForm.name.trim()) {
      setBusError('Bus name is required')
      return false
    }
    if (!busForm.reportingNo.trim()) {
      setBusError('Reporting number is required')
      return false
    }
    if (!busForm.engineCode.trim()) {
      setBusError('Engine code is required')
      return false
    }
    if (!busForm.serviceStartedYear) {
      setBusError('Service started year is required')
      return false
    }
    if (!busForm.manufacturedYear) {
      setBusError('Manufactured year is required')
      return false
    }
    if (!busForm.avgSpeed || busForm.avgSpeed <= 0) {
      setBusError('Average speed must be greater than 0')
      return false
    }
    if (!busForm.totOperationHours || busForm.totOperationHours < 0) {
      setBusError('Total operation hours must be valid')
      return false
    }
    if (!busForm.trainSeatsCount || busForm.trainSeatsCount <= 0) {
      setBusError('Number of seats must be greater than 0')
      return false
    }
    return true
  }

  const handleBusSubmit = (e) => {
    e.preventDefault()
    setBusError('')
    setBusSuccess('')

    if (!validateBusForm()) {
      return
    }

    setBusLoading(true)

    setTimeout(() => {
      const newBus = {
        id: Date.now(),
        ...busForm,
        avgSpeed: parseFloat(busForm.avgSpeed),
        totOperationHours: parseFloat(busForm.totOperationHours),
        trainSeatsCount: parseInt(busForm.trainSeatsCount)
      }
      setBuses(prev => [...prev, newBus])
      setBusSuccess(`Bus ${busForm.name} added successfully!`)
      
      setBusForm({
        name: '',
        reportingNo: '',
        engineCode: '',
        serviceStartedYear: new Date().getFullYear(),
        manufacturedYear: new Date().getFullYear(),
        avgSpeed: '',
        totOperationHours: '',
        accidentCount: 0,
        trainStatus: 'ACTIVE',
        trainClass: 'STANDARD',
        trainSeatsCount: ''
      })
      
      setTimeout(() => {
        setShowAddBus(false)
      }, 2000)
      
      setBusLoading(false)
    }, 1000)
  }

  const handleDeleteAdmin = (id) => {
    setAdmins(prev => prev.filter(admin => admin.id !== id))
  }

  const handleDeleteBus = (id) => {
    setBuses(prev => prev.filter(bus => bus.id !== id))
  }

  // Station handlers
  const handleStationInputChange = (e) => {
    const { name, value } = e.target
    setStationForm(prev => ({
      ...prev,
      [name]: value
    }))
    setStationError('')
  }

  const validateStationForm = () => {
    if (!stationForm.stationNameString.trim()) {
      setStationError('Station name is required')
      return false
    }
    if (!stationForm.stationCodeString.trim()) {
      setStationError('Station code is required')
      return false
    }
    if (!stationForm.contactNoString.trim()) {
      setStationError('Contact number is required')
      return false
    }
    if (!stationForm.distanceFromFort || stationForm.distanceFromFort < 0) {
      setStationError('Distance from Fort must be valid')
      return false
    }
    if (!stationForm.elevation || stationForm.elevation < 0) {
      setStationError('Elevation must be valid')
      return false
    }
    return true
  }

  const handleStationSubmit = (e) => {
    e.preventDefault()
    setStationError('')
    setStationSuccess('')

    if (!validateStationForm()) {
      return
    }

    setStationLoading(true)

    setTimeout(() => {
      const newStation = {
        id: Date.now(),
        ...stationForm,
        distanceFromFort: parseFloat(stationForm.distanceFromFort),
        elevation: parseFloat(stationForm.elevation)
      }
      setStations(prev => [...prev, newStation])
      setStationSuccess(`Station ${stationForm.stationNameString} added successfully!`)
      
      setStationForm({
        stationNameString: '',
        stationCodeString: '',
        contactNoString: '',
        distanceFromFort: '',
        elevation: ''
      })
      
      setTimeout(() => {
        setShowAddStation(false)
      }, 2000)
      
      setStationLoading(false)
    }, 1000)
  }

  const handleDeleteStation = (id) => {
    setStations(prev => prev.filter(station => station.id !== id))
  }

  // Update Station handlers
  const handleOpenUpdateStation = (station) => {
    setUpdateStationForm({
      stationID: station.id,
      stationNameString: station.stationNameString,
      stationCodeString: station.stationCodeString,
      contactNoString: station.contactNoString,
      distanceFromFort: station.distanceFromFort,
      elevation: station.elevation
    })
    setShowUpdateStation(true)
  }

  const handleUpdateStationInputChange = (e) => {
    const { name, value } = e.target
    setUpdateStationForm(prev => ({
      ...prev,
      [name]: value
    }))
    setUpdateStationError('')
  }

  const validateUpdateStationForm = () => {
    if (!updateStationForm.stationNameString.trim()) {
      setUpdateStationError('Station name is required')
      return false
    }
    if (!updateStationForm.stationCodeString.trim()) {
      setUpdateStationError('Station code is required')
      return false
    }
    if (!updateStationForm.contactNoString.trim()) {
      setUpdateStationError('Contact number is required')
      return false
    }
    if (!updateStationForm.distanceFromFort || updateStationForm.distanceFromFort < 0) {
      setUpdateStationError('Distance from Fort must be valid')
      return false
    }
    if (!updateStationForm.elevation || updateStationForm.elevation < 0) {
      setUpdateStationError('Elevation must be valid')
      return false
    }
    return true
  }

  const handleUpdateStationSubmit = (e) => {
    e.preventDefault()
    setUpdateStationError('')
    setUpdateStationSuccess('')

    if (!validateUpdateStationForm()) {
      return
    }

    setUpdateStationLoading(true)

    setTimeout(() => {
      const updatedStations = stations.map(station => 
        station.id === updateStationForm.stationID
          ? {
              id: station.id,
              stationNameString: updateStationForm.stationNameString,
              stationCodeString: updateStationForm.stationCodeString,
              contactNoString: updateStationForm.contactNoString,
              distanceFromFort: parseFloat(updateStationForm.distanceFromFort),
              elevation: parseFloat(updateStationForm.elevation)
            }
          : station
      )
      setStations(updatedStations)
      setUpdateStationSuccess(`Station ${updateStationForm.stationNameString} updated successfully!`)
      
      setTimeout(() => {
        setShowUpdateStation(false)
      }, 2000)
      
      setUpdateStationLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-indigo-600">Admin Dashboard</h1>
            <button
              onClick={onLogout}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab('admins')}
              className={`py-4 px-2 font-semibold border-b-2 transition ${
                activeTab === 'admins'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Admin Management
              </div>
            </button>
            <button
              onClick={() => setActiveTab('buses')}
              className={`py-4 px-2 font-semibold border-b-2 transition ${
                activeTab === 'buses'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Bus Management
              </div>
            </button>
            <button
              onClick={() => setActiveTab('stations')}
              className={`py-4 px-2 font-semibold border-b-2 transition ${
                activeTab === 'stations'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Station Management
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Admin Tab */}
        {activeTab === 'admins' && (
          <>
            {adminSuccess && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-700 font-medium">{adminSuccess}</p>
              </div>
            )}
            <AdminManagement
              admins={admins}
              onAddClick={() => setShowAddAdmin(true)}
              onDelete={handleDeleteAdmin}
            />
          </>
        )}

        {/* Buses Tab */}
        {activeTab === 'buses' && (
          <>
            {busSuccess && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-700 font-medium">{busSuccess}</p>
              </div>
            )}
            <BusManagement
              buses={buses}
              onAddClick={() => setShowAddBus(true)}
              onDelete={handleDeleteBus}
            />
          </>
        )}

        {/* Stations Tab */}
        {activeTab === 'stations' && (
          <>
            {stationSuccess && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-700 font-medium">{stationSuccess}</p>
              </div>
            )}
            {updateStationSuccess && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-700 font-medium">{updateStationSuccess}</p>
              </div>
            )}
            <StationManagement
              stations={stations}
              onAddClick={() => setShowAddStation(true)}
              onDelete={handleDeleteStation}
              onUpdate={handleOpenUpdateStation}
            />
          </>
        )}
      </div>

      {/* Add Admin Modal */}
      <AddAdminModal
        isOpen={showAddAdmin}
        onClose={() => setShowAddAdmin(false)}
        form={adminForm}
        formError={adminError}
        isLoading={adminLoading}
        roles={roles}
        onInputChange={handleAdminInputChange}
        onSubmit={handleAdminSubmit}
      />

      {/* Add Bus Modal */}
      <AddBusModal
        isOpen={showAddBus}
        onClose={() => setShowAddBus(false)}
        form={busForm}
        formError={busError}
        isLoading={busLoading}
        trainStatuses={trainStatuses}
        trainClasses={trainClasses}
        onInputChange={handleBusInputChange}
        onSubmit={handleBusSubmit}
      />

      {/* Add Station Modal */}
      <AddStationModal
        isOpen={showAddStation}
        onClose={() => setShowAddStation(false)}
        form={stationForm}
        formError={stationError}
        isLoading={stationLoading}
        onInputChange={handleStationInputChange}
        onSubmit={handleStationSubmit}
      />

      {/* Update Station Modal */}
      <UpdateStationModal
        isOpen={showUpdateStation}
        onClose={() => setShowUpdateStation(false)}
        form={updateStationForm}
        formError={updateStationError}
        isLoading={updateStationLoading}
        onInputChange={handleUpdateStationInputChange}
        onSubmit={handleUpdateStationSubmit}
      />
    </div>
  )
}
