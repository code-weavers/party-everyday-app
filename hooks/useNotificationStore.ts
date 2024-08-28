import * as Notifications from 'expo-notifications';
import { create } from "zustand";


type NotificationState = {
   notification: Notifications.Notification | undefined;
   setNotification: (notification: Notifications.Notification | undefined) => void;
};

export const useNotificationStore = create<NotificationState>((set) => ({
   notification: undefined,
   setNotification: (notification) => set({ notification }),
}));