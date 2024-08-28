import { StyleProp, StyleSheet, TextInput, TextStyle, View } from "react-native";

interface InputTextProps {
	placeholder: string;
	value: string;
	setValue: (text: string) => void;
	styleProps?: StyleProp<TextStyle>;
}

export default function Input({
	placeholder,
	value,
	setValue,
	styleProps,
}: InputTextProps) {
	return (
		<View style={styles.container}>
			<TextInput
				placeholder={placeholder}
				placeholderTextColor={"#000"}
				value={value}
				onChangeText={(text) => { setValue(text) }}
				autoCorrect={true}
				autoCapitalize="none"
				style={[styles.input, styleProps]}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		borderWidth: 1,
		borderColor: "#000",
		borderRadius: 5,
		padding: 16,
		flexDirection: 'row',
		alignItems: 'center',
	},
	icon: {
		marginRight: 10,
	},
	input: {
		flex: 1,
		fontSize: 16,
	},
});
