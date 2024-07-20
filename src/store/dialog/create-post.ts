import { create } from "zustand";

type State = {
  data: boolean;
};

type Action = {
  update: (data: State["data"]) => void;
  remove: () => void;
};

// Create your store, which includes both state and (optionally) actions
export const useDialogCreatePostStore = create<State & Action>((set) => ({
  data: false,
  update: (data) => set(() => ({ data })),
  remove: () => set(() => ({ data: false })),
}));
