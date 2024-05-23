import ItemList from "@/components/ItemList";
import CustomSubTitle from "@/components/global/CustomSubTitle";
import CustomTitle from "@/components/global/CustomTitle";
import StepperButton from "@/components/global/StepperButton";
import { PartyStep } from "@/constants/Party";
import { useGetAllUsers } from "@/hooks/user/useGetAllUsers";
import { IGuest } from "@/interfaces/guest.interface";
import StorageUtils from "@/utils/storage.utils";
import { FlatList, StyleSheet, View } from "react-native";

interface GuestListScreenProps {
   onPrevious: () => void;
   onNext: () => void;
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

   const handleNext = async () => {
      const newParty: string = await StorageUtils.get("new-party");
      const newPartyParsed = JSON.parse(newParty);

      StorageUtils.set(
         "new-party",
         JSON.stringify({
            ...newPartyParsed,
            guests: {
               guests: guests
                  .filter((guest) => guest.selected)
                  .map((guest) => guest.user),
            },
         })
      );

      onNext();
   };

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
            onNext={handleNext}
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
      maxHeight: "70%",
      width: "100%",
      top: 10,
   },
});
