import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Vehicle, ParkingSession } from '@/lib/utils';
import { calculateParkingFee } from '@/lib/utils';

interface ParkiState {
  user: {
    name: string;
    isLoggedIn: boolean;
  } | null;
  activeVehicles: Vehicle[];
  history: ParkingSession[];
  
  // Actions
  setUser: (user: ParkiState['user']) => void;
  logout: () => void;
  addVehicle: (vehicle: Omit<Vehicle, 'id' | 'entryTime'>) => void;
  checkoutVehicle: (vehicleId: string) => ParkingSession | null;
}

export const useParkiStore = create<ParkiState>()(
  persist(
    (set, get) => ({
      user: null,
      activeVehicles: [],
      history: [],

      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),
      
      addVehicle: (data) => {
        const newVehicle: Vehicle = {
          ...data,
          id: Math.random().toString(36).substring(2, 9),
          entryTime: new Date().toISOString(),
        };
        set((state) => ({
          activeVehicles: [newVehicle, ...state.activeVehicles],
        }));
      },

      checkoutVehicle: (vehicleId) => {
        const state = get();
        const vehicle = state.activeVehicles.find((v) => v.id === vehicleId);
        if (!vehicle) return null;

        const exitTime = new Date().toISOString();
        const { total, durationMinutes } = calculateParkingFee(vehicle.entryTime, exitTime, vehicle.type);

        const session: ParkingSession = {
          ...vehicle,
          exitTime,
          totalToPay: total,
          durationMinutes,
        };

        set((state) => ({
          activeVehicles: state.activeVehicles.filter((v) => v.id !== vehicleId),
          history: [session, ...state.history],
        }));

        return session;
      },
    }),
    {
      name: 'parki-storage',
    }
  )
);
