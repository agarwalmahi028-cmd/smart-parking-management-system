import React, { useState } from 'react';
import { 
  Layers, 
  Cpu, 
  Radio, 
  Wifi, 
  Server, 
  Monitor, 
  ArrowDown, 
  CheckCircle2, 
  Database,
  ArrowRight
} from 'lucide-react';

export const SystemArchitecture: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<number>(1);

  const layers = [
    {
      id: 1,
      title: 'Layer 1: Physical Sensing & Indicator Layer',
      subtitle: 'HC-SR04 Transducers + Dual LEDs (Ceiling Mounted)',
      icon: Radio,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10 border-emerald-500/30',
      details: [
        'HC-SR04 Ultrasonic Distance Sensor positioned overhead per parking bay',
        'Transmits 40 kHz acoustic burst on receiving 10µs pulse from microcontroller',
        'Dual 5mm ultra-bright LEDs (Green = Vacant, Red = Occupied) for visual guidance',
        'Operational range: 2 cm to 400 cm with non-contact acoustic reflection',
      ],
      techSpecs: 'Frequency: 40 kHz | Beam Angle: 15° | Supply: 5V DC | Accuracy: 0.3 cm',
    },
    {
      id: 2,
      title: 'Layer 2: Embedded Edge Processing Layer',
      subtitle: 'ESP32 / Arduino Uno Edge Microcontroller',
      icon: Cpu,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10 border-blue-500/30',
      details: [
        'Calculates sound Time of Flight (ToF): duration = pulseIn(ECHO, HIGH)',
        'Computes precise distance: Distance (cm) = (duration × 0.0343) / 2',
        'Evaluates distance against configurable threshold (< 20 cm = Occupied)',
        'Immediate local hardware GPIO feedback to Red/Green LEDs (zero latency)',
      ],
      techSpecs: 'Clock: 240 MHz Dual-Core | GPIO: 3.3V Logic | SRAM: 520 KB',
    },
    {
      id: 3,
      title: 'Layer 3: IoT Communication & Network Layer',
      subtitle: '2.4 GHz Wi-Fi / HTTP REST & JSON Payloads',
      icon: Wifi,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10 border-purple-500/30',
      details: [
        'Transmits telemetry packets over standard 802.11 b/g/n Wi-Fi networks',
        'Packages structured JSON payloads containing slot ID, distance, status, RSSI',
        'Transfers data via HTTP POST /api/sensors/update or lightweight MQTT broker',
        'Heartbeat monitoring detects dropped nodes and flags sensor disconnects',
      ],
      techSpecs: 'Protocol: HTTP/1.1 REST & MQTT | Security: WPA2/WPA3 | Payload: JSON (< 128 bytes)',
    },
    {
      id: 4,
      title: 'Layer 4: Cloud & Real-Time Engine Layer',
      subtitle: 'SmartPark Processing Core & Persistence',
      icon: Server,
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10 border-amber-500/30',
      details: [
        'Ingests streaming sensor packets, validates CRC and authenticates nodes',
        'Maintains reactive in-memory state registry for all 10 parking slots',
        'Calculates real-time KPIs: Available, Occupied, Occupancy Rate, Averages',
        'Enforces global and per-slot threshold calibrations dynamically',
      ],
      techSpecs: 'Architecture: Reactive Event-Driven | Latency: < 50ms | Memory: High-throughput Cache',
    },
    {
      id: 5,
      title: 'Layer 5: Presentation & User Application Layer',
      subtitle: 'Driver Portal, Admin Dashboard & Booking Gateway',
      icon: Monitor,
      color: 'text-teal-400',
      bgColor: 'bg-teal-500/10 border-teal-500/30',
      details: [
        'Interactive 10-slot 2D parking facility map with color-coded bay indicators',
        'Administrator analytics: occupancy rate, historical charts, sensor RSSI, CSV export',
        'Driver reservation engine: search vacant bays, instant slot reservation, PIN pass',
        'Hardware laboratory: interactive sound wave simulator and Arduino C++ code',
      ],
      techSpecs: 'Framework: React 19 + TypeScript + Tailwind CSS | Responsive: Mobile, Tablet, Desktop',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
          <Layers className="w-4 h-4" />
          <span>Technical Architecture</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          System Architecture Diagram
        </h1>
        <p className="text-sm text-slate-400 mt-1 max-w-3xl">
          Visual multi-tier overview illustrating the end-to-end data pipeline from physical sound waves to cloud telemetry and interactive interfaces.
        </p>
      </div>

      {/* Visual Layer Stack Diagram */}
      <div className="space-y-4">
        {layers.map((layer, index) => {
          const Icon = layer.icon;
          const isSelected = activeLayer === layer.id;

          return (
            <React.Fragment key={layer.id}>
              <div
                onClick={() => setActiveLayer(layer.id)}
                className={`p-6 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? `${layer.bgColor} shadow-xl scale-[1.01]`
                    : 'bg-slate-800/40 border-slate-700/80 hover:bg-slate-800/70 hover:border-slate-600'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${layer.bgColor}`}>
                      <Icon className={`w-6 h-6 ${layer.color}`} />
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-semibold uppercase text-slate-400">
                          Tier 0{layer.id}
                        </span>
                        <span className="text-slate-600">·</span>
                        <h3 className="text-lg font-bold text-white">{layer.title}</h3>
                      </div>
                      <p className="text-sm text-slate-300 mt-0.5">{layer.subtitle}</p>
                    </div>
                  </div>

                  <div className="text-xs font-mono text-slate-400 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800 self-start md:self-auto">
                    {layer.techSpecs}
                  </div>
                </div>

                {/* Expanded Details */}
                <div className="mt-4 pt-4 border-t border-slate-700/50 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-300">
                  {layer.details.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className={`w-4 h-4 ${layer.color} shrink-0 mt-0.5`} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Data Flow Connector Arrow between layers */}
              {index < layers.length - 1 && (
                <div className="flex justify-center items-center py-1">
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
                    <ArrowDown className="w-3.5 h-3.5 text-emerald-400 animate-bounce" />
                    <span>
                      {index === 0 && 'Echo Time Microseconds (t)'}
                      {index === 1 && 'GPIO Distance (cm) & Threshold Logic'}
                      {index === 2 && 'Wi-Fi HTTP JSON Telemetry Packets'}
                      {index === 3 && 'Real-Time State Broadcast'}
                    </span>
                  </div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* End-to-End Data Packet Flow Section */}
      <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/80 space-y-6">
        <h2 className="text-lg font-bold text-white">End-to-End Ultrasonic Data Flow</h2>
        <p className="text-sm text-slate-400">
          The 6-stage lifecycle of every ultrasonic distance reading in the SmartPark ecosystem:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
          {[
            { step: '01', title: 'Sonic Burst', desc: 'HC-SR04 emits 8-cycle 40kHz acoustic burst' },
            { step: '02', title: 'Echo Bounce', desc: 'Sound bounces off vehicle back to receiver' },
            { step: '03', title: 'ESP32 ToF', desc: 'pulseIn() measures microseconds duration' },
            { step: '04', title: 'LED Toggle', desc: 'Local Red/Green hardware LED responds' },
            { step: '05', title: 'Wi-Fi POST', desc: 'ESP32 transmits JSON packet over 2.4GHz' },
            { step: '06', title: 'Live UI', desc: 'Web dashboard updates instantaneously' },
          ].map((s, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center space-y-2">
              <span className="text-xs font-mono font-bold text-emerald-400">{s.step}</span>
              <h4 className="text-xs font-bold text-white">{s.title}</h4>
              <p className="text-[11px] text-slate-400 leading-snug">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
