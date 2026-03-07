import React, { useState, useEffect } from 'react';
import { Train, Ticket, Users, Activity, Loader2 } from 'lucide-react';
import { api } from '../../services/api';

export function DashboardOverview() {
  const [stats, setStats] = useState({
    trains: 0,
    bookings: 0,
    customers: 0,
    revenue: 0
  });
  const [recentBookings, setRecentBookings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [trains, bookings, users] = await Promise.all([
          api.trains.getAll(),
          api.bookings.getAll(),
          api.users.getAll()
        ]);

        const customers = users.filter((u: any) => u.role === 'CUSTOMER');
        const revenue = bookings.reduce((acc: number, b: any) => acc + (b.price || 0), 0);
        
        setStats({
          trains: trains.length,
          bookings: bookings.length,
          customers: customers.length,
          revenue: revenue
        });

        // Sort by createdAt descending and take top 4
        const sortedBookings = [...bookings].sort((a, b) => {
          return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
        }).slice(0, 4);
        
        setRecentBookings(sortedBookings);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  if (isLoading) {
    return <div className="flex items-center justify-center h-64"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Trains', value: stats.trains.toString(), icon: <Train />, color: 'text-blue-600', bg: 'bg-blue-100' },
          { label: 'Active Bookings', value: stats.bookings.toString(), icon: <Ticket />, color: 'text-emerald-600', bg: 'bg-emerald-100' },
          { label: 'Total Customers', value: stats.customers.toString(), icon: <Users />, color: 'text-blue-600', bg: 'bg-blue-100' },
          { label: 'Total Revenue', value: `Rs. ${stats.revenue.toLocaleString()}`, icon: <Activity />, color: 'text-purple-600', bg: 'bg-purple-100' },
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
          {recentBookings.length === 0 ? (
            <p className="text-sm text-slate-500">No recent bookings found.</p>
          ) : (
            recentBookings.map((booking) => (
              <div key={booking.id} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0 last:pb-0">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                    <Ticket className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">New ticket booked for {booking.trainName}</p>
                    <p className="text-xs text-slate-500">
                      {new Date(booking.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
                <span className="text-sm font-medium text-emerald-600">+Rs. {booking.price.toLocaleString()}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
