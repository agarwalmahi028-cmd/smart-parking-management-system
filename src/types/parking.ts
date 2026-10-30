export type SlotStatus = 'available' | 'occupied' | 'reserved' | 'disconnected';

export type BayType = 'Standard' | 'EV Charging' | 'Accessible' | 'Compact';

export interface ParkingSlot {
  id: string; // "P1", "P2", ... "P10"
  name: string;
  floor: string;
  distanceCm: number;
  thresholdCm: number;
  status: SlotStatus;
  sensorStatus: 'online' | 'offline' | 'calibrating';
  lastUpdated: string;
  bayType: BayType;
  signalRssi: number; // in dBm, e.g. -64
  vehiclePlate?: string;
  vehicleModel?: string;
  parkedSince?: string;
  isReserved?: boolean;
  reservedBy?: {
    driverName: string;
    licensePlate: string;
    expiresAt: string;
  };
}

export interface Booking {
  id: string;
  slotId: string;
  driverName: string;
  phone: string;
  licensePlate: string;
  vehicleType: string;
  startTime: string;
  durationHours: number;
  status: 'active' | 'completed' | 'cancelled';
  cost: number;
  pinCode: string;
}

export interface TelemetryLog {
  id: string;
  timestamp: string;
  slotId: string;
  distanceCm: number;
  status: SlotStatus;
  echoTimeMicros: number;
  source: string;
}

export interface SystemStats {
  totalSlots: number;
  availableSlots: number;
  occupiedSlots: number;
  reservedSlots: number;
  disconnectedSlots: number;
  occupancyRate: number;
  avgDistanceCm: number;
}
