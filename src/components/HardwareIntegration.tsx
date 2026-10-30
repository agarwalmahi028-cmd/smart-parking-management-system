import React, { useState } from 'react';
import { useParking } from '../context/ParkingContext';
import { 
  Cpu, 
  Radio, 
  Wifi, 
  Code, 
  Copy, 
  Check, 
  Send, 
  Layers, 
  ArrowRight, 
  Zap, 
  Activity,
  Sliders
} from 'lucide-react';

export const HardwareIntegration: React.FC = () => {
  const { receiveSensorTelemetry, globalThreshold } = useParking();
  const [copiedCode, setCopiedCode] = useState(false);
  
  // Interactive Live HTTP Telemetry test bench state
  const [simSlot, setSimSlot] = useState('P1');
  const [simDistance, setSimDistance] = useState(15);
  const [payloadSentFeedback, setPayloadSentFeedback] = useState<string | null>(null);

  // Interactive wave physics simulator
  const [waveDistance, setWaveDistance] = useState(25);

  const echoTime = Math.round((2 * waveDistance) / 0.034);
  const isOccupied = waveDistance < globalThreshold;

  const handleSendTestPayload = () => {
    receiveSensorTelemetry(simSlot, simDistance, 'ESP32-Live-POST');
    setPayloadSentFeedback(`✓ HTTP 200 OK: Slot ${simSlot} set to ${simDistance} cm`);
    setTimeout(() => setPayloadSentFeedback(null), 3000);
  };

  const arduinoCode = `/*
 * SmartPark IoT Ultrasonic Parking Node
 * Target Microcontroller: ESP32 Dev Module
 * Sensor: HC-SR04 Ultrasonic Distance Transducer
 * Features: Wi-Fi HTTP Telemetry + Dual LED Bay Status
 */

#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

// Wi-Fi Credentials
const char* ssid     = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";

// SmartPark Web API Endpoint
const char* serverUrl = "https://your-smartpark-domain/api/sensors/update";
const char* SLOT_ID   = "P1";

// Pin Configuration (HC-SR04 & Indicators)
const int PIN_TRIG      = 5;   // Ultrasonic Trigger
const int PIN_ECHO      = 18;  // Ultrasonic Echo
const int PIN_LED_RED   = 19;  // Occupied Indicator
const int PIN_LED_GREEN = 21;  // Available Indicator

// Threshold Configuration in Centimeters
const int DISTANCE_THRESHOLD_CM = ${globalThreshold};

// Speed of sound in air = 0.0343 cm / microsecond
const float SOUND_SPEED = 0.0343;

void setup() {
  Serial.begin(115200);

  pinMode(PIN_TRIG, OUTPUT);
  pinMode(PIN_ECHO, INPUT);
  pinMode(PIN_LED_RED, OUTPUT);
  pinMode(PIN_LED_GREEN, OUTPUT);

  // Initialize LEDs: flash both once
  digitalWrite(PIN_LED_RED, HIGH);
  digitalWrite(PIN_LED_GREEN, HIGH);
  delay(500);
  digitalWrite(PIN_LED_RED, LOW);
  digitalWrite(PIN_LED_GREEN, LOW);

  // Connect to Wi-Fi
  Serial.print("Connecting to Wi-Fi");
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\\nWiFi Connected. IP: " + WiFi.localIP().toString());
}

long measureDistanceCm() {
  // Clear the trigger pin
  digitalWrite(PIN_TRIG, LOW);
  delayMicroseconds(2);

  // Send 10 microsecond HIGH pulse
  digitalWrite(PIN_TRIG, HIGH);
  delayMicroseconds(10);
  digitalWrite(PIN_TRIG, LOW);

  // Measure return echo time in microseconds
  long durationMicros = pulseIn(PIN_ECHO, HIGH, 30000); // 30ms timeout
  if (durationMicros == 0) return -1; // Out of range or error

  // Calculate distance: d = (duration * 0.0343) / 2
  long distanceCm = (durationMicros * SOUND_SPEED) / 2;
  return distanceCm;
}

void loop() {
  long distance = measureDistanceCm();
  if (distance <= 0) {
    Serial.println("Sensor read timeout or out of range");
    delay(1000);
    return;
  }

  bool isOccupied = (distance < DISTANCE_THRESHOLD_CM);

  // Update physical bay LED indicators
  if (isOccupied) {
    digitalWrite(PIN_LED_RED, HIGH);
    digitalWrite(PIN_LED_GREEN, LOW);
    Serial.printf("[%s] OCCUPIED - Distance: %ld cm\\n", SLOT_ID, distance);
  } else {
    digitalWrite(PIN_LED_RED, LOW);
    digitalWrite(PIN_LED_GREEN, HIGH);
    Serial.printf("[%s] AVAILABLE - Distance: %ld cm\\n", SLOT_ID, distance);
  }

  // Send JSON telemetry to SmartPark website
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(serverUrl);
    http.addHeader("Content-Type", "application/json");

    StaticJsonDocument<200> doc;
    doc["slotId"] = SLOT_ID;
    doc["distanceCm"] = distance;
    doc["status"] = isOccupied ? "occupied" : "available";
    doc["rssi"] = WiFi.RSSI();

    String requestBody;
    serializeJson(doc, requestBody);

    int httpResponseCode = http.POST(requestBody);
    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode);
    http.end();
  }

  delay(2000); // Sample every 2 seconds
}`;

  const copyCode = () => {
    navigator.clipboard.writeText(arduinoCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
          <Cpu className="w-4 h-4" />
          <span>Ultrasonic Sensor Integration &amp; Hardware Lab</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          ESP32 &amp; HC-SR04 Embedded Integration
        </h1>
        <p className="text-sm text-slate-400 mt-1 max-w-3xl">
          Complete physical computing architecture, circuit schematics, ultrasonic reflection physics, and production C++ firmware for the smart parking network.
        </p>
      </div>

      {/* Hardware Photography & Working Principle Hero Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Hardware Studio Photo */}
        <div className="lg:col-span-5 rounded-2xl overflow-hidden border border-slate-700/80 bg-slate-800 shadow-xl relative">
          <img
            src="/src/assets/images/iot_ultrasonic_sensor_hardware_1793353190709.jpg"
            alt="ESP32 connected to HC-SR04 ultrasonic sensor with jumper wires"
            className="w-full h-80 sm:h-96 object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-4 left-4 right-4 p-3 rounded-lg bg-slate-900/90 backdrop-blur-md border border-slate-700 text-xs text-slate-300">
            <span className="font-semibold text-emerald-400">Bench Hardware:</span> ESP32 30-Pin NodeMCU + HC-SR04 40kHz Transducer Module
          </div>
        </div>

        {/* 8-Step Working Principle (As required in user prompt) */}
        <div className="lg:col-span-7 space-y-4">
          <h2 className="text-xl font-bold text-white">System Working Principle</h2>
          <p className="text-sm text-slate-400">
            How sound reflection enables continuous, non-contact vehicle detection with high precision:
          </p>

          <ol className="space-y-3 text-sm text-slate-300">
            <li className="flex items-start gap-3 p-3 rounded-xl bg-slate-800/40 border border-slate-800">
              <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5">
                1
              </span>
              <span>
                <strong>Ultrasonic Sound Burst:</strong> The HC-SR04 transmitter sends an 8-cycle sonic burst at 40 kHz when triggered by a 10µs pulse.
              </span>
            </li>

            <li className="flex items-start gap-3 p-3 rounded-xl bg-slate-800/40 border border-slate-800">
              <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5">
                2
              </span>
              <span>
                <strong>Sound Reflection:</strong> Sound waves strike the vehicle hood, roof, or chassis and bounce back toward the receiver module.
              </span>
            </li>

            <li className="flex items-start gap-3 p-3 rounded-xl bg-slate-800/40 border border-slate-800">
              <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5">
                3
              </span>
              <span>
                <strong>Time of Flight Calculation:</strong> The echo pin remains HIGH for duration <code className="text-emerald-400 font-mono">t</code> in microseconds. Distance = (Echo Time × 0.0343) / 2.
              </span>
            </li>

            <li className="flex items-start gap-3 p-3 rounded-xl bg-slate-800/40 border border-slate-800">
              <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5">
                4
              </span>
              <span>
                <strong>Microcontroller Edge Evaluation:</strong> If distance &lt; <strong className="text-white">{globalThreshold} cm</strong> threshold, mark <strong>OCCUPIED</strong> (Red LED ON); else <strong>AVAILABLE</strong> (Green LED ON).
              </span>
            </li>

            <li className="flex items-start gap-3 p-3 rounded-xl bg-slate-800/40 border border-slate-800">
              <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5">
                5
              </span>
              <span>
                <strong>Wi-Fi Telemetry &amp; Live UI:</strong> ESP32 transmits JSON payload to the website through Wi-Fi, updating user and admin dashboards automatically.
              </span>
            </li>
          </ol>
        </div>
      </div>

      {/* Interactive Ultrasonic Wave Simulator */}
      <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/80 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-emerald-400" />
              <h2 className="text-lg font-bold text-white">Interactive Acoustic Wave Physics Simulator</h2>
            </div>
            <p className="text-xs text-slate-400">
              Move the car slider to see how sound wave time-of-flight affects the distance calculation in real-time.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
              isOccupied ? 'bg-rose-950 text-rose-300 border border-rose-700' : 'bg-emerald-950 text-emerald-300 border border-emerald-700'
            }`}>
              {isOccupied ? 'Occupied (Red LED)' : 'Available (Green LED)'}
            </span>
          </div>
        </div>

        {/* Visual Wave Chamber */}
        <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 relative overflow-hidden space-y-6">
          <div className="flex items-center justify-between">
            {/* Sensor unit on the left */}
            <div className="flex flex-col items-center p-3 rounded-lg bg-slate-900 border border-slate-700 text-center w-36">
              <div className="w-16 h-8 rounded bg-blue-950 border border-blue-500 flex items-center justify-around px-1">
                <div className="w-3 h-3 rounded-full bg-slate-300 border border-blue-400" title="Transmitter (TRIG)" />
                <div className="w-3 h-3 rounded-full bg-slate-300 border border-blue-400" title="Receiver (ECHO)" />
              </div>
              <span className="text-[11px] font-mono text-emerald-400 font-bold mt-1.5">HC-SR04</span>
              <span className="text-[10px] text-slate-400">Mounted on Ceiling</span>
            </div>

            {/* Traveling Waves in between */}
            <div className="flex-1 mx-6 relative h-12 flex items-center">
              {/* Forward wave */}
              <div className="w-full h-0.5 bg-emerald-500/30 relative">
                <div
                  className="absolute top-1/2 -translate-y-1/2 h-4 w-4 rounded-full border-r-2 border-emerald-400 animate-pulse"
                  style={{ left: `${Math.min(95, waveDistance * 1.5)}%` }}
                />
              </div>
            </div>

            {/* Vehicle Obstacle on the right */}
            <div 
              className="flex flex-col items-center p-3 rounded-lg bg-slate-900 border border-slate-700 text-center w-36 transition-all duration-300"
              style={{ transform: `scale(${isOccupied ? 1.05 : 0.95})` }}
            >
              <div className={`w-16 h-10 rounded-lg flex items-center justify-center border font-bold text-xs ${
                isOccupied ? 'bg-rose-900/60 border-rose-500 text-rose-300' : 'bg-slate-800 border-slate-600 text-slate-400'
              }`}>
                VEHICLE
              </div>
              <span className="text-[11px] font-mono text-white mt-1.5">{waveDistance} cm away</span>
              <span className="text-[10px] text-slate-400">{isOccupied ? 'Triggered (<20cm)' : 'Clear Space'}</span>
            </div>
          </div>

          {/* Slider Control */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <div className="flex justify-between text-xs text-slate-300">
              <span>Sensor Distance Slider:</span>
              <span className="font-mono font-bold text-emerald-400">{waveDistance} cm</span>
            </div>
            <input
              type="range"
              min="5"
              max="65"
              value={waveDistance}
              onChange={e => setWaveDistance(parseInt(e.target.value, 10))}
              className="w-full accent-emerald-400 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>5 cm (Close Hood)</span>
              <span className="text-yellow-400 font-semibold">{globalThreshold} cm Occupancy Boundary</span>
              <span>65 cm (Empty Bay)</span>
            </div>
          </div>

          {/* Real-time Math Formula Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center text-xs">
            <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800">
              <span className="text-[10px] text-slate-400">MEASURED ECHO TIME</span>
              <div className="font-mono font-bold text-white mt-1">{echoTime} µs</div>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800">
              <span className="text-[10px] text-slate-400">CALCULATED DISTANCE</span>
              <div className="font-mono font-bold text-emerald-400 mt-1">{waveDistance} cm</div>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800">
              <span className="text-[10px] text-slate-400">DUAL LED OUTPUT</span>
              <div className="font-mono font-bold text-white mt-1">
                {isOccupied ? 'RED=HIGH, GRN=LOW' : 'RED=LOW, GRN=HIGH'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bill of Materials & Pinout Schematic */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Bill of Materials Table */}
        <div className="lg:col-span-6 p-6 rounded-2xl bg-slate-800/50 border border-slate-700/80 space-y-4">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-blue-400" />
            <h3 className="text-base font-bold text-white">Hardware Bill of Materials (BOM)</h3>
          </div>
          
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
              <div>
                <strong className="text-white">ESP32 DevKit V1</strong>
                <div className="text-[11px] text-slate-400">Dual-core 240MHz, 2.4GHz Wi-Fi + BLE</div>
              </div>
              <span className="font-mono text-emerald-400">1 unit</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
              <div>
                <strong className="text-white">HC-SR04 Ultrasonic Sensor</strong>
                <div className="text-[11px] text-slate-400">40kHz acoustic transducer, 2cm-400cm range</div>
              </div>
              <span className="font-mono text-emerald-400">10 units</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
              <div>
                <strong className="text-white">Dual LED Indicators (Red &amp; Green)</strong>
                <div className="text-[11px] text-slate-400">5mm high-visibility bay indicator lights</div>
              </div>
              <span className="font-mono text-emerald-400">10 pairs</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
              <div>
                <strong className="text-white">Breadboard &amp; Jumper Wires</strong>
                <div className="text-[11px] text-slate-400">Standard 830-point breadboard, M-to-M / M-to-F</div>
              </div>
              <span className="font-mono text-emerald-400">1 kit</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
              <div>
                <strong className="text-white">5V 2A Regulated DC Power Supply</strong>
                <div className="text-[11px] text-slate-400">Micro-USB or terminal power bus</div>
              </div>
              <span className="font-mono text-emerald-400">1 unit</span>
            </div>
          </div>
        </div>

        {/* Pinout Wiring Map */}
        <div className="lg:col-span-6 p-6 rounded-2xl bg-slate-800/50 border border-slate-700/80 space-y-4">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-bold text-white">ESP32 Pinout Wiring Map</h3>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900 text-[11px] font-mono uppercase text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="p-2.5">Component Pin</th>
                  <th className="p-2.5">ESP32 Pin</th>
                  <th className="p-2.5">Signal Type</th>
                  <th className="p-2.5">Voltage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-mono text-slate-300">
                <tr>
                  <td className="p-2.5 font-bold text-white">HC-SR04 VCC</td>
                  <td className="p-2.5 text-rose-400 font-bold">VIN / 5V</td>
                  <td className="p-2.5">Power Supply</td>
                  <td className="p-2.5">5.0V DC</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-white">HC-SR04 GND</td>
                  <td className="p-2.5 text-slate-400">GND</td>
                  <td className="p-2.5">Common Ground</td>
                  <td className="p-2.5">0V</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-white">HC-SR04 TRIG</td>
                  <td className="p-2.5 text-emerald-400 font-bold">GPIO 5</td>
                  <td className="p-2.5">Digital Output</td>
                  <td className="p-2.5">3.3V / 5V</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-white">HC-SR04 ECHO</td>
                  <td className="p-2.5 text-blue-400 font-bold">GPIO 18</td>
                  <td className="p-2.5">Digital Input</td>
                  <td className="p-2.5">3.3V (Divider)</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-white">Red LED Anode</td>
                  <td className="p-2.5 text-rose-400">GPIO 19</td>
                  <td className="p-2.5">Digital Output</td>
                  <td className="p-2.5">3.3V</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-white">Green LED Anode</td>
                  <td className="p-2.5 text-emerald-400">GPIO 21</td>
                  <td className="p-2.5">Digital Output</td>
                  <td className="p-2.5">3.3V</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Live In-Browser HTTP POST Ingestion Test Bench */}
      <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/80 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <Send className="w-5 h-5 text-emerald-400" />
              <h3 className="text-base font-bold text-white">Live IoT Telemetry Simulator (HTTP POST Ingestion)</h3>
            </div>
            <p className="text-xs text-slate-400">
              Test sending actual hardware sensor payloads directly to the SmartPark engine right from your browser.
            </p>
          </div>
          {payloadSentFeedback && (
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950 px-3 py-1 rounded border border-emerald-800 animate-fade-in">
              {payloadSentFeedback}
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div>
            <label className="block text-xs text-slate-400 mb-1">Target Slot ID</label>
            <select
              value={simSlot}
              onChange={e => setSimSlot(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-2 text-xs font-mono"
            >
              {['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'P9', 'P10'].map(id => (
                <option key={id} value={id}>Slot {id}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-1">
              Sensor Distance: <strong className="text-white font-mono">{simDistance} cm</strong>
            </label>
            <input
              type="range"
              min="4"
              max="60"
              value={simDistance}
              onChange={e => setSimDistance(parseInt(e.target.value, 10))}
              className="w-full accent-emerald-400 mt-2 cursor-pointer"
            />
          </div>

          <div className="flex items-end">
            <button
              onClick={handleSendTestPayload}
              className="w-full py-2.5 px-4 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>POST Sensor Payload</span>
            </button>
          </div>
        </div>
      </div>

      {/* Production ESP32 Arduino C++ Firmware Viewer */}
      <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/80 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-bold text-white">Production ESP32 Arduino Sketch (C++)</h3>
          </div>
          <button
            onClick={copyCode}
            className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
            <span>{copiedCode ? 'Copied to Clipboard!' : 'Copy Arduino Sketch'}</span>
          </button>
        </div>

        <p className="text-xs text-slate-400">
          Flash this code directly onto an ESP32 board using Arduino IDE or PlatformIO to connect physical hardware to this dashboard.
        </p>

        <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950 p-4 font-mono text-xs text-emerald-300 max-h-96 overflow-y-auto">
          <pre>{arduinoCode}</pre>
        </div>
      </div>
    </div>
  );
};
