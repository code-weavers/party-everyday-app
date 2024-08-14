import { firstLetterUpperCase } from "@/utils";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { StyleSheet, Text, TextInput, View } from "react-native";

interface InputPasswordProps {
	label: string;
	placeholder: string;
	value: string;
	setValue: (text: string) => void;
	control?: any;
	error?: any;
}

export default function InputPassword({
	label,
	placeholder,
	value,
	setValue,
	control,
	error,
}: InputPasswordProps) {
	const [secureTextEntry, setSecureTextEntry] = useState(true);

	return (
		<Controller
			control={control}
			name={label}
			rules={{ required: `${label} is required` }}
			render={({ field: { onChange, value } }) => (
				<View style={styles.container}>
					<Icon name={'lock-outline'} size={20} color="#000" style={styles.icon} />
					<TextInput
						placeholder={placeholder}
						placeholderTextColor={"#000"}
						value={value}
						onChangeText={(text) => {
							setValue(text);
							onChange(text);
						}}
						autoCorrect={true}
						autoCapitalize="none"
						style={styles.input}
						secureTextEntry={secureTextEntry}
						textContentType="password"
					/>
					{
						secureTextEntry ? (
							<Icon
								name="eye-off-outline"
								size={20}
								color="#000"
								onPress={() => setSecureTextEntry(false)}
							/>
						) : (
							<Icon
								name="eye-outline"
								size={20}
								color="#000"
								onPress={() => setSecureTextEntry(true)}
							/>
						)
					}
					{error?.password && <Text>{firstLetterUpperCase(label)} is required</Text>}
				</View>
			)}
		/>
	);
}

const styles = StyleSheet.create({
	container: {
		borderWidth: 1,
		borderColor: "#000",
		borderRadius: 5,

		marginTop: 16,
		marginLeft: 16,
		marginRight: 16,
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
