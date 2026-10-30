import React, { useState } from 'react';
import { useParking } from '../context/ParkingContext';
import { 
  BarChart3, 
  Activity, 
  Wifi, 
  Sliders, 
  Download, 
  TrendingUp, 
  Clock, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle,
  FileText,
  Shield,
  Layers
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { 
    slots, 
    stats, 
    globalThreshold, 
    setGlobalThreshold, 
    telemetryLogs, 
    resetAllSlots,
    simulateRushHour,
    simulateMorningEmpty
  } = useParking();

  const [selectedTimeframe, setSelectedTimeframe] = useState<'24h' | '7d' | '30d'>('24h');

  // Realistic historical occupancy data points for SVG charts
  const hourlyData = [
    { time: '06:00', rate: 10, count: 1 },
    { time: '08:00', rate: 60, count: 6 },
    { time: '10:00', rate: 90, count: 9 },
    { time: '12:00', rate: 80, count: 8 },
    { time: '14:00', rate: 70, count: 7 },
    { time: '16:00', rate: 90, count: 9 },
    { time: '18:00', rate: 100, count: 10 },
    { time: '20:00', rate: 50, count: 5 },
    { time: '22:00', rate: 20, count: 2 },
  ];

  const exportTelemetryCSV = () => {
    const headers = 'ID,Timestamp,SlotId,DistanceCm,Status,EchoTimeMicros,Source\n';
    const rows = telemetryLogs.map(l => 
      `${l.id},${l.timestamp},${l.slotId},${l.distanceCm},${l.status},${l.echoTimeMicros},${l.source}`
    ).join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `smartpark_telemetry_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Dashboard Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
            <Activity className="w-4 h-4" />
            <span>Smart City Facility Telemetry</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Administrator Telemetry Dashboard
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Comprehensive real-time sensor analytics, distance histograms, connection telemetry, and threshold controls.
          </p>
        </div>

        {/* Global Action Bar */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={exportTelemetryCSV}
            className="px-3.5 py-2 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={simulateMorningEmpty}
            className="px-3 py-2 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors cursor-pointer"
          >
            Clear Lot
          </button>
          <button
            onClick={simulateRushHour}
            className="px-3 py-2 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors cursor-pointer"
          >
            Rush Lot
          </button>
          <button
            onClick={resetAllSlots}
            className="px-3 py-2 text-xs font-medium rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold transition-colors cursor-pointer"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Primary KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Slots */}
        <div className="p-5 rounded-xl bg-slate-800/60 border border-slate-700/80">
          <div className="text-xs text-slate-400 font-medium mb-1">Total Parking Slots</div>
          <div className="text-3xl font-bold font-mono text-white tabular-nums">
            {stats.totalSlots}
          </div>
          <div className="text-[11px] text-slate-400 mt-2 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>10 Node Array (Zone A, B, C)</span>
          </div>
        </div>

        {/* Available Slots */}
        <div className="p-5 rounded-xl bg-slate-800/60 border border-emerald-500/30">
          <div className="text-xs text-emerald-400 font-medium mb-1">Available Slots</div>
          <div className="text-3xl font-bold font-mono text-emerald-400 tabular-nums">
            {stats.availableSlots}
          </div>
          <div className="text-[11px] text-slate-400 mt-2">
            Ready for instant occupancy
          </div>
        </div>

        {/* Occupied Slots */}
        <div className="p-5 rounded-xl bg-slate-800/60 border border-rose-500/30">
          <div className="text-xs text-rose-400 font-medium mb-1">Occupied Slots</div>
          <div className="text-3xl font-bold font-mono text-rose-400 tabular-nums">
            {stats.occupiedSlots}
          </div>
          <div className="text-[11px] text-slate-400 mt-2">
            Vehicles within ultrasonic range
          </div>
        </div>

        {/* Occupancy Percentage */}
        <div className="p-5 rounded-xl bg-slate-800/60 border border-blue-500/30">
          <div className="text-xs text-blue-400 font-medium mb-1">Occupancy Percentage</div>
          <div className="text-3xl font-bold font-mono text-blue-400 tabular-nums">
            {stats.occupancyRate}%
          </div>
          <div className="w-full bg-slate-700 h-1.5 rounded-full mt-2.5 overflow-hidden">
            <div
              className="bg-blue-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${stats.occupancyRate}%` }}
            />
          </div>
        </div>
      </div>

      {/* Live Distance Reading Matrix & Global Calibration */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Live Distance Readings for all 10 slots */}
        <div className="lg:col-span-8 p-6 rounded-2xl bg-slate-800/50 border border-slate-700/80 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-lg font-bold text-white">Live Distance Readings (HC-SR04 Array)</h2>
              <p className="text-xs text-slate-400">
                Continuous ultrasonic sound reflections in centimeters. Distance &lt; {globalThreshold} cm triggers occupied.
              </p>
            </div>
            <div className="text-xs font-mono text-slate-400 bg-slate-900 px-2.5 py-1 rounded border border-slate-800">
              Threshold: &lt;{globalThreshold} cm
            </div>
          </div>

          {/* Slot Distance Progress Bars */}
          <div className="space-y-3">
            {slots.map(slot => {
              const isOccupied = slot.status === 'occupied';
              const isDisconnected = slot.status === 'disconnected';
              const percentage = isDisconnected ? 0 : Math.min(100, Math.round((slot.distanceCm / 80) * 100));

              return (
                <div key={slot.id} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-white w-8">{slot.id}</span>
                      <span className="text-slate-400 text-[11px]">{slot.floor}</span>
                      <span className="text-slate-500">·</span>
                      <span className={`text-[11px] font-semibold ${
                        isOccupied ? 'text-rose-400' : isDisconnected ? 'text-slate-400' : 'text-emerald-400'
                      }`}>
                        {slot.status.toUpperCase()}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-[11px] text-slate-400 font-mono">
                        RSSI: {slot.sensorStatus === 'online' ? `${slot.signalRssi} dBm` : 'Offline'}
                      </span>
                      <span className="font-mono font-bold text-white tabular-nums w-16 text-right">
                        {isDisconnected ? 'OFFLINE' : `${slot.distanceCm} cm`}
                      </span>
                    </div>
                  </div>

                  {/* Visual Distance Bar with Threshold Indicator */}
                  <div className="relative w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                    {/* Threshold line at 20cm (approx 25% of 80cm scale) */}
                    <div 
                      className="absolute top-0 bottom-0 w-0.5 bg-yellow-400/70 z-10" 
                      style={{ left: `${(globalThreshold / 80) * 100}%` }}
                      title={`Threshold: ${globalThreshold} cm`}
                    />
                    
                    {/* Distance fill */}
                    <div
                      className={`h-full transition-all duration-300 ${
                        isDisconnected 
                          ? 'bg-slate-700' 
                          : isOccupied 
                            ? 'bg-rose-500' 
                            : 'bg-emerald-500'
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Sensor Connection Matrix & Calibration Controls */}
        <div className="lg:col-span-4 space-y-6">
          {/* Global Threshold Calibration */}
          <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/80 space-y-4">
            <div className="flex items-center gap-2">
              <Sliders className="w-5 h-5 text-emerald-400" />
              <h3 className="text-base font-bold text-white">Threshold Calibration</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Adjust the distance boundary in centimeters that determines whether a vehicle is detected in a slot.
            </p>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">Global Trigger Boundary:</span>
                <span className="text-lg font-mono font-bold text-emerald-400 tabular-nums">
                  {globalThreshold} cm
                </span>
              </div>

              <input
                type="range"
                min="10"
                max="40"
                step="1"
                value={globalThreshold}
                onChange={e => setGlobalThreshold(parseInt(e.target.value, 10))}
                className="w-full accent-emerald-400 cursor-pointer"
              />

              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>10 cm (Close)</span>
                <span>Default: 20 cm</span>
                <span>40 cm (High SUV)</span>
              </div>
            </div>
          </div>

          {/* Sensor Connection Status Matrix */}
          <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/80 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wifi className="w-5 h-5 text-blue-400" />
                <h3 className="text-base font-bold text-white">Hardware Health</h3>
              </div>
              <span className="text-xs text-emerald-400 font-mono">
                {slots.filter(s => s.sensorStatus === 'online').length} / 10 Active
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                <span className="text-slate-300">ESP32 Wi-Fi Gateway</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  Connected (2.4GHz)
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                <span className="text-slate-300">HC-SR04 Transducers</span>
                <span className="text-slate-200 font-mono">9 Nominal · 1 Offline (P10)</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                <span className="text-slate-300">Telemetry Frequency</span>
                <span className="text-slate-200 font-mono">10 Hz (every 100ms)</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                <span className="text-slate-300">Average Ping Latency</span>
                <span className="text-emerald-400 font-mono">14 ms</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Historical Parking Data & Occupancy Trends */}
      <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/80 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              <h2 className="text-lg font-bold text-white">Historical Parking Data &amp; Peak Trends</h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Hourly occupancy distribution throughout standard business operation hours.
            </p>
          </div>

          {/* Timeframe switch */}
          <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
            {(['24h', '7d', '30d'] as const).map(tf => (
              <button
                key={tf}
                onClick={() => setSelectedTimeframe(tf)}
                className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                  selectedTimeframe === tf
                    ? 'bg-emerald-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>

        {/* SVG Chart visualization */}
        <div className="relative pt-6 pb-2">
          <div className="h-48 flex items-end justify-between gap-2 sm:gap-4 px-2 border-b border-slate-700">
            {hourlyData.map((d, idx) => {
              const heightPct = d.rate;
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                  {/* Tooltip on hover */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] bg-slate-900 border border-slate-700 px-2 py-0.5 rounded text-emerald-400 font-mono pointer-events-none -mb-1">
                    {d.count}/10 ({d.rate}%)
                  </div>

                  {/* Bar */}
                  <div className="w-full max-w-[42px] bg-slate-900 rounded-t-lg overflow-hidden h-40 flex items-end">
                    <div
                      className="w-full bg-gradient-to-t from-emerald-600 to-teal-400 rounded-t transition-all duration-500 group-hover:brightness-110"
                      style={{ height: `${heightPct}%` }}
                    />
                  </div>

                  {/* Time label */}
                  <span className="text-[10px] text-slate-400 font-mono mt-1">{d.time}</span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 mt-4 px-2">
            <span>Peak Utilization: <strong className="text-white">18:00 (100% Occupied)</strong></span>
            <span>Average Dwell Time: <strong className="text-white">1 hr 45 min</strong></span>
            <span>Daily Turnover: <strong className="text-white">48 Vehicles/Day</strong></span>
          </div>
        </div>
      </div>

      {/* Live Ultrasonic Sensor Telemetry Packet Stream */}
      <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/80 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg font-bold text-white">Live Telemetry Packets Log</h2>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            Last {telemetryLogs.length} events logged
          </span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/90 text-[11px] uppercase tracking-wider text-slate-400 font-mono border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-4">Time</th>
                <th className="py-2.5 px-4">Slot</th>
                <th className="py-2.5 px-4">Distance</th>
                <th className="py-2.5 px-4">Status</th>
                <th className="py-2.5 px-4">Echo Duration</th>
                <th className="py-2.5 px-4">Telemetry Source</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {telemetryLogs.slice(0, 8).map(log => (
                <tr key={log.id} className="hover:bg-slate-800/50 transition-colors">
                  <td className="py-2.5 px-4 text-slate-400">{log.timestamp}</td>
                  <td className="py-2.5 px-4 font-bold text-white">{log.slotId}</td>
                  <td className="py-2.5 px-4 font-bold text-emerald-400 tabular-nums">
                    {log.distanceCm} cm
                  </td>
                  <td className="py-2.5 px-4">
                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                      log.status === 'occupied' 
                        ? 'bg-rose-950 text-rose-300 border border-rose-800' 
                        : log.status === 'reserved'
                          ? 'bg-amber-950 text-amber-300 border border-amber-800'
                          : log.status === 'disconnected'
                            ? 'bg-slate-800 text-slate-400 border border-slate-700'
                            : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                    }`}>
                      {log.status}
                    </span>
                  </td>
                  <td className="py-2.5 px-4 text-slate-400 tabular-nums">
                    {log.echoTimeMicros} µs
                  </td>
                  <td className="py-2.5 px-4 text-slate-400">{log.source}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
