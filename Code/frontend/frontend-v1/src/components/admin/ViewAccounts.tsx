import React, { useState, useEffect } from 'react';
import { Eye, ArrowRight, Ticket, Activity, Loader2 } from 'lucide-react';
import { api } from '../../services/api';

export function ViewAccounts() {
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const allUsers = await api.users.getAll();
        const customers = allUsers.filter((u: any) => u.role === 'CUSTOMER');
        
        // Fetch bookings to get ticket counts
        const allBookings = await api.bookings.getAll();
        
        const usersWithStats = customers.map((user: any) => {
          const userBookings = allBookings.filter((b: any) => b.userId === user.id);
          return {
            ...user,
            tickets: userBookings.length,
            joined: '2023-01-01', // Mock joined date as it's not in the DB schema yet
            bookings: userBookings
          };
        });
        
        setUsers(usersWithStats);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUsers();
  }, []);

  if (isLoading) {
    return <div className="flex items-center justify-center h-64"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>;
  }

  if (selectedUser) {
    return <UserDetails user={selectedUser} onBack={() => setSelectedUser(null)} />;
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-200 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-slate-800">Customer Accounts</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
            <tr>
              <th className="px-6 py-4">Customer ID</th>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Total Tickets</th>
              <th className="px-6 py-4">Joined Date</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4 font-mono text-slate-600">{user.id.substring(0, 8)}...</td>
                <td className="px-6 py-4 font-medium text-slate-900">{user.fname} {user.lname}</td>
                <td className="px-6 py-4 text-slate-600">{user.email}</td>
                <td className="px-6 py-4 text-slate-600">{user.tickets}</td>
                <td className="px-6 py-4 text-slate-600">{user.joined}</td>
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={() => setSelectedUser(user)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function UserDetails({ user, onBack }: { user: any, onBack: () => void }) {
  if (!user) return null;

  return (
    <div className="space-y-6">
      <button onClick={onBack} className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors">
        <ArrowRight className="h-4 w-4 rotate-180" /> Back to Accounts
      </button>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <div className="flex items-center gap-6">
          <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-display text-3xl font-bold border-2 border-blue-200 uppercase">
            {user.fname?.charAt(0) || 'U'}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">{user.fname} {user.lname}</h2>
            <p className="text-slate-500">{user.email} • ID: <span className="font-mono">{user.id.substring(0, 8)}</span></p>
            <div className="mt-2 flex gap-4 text-sm">
              <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md font-medium">Joined: {user.joined}</span>
              <span className="bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-md font-medium">Active Account</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tickets Booked */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <Ticket className="h-5 w-5 text-blue-600" /> Tickets Booked ({user.tickets})
          </h3>
          {user.tickets > 0 ? (
            <div className="space-y-3">
              {user.bookings.map((booking: any) => (
                <div key={booking.id} className="p-4 border border-slate-100 rounded-xl bg-slate-50/50">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-mono text-xs text-slate-500">#TCK-{booking.id.substring(0, 8)}</span>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      booking.status === 'CANCELLED' ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                  <p className="font-medium text-slate-900">{booking.trainName}</p>
                  <p className="text-sm text-slate-600 mt-1">{booking.routeStart} → {booking.routeEnd} • {new Date(booking.date).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500 italic">No tickets booked yet.</p>
          )}
        </div>

        {/* Activity History */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <Activity className="h-5 w-5 text-blue-600" /> Activity History
          </h3>
          <div className="relative border-l border-slate-200 ml-3 space-y-6 pb-4">
            {[
              { action: 'Logged in', time: 'Today, 09:41 AM' },
              { action: 'Account created', time: user.joined },
            ].map((log, i) => (
              <div key={i} className="relative pl-6">
                <div className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full bg-slate-200 border-2 border-white"></div>
                <p className="text-sm font-medium text-slate-900">{log.action}</p>
                <p className="text-xs text-slate-500 mt-0.5">{log.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
