import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { ParkingSlot, Booking, TelemetryLog, SystemStats } from '../types/parking';

interface ParkingContextType {
  slots: ParkingSlot[];
  bookings: Booking[];
  telemetryLogs: TelemetryLog[];
  globalThreshold: number;
  isSimulating: boolean;
  activeView: string;
  stats: SystemStats;
  setActiveView: (view: string) => void;
  setIsSimulating: (sim: boolean) => void;
  setGlobalThreshold: (threshold: number) => void;
  updateSlotDistance: (slotId: string, distanceCm: number, source?: string) => void;
  toggleSlotOccupancy: (slotId: string) => void;
  toggleSensorStatus: (slotId: string) => void;
  createBooking: (booking: Omit<Booking, 'id' | 'status' | 'pinCode'>) => { success: boolean; message: string; booking?: Booking };
  cancelBooking: (bookingId: string) => void;
  receiveSensorTelemetry: (slotId: string, distanceCm: number, source?: string) => void;
  resetAllSlots: () => void;
  simulateRushHour: () => void;
  simulateMorningEmpty: () => void;
}

const DEFAULT_THRESHOLD = 20; // in cm: < 20cm means car is parked right underneath the ultrasonic sensor

const INITIAL_SLOTS: ParkingSlot[] = [
  {
    id: 'P1',
    name: 'Slot P1',
    floor: 'Level 1 - Zone A',
    distanceCm: 45,
    thresholdCm: DEFAULT_THRESHOLD,
    status: 'available',
    sensorStatus: 'online',
    lastUpdated: new Date().toLocaleTimeString(),
    bayType: 'Standard',
    signalRssi: -62,
  },
  {
    id: 'P2',
    name: 'Slot P2',
    floor: 'Level 1 - Zone A',
    distanceCm: 8,
    thresholdCm: DEFAULT_THRESHOLD,
    status: 'occupied',
    sensorStatus: 'online',
    lastUpdated: new Date().toLocaleTimeString(),
    bayType: 'EV Charging',
    signalRssi: -58,
    vehiclePlate: 'KA-05-MM-2024',
    vehicleModel: 'Tesla Model 3',
    parkedSince: '10:15 AM',
  },
  {
    id: 'P3',
    name: 'Slot P3',
    floor: 'Level 1 - Zone A',
    distanceCm: 52,
    thresholdCm: DEFAULT_THRESHOLD,
    status: 'available',
    sensorStatus: 'online',
    lastUpdated: new Date().toLocaleTimeString(),
    bayType: 'Standard',
    signalRssi: -65,
  },
  {
    id: 'P4',
    name: 'Slot P4',
    floor: 'Level 1 - Zone A',
    distanceCm: 6,
    thresholdCm: DEFAULT_THRESHOLD,
    status: 'occupied',
    sensorStatus: 'online',
    lastUpdated: new Date().toLocaleTimeString(),
    bayType: 'Standard',
    signalRssi: -60,
    vehiclePlate: 'MH-12-AB-9876',
    vehicleModel: 'Honda Civic',
    parkedSince: '09:40 AM',
  },
  {
    id: 'P5',
    name: 'Slot P5',
    floor: 'Level 1 - Zone B',
    distanceCm: 60,
    thresholdCm: DEFAULT_THRESHOLD,
    status: 'available',
    sensorStatus: 'online',
    lastUpdated: new Date().toLocaleTimeString(),
    bayType: 'Accessible',
    signalRssi: -68,
  },
  {
    id: 'P6',
    name: 'Slot P6',
    floor: 'Level 1 - Zone B',
    distanceCm: 12,
    thresholdCm: DEFAULT_THRESHOLD,
    status: 'occupied',
    sensorStatus: 'online',
    lastUpdated: new Date().toLocaleTimeString(),
    bayType: 'Standard',
    signalRssi: -64,
    vehiclePlate: 'DL-01-CZ-4521',
    vehicleModel: 'Toyota RAV4',
    parkedSince: '11:05 AM',
  },
  {
    id: 'P7',
    name: 'Slot P7',
    floor: 'Level 1 - Zone B',
    distanceCm: 48,
    thresholdCm: DEFAULT_THRESHOLD,
    status: 'available',
    sensorStatus: 'online',
    lastUpdated: new Date().toLocaleTimeString(),
    bayType: 'Standard',
    signalRssi: -55,
  },
  {
    id: 'P8',
    name: 'Slot P8',
    floor: 'Level 1 - Zone B',
    distanceCm: 11,
    thresholdCm: DEFAULT_THRESHOLD,
    status: 'occupied',
    sensorStatus: 'online',
    lastUpdated: new Date().toLocaleTimeString(),
    bayType: 'Compact',
    signalRssi: -63,
    vehiclePlate: 'KA-01-EK-7712',
    vehicleModel: 'Hyundai i20',
    parkedSince: '10:50 AM',
  },
  {
    id: 'P9',
    name: 'Slot P9',
    floor: 'Level 1 - Zone C',
    distanceCm: 55,
    thresholdCm: DEFAULT_THRESHOLD,
    status: 'available',
    sensorStatus: 'online',
    lastUpdated: new Date().toLocaleTimeString(),
    bayType: 'EV Charging',
    signalRssi: -71,
  },
  {
    id: 'P10',
    name: 'Slot P10',
    floor: 'Level 1 - Zone C',
    distanceCm: 0,
    thresholdCm: DEFAULT_THRESHOLD,
    status: 'disconnected',
    sensorStatus: 'offline',
    lastUpdated: '10 mins ago',
    bayType: 'Standard',
    signalRssi: 0,
  },
];

