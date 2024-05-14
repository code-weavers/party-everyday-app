import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { IconButton, TextInput } from "@react-native-material/core";
import { useState } from "react";

interface InputPasswordProps {
   label: string;
   placeholder: string;
   value: string;
   setValue: (text: string) => void;
}

export default function InputPassword({
   label,
   placeholder,
   value,
   setValue,
}: InputPasswordProps) {
   const [secureTextEntry, setSecureTextEntry] = useState(true);

   return (
      <TextInput
         variant={"outlined"}
         label={label}
         placeholder={placeholder}
         value={value}
         onChangeText={(text) => setValue(text)}
         style={{ margin: 16 }}
         secureTextEntry={secureTextEntry}
         trailing={(props) => (
            <IconButton
               icon={(props) => (
                  <Icon name={secureTextEntry ? "eye" : "eye-off"} {...props} />
               )}
               onPress={() => setSecureTextEntry(!secureTextEntry)}
            />
         )}
      />
   );
}
