
import { IUser } from "@/interfaces/user.interface";
import { create } from "zustand";

type UserState = {
   user: IUser | undefined;
   setUser: (user: IUser | undefined) => void;
};

export const useUserStore = create<UserState>((set) => ({
   user: {
      id: "1",
      username: "",
      email: "",
      file: {
         url: "",
      },
      createdAt: "",
      updatedAt: "",
   },
   setUser: (user) => set({ user }),
}));