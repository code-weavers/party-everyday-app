import { ICoordinates } from "@/interfaces/coordinates.interface";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { IconButton, TextInput } from "@react-native-material/core";
import { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapViewer from "../MapViewer";
import CustomModal from "../Modal";

interface InputMapProps {
   location: ICoordinates;
   setLocation: (location: ICoordinates) => void;
}

export default function InputMap({ location, setLocation }: InputMapProps) {
   const [search, setSearch] = useState<string>("");
   const [visible, setVisible] = useState(false);

   useEffect(() => {}, [location]);

   return (
      <>
         <TextInput
            variant={"outlined"}
            label={"Search"}
            placeholder={"Search"}
            value={search}
            trailing={(props) => (
               <IconButton
                  icon={(props) => <Icon name={"google-maps"} {...props} />}
                  onPress={() => setVisible(true)}
               />
            )}
            style={{ marginTop: 16, marginLeft: 16, marginRight: 16 }}
            editable={false}
         />
         <CustomModal visible={visible} setVisible={setVisible}>
            <SafeAreaView>
               <View>
                  <Text
                     style={{
                        fontSize: 24,
                        fontWeight: "bold",
                        margin: 16,
                        color: "black",
                     }}
                  >
                     Select a place
                  </Text>
                  <GooglePlacesAutocomplete
                     placeholder="Type a place"
                     query={{ key: process.env.EXPO_PUBLIC_GOOGLE_API_KEY }}
                     fetchDetails={true}
                     onFail={(error) => console.log(error)}
                     onNotFound={() => console.log("no results")}
                     onPress={(data, details = null) =>
                        setLocation({
                           latitude: Number(details?.geometry.location.lat),
                           longitude: Number(details?.geometry.location.lng),
                        })
                     }
                     textInputProps={{
                        autoFocus: true,
                        blurOnSubmit: false,
                        onChangeText: (text) => setSearch(text),
                     }}
                     listEmptyComponent={<ListViewEmtpy />}
                     styles={{
                        container: {
                           flex: 0,
                        },
                        textInput: {
                           borderRadius: 5,
                           borderColor: "gray",
                           borderWidth: 1,
                           fontSize: 16,
                           height: 48,
                        },
                        description: {
                           color: "#000",
                           fontSize: 16,
                        },
                     }}
                  />
               </View>
               <View style={style.mapview}>
                  <MapViewer location={location} setRegion={setLocation} />
               </View>
            </SafeAreaView>
         </CustomModal>
      </>
   );
}

function ListViewEmtpy() {
   return (
      <View style={{ flex: 1 }}>
         <Text>No results were found</Text>
      </View>
   );
}

const style = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#fff",
      padding: 16,
   },
   mapview: {
      flex: 1,
      width: "100%",
      height: "80%",
      borderRadius: 5,
   },
});
