import React from 'react'
import { X, MapPin, Phone, Map, Mountain, Code } from 'lucide-react'

export default function UpdateStationModal({
  isOpen,
  onClose,
  form,
  formError,
  isLoading,
  onInputChange,
  onSubmit
}) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-white/95 backdrop-blur-xl border border-white/20 rounded-xl max-w-md w-full shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600 to-orange-600 px-6 py-4 flex justify-between items-center sticky top-0">
          <h2 className="text-xl font-bold text-white">Update Station</h2>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 p-1 rounded-lg transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="p-6 space-y-4">
          {/* Error Message */}
          {formError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm font-medium">{formError}</p>
            </div>
          )}

          {/* Station ID (Read-only) */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Station ID (Read-only)
            </label>
            <input
              type="number"
              value={form.stationID}
              disabled
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
            />
          </div>

          {/* Station Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Station Name *
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="stationNameString"
                value={form.stationNameString}
                onChange={onInputChange}
                placeholder="e.g., Mumbai Central Station"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Station Code */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Station Code *
            </label>
            <div className="relative">
              <Code className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="stationCodeString"
                value={form.stationCodeString}
                onChange={onInputChange}
                placeholder="e.g., MUM_C"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Contact Number */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Contact Number *
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="tel"
                name="contactNoString"
                value={form.contactNoString}
                onChange={onInputChange}
                placeholder="e.g., +91-9876543210"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Distance from Fort */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Distance from Fort (km) *
            </label>
            <div className="relative">
              <Map className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="number"
                name="distanceFromFort"
                value={form.distanceFromFort}
                onChange={onInputChange}
                placeholder="e.g., 15.5"
                step="0.1"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Elevation */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Elevation (meters) *
            </label>
            <div className="relative">
              <Mountain className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="number"
                name="elevation"
                value={form.elevation}
                onChange={onInputChange}
                placeholder="e.g., 14.5"
                step="0.1"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg hover:from-amber-700 hover:to-orange-700 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Updating Station...' : 'Update Station'}
          </button>
        </form>
      </div>
    </div>
  )
}
