import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Loader2, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { api } from '../../../services/api';

export function AddTrainInfoForm() {
  const [trains, setTrains] = useState<any[]>([]);
  const [seatInfos, setSeatInfos] = useState([{ id: Date.now(), details: '' }]);
  const [formData, setFormData] = useState({
    trainId: '',
    name: '',
    reportingNo: '',
    engineCode: '',
    serviceStartedYear: '',
    manufacturedYear: '',
    averageSpeed: '',
    totalOperationHours: '',
    accidentsCount: '',
    trainStatus: '',
    trainClass: '',
    totalSeatsCount: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const trainsData = await api.trains.getAll();
        setTrains(trainsData);
      } catch (err) {
        console.error('Failed to load trains', err);
      }
    };
    loadData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSeatInfoChange = (id: number, value: string) => {
    setSeatInfos(seatInfos.map(seat => seat.id === id ? { ...seat, details: value } : seat));
  };

  const addSeatInfo = () => setSeatInfos([...seatInfos, { id: Date.now(), details: '' }]);
  const removeSeatInfo = (id: number) => setSeatInfos(seatInfos.filter(s => s.id !== id));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess(false);

    try {
      await api.trainInfos.add({
        ...formData,
        serviceStartedYear: Number(formData.serviceStartedYear),
        manufacturedYear: Number(formData.manufacturedYear),
        averageSpeed: Number(formData.averageSpeed),
        totalOperationHours: Number(formData.totalOperationHours),
        accidentsCount: Number(formData.accidentsCount),
        totalSeatsCount: Number(formData.totalSeatsCount),
        seatInfos: seatInfos.map(s => s.details).filter(Boolean)
      });
      setSuccess(true);
      setFormData({
        trainId: '',
        name: '',
        reportingNo: '',
        engineCode: '',
        serviceStartedYear: '',
        manufacturedYear: '',
        averageSpeed: '',
        totalOperationHours: '',
        accidentsCount: '',
        trainStatus: '',
        trainClass: '',
        totalSeatsCount: ''
      });
      setSeatInfos([{ id: Date.now(), details: '' }]);
    } catch (err: any) {
      setError(err.message || 'Failed to add train info');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-800 border-b border-slate-100 pb-3">Add Train Info</h3>
      
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 shrink-0" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      {success && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <p className="text-sm font-medium">Train info added successfully!</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-3">
          <label className="block text-sm font-medium text-slate-700 mb-1">Train</label>
          <select name="trainId" value={formData.trainId} onChange={handleChange} required className="w-full rounded-lg border border-slate-300 py-2 px-3 text-sm focus:ring-1 focus:ring-blue-500 bg-white">
            <option value="">Select Train...</option>
            {trains.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full rounded-lg border border-slate-300 py-2 px-3 text-sm focus:ring-1 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Reporting No</label>
          <input type="text" name="reportingNo" value={formData.reportingNo} onChange={handleChange} required className="w-full rounded-lg border border-slate-300 py-2 px-3 text-sm focus:ring-1 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Engine Code</label>
          <input type="text" name="engineCode" value={formData.engineCode} onChange={handleChange} required className="w-full rounded-lg border border-slate-300 py-2 px-3 text-sm focus:ring-1 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Service Started Year</label>
          <input type="number" name="serviceStartedYear" value={formData.serviceStartedYear} onChange={handleChange} required className="w-full rounded-lg border border-slate-300 py-2 px-3 text-sm focus:ring-1 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Manufactured Year</label>
          <input type="number" name="manufacturedYear" value={formData.manufacturedYear} onChange={handleChange} required className="w-full rounded-lg border border-slate-300 py-2 px-3 text-sm focus:ring-1 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Average Speed</label>
          <input type="number" step="0.1" name="averageSpeed" value={formData.averageSpeed} onChange={handleChange} required className="w-full rounded-lg border border-slate-300 py-2 px-3 text-sm focus:ring-1 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Total Operation Hours</label>
          <input type="number" step="0.1" name="totalOperationHours" value={formData.totalOperationHours} onChange={handleChange} required className="w-full rounded-lg border border-slate-300 py-2 px-3 text-sm focus:ring-1 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Accidents Count</label>
          <input type="number" name="accidentsCount" value={formData.accidentsCount} onChange={handleChange} required className="w-full rounded-lg border border-slate-300 py-2 px-3 text-sm focus:ring-1 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Train Status</label>
          <input type="text" name="trainStatus" value={formData.trainStatus} onChange={handleChange} required className="w-full rounded-lg border border-slate-300 py-2 px-3 text-sm focus:ring-1 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Train Class</label>
          <input type="text" name="trainClass" value={formData.trainClass} onChange={handleChange} required className="w-full rounded-lg border border-slate-300 py-2 px-3 text-sm focus:ring-1 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Total Seats Count</label>
          <input type="number" name="totalSeatsCount" value={formData.totalSeatsCount} onChange={handleChange} required className="w-full rounded-lg border border-slate-300 py-2 px-3 text-sm focus:ring-1 focus:ring-blue-500" />
        </div>
      </div>

      <div className="pt-4 border-t border-slate-100">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-sm font-semibold text-slate-800">Train Seat Info</h4>
          <button type="button" onClick={addSeatInfo} className="text-xs flex items-center gap-1 text-blue-600 font-medium hover:text-blue-700">
            <Plus className="h-3 w-3" /> Add Seat Info
          </button>
        </div>
        <div className="space-y-3">
          {seatInfos.map((seat, index) => (
            <div key={seat.id} className="flex items-center gap-3">
              <div className="flex-1">
                <input type="text" value={seat.details} onChange={(e) => handleSeatInfoChange(seat.id, e.target.value)} placeholder="Seat Info Details..." className="w-full rounded-lg border border-slate-300 py-2 px-3 text-sm focus:ring-1 focus:ring-blue-500" />
              </div>
              {seatInfos.length > 1 && (
                <button type="button" onClick={() => removeSeatInfo(seat.id)} className="p-2 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50">
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
