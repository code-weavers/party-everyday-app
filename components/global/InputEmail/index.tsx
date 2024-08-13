import { Controller } from "react-hook-form";
import { StyleSheet, Text, TextInput, View } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

interface InputEmailProps {
	label: string;
	placeholder: string;
	value: string;
	setValue: (text: string) => void;
	control?: any;
}

export default function InputEmail({
	label,
	placeholder,
	value,
	setValue,
	control,
}: InputEmailProps) {
	return (
		<>
			<Controller
				control={control}
				name={label}
				rules={{
					required: `${label} is required`,
					pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
				}}
				render={({ field: { onChange, value } }) => (					
					<View style={styles.container}>
						<Icon name={'email-outline'} size={20} color="#000" style={styles.icon} />
						<TextInput
							placeholder={placeholder}
							placeholderTextColor={"#000"}
							value={value}
							onChangeText={(text) => {
								setValue(text);
								onChange(text);
							}}
							textContentType="emailAddress"
							autoCorrect={true}
							autoCapitalize="none"
							style={styles.input}
						/>
					</View>
				)}
			/>
		</>
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
