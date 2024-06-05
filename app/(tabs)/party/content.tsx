import PartyContent from "@/components/Party/Content";
import PartyHeader from "@/components/Party/Header";
import { useGetParty } from "@/hooks/party/useGetParty";
import { useUserStore } from "@/hooks/useUserStore";
import { useNavigation } from "@react-navigation/native";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function PartyContentScreen({ route }: any) {
	const { id } = route.params;
	const { party, isLoading } = useGetParty(id);
	const { user } = useUserStore();

	const navigation = useNavigation();

	return (
		<View style={styles.container}>
			{isLoading || !party ? (
				<Text>Loading...</Text>
			) : (
				<>
					<PartyHeader party={party} />

					<View style={styles.details}>
						<PartyContent party={party} />
					</View>

					{party.ownerId === user?.id && (
						<Pressable
							style={styles.button}
							onPress={() =>
								navigation.navigate("PartyCheckoutScreen", {
									id: party.id,
								})
							}
						>
							<Text style={{ color: "white" }}>Checkout</Text>
						</Pressable>
					)}
				</>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#fff",
	},
	details: {
		flex: 1,
		width: "100%",
		top: 10,
		backgroundColor: "white",
		borderRadius: 5,
	},
	flatlist: {
		flex: 1,
		width: "100%",
		top: 10,
	},
	button: {
		backgroundColor: "black",
		padding: 16,
		borderRadius: 5,
		elevation: 2,
		width: "90%",
		bottom: 110,
		alignItems: "center",
	},
});
