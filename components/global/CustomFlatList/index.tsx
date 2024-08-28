import { FlatList, StyleSheet, View } from "react-native";

interface CustomFlatListProps {
	items: any[];
	children: (item: any) => JSX.Element;
	refreshing?: boolean;
	onRefresh?: () => void;
}

export default function CustomFlatList({
	items,
	children,
	refreshing,
	onRefresh,
}: CustomFlatListProps) {
	return (
		<View style={styles.flatList}>
			<FlatList
				refreshing={refreshing}
				onRefresh={onRefresh}
				onEndReachedThreshold={0.8}
				data={items}
				renderItem={({ item }) => children(item)}
				keyExtractor={(item) => item.user.id}
			/>
		</View>
	);
}
const styles = StyleSheet.create({
	flatList: {
		flex: 1,
		maxHeight: "70%",
		width: "100%",
		top: 10,
	},
});
