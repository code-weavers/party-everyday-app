import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

interface BottomDropdownProps {
   placeholder: string;
   items: any[];
   value: string;
   setValue: (value: string) => void;
}

export default function BottomDropdown({ placeholder, items, value, setValue }: BottomDropdownProps) {
   const [isFocus, setIsFocus] = useState(false);

   return (
      <View style={styles.container}>
         <Dropdown
            dropdownPosition={'bottom'}
            style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={items}
            search
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? placeholder : '...'}
            searchPlaceholder="Search..."
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
               setValue(item.value);
               setIsFocus(false);
            }}
         />
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      backgroundColor: 'white',
      padding: 16,
      width: '100%',
   },
   dropdown: {
      height: 50,
      borderColor: 'gray',
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
   },
   icon: {
      marginRight: 5,
   },
   label: {
      position: 'absolute',
      backgroundColor: 'white',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
   },
   placeholderStyle: {
      fontSize: 16,
   },
   selectedTextStyle: {
      fontSize: 16,
   },
   iconStyle: {
      width: 20,
      height: 20,
   },
   inputSearchStyle: {
      height: 40,
      fontSize: 16,
   },
});