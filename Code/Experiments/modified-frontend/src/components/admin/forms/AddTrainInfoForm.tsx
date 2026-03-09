import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

export function AddTrainInfoForm() {
  const [seatInfos, setSeatInfos] = useState([{ id: Date.now() }]);

  const addSeatInfo = () => setSeatInfos([...seatInfos, { id: Date.now() }]);
  const removeSeatInfo = (id: number) => setSeatInfos(seatInfos.filter(s => s.id !== id));

  return (
    <form className="space-y-6 max-w-4xl bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-800 border-b border-slate-100 pb-3">Add Train Info</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
          <input type="text" className="w-full rounded-lg border border-slate-300 py-2 px-3 text-sm focus:ring-1 focus:ring-indigo-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Reporting No</label>
          <input type="text" className="w-full rounded-lg border border-slate-300 py-2 px-3 text-sm focus:ring-1 focus:ring-indigo-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Engine Code</label>
          <input type="text" className="w-full rounded-lg border border-slate-300 py-2 px-3 text-sm focus:ring-1 focus:ring-indigo-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Service Started Year</label>
          <input type="number" className="w-full rounded-lg border border-slate-300 py-2 px-3 text-sm focus:ring-1 focus:ring-indigo-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Manufactured Year</label>
          <input type="number" className="w-full rounded-lg border border-slate-300 py-2 px-3 text-sm focus:ring-1 focus:ring-indigo-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Average Speed</label>
          <input type="number" step="0.1" className="w-full rounded-lg border border-slate-300 py-2 px-3 text-sm focus:ring-1 focus:ring-indigo-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Total Operation Hours</label>
          <input type="number" step="0.1" className="w-full rounded-lg border border-slate-300 py-2 px-3 text-sm focus:ring-1 focus:ring-indigo-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Accidents Count</label>
          <input type="number" className="w-full rounded-lg border border-slate-300 py-2 px-3 text-sm focus:ring-1 focus:ring-indigo-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Train Status</label>
          <input type="text" className="w-full rounded-lg border border-slate-300 py-2 px-3 text-sm focus:ring-1 focus:ring-indigo-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Train Class</label>
          <input type="text" className="w-full rounded-lg border border-slate-300 py-2 px-3 text-sm focus:ring-1 focus:ring-indigo-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Total Seats Count</label>
          <input type="number" className="w-full rounded-lg border border-slate-300 py-2 px-3 text-sm focus:ring-1 focus:ring-indigo-500" />
        </div>
      </div>

      <div className="pt-4 border-t border-slate-100">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-sm font-semibold text-slate-800">Train Seat Info</h4>
          <button type="button" onClick={addSeatInfo} className="text-xs flex items-center gap-1 text-indigo-600 font-medium hover:text-indigo-700">
            <Plus className="h-3 w-3" /> Add Seat Info
          </button>
        </div>
        <div className="space-y-3">
          {seatInfos.map((seat, index) => (
            <div key={seat.id} className="flex items-center gap-3">
              <div className="flex-1">
                <input type="text" placeholder="Seat Info Details..." className="w-full rounded-lg border border-slate-300 py-2 px-3 text-sm focus:ring-1 focus:ring-indigo-500" />
              </div>
              {seatInfos.length > 1 && (
                <button type="button" onClick={() => removeSeatInfo(seat.id)} className="p-2 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50">
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
