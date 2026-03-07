import React, { useState, useEffect } from 'react';
import { 
  Search, 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  Train, 
  ArrowRight, 
  CreditCard, 
  CheckCircle2,
  ChevronRight,
  Loader2,
  AlertTriangle,
  Armchair
} from 'lucide-react';
import { api } from '../../services/api';

export default function BookTicket({ onBookingComplete }: { onBookingComplete: () => void }) {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [stations, setStations] = useState<any[]>([]);
  
  // Search State
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [isToday, setIsToday] = useState(true);
  const [time, setTime] = useState('08:00');
  const [passengers, setPassengers] = useState(1);

  // Selection State
  const [availableTrains, setAvailableTrains] = useState<any[]>([]);
  const [selectedTrain, setSelectedTrain] = useState<any>(null);
  const [selectedClass, setSelectedClass] = useState<any>(null);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [returnLocation, setReturnLocation] = useState('');
  const [bookingRef, setBookingRef] = useState('');

  // Mock booked seats for realism
  const [bookedSeats, setBookedSeats] = useState<string[]>([]);

  useEffect(() => {
    const loadStations = async () => {
      try {
        const data = await api.stations.getAll();
        setStations(data);
      } catch (err) {
        console.error('Failed to load stations', err);
      }
    };
    loadStations();
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (from === to) {
      setError('Starting and ending locations cannot be the same.');
      return;
    }
    setIsLoading(true);
    setError('');
    try {
      const trains = await api.trains.getAll();
      // Simple filter for demo purposes
      const filtered = trains.filter((t: any) => 
        t.routeStart.toLowerCase().includes(from.toLowerCase()) || 
        t.routeEnd.toLowerCase().includes(to.toLowerCase()) ||
        t.stoppingLocations.some((loc: string) => loc.toLowerCase().includes(to.toLowerCase()) || loc.toLowerCase().includes(from.toLowerCase()))
      );
      setAvailableTrains(filtered.length > 0 ? filtered : trains); // Show all if no match for demo
      setStep(2);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch trains');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectTrain = (train: any, trainClass: any) => {
    setSelectedTrain(train);
    setSelectedClass(trainClass);
    setSelectedSeats([]);
    
    // Generate some random booked seats for the demo
    const randomBooked = [];
    const numBooked = trainClass.totalSeats - trainClass.remainingSeats;
    for (let i = 0; i < numBooked; i++) {
      const randomSeat = `S${Math.floor(Math.random() * trainClass.totalSeats) + 1}`;
      if (!randomBooked.includes(randomSeat)) {
        randomBooked.push(randomSeat);
      }
    }
    setBookedSeats(randomBooked);
    
    setStep(3);
  };

  const toggleSeat = (seatId: string) => {
    if (bookedSeats.includes(seatId)) return;
    
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seatId));
    } else {
      if (selectedSeats.length < passengers) {
        setSelectedSeats([...selectedSeats, seatId]);
      } else {
        setError(`You can only select ${passengers} seat(s).`);
        setTimeout(() => setError(''), 3000);
      }
    }
  };

  const handleConfirmSeats = () => {
    if (selectedSeats.length !== passengers) {
      setError(`Please select exactly ${passengers} seat(s).`);
      return;
    }
    setError('');
    setStep(4);
  };

  const handleConfirmDetails = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(5);
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const currentUser = api.auth.getCurrentUser();
      if (!currentUser) throw new Error('Not logged in');

      const bookingData = {
        userId: currentUser.id,
        trainId: selectedTrain.id,
        trainName: selectedTrain.name,
        routeStart: selectedTrain.routeStart,
        routeEnd: selectedTrain.routeEnd,
        departTime: selectedTrain.departTime,
        arriveTime: selectedTrain.arriveTime,
        date: date,
        passengers: passengers,
        className: selectedClass.name,
        price: selectedClass.price * passengers,
        paymentMethod: 'CREDIT_CARD',
        returnLocation: returnLocation,
        seatCodes: selectedSeats
      };

      const booking = await api.bookings.create(bookingData);
      setBookingRef(booking.id.substring(0, 8));
      setStep(6);
    } catch (err: any) {
      setError(err.message || 'Payment failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-200 rounded-full -z-10"></div>
          <div 
            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-blue-600 rounded-full -z-10 transition-all duration-500"
            style={{ width: `${((step - 1) / 5) * 100}%` }}
          ></div>
          
          {[
            { num: 1, label: 'Search' },
            { num: 2, label: 'Train' },
            { num: 3, label: 'Seats' },
            { num: 4, label: 'Details' },
            { num: 5, label: 'Payment' },
            { num: 6, label: 'Done' }
          ].map((s) => (
            <div key={s.num} className="flex flex-col items-center gap-2 bg-slate-50 px-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors ${
                step >= s.num 
                  ? 'bg-blue-600 border-blue-600 text-white' 
                  : 'bg-white border-slate-300 text-slate-400'
              }`}>
                {step > s.num ? <CheckCircle2 className="w-5 h-5" /> : s.num}
              </div>
              <span className={`text-xs font-medium ${step >= s.num ? 'text-blue-900' : 'text-slate-500'} hidden sm:block`}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 shrink-0" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      {/* Step 1: Search */}
      {step === 1 && (
        <div 
          className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8"
        >
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Where are you traveling?</h2>
          <form onSubmit={handleSearch} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">From</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <select 
                    required
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all appearance-none bg-white"
                  >
                    <option value="" disabled>Select starting location</option>
                    {stations.map(station => (
                      <option key={station.id} value={station.name}>{station.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">To</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <select 
                    required
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all appearance-none bg-white"
                  >
                    <option value="" disabled>Select ending location</option>
                    {stations.map(station => (
                      <option key={station.id} value={station.name}>{station.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Date</label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsToday(true);
                      setDate(new Date().toISOString().split('T')[0]);
                    }}
                    className={`px-4 py-3 rounded-xl border text-sm font-medium transition-colors ${
                      isToday 
                        ? 'bg-blue-50 border-blue-200 text-blue-700' 
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    Today
                  </button>
                  <div className="relative flex-1">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input 
                      type="date" 
                      required
                      value={date}
                      onChange={(e) => {
                        setDate(e.target.value);
                        setIsToday(e.target.value === new Date().toISOString().split('T')[0]);
                      }}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Time (From)</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input 
                    type="time" 
                    required
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Passengers</label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <select 
                    value={passengers}
                    onChange={(e) => setPassengers(Number(e.target.value))}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all appearance-none bg-white"
                  >
                    {[1, 2, 3, 4, 5, 6].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'Person' : 'People'}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button 
                type="submit"
                disabled={isLoading || !from || !to}
                className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-70"
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Search Trains'}
                {!isLoading && <ArrowRight className="w-5 h-5" />}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Step 2: Results */}
      {step === 2 && (
        <div 
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Available Trains</h2>
              <p className="text-slate-500 mt-1">
                {from || 'Colombo'} to {to || 'Kandy'} • {new Date(date).toLocaleDateString()} • {passengers} Passenger(s)
              </p>
            </div>
            <button 
              onClick={() => setStep(1)}
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              Modify Search
            </button>
          </div>

          <div className="space-y-4">
            {availableTrains.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-12 text-center text-slate-500">
                <Train className="h-12 w-12 mx-auto text-slate-300 mb-3" />
                <p>No trains found for this route.</p>
              </div>
            ) : (
              availableTrains.map((train) => (
                <div key={train.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="bg-blue-100 text-blue-700 p-2 rounded-lg">
                          <Train className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-slate-900">{train.name}</h3>
                          <p className="text-sm text-slate-500">Route: {train.routeStart} to {train.routeEnd}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-6">
                        <div>
                          <p className="text-2xl font-display font-bold text-slate-900">{train.departTime}</p>
                          <p className="text-sm text-slate-500">Departure</p>
                        </div>
                        <div className="flex-1 flex items-center justify-center px-4 max-w-[200px]">
                          <div className="w-full h-px bg-slate-300 relative">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-slate-400 text-xs font-medium">
                              {train.arriveTime}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-display font-bold text-slate-900">{train.arriveTime}</p>
                          <p className="text-sm text-slate-500">Arrival</p>
                        </div>
                      </div>

                      <div className="mt-4">
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Stops</p>
                        <div className="flex flex-wrap gap-2">
                          {train.stoppingLocations.map((loc: string, i: number) => (
                            <span key={i} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-md">
                              {loc}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="w-full md:w-72 flex flex-col gap-3 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6">
                      <p className="text-sm font-semibold text-slate-700 mb-1">Select Class</p>
                      {train.classes.map((cls: any, i: number) => (
                        <button
                          key={i}
                          onClick={() => handleSelectTrain(train, cls)}
                          disabled={cls.remainingSeats < passengers}
                          className={`text-left p-3 rounded-xl border transition-all ${
                            cls.remainingSeats < passengers
                              ? 'opacity-50 cursor-not-allowed border-slate-200 bg-slate-50'
                              : 'border-slate-200 hover:border-blue-500 hover:shadow-md bg-white group'
                          }`}
                        >
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-semibold text-slate-900 group-hover:text-blue-700 transition-colors">{cls.name}</span>
                            <span className="font-bold text-blue-600">Rs. {cls.price}</span>
                          </div>
                          <div className="flex justify-between items-center text-xs">
                            <span className={`${cls.remainingSeats < 10 ? 'text-red-500 font-medium' : 'text-slate-500'}`}>
                              {cls.remainingSeats} seats left
                            </span>
                            <span className="text-slate-400">/ {cls.totalSeats} total</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Step 3: Select Seats */}
      {step === 3 && selectedTrain && selectedClass && (
        <div 
          className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Select Seats</h2>
              <p className="text-slate-500 mt-1">
                Please select {passengers} seat(s) for your journey.
              </p>
            </div>
            <button 
              onClick={() => setStep(2)}
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              Change Class
            </button>
          </div>

          <div className="flex gap-8 flex-col lg:flex-row">
            <div className="flex-1">
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                <div className="flex justify-center mb-8 gap-6">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-white border border-slate-300"></div>
                    <span className="text-sm text-slate-600">Available</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-blue-600 border border-blue-600"></div>
                    <span className="text-sm text-slate-600">Selected</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-slate-300 border border-slate-300"></div>
                    <span className="text-sm text-slate-600">Booked</span>
                  </div>
                </div>

                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3 max-w-2xl mx-auto">
                  {Array.from({ length: selectedClass.totalSeats }).map((_, i) => {
                    const seatId = `S${i + 1}`;
                    const isBooked = bookedSeats.includes(seatId);
                    const isSelected = selectedSeats.includes(seatId);
                    
                    return (
                      <button
                        key={seatId}
                        disabled={isBooked}
                        onClick={() => toggleSeat(seatId)}
                        className={`
                          relative flex flex-col items-center justify-center p-2 rounded-xl border-2 transition-all
                          ${isBooked ? 'bg-slate-200 border-slate-300 text-slate-400 cursor-not-allowed' : 
                            isSelected ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-200' : 
                            'bg-white border-slate-300 text-slate-600 hover:border-blue-400 hover:bg-blue-50'}
                        `}
                      >
                        <Armchair className={`w-5 h-5 mb-1 ${isSelected ? 'text-white' : isBooked ? 'text-slate-400' : 'text-slate-500'}`} />
                        <span className="text-[10px] font-bold">{seatId}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="w-full lg:w-72 space-y-6">
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                <h3 className="font-semibold text-blue-900 mb-4">Selection Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-blue-700">Required Seats</span>
                    <span className="font-bold text-blue-900">{passengers}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-blue-700">Selected Seats</span>
                    <span className="font-bold text-blue-900">{selectedSeats.length}</span>
                  </div>
                </div>
                
                {selectedSeats.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-blue-200">
                    <p className="text-xs font-semibold text-blue-800 uppercase tracking-wider mb-2">Your Seats</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedSeats.map(seat => (
                        <span key={seat} className="bg-white text-blue-700 px-2 py-1 rounded text-sm font-bold shadow-sm">
                          {seat}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <button 
                onClick={handleConfirmSeats}
                disabled={selectedSeats.length !== passengers}
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Confirm Seats
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 4: Details */}
      {step === 4 && selectedTrain && selectedClass && (
        <div 
          className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-slate-900">Journey Details</h2>
            <button 
              onClick={() => setStep(3)}
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              Change Seats
            </button>
          </div>

          <div className="bg-blue-50 rounded-xl p-6 mb-8 border border-blue-100">
            <div className="flex flex-col md:flex-row justify-between gap-6">
              <div>
                <h3 className="text-lg font-bold text-blue-900 mb-1">{selectedTrain.name}</h3>
                <p className="text-sm text-blue-700">{selectedClass.name} • {passengers} Passenger(s)</p>
                <p className="text-sm font-medium text-blue-800 mt-2">Seats: {selectedSeats.join(', ')}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm text-blue-700">Departure</p>
                  <p className="font-bold text-blue-900">{selectedTrain.departTime}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="text-sm text-blue-700">Arrival</p>
                  <p className="font-bold text-blue-900">{selectedTrain.arriveTime}</p>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleConfirmDetails} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Return Location (Optional)
              </label>
              <p className="text-xs text-slate-500 mb-3">
                If you plan to return, specify the location. This helps us suggest return trains later.
              </p>
              <div className="relative max-w-md">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <select 
                  value={returnLocation}
                  onChange={(e) => setReturnLocation(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all appearance-none bg-white"
                >
                  <option value="">Select return location (optional)</option>
                  {stations.map(station => (
                    <option key={station.id} value={station.name}>{station.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 flex justify-end gap-4">
              <button 
                type="button"
                onClick={() => setStep(3)}
                className="px-6 py-3 rounded-xl font-medium text-slate-600 hover:bg-slate-50 transition-colors"
              >
                Back
              </button>
              <button 
                type="submit"
                className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                Continue to Payment
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Step 5: Payment */}
      {step === 5 && selectedTrain && selectedClass && (
        <div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Payment Details</h2>
              
              <form id="payment-form" onSubmit={handlePayment} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Card Number</label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input 
                      type="text" 
                      required
                      placeholder="0000 0000 0000 0000" 
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all font-mono"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Expiry Date</label>
                    <input 
                      type="text" 
                      required
                      placeholder="MM/YY" 
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">CVC</label>
                    <input 
                      type="text" 
                      required
                      placeholder="123" 
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Name on Card</label>
                  <input 
                    type="text" 
                    required
                    placeholder="John Doe" 
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  />
                </div>
              </form>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-slate-900 rounded-2xl shadow-xl p-6 text-white sticky top-6">
              <h3 className="text-lg font-semibold mb-4 border-b border-slate-700 pb-4">Order Summary</h3>
              
              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-slate-400 text-sm mb-1">Train</p>
                  <p className="font-medium">{selectedTrain.name}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm mb-1">Journey</p>
                  <p className="font-medium">{from || 'Colombo'} to {to || 'Kandy'}</p>
                  <p className="text-sm text-slate-300">{new Date(date).toLocaleDateString()} at {selectedTrain.departTime}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm mb-1">Class & Seats</p>
                  <p className="font-medium">{selectedClass.name}</p>
                  <p className="text-sm text-slate-300">{selectedSeats.join(', ')}</p>
                </div>
              </div>

              <div className="border-t border-slate-700 pt-4 space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Ticket Price (x{passengers})</span>
                  <span>Rs. {(selectedClass.price * passengers).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Taxes & Fees</span>
                  <span>Rs. {(selectedClass.price * passengers * 0.05).toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-3 border-t border-slate-700">
                  <span>Total</span>
                  <span className="text-blue-400">
                    Rs. {(selectedClass.price * passengers * 1.05).toFixed(2)}
                  </span>
                </div>
              </div>

              <button 
                type="submit"
                form="payment-form"
                disabled={isLoading}
                className="w-full bg-blue-500 text-white py-3.5 rounded-xl font-semibold hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : `Pay Rs. ${(selectedClass.price * passengers * 1.05).toFixed(2)}`}
              </button>
              
              <button 
                onClick={() => setStep(4)}
                className="w-full mt-3 py-2 text-sm text-slate-400 hover:text-white transition-colors"
              >
                Back to Details
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 6: Success */}
      {step === 6 && (
        <div 
          className="max-w-md mx-auto bg-white rounded-2xl border border-slate-200 shadow-sm p-10 text-center"
        >
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-emerald-600" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Payment Successful!</h2>
          <p className="text-slate-500 mb-8">
            Your ticket has been booked successfully. A confirmation email has been sent to your registered email address.
          </p>
          
          <div className="bg-slate-50 rounded-xl p-4 mb-8 text-left border border-slate-100">
            <p className="text-sm text-slate-500 mb-1">Booking Reference</p>
            <p className="font-mono font-bold text-lg text-slate-900">#TCK-{bookingRef}</p>
          </div>

          <button 
            onClick={onBookingComplete}
            className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
          >
            View My Bookings
          </button>
        </div>
      )}
    </div>
  );
}
