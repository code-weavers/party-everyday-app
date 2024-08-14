import CustomTitle from "@/components/global/CustomTitle";
import { useAuth } from "@/hooks/auth/useAuth";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function ProfileScreen() {
   const { logout } = useAuth();

   return (
      <View style={styles.container}>
         <CustomTitle title={"Profile Screen"} />

         <Pressable
            style={styles.button}
            onPress={() => logout()}
         >
            <Text style={{ color: "white", textAlign: "center", fontSize: 16 }}>
               Logout
            </Text>
         </Pressable>
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
   button: {
      backgroundColor: "black",
      padding: 16,
      top: 50,
      borderRadius: 5,
      elevation: 2,
      width: "90%",
   },
});
