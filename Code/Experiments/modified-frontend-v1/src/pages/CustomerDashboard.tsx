import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Train, 
  LayoutDashboard, 
  Ticket, 
  User, 
  LogOut,
  Search,
  MapPin,
  Calendar,
  Clock,
  ArrowRight,
  CreditCard,
  CheckCircle2,
  XCircle,
  PlusCircle,
  Menu,
  X,
  AlertTriangle
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import BookTicket from '../components/customer/BookTicket';

export default function CustomerDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview onBookTicket={() => { setActiveTab('book-ticket'); setIsMobileMenuOpen(false); }} />;
      case 'my-bookings':
        return <MyBookings />;
      case 'book-ticket':
        return <BookTicket onBookingComplete={() => { setActiveTab('my-bookings'); setIsMobileMenuOpen(false); }} />;
      case 'profile':
        return <UserProfile />;
      default:
        return <DashboardOverview onBookTicket={() => { setActiveTab('book-ticket'); setIsMobileMenuOpen(false); }} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-40 md:hidden" 
          onClick={() => setIsMobileMenuOpen(false)} 
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col transform transition-transform duration-200 ease-in-out md:relative md:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-200">
          <Link to="/" className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 transition-colors">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
              <Train className="h-5 w-5" />
            </div>
            <span className="font-display text-lg font-bold tracking-tight text-slate-900">RailFlow</span>
          </Link>
          <button className="md:hidden text-slate-500 hover:text-slate-700" onClick={() => setIsMobileMenuOpen(false)}>
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          <SidebarItem icon={<LayoutDashboard />} label="Dashboard" isActive={activeTab === 'dashboard'} onClick={() => { setActiveTab('dashboard'); setIsMobileMenuOpen(false); }} />
          <SidebarItem icon={<PlusCircle />} label="Book Ticket" isActive={activeTab === 'book-ticket'} onClick={() => { setActiveTab('book-ticket'); setIsMobileMenuOpen(false); }} />
          <SidebarItem icon={<Ticket />} label="My Bookings" isActive={activeTab === 'my-bookings'} onClick={() => { setActiveTab('my-bookings'); setIsMobileMenuOpen(false); }} />
          <SidebarItem icon={<User />} label="My Profile" isActive={activeTab === 'profile'} onClick={() => { setActiveTab('profile'); setIsMobileMenuOpen(false); }} />
        </nav>

        <div className="p-4 border-t border-slate-200">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2 w-full rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            Sign out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-3">
            <button 
              className="md:hidden p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-lg"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>
            <h1 className="text-xl font-semibold text-slate-800 capitalize truncate">
              {activeTab.replace('-', ' ')}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search trains..." 
                className="pl-9 pr-4 py-2 rounded-full border border-slate-200 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 w-48 lg:w-64"
              />
            </div>
            <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm border border-indigo-200 shrink-0">
              JD
            </div>
          </div>
        </header>
        
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

