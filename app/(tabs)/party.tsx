import CustomTitle from "@/components/global/CustomTitle";
import FindParties from "@/components/Party/FindParties";
import { useGetAllParties } from "@/hooks/party/useGetAllParties";
import { IParty } from "@/interfaces/party.interface";
import { useNavigation } from "@react-navigation/native";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function PartyScreen() {
	const navigation = useNavigation();
	const { parties } = useGetAllParties();

	return (
		<View style={styles.container}>
			<CustomTitle title={"Find or Create parties"} />

			<View>
				<FindParties parties={parties as IParty[]} />
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
		backgroundColor: "white",
	},
	buttonContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "blue",
	},
	button: {
		backgroundColor: "black",
		padding: 16,
		borderRadius: 5,
		elevation: 2,
		width: "90%",

		position: "absolute",
		bottom: 120,
	},
});
