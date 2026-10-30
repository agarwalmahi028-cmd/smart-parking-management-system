import React from 'react';
import { useParking } from '../context/ParkingContext';
import { Radio, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveView } = useParking();

  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Radio className="w-4 h-4" />
              </div>
              <span className="text-base font-bold text-white tracking-tight">
                Smart<span className="text-emerald-400">Park</span>
              </span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              IoT-Based Smart Parking System Using HC-SR04 Ultrasonic Sensors and ESP32 Microcontrollers.
            </p>
          </div>

          {/* Quick Nav */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-xs uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2 text-[11px]">
              <li>
                <button onClick={() => setActiveView('home')} className="hover:text-emerald-400 transition-colors">
                  Home Overview
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('live')} className="hover:text-emerald-400 transition-colors">
                  Live 10-Slot Grid
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('dashboard')} className="hover:text-emerald-400 transition-colors">
                  Admin Telemetry Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('hardware')} className="hover:text-emerald-400 transition-colors">
                  Hardware &amp; Circuit Wiring
                </button>
              </li>
            </ul>
          </div>

          {/* System Specs */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-xs uppercase tracking-wider">IoT Architecture</h4>
            <ul className="space-y-2 text-[11px]">
              <li>
                <button onClick={() => setActiveView('architecture')} className="hover:text-emerald-400 transition-colors">
                  System Architecture Diagram
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('reserve')} className="hover:text-emerald-400 transition-colors">
                  Driver Bay Reservation
                </button>
              </li>
              <li>
                <span className="text-slate-500">HC-SR04 40kHz Transducer</span>
              </li>
              <li>
                <span className="text-slate-500">Wi-Fi 802.11 b/g/n 2.4GHz</span>
              </li>
            </ul>
          </div>

          {/* Contact / Inquiries */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-xs uppercase tracking-wider">Connect</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
              Designed for smart cities, universities, airports, and commercial parking complexes.
            </p>
            <button
              onClick={() => setActiveView('contact')}
              className="text-xs text-emerald-400 hover:text-emerald-300 font-medium"
            >
              Get in Touch with Systems Team →
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} SmartPark. Open hardware and IoT parking reference architecture.
          </div>
          <div className="flex items-center gap-4">
            <span>Sub-cm Ultrasonic Accuracy</span>
            <span>·</span>
            <span>Real-Time Wi-Fi Sync</span>
            <span>·</span>
            <span>Zero-Contact Detection</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
