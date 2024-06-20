import { IGuest } from "@/interfaces/guest.interface";
import { useState } from "react";
import { StyleSheet, Text } from "react-native";
import { Avatar, CheckBox, ListItem } from "react-native-elements";

interface ItemListProps {
	guest: IGuest;
}

export default function ItemList({ guest }: ItemListProps) {
	const [selected, setSelected] = useState<boolean>(false);

	return (
		<ListItem key={guest.user.id} bottomDivider style={styles.container}>
			<Avatar
				rounded
				source={{
					uri: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fexame.com%2Fpop%2Fgoku-day-por-que-9-de-maio-e-a-data-do-protagonista-de-dragon-ball%2F&psig=AOvVaw1yhrb1Mz3o204fUojUpOqD&ust=1718158188044000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCKCZuKK80oYDFQAAAAAdAAAAABAE",
				}}
			/>
			<ListItem.Content style={{ borderRadius: 5 }}>
				<ListItem.Title>{guest.user.username}</ListItem.Title>
				<ListItem.Subtitle>
					<Text>{"Online"}</Text>
				</ListItem.Subtitle>
			</ListItem.Content>
			<CheckBox
				center
				checked={guest.selected}
				onPress={() => {
					setSelected(!selected);
					guest.selected = !guest.selected;
				}}
			/>
		</ListItem>
	);
}

const styles = StyleSheet.create({
	container: {
		marginBottom: 10,
		alignSelf: "center",
		width: "90%",
		borderRadius: 5,

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
