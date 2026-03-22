import React from 'react';
import { Train, Ticket, Users, Activity } from 'lucide-react';

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Trains', value: '42', icon: <Train />, color: 'text-blue-600', bg: 'bg-blue-100' },
          { label: 'Active Bookings', value: '1,284', icon: <Ticket />, color: 'text-emerald-600', bg: 'bg-emerald-100' },
          { label: 'Total Customers', value: '8,932', icon: <Users />, color: 'text-indigo-600', bg: 'bg-indigo-100' },
          { label: 'Revenue (Today)', value: '$12,450', icon: <Activity />, color: 'text-purple-600', bg: 'bg-purple-100' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                <p className="text-3xl font-display font-bold text-slate-900 mt-2">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                {React.cloneElement(stat.icon as React.ReactElement, { className: 'h-6 w-6' })}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0 last:pb-0">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                  <Ticket className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">New ticket booked for TRN-001</p>
                  <p className="text-xs text-slate-500">2 minutes ago by Alice Johnson</p>
                </div>
              </div>
              <span className="text-sm font-medium text-emerald-600">+$120.00</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
