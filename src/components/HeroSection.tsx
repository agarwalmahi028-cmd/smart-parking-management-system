import React from 'react';
import { useParking } from '../context/ParkingContext';
import { 
  Radio, 
  Cpu, 
  Wifi, 
  Gauge, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  Zap,
  Clock,
  Layers
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { stats, setActiveView, slots, simulateRushHour, simulateMorningEmpty, isSimulating, setIsSimulating } = useParking();

  return (
    <div className="space-y-16 pb-12">
      {/* Hero Banner Section */}
      <section className="relative overflow-hidden pt-8 sm:pt-14 pb-12">
        {/* Ambient background glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-blue-600/15 via-emerald-500/10 to-transparent blur-3xl pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              {/* Domain Kicker */}
              <div className="inline-flex items-center gap-2 text-xs font-medium text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 rounded-full px-3 py-1">
                <Radio className="w-3.5 h-3.5 animate-pulse" />
                <span>ESP32 & HC-SR04 Microcontroller Telemetry</span>
                <span className="text-emerald-600">·</span>
                <span className="text-slate-300">Live 40kHz Ultrasonic</span>
              </div>

              {/* Required Exact Heading & Subtitle */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15] text-balance">
                Smart Parking Made Simple with{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-blue-400">
                  IoT Technology
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                Detect, Monitor, and Manage Parking Spaces in Real Time Using Ultrasonic Sensors.
              </p>

              {/* Primary & Secondary Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => setActiveView('live')}
                  className="px-6 py-3.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-sm transition-all shadow-lg shadow-emerald-500/25 flex items-center gap-2 group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                >
                  <span>View Live Parking</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => setActiveView('architecture')}
                  className="px-6 py-3.5 rounded-lg bg-slate-800 hover:bg-slate-700/80 text-white font-medium text-sm border border-slate-700 transition-colors flex items-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
                >
                  <Layers className="w-4 h-4 text-slate-400" />
                  <span>Explore System</span>
                </button>
              </div>

              {/* Trust & Spec Markers */}
              <div className="pt-4 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Sub-20cm Precision Detection</span>
                </span>
                <span className="text-slate-700">|</span>
                <span className="flex items-center gap-1.5">
                  <Wifi className="w-4 h-4 text-blue-400" />
                  <span>Wi-Fi HTTP & MQTT Ready</span>
                </span>
                <span className="text-slate-700">|</span>
                <span className="flex items-center gap-1.5">
                  <Cpu className="w-4 h-4 text-purple-400" />
                  <span>Dual LED Slot Feedback</span>
                </span>
              </div>
            </div>

            {/* Right Media: Architectural High-Tech Garage Render */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 bg-slate-800/80 shadow-2xl">
                <img
                  src="/src/assets/images/smart_parking_iot_hero_1793353190774.jpg"
                  alt="Modern IoT Smart Parking Garage with Ultrasonic Indicators"
                  className="w-full h-80 sm:h-96 object-cover"
                  referrerPolicy="no-referrer"
                />
                {/* Scrim Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

                {/* Floating Real-time Telemetry Card */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700/70 text-white space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-mono">FACILITY: LEVEL 1 (10 SLOTS)</span>
                    <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      Live Feed
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-1 border-t border-slate-800 text-center">
                    <div>
                      <div className="text-slate-400 text-[11px]">Free Bays</div>
                      <div className="text-xl font-bold font-mono text-emerald-400 tabular-nums">
                        {stats.availableSlots}
                      </div>
                    </div>
                    <div>
                      <div className="text-slate-400 text-[11px]">Occupied</div>
                      <div className="text-xl font-bold font-mono text-rose-400 tabular-nums">
                        {stats.occupiedSlots}
                      </div>
                    </div>
                    <div>
                      <div className="text-slate-400 text-[11px]">Avg Distance</div>
                      <div className="text-xl font-bold font-mono text-blue-400 tabular-nums">
                        {stats.avgDistanceCm} <span className="text-xs text-slate-400 font-normal">cm</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* KPI Metric Strip: Total, Available, Occupied, Sensor Status */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Total Slots */}
          <div className="p-5 rounded-xl bg-slate-800/60 border border-slate-700/70 hover:border-slate-600 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-slate-400">Total Parking Slots</span>
              <Gauge className="w-4 h-4 text-slate-400" />
            </div>
            <div className="text-3xl font-extrabold text-white font-mono tabular-nums">
              {stats.totalSlots}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">10 HC-SR04 Nodes Installed</div>
          </div>

          {/* Available Slots (Green) */}
          <div className="p-5 rounded-xl bg-slate-800/60 border border-emerald-500/30 hover:border-emerald-500/50 transition-colors relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/10 rounded-bl-full pointer-events-none" />
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-emerald-400">Available Slots</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-extrabold text-emerald-400 font-mono tabular-nums">
              {stats.availableSlots}
            </div>
            <div className="text-[11px] text-emerald-300/80 mt-1">Ultrasonic echo &gt; 20 cm</div>
          </div>

          {/* Occupied Slots (Red) */}
          <div className="p-5 rounded-xl bg-slate-800/60 border border-rose-500/30 hover:border-rose-500/50 transition-colors relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-rose-500/10 rounded-bl-full pointer-events-none" />
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-rose-400">Occupied Slots</span>
              <AlertCircle className="w-4 h-4 text-rose-400" />
            </div>
            <div className="text-3xl font-extrabold text-rose-400 font-mono tabular-nums">
              {stats.occupiedSlots}
            </div>
            <div className="text-[11px] text-rose-300/80 mt-1">Vehicles detected underneath</div>
          </div>

          {/* Occupancy Rate */}
          <div className="p-5 rounded-xl bg-slate-800/60 border border-blue-500/30 hover:border-blue-500/50 transition-colors relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/10 rounded-bl-full pointer-events-none" />
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-blue-400">Occupancy Rate</span>
              <Zap className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-3xl font-extrabold text-blue-400 font-mono tabular-nums">
              {stats.occupancyRate}%
            </div>
            <div className="text-[11px] text-blue-300/80 mt-1">
              {stats.disconnectedSlots > 0 ? `${stats.disconnectedSlots} sensor offline` : '100% telemetry online'}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Interactive Parking Snapshot preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 rounded-2xl bg-slate-800/40 border border-slate-700/80 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-white">Live Facility Status Preview</h2>
              <p className="text-sm text-slate-400">
                10-slot layout monitored via ultrasonic sound reflections at 40,000 Hz.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={simulateMorningEmpty}
                className="px-3 py-1.5 text-xs rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
              >
                Clear Facility
              </button>
              <button
                onClick={simulateRushHour}
                className="px-3 py-1.5 text-xs rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
              >
                Simulate Rush
              </button>
              <button
                onClick={() => setActiveView('live')}
                className="px-3 py-1.5 text-xs rounded-md bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-semibold"
              >
                Open Full Grid
              </button>
            </div>
          </div>

          {/* Quick slot chips */}
          <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-10 gap-2.5">
            {slots.map(slot => {
              const isOccupied = slot.status === 'occupied';
              const isDisconnected = slot.status === 'disconnected';
              const isReserved = slot.status === 'reserved';

              let borderColor = 'border-emerald-500/40 bg-emerald-950/20 text-emerald-400';
              let badgeText = 'FREE';
              let statusColor = 'text-emerald-400';

              if (isOccupied) {
                borderColor = 'border-rose-500/40 bg-rose-950/20 text-rose-400';
                badgeText = 'BUSY';
                statusColor = 'text-rose-400';
              } else if (isReserved) {
                borderColor = 'border-amber-500/40 bg-amber-950/20 text-amber-400';
                badgeText = 'HOLD';
                statusColor = 'text-amber-400';
              } else if (isDisconnected) {
                borderColor = 'border-slate-600 bg-slate-800/40 text-slate-400';
                badgeText = 'OFF';
                statusColor = 'text-slate-400';
              }

              return (
                <div
                  key={slot.id}
                  onClick={() => setActiveView('live')}
                  className={`p-3 rounded-lg border ${borderColor} flex flex-col items-center justify-between gap-1.5 cursor-pointer hover:scale-105 transition-all text-center`}
                >
                  <div className="text-xs font-bold font-mono">{slot.id}</div>
                  <div className={`text-[10px] font-semibold uppercase tracking-wider ${statusColor}`}>
                    {badgeText}
                  </div>
                  <div className="text-[11px] font-mono text-slate-300 tabular-nums">
                    {slot.status === 'disconnected' ? 'N/A' : `${slot.distanceCm} cm`}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* System Features Bento Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-white">How SmartPark Works</h2>
          <p className="text-sm text-slate-400 mt-1">
            Bridging physical ultrasonic waves, embedded microcontrollers, and modern cloud telemetry.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Ultrasonic HC-SR04 Detection */}
          <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/80 hover:border-slate-600 transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Radio className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-white">01. 40kHz Ultrasonic Pulse</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              The HC-SR04 sensor transmits a 10µs ultrasonic burst at 40,000 Hz. Sound reflects off approaching vehicles, and the return echo duration determines distance down to the centimeter.
            </p>
            <div className="text-xs text-slate-400 font-mono bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
              Distance = (Echo Time × 0.034 cm/µs) / 2
            </div>
          </div>

          {/* Card 2: ESP32 & Arduino Edge Processing */}
          <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/80 hover:border-slate-600 transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-white">02. Edge Microcontroller</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              An ESP32 or Arduino Uno microchip calculates the distance in real-time. If reading is below the threshold (e.g. 20 cm), it immediately toggles hardware LEDs and bundles data into JSON.
            </p>
            <div className="text-xs text-slate-400 font-mono bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
              Green LED: Free &nbsp;|&nbsp; Red LED: Occupied
            </div>
          </div>

          {/* Card 3: Cloud Wi-Fi & Live Dashboard */}
          <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/80 hover:border-slate-600 transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Wifi className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-white">03. Wi-Fi Telemetry & Cloud</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Sensor data transmits over standard 2.4GHz Wi-Fi via HTTP POST or MQTT. Drivers view open slots from their smartphones, and operators monitor usage statistics instantly.
            </p>
            <div className="text-xs text-slate-400 font-mono bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
              Payload: &#123; slotId: &quot;P1&quot;, dist: 45, status: &quot;available&quot; &#125;
            </div>
          </div>
        </div>
      </section>

      {/* Smart City Facility Showcase with Generated Photo */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 bg-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="lg:col-span-6 p-8 sm:p-12 space-y-6">
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                Smart City Infrastructure
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white text-balance">
                Reducing Urban Traffic Congestion and Carbon Emissions
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Over 30% of downtown urban traffic is caused by vehicles searching for empty parking spaces. With SmartPark&apos;s real-time ultrasonic sensor network, drivers find vacant spots in seconds, reducing fuel consumption, driver stress, and carbon footprints.
              </p>

              <div className="space-y-3 text-sm text-slate-300">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Real-time bay occupancy detection with sub-second latency</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Configurable height & distance thresholds for all vehicle types</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Plug-and-play ESP32 code template with OTA updates</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setActiveView('hardware')}
                  className="px-5 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-sm transition-colors cursor-pointer"
                >
                  View Hardware Circuit & Code
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 h-full min-h-[300px]">
              <img
                src="/src/assets/images/smart_city_parking_system_1793353191511.jpg"
                alt="Intelligent eco-city parking facility"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
