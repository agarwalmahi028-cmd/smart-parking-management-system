import React, { useState } from 'react';
import { useParking } from '../context/ParkingContext';
import { 
  Search, 
  CalendarCheck, 
  CheckCircle2, 
  Car, 
  Clock, 
  QrCode, 
  X, 
  Zap, 
  ShieldCheck, 
  RotateCcw,
  Sparkles,
  Ticket
} from 'lucide-react';

export const UserReservation: React.FC = () => {
  const { slots, bookings, createBooking, cancelBooking, setActiveView } = useParking();

  // Search & Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');

  // Reservation Modal Form state
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
  const [driverName, setDriverName] = useState('');
  const [phone, setPhone] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [vehicleType, setVehicleType] = useState('Standard Sedan');
  const [durationHours, setDurationHours] = useState(2);
  const [confirmationNotice, setConfirmationNotice] = useState<string | null>(null);

  // Hourly parking rate
  const HOURLY_RATE = 40; // 40 currency units per hour

  const availableSlots = slots.filter(s => s.status === 'available');

  const filteredAvailableSlots = availableSlots.filter(s => {
    const matchesSearch = s.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          s.floor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'All' || s.bayType === selectedType;
    return matchesSearch && matchesType;
  });

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlotId || !driverName || !licensePlate) {
      alert('Please fill in driver name and license plate number.');
      return;
    }

    const res = createBooking({
      slotId: selectedSlotId,
      driverName,
      phone: phone || '+91 98000 00000',
      licensePlate: licensePlate.toUpperCase(),
      vehicleType,
      startTime: 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      durationHours,
      cost: durationHours * HOURLY_RATE,
    });

    if (res.success) {
      setConfirmationNotice(res.message);
      setSelectedSlotId(null);
      // Reset form
      setDriverName('');
      setLicensePlate('');
      setPhone('');
      setTimeout(() => setConfirmationNotice(null), 5000);
    } else {
      alert(res.message);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Page Header */}
      <div className="border-b border-slate-800 pb-6">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
          <CalendarCheck className="w-4 h-4" />
          <span>Driver Reservation Portal</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Reserve an Available Parking Space
        </h1>
        <p className="text-sm text-slate-400 mt-1 max-w-2xl">
          Search real-time vacant slots monitored by ultrasonic sensors, reserve your spot in advance, and generate an instant digital entry pass.
        </p>
      </div>

      {confirmationNotice && (
        <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-sm flex items-center justify-between animate-fade-in shadow-lg">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>{confirmationNotice}</span>
          </div>
          <button 
            onClick={() => setConfirmationNotice(null)}
            className="text-emerald-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Search & Bay Type Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-slate-800/50 border border-slate-700/80">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by Slot ID (e.g. P1, P3, P7)..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg pl-10 pr-4 py-2 text-xs placeholder:text-slate-500 focus:outline-none focus:border-emerald-400"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs text-slate-400 font-medium whitespace-nowrap">Filter Type:</span>
          {['All', 'Standard', 'EV Charging', 'Accessible', 'Compact'].map(type => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                selectedType === type
                  ? 'bg-emerald-500 text-slate-950 font-bold'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Available Slots Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">
            Available Bays Ready for Reservation ({filteredAvailableSlots.length})
          </h2>
          <button
            onClick={() => setActiveView('live')}
            className="text-xs text-emerald-400 hover:underline"
          >
            View Live Grid Map →
          </button>
        </div>

        {filteredAvailableSlots.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-slate-800/30 border border-slate-800 space-y-3">
            <Car className="w-10 h-10 text-slate-500 mx-auto" />
            <h3 className="text-base font-semibold text-white">No Vacant Slots Matching Criteria</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              All slots in this category are currently occupied by vehicles or reserved. Try selecting &quot;All&quot; or check back shortly.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAvailableSlots.map(slot => (
              <div
                key={slot.id}
                className="p-5 rounded-2xl bg-slate-800/50 border border-slate-700/80 hover:border-emerald-500/50 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold font-mono text-white">{slot.id}</span>
                      <span className="text-xs px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/50 font-semibold">
                        VACANT
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">{slot.floor}</p>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-mono text-emerald-400 font-bold block">
                      {slot.distanceCm} cm
                    </span>
                    <span className="text-[10px] text-slate-500">Acoustic Echo</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-slate-300 pt-2 border-t border-slate-700/50">
                  <div>
                    <span className="text-[10px] text-slate-500 block">BAY TYPE</span>
                    <span className="font-medium text-white">{slot.bayType}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">PARKING RATE</span>
                    <span className="font-mono text-white">₹{HOURLY_RATE} / hr</span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedSlotId(slot.id)}
                  className="w-full py-2.5 px-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Ticket className="w-4 h-4" />
                  <span>Reserve Slot {slot.id}</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Active Digital Booking Passes & History */}
      <div className="space-y-4 pt-6 border-t border-slate-800">
        <h2 className="text-lg font-bold text-white">Your Bookings &amp; Digital Entry Passes</h2>
        <p className="text-xs text-slate-400">
          Present your QR entry pass or PIN code at the parking facility barrier gate.
        </p>

        {bookings.length === 0 ? (
          <div className="p-8 text-center rounded-xl bg-slate-800/30 border border-slate-800 text-xs text-slate-400">
            No booking records found. Reserve a slot above to get your digital pass.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bookings.map(booking => {
              const isActive = booking.status === 'active';

              return (
                <div
                  key={booking.id}
                  className={`p-5 rounded-2xl border ${
                    isActive ? 'bg-slate-800/80 border-emerald-500/40' : 'bg-slate-800/30 border-slate-700'
                  } space-y-4`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-emerald-400">
                        <QrCode className="w-7 h-7" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-base font-bold text-white font-mono">{booking.id}</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                            isActive ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-slate-800 text-slate-400'
                          }`}>
                            {booking.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400">Slot <strong>{booking.slotId}</strong> · {booking.startTime}</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-xs font-mono text-slate-400">Gate PIN</div>
                      <div className="text-lg font-mono font-bold text-emerald-400 tracking-widest">{booking.pinCode}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-xs p-3 rounded-lg bg-slate-900 border border-slate-800">
                    <div>
                      <span className="text-[10px] text-slate-500 block">DRIVER</span>
                      <span className="text-white font-medium truncate block">{booking.driverName}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block">VEHICLE PLATE</span>
                      <span className="font-mono text-white font-bold">{booking.licensePlate}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block">DURATION</span>
                      <span className="text-white font-medium">{booking.durationHours} hrs (₹{booking.cost})</span>
                    </div>
                  </div>

                  {isActive && (
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Ultrasonic Sensor Reserved</span>
                      </span>

                      <button
                        onClick={() => cancelBooking(booking.id)}
                        className="text-xs text-rose-400 hover:text-rose-300 font-medium hover:underline cursor-pointer"
                      >
                        Cancel Reservation
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Reservation Modal */}
      {selectedSlotId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-700 p-6 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">Reserve Bay {selectedSlotId}</h3>
                <p className="text-xs text-slate-400">Lock slot in ultrasonic grid for your vehicle</p>
              </div>
              <button
                onClick={() => setSelectedSlotId(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleBookingSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 mb-1 font-medium">Driver Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Verma"
                  value={driverName}
                  onChange={e => setDriverName(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-2.5 text-xs focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-medium">Vehicle License Plate *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. KA-01-AB-1234"
                  value={licensePlate}
                  onChange={e => setLicensePlate(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-2.5 text-xs font-mono uppercase focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1 font-medium">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-2.5 text-xs focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-medium">Vehicle Category</label>
                  <select
                    value={vehicleType}
                    onChange={e => setVehicleType(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-2.5 text-xs"
                  >
                    <option value="Standard Sedan">Sedan</option>
                    <option value="SUV / Crossover">SUV</option>
                    <option value="EV Vehicle">Electric Vehicle</option>
                    <option value="Hatchback / Compact">Compact</option>
                  </select>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-slate-300 font-medium">Parking Duration:</label>
                  <span className="font-mono font-bold text-emerald-400">{durationHours} Hours</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="8"
                  value={durationHours}
                  onChange={e => setDurationHours(parseInt(e.target.value, 10))}
                  className="w-full accent-emerald-400 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-0.5">
                  <span>1 hr</span>
                  <span>4 hrs</span>
                  <span>8 hrs</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/70 border border-slate-700 space-y-1.5">
                <div className="flex justify-between text-slate-300">
                  <span>Estimated Total (₹{HOURLY_RATE}/hr):</span>
                  <span className="font-mono font-bold text-white text-sm">₹{durationHours * HOURLY_RATE}</span>
                </div>
                <p className="text-[10px] text-slate-400 leading-tight">
                  Free cancellation up to 15 minutes before scheduled arrival. Slot is held automatically by ultrasonic network.
                </p>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg text-xs transition-colors cursor-pointer"
                >
                  Confirm &amp; Generate Gate Pass
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedSlotId(null)}
                  className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
