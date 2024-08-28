import { firstLetterUpperCase } from "@/utils";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Controller } from "react-hook-form";
import { StyleSheet, Text, TextInput, View } from "react-native";

interface InputTextProps {
   label: string;
   placeholder: string;
   value: string;
   setValue: (text: string) => void;
   icon?: boolean;
   control?: any;
   error?: any
}

export default function InputUsername({
   label,
   placeholder,
   value,
   setValue,
   icon,
   control,
   error
}: InputTextProps) {
   return (
      <>
         <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
               <View style={styles.container}>
                  {icon && <Icon name={'account-outline'} size={20} color="#000" style={styles.icon} />}
                  <TextInput
                     placeholder={placeholder}
                     placeholderTextColor={"#000"}
                     value={value}
                     onChangeText={(text) => {
                        setValue(text);
                        onChange(text);
                     }}
                     autoCorrect={true}
                     autoCapitalize="none"
                     style={styles.input}
                  />
               </View>
            )}
            name={label}
         />
         {error?.username && <Text>{firstLetterUpperCase(label)} is required</Text>}
      </>
   );
}

const styles = StyleSheet.create({
   container: {
      borderWidth: 1,
      borderColor: "#000",
      borderRadius: 5,

      marginTop: 16,
      marginLeft: 16,
      marginRight: 16,
      padding: 16,

      flexDirection: 'row',
      alignItems: 'center',
   },
   icon: {
      marginRight: 10,
   },
   input: {
      flex: 1,
      fontSize: 16,
   },
});
