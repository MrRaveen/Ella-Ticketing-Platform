import React, { useState } from 'react'
import { Trash2, Plus, Grid3x3, MoreVertical } from 'lucide-react'

export default function StationManagement({ stations, onAddClick, onDelete, onUpdate }) {
  const [openMenuId, setOpenMenuId] = useState(null)
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 })

  const handleMenuClick = (e, stationId) => {
    e.stopPropagation()
    const button = e.currentTarget
    const rect = button.getBoundingClientRect()
    
    setMenuPosition({
      top: rect.bottom + 8,
      left: rect.right - 200
    })
    
    setOpenMenuId(openMenuId === stationId ? null : stationId)
  }

  const handleMenuItemClick = (callback, stationId) => {
    callback(stationId)
    setOpenMenuId(null)
  }
  if (stations.length === 0) {
    return (
      <div className="text-center py-16">
        <Grid3x3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 mb-6 text-lg">No stations added yet</p>
        <button
          onClick={onAddClick}
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
        >
          <Plus className="w-5 h-5" />
          Add New Station
        </button>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Stations</h2>
        <button
          onClick={onAddClick}
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
        >
          <Plus className="w-5 h-5" />
          Add Station
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Station Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Station Code</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Contact No</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Distance from Fort (km)</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Elevation (m)</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Menu</th>
            </tr>
          </thead>
          <tbody>
            {stations.map((station) => (
              <tr key={station.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                <td className="px-6 py-4 font-medium text-gray-900">{station.stationNameString}</td>
                <td className="px-6 py-4 text-gray-600">{station.stationCodeString}</td>
                <td className="px-6 py-4 text-gray-600">{station.contactNoString}</td>
                <td className="px-6 py-4 text-gray-600">{station.distanceFromFort.toFixed(2)}</td>
                <td className="px-6 py-4 text-gray-600">{station.elevation.toFixed(2)}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={(e) => handleMenuClick(e, station.id)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition text-gray-600 hover:text-gray-900"
                  >
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-blue-700 font-medium">Total Stations: {stations.length}</p>
      </div>

      {/* Fixed Position Menu - Renders above all UI */}
      {openMenuId && (
        <>
          {/* Backdrop to close menu */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpenMenuId(null)}
          />
          
          {/* Menu */}
          <div
            className="fixed bg-white border border-gray-200 rounded-lg shadow-2xl z-50 w-48"
            style={{
              top: `${menuPosition.top}px`,
              left: `${menuPosition.left}px`
            }}
          >
            <button
              onClick={() => {
                const station = stations.find(s => s.id === openMenuId)
                handleMenuItemClick(onUpdate, station)
              }}
              className="w-full text-left px-4 py-2 text-blue-600 hover:bg-blue-50 transition font-medium rounded-t-lg"
            >
              Edit Station
            </button>
            <button
              onClick={() => handleMenuItemClick(onDelete, openMenuId)}
              className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition font-medium rounded-b-lg border-t border-gray-200"
            >
              Delete Station
            </button>
          </div>
        </>
      )}
    </div>
  )
}
