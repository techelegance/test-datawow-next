import { create } from "zustand";

type State = {
  data: {
    id: number;
    open: boolean;
  };
};

type Action = {
  update: (data: State["data"]) => void;
  remove: () => void;
};

// Create your store, which includes both state and (optionally) actions
export const useDialogUpdatePostStore = create<State & Action>((set) => ({
  data: {
    id: 0,
    open: false,
  },
  update: (data) => set(() => ({ data })),
  remove: () => set(() => ({ data: { id: 0, open: false } })),
}));
