import { create } from "zustand";

interface LeadModalStore {
  open: boolean;
  openModal: () => void;
  closeModal: () => void;
}

/** Whether the lead popup is up. Any CTA on the page opens it. */
export const useLeadModal = create<LeadModalStore>((set) => ({
  open: false,
  openModal: () => set({ open: true }),
  closeModal: () => set({ open: false }),
}));
