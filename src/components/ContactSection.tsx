import React, { useState } from 'react';
import { 
  Mail, 
  MapPin, 
  Phone, 
  Send, 
  CheckCircle2, 
  HelpCircle, 
  ShieldCheck, 
  Cpu, 
  Wifi, 
  Radio 
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    facilitySize: '10-50 slots',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill out all required fields.');
      return;
    }
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        organization: '',
        facilitySize: '10-50 slots',
        message: '',
      });
    }, 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      {/* About Section Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
          <Radio className="w-4 h-4" />
          <span>About SmartPark IoT Initiative</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Next-Generation Urban Mobility with Acoustic IoT
        </h1>
        <p className="text-base text-slate-300 leading-relaxed">
          SmartPark is an intelligent IoT parking platform engineered to modernize smart city infrastructures. Utilizing low-cost, high-reliability HC-SR04 ultrasonic transducers and ESP32 microcontrollers, the system delivers millisecond-accurate bay occupancy detection without expensive ground-trenching or intrusive cabling.
        </p>
      </div>

      {/* Why Ultrasonic Sensing? Comparison Matrix */}
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-800/50 border border-slate-700/80 space-y-6">
        <div>
          <h2 className="text-xl font-bold text-white">Why Ultrasonic Over Traditional Sensors?</h2>
          <p className="text-xs text-slate-400 mt-1">
            Performance comparison of HC-SR04 ultrasonic sensors vs infrared, magnetic loop, and camera AI detectors.
          </p>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900 text-slate-300 font-mono uppercase text-[11px] border-b border-slate-800">
              <tr>
                <th className="p-3">Sensor Technology</th>
                <th className="p-3">Cost per Bay</th>
                <th className="p-3">Weather/Lighting Immunity</th>
                <th className="p-3">Installation Impact</th>
                <th className="p-3">Accuracy</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              <tr className="bg-emerald-950/20 font-medium">
                <td className="p-3 text-emerald-400 font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Ultrasonic HC-SR04 (SmartPark)</span>
                </td>
                <td className="p-3 text-emerald-300 font-mono">~$3.00 USD (Very Low)</td>
                <td className="p-3 text-emerald-300">100% immune to darkness, glare, rain</td>
                <td className="p-3 text-emerald-300">Overhead ceiling mount (Zero trenching)</td>
                <td className="p-3 text-emerald-400 font-bold font-mono">99.4% (Sub-cm ToF)</td>
              </tr>
              <tr>
                <td className="p-3 text-white font-medium">Infrared (IR) Sensors</td>
                <td className="p-3 text-slate-400 font-mono">~$2.50 USD</td>
                <td className="p-3 text-rose-400">Degraded by direct sunlight &amp; dark tires</td>
                <td className="p-3 text-slate-400">Pillar/Ceiling mount</td>
                <td className="p-3 text-slate-400 font-mono">82% - 88%</td>
              </tr>
              <tr>
                <td className="p-3 text-white font-medium">Inductive Magnetic Loops</td>
                <td className="p-3 text-slate-400 font-mono">~$180 USD (High)</td>
                <td className="p-3 text-slate-400">High immunity</td>
                <td className="p-3 text-rose-400">Destructive asphalt saw-cutting</td>
                <td className="p-3 text-slate-400 font-mono">95%</td>
              </tr>
              <tr>
                <td className="p-3 text-white font-medium">Overhead Computer Vision / AI</td>
                <td className="p-3 text-slate-400 font-mono">~$250+ USD/camera</td>
                <td className="p-3 text-rose-400">Fails in smoke, steam, headlights</td>
                <td className="p-3 text-slate-400">High bandwidth PoE cabling required</td>
                <td className="p-3 text-slate-400 font-mono">92% - 96%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-5 rounded-xl bg-slate-800/40 border border-slate-700/80 space-y-2">
            <h3 className="font-semibold text-white flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>How does distance determine vehicle presence?</span>
            </h3>
            <p className="text-slate-300 leading-relaxed">
              When a parking bay is empty, the ultrasonic waves travel to the concrete floor (~200cm - 250cm or demo bench 40cm-60cm). When a vehicle drives in, sound bounces off the car roof or hood at &lt; 20 cm, instantly flipping the state to OCCUPIED.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-800/40 border border-slate-700/80 space-y-2">
            <h3 className="font-semibold text-white flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Can this system scale to 500+ parking slots?</span>
            </h3>
            <p className="text-slate-300 leading-relaxed">
              Yes. By organizing microcontrollers into multiplexed nodes (e.g. 1 ESP32 controlling 4 to 8 slots via MCP23017 I2C multiplexers or daisy-chained bus), large commercial garages can scale to thousands of bays seamlessly.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-800/40 border border-slate-700/80 space-y-2">
            <h3 className="font-semibold text-white flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>What happens if Wi-Fi temporarily drops?</span>
            </h3>
            <p className="text-slate-300 leading-relaxed">
              The local ESP32 executes edge detection independently. Even without internet, the physical Red and Green LEDs continue indicating bay status to drivers, queuing telemetry packets locally until reconnection.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-800/40 border border-slate-700/80 space-y-2">
            <h3 className="font-semibold text-white flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Is calibration required for SUVs vs Compact Cars?</span>
            </h3>
            <p className="text-slate-300 leading-relaxed">
              The admin dashboard includes an interactive threshold calibration slider (10cm - 40cm). A 20cm default comfortably detects low sedans, high SUVs, and compact hatchbacks without false positives.
            </p>
          </div>
        </div>
      </div>

      {/* Contact & Deployment Inquiry Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Info Card */}
        <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-slate-800/60 border border-slate-700/80 space-y-6">
          <div>
            <h2 className="text-xl font-bold text-white">SmartPark IoT Systems Lab</h2>
            <p className="text-xs text-slate-400 mt-1">
              Contact our engineering team for commercial hardware kits, microcontroller firmware licenses, or pilot deployments.
            </p>
          </div>

          <div className="space-y-4 text-xs text-slate-300">
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Smart Mobility Innovation Tower, Tech Park Road, Bengaluru, Karnataka 560100</span>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="font-mono">support@smartpark-iot.tech</span>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="font-mono">+91 (80) 4920-8800 / Toll Free: 1800-SMARTPARK</span>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-700/50 space-y-2 text-xs text-slate-400">
            <span className="font-semibold text-white block">Enterprise Deployment Features:</span>
            <ul className="list-disc list-inside space-y-1 text-slate-300">
              <li>Turnkey ESP32 pre-flashed hardware kits</li>
              <li>LoRaWAN &amp; NB-IoT long-range gateway support</li>
              <li>Custom mobile apps for iOS and Android</li>
              <li>Automated barrier gate &amp; ANPR camera sync</li>
            </ul>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-slate-800/40 border border-slate-700/80 space-y-6">
          <div>
            <h2 className="text-xl font-bold text-white">Send Us a Message</h2>
            <p className="text-xs text-slate-400 mt-1">
              Have questions about wiring ESP32 boards, threshold calibration, or multi-slot facilities? Drop us a line.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 text-center rounded-xl bg-emerald-950/60 border border-emerald-500/50 space-y-3 animate-fade-in">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
              <h3 className="text-base font-bold text-white">Message Received!</h3>
              <p className="text-xs text-slate-300 max-w-sm mx-auto">
                Thank you for reaching out. A SmartPark hardware engineer will reply to <strong>{formData.email}</strong> within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 mb-1 font-medium">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Anand Sharma"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg p-2.5 text-xs focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-medium">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. anand@university.edu"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg p-2.5 text-xs focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 mb-1 font-medium">Organization / University</label>
                  <input
                    type="text"
                    placeholder="e.g. IIT Delhi / Municipal Corp"
                    value={formData.organization}
                    onChange={e => setFormData({ ...formData, organization: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg p-2.5 text-xs focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-medium">Facility Size</label>
                  <select
                    value={formData.facilitySize}
                    onChange={e => setFormData({ ...formData, facilitySize: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg p-2.5 text-xs"
                  >
                    <option value="10-50 slots">10 - 50 slots (Prototyping)</option>
                    <option value="50-200 slots">50 - 200 slots (Commercial Lot)</option>
                    <option value="200-1000 slots">200 - 1000 slots (Mall / Airport)</option>
                    <option value="Research & Academic">Academic / Capstone Project</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-medium">Your Message / Hardware Question *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tell us about your smart parking project or questions regarding HC-SR04 pinout, MQTT integration, or calibration..."
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg p-2.5 text-xs focus:outline-none focus:border-emerald-400"
                />
              </div>

              <button
                type="submit"
                className="py-3 px-6 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Inquiry</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
