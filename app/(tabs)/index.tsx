import PartyItemList from "@/components/Party/ItemList";
import { useGetAllInvitedParties } from "@/hooks/party/useGetAllInvitedParties";
import { useGetAllOwnerParties } from "@/hooks/party/useGetAllOwnerParties";
import { useUserStore } from "@/hooks/useUserStore";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Tab, TabView } from "@rneui/themed";
import { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

export default function HomeScreen() {
	const [index, setIndex] = useState(0);
	const { user } = useUserStore();
	const { ownerParties, isLoading, refetch: ownerPartiesRefetch } = useGetAllOwnerParties();
	const { invitedParties, refetch: invitedPartiesRefecth } = useGetAllInvitedParties(String(user?.id));
	const [refreshing, setRefreshing] = useState(false);

	const onOwnerPartiesRefresh = () => {
	   setRefreshing(true);
	   ownerPartiesRefetch();
	   setRefreshing(false);
	};

	const onInvitedPartiesRefresh = () => {
	   setRefreshing(true);
	   invitedPartiesRefecth();
	   setRefreshing(false);
	};

	return (
		<View style={styles.container}>
			<View style={styles.list}>
				<Tab
					value={index}
					onChange={(e) => setIndex(e)}
					indicatorStyle={{
						backgroundColor: "black",
						height: 3,
					}}
					style={{ backgroundColor: "white" }}
				>
					<Tab.Item
						title="My Parties"
						titleStyle={{ fontSize: 16, color: "black" }}
						icon={
							<MaterialCommunityIcons name={"party-popper"} size={34} />
						}
					/>
					<Tab.Item
						title="Invited Parties"
						titleStyle={{ fontSize: 16, color: "black" }}
						icon={<MaterialCommunityIcons name={"handshake"} size={34} />}
					/>
				</Tab>

				<TabView value={index} onChange={setIndex} animationType="spring">
					<TabView.Item style={{ width: "100%" }}>
						<FlatList
						    refreshing={refreshing}
							onRefresh={onOwnerPartiesRefresh}
							data={ownerParties}
							renderItem={({ item }) => <PartyItemList party={item} />}
							keyExtractor={(item) => String(item.id)}
						/>
					</TabView.Item>
					<TabView.Item style={{ width: "100%" }}>
						<FlatList
						    refreshing={refreshing}
							onRefresh={onInvitedPartiesRefresh}
							data={invitedParties}
							renderItem={({ item }) => <PartyItemList party={item} />}
							keyExtractor={(item) => String(item.id)}
						/>
					</TabView.Item>
				</TabView>
			</View>
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
	list: {
		flex: 1,
		width: "100%",
		top: 10,
		backgroundColor: "white",
		borderRadius: 5,
	},
});
