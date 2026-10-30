import React from 'react';
import { ParkingProvider, useParking } from './context/ParkingContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { LiveParkingGrid } from './components/LiveParkingGrid';
import { AdminDashboard } from './components/AdminDashboard';
import { HardwareIntegration } from './components/HardwareIntegration';
import { SystemArchitecture } from './components/SystemArchitecture';
import { UserReservation } from './components/UserReservation';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

const AppContent: React.FC = () => {
  const { activeView } = useParking();

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-1">
        {activeView === 'home' && <HeroSection />}
        {activeView === 'live' && <LiveParkingGrid />}
        {activeView === 'dashboard' && <AdminDashboard />}
        {activeView === 'hardware' && <HardwareIntegration />}
        {activeView === 'architecture' && <SystemArchitecture />}
        {activeView === 'reserve' && <UserReservation />}
        {activeView === 'contact' && <ContactSection />}
      </main>

      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <ParkingProvider>
      <AppContent />
    </ParkingProvider>
  );
}
