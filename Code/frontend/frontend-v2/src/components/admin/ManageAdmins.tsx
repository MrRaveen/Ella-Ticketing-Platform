import React, { useState } from 'react';
import { Plus, Trash2, Edit2 } from 'lucide-react';

const MOCK_ADMINS = [
  { username: 'admin1', fname: 'John', lname: 'Doe', role: 'SUPER_ADMIN', contactNo: '1234567890', address: '123 Main St' },
  { username: 'admin2', fname: 'Jane', lname: 'Smith', role: 'ADMIN', contactNo: '0987654321', address: '456 Oak Ave' },
];

export function ManageAdmins() {
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-slate-800">Manage Administrators</h2>
        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          {showAddForm ? 'Cancel' : 'Add Admin'}
        </button>
      </div>

      {showAddForm && (
        <form className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <h3 className="text-lg font-semibold text-slate-800 border-b border-slate-100 pb-3">Add New Admin</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Username</label>
              <input type="text" className="w-full rounded-lg border border-slate-300 py-2 px-3 text-sm focus:ring-1 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <input type="password" className="w-full rounded-lg border border-slate-300 py-2 px-3 text-sm focus:ring-1 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
              <input type="text" className="w-full rounded-lg border border-slate-300 py-2 px-3 text-sm focus:ring-1 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
              <input type="text" className="w-full rounded-lg border border-slate-300 py-2 px-3 text-sm focus:ring-1 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Contact Number</label>
              <input type="text" className="w-full rounded-lg border border-slate-300 py-2 px-3 text-sm focus:ring-1 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Role</label>
              <select className="w-full rounded-lg border border-slate-300 py-2 px-3 text-sm focus:ring-1 focus:ring-indigo-500 bg-white">
                <option value="ADMIN">ADMIN</option>
                <option value="SUPER_ADMIN">SUPER_ADMIN</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Address</label>
              <textarea className="w-full rounded-lg border border-slate-300 py-2 px-3 text-sm focus:ring-1 focus:ring-indigo-500" rows={3}></textarea>
            </div>
          </div>
          <div className="flex justify-end">
            <button type="button" className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700">Save Admin</button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Username</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_ADMINS.map((admin, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-mono text-slate-600">{admin.username}</td>
                  <td className="px-6 py-4 font-medium text-slate-900">{admin.fname} {admin.lname}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                      {admin.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{admin.contactNo}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-1.5 text-slate-400 hover:text-indigo-600 transition-colors rounded-md hover:bg-indigo-50"><Edit2 className="h-4 w-4" /></button>
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
