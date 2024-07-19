import { create } from "zustand";

type State = {
  data: string;
};

type Action = {
  update: (data: State["data"]) => void;
  remove: (data: State["data"]) => void;
};



// Create your store, which includes both state and (optionally) actions
export const useTokenStore = create<State & Action>((set) => ({
  data: "",
  update: (data) =>
    set(() => {
      localStorage.setItem("token", data);
      return { data };
    }),
  remove: () => set(() => ({ data: "" })),
}));
