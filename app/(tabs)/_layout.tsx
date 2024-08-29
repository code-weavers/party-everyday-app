import { usePermission } from "@/hooks/auth/usePermission";
import { useNotificationStore } from "@/hooks/useNotificationStore";
import { usePermissionStore } from "@/hooks/usePermissionStore";
import { useUserStore } from "@/hooks/useUserStore";
import { useGetUser } from "@/hooks/user/useGetUser";
import { registerForPushNotificationsAsync } from "@/services/Notification";
import * as Notifications from 'expo-notifications';
import { useEffect, useRef } from "react";
import AuthenticatedTabs from "../authenticatedTabs";
import UnauthenticatedTabs from "../unauthenticatedTabs";


export default function TabLayout() {
	const { user } = useUserStore();
	const { setExpoPushToken } = usePermissionStore();
	const { setNotification } = useNotificationStore();
	const { user: userQuery } = useGetUser();
	const notificationListener = useRef<Notifications.Subscription>();
	const responseListener = useRef<Notifications.Subscription>();
	const { handleSubmit: setPushNotificationToUser } = usePermission();

	useEffect(() => {
		registerForPushNotificationsAsync()
			.then(token => {
				setExpoPushToken(token ?? '');
				if (!user?.pushNotificationToken) setPushNotificationToUser({ pushNotificationToken: token ?? '' });
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

	const userVerify = user || userQuery;

	return userVerify ? <AuthenticatedTabs /> : <UnauthenticatedTabs />;
}
