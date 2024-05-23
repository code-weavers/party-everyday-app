import { TextInput } from "@react-native-material/core";
import { StyleSheet } from "react-native";

interface InputPhoneNumberProps {
   label: string;
   placeholder: string;
   value: string;
   setValue: (text: string) => void;
}

export default function InputPhoneNumber({
   label,
   placeholder,
   value,
   setValue,
}: InputPhoneNumberProps) {
   return (
      <TextInput
         variant={"outlined"}
         label={label}
         placeholder={placeholder}
         value={value}
         onChangeText={(text) => setValue(text)}
         textContentType="telephoneNumber"
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
