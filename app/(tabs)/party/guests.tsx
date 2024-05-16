import ItemList from "@/components/ItemList";
import CustomSubTitle from "@/components/global/CustomSubTitle";
import CustomTitle from "@/components/global/CustomTitle";
import { useGetAllUsers } from "@/hooks/user/useGetAllUsers";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

interface GuestListScreenProps {
   onPrevious: () => void;
   onNext: () => void;
}

export default function GuestListScreen({
   onPrevious,
   onNext,
}: GuestListScreenProps) {
   const { users } = useGetAllUsers();

   return (
      <View style={styles.container}>
         <View>
            <CustomTitle title="Select your guests" />
            <CustomSubTitle subtitle="You can select your guests for the party" />
         </View>

         <View style={styles.flatList}>
            <FlatList
               data={users}
               renderItem={({ item }) => <ItemList user={item} />}
               keyExtractor={(item) => item.id}
            />
         </View>

         <View style={styles.buttonContainer}>
            <Pressable style={styles.button} onPress={onPrevious}>
               <Text
                  style={{ color: "white", textAlign: "center", fontSize: 16 }}
               >
                  Previous
               </Text>
            </Pressable>
            <Pressable style={styles.button} onPress={onNext}>
               <Text
                  style={{ color: "white", textAlign: "center", fontSize: 16 }}
               >
                  Next
               </Text>
            </Pressable>
         </View>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#fff",
      padding: 16,
   },
   flatList: {
      flex: 1,
      maxHeight: "60%",
   },
   buttonContainer: {
      //display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
      position: "absolute",
      bottom: 150,
      right: 15,
      //marginHorizontal: 32,
   },
   button: {
      backgroundColor: "black",
      padding: 16,
      borderRadius: 5,
      elevation: 2,
      width: "47%",
   },
});
