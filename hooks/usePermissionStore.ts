
import { create } from "zustand";

type PermissionState = {
   expoPushToken: string;
   setExpoPushToken: (expoPushToken: string) => void;
};

export const usePermissionStore = create<PermissionState>((set) => ({
   expoPushToken: '',
   setExpoPushToken: (expoPushToken: string) => set({ expoPushToken }),
}));