import { IUser } from "@/interfaces/user.interface";
import { StyleSheet, Text } from "react-native";
import { Avatar, CheckBox, ListItem } from "react-native-elements";

interface Guest {
   user: IUser;
   selected: boolean;
}

interface ItemListProps {
   guest: Guest;
}

export default function ItemList({ guest }: ItemListProps) {
   return (
      <ListItem key={guest.user.id} bottomDivider style={styles.container}>
         <Avatar rounded source={{ uri: guest.user.avatar }} />
         <ListItem.Content style={{ borderRadius: 5 }}>
            <ListItem.Title>
               <Text>{guest.user.name}</Text>
            </ListItem.Title>
            <ListItem.Subtitle>
               <Text>{"Example"}</Text>
            </ListItem.Subtitle>
         </ListItem.Content>
         <CheckBox center checked={guest.selected} />
      </ListItem>
   );
}

const styles = StyleSheet.create({
   container: {
      marginBottom: 10,
      alignSelf: "center",
      width: "90%",
      borderRadius: 5,

      // shadow
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
   },
});
