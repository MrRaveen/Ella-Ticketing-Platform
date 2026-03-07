import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Loader2, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { api } from '../../../services/api';

export function CreateRouteForm() {
  const [stations, setStations] = useState<any[]>([]);
  const [locations, setLocations] = useState([{ id: Date.now(), stationId: '', order: 1 }]);
  
  const [formData, setFormData] = useState({
    routeName: '',
    routeCode: '',
    startStationId: '',
    endStationId: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const stationsData = await api.stations.getAll();
        setStations(stationsData);
      } catch (err) {
        console.error('Failed to load stations', err);
      }
    };
    loadData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLocationChange = (id: number, field: string, value: string | number) => {
    setLocations(locations.map(loc => loc.id === id ? { ...loc, [field]: value } : loc));
  };

  const addLocation = () => setLocations([...locations, { id: Date.now(), stationId: '', order: locations.length + 1 }]);
  const removeLocation = (id: number) => setLocations(locations.filter(l => l.id !== id));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess(false);

    try {
      await api.routes.add({
        ...formData,
        locations: locations.map(({ id, ...rest }) => rest)
      });
      setSuccess(true);
      setFormData({
        routeName: '',
        routeCode: '',
        startStationId: '',
        endStationId: ''
      });
      setLocations([{ id: Date.now(), stationId: '', order: 1 }]);
    } catch (err: any) {
      setError(err.message || 'Failed to create route');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-800 border-b border-slate-100 pb-3">Create Route</h3>
      
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 shrink-0" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      {success && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <p className="text-sm font-medium">Route created successfully!</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Route Name</label>
          <input type="text" name="routeName" value={formData.routeName} onChange={handleChange} required className="w-full rounded-lg border border-slate-300 py-2 px-3 text-sm focus:ring-1 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Route Code</label>
          <input type="text" name="routeCode" value={formData.routeCode} onChange={handleChange} required className="w-full rounded-lg border border-slate-300 py-2 px-3 text-sm focus:ring-1 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Start Station</label>
          <select name="startStationId" value={formData.startStationId} onChange={handleChange} required className="w-full rounded-lg border border-slate-300 py-2 px-3 text-sm focus:ring-1 focus:ring-blue-500 bg-white">
            <option value="">Select Station...</option>
            {stations.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">End Station</label>
          <select name="endStationId" value={formData.endStationId} onChange={handleChange} required className="w-full rounded-lg border border-slate-300 py-2 px-3 text-sm focus:ring-1 focus:ring-blue-500 bg-white">
            <option value="">Select Station...</option>
            {stations.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
        </div>
      </div>

      <div className="pt-4 border-t border-slate-100">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-sm font-semibold text-slate-800">Route Locations</h4>
          <button type="button" onClick={addLocation} className="text-xs flex items-center gap-1 text-blue-600 font-medium hover:text-blue-700">
            <Plus className="h-3 w-3" /> Add Location
          </button>
        </div>
        <div className="space-y-3">
          {locations.map((loc, index) => (
            <div key={loc.id} className="flex items-center gap-3">
              <div className="w-24">
                <input type="number" value={loc.order} onChange={(e) => handleLocationChange(loc.id, 'order', Number(e.target.value))} placeholder="Order" className="w-full rounded-lg border border-slate-300 py-2 px-3 text-sm focus:ring-1 focus:ring-blue-500" />
              </div>
              <div className="flex-1">
                <select value={loc.stationId} onChange={(e) => handleLocationChange(loc.id, 'stationId', e.target.value)} required className="w-full rounded-lg border border-slate-300 py-2 px-3 text-sm focus:ring-1 focus:ring-blue-500 bg-white">
                  <option value="">Select Station...</option>
                  {stations.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </div>
              {locations.length > 1 && (
                <button type="button" onClick={() => removeLocation(loc.id)} className="p-2 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50">
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}
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
