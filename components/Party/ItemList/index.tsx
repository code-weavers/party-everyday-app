import { IParty } from "@/interfaces/party.interface";
import { formatBRDate } from "@/utils";
import { useNavigation } from "@react-navigation/native";
import { Avatar, ListItem } from "@rneui/base";
import { StyleSheet } from "react-native";

interface PartyItemListProps {
	party: IParty;
}

export default function PartyItemList({ party }: PartyItemListProps) {
	const navigation = useNavigation();

	return (
		<ListItem
			style={styles.container}
			onPress={() =>
				navigation.navigate("PartyContentScreen", { id: String(party.id) })
			}
		>
			<Avatar
				source={{ uri: "https://randomuser.me/api/portraits/men/33.jpg" }}
			/>
			<ListItem.Content>
				<ListItem.Title style={{ color: "black", fontWeight: "bold" }}>
					{party.name}
				</ListItem.Title>
				<ListItem.Subtitle style={{ color: "black" }}>
					{formatBRDate(String(party.date))}
				</ListItem.Subtitle>
			</ListItem.Content>
			<ListItem.Chevron color="white" />
		</ListItem>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "white",
		marginVertical: 5,
		borderRadius: 5,
		padding: 10,
		maxWidth: "90%",
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
});
