import React, { useState } from 'react';
import { useParking } from '../context/ParkingContext';
import { ParkingSlot } from '../types/parking';
import { 
  Radio, 
  Wifi, 
  WifiOff, 
  Car, 
  Sliders, 
  RotateCcw, 
  Info, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  Play, 
  Pause,
  ArrowRight,
  ShieldCheck,
  CalendarCheck
} from 'lucide-react';

export const LiveParkingGrid: React.FC = () => {
  const { 
    slots, 
    updateSlotDistance, 
    toggleSlotOccupancy, 
    toggleSensorStatus, 
    globalThreshold,
    isSimulating,
    setIsSimulating,
    resetAllSlots,
    setActiveView
  } = useParking();

  const [selectedSlot, setSelectedSlot] = useState<ParkingSlot | null>(null);
  const [filter, setFilter] = useState<'all' | 'available' | 'occupied' | 'disconnected'>('all');

  const filteredSlots = slots.filter(slot => {
    if (filter === 'available') return slot.status === 'available' || slot.status === 'reserved';
    if (filter === 'occupied') return slot.status === 'occupied';
    if (filter === 'disconnected') return slot.status === 'disconnected';
    return true;
  });

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'available':
        return {
          border: 'border-emerald-500/50 hover:border-emerald-400',
          bg: 'bg-emerald-950/20 hover:bg-emerald-950/30',
          pill: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
          text: 'text-emerald-400',
          indicator: 'bg-emerald-400 shadow-emerald-400/50 shadow-md',
          label: 'Available',
          badgeColor: 'bg-emerald-500',
        };
      case 'occupied':
        return {
          border: 'border-rose-500/50 hover:border-rose-400',
          bg: 'bg-rose-950/20 hover:bg-rose-950/30',
          pill: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
          text: 'text-rose-400',
          indicator: 'bg-rose-400 shadow-rose-400/50 shadow-md',
          label: 'Occupied',
          badgeColor: 'bg-rose-500',
        };
      case 'reserved':
        return {
          border: 'border-amber-500/50 hover:border-amber-400',
          bg: 'bg-amber-950/20 hover:bg-amber-950/30',
          pill: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
          text: 'text-amber-400',
          indicator: 'bg-amber-400 shadow-amber-400/50 shadow-md',
          label: 'Reserved',
          badgeColor: 'bg-amber-500',
        };
      case 'disconnected':
      default:
        return {
          border: 'border-slate-600/70 hover:border-slate-500',
          bg: 'bg-slate-800/40 hover:bg-slate-800/60',
          pill: 'bg-slate-700/50 text-slate-300 border-slate-600',
          text: 'text-slate-400',
          indicator: 'bg-slate-500',
          label: 'Sensor Disconnected',
          badgeColor: 'bg-slate-500',
        };
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header & Controls Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
            <Radio className="w-4 h-4 animate-pulse" />
            <span>Real-Time Ultrasonic Bay Array</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Live Parking Monitoring
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Interactive 10-slot parking facility monitored by ESP32 microcontrollers and HC-SR04 ultrasonic sensors. Click any slot to inspect or test distance simulation.
          </p>
        </div>

        {/* Global Action / Simulation Toggles */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setIsSimulating(!isSimulating)}
            className={`px-3.5 py-2 rounded-lg text-xs font-medium border flex items-center gap-2 transition-colors cursor-pointer ${
              isSimulating
                ? 'bg-slate-800 border-emerald-500/40 text-emerald-300 hover:bg-slate-700'
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {isSimulating ? <Pause className="w-3.5 h-3.5 text-emerald-400" /> : <Play className="w-3.5 h-3.5 text-slate-400" />}
            <span>{isSimulating ? 'Pause IoT Stream' : 'Resume IoT Stream'}</span>
          </button>

          <button
            onClick={resetAllSlots}
            className="px-3.5 py-2 rounded-lg text-xs font-medium bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 flex items-center gap-2 transition-colors cursor-pointer"
            title="Reset to default prompt values (P1-P10 sample data)"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            <span>Reset Demo State</span>
          </button>

          <button
            onClick={() => setActiveView('reserve')}
            className="px-4 py-2 rounded-lg text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-colors shadow-sm cursor-pointer"
          >
            Reserve a Slot
          </button>
        </div>
      </div>

      {/* Legend & Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-800/50 p-4 rounded-xl border border-slate-700/80">
        {/* Color Indicators Legend (As specified in prompt) */}
        <div className="flex flex-wrap items-center gap-4 text-xs">
          <span className="text-slate-400 font-medium">Indicators:</span>
          
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50" />
            <span className="text-slate-200">Green = Available (&gt; {globalThreshold} cm)</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500 shadow-sm shadow-rose-500/50" />
            <span className="text-slate-200">Red = Occupied (&le; {globalThreshold} cm)</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-slate-500" />
            <span className="text-slate-200">Grey = Sensor Disconnected</span>
          </div>
        </div>

        {/* Filter Segmented Control */}
        <div className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-lg border border-slate-800 self-start sm:self-auto">
          {(['all', 'available', 'occupied', 'disconnected'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors capitalize ${
                filter === f
                  ? 'bg-slate-700 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* 10 Parking Slots Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        {filteredSlots.map(slot => {
          const style = getStatusStyles(slot.status);
          const isOccupied = slot.status === 'occupied';
          const isDisconnected = slot.status === 'disconnected';

          return (
            <div
              key={slot.id}
              onClick={() => setSelectedSlot(slot)}
              className={`group relative rounded-2xl border ${style.border} ${style.bg} p-5 transition-all duration-200 cursor-pointer flex flex-col justify-between shadow-lg min-h-[300px]`}
            >
              {/* Top Slot Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-700/50">
                <div className="flex items-center gap-2.5">
                  <span className="text-xl font-bold font-mono text-white tracking-tight">
                    {slot.id}
                  </span>
                  <span className="text-[11px] text-slate-400">{slot.bayType}</span>
                </div>

                {/* Sensor LED Indicator Light */}
                <div className="flex items-center gap-1.5" title={`Hardware status: ${slot.sensorStatus}`}>
                  <span className={`w-3.5 h-3.5 rounded-full ${style.indicator}`} />
                  {isDisconnected ? (
                    <WifiOff className="w-3.5 h-3.5 text-slate-500" />
                  ) : (
                    <Wifi className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-400 transition-colors" />
                  )}
                </div>
              </div>

              {/* Parking Bay Visual Graphic (Top-Down parking slot with road markings) */}
              <div className="my-4 py-4 px-2 relative rounded-xl bg-slate-950/70 border-x-2 border-dashed border-slate-700 flex flex-col items-center justify-center min-h-[120px] overflow-hidden">
                {/* Ceiling Sensor Module Graphic */}
                <div className="absolute top-1.5 flex items-center justify-center gap-1">
                  <div className="w-8 h-2 rounded bg-slate-800 border border-slate-600 flex items-center justify-around px-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                  </div>
                  {/* Acoustic wave indicator */}
                  {!isDisconnected && (
                    <div className="absolute top-2 w-10 h-3 border-b border-dashed border-emerald-400/50 rounded-full animate-ping pointer-events-none" style={{ animationDuration: '2s' }} />
                  )}
                </div>

                {/* Parking Bay Center Content */}
                {isOccupied ? (
                  <div className="flex flex-col items-center text-center space-y-1.5 transition-transform group-hover:scale-105">
                    <div className="relative">
                      {/* Car Body Icon */}
                      <div className="w-16 h-24 rounded-lg bg-gradient-to-b from-rose-900 to-rose-950 border border-rose-500/60 p-2 shadow-lg flex flex-col justify-between items-center relative">
                        {/* Front Windshield */}
                        <div className="w-10 h-3 rounded bg-slate-900/90 border border-rose-400/40" />
                        {/* Car Roof */}
                        <Car className="w-6 h-6 text-rose-300" />
                        {/* Rear Windshield */}
                        <div className="w-10 h-2.5 rounded bg-slate-900/90 border border-rose-400/40" />
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-rose-300 tracking-wider truncate max-w-[120px]">
                      {slot.vehiclePlate || 'OCCUPIED'}
                    </span>
                  </div>
                ) : isDisconnected ? (
                  <div className="flex flex-col items-center text-slate-500 space-y-2 py-4">
                    <WifiOff className="w-8 h-8 opacity-60" />
                    <span className="text-[11px] font-medium">Sensor Offline</span>
                  </div>
                ) : slot.status === 'reserved' ? (
                  <div className="flex flex-col items-center text-amber-400 space-y-2 py-4">
                    <CalendarCheck className="w-8 h-8" />
                    <span className="text-[11px] font-medium">Reserved Bay</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center space-y-2 text-slate-500 py-6">
                    <div className="w-14 h-20 rounded border border-dashed border-emerald-500/30 flex items-center justify-center bg-emerald-500/5">
                      <span className="text-[11px] font-mono text-emerald-400/80 font-semibold">VACANT</span>
                    </div>
                  </div>
                )}

                {/* Floor distance measurement marker */}
                <div className="absolute bottom-1 text-[10px] text-slate-500 font-mono">
                  {slot.floor}
                </div>
              </div>

              {/* Bottom Slot Metrics */}
              <div className="space-y-2 pt-2 border-t border-slate-700/50">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Status</span>
                  <span className={`font-semibold capitalize ${style.text}`}>
                    {style.label}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Ultrasonic Distance</span>
                  <span className="font-mono font-bold text-white tabular-nums">
                    {isDisconnected ? 'N/A' : `${slot.distanceCm} cm`}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                  <span>Threshold: &lt;{slot.thresholdCm} cm</span>
                  <span className="font-mono">{slot.lastUpdated}</span>
                </div>
              </div>

              {/* Hover quick tip */}
              <div className="mt-3 pt-2 text-center text-[10px] text-slate-400 group-hover:text-emerald-400 transition-colors flex items-center justify-center gap-1 border-t border-slate-800">
                <span>Click to inspect &amp; test sensor</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Slot Inspection & Hardware Simulation Modal */}
      {selectedSlot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-xl rounded-2xl bg-slate-900 border border-slate-700 p-6 shadow-2xl space-y-6">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-white font-mono font-bold text-lg border border-slate-700">
                  {selectedSlot.id}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{selectedSlot.name} Ultrasonic Node</h3>
                  <p className="text-xs text-slate-400">{selectedSlot.floor} · ESP32 Sensor Pin GPIO 5/18</p>
                </div>
              </div>

              <button
                onClick={() => setSelectedSlot(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Live Interactive Distance Slider (HC-SR04 test bench) */}
            <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm font-semibold text-white">Physical Obstacle / Distance Bench</span>
                </div>
                <div className="text-right">
                  <span className="font-mono text-xl font-bold text-emerald-400 tabular-nums">
                    {selectedSlot.distanceCm} cm
                  </span>
                  <div className="text-[10px] text-slate-400 font-mono">
                    Echo: {selectedSlot.distanceCm > 0 ? Math.round((2 * selectedSlot.distanceCm) / 0.034) : 0} µs
                  </div>
                </div>
              </div>

              {/* Slider Input */}
              <div className="space-y-1.5">
                <input
                  type="range"
                  min="3"
                  max="80"
                  step="1"
                  value={selectedSlot.distanceCm || 40}
                  disabled={selectedSlot.sensorStatus === 'offline'}
                  onChange={e => {
                    const newDist = parseInt(e.target.value, 10);
                    updateSlotDistance(selectedSlot.id, newDist, 'Interactive-Test-Slider');
                    setSelectedSlot(prev => prev ? { ...prev, distanceCm: newDist } : null);
                  }}
                  className="w-full accent-emerald-400 cursor-pointer disabled:opacity-50"
                />
                <div className="flex justify-between text-[11px] font-mono text-slate-400">
                  <span>3 cm (Touching)</span>
                  <span className="text-rose-400 font-semibold">&lt;{selectedSlot.thresholdCm} cm Threshold (OCCUPIED)</span>
                  <span>80 cm (Clear)</span>
                </div>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                Dragging this slider simulates a physical vehicle entering or exiting underneath the HC-SR04 ultrasonic transducer. When distance falls below <strong>{selectedSlot.thresholdCm} cm</strong>, the status switches to OCCUPIED and the hardware Red LED turns ON.
              </p>
            </div>

            {/* Quick Hardware Actions */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  toggleSlotOccupancy(selectedSlot.id);
                  const updated = slots.find(s => s.id === selectedSlot.id);
                  if (updated) setSelectedSlot({ ...updated });
                }}
                className="py-2.5 px-4 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white border border-slate-700 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Car className="w-4 h-4 text-emerald-400" />
                <span>{selectedSlot.status === 'occupied' ? 'Vacate Vehicle' : 'Simulate Parked Car'}</span>
              </button>

              <button
                onClick={() => {
                  toggleSensorStatus(selectedSlot.id);
                  const updated = slots.find(s => s.id === selectedSlot.id);
                  if (updated) setSelectedSlot({ ...updated });
                }}
                className="py-2.5 px-4 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white border border-slate-700 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                {selectedSlot.sensorStatus === 'online' ? (
                  <>
                    <WifiOff className="w-4 h-4 text-rose-400" />
                    <span>Disconnect Sensor (Grey)</span>
                  </>
                ) : (
                  <>
                    <Wifi className="w-4 h-4 text-emerald-400" />
                    <span>Reconnect Sensor</span>
                  </>
                )}
              </button>
            </div>

            {/* Sensor Diagnostic Specs */}
            <div className="grid grid-cols-3 gap-2.5 text-center text-xs">
              <div className="p-3 rounded-lg bg-slate-800/40 border border-slate-800">
                <span className="text-slate-400 text-[10px]">CURRENT STATE</span>
                <div className="font-semibold text-white capitalize mt-0.5">{selectedSlot.status}</div>
              </div>
              <div className="p-3 rounded-lg bg-slate-800/40 border border-slate-800">
                <span className="text-slate-400 text-[10px]">WI-FI RSSI</span>
                <div className="font-semibold font-mono text-white mt-0.5">
                  {selectedSlot.sensorStatus === 'online' ? `${selectedSlot.signalRssi} dBm` : 'Offline'}
                </div>
              </div>
              <div className="p-3 rounded-lg bg-slate-800/40 border border-slate-800">
                <span className="text-slate-400 text-[10px]">BAY TYPE</span>
                <div className="font-semibold text-white mt-0.5">{selectedSlot.bayType}</div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800">
              <div className="text-xs text-slate-400">
                Node ID: <code className="font-mono text-emerald-400">ESP32_SR04_{selectedSlot.id}</code>
              </div>

              <div className="flex gap-2">
                {selectedSlot.status === 'available' && (
                  <button
                    onClick={() => {
                      setSelectedSlot(null);
                      setActiveView('reserve');
                    }}
                    className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold rounded-lg text-xs transition-colors cursor-pointer"
                  >
                    Reserve This Slot
                  </button>
                )}
                <button
                  onClick={() => setSelectedSlot(null)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
