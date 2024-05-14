import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { IconButton, TextInput } from "@react-native-material/core";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import DateTimePicker from "react-native-ui-datepicker";

interface InputDateProps {
   label: string;
   placeholder: string;
   value: string;
   setValue: (date: string) => void;
}

export default function InputDate({
   label,
   placeholder,
   value,
   setValue,
}: InputDateProps) {
   const [date, setDate] = useState<Date>(new Date());
   const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

   return (
      <>
         <TextInput
            variant={"outlined"}
            label={label}
            placeholder={placeholder}
            value={value}
            onChangeText={(text) => setValue(text)}
            style={{ margin: 16 }}
            trailing={(props) => (
               <IconButton
                  icon={(props) => <Icon name={"calendar"} {...props} />}
                  onPress={() => setShowDatePicker(!showDatePicker)}
               />
            )}
         />

         <View
            style={{
               display: showDatePicker ? "flex" : "none",
               position: "absolute",
               bottom: 0,
               width: "100%",
               flex: 1,
               backgroundColor: "#F5FCFF",
            }}
         >
            <DateTimePicker
               mode="single"
               date={date}
               onChange={(value) => setDate(value.date as Date)}
               timePicker={true}
            />
         </View>
      </>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#F5FCFF",
   },
});
