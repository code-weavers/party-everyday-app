import { IUser } from "@/interfaces/user.interface";
import { Avatar, ListItem } from "react-native-elements";

interface ItemListProps {
   user: IUser;
}

export default function ItemList({ user }: ItemListProps) {
   return (
      <ListItem key={user.id} bottomDivider>
         <Avatar rounded source={{ uri: user.avatar }} />
         <ListItem.Content>
            <ListItem.Title>{user.name}</ListItem.Title>
            <ListItem.Subtitle>{"example"}</ListItem.Subtitle>
         </ListItem.Content>
      </ListItem>
   );
}
