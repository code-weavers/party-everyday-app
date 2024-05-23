import { Alert, Platform, ToastAndroid } from "react-native";

export const useToast = () => {
   const showToast = (message: string, type: "success" | "error" | "warning") => {
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