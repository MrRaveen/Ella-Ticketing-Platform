import React, { useState } from 'react';
import { Loader2, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { api } from '../../../services/api';

export function CreateTrainForm() {
  const [formData, setFormData] = useState({
    name: '',
    status: 'Active',
    routeStart: '',
    routeEnd: '',
    departTime: '',
    arriveTime: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess(false);

    try {
      await api.trains.add({
        ...formData,
        stoppingLocations: [], // Default empty for now
        classes: [
          { name: 'First Class', remainingSeats: 40, totalSeats: 40, price: 1500 },
          { name: 'Second Class', remainingSeats: 80, totalSeats: 80, price: 800 },
          { name: 'Third Class', remainingSeats: 200, totalSeats: 200, price: 400 }
        ]
      });
      setSuccess(true);
      setFormData({
        name: '',
        status: 'Active',
        routeStart: '',
        routeEnd: '',
        departTime: '',
        arriveTime: ''
      });
    } catch (err: any) {
      setError(err.message || 'Failed to create train');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-800 border-b border-slate-100 pb-3">Create Train</h3>
      
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 shrink-0" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      {success && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <p className="text-sm font-medium">Train created successfully!</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Train Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full rounded-lg border border-slate-300 py-2 px-3 text-sm focus:ring-1 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
          <select name="status" value={formData.status} onChange={handleChange} className="w-full rounded-lg border border-slate-300 py-2 px-3 text-sm focus:ring-1 focus:ring-blue-500 bg-white">
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Route Start</label>
          <input type="text" name="routeStart" value={formData.routeStart} onChange={handleChange} required className="w-full rounded-lg border border-slate-300 py-2 px-3 text-sm focus:ring-1 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Route End</label>
          <input type="text" name="routeEnd" value={formData.routeEnd} onChange={handleChange} required className="w-full rounded-lg border border-slate-300 py-2 px-3 text-sm focus:ring-1 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Depart Time</label>
          <input type="time" name="departTime" value={formData.departTime} onChange={handleChange} required className="w-full rounded-lg border border-slate-300 py-2 px-3 text-sm focus:ring-1 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Arrive Time</label>
          <input type="time" name="arriveTime" value={formData.arriveTime} onChange={handleChange} required className="w-full rounded-lg border border-slate-300 py-2 px-3 text-sm focus:ring-1 focus:ring-blue-500" />
        </div>
      </div>
      <div className="flex justify-end">
        <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-70 flex items-center gap-2">
          {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Submit'}
        </button>
      </div>
    </form>
  );
}
