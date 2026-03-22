import React, { useState } from 'react';
import { Edit2, Trash2, X } from 'lucide-react';

const MOCK_STATIONS = [
  { stationID: 1, stationNameString: 'Colombo Fort', stationCodeString: 'FOT', contactNoString: '0112421281', distanceFromFort: 0, elevation: 4.9, stationStatus: 'Active' },
  { stationID: 2, stationNameString: 'Maradana', stationCodeString: 'MDA', contactNoString: '0112692281', distanceFromFort: 2.1, elevation: 5.2, stationStatus: 'Active' },
];

export function ManageStations() {
  const [editingStation, setEditingStation] = useState<any>(null);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-slate-800">Manage Stations</h2>
      </div>

      {editingStation && (
        <form className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6 relative">
          <button 
            type="button" 
            onClick={() => setEditingStation(null)}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
          <h3 className="text-lg font-semibold text-slate-800 border-b border-slate-100 pb-3">Update Station: {editingStation.stationNameString}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Station ID</label>
              <input type="number" disabled defaultValue={editingStation.stationID} className="w-full rounded-lg border border-slate-300 py-2 px-3 text-sm bg-slate-50 text-slate-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Station Name</label>
              <input type="text" defaultValue={editingStation.stationNameString} className="w-full rounded-lg border border-slate-300 py-2 px-3 text-sm focus:ring-1 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Station Code</label>
              <input type="text" defaultValue={editingStation.stationCodeString} className="w-full rounded-lg border border-slate-300 py-2 px-3 text-sm focus:ring-1 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Contact Number</label>
              <input type="text" defaultValue={editingStation.contactNoString} className="w-full rounded-lg border border-slate-300 py-2 px-3 text-sm focus:ring-1 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Distance From Fort (km)</label>
              <input type="number" step="0.1" defaultValue={editingStation.distanceFromFort} className="w-full rounded-lg border border-slate-300 py-2 px-3 text-sm focus:ring-1 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Elevation (m)</label>
              <input type="number" step="0.1" defaultValue={editingStation.elevation} className="w-full rounded-lg border border-slate-300 py-2 px-3 text-sm focus:ring-1 focus:ring-indigo-500" />
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <button type="button" onClick={() => setEditingStation(null)} className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50">Cancel</button>
            <button type="button" className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700">Update Station</button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Code</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Distance (km)</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_STATIONS.map((station) => (
                <tr key={station.stationID} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-mono text-slate-600">{station.stationID}</td>
                  <td className="px-6 py-4 font-medium text-slate-900">{station.stationCodeString}</td>
                  <td className="px-6 py-4 text-slate-900">{station.stationNameString}</td>
                  <td className="px-6 py-4 text-slate-600">{station.contactNoString}</td>
                  <td className="px-6 py-4 text-slate-600">{station.distanceFromFort}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      station.stationStatus === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {station.stationStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => setEditingStation(station)} className="p-1.5 text-slate-400 hover:text-indigo-600 transition-colors rounded-md hover:bg-indigo-50"><Edit2 className="h-4 w-4" /></button>
                      <button className="p-1.5 text-slate-400 hover:text-red-600 transition-colors rounded-md hover:bg-red-50"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
