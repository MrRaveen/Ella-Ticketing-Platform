import React from 'react'
import { X, Plus, AlertCircle, Zap, Calendar, Gauge } from 'lucide-react'

export default function AddBusModal({ isOpen, onClose, form, formError, isLoading, trainStatuses, trainClasses, onInputChange, onSubmit }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-white/20">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 px-8 py-6 flex justify-between items-center sticky top-0">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Plus className="w-6 h-6" />
            Add New Bus
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
              <p className="text-red-700 font-medium flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                {formError}
              </p>
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-6">
            {/* Basic Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">Basic Information</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Bus Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={onInputChange}
                    placeholder="e.g., Express 101"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Reporting Number *
                  </label>
                  <input
                    type="text"
                    name="reportingNo"
                    value={form.reportingNo}
                    onChange={onInputChange}
                    placeholder="e.g., MH-02-1234"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Engine Code *
                  </label>
                  <input
                    type="text"
                    name="engineCode"
                    value={form.engineCode}
                    onChange={onInputChange}
                    placeholder="e.g., ENG-2024-001"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4" />
                      Train Seats Count *
                    </div>
                  </label>
                  <input
                    type="number"
                    name="trainSeatsCount"
                    value={form.trainSeatsCount}
                    onChange={onInputChange}
                    placeholder="e.g., 50"
                    min="1"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Manufacturing Details */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">Manufacturing Details</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Manufactured Year *
                    </div>
                  </label>
                  <input
                    type="number"
                    name="manufacturedYear"
                    value={form.manufacturedYear}
                    onChange={onInputChange}
                    min="1980"
                    max={new Date().getFullYear()}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Service Started Year *
                    </div>
                  </label>
                  <input
                    type="number"
                    name="serviceStartedYear"
                    value={form.serviceStartedYear}
                    onChange={onInputChange}
                    min="1980"
                    max={new Date().getFullYear()}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Performance Details */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">Performance Details</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    <div className="flex items-center gap-2">
                      <Gauge className="w-4 h-4" />
                      Average Speed (km/h) *
                    </div>
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    name="avgSpeed"
                    value={form.avgSpeed}
                    onChange={onInputChange}
                    placeholder="e.g., 60.5"
                    min="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Total Operation Hours *
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    name="totOperationHours"
                    value={form.totOperationHours}
                    onChange={onInputChange}
                    placeholder="e.g., 1500.5"
                    min="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      Accident Count
                    </div>
                  </label>
                  <input
                    type="number"
                    name="accidentCount"
                    value={form.accidentCount}
                    onChange={onInputChange}
                    min="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Train Status *
                  </label>
                  <select
                    name="trainStatus"
                    value={form.trainStatus}
                    onChange={onInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent bg-white"
                  >
                    {trainStatuses.map(status => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Train Class *
                  </label>
                  <select
                    name="trainClass"
                    value={form.trainClass}
                    onChange={onInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent bg-white"
                  >
                    {trainClasses.map(trainClass => (
                      <option key={trainClass} value={trainClass}>
                        {trainClass}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Form Actions */}
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
                {isLoading ? 'Adding Bus...' : 'Add Bus'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
