import { useGetAllUsers } from "@/hooks/user/useGetAllUsers";
import { useUserStore } from "@/hooks/useUserStore";
import { IParty } from "@/interfaces/party.interface";
import { Tab, TabView } from "@rneui/themed";
import { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import AdditionalInfoItem from "../AdditionalInfo/AdditionalInfoItem";
import CreateAdditionalInfo from "../AdditionalInfo/CreateAdditionalInfo";
import GuestItemList from "../Guests/GuestItemList";
import InviteGuest from "../Guests/InviteGuest";

interface PartyContentProps {
	party: IParty;
}

export default function PartyContent({ party }: PartyContentProps) {
	const { user } = useUserStore();
	const [index, setIndex] = useState(0);
	const { users } = useGetAllUsers();
	const isOwner = party.ownerId === user?.id;

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
					<View>
						{isOwner && <CreateAdditionalInfo partyId={String(party.id)} />}
						<FlatList
							data={party.additionalInfo}
							renderItem={({ item }) => (
								<AdditionalInfoItem partyId={String(party.id)} additionalInfo={item} canDelete={isOwner} />
							)}
							keyExtractor={(item) => item.name}
							style={styles.flatlist}
						/>
					</View>
				</TabView.Item>
				<TabView.Item style={{ width: "100%" }}>
					<View>
						{isOwner && <InviteGuest partyId={String(party.id)} users={users} invitedGuests={party.guests} />}
						<FlatList
							data={party.guests}
							renderItem={({ item }) => <GuestItemList partyId={String(party.id)} guest={item} canDelete={isOwner} />}
							keyExtractor={(item) => item.user.id}
							style={styles.flatlist}
						/>
					</View>
				</TabView.Item>
			</TabView>
		</>
	);
}

const styles = StyleSheet.create({
	flatlist: {
		height: "65%",
	}
});
