import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type VehicleType = 'car' | 'motorcycle';

export interface Vehicle {
  id: string;
  plate: string;
  type: VehicleType;
  entryTime: string; // ISO String
}

export interface ParkingSession extends Vehicle {
  exitTime: string; // ISO String
  totalToPay: number;
  durationMinutes: number;
}

export const RATES = {
  car: 2500,
  motorcycle: 1000,
};

/**
 * Calcula el total a pagar según las reglas de negocio:
 * - Si el excedente de la última hora es <= 10 min, no se cobra esa fracción.
 * - Si supera los 10 min, se cobra la hora completa.
 * - Cobro mínimo: Si el tiempo total es > 10 min, se cobra al menos 1 hora.
 */
export function calculateParkingFee(entryTime: string, exitTime: string, type: VehicleType): { total: number, durationMinutes: number } {
  const start = new Date(entryTime).getTime();
  const end = new Date(exitTime).getTime();
  const durationMinutes = Math.floor((end - start) / (1000 * 60));
  
  if (durationMinutes <= 10) {
    return { total: 0, durationMinutes };
  }

  const hours = Math.floor(durationMinutes / 60);
  const extraMinutes = durationMinutes % 60;
  
  let billableHours = hours;
  if (extraMinutes > 10) {
    billableHours += 1;
  } else if (hours === 0 && durationMinutes > 10) {
    // Caso especial: menos de una hora pero más de 10 min de gracia inicial
    billableHours = 1;
  }

  const rate = RATES[type];
  return {
    total: billableHours * rate,
    durationMinutes
  };
}

/**
 * Formatea la duración en HH:MM:SS
 */
export function formatDuration(entryTime: string, now: Date = new Date()): string {
  const start = new Date(entryTime).getTime();
  const diff = Math.max(0, now.getTime() - start);
  
  const seconds = Math.floor((diff / 1000) % 60);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const hours = Math.floor(diff / (1000 * 60 * 60));

  return [
    hours.toString().padStart(2, '0'),
    minutes.toString().padStart(2, '0'),
    seconds.toString().padStart(2, '0')
  ].join(':');
}
