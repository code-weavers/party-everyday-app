import { StyleSheet, Text, View } from "react-native";

export default function PartyScreen() {
   return (
      <View style={styles.container}>
         <Text>Party Screen</Text>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#fff",
   },
});
