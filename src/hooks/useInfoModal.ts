import { create } from "zustand";

export interface ModalStoreeInterface {
  movieId?: string;
  isOpen: boolean;
  openModal: (movieId?: string) => void;
  closeModal: () => void;
}

const useInfoModal = create<ModalStoreeInterface>((set) => ({
  movieId: undefined,
  isOpen: false,
  openModal: (movieId?: string) => set({ movieId, isOpen: true }),
  closeModal: () => set({ movieId: undefined, isOpen: false }),
}));

export default useInfoModal;
