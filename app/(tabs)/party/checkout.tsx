import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import React, { useEffect, useRef } from "react";
import { Dimensions, StyleSheet, View } from "react-native";

const animationUrl = require("../../../assets/animations/submit-animation.json");

export default function PartyCheckoutScreen() {
   const animation = useRef(null);
   const dimensions = Dimensions.get("window");
   const navigation = useNavigation();

   useEffect(() => {
      setTimeout(() => {
         // redirect to home
         navigation.navigate("HomeScreen");
      }, 2000);
   }, []);

   return (
      <View style={styles.animationContainer}>
         <LottieView
            autoPlay
            loop={false}
            ref={animation}
            style={{
               width: dimensions.width,
               height: dimensions.height,
               backgroundColor: "#eee",
            }}
            source={animationUrl}
         />
      </View>
   );
}

const styles = StyleSheet.create({
   animationContainer: {
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
      flex: 1,
   },
});
