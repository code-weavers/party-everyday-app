import { StyleProp, StyleSheet, TextInput, TextStyle, View } from "react-native";

interface InputTextProps {
   placeholder: string;
   value: string;
   setValue: (text: string) => void;
   styleProps?: StyleProp<TextStyle>;
}
const formatMoney = (value: string) => {
   // Remove any non-numeric characters
   value = value.replace(/[^0-9]/g, '');

   // Convert to a float by dividing by 100
   let formattedNumber = (parseFloat(value) / 100).toFixed(2);

   // Add commas as thousand separators
   formattedNumber = formattedNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

   return formattedNumber;
};

export default function InputNumber({
   placeholder,
   value,
   setValue,
   styleProps,
}: InputTextProps) {
   return (
      <View style={styles.container}>
         <TextInput
            placeholder={placeholder}
            placeholderTextColor={"#000"}
            value={value}
            onChangeText={(text) => setValue(formatMoney(text))}
            autoCorrect={true}
            autoCapitalize="none"
            keyboardType="number-pad"
            style={[styles.input, styleProps]}
         />
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      borderWidth: 1,
      borderColor: "#000",
      borderRadius: 5,
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
