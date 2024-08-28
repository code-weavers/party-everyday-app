import { io } from "socket.io-client";
import { sendNotification } from "../Notification";

interface INotification {
   pushToken: string;
   partyId: string;
   title: string;
   message: string;
}

const apiURL = String(process.env.EXPO_PUBLIC_API_URL);

const socket = io(apiURL); // Adjust the URL as needed

export function initSocket() {
   socket.connect();

   socket.on("connect", () => {
      console.log("Connected to WebSocket server");
   });

   socket.on("notification", async (notification: INotification) => {
      await sendNotification(
         notification.pushToken,
         notification.partyId,
         notification.title,
         notification.message
      );
   });
}

