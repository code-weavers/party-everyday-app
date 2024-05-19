import ItemList from "@/components/ItemList";
import CustomSubTitle from "@/components/global/CustomSubTitle";
import CustomTitle from "@/components/global/CustomTitle";
import StepperButton from "@/components/global/StepperButton";
import { PartyStep } from "@/constants/Party";
import { useGetAllUsers } from "@/hooks/user/useGetAllUsers";
import { IUser } from "@/interfaces/user.interface";
import { FlatList, StyleSheet, View } from "react-native";

interface GuestListScreenProps {
   onPrevious: () => void;
   onNext: () => void;
}

interface IGuest {
   user: IUser;
   selected: boolean;
}

export default function GuestListScreen({
   onPrevious,
   onNext,
}: GuestListScreenProps) {
   const { users } = useGetAllUsers();
   const guests: IGuest[] = users.map((user) => ({
      user,
      selected: false,
   }));

   return (
      <View style={styles.container}>
         <View>
            <CustomTitle title="Select your guests" />
            <CustomSubTitle subtitle="You can select your guests for the party" />
         </View>

         <View style={styles.flatList}>
            <FlatList
               data={guests}
               renderItem={({ item }) => <ItemList guest={item} />}
               keyExtractor={(item) => item.user.id}
            />
         </View>

         <StepperButton
            steps={3}
            currentStep={PartyStep.Guests}
            onPrevious={onPrevious}
            onNext={onNext}
         />
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
      width: "100%",
      top: 10,
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