const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'BK-1082',
    slotId: 'P3',
    driverName: 'Rohit Sharma',
    phone: '+91 98765 43210',
    licensePlate: 'KA-03-NQ-5544',
    vehicleType: 'Sedan',
    startTime: 'Today, 02:00 PM',
    durationHours: 2,
    status: 'completed',
    cost: 80,
    pinCode: '4921',
  },
  {
    id: 'BK-1083',
    slotId: 'P7',
    driverName: 'Priya Patel',
    phone: '+91 91234 56789',
    licensePlate: 'MH-04-XY-3311',
    vehicleType: 'EV SUV',
    startTime: 'Today, 04:30 PM',
    durationHours: 3,
    status: 'active',
    cost: 150,
    pinCode: '7823',
  },
];

const ParkingContext = createContext<ParkingContextType | undefined>(undefined);

export const ParkingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [slots, setSlots] = useState<ParkingSlot[]>(INITIAL_SLOTS);
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [globalThreshold, setGlobalThreshold] = useState<number>(DEFAULT_THRESHOLD);
  const [isSimulating, setIsSimulating] = useState<boolean>(true);
  const [activeView, setActiveView] = useState<string>('home');
  const [telemetryLogs, setTelemetryLogs] = useState<TelemetryLog[]>([
    {
      id: 'log-1',
      timestamp: new Date(Date.now() - 4000).toLocaleTimeString(),
      slotId: 'P2',
      distanceCm: 8,
      status: 'occupied',
      echoTimeMicros: Math.round((2 * 8) / 0.034),
      source: 'ESP32-Node-01',
    },
    {
      id: 'log-2',
      timestamp: new Date(Date.now() - 2500).toLocaleTimeString(),
      slotId: 'P4',
      distanceCm: 6,
      status: 'occupied',
      echoTimeMicros: Math.round((2 * 6) / 0.034),
      source: 'ESP32-Node-01',
    },
    {
      id: 'log-3',
      timestamp: new Date(Date.now() - 1000).toLocaleTimeString(),
      slotId: 'P1',
      distanceCm: 45,
      status: 'available',
      echoTimeMicros: Math.round((2 * 45) / 0.034),
      source: 'ESP32-Node-01',
    },
  ]);

  const addTelemetryLog = useCallback((slotId: string, distanceCm: number, status: 'available' | 'occupied' | 'reserved' | 'disconnected', source: string = 'ESP32-IoT') => {
    const echoTimeMicros = distanceCm > 0 ? Math.round((2 * distanceCm) / 0.034) : 0;
    const newLog: TelemetryLog = {
      id: `log-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toLocaleTimeString(),
      slotId,
      distanceCm,
      status,
      echoTimeMicros,
      source,
    };
    setTelemetryLogs(prev => [newLog, ...prev.slice(0, 39)]);
  }, []);

  const updateSlotDistance = useCallback((slotId: string, distanceCm: number, source: string = 'Sensor-Manual') => {
    setSlots(prevSlots =>
      prevSlots.map(slot => {
        if (slot.id !== slotId) return slot;

        if (slot.sensorStatus === 'offline') {
          return {
            ...slot,
            distanceCm: 0,
            status: 'disconnected',
            lastUpdated: new Date().toLocaleTimeString(),
          };
        }

        const effectiveThreshold = slot.thresholdCm || globalThreshold;
        const isOccupied = distanceCm < effectiveThreshold;
        const newStatus = slot.isReserved ? 'reserved' : isOccupied ? 'occupied' : 'available';

        addTelemetryLog(slot.id, distanceCm, newStatus, source);

        return {
          ...slot,
          distanceCm,
          status: newStatus,
          lastUpdated: new Date().toLocaleTimeString(),
          vehiclePlate: isOccupied ? (slot.vehiclePlate || 'KA-04-AB-' + Math.floor(1000 + Math.random() * 9000)) : undefined,
          parkedSince: isOccupied ? (slot.parkedSince || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })) : undefined,
        };
      })
    );
  }, [globalThreshold, addTelemetryLog]);

  const toggleSlotOccupancy = useCallback((slotId: string) => {
    setSlots(prevSlots =>
      prevSlots.map(slot => {
        if (slot.id !== slotId) return slot;
        if (slot.sensorStatus === 'offline') return slot;

        const willBeOccupied = slot.status === 'available';
        const newDistance = willBeOccupied
          ? Math.floor(5 + Math.random() * 10) // 5 to 14 cm
          : Math.floor(40 + Math.random() * 25); // 40 to 65 cm

        const newStatus = willBeOccupied ? 'occupied' : 'available';
        addTelemetryLog(slot.id, newDistance, newStatus, 'User-Simulation');

        return {
          ...slot,
          distanceCm: newDistance,
          status: newStatus,
          lastUpdated: new Date().toLocaleTimeString(),
          vehiclePlate: willBeOccupied ? 'DL-09-EV-' + Math.floor(1000 + Math.random() * 9000) : undefined,
          vehicleModel: willBeOccupied ? 'Audi e-Tron' : undefined,
          parkedSince: willBeOccupied ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : undefined,
        };
      })
    );
  }, [addTelemetryLog]);

  const toggleSensorStatus = useCallback((slotId: string) => {
    setSlots(prevSlots =>
      prevSlots.map(slot => {
        if (slot.id !== slotId) return slot;
        const isCurrentlyOnline = slot.sensorStatus === 'online';
        const nextSensorStatus = isCurrentlyOnline ? 'offline' : 'online';
        const nextStatus = !isCurrentlyOnline
          ? (slot.distanceCm < (slot.thresholdCm || globalThreshold) && slot.distanceCm > 0 ? 'occupied' : 'available')
          : 'disconnected';

        const nextDistance = !isCurrentlyOnline ? (slot.distanceCm === 0 ? 45 : slot.distanceCm) : 0;
        addTelemetryLog(slot.id, nextDistance, nextStatus, nextSensorStatus === 'online' ? 'Hardware-Reconnected' : 'Hardware-Offline');

        return {
          ...slot,
          sensorStatus: nextSensorStatus,
          status: nextStatus,
          distanceCm: nextDistance,
          signalRssi: nextSensorStatus === 'online' ? -62 : 0,
          lastUpdated: new Date().toLocaleTimeString(),
        };
      })
    );
  }, [globalThreshold, addTelemetryLog]);

  const receiveSensorTelemetry = useCallback((slotId: string, distanceCm: number, source = 'ESP32-WiFi') => {
    updateSlotDistance(slotId, distanceCm, source);
  }, [updateSlotDistance]);

  const createBooking = useCallback((bookingData: Omit<Booking, 'id' | 'status' | 'pinCode'>) => {
    const targetSlot = slots.find(s => s.id === bookingData.slotId);
    if (!targetSlot) {
      return { success: false, message: 'Invalid parking slot specified.' };
    }
    if (targetSlot.status === 'occupied') {
      return { success: false, message: `Slot ${targetSlot.id} is currently occupied by another vehicle.` };
    }
    if (targetSlot.status === 'disconnected') {
      return { success: false, message: `Slot ${targetSlot.id} ultrasonic sensor is offline.` };
    }

    const pin = Math.floor(1000 + Math.random() * 9000).toString();
    const newBooking: Booking = {
      ...bookingData,
      id: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'active',
      pinCode: pin,
    };

    setBookings(prev => [newBooking, ...prev]);

    // Mark slot as reserved
    setSlots(prev =>
      prev.map(s => {
        if (s.id !== bookingData.slotId) return s;
        return {
          ...s,
          status: 'reserved',
          isReserved: true,
          reservedBy: {
            driverName: bookingData.driverName,
            licensePlate: bookingData.licensePlate,
            expiresAt: `In ${bookingData.durationHours} hours`,
          },
          lastUpdated: new Date().toLocaleTimeString(),
        };
      })
    );

    addTelemetryLog(targetSlot.id, targetSlot.distanceCm, 'reserved', 'Booking-Portal');
    return { success: true, message: `Slot ${targetSlot.id} reserved successfully! Confirmation code: ${pin}`, booking: newBooking };
  }, [slots, addTelemetryLog]);

  const cancelBooking = useCallback((bookingId: string) => {
    const booking = bookings.find(b => b.id === bookingId);
    if (!booking) return;

    setBookings(prev =>
      prev.map(b => (b.id === bookingId ? { ...b, status: 'cancelled' } : b))
    );

    setSlots(prev =>
      prev.map(slot => {
        if (slot.id !== booking.slotId) return slot;
        const isOccupied = slot.distanceCm < (slot.thresholdCm || globalThreshold) && slot.distanceCm > 0;
        return {
          ...slot,
          isReserved: false,
          reservedBy: undefined,
          status: slot.sensorStatus === 'offline' ? 'disconnected' : isOccupied ? 'occupied' : 'available',
          lastUpdated: new Date().toLocaleTimeString(),
        };
      })
    );
  }, [bookings, globalThreshold]);

  const resetAllSlots = useCallback(() => {
    setSlots(INITIAL_SLOTS);
  }, []);

  const simulateRushHour = useCallback(() => {
    setSlots(prev =>
      prev.map(slot => {
        if (slot.id === 'P10') return slot; // keep P10 as disconnected for hardware testing
        const distance = Math.floor(5 + Math.random() * 10);
        return {
          ...slot,
          distanceCm: distance,
          status: 'occupied',
          sensorStatus: 'online',
          vehiclePlate: 'KA-' + Math.floor(10 + Math.random() * 89) + '-Rush-' + Math.floor(100 + Math.random() * 900),
          lastUpdated: new Date().toLocaleTimeString(),
        };
      })
    );
  }, []);

  const simulateMorningEmpty = useCallback(() => {
    setSlots(prev =>
      prev.map(slot => {
        if (slot.id === 'P10') return slot;
        const distance = Math.floor(45 + Math.random() * 20);
        return {
          ...slot,
          distanceCm: distance,
          status: 'available',
          sensorStatus: 'online',
          vehiclePlate: undefined,
          parkedSince: undefined,
          lastUpdated: new Date().toLocaleTimeString(),
        };
      })
    );
  }, []);

  // Background random acoustic noise or occasional vehicle movement simulation
  useEffect(() => {
    if (!isSimulating) return;

    const interval = setInterval(() => {
      // Pick 1 random online slot to fluctuate slightly (sound wave jitter or arrival/departure)
      const onlineSlots = slots.filter(s => s.sensorStatus === 'online');
      if (onlineSlots.length === 0) return;

      const randomSlot = onlineSlots[Math.floor(Math.random() * onlineSlots.length)];
      
      // 85% chance: tiny ultrasonic fluctuation (+/- 1-2 cm)
      // 15% chance: car arrives or departs
      const roll = Math.random();
      if (roll > 0.88) {
        // Toggle occupancy
        toggleSlotOccupancy(randomSlot.id);
      } else {
        // Acoustic jitter of +/- 1cm
        const jitter = (Math.random() - 0.5) * 2;
        const currentDist = randomSlot.distanceCm;
        const newDist = Math.max(3, Math.min(80, Math.round(currentDist + jitter)));
        if (newDist !== currentDist) {
          setSlots(prev =>
            prev.map(s => {
              if (s.id !== randomSlot.id) return s;
              return {
                ...s,
                distanceCm: newDist,
                lastUpdated: new Date().toLocaleTimeString(),
              };
            })
          );
        }
      }
    }, 3500);

    return () => clearInterval(interval);
  }, [isSimulating, slots, toggleSlotOccupancy]);

  const stats = useMemo<SystemStats>(() => {
    const totalSlots = slots.length;
    const availableSlots = slots.filter(s => s.status === 'available').length;
    const occupiedSlots = slots.filter(s => s.status === 'occupied').length;
    const reservedSlots = slots.filter(s => s.status === 'reserved').length;
    const disconnectedSlots = slots.filter(s => s.status === 'disconnected').length;
    const activeSlots = totalSlots - disconnectedSlots;
    const occupancyRate = activeSlots > 0 ? Math.round(((occupiedSlots + reservedSlots) / activeSlots) * 100) : 0;
    
    const validDistances = slots.filter(s => s.sensorStatus === 'online').map(s => s.distanceCm);
    const avgDistanceCm = validDistances.length > 0
      ? Math.round((validDistances.reduce((a, b) => a + b, 0) / validDistances.length) * 10) / 10
      : 0;

    return {
      totalSlots,
      availableSlots,
      occupiedSlots,
      reservedSlots,
      disconnectedSlots,
      occupancyRate,
      avgDistanceCm,
    };
  }, [slots]);

  return (
    <ParkingContext.Provider
      value={{
        slots,
        bookings,
        telemetryLogs,
        globalThreshold,
        isSimulating,
        activeView,
        stats,
        setActiveView,
        setIsSimulating,
        setGlobalThreshold,
        updateSlotDistance,
        toggleSlotOccupancy,
        toggleSensorStatus,
        createBooking,
        cancelBooking,
        receiveSensorTelemetry,
        resetAllSlots,
        simulateRushHour,
        simulateMorningEmpty,
      }}
    >
      {children}
    </ParkingContext.Provider>
  );
};

export const useParking = () => {
  const context = useContext(ParkingContext);
  if (!context) {
    throw new Error('useParking must be used within a ParkingProvider');
  }
  return context;
};
