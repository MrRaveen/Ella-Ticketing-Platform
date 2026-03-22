import React, { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';

interface TrainClass {
  classId: number;
  className: string;
  classLetter: string;
  description: string;
}

interface SeatInfo {
  id: number;
  seat_count: string;
  classID: string;
  pricePerson: string;
  classNameString: string;
}

const SEAT_CLASS_OPTIONS = [
  { id: 1, label: 'FIRST CLASS' },
  { id: 2, label: 'SECOND CLASS' },
  { id: 3, label: 'THIRD CLASS' },
];

const TRAIN_STATUS_OPTIONS = ['ACTIVE', 'INACTIVE', 'MAINTENANCE'];

export function AddTrainInfoForm() {
  const [trainClasses, setTrainClasses] = useState<TrainClass[]>([]);
  const [loadingClasses, setLoadingClasses] = useState(true);
  const [classError, setClassError] = useState('');

  // Form fields
  const [name, setName] = useState('');
  const [reportingNo, setReportingNo] = useState('');
  const [engineCode, setEngineCode] = useState('');
  const [serviceStartedYear, setServiceStartedYear] = useState('');
  const [manufacturedYear, setManufacturedYear] = useState('');
  const [avgSpeed, setAvgSpeed] = useState('');
  const [totOperationHours, setTotOperationHours] = useState('');
  const [accidentCount, setAccidentCount] = useState('');
  const [trainStatus, setTrainStatus] = useState('ACTIVE');
  const [selectedClassId, setSelectedClassId] = useState('');
  const [trainSeats, setTrainSeats] = useState('');

  const [seatInfos, setSeatInfos] = useState<SeatInfo[]>([
    { id: Date.now(), seat_count: '', classID: '1', pricePerson: '', classNameString: 'FIRST CLASS' },
  ]);

  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState('');
  const [submitError, setSubmitError] = useState('');

  // Fetch train classes on mount
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    fetch('http://localhost:8002/admin/getAllTrainClasses', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch train classes');
        return res.json();
      })
      .then((data: TrainClass[]) => {
        setTrainClasses(data);
        if (data.length > 0) setSelectedClassId(String(data[0].classId));
      })
      .catch(err => setClassError(err.message))
      .finally(() => setLoadingClasses(false));
  }, []);

  const addSeatInfo = () =>
    setSeatInfos([
      ...seatInfos,
      { id: Date.now(), seat_count: '', classID: '1', pricePerson: '', classNameString: 'FIRST CLASS' },
    ]);

  const removeSeatInfo = (id: number) => setSeatInfos(seatInfos.filter(s => s.id !== id));

  const updateSeatInfo = (id: number, field: keyof Omit<SeatInfo, 'id'>, value: string) => {
    setSeatInfos(seatInfos.map(s => {
      if (s.id !== id) return s;
      const updated = { ...s, [field]: value };
      // Keep classNameString in sync with classID
      if (field === 'classID') {
        const opt = SEAT_CLASS_OPTIONS.find(o => String(o.id) === value);
        updated.classNameString = opt ? opt.label : '';
      }
      return updated;
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    setSubmitSuccess('');

    const selectedClass = trainClasses.find(c => String(c.classId) === selectedClassId);
    if (!selectedClass) {
      setSubmitError('Please select a valid train class.');
      return;
    }

    const payload = {
      Name: name,
      ReportingNo: reportingNo,
      EngineCode: engineCode,
      ServiceStartedYear: Number(serviceStartedYear),
      ManufacturedYear: Number(manufacturedYear),
      AvgSpeed: Number(avgSpeed),
      TotOperationHours: Number(totOperationHours),
      AccidentCount: Number(accidentCount),
      TrainStatus: trainStatus,
      TrainClass: {
        classId: selectedClass.classId,
        className: selectedClass.className,
        classLetter: selectedClass.classLetter,
        description: selectedClass.description,
      },
      trainSeats: Number(trainSeats),
      TrainSeatInfo: seatInfos.map(s => ({
        seat_count: Number(s.seat_count),
        trainClass: {
          classID: Number(s.classID),
          pricePerson: Number(s.pricePerson),
          classNameString: s.classNameString,
        },
      })),
    };

    try {
      setSubmitting(true);
      const token = localStorage.getItem('adminToken');
      const res = await fetch('http://localhost:8002/admin/addTrainInfo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Server error: ${res.status}`);
      }

      setSubmitSuccess('Train info added successfully!');
      // Reset form
      setName(''); setReportingNo(''); setEngineCode('');
      setServiceStartedYear(''); setManufacturedYear('');
      setAvgSpeed(''); setTotOperationHours(''); setAccidentCount('');
      setTrainStatus('ACTIVE'); setTrainSeats('');
      if (trainClasses.length > 0) setSelectedClassId(String(trainClasses[0].classId));
      setSeatInfos([{ id: Date.now(), seat_count: '', classID: '1', pricePerson: '', classNameString: 'FIRST CLASS' }]);
    } catch (err: any) {
      setSubmitError(err.message || 'Submission failed.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-800 border-b border-slate-100 pb-3">Add Train Info</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
          <input
            type="text" required value={name} onChange={e => setName(e.target.value)}
            className="w-full rounded-lg border border-slate-300 py-2 px-3 text-sm focus:ring-1 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        {/* Reporting No */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Reporting No</label>
          <input
            type="text" required value={reportingNo} onChange={e => setReportingNo(e.target.value)}
            className="w-full rounded-lg border border-slate-300 py-2 px-3 text-sm focus:ring-1 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        {/* Engine Code */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Engine Code</label>
          <input
            type="text" required value={engineCode} onChange={e => setEngineCode(e.target.value)}
            className="w-full rounded-lg border border-slate-300 py-2 px-3 text-sm focus:ring-1 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        {/* Service Started Year */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Service Started Year</label>
          <input
            type="number" required value={serviceStartedYear} onChange={e => setServiceStartedYear(e.target.value)}
            className="w-full rounded-lg border border-slate-300 py-2 px-3 text-sm focus:ring-1 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        {/* Manufactured Year */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Manufactured Year</label>
          <input
            type="number" required value={manufacturedYear} onChange={e => setManufacturedYear(e.target.value)}
            className="w-full rounded-lg border border-slate-300 py-2 px-3 text-sm focus:ring-1 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        {/* Average Speed */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Average Speed</label>
          <input
            type="number" step="0.1" required value={avgSpeed} onChange={e => setAvgSpeed(e.target.value)}
            className="w-full rounded-lg border border-slate-300 py-2 px-3 text-sm focus:ring-1 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        {/* Total Operation Hours */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Total Operation Hours</label>
          <input
            type="number" step="0.1" required value={totOperationHours} onChange={e => setTotOperationHours(e.target.value)}
            className="w-full rounded-lg border border-slate-300 py-2 px-3 text-sm focus:ring-1 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        {/* Accidents Count */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Accidents Count</label>
          <input
            type="number" required value={accidentCount} onChange={e => setAccidentCount(e.target.value)}
            className="w-full rounded-lg border border-slate-300 py-2 px-3 text-sm focus:ring-1 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        {/* Train Status */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Train Status</label>
          <select
            value={trainStatus} onChange={e => setTrainStatus(e.target.value)}
            className="w-full rounded-lg border border-slate-300 py-2 px-3 text-sm focus:ring-1 focus:ring-indigo-500 focus:outline-none bg-white"
          >
            {TRAIN_STATUS_OPTIONS.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* Train Class — dropdown fetched from API */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Train Class</label>
          {loadingClasses ? (
            <div className="w-full rounded-lg border border-slate-300 py-2 px-3 text-sm text-slate-400 bg-slate-50">
              Loading classes...
            </div>
          ) : classError ? (
            <div className="w-full rounded-lg border border-red-300 py-2 px-3 text-sm text-red-500 bg-red-50">
              {classError}
            </div>
          ) : (
            <select
              required value={selectedClassId} onChange={e => setSelectedClassId(e.target.value)}
              className="w-full rounded-lg border border-slate-300 py-2 px-3 text-sm focus:ring-1 focus:ring-indigo-500 focus:outline-none bg-white"
            >
              {trainClasses.map(tc => (
                <option key={tc.classId} value={String(tc.classId)}>
                  {tc.classLetter} — {tc.className}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Total Seats Count */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Total Seats Count</label>
          <input
            type="number" required value={trainSeats} onChange={e => setTrainSeats(e.target.value)}
            className="w-full rounded-lg border border-slate-300 py-2 px-3 text-sm focus:ring-1 focus:ring-indigo-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Train Seat Info */}
      <div className="pt-4 border-t border-slate-100">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-sm font-semibold text-slate-800">Train Seat Info</h4>
          <button
            type="button" onClick={addSeatInfo}
            className="text-xs flex items-center gap-1 text-indigo-600 font-medium hover:text-indigo-700"
          >
            <Plus className="h-3 w-3" /> Add Seat Info
          </button>
        </div>

        <div className="space-y-3">
          {seatInfos.map((seat, index) => (
            <div key={seat.id} className="grid grid-cols-1 md:grid-cols-4 gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200 items-end">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Seat Count</label>
                <input
                  type="number" required placeholder="e.g. 50"
                  value={seat.seat_count}
                  onChange={e => updateSeatInfo(seat.id, 'seat_count', e.target.value)}
                  className="w-full rounded-lg border border-slate-300 py-2 px-3 text-sm focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Seat Class</label>
                <select
                  value={seat.classID}
                  onChange={e => updateSeatInfo(seat.id, 'classID', e.target.value)}
                  className="w-full rounded-lg border border-slate-300 py-2 px-3 text-sm focus:ring-1 focus:ring-indigo-500 focus:outline-none bg-white"
                >
                  {SEAT_CLASS_OPTIONS.map(o => (
                    <option key={o.id} value={String(o.id)}>{o.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Price Per Person</label>
                <input
                  type="number" step="0.01" required placeholder="e.g. 1000"
                  value={seat.pricePerson}
                  onChange={e => updateSeatInfo(seat.id, 'pricePerson', e.target.value)}
                  className="w-full rounded-lg border border-slate-300 py-2 px-3 text-sm focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
              <div className="flex items-end">
                {seatInfos.length > 1 && (
                  <button
                    type="button" onClick={() => removeSeatInfo(seat.id)}
                    className="p-2 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Status messages */}
      {submitSuccess && (
        <div className="rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700">
          {submitSuccess}
        </div>
      )}
      {submitError && (
        <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {submitError}
        </div>
      )}

      <div className="flex justify-end">
        <button
          type="submit" disabled={submitting}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </form>
  );
}
