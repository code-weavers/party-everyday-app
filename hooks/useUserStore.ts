
import { IUser } from "@/interfaces/user.interface";
import { create } from "zustand";

type UserState = {
   user: IUser | undefined;
   setUser: (user: IUser | undefined) => void;
};

export const useUserStore = create<UserState>((set) => ({
   user: undefined,
   setUser: (user) => set({ user }),
}));