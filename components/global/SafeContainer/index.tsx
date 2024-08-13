import { ReactNode } from "react";
import { SafeAreaView, StyleSheet } from "react-native";

interface SafeContainerProps {
	children: React.ReactNode;
}

export default function SafeContainer({
	children,
}: SafeContainerProps): ReactNode {
	return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 0,
	},
	scrollView: {
		flex: 1,
	},
});
