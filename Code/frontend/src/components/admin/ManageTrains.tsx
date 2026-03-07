import React, { useState, useEffect } from 'react';
import { ArrowRight, Edit2, Trash2, X, Loader2 } from 'lucide-react';
import { api } from '../../services/api';

export function ManageTrains() {
  const [trains, setTrains] = useState<any[]>([]);
  const [editingTrain, setEditingTrain] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTrains();
  }, []);

  const loadTrains = async () => {
    setIsLoading(true);
    try {
      const data = await api.trains.getAll();
      setTrains(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this train?')) {
      await api.trains.delete(id);
      loadTrains();
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTrain) return;
    
    await api.trains.update(editingTrain.id, editingTrain);
    setEditingTrain(null);
    loadTrains();
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-64"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-slate-800">Train Inventory</h2>
      </div>

      {editingTrain && (
        <form onSubmit={handleUpdate} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6 relative">
          <button 
            type="button" 
            onClick={() => setEditingTrain(null)}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
          <h3 className="text-lg font-semibold text-slate-800 border-b border-slate-100 pb-3">Update Train: {editingTrain.name}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Train ID</label>
              <input type="text" disabled defaultValue={editingTrain.id} className="w-full rounded-lg border border-slate-300 py-2 px-3 text-sm bg-slate-50 text-slate-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Train Name</label>
              <input type="text" value={editingTrain.name} onChange={e => setEditingTrain({...editingTrain, name: e.target.value})} className="w-full rounded-lg border border-slate-300 py-2 px-3 text-sm focus:ring-1 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
              <select value={editingTrain.status} onChange={e => setEditingTrain({...editingTrain, status: e.target.value})} className="w-full rounded-lg border border-slate-300 py-2 px-3 text-sm focus:ring-1 focus:ring-blue-500 bg-white">
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Route Start</label>
              <input type="text" value={editingTrain.routeStart} onChange={e => setEditingTrain({...editingTrain, routeStart: e.target.value})} className="w-full rounded-lg border border-slate-300 py-2 px-3 text-sm focus:ring-1 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Route End</label>
              <input type="text" value={editingTrain.routeEnd} onChange={e => setEditingTrain({...editingTrain, routeEnd: e.target.value})} className="w-full rounded-lg border border-slate-300 py-2 px-3 text-sm focus:ring-1 focus:ring-blue-500" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Depart Time</label>
                <input type="time" value={editingTrain.departTime} onChange={e => setEditingTrain({...editingTrain, departTime: e.target.value})} className="w-full rounded-lg border border-slate-300 py-2 px-3 text-sm focus:ring-1 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Arrive Time</label>
                <input type="time" value={editingTrain.arriveTime} onChange={e => setEditingTrain({...editingTrain, arriveTime: e.target.value})} className="w-full rounded-lg border border-slate-300 py-2 px-3 text-sm focus:ring-1 focus:ring-blue-500" />
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <button type="button" onClick={() => setEditingTrain(null)} className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">Update Train</button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-slate-800">All Trains</h3>
          <button className="text-sm text-blue-600 font-medium hover:text-blue-700">Export CSV</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Train ID</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Route</th>
                <th className="px-6 py-4">Schedule</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {trains.map((train) => (
                <tr key={train.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-mono text-slate-600">{train.id.substring(0, 8)}...</td>
                  <td className="px-6 py-4 font-medium text-slate-900">{train.name}</td>
                  <td className="px-6 py-4 text-slate-600">{train.routeStart} <ArrowRight className="inline w-3 h-3 mx-1" /> {train.routeEnd}</td>
                  <td className="px-6 py-4 text-slate-600">{train.departTime} - {train.arriveTime}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      train.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {train.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => setEditingTrain(train)} className="p-1.5 text-slate-400 hover:text-blue-600 transition-colors rounded-md hover:bg-blue-50"><Edit2 className="h-4 w-4" /></button>
                      <button onClick={() => handleDelete(train.id)} className="p-1.5 text-slate-400 hover:text-red-600 transition-colors rounded-md hover:bg-red-50"><Trash2 className="h-4 w-4" /></button>
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
