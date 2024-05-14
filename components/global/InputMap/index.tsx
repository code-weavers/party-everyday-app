import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { IconButton } from "@react-native-material/core";

import { useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView from "react-native-maps";
import TextInput from "../Input";

interface InputMapProps {
   label: string;
   placeholder: string;
   value: string;
   setValue: (text: string) => void;
}

export default function InputMap({
   label,
   placeholder,
   value,
   setValue,
}: InputMapProps) {
   const [showMapPicker, setShowMapPicker] = useState<boolean>(false);

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
                  icon={(props) => <Icon name={"google-maps"} {...props} />}
                  onPress={() => setShowMapPicker(!showMapPicker)}
               />
            )}
         />
         <View
            style={{
               //display: showMapPicker ? "flex" : "none",
               position: "absolute",
               bottom: 0,
               width: "100%",
               flex: 1,
               backgroundColor: "#F5FCFF",
            }}
         >
            <MapView
               style={styles.map}
               region={{
                  latitude: 37.78825,
                  longitude: -122.4324,
                  latitudeDelta: 0.015,
                  longitudeDelta: 0.0121,
               }}
            />
         </View>
      </>
   );
}

const styles = StyleSheet.create({
   container: {
      ...StyleSheet.absoluteFillObject,
      height: 400,
      width: 400,
      justifyContent: "flex-end",
      alignItems: "center",
   },
   map: {
      ...StyleSheet.absoluteFillObject,
   },
});
