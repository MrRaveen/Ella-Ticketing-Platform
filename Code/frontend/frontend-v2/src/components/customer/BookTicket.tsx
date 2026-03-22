import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
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
  ChevronRight
} from 'lucide-react';
import md5 from 'crypto-js/md5';

export default function BookTicket({ onBookingComplete }: { onBookingComplete: () => void }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [availableTrains, setAvailableTrains] = useState<any[]>([]);
  const [stations, setStations] = useState<any[]>([]);

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch("http://localhost:8003/getBasicDetails", {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setStations(data);
        }
      } catch (err) {
        console.error('Failed to fetch stations:', err);
      }
    };
    fetchStations();
  }, []);

  const formatTime = (timeStr: string) => {
    if (!timeStr) return '';
    const [hours, minutes] = timeStr.split(':');
    const h = parseInt(hours, 10);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const formattedHours = h % 12 || 12;
    return `${formattedHours.toString().padStart(2, '0')}:${minutes} ${ampm}`;
  };

  // Search State
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [isToday, setIsToday] = useState(true);
  const [time, setTime] = useState('08:00');
  const [passengers, setPassengers] = useState(1);

  // Selection State
  const [selectedTrain, setSelectedTrain] = useState<any>(null);
  const [selectedClass, setSelectedClass] = useState<any>(null);
  const [returnLocation, setReturnLocation] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const [year, month, day] = date.split('-');
      const formattedDate = `${day}/${month}/${year}`;
      const formattedTime = formatTime(time);
      console.log('Sending train search payload:', { fromLocation: from, toLocation: to, date: formattedDate, timeFrom: formattedTime, passengers });
      const token = localStorage.getItem('token');

      // Use the Vite proxy to send a POST request with a body from the browser.
      // The proxy in vite.config.ts intercepts `/api/trains` and silently translates 
      // the request into a GET request with the body before forwarding it to localhost:8003.
      const response = await fetch("http://localhost:8003/getTrainInfo", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          fromLocation: from,
          toLocation: to,
          date: formattedDate,
          timeFrom: formattedTime,
          passengers: passengers
        })
      });

      if (!response.ok) {
        throw new Error('Failed to find trains');
      }

      const text = await response.text();
      console.log('Raw response:', text);
      const data = text ? JSON.parse(text) : {};
      const mappedTrains = (data.trainDetails || []).map((t: any) => ({
        id: t.trainTimeIDString,
        name: t.trainName,
        routeStart: t.startStation,
        routeEnd: t.endStation,
        departTime: t.departureTime,
        arriveTime: t.arrivalTime,
        stoppingLocations: t.stops || [],
        classes: (t.availableClasses || []).map((c: any) => ({
          name: c.className,
          remainingSeats: c.seatsLeft,
          totalSeats: c.totalCapacity,
          price: c.price,
          classIDString: c.classIDString
        }))
      }));

      setAvailableTrains(mappedTrains);
      setStep(2);
    } catch (err: any) {
      setError(err.message || 'An error occurred fetching trains');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectTrain = (train: any, trainClass: any) => {
    setSelectedTrain(train);
    setSelectedClass(trainClass);
    setStep(3);
  };

  const handleConfirmDetails = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(4);
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();

    const paymentDetails = {
      amount: (selectedClass.price * passengers * 1.05).toFixed(2),
      itemName: `Train Ticket - ${selectedTrain.name}`,
      reservedSeatCount: passengers,
      price: parseFloat((selectedClass.price * passengers * 1.05).toFixed(2)),
      paymentType: "CREDIT_CARD",
      returnStationID: 5,
      trainTimeID: selectedTrain.id,
      classId: selectedClass.classIDString,
      userAccId: 0,
      paymentStatNumString: "-8",
      paymentMethod: "CARD",
      return_location: returnLocation || to
    };

    const merchantId = "1232169".trim();
    const merchantSecret = "Mzg5MzQxNDU0MTIzODQ4NjIwMjE2MjgyNTQ3NzU0MDEzOTYwMzMz".trim();

    // 1. Format data
    const orderId = `ORDER-${Date.now()}`;
    const amountFormatted = paymentDetails.amount.trim(); // Already formatted with .toFixed(2) without commas
    const currency = "LKR";

    // 2. Generate Hash locally
    const hashedSecret = md5(merchantSecret).toString().toUpperCase();
    const hash = md5(merchantId + orderId + amountFormatted + currency + hashedSecret).toString().toUpperCase();

    // 3. Save pending action to localStorage
    localStorage.setItem('pendingTransaction', JSON.stringify(paymentDetails));

    // 4. Create and submit hidden form
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'https://sandbox.payhere.lk/pay/checkout';

    const params = {
      merchant_id: merchantId,
      return_url: "https://example.com/return",
      cancel_url: "https://example.com/cancel",
      notify_url: "https://example.com/notify",
      order_id: orderId,
      items: paymentDetails.itemName,
      currency: currency,
      amount: amountFormatted,
      first_name: "Customer",
      last_name: "Name",
      email: "customer@example.com",
      phone: "0770000000",
      address: "Address",
      city: "City",
      country: "Sri Lanka",
      hash: hash
    };

    console.log("Submitting PayHere form with payload:", params);

    Object.entries(params).forEach(([key, value]) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = value as string;
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
  };

  // Available trains are now fetched from API

  return (
    <div className="max-w-5xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-200 rounded-full -z-10"></div>
          <div
            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-indigo-600 rounded-full -z-10 transition-all duration-500"
            style={{ width: `${((step - 1) / 4) * 100}%` }}
          ></div>

          {[
            { num: 1, label: 'Search' },
            { num: 2, label: 'Select Train' },
            { num: 3, label: 'Details' },
            { num: 4, label: 'Payment' },
            { num: 5, label: 'Done' }
          ].map((s) => (
            <div key={s.num} className="flex flex-col items-center gap-2 bg-slate-50 px-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors ${step >= s.num
                ? 'bg-indigo-600 border-indigo-600 text-white'
                : 'bg-white border-slate-300 text-slate-400'
                }`}>
                {step > s.num ? <CheckCircle2 className="w-5 h-5" /> : s.num}
              </div>
              <span className={`text-xs font-medium ${step >= s.num ? 'text-indigo-900' : 'text-slate-500'}`}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Step 1: Search */}
      {step === 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8"
        >
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Where are you traveling?</h2>
          {error && (
            <div className="mb-6 rounded-md bg-red-50 p-4">
              <div className="text-sm text-red-700">{error}</div>
            </div>
          )}
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
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all appearance-none bg-white"
                  >
                    <option value="" disabled>Select starting location</option>
                    {stations.map(station => (
                      <option key={station.locationID} value={station.locationNameString}>
                        {station.locationNameString}
                      </option>
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
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all appearance-none bg-white"
                  >
                    <option value="" disabled>Select ending location</option>
                    {stations.map(station => (
                      <option key={station.locationID} value={station.locationNameString}>
                        {station.locationNameString}
                      </option>
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
                    className={`px-4 py-3 rounded-xl border text-sm font-medium transition-colors ${isToday
                      ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
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
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
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
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
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
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all appearance-none bg-white"
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
                disabled={loading}
                className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? 'Searching...' : 'Search Trains'}
                {!loading && <ArrowRight className="w-5 h-5" />}
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Step 2: Results */}
      {step === 2 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
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
              className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
            >
              Modify Search
            </button>
          </div>

          <div className="space-y-4">
            {availableTrains.map((train) => (
              <div key={train.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-indigo-100 text-indigo-700 p-2 rounded-lg">
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
                        {train.stoppingLocations.map((loc, i) => (
                          <span key={i} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-md">
                            {loc}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="w-full md:w-72 flex flex-col gap-3 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6">
                    <p className="text-sm font-semibold text-slate-700 mb-1">Select Class</p>
                    {train.classes.map((cls, i) => (
                      <button
                        key={i}
                        onClick={() => handleSelectTrain(train, cls)}
                        disabled={cls.remainingSeats < passengers}
                        className={`text-left p-3 rounded-xl border transition-all ${cls.remainingSeats < passengers
                          ? 'opacity-50 cursor-not-allowed border-slate-200 bg-slate-50'
                          : 'border-slate-200 hover:border-indigo-500 hover:shadow-md bg-white group'
                          }`}
                      >
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-semibold text-slate-900 group-hover:text-indigo-700 transition-colors">{cls.name}</span>
                          <span className="font-bold text-indigo-600">Rs. {cls.price}</span>
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
            ))}
          </div>
        </motion.div>
      )}

      {/* Step 3: Details */}
      {step === 3 && selectedTrain && selectedClass && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-slate-900">Journey Details</h2>
            <button
              onClick={() => setStep(2)}
              className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
            >
              Change Train
            </button>
          </div>

          <div className="bg-indigo-50 rounded-xl p-6 mb-8 border border-indigo-100">
            <div className="flex flex-col md:flex-row justify-between gap-6">
              <div>
                <h3 className="text-lg font-bold text-indigo-900 mb-1">{selectedTrain.name}</h3>
                <p className="text-sm text-indigo-700">{selectedClass.name} • {passengers} Passenger(s)</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm text-indigo-700">Departure</p>
                  <p className="font-bold text-indigo-900">{selectedTrain.departTime}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-indigo-400" />
                <div>
                  <p className="text-sm text-indigo-700">Arrival</p>
                  <p className="font-bold text-indigo-900">{selectedTrain.arriveTime}</p>
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
                <input
                  type="text"
                  value={returnLocation}
                  onChange={(e) => setReturnLocation(e.target.value)}
                  placeholder="e.g. Colombo Fort"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                />
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 flex justify-end gap-4">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-6 py-3 rounded-xl font-medium text-slate-600 hover:bg-slate-50 transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors flex items-center gap-2"
              >
                Continue to Payment
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Step 4: Payment */}
      {step === 4 && selectedTrain && selectedClass && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Payment Details</h2>

              <div className="bg-indigo-50/50 rounded-2xl border border-indigo-100 p-8 text-center flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-200 mb-6">
                  <CreditCard className="w-8 h-8 text-indigo-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Secure Checkout via PayHere</h3>
                <p className="text-slate-600 mb-6 max-w-sm">
                  Click 'Pay' to be securely redirected to the PayHere payment portal. Return here once the transaction is completed.
                </p>
                <form id="payment-form" onSubmit={handlePayment}></form>
              </div>
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
                  <p className="text-slate-400 text-sm mb-1">Class</p>
                  <p className="font-medium">{selectedClass.name}</p>
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
                  <span className="text-indigo-400">
                    Rs. {(selectedClass.price * passengers * 1.05).toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                form="payment-form"
                className="w-full bg-indigo-500 text-white py-3.5 rounded-xl font-semibold hover:bg-indigo-600 transition-colors shadow-lg shadow-indigo-500/30"
              >
                Pay Rs. {(selectedClass.price * passengers * 1.05).toFixed(2)}
              </button>

              <button
                onClick={() => setStep(3)}
                className="w-full mt-3 py-2 text-sm text-slate-400 hover:text-white transition-colors"
              >
                Back to Details
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Step 5: Success */}
      {step === 5 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
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
            <p className="font-mono font-bold text-lg text-slate-900">#TCK-{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}</p>
          </div>

          <button
            onClick={onBookingComplete}
            className="w-full bg-indigo-600 text-white py-3.5 rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
          >
            View My Bookings
          </button>
        </motion.div>
      )}
    </div>
  );
}
