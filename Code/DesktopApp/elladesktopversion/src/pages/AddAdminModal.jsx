import React from 'react'
import { X, Plus, User, Lock, Phone, MapPin, Shield } from 'lucide-react'

export default function AddAdminModal({ isOpen, onClose, form, formError, isLoading, roles, onInputChange, onSubmit }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/20">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 px-8 py-6 flex justify-between items-center sticky top-0">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Plus className="w-6 h-6" />
            Add New Admin
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:opacity-80 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-8">
          {formError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 font-medium">{formError}</p>
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  <div className="flex items-center gap-2 mb-1">
                    <User className="w-4 h-4" />
                    Username *
                  </div>
                </label>
                <input
                  type="text"
                  name="username"
                  value={form.username}
                  onChange={onInputChange}
                  placeholder="Enter username"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  <div className="flex items-center gap-2 mb-1">
                    <Lock className="w-4 h-4" />
                    Password *
                  </div>
                </label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={onInputChange}
                  placeholder="Enter password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  name="fname"
                  value={form.fname}
                  onChange={onInputChange}
                  placeholder="Enter first name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  name="lname"
                  value={form.lname}
                  onChange={onInputChange}
                  placeholder="Enter last name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                <div className="flex items-center gap-2 mb-1">
                  <Phone className="w-4 h-4" />
                  Contact Number *
                </div>
              </label>
              <input
                type="tel"
                name="contactNo"
                value={form.contactNo}
                onChange={onInputChange}
                placeholder="Enter contact number"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                <div className="flex items-center gap-2 mb-1">
                  <MapPin className="w-4 h-4" />
                  Address *
                </div>
              </label>
              <textarea
                name="address"
                value={form.address}
                onChange={onInputChange}
                placeholder="Enter full address"
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                <div className="flex items-center gap-2 mb-1">
                  <Shield className="w-4 h-4" />
                  Role *
                </div>
              </label>
              <select
                name="role"
                value={form.role}
                onChange={onInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent bg-white"
              >
                {roles.map(role => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-lg hover:from-indigo-700 hover:to-blue-700 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Creating Admin...' : 'Create Admin'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
