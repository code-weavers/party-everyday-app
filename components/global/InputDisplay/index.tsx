import { truncateText } from "@/utils";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Text, TextInput, View } from "react-native";

interface InputDisplayProps {
   label: string;
   text: string;
   isCopyable?: boolean;
}

export default function InputDisplay({ label, text, isCopyable }: InputDisplayProps) {
   const copyToClipboard = () => {
      navigator.clipboard.writeText(text);
   }

   return (
      <View style={styles.container}>
         <Text style={styles.label}>{label}</Text>
         <TextInput value={truncateText(text, 32)} editable={false} style={styles.input}>
            {isCopyable &&
               <MaterialCommunityIcons name="content-copy" size={24} color="black" onPress={copyToClipboard} />
            }
         </TextInput>
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      flexDirection: "column",
      width: "100%",
      marginTop: 10,
      marginBottom: 10,
   },
   label: {
      fontSize: 16,
      fontWeight: "bold",
   },
   inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      width: "100%",

   },
   input: {
      borderRadius: 5,
      borderWidth: 1,
      borderColor: "black",
      padding: 10,
      marginTop: 5,
      marginBottom: 10,
      fontSize: 18,

      flexDirection: "row",
      alignItems: "center",

      width: "100%",
   },
})