import React from 'react';

export function CreateStationForm() {
  return (
    <form className="space-y-6 max-w-2xl bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-800 border-b border-slate-100 pb-3">Create Station</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Station Name</label>
          <input type="text" className="w-full rounded-lg border border-slate-300 py-2 px-3 text-sm focus:ring-1 focus:ring-indigo-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Station Code</label>
          <input type="text" className="w-full rounded-lg border border-slate-300 py-2 px-3 text-sm focus:ring-1 focus:ring-indigo-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Contact Number</label>
          <input type="text" className="w-full rounded-lg border border-slate-300 py-2 px-3 text-sm focus:ring-1 focus:ring-indigo-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Distance From Fort (km)</label>
          <input type="number" step="0.1" className="w-full rounded-lg border border-slate-300 py-2 px-3 text-sm focus:ring-1 focus:ring-indigo-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Elevation (m)</label>
          <input type="number" step="0.1" className="w-full rounded-lg border border-slate-300 py-2 px-3 text-sm focus:ring-1 focus:ring-indigo-500" />
        </div>
      </div>
      <div className="flex justify-end">
        <button type="button" className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700">Submit</button>
      </div>
    </form>
  );
}
