import React from 'react'
import { Plus, Grid } from 'lucide-react'

export default function BusManagement({ buses, onAddClick, onDelete }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-8 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Manage Buses</h2>
        <button
          onClick={onAddClick}
          className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-semibold"
        >
          <Plus className="w-5 h-5" />
          Add New Bus
        </button>
      </div>

      {buses.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Name</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Reporting No</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Engine Code</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Status</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Class</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Seats</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Avg Speed</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {buses.map(bus => (
                <tr key={bus.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{bus.name}</td>
                  <td className="px-4 py-3">{bus.reportingNo}</td>
                  <td className="px-4 py-3">{bus.engineCode}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      bus.trainStatus === 'ACTIVE' ? 'bg-green-100 text-green-800' :
                      bus.trainStatus === 'MAINTENANCE' ? 'bg-yellow-100 text-yellow-800' :
                      bus.trainStatus === 'INACTIVE' ? 'bg-gray-100 text-gray-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {bus.trainStatus}
                    </span>
                  </td>
                  <td className="px-4 py-3">{bus.trainClass}</td>
                  <td className="px-4 py-3">{bus.trainSeatsCount}</td>
                  <td className="px-4 py-3">{bus.avgSpeed} km/h</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => onDelete(bus.id)}
                      className="text-red-600 hover:text-red-800 font-medium text-sm transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <Grid className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600">No buses added yet. Click "Add New Bus" to get started.</p>
        </div>
      )}
    </div>
  )
}
