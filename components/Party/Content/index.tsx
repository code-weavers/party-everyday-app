import { IParty } from "@/interfaces/party.interface";
import { Tab, TabView } from "@rneui/themed";
import { useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import AdditionalInfoItem from "../AdditionalInfoItem";
import GuestItemList from "../GuestItemList";

interface PartyContentProps {
	party: IParty;
}

export default function PartyContent({ party }: PartyContentProps) {
	const [index, setIndex] = useState(0);

	return (
		<>
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
					title="Additional Info"
					titleStyle={{ fontSize: 16, color: "black" }}
					icon={{
						name: "information-circle-outline",
						type: "ionicon",
						color: "black",
					}}
				/>
				<Tab.Item
					title="Guests"
					titleStyle={{ fontSize: 16, color: "black" }}
					icon={{
						name: "people-outline",
						type: "ionicon",
						color: "black",
					}}
				/>
			</Tab>

			<TabView value={index} onChange={setIndex} animationType="spring">
				<TabView.Item style={{ width: "100%" }}>
					<FlatList
						data={party.additionalInfo}
						renderItem={({ item }) => (
							<AdditionalInfoItem additionalInfo={item} />
						)}
						keyExtractor={(item) => item.name}
					/>
				</TabView.Item>
				<TabView.Item style={{ width: "100%" }}>
					<FlatList
						data={party.guests}
						renderItem={({ item }) => <GuestItemList guest={item} />}
						keyExtractor={(item) => item.user.id}
					/>
				</TabView.Item>
			</TabView>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		top: 10,
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#fff",
	},
	details: {
		flex: 1,
		//width: "100%",
		top: 10,
		backgroundColor: "white",
		padding: 10,
		borderRadius: 5,
		width: 200,
		//minWidth: "90%",
		//maxWidth: "90%",
		maxHeight: "90%",

		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
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
