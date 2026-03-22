import React from 'react';

export function SettingsView() {
  return (
    <div className="max-w-3xl bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
      <h3 className="text-xl font-semibold text-slate-800 mb-6">System Settings</h3>
      
      <div className="space-y-8">
        <div>
          <h4 className="text-sm font-semibold text-slate-800 mb-4 uppercase tracking-wider border-b border-slate-100 pb-2">General</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-slate-900">Maintenance Mode</p>
                <p className="text-sm text-slate-500">Disable customer booking temporarily.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-slate-900">Email Notifications</p>
                <p className="text-sm text-slate-500">Send automated emails for bookings and cancellations.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-slate-800 mb-4 uppercase tracking-wider border-b border-slate-100 pb-2">Booking Rules</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Max Tickets per Booking</label>
              <select className="w-full md:w-64 rounded-lg border border-slate-300 py-2.5 px-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white">
                <option>4</option>
                <option>6</option>
                <option>8</option>
                <option>10</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Cancellation Window (Hours before departure)</label>
              <input type="number" defaultValue={24} className="w-full md:w-64 rounded-lg border border-slate-300 py-2.5 px-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
            </div>
          </div>
        </div>

        <div className="pt-4">
          <button type="button" className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-sm transition-colors">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}
