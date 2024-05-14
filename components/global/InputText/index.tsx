import { TextInput } from "@react-native-material/core";

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
         style={{ margin: 16 }}
      />
   );
}

/*const styles = StyleSheet.create({
   input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
   },
});

<TextInput
            style={styles.input}
            placeholder={placeholder}
            value={value}
            onChangeText={(text) => setValue(text)}
         />*/
