import React, { useState } from 'react';
import { useParking } from '../context/ParkingContext';
import { Radio, Menu, X, Car, Activity, Zap } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { activeView, setActiveView, stats, isSimulating, setIsSimulating } = useParking();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'live', label: 'Live Parking' },
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'hardware', label: 'Hardware' },
    { id: 'architecture', label: 'Architecture' },
    { id: 'reserve', label: 'Reserve' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    setActiveView(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Brand Wordmark */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded-md p-1 -m-1"
          >
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500/20 transition-colors">
              <Radio className="w-5 h-5 text-emerald-400 animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-white whitespace-nowrap shrink-0">
                Smart<span className="text-emerald-400">Park</span>
              </span>
              <span className="text-[10px] text-slate-400 -mt-1 hidden sm:block tracking-wide">
                IoT Ultrasonic Grid
              </span>
            </div>
          </button>

          {/* Zone 2: Navigation Links (Clean single line typography) */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
            {navItems.map(item => {
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative py-1.5 whitespace-nowrap shrink-0 transition-colors ${
                    isActive
                      ? 'text-emerald-400 font-semibold'
                      : 'hover:text-white'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action & Quick Telemetry Indicator */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Live slot counter indicator */}
            <div className="hidden sm:flex items-center gap-2 text-xs bg-slate-800/80 border border-slate-700/60 rounded-md px-2.5 py-1.5 text-slate-300">
              <span className="text-emerald-400 font-mono font-semibold tabular-nums">
                {stats.availableSlots}
              </span>
              <span className="text-slate-400">of 10 Free</span>
              <span className="text-slate-600">·</span>
              <button
                onClick={() => setIsSimulating(!isSimulating)}
                title={isSimulating ? 'Pause IoT sensor auto-stream' : 'Resume IoT sensor auto-stream'}
                className="flex items-center gap-1 text-[11px] hover:text-emerald-300 transition-colors"
              >
                <Activity className={`w-3 h-3 ${isSimulating ? 'text-emerald-400 animate-spin' : 'text-slate-500'}`} style={{ animationDuration: '4s' }} />
                <span>{isSimulating ? 'IoT Live' : 'Paused'}</span>
              </button>
            </div>

            <button
              onClick={() => handleNavClick('live')}
              className="px-4 py-2 text-xs font-semibold text-slate-900 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm shadow-emerald-500/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            >
              View Live Parking
            </button>

            {/* Mobile menu hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg border border-slate-800 bg-slate-800/50"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900/98 border-b border-slate-800 px-4 pt-3 pb-5 space-y-1">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-xs text-slate-400">
            <span>Availability: <strong className="text-emerald-400">{stats.availableSlots} slots open</strong></span>
            <span className="font-mono text-[11px]">{stats.occupancyRate}% Occupied</span>
          </div>
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                activeView === item.id
                  ? 'bg-emerald-500/10 text-emerald-400'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2">
            <button
              onClick={() => handleNavClick('reserve')}
              className="w-full py-2.5 px-4 bg-emerald-500 text-slate-900 font-semibold rounded-lg text-center text-sm"
            >
              Reserve Parking Bay
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
