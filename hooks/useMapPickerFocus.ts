import { useEffect, useMemo, useRef, useState } from "react";
import { Animated, Dimensions } from "react-native";

interface LocationProps {
   title: string;
   lat: number;
   long: number;
   images: [];
}

export default function useMapPickerFocus({ title, lat, long, images }: LocationProps) {
   const [state, setState] = useState({ images: [] })

   const { width, height } = Dimensions.get('screen')
   const FLAT_LIST_ITEM_WIDTH = width * 0.80 + 12
   const ITEM_WIDTH = width * 0.85
   const ITEM_HEIGHT = height * 0.20
   const scrollX = useRef(new Animated.Value(0)).current
   const oneDegreeOfLatitudeInMeters = 111.32 * 1000;
   const latDelta = 100 / oneDegreeOfLatitudeInMeters;
   const longDelta = 1000 / (oneDegreeOfLatitudeInMeters * Math.cos(lat * (Math.PI / 180)));
   const snapPoints = useMemo(() => ['4.00%', '80%'], []);

   useEffect(() => {
      setState(prevState => ({ ...prevState, images }))
   }, [])

   return {
      state,
      FLAT_LIST_ITEM_WIDTH,
      ITEM_HEIGHT,
      ITEM_WIDTH,
      scrollX,
      latDelta,
      longDelta,
      snapPoints,
   }
}
