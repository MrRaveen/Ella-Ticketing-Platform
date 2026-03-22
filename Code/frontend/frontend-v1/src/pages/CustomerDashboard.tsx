import React, { useState, useEffect } from 'react';
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
  AlertTriangle,
  Loader2
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import BookTicket from '../components/customer/BookTicket';
import { api } from '../services/api';

export default function CustomerDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = api.auth.getCurrentUser();
    if (!currentUser || currentUser.role !== 'CUSTOMER') {
      navigate('/login');
    } else {
      setUser(currentUser);
    }
  }, [navigate]);

  const handleLogout = () => {
    api.auth.logout();
    navigate('/');
  };

  const renderContent = () => {
    if (!user) return null;
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview user={user} onBookTicket={() => { setActiveTab('book-ticket'); setIsMobileMenuOpen(false); }} />;
      case 'my-bookings':
        return <MyBookings user={user} />;
      case 'book-ticket':
        return <BookTicket onBookingComplete={() => { setActiveTab('my-bookings'); setIsMobileMenuOpen(false); }} />;
      case 'profile':
        return <UserProfile user={user} />;
      default:
        return <DashboardOverview user={user} onBookTicket={() => { setActiveTab('book-ticket'); setIsMobileMenuOpen(false); }} />;
    }
  };

  if (!user) return <div className="min-h-screen flex items-center justify-center bg-slate-50"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>;

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
          <Link to="/" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
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
                className="pl-9 pr-4 py-2 rounded-full border border-slate-200 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 w-48 lg:w-64"
              />
            </div>
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm border border-blue-200 shrink-0">
              {user.fname?.[0] || 'U'}
            </div>
          </div>
        </header>
        
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
            <div>
              {renderContent()}
            </div>
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
          ? 'bg-blue-50 text-blue-700' 
          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
      }`}
    >
      {React.cloneElement(icon as React.ReactElement, { className: 'h-5 w-5' })}
      {label}
    </button>
  );
}

function DashboardOverview({ onBookTicket, user }: { onBookTicket: () => void, user: any }) {
  const [upcomingBooking, setUpcomingBooking] = useState<any>(null);

  useEffect(() => {
    const loadBookings = async () => {
      const bookings = await api.bookings.getAll(user.id);
      const upcoming = bookings.find((b: any) => b.status === 'UPCOMING');
      setUpcomingBooking(upcoming);
    };
    loadBookings();
  }, [user.id]);

  return (
    <div className="space-y-6">
      <div className="bg-blue-600 rounded-2xl p-8 text-white shadow-lg shadow-blue-200 relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-3xl font-bold font-display mb-2">Welcome back, {user.fname}!</h2>
          <p className="text-blue-100 max-w-lg">Ready for your next journey? Search for trains and book your tickets easily.</p>
          <button 
            onClick={onBookTicket}
            className="mt-6 bg-white text-blue-600 px-6 py-2.5 rounded-xl font-medium text-sm hover:bg-blue-50 transition-colors shadow-sm"
          >
            Book a Ticket
          </button>
        </div>
        <Train className="absolute right-8 -bottom-8 h-48 w-48 text-blue-500 opacity-30" />
      </div>

      {upcomingBooking && (
        <>
          <h3 className="text-lg font-semibold text-slate-800 mt-8 mb-4">Upcoming Journey</h3>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                  <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-md font-medium text-xs">Confirmed</span>
                  <span>•</span>
                  <span className="font-mono">#TCK-{upcomingBooking.id.substring(0, 8)}</span>
                </div>
                <h4 className="text-xl font-bold text-slate-900">{upcomingBooking.trainName}</h4>
                <div className="flex items-center gap-4 mt-4">
                  <div>
                    <p className="text-sm text-slate-500">From</p>
                    <p className="font-semibold text-slate-900">{upcomingBooking.routeStart}</p>
                    <p className="text-sm text-slate-600">{upcomingBooking.departTime}</p>
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
                    <p className="font-semibold text-slate-900">{upcomingBooking.routeEnd}</p>
                    <p className="text-sm text-slate-600">{upcomingBooking.arriveTime}</p>
                  </div>
                </div>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 min-w-[200px]">
                <div className="flex items-center gap-3 mb-3">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Date</p>
                    <p className="font-medium text-slate-900">{new Date(upcomingBooking.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Passengers</p>
                    <p className="font-medium text-slate-900">{upcomingBooking.passengers} Adults</p>
                  </div>
                </div>
                <button className="w-full mt-4 bg-white border border-slate-200 text-slate-700 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
                  View Ticket
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function MyBookings({ user }: { user: any }) {
  const [bookings, setBookings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState<string | null>(null);

  useEffect(() => {
    loadBookings();
  }, [user.id]);

  const loadBookings = async () => {
    setIsLoading(true);
    try {
      const data = await api.bookings.getAll(user.id);
      setBookings(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelClick = (id: string) => {
    setBookingToCancel(id);
    setCancelModalOpen(true);
  };

  const confirmCancel = async () => {
    if (bookingToCancel) {
      try {
        await api.bookings.cancel(bookingToCancel);
        await loadBookings();
      } catch (error) {
        console.error(error);
      } finally {
        setCancelModalOpen(false);
        setBookingToCancel(null);
      }
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-64"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-slate-800">Booking History</h3>
        <div className="flex gap-2">
          <select className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
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
            <div key={booking.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50/50">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 text-blue-700 px-2.5 py-1 rounded-md font-mono text-sm font-semibold">
                    #TCK-{booking.id.substring(0, 8)}
                  </div>
                  <span className="text-sm text-slate-500">
                    Booked on {new Date(booking.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-3 mt-2 sm:mt-0 w-full sm:w-auto justify-between sm:justify-end">
                  <div className="flex items-center gap-2">
                    {booking.status === 'CANCELLED' ? (
                      <span className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-red-100 text-red-700">
                        <XCircle className="h-3.5 w-3.5" /> Cancelled
                      </span>
                    ) : booking.status === 'COMPLETED' ? (
                      <span className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700">
                        <CheckCircle2 className="h-3.5 w-3.5" /> Completed
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-blue-100 text-blue-700">
                        <Clock className="h-3.5 w-3.5" /> Upcoming
                      </span>
                    )}
                  </div>
                  {booking.status === 'UPCOMING' && (
                    <button 
                      onClick={() => handleCancelClick(booking.id)}
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
                      <Train className="h-5 w-5 text-blue-600" />
                      <h4 className="text-lg font-bold text-slate-900">{booking.trainName}</h4>
                    </div>

                    <div className="flex items-center gap-6">
                      <div>
                        <p className="text-sm text-slate-500 mb-1">Departure</p>
                        <p className="font-semibold text-slate-900">{booking.routeStart}</p>
                        <p className="text-sm text-slate-600">
                          {new Date(booking.date).toLocaleDateString()} at {booking.departTime}
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
                        <p className="font-semibold text-slate-900">{booking.routeEnd}</p>
                        <p className="text-sm text-slate-600">
                          {new Date(booking.date).toLocaleDateString()} at {booking.arriveTime}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="w-full md:w-64 bg-slate-50 rounded-xl p-4 border border-slate-100 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-slate-500">Passengers</span>
                        <span className="font-medium text-slate-900">{booking.passengers}</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-slate-500">Class</span>
                        <span className="font-medium text-slate-900">{booking.className}</span>
                      </div>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-sm text-slate-500">Payment</span>
                        <span className="font-medium text-slate-900 flex items-center gap-1">
                          <CreditCard className="h-3.5 w-3.5 text-slate-400" />
                          {booking.paymentMethod}
                        </span>
                      </div>
                    </div>
                    
                    <div className="pt-3 border-t border-slate-200 flex justify-between items-center">
                      <span className="font-semibold text-slate-700">Total</span>
                      <span className="text-lg font-bold text-blue-600">Rs. {booking.price.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {booking.seatCodes && (
                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <p className="text-sm font-medium text-slate-700 mb-3">Reserved Seats</p>
                    <div className="flex flex-wrap gap-2">
                      {booking.seatCodes.map((code: string, idx: number) => (
                        <div key={idx} className="bg-white border border-blue-200 text-blue-700 px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2 shadow-sm">
                          <Ticket className="h-3.5 w-3.5" />
                          {code}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <>
        {cancelModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50">
            <div 
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
            </div>
          </div>
        )}
      </>
    </div>
  );
}

function UserProfile({ user }: { user: any }) {
  return (
    <div className="max-w-3xl bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
      <h3 className="text-xl font-semibold text-slate-800 mb-6">Profile Details</h3>
      <div className="space-y-6">
        <div className="flex items-center gap-6 pb-6 border-b border-slate-100">
          <div className="h-24 w-24 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-display text-4xl font-bold border-4 border-white shadow-md">
            {user.fname?.[0] || 'U'}
          </div>
          <div>
            <h4 className="text-2xl font-bold text-slate-900">{user.fname} {user.lname}</h4>
            <p className="text-slate-500">{user.email}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-500 mb-1">First Name</label>
            <p className="font-medium text-slate-900">{user.fname}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-500 mb-1">Last Name</label>
            <p className="font-medium text-slate-900">{user.lname}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-500 mb-1">Contact Number</label>
            <p className="font-medium text-slate-900">{user.contactNo || 'N/A'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-500 mb-1">NIC</label>
            <p className="font-medium text-slate-900">{user.nic || 'N/A'}</p>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-500 mb-1">Address</label>
            <p className="font-medium text-slate-900">{user.address || 'N/A'}</p>
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
