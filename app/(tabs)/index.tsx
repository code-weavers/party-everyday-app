import SafeContainer from "@/components/global/SafeContainer";
import PartyItemList from "@/components/Party/ItemList";
import { usePermission } from "@/hooks/auth/usePermission";
import { useGetAllInvitedParties } from "@/hooks/party/useGetAllInvitedParties";
import { useGetAllOwnerParties } from "@/hooks/party/useGetAllOwnerParties";
import { useNotificationStore } from "@/hooks/useNotificationStore";
import { usePermissionStore } from "@/hooks/usePermissionStore";
import { useUserStore } from "@/hooks/useUserStore";
import { registerForPushNotificationsAsync } from "@/services/Notification";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Tab, TabView } from "@rneui/themed";
import * as Notifications from 'expo-notifications';
import { useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

export default function HomeScreen() {
	const [index, setIndex] = useState(0);
	const { user } = useUserStore();
	const { ownerParties, isLoading, refetch: ownerPartiesRefetch } = useGetAllOwnerParties();
	const { invitedParties, refetch: invitedPartiesRefecth } = useGetAllInvitedParties(String(user?.id));
	const [refreshing, setRefreshing] = useState(false);

	const { expoPushToken, setExpoPushToken } = usePermissionStore();
	const notificationListener = useRef<Notifications.Subscription>();
	const responseListener = useRef<Notifications.Subscription>();
	const { setNotification } = useNotificationStore();
	const { handleSubmit: setPushNotificationToUser } = usePermission();

	useEffect(() => {
		registerForPushNotificationsAsync()
			.then(token => {
				setExpoPushToken(token ?? '');
				setPushNotificationToUser({ pushNotificationToken: token ?? '' });
			})
			.catch((error: any) => setExpoPushToken(`${error}`));

		notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
			setNotification(notification);
		});

		responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
			console.log(response);
		});

		return () => {
			notificationListener.current &&
				Notifications.removeNotificationSubscription(notificationListener.current);
			responseListener.current &&
				Notifications.removeNotificationSubscription(responseListener.current);
		};
	}, []);



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
		<SafeContainer>
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
								style={styles.flatlist}
							/>
						</TabView.Item>
						<TabView.Item style={{ width: "100%" }}>
							<FlatList
								refreshing={refreshing}
								onRefresh={onInvitedPartiesRefresh}
								data={invitedParties}
								renderItem={({ item }) => <PartyItemList party={item} />}
								keyExtractor={(item) => String(item.id)}
								style={styles.flatlist}
							/>
						</TabView.Item>
					</TabView>
				</View>
			</View>
		</SafeContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#fff",
	},
	flatlist: {
		flex: 1,
		width: "100%",
		top: 10,
	},
	list: {
		flex: 1,
		width: "100%",
		top: 10,
		backgroundColor: "white",
		borderRadius: 5,
	},
});
