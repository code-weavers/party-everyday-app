import { TextInput } from "@react-native-material/core";
import { StyleSheet } from "react-native";

interface InputTextProps {
   label: string;
   placeholder: string;
   value: string;
   setValue: (text: string) => void;
}

export default function InputText({
   label,
   placeholder,
   value,
   setValue,
}: InputTextProps) {
   return (
      <TextInput
         variant={"outlined"}
         label={label}
         placeholder={placeholder}
         value={value}
         onChangeText={(text) => setValue(text)}
         style={styles.input}
      />
   );
}

const styles = StyleSheet.create({
   input: {
      marginTop: 16,
      marginLeft: 16,
      marginRight: 16,
   },
});
