import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

export function CreateRouteForm() {
  const [locations, setLocations] = useState([{ id: Date.now() }]);

  const addLocation = () => setLocations([...locations, { id: Date.now() }]);
  const removeLocation = (id: number) => setLocations(locations.filter(l => l.id !== id));

  return (
    <form className="space-y-6 max-w-3xl bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-800 border-b border-slate-100 pb-3">Create Route</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Route Name</label>
          <input type="text" className="w-full rounded-lg border border-slate-300 py-2 px-3 text-sm focus:ring-1 focus:ring-indigo-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Route Code</label>
          <input type="text" className="w-full rounded-lg border border-slate-300 py-2 px-3 text-sm focus:ring-1 focus:ring-indigo-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Start Station</label>
          <select className="w-full rounded-lg border border-slate-300 py-2 px-3 text-sm focus:ring-1 focus:ring-indigo-500 bg-white">
            <option value="">Select Station...</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">End Station</label>
          <select className="w-full rounded-lg border border-slate-300 py-2 px-3 text-sm focus:ring-1 focus:ring-indigo-500 bg-white">
            <option value="">Select Station...</option>
          </select>
        </div>
      </div>

      <div className="pt-4 border-t border-slate-100">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-sm font-semibold text-slate-800">Route Locations</h4>
          <button type="button" onClick={addLocation} className="text-xs flex items-center gap-1 text-indigo-600 font-medium hover:text-indigo-700">
            <Plus className="h-3 w-3" /> Add Location
          </button>
        </div>
        <div className="space-y-3">
          {locations.map((loc, index) => (
            <div key={loc.id} className="flex items-center gap-3">
              <div className="flex-1">
                <input type="text" placeholder="Location Details..." className="w-full rounded-lg border border-slate-300 py-2 px-3 text-sm focus:ring-1 focus:ring-indigo-500" />
              </div>
              {locations.length > 1 && (
                <button type="button" onClick={() => removeLocation(loc.id)} className="p-2 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50">
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button type="button" className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700">Submit</button>
      </div>
    </form>
  );
}
