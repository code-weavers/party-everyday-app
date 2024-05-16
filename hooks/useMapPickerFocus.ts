import { useMemo, useRef } from "react";
import { Animated, Dimensions } from "react-native";

export default function useMapPickerFocus(latitude: number) {
   const { width, height } = Dimensions.get('screen')
   const FLAT_LIST_ITEM_WIDTH = width * 0.80 + 12
   const ITEM_WIDTH = width * 0.85
   const ITEM_HEIGHT = height * 0.20
   const scrollX = useRef(new Animated.Value(0)).current
   const oneDegreeOfLatitudeInMeters = 111.32 * 1000;
   const latDelta = 100 / oneDegreeOfLatitudeInMeters;
   const longDelta = 1000 / (oneDegreeOfLatitudeInMeters * Math.cos(latitude * (Math.PI / 180)));
   const snapPoints = useMemo(() => ['4.00%', '80%'], []);

   return {
      FLAT_LIST_ITEM_WIDTH,
      scrollX,
      latDelta,
      longDelta,
      snapPoints,
   }
}