function SidebarItem({ icon, label, isActive, onClick }: { icon: React.ReactNode, label: string, isActive: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 px-3 py-2 w-full rounded-lg text-sm font-medium transition-colors ${
        isActive 
          ? 'bg-indigo-50 text-indigo-700' 
          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
      }`}
    >
      {React.cloneElement(icon as React.ReactElement, { className: 'h-5 w-5' })}
      {label}
    </button>
  );
}

function DashboardOverview({ onBookTicket }: { onBookTicket: () => void }) {
  return (
    <div className="space-y-6">
      <div className="bg-indigo-600 rounded-2xl p-8 text-white shadow-lg shadow-indigo-200 relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-3xl font-bold font-display mb-2">Welcome back, John!</h2>
          <p className="text-indigo-100 max-w-lg">Ready for your next journey? Search for trains and book your tickets easily.</p>
          <button 
            onClick={onBookTicket}
            className="mt-6 bg-white text-indigo-600 px-6 py-2.5 rounded-xl font-medium text-sm hover:bg-indigo-50 transition-colors shadow-sm"
          >
            Book a Ticket
          </button>
        </div>
        <Train className="absolute right-8 -bottom-8 h-48 w-48 text-indigo-500 opacity-30" />
      </div>

      <h3 className="text-lg font-semibold text-slate-800 mt-8 mb-4">Upcoming Journey</h3>
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
              <span className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-md font-medium text-xs">Confirmed</span>
              <span>•</span>
              <span className="font-mono">#TCK-9924</span>
            </div>
            <h4 className="text-xl font-bold text-slate-900">Express InterCity 402</h4>
            <div className="flex items-center gap-4 mt-4">
              <div>
                <p className="text-sm text-slate-500">From</p>
                <p className="font-semibold text-slate-900">Colombo Fort</p>
                <p className="text-sm text-slate-600">08:30 AM</p>
              </div>
              <div className="flex-1 flex items-center justify-center px-4">
                <div className="w-full h-px bg-slate-300 relative">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-slate-400">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-500">To</p>
                <p className="font-semibold text-slate-900">Kandy</p>
                <p className="text-sm text-slate-600">11:15 AM</p>
              </div>
            </div>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 min-w-[200px]">
            <div className="flex items-center gap-3 mb-3">
              <Calendar className="h-5 w-5 text-indigo-600" />
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Date</p>
                <p className="font-medium text-slate-900">Oct 24, 2023</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-indigo-600" />
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Passengers</p>
                <p className="font-medium text-slate-900">2 Adults</p>
              </div>
            </div>
            <button className="w-full mt-4 bg-white border border-slate-200 text-slate-700 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
              View Ticket
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const MOCK_BOOKINGS = [
  {
      "bookedTicketID": 3,
      "reservedSeatCount": 1,
      "price": 1500.0,
      "status": true,
      "returnLocation": "",
      "paymentDetails": {
          "id": 8,
          "paymentType": "CREDIT_CARD",
          "service": "PAYHERE",
          "date": "2026-03-02"
      },
      "joneryDetails": {
          "departTime": "09:45:00",
          "date": "2026-04-20",
          "stationName": "Colombo Fort",
          "platformNumber": 2,
          "routeDetails": {
              "routeID": 5,
              "routeName": "Udarata Menike",
              "startingStation": "Colombo Fort",
              "endingStation": "Badulla",
              "routeLocations": []
          },
          "arrivalTime": "13:30:00",
          "status": "UPCOMING"
      },
      "trainInfo": {
          "id": 2,
          "name": "Udarata Menike"
      },
      "ticketSeats": [
          {
              "seatID": 10,
              "seatCode": "T10C1S15",
              "className": "FIRST CLASS",
              "pricePerson": 1500.0
          }
      ],
      "timeStamp": "2026-03-02"
  },
  {
      "bookedTicketID": 1,
      "reservedSeatCount": 2,
      "price": 2000.0,
      "status": true,
      "returnLocation": "STN-045",
      "paymentDetails": {
          "id": 4,
          "paymentType": "CREDIT_CARD",
          "service": "PAYHERE",
          "date": "2026-03-01"
      },
      "joneryDetails": {
          "departTime": "08:30:00",
          "date": "2025-09-15",
          "stationName": "STN-045",
          "platformNumber": 1,
          "routeDetails": {
              "routeID": 4,
              "routeName": "Downtown Express",
              "startingStation": "STN-045",
              "endingStation": "STN-045",
              "routeLocations": []
          },
          "arrivalTime": "12:45:00",
          "status": "CANCELLED"
      },
      "trainInfo": {
          "id": 3,
          "name": "Express 123"
      },
      "ticketSeats": [
          {
              "seatID": 1,
              "seatCode": "T10C1S0",
              "className": "FIRST CLASS",
              "pricePerson": 1000.0
          },
          {
              "seatID": 2,
              "seatCode": "T10C1S4",
              "className": "FIRST CLASS",
              "pricePerson": 1000.0
          }
      ],
      "timeStamp": "2026-03-01"
  },
  {
      "bookedTicketID": 2,
      "reservedSeatCount": 4,
      "price": 4000.0,
      "status": true,
      "returnLocation": "STN-045",
      "paymentDetails": {
          "id": 6,
          "paymentType": "CREDIT_CARD",
          "service": "PAYHERE",
          "date": "2026-03-01"
      },
      "joneryDetails": {
          "departTime": "08:30:00",
          "date": "2025-09-15",
          "stationName": "STN-045",
          "platformNumber": 1,
          "routeDetails": {
              "routeID": 4,
              "routeName": "Downtown Express",
              "startingStation": "STN-045",
              "endingStation": "STN-045",
              "routeLocations": []
          },
          "arrivalTime": "12:45:00",
          "status": "COMPLETED"
      },
      "trainInfo": {
          "id": 3,
          "name": "Express 123"
      },
      "ticketSeats": [
          {
              "seatID": 3,
              "seatCode": "T10C1S5",
              "className": "FIRST CLASS",
              "pricePerson": 1000.0
          },
          {
              "seatID": 4,
              "seatCode": "T10C1S10",
              "className": "FIRST CLASS",
              "pricePerson": 1000.0
          },
          {
              "seatID": 5,
              "seatCode": "T10C1S11",
              "className": "FIRST CLASS",
              "pricePerson": 1000.0
          },
          {
              "seatID": 6,
              "seatCode": "T10C1S12",
              "className": "FIRST CLASS",
              "pricePerson": 1000.0
          }
      ],
      "timeStamp": "2026-03-01"
  }
];

function MyBookings() {
  const [bookings, setBookings] = useState(MOCK_BOOKINGS);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState<number | null>(null);

  const handleCancelClick = (id: number) => {
    setBookingToCancel(id);
    setCancelModalOpen(true);
  };

  const confirmCancel = () => {
    if (bookingToCancel) {
      setBookings(bookings.map(b => 
        b.bookedTicketID === bookingToCancel 
          ? { ...b, joneryDetails: { ...b.joneryDetails, status: 'CANCELLED' } } 
          : b
      ));
      setCancelModalOpen(false);
      setBookingToCancel(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-slate-800">Booking History</h3>
        <div className="flex gap-2">
          <select className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option>All Bookings</option>
            <option>Upcoming</option>
            <option>Completed</option>
            <option>Cancelled</option>
          </select>
        </div>
      </div>

      {bookings.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-12 text-center text-slate-500">
          <Ticket className="h-12 w-12 mx-auto text-slate-300 mb-3" />
          <p>You have no past bookings.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div key={booking.bookedTicketID} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50/50">
                <div className="flex items-center gap-3">
                  <div className="bg-indigo-100 text-indigo-700 px-2.5 py-1 rounded-md font-mono text-sm font-semibold">
                    #TCK-{booking.bookedTicketID.toString().padStart(4, '0')}
                  </div>
                  <span className="text-sm text-slate-500">
                    Booked on {new Date(booking.timeStamp).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-3 mt-2 sm:mt-0 w-full sm:w-auto justify-between sm:justify-end">
                  <div className="flex items-center gap-2">
                    {booking.joneryDetails.status === 'CANCELLED' ? (
                      <span className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-red-100 text-red-700">
                        <XCircle className="h-3.5 w-3.5" /> Cancelled
                      </span>
                    ) : booking.joneryDetails.status === 'COMPLETED' ? (
                      <span className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700">
                        <CheckCircle2 className="h-3.5 w-3.5" /> Completed
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-blue-100 text-blue-700">
                        <Clock className="h-3.5 w-3.5" /> Upcoming
                      </span>
                    )}
                  </div>
                  {booking.joneryDetails.status === 'UPCOMING' && (
                    <button 
                      onClick={() => handleCancelClick(booking.bookedTicketID)}
                      className="text-xs font-medium text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      Cancel Ticket
                    </button>
                  )}
                </div>
              </div>

              <div className="p-6">
                <div className="flex flex-col md:flex-row justify-between gap-8">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-4">
                      <Train className="h-5 w-5 text-indigo-600" />
                      <h4 className="text-lg font-bold text-slate-900">{booking.trainInfo.name}</h4>
                      <span className="text-sm text-slate-500">({booking.joneryDetails.routeDetails.routeName})</span>
                    </div>

                    <div className="flex items-center gap-6">
                      <div>
                        <p className="text-sm text-slate-500 mb-1">Departure</p>
                        <p className="font-semibold text-slate-900">{booking.joneryDetails.stationName}</p>
                        <p className="text-sm text-slate-600">
                          {new Date(booking.joneryDetails.date).toLocaleDateString()} at {booking.joneryDetails.departTime.substring(0, 5)}
                        </p>
                      </div>
                      <div className="flex-1 flex items-center justify-center px-4 max-w-[150px]">
                        <div className="w-full h-px bg-slate-300 relative">
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-slate-400">
                            <ArrowRight className="h-4 w-4" />
                          </div>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-slate-500 mb-1">Arrival</p>
                        <p className="font-semibold text-slate-900">{booking.returnLocation}</p>
                        <p className="text-sm text-slate-600">
                          {new Date(booking.joneryDetails.date).toLocaleDateString()} at {booking.joneryDetails.arrivalTime.substring(0, 5)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="w-full md:w-64 bg-slate-50 rounded-xl p-4 border border-slate-100 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-slate-500">Passengers</span>
                        <span className="font-medium text-slate-900">{booking.reservedSeatCount}</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-slate-500">Class</span>
                        <span className="font-medium text-slate-900">{booking.ticketSeats[0]?.className || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-sm text-slate-500">Payment</span>
                        <span className="font-medium text-slate-900 flex items-center gap-1">
                          <CreditCard className="h-3.5 w-3.5 text-slate-400" />
                          {booking.paymentDetails.paymentType}
                        </span>
                      </div>
                    </div>
                    
                    <div className="pt-3 border-t border-slate-200 flex justify-between items-center">
                      <span className="font-semibold text-slate-700">Total</span>
                      <span className="text-lg font-bold text-indigo-600">Rs. {booking.price.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  <p className="text-sm font-medium text-slate-700 mb-3">Reserved Seats</p>
                  <div className="flex flex-wrap gap-2">
                    {booking.ticketSeats.map((seat) => (
                      <div key={seat.seatID} className="bg-white border border-indigo-200 text-indigo-700 px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2 shadow-sm">
                        <Ticket className="h-3.5 w-3.5" />
                        {seat.seatCode}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {cancelModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 overflow-hidden"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Cancel Ticket</h3>
                  <p className="text-sm text-slate-500">Are you sure you want to cancel this ticket? This action cannot be undone.</p>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button 
                  onClick={() => setCancelModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Keep Ticket
                </button>
                <button 
                  onClick={confirmCancel}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Yes, Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function UserProfile() {
  return (
    <div className="max-w-3xl bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
      <h3 className="text-xl font-semibold text-slate-800 mb-6">Profile Details</h3>
      <div className="space-y-6">
        <div className="flex items-center gap-6 pb-6 border-b border-slate-100">
          <div className="h-24 w-24 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-display text-4xl font-bold border-4 border-white shadow-md">
            JD
          </div>
          <div>
            <h4 className="text-2xl font-bold text-slate-900">John Doe</h4>
            <p className="text-slate-500">john.doe@example.com</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-500 mb-1">First Name</label>
            <p className="font-medium text-slate-900">John</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-500 mb-1">Last Name</label>
            <p className="font-medium text-slate-900">Doe</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-500 mb-1">Contact Number</label>
            <p className="font-medium text-slate-900">+94 77 123 4567</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-500 mb-1">NIC</label>
            <p className="font-medium text-slate-900">981234567V</p>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-500 mb-1">Address</label>
            <p className="font-medium text-slate-900">123 Main St, Colombo 03, Western Province</p>
          </div>
        </div>
        
        <div className="pt-6 border-t border-slate-100">
          <button className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}
