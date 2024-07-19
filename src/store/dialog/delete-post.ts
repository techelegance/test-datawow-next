import { create } from "zustand";

type State = {
  data: boolean;
};

type Action = {
  update: (data: State["data"]) => void;
  remove: (data: State["data"]) => void;
};

// Create your store, which includes both state and (optionally) actions
export const useDialogDeletePostStore = create<State & Action>((set) => ({
  data: false,
  update: (data) => set(() => ({ data })),
  remove: () => set(() => ({ data: false })),
}));
