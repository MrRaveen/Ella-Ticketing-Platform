import React, { useState, useEffect } from 'react';
import { Edit2, Trash2, X, Loader2 } from 'lucide-react';
import { api } from '../../services/api';

export function ManageStations() {
  const [stations, setStations] = useState<any[]>([]);
  const [editingStation, setEditingStation] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStations();
  }, []);

  const loadStations = async () => {
    setIsLoading(true);
    try {
      const data = await api.stations.getAll();
      setStations(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this station?')) {
      await api.stations.delete(id);
      loadStations();
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStation) return;
    
    await api.stations.update(editingStation.id, editingStation);
    setEditingStation(null);
    loadStations();
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-64"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-slate-800">Manage Stations</h2>
      </div>

      {editingStation && (
        <form onSubmit={handleUpdate} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6 relative">
          <button 
            type="button" 
            onClick={() => setEditingStation(null)}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
          <h3 className="text-lg font-semibold text-slate-800 border-b border-slate-100 pb-3">Update Station: {editingStation.name}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Station ID</label>
              <input type="text" disabled defaultValue={editingStation.id} className="w-full rounded-lg border border-slate-300 py-2 px-3 text-sm bg-slate-50 text-slate-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Station Name</label>
              <input type="text" value={editingStation.name} onChange={e => setEditingStation({...editingStation, name: e.target.value})} className="w-full rounded-lg border border-slate-300 py-2 px-3 text-sm focus:ring-1 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Contact Number</label>
              <input type="text" value={editingStation.contactNo} onChange={e => setEditingStation({...editingStation, contactNo: e.target.value})} className="w-full rounded-lg border border-slate-300 py-2 px-3 text-sm focus:ring-1 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Distance From Fort (km)</label>
              <input type="number" step="0.1" value={editingStation.distanceFromFort} onChange={e => setEditingStation({...editingStation, distanceFromFort: Number(e.target.value)})} className="w-full rounded-lg border border-slate-300 py-2 px-3 text-sm focus:ring-1 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Elevation (m)</label>
              <input type="number" step="0.1" value={editingStation.elevation} onChange={e => setEditingStation({...editingStation, elevation: Number(e.target.value)})} className="w-full rounded-lg border border-slate-300 py-2 px-3 text-sm focus:ring-1 focus:ring-blue-500" />
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <button type="button" onClick={() => setEditingStation(null)} className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">Update Station</button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Distance (km)</th>
                <th className="px-6 py-4">Elevation (m)</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {stations.map((station) => (
                <tr key={station.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-mono text-slate-600">{station.id.substring(0, 8)}...</td>
                  <td className="px-6 py-4 text-slate-900 font-medium">{station.name}</td>
                  <td className="px-6 py-4 text-slate-600">{station.contactNo}</td>
                  <td className="px-6 py-4 text-slate-600">{station.distanceFromFort}</td>
                  <td className="px-6 py-4 text-slate-600">{station.elevation}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => setEditingStation(station)} className="p-1.5 text-slate-400 hover:text-blue-600 transition-colors rounded-md hover:bg-blue-50"><Edit2 className="h-4 w-4" /></button>
                      <button onClick={() => handleDelete(station.id)} className="p-1.5 text-slate-400 hover:text-red-600 transition-colors rounded-md hover:bg-red-50"><Trash2 className="h-4 w-4" /></button>
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
