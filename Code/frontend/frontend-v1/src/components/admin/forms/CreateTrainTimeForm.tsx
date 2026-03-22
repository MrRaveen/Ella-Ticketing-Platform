import React, { useState, useEffect } from 'react';
import { Loader2, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { api } from '../../../services/api';

export function CreateTrainTimeForm() {
  const [trains, setTrains] = useState<any[]>([]);
  const [routes, setRoutes] = useState<any[]>([]);
  const [platforms, setPlatforms] = useState<any[]>([]);
  
  const [formData, setFormData] = useState({
    trainId: '',
    routeId: '',
    platformId: '',
    status: '',
    departureDate: '',
    departureTime: '',
    arrivalDate: '',
    arrivalTime: '',
    totalCapacity: '',
    seatRemainingCount: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [trainsData, routesData, platformsData] = await Promise.all([
          api.trains.getAll(),
          api.routes.getAll(),
          api.platforms.getAll()
        ]);
        setTrains(trainsData);
        setRoutes(routesData);
        setPlatforms(platformsData);
      } catch (err) {
        console.error('Failed to load data for combo boxes', err);
      }
    };
    loadData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess(false);

    try {
      await api.trainTimes.add({
        ...formData,
        totalCapacity: Number(formData.totalCapacity),
        seatRemainingCount: Number(formData.seatRemainingCount)
      });
      setSuccess(true);
      setFormData({
        trainId: '',
        routeId: '',
        platformId: '',
        status: '',
        departureDate: '',
        departureTime: '',
        arrivalDate: '',
        arrivalTime: '',
        totalCapacity: '',
        seatRemainingCount: ''
      });
    } catch (err: any) {
      setError(err.message || 'Failed to create train time');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-800 border-b border-slate-100 pb-3">Create Train Time</h3>
      
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 shrink-0" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      {success && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <p className="text-sm font-medium">Train time created successfully!</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Train</label>
          <select name="trainId" value={formData.trainId} onChange={handleChange} required className="w-full rounded-lg border border-slate-300 py-2 px-3 text-sm focus:ring-1 focus:ring-blue-500 bg-white">
            <option value="">Select Train...</option>
            {trains.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Route</label>
          <select name="routeId" value={formData.routeId} onChange={handleChange} required className="w-full rounded-lg border border-slate-300 py-2 px-3 text-sm focus:ring-1 focus:ring-blue-500 bg-white">
            <option value="">Select Route...</option>
            {routes.map(r => <option key={r.id} value={r.id}>{r.name || r.id}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Platform</label>
          <select name="platformId" value={formData.platformId} onChange={handleChange} required className="w-full rounded-lg border border-slate-300 py-2 px-3 text-sm focus:ring-1 focus:ring-blue-500 bg-white">
            <option value="">Select Platform...</option>
            {platforms.map(p => <option key={p.id} value={p.id}>{p.name || p.id}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
          <input type="text" name="status" value={formData.status} onChange={handleChange} required className="w-full rounded-lg border border-slate-300 py-2 px-3 text-sm focus:ring-1 focus:ring-blue-500" placeholder="e.g. Scheduled" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Departure Date</label>
          <input type="date" name="departureDate" value={formData.departureDate} onChange={handleChange} required className="w-full rounded-lg border border-slate-300 py-2 px-3 text-sm focus:ring-1 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Departure Time</label>
          <input type="time" name="departureTime" value={formData.departureTime} onChange={handleChange} required className="w-full rounded-lg border border-slate-300 py-2 px-3 text-sm focus:ring-1 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Arrival Date</label>
          <input type="date" name="arrivalDate" value={formData.arrivalDate} onChange={handleChange} required className="w-full rounded-lg border border-slate-300 py-2 px-3 text-sm focus:ring-1 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Arrival Time</label>
          <input type="time" name="arrivalTime" value={formData.arrivalTime} onChange={handleChange} required className="w-full rounded-lg border border-slate-300 py-2 px-3 text-sm focus:ring-1 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Total Capacity</label>
          <input type="number" name="totalCapacity" value={formData.totalCapacity} onChange={handleChange} required className="w-full rounded-lg border border-slate-300 py-2 px-3 text-sm focus:ring-1 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Seat Remaining Count</label>
          <input type="number" name="seatRemainingCount" value={formData.seatRemainingCount} onChange={handleChange} required className="w-full rounded-lg border border-slate-300 py-2 px-3 text-sm focus:ring-1 focus:ring-blue-500" />
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
