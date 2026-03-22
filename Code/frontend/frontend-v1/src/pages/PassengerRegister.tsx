import React, { useState } from 'react';
import { Train, Mail, ArrowRight, CheckCircle2, User, MapPin, Calendar, CreditCard, Phone, Lock, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api';

export default function PassengerRegister() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    verificationCode: '',
    fname: '',
    lname: '',
    address: '',
    dob: '',
    province: '',
    city: '',
    nic: '',
    contactNo: '',
    streetName: '',
    userPassword: ''
  });

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Simulate sending verification code
      setStep(2);
    }
  };

  const handleDetailsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      await api.auth.register({
        email,
        password: formData.userPassword,
        fname: formData.fname,
        lname: formData.lname,
        address: formData.address,
        dob: formData.dob,
        province: formData.province,
        city: formData.city,
        nic: formData.nic,
        contactNo: formData.contactNo,
        streetName: formData.streetName
      });
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to register');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Link to="/" className="flex items-center gap-2 text-blue-600">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md">
              <Train className="h-6 w-6" />
            </div>
            <span className="font-display text-2xl font-bold tracking-tight text-slate-900">RailFlow</span>
          </Link>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-slate-900">
          Create an account
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          {step === 1 ? 'Start by verifying your email address' : 'Complete your profile details'}
        </p>
      </div>

      <div className={`mt-8 sm:mx-auto sm:w-full ${step === 2 ? 'sm:max-w-2xl' : 'sm:max-w-md'}`}>
          {step === 1 && (
            <div 
              className="bg-white py-8 px-4 shadow-xl shadow-slate-200/50 sm:rounded-2xl sm:px-10 border border-slate-100"
            >
              <form className="space-y-6" onSubmit={handleEmailSubmit}>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                    Email address
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full pl-10 rounded-xl border border-slate-300 py-2.5 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 sm:text-sm transition-all"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="group flex w-full justify-center items-center gap-2 rounded-xl border border-transparent bg-blue-600 py-2.5 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
                  >
                    Get Verification Code
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </form>
              
              <div className="mt-6 text-center text-sm">
                <span className="text-slate-500">Already have an account? </span>
                <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                  Sign in
                </Link>
              </div>
            </div>
          )}

          {step === 2 && (
            <div 
              className="bg-white py-8 px-4 shadow-xl shadow-slate-200/50 sm:rounded-2xl sm:px-10 border border-slate-100"
            >
              <div className="mb-6 bg-blue-50 p-4 rounded-xl border border-blue-100 flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-blue-900">Verification code sent!</p>
                  <p className="text-xs text-blue-700 mt-1">We've sent a code to <span className="font-semibold">{email}</span></p>
                </div>
              </div>

              <form className="space-y-6" onSubmit={handleDetailsSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Verification Code */}
                  <div className="md:col-span-2">
                    <label htmlFor="verificationCode" className="block text-sm font-medium text-slate-700">
                      Verification Code
                    </label>
                    <input
                      id="verificationCode"
                      name="verificationCode"
                      type="text"
                      required
                      value={formData.verificationCode}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-xl border border-slate-300 py-2.5 px-3 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 sm:text-sm transition-all font-mono tracking-widest text-center"
                      placeholder="000000"
                    />
                  </div>

                  {/* Personal Details */}
                  <div className="md:col-span-2 border-t border-slate-100 pt-4 mt-2">
                    <h4 className="text-sm font-semibold text-slate-800 mb-4 uppercase tracking-wider flex items-center gap-2">
                      <User className="h-4 w-4 text-slate-400" /> Personal Details
                    </h4>
                  </div>

                  <div>
                    <label htmlFor="fname" className="block text-sm font-medium text-slate-700">First Name</label>
                    <input id="fname" name="fname" type="text" required value={formData.fname} onChange={handleChange} className="mt-1 block w-full rounded-xl border border-slate-300 py-2.5 px-3 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 sm:text-sm transition-all" />
                  </div>
                  <div>
                    <label htmlFor="lname" className="block text-sm font-medium text-slate-700">Last Name</label>
                    <input id="lname" name="lname" type="text" required value={formData.lname} onChange={handleChange} className="mt-1 block w-full rounded-xl border border-slate-300 py-2.5 px-3 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 sm:text-sm transition-all" />
                  </div>
                  <div>
                    <label htmlFor="dob" className="block text-sm font-medium text-slate-700">Date of Birth</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Calendar className="h-4 w-4 text-slate-400" />
                      </div>
                      <input id="dob" name="dob" type="date" required value={formData.dob} onChange={handleChange} className="block w-full pl-10 rounded-xl border border-slate-300 py-2.5 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 sm:text-sm transition-all" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="nic" className="block text-sm font-medium text-slate-700">NIC / Passport No</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <CreditCard className="h-4 w-4 text-slate-400" />
                      </div>
                      <input id="nic" name="nic" type="text" required value={formData.nic} onChange={handleChange} className="block w-full pl-10 rounded-xl border border-slate-300 py-2.5 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 sm:text-sm transition-all" />
                    </div>
                  </div>

                  {/* Contact Details */}
                  <div className="md:col-span-2 border-t border-slate-100 pt-4 mt-2">
                    <h4 className="text-sm font-semibold text-slate-800 mb-4 uppercase tracking-wider flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-slate-400" /> Contact & Address
                    </h4>
                  </div>

                  <div>
                    <label htmlFor="contactNo" className="block text-sm font-medium text-slate-700">Contact Number</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-4 w-4 text-slate-400" />
                      </div>
                      <input id="contactNo" name="contactNo" type="text" required value={formData.contactNo} onChange={handleChange} className="block w-full pl-10 rounded-xl border border-slate-300 py-2.5 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 sm:text-sm transition-all" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email_disabled" className="block text-sm font-medium text-slate-700">Email Address</label>
                    <input id="email_disabled" type="email" disabled value={email} className="mt-1 block w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 px-3 text-slate-500 sm:text-sm cursor-not-allowed" />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label htmlFor="address" className="block text-sm font-medium text-slate-700">Address Line 1</label>
                    <input id="address" name="address" type="text" required value={formData.address} onChange={handleChange} className="mt-1 block w-full rounded-xl border border-slate-300 py-2.5 px-3 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 sm:text-sm transition-all" />
                  </div>
                  <div>
                    <label htmlFor="streetName" className="block text-sm font-medium text-slate-700">Street Name</label>
                    <input id="streetName" name="streetName" type="text" required value={formData.streetName} onChange={handleChange} className="mt-1 block w-full rounded-xl border border-slate-300 py-2.5 px-3 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 sm:text-sm transition-all" />
                  </div>
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-slate-700">City</label>
                    <input id="city" name="city" type="text" required value={formData.city} onChange={handleChange} className="mt-1 block w-full rounded-xl border border-slate-300 py-2.5 px-3 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 sm:text-sm transition-all" />
                  </div>
                  <div>
                    <label htmlFor="province" className="block text-sm font-medium text-slate-700">Province</label>
                    <input id="province" name="province" type="text" required value={formData.province} onChange={handleChange} className="mt-1 block w-full rounded-xl border border-slate-300 py-2.5 px-3 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 sm:text-sm transition-all" />
                  </div>

                  {/* Security */}
                  <div className="md:col-span-2 border-t border-slate-100 pt-4 mt-2">
                    <h4 className="text-sm font-semibold text-slate-800 mb-4 uppercase tracking-wider flex items-center gap-2">
                      <Lock className="h-4 w-4 text-slate-400" /> Security
                    </h4>
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="userPassword" className="block text-sm font-medium text-slate-700">Password</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-4 w-4 text-slate-400" />
                      </div>
                      <input id="userPassword" name="userPassword" type="password" required value={formData.userPassword} onChange={handleChange} className="block w-full pl-10 rounded-xl border border-slate-300 py-2.5 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 sm:text-sm transition-all" placeholder="••••••••" />
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-sm font-medium text-slate-600 hover:text-slate-900"
                  >
                    Back
                  </button>
                  <div className="flex flex-col items-end gap-2">
                    {error && <span className="text-sm text-red-600">{error}</span>}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="group flex justify-center items-center gap-2 rounded-xl border border-transparent bg-blue-600 py-2.5 px-6 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Creating...
                        </>
                      ) : (
                        <>
                          Create Account
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}
      </div>
    </div>
  );
}
