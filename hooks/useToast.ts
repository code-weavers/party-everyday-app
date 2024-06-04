import { Alert, Platform, ToastAndroid } from "react-native";

interface UseToast {
   message: string;
   type?: "success" | "error" | "warning";
}

export const useToast = () => {
   const showToast = ({ message, type }: UseToast) => {
      if (Platform.OS === 'android') {
         ToastAndroid.show(message, ToastAndroid.BOTTOM)
      } else {
         Alert.alert('Info', message, [], { cancelable: true });
      }
   };

   return {
      showToast,
   };
}