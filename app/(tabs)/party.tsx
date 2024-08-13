import PartyItemList from "@/components/Party/ItemList";
import CustomTitle from "@/components/global/CustomTitle";
import { useGetAllParties } from "@/hooks/party/useGetAllParties";
import { useNavigation } from "@react-navigation/native";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

export default function PartyScreen() {
	const navigation = useNavigation();
	const { parties } = useGetAllParties();

	return (
		<View style={styles.container}>
			<CustomTitle title={"Party Screen"} />

			<View style={styles.flatList}>
				<FlatList
					data={parties}
					renderItem={({ item }) => <PartyItemList party={item} />}
					keyExtractor={(item) => String(item.id)}
				/>
			</View>

			<Pressable
				style={styles.button}
				onPress={() => navigation.navigate("CreatePartyScreen")}
			>
				<Text style={{ color: "white", textAlign: "center", fontSize: 16 }}>
					New Party!
				</Text>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		backgroundColor: "#fff",
	},
	flatList: {
		flex: 1,
		maxHeight: "65%",
		width: "100%",
		top: 10,
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
