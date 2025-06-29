import create from "zustand";

export const useCarControls = create((set) => ({
  forward: false,
  backward: false,
  left: false,
  right: false,
  setKey: (key, value) => set((state) => ({ ...state, [key]: value })),
}));