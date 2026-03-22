import React, { useState } from 'react';
import { ArrowRight, Edit2, Trash2, X } from 'lucide-react';

const MOCK_TRAINS = [
  { TrainID: 1, TrainName: 'Express InterCity 402', Status: true, DriverName: 'John Smith', stationsID: 1, trainInfoID: 101 },
  { TrainID: 2, TrainName: 'Coastal Flyer 110', Status: true, DriverName: 'Jane Doe', stationsID: 2, trainInfoID: 102 },
  { TrainID: 3, TrainName: 'Midnight Sleeper', Status: false, DriverName: 'Mike Johnson', stationsID: 3, trainInfoID: 103 },
];

export function ManageTrains() {
  const [editingTrain, setEditingTrain] = useState<any>(null);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-slate-800">Train Inventory</h2>
      </div>

      {editingTrain && (
        <form className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6 relative">
          <button 
            type="button" 
            onClick={() => setEditingTrain(null)}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
          <h3 className="text-lg font-semibold text-slate-800 border-b border-slate-100 pb-3">Update Train: {editingTrain.TrainName}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Train ID</label>
              <input type="number" disabled defaultValue={editingTrain.TrainID} className="w-full rounded-lg border border-slate-300 py-2 px-3 text-sm bg-slate-50 text-slate-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Train Name</label>
              <input type="text" defaultValue={editingTrain.TrainName} className="w-full rounded-lg border border-slate-300 py-2 px-3 text-sm focus:ring-1 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
              <select defaultValue={editingTrain.Status ? "true" : "false"} className="w-full rounded-lg border border-slate-300 py-2 px-3 text-sm focus:ring-1 focus:ring-indigo-500 bg-white">
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Driver Name</label>
              <input type="text" defaultValue={editingTrain.DriverName} className="w-full rounded-lg border border-slate-300 py-2 px-3 text-sm focus:ring-1 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Station ID</label>
              <select defaultValue={editingTrain.stationsID} className="w-full rounded-lg border border-slate-300 py-2 px-3 text-sm focus:ring-1 focus:ring-indigo-500 bg-white">
                <option value="1">Station 1</option>
                <option value="2">Station 2</option>
                <option value="3">Station 3</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Train Info ID</label>
              <select defaultValue={editingTrain.trainInfoID} className="w-full rounded-lg border border-slate-300 py-2 px-3 text-sm focus:ring-1 focus:ring-indigo-500 bg-white">
                <option value="101">Info 101</option>
                <option value="102">Info 102</option>
                <option value="103">Info 103</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <button type="button" onClick={() => setEditingTrain(null)} className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50">Cancel</button>
            <button type="button" className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700">Update Train</button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-slate-800">All Trains</h3>
          <button className="text-sm text-indigo-600 font-medium hover:text-indigo-700">Export CSV</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Train ID</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Driver</th>
                <th className="px-6 py-4">Station ID</th>
                <th className="px-6 py-4">Info ID</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_TRAINS.map((train) => (
                <tr key={train.TrainID} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-mono text-slate-600">{train.TrainID}</td>
                  <td className="px-6 py-4 font-medium text-slate-900">{train.TrainName}</td>
                  <td className="px-6 py-4 text-slate-600">{train.DriverName}</td>
                  <td className="px-6 py-4 text-slate-600">{train.stationsID}</td>
                  <td className="px-6 py-4 text-slate-600">{train.trainInfoID}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      train.Status ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {train.Status ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => setEditingTrain(train)} className="p-1.5 text-slate-400 hover:text-indigo-600 transition-colors rounded-md hover:bg-indigo-50"><Edit2 className="h-4 w-4" /></button>
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
