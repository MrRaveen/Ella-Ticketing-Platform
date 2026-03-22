import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Train, 
  Ticket, 
  MapPin, 
  Calendar, 
  Users, 
  QrCode, 
  History, 
  Settings, 
  ShieldCheck, 
  CreditCard, 
  ArrowRight, 
  CheckCircle2,
  Menu,
  X,
  Search
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white">
              <Train className="h-6 w-6" />
            </div>
            <span className="font-display text-xl font-bold tracking-tight text-slate-900">RailFlow</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex md:items-center md:gap-8">
            <a href="#features" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Features</a>
            <a href="#workflow" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">How it Works</a>
            <a href="#admin" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Admin Portal</a>
          </div>

          <div className="hidden md:flex md:items-center md:gap-4">
            <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Log in</Link>
            <Link to="/register" className="rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 transition-all hover:shadow-md active:scale-95">
              Create Account
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-600 hover:text-slate-900"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="border-b border-slate-200 bg-white px-4 py-4 md:hidden"
          >
            <div className="flex flex-col space-y-4">
              <a href="#features" className="text-sm font-medium text-slate-600">Features</a>
              <a href="#workflow" className="text-sm font-medium text-slate-600">How it Works</a>
              <a href="#admin" className="text-sm font-medium text-slate-600">Admin Portal</a>
              <hr className="border-slate-100" />
              <Link to="/login" className="w-full text-left text-sm font-medium text-slate-600">Log in</Link>
              <Link to="/register" className="w-full rounded-full bg-indigo-600 px-5 py-2.5 text-center text-sm font-medium text-white">
                Create Account
              </Link>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-24 lg:pt-32 lg:pb-40">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-100 via-slate-50 to-slate-50"></div>
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="font-display text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl"
            >
              The modern way to manage <span className="text-indigo-600">train travel</span>.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-6 text-lg leading-8 text-slate-600"
            >
              From seamless booking and QR code tickets to comprehensive admin dashboards. RailFlow provides a complete software solution for modern railway networks.
            </motion.p>
          </div>

          {/* Booking Widget Simulation */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-16 mx-auto max-w-4xl rounded-2xl bg-white p-4 sm:p-6 shadow-xl shadow-slate-200/50 border border-slate-100"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
              <div className="relative lg:col-span-1">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Leaving From</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input type="text" placeholder="City or Station" className="w-full rounded-lg border border-slate-200 py-3 pl-10 pr-4 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500" />
                </div>
              </div>
              <div className="relative lg:col-span-1">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Going To</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input type="text" placeholder="City or Station" className="w-full rounded-lg border border-slate-200 py-3 pl-10 pr-4 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500" />
                </div>
              </div>
              <div className="relative lg:col-span-1">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input type="date" className="w-full rounded-lg border border-slate-200 py-3 pl-10 pr-4 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-600" />
                </div>
              </div>
              <div className="relative lg:col-span-1">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Passengers</label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <select className="w-full rounded-lg border border-slate-200 py-3 pl-10 pr-4 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white appearance-none">
                    <option>1 Passenger</option>
                    <option>2 Passengers</option>
                    <option>3 Passengers</option>
                    <option>4+ Passengers</option>
                  </select>
                </div>
              </div>
              <div className="lg:col-span-1 flex items-end">
                <Link to="/login" className="w-full rounded-lg bg-indigo-600 py-3 px-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 h-[46px]">
                  <Search className="h-4 w-4" />
                  Search Trains
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Customer Features */}
      <section id="features" className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-indigo-600 font-semibold tracking-wide uppercase text-sm">For Passengers</h2>
            <p className="mt-2 text-3xl font-display font-bold tracking-tight text-slate-900 sm:text-4xl">Everything you need for a smooth journey</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Ticket className="h-6 w-6 text-indigo-600" />,
                title: "Smart Booking System",
                desc: "Check real-time availability, compare classes, and select your preferred seats instantly."
              },
              {
                icon: <QrCode className="h-6 w-6 text-indigo-600" />,
                title: "Digital QR Tickets",
                desc: "No more paper. Access your marked tickets directly from your dashboard for quick scanning."
              },
              {
                icon: <History className="h-6 w-6 text-indigo-600" />,
                title: "Complete History",
                desc: "View past trips, manage current bookings, and cancel tickets with a single click."
              }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-2xl border border-slate-100 bg-slate-50/50 p-8 hover:shadow-lg hover:border-indigo-100 transition-all"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section id="workflow" className="py-24 bg-slate-900 text-white overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-indigo-400 font-semibold tracking-wide uppercase text-sm">The Workflow</h2>
              <p className="mt-2 text-3xl font-display font-bold tracking-tight sm:text-4xl mb-6">Book your ticket in minutes</p>
              <p className="text-slate-400 text-lg mb-8">Our streamlined process ensures you get from searching to boarding with zero friction.</p>
              
              <div className="space-y-6">
                {[
                  { step: "01", title: "Search & Check Availability", desc: "Enter locations and dates. If trains are available, view options." },
                  { step: "02", title: "Select Train & Seats", desc: "View departure/arrival times, available classes, and price per seat." },
                  { step: "03", title: "Passenger Details", desc: "Enter primary and additional passenger information." },
                  { step: "04", title: "Secure Payment", desc: "Review current summary and complete the transaction." },
                  { step: "05", title: "Save & Board", desc: "Ticket is saved to your dashboard with a unique QR code." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0 flex flex-col items-center">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-400 font-mono text-sm font-bold border border-indigo-500/30">
                        {item.step}
                      </div>
                      {i !== 4 && <div className="h-full w-px bg-slate-800 my-2"></div>}
                    </div>
                    <div className="pb-6">
                      <h4 className="text-lg font-medium text-slate-200">{item.title}</h4>
                      <p className="mt-1 text-slate-400 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 blur-3xl rounded-full"></div>
              <div className="relative rounded-2xl border border-slate-700 bg-slate-800/50 p-6 backdrop-blur-xl shadow-2xl">
                {/* Mockup UI */}
                <div className="flex items-center justify-between border-b border-slate-700 pb-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Train className="h-5 w-5 text-indigo-400" />
                    <span className="font-semibold">Current Summary</span>
                  </div>
                  <span className="text-xs font-mono text-slate-400">#TRN-8921</span>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center bg-slate-900/50 p-3 rounded-lg border border-slate-700/50">
                    <div>
                      <p className="text-xs text-slate-400">Train Name</p>
                      <p className="font-medium">Express InterCity 402</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-400">Class</p>
                      <p className="font-medium text-indigo-400">First Class</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between px-2">
                    <div className="text-center">
                      <p className="text-2xl font-display font-bold">NYP</p>
                      <p className="text-xs text-slate-400">08:30 AM</p>
                    </div>
                    <div className="flex-1 px-4 flex items-center">
                      <div className="h-px w-full bg-slate-700"></div>
                      <Train className="h-4 w-4 text-slate-500 mx-2 flex-shrink-0" />
                      <div className="h-px w-full bg-slate-700"></div>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-display font-bold">BOS</p>
                      <p className="text-xs text-slate-400">12:45 PM</p>
                    </div>
                  </div>

                  <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700/50 mt-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-400">Passengers (2x)</span>
                      <span>$120.00</span>
                    </div>
                    <div className="flex justify-between text-sm mb-4">
                      <span className="text-slate-400">Taxes & Fees</span>
                      <span>$12.50</span>
                    </div>
                    <div className="flex justify-between font-semibold border-t border-slate-700 pt-3">
                      <span>Total</span>
                      <span className="text-indigo-400">$132.50</span>
                    </div>
                  </div>

                  <button className="w-full rounded-lg bg-indigo-500 py-3 text-sm font-semibold text-white hover:bg-indigo-600 transition-colors flex items-center justify-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    Make Payment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Admin Features */}
      <section id="admin" className="py-24 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1 order-2 md:order-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
                    <Settings className="h-6 w-6 text-indigo-600 mb-4" />
                    <h4 className="font-semibold text-slate-900">Manage Trains</h4>
                    <p className="text-sm text-slate-500 mt-1">Full CRUD operations for train schedules and routes.</p>
                  </div>
                  <div className="rounded-2xl bg-indigo-600 p-6 shadow-sm text-white">
                    <ShieldCheck className="h-6 w-6 text-indigo-200 mb-4" />
                    <h4 className="font-semibold">Secure Access</h4>
                    <p className="text-sm text-indigo-100 mt-1">Role-based access control for administrative staff.</p>
                  </div>
                </div>
                <div className="space-y-4 mt-8">
                  <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
                    <Users className="h-6 w-6 text-indigo-600 mb-4" />
                    <h4 className="font-semibold text-slate-900">User Accounts</h4>
                    <p className="text-sm text-slate-500 mt-1">View customer details, booked tickets, and activity history.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex-1 order-1 md:order-2">
              <h2 className="text-indigo-600 font-semibold tracking-wide uppercase text-sm">Admin Portal</h2>
              <p className="mt-2 text-3xl font-display font-bold tracking-tight text-slate-900 sm:text-4xl mb-6">Powerful tools for operators</p>
              <p className="text-slate-600 text-lg mb-8">
                Keep the network running smoothly with our comprehensive administrative dashboard. Manage inventory, oversee users, and track system activity in real-time.
              </p>
              <ul className="space-y-4">
                {['Add and update train schedules', 'Monitor ticket sales and cancellations', 'View detailed customer activity logs', 'Configure system-wide settings'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-700">
                    <CheckCircle2 className="h-5 w-5 text-indigo-600 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/admin/login" className="mt-8 inline-flex items-center gap-2 text-indigo-600 font-semibold hover:text-indigo-700 transition-colors">
                Explore Admin Features <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-indigo-600/5"></div>
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative text-center">
          <h2 className="text-3xl font-display font-bold tracking-tight text-slate-900 sm:text-4xl">Ready to modernize your ticketing?</h2>
          <p className="mt-4 text-lg text-slate-600">Join thousands of passengers and operators using RailFlow today.</p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register" className="w-full sm:w-auto rounded-full bg-indigo-600 px-8 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition-all hover:shadow-md active:scale-95 text-center">
              Create Customer Account
            </Link>
            <Link to="/admin/login" className="w-full sm:w-auto rounded-full bg-white border border-slate-200 px-8 py-3.5 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-50 transition-all active:scale-95 text-center">
              Admin Login
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-12 border-t border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
                  <Train className="h-5 w-5" />
                </div>
                <span className="font-display text-lg font-bold tracking-tight text-white">RailFlow</span>
              </div>
              <p className="text-slate-400 text-sm">
                The complete software solution for modern train ticket management.
              </p>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Customer</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">Dashboard</a></li>
                <li><a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">Book Ticket</a></li>
                <li><a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">History</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">App Settings</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">Theme</a></li>
                <li><a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">Notifications</a></li>
                <li><a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">Logout</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Legal</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">Terms and Conditions</a></li>
                <li><a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">© {new Date().getFullYear()} RailFlow Inc. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="text-slate-500 hover:text-white transition-colors"><span className="sr-only">Twitter</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
              </a>
              <a href="#" className="text-slate-500 hover:text-white transition-colors"><span className="sr-only">GitHub</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
