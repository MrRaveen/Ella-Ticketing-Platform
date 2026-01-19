import React from 'react'
import { Plus, User } from 'lucide-react'

export default function AdminManagement({ admins, onAddClick, onDelete }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-8 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Manage Admins</h2>
        <button
          onClick={onAddClick}
          className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-semibold"
        >
          <Plus className="w-5 h-5" />
          Add New Admin
        </button>
      </div>

      {admins.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Name</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Username</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Contact</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Role</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Address</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {admins.map(admin => (
                <tr key={admin.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-4 py-3">{admin.fname} {admin.lname}</td>
                  <td className="px-4 py-3">{admin.username}</td>
                  <td className="px-4 py-3">{admin.contactNo}</td>
                  <td className="px-4 py-3">
                    <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">
                      {admin.role}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{admin.address}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => onDelete(admin.id)}
                      className="text-red-600 hover:text-red-800 font-medium text-sm transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <User className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600">No admins added yet. Click "Add New Admin" to get started.</p>
        </div>
      )}
    </div>
  )
}
