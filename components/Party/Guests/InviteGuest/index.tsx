import CustomSubTitle from "@/components/global/CustomSubTitle";
import CustomTitle from "@/components/global/CustomTitle";
import CustomModal from "@/components/global/Modal";
import SafeContainer from "@/components/global/SafeContainer";
import { useAddGuest } from "@/hooks/party/useAddGuest";
import { useUserStore } from "@/hooks/useUserStore";
import { IGuest } from "@/interfaces/guest.interface";
import { IUser } from "@/interfaces/user.interface";
import { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import InviteGuestItemList from "../InviteGuestItemList";

interface IGuestItemListProps {
   partyId: string
   users: IUser[];
   invitedGuests: IGuest[] | undefined;
}

export default function InviteGuest({ partyId, users, invitedGuests }: IGuestItemListProps) {
   const { user } = useUserStore();
   const [visible, setVisible] = useState(false);
   const { setInvitedFriends, handleSubmit } = useAddGuest(partyId);

   const [filteredGuests, setFilteredGuests] = useState<IGuest[]>([]);

   //TODO: Refactor this to a custom hook, improve this logic
   useEffect(() => {
      setFilteredGuests(filterGuests(String(user?.id), users, invitedGuests));
   }, [user?.id, users, invitedGuests]);

   useEffect(() => {
      setInvitedFriends(filteredGuests.filter((guest) => guest.selected).map((guest) => guest.user.id));
   }, [filteredGuests, setInvitedFriends]);

   const handleGuestSelection = (guestId: string) => {
      setFilteredGuests((prevGuests) =>
         prevGuests.map((guest) =>
            guest.user.id === guestId ? { ...guest, selected: !guest.selected } : guest
         )
      );
   };

   return (
      <View style={styles.container}>
         <Pressable onPress={() => setVisible(true)} style={styles.button}>
            <Text style={styles.text}>Invite a friend</Text>
         </Pressable>

         <CustomModal visible={visible} setVisible={setVisible} onSubmit={handleSubmit}>
            <SafeContainer>
               <View style={styles.listContainer}>
                  <View>
                     <CustomTitle title="Select your friends" />
                     <CustomSubTitle subtitle="You can select your friends for the party" />
                  </View>

                  <FlatList
                     data={filteredGuests}
                     renderItem={({ item }) => (
                        <InviteGuestItemList guest={item} onSelect={() => handleGuestSelection(item.user.id)} />
                     )}
                  />
               </View>
            </SafeContainer>
         </CustomModal>
      </View>
   );
}

function filterGuests(currentUserId: string, users: IUser[], invitedGuests: IGuest[] | undefined): IGuest[] {
   let guests: IGuest[] = users
      .map((user) => ({
         user,
         selected: false,
      }))
      .filter((guest) => guest.user.id !== currentUserId);

   if (invitedGuests) {
      guests = guests.filter((guest) => {
         return invitedGuests.every((invitedGuest) => {
            return invitedGuest.user.id !== guest.user.id;
         });
      })
   }

   return [...guests];
}

const styles = StyleSheet.create({
   container: {
      backgroundColor: "white",
      marginVertical: 5,
      borderBottomLeftRadius: 5,
      borderBottomRightRadius: 5,
      padding: 10,
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      alignSelf: "center",

      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
   },
   listContainer: {
      flex: 1,
      backgroundColor: "white",
      paddingTop: 16,
   },
   button: {
      backgroundColor: "#52c41a",
      padding: 16,
      borderRadius: 5,
      elevation: 2,
      width: "100%",
      height: 50,
   },
   text: {
      color: "white",
      textAlign: "center",
      fontSize: 16,
      fontWeight: "bold",
   },
});
