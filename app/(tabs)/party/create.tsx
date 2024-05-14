import InputDate from "@/components/global/InputDate";
import InputMap from "@/components/global/InputMap";
import InputText from "@/components/global/InputText";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function CreatePartyScreen() {
   const [name, setName] = useState<string>("");
   const [description, setDescription] = useState<string>("");
   const [date, setDate] = useState<string>("");
   const [location, setLocation] = useState<string>("");

   return (
      <View style={style.container}>
         <Text
            style={{
               fontSize: 24,
               fontWeight: "bold",
               margin: 16,
            }}
         >
            Create your Party
         </Text>
         <Text
            style={{
               fontSize: 20,
               margin: 16,
            }}
         >
            Plase fill the form below
         </Text>
         <InputText
            label="Name"
            placeholder="Let's set an name for your party"
            value={name}
            setValue={setName}
         />
         <InputText
            label="Description"
            placeholder="Let's set an description for your party"
            value={description}
            setValue={setDescription}
         />
         <InputDate
            label="Date"
            placeholder={"Your party date"}
            value={date}
            setValue={setDate}
         />
         <InputMap
            label="Location"
            placeholder={"Your party location"}
            value={location}
            setValue={setLocation}
         />
      </View>
   );
}

const style = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#fff",
      padding: 16,
   },
});
