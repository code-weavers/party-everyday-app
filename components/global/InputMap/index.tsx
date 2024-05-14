import useMapPickerFocus from "@/hooks/useMapPickerFocus";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { IconButton } from "@react-native-material/core";
import { useState } from "react";
import TextInput from "../Input";
import MapPicker from "../MapPicker";

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
   const {
      longDelta,
      latDelta,
      ITEM_WIDTH,
      ITEM_HEIGHT,
      FLAT_LIST_ITEM_WIDTH,
      state,
      scrollX,
      snapPoints,
   } = useMapPickerFocus({
      title: "Party",
      lat: -23.5489,
      long: -46.6388,
      images: [],
   });

   return (
      <>
         <TextInput
            variant={"outlined"}
            label={label}
            placeholder={placeholder}
            value={value}
            onChangeText={(text) => setValue(text)}
            style={{
               marginTop: 16,
               marginLeft: 16,
               marginRight: 16,
            }}
            trailing={(props) => (
               <IconButton
                  icon={(props) => <Icon name={"google-maps"} {...props} />}
               />
            )}
            onPress={() => setShowMapPicker(!showMapPicker)}
         />
         <MapPicker
            snapPoints={snapPoints}
            width={ITEM_WIDTH}
            height={ITEM_HEIGHT}
            latDelta={latDelta}
            longDelta={longDelta}
            lat={-23.5489}
            long={-46.6388}
         />
      </>
   );
}
