import { create } from "zustand";

type State = {
  data: any;
};

type Action = {
  update: (data: State["data"]) => void;
  remove: (data: State["data"]) => void;
};



// Create your store, which includes both state and (optionally) actions
export const useProfileStore = create<State & Action>((set) => ({
  data: {},
  update: (data) =>
    set(() => {
      return { data };
    }),
  remove: () => set(() => ({ data: {} })),
}));
