import { describe, it, expect, beforeEach } from 'vitest';
import { useParkiStore } from './use-parki-store';

describe('useParkiStore', () => {
  beforeEach(() => {
    useParkiStore.setState({
      activeVehicles: [],
      history: [],
      user: null,
    });
  });

  it('should add a vehicle correctly', () => {
    useParkiStore.getState().addVehicle({ plate: 'TES-123', type: 'car' });
    const state = useParkiStore.getState();
    expect(state.activeVehicles.length).toBe(1);
    expect(state.activeVehicles[0].plate).toBe('TES-123');
    expect(state.activeVehicles[0].type).toBe('car');
  });

  it('should checkout a vehicle correctly and apply fee', () => {
    useParkiStore.getState().addVehicle({ plate: 'MTO-456', type: 'motorcycle' });
    const vehicle = useParkiStore.getState().activeVehicles[0];
    
    const checkoutResult = useParkiStore.getState().checkoutVehicle(vehicle.id);
    const state = useParkiStore.getState();

    expect(state.activeVehicles.length).toBe(0);
    expect(state.history.length).toBe(1);
    expect(state.history[0].plate).toBe('MTO-456');
    expect(checkoutResult?.totalToPay).toBeDefined();
  });
});
