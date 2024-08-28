import SafeContainer from "@/components/global/SafeContainer";
import { useColorScheme } from "@/hooks/useColorScheme";
import { initSocket } from "@/services/Socket";
import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
	useNavigation,
} from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import * as Notifications from 'expo-notifications';
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useRef } from "react";
import "react-native-reanimated";

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: false,
		shouldSetBadge: false,
	}),
});

initSocket();

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const navigation = useNavigation();
	const navigationRef = useRef(navigation);

	useEffect(() => {
		const subscription = Notifications.addNotificationResponseReceivedListener(response => {
			const { screen, params } = response.notification.request.content.data;
			if (screen && navigationRef.current) {
				navigationRef.current.navigate(screen, params);
			}
		});

		return () => subscription.remove();
	}, []);

	const colorScheme = useColorScheme();
	const [loaded] = useFonts({
		SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
	});

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	const queryClient = new QueryClient();

	return (
		<ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
			<SafeContainer>
				<QueryClientProvider client={queryClient}>
					<Stack>
						<Stack.Screen
							name="(tabs)"
							options={{ headerShown: false }}
						/>
						<Stack.Screen name="+not-found" />
					</Stack>
				</QueryClientProvider>
			</SafeContainer>
		</ThemeProvider>
	);
}
