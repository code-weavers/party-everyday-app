import { Controller } from "react-hook-form";
import { StyleSheet, Text, TextInput, View } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useState } from "react";
import { firstLetterUpperCase } from "@/utils";

interface InputTextProps {
	label: string;
	placeholder: string;
	value: string;
	setValue: (text: string) => void;
	icon?: string;
	control?: any;
	error?: any
}

export default function InputText({
	label,
	placeholder,
	value,
	setValue,
	icon,
	control,
	error
}: InputTextProps) {
	return (
		<>
			<Controller
				control={control}
				rules={{ required: true }}
				render={({ field: { onBlur } }) => (
					<View style={styles.container}>
						{/*icon && <Icon name={icon} size={20} color="#000" style={styles.icon} />*/}
						<TextInput
							placeholder={placeholder}
							placeholderTextColor={"#000"}
							value={value}
							onChangeText={(text) => {setValue(text)}}
							autoCorrect={true}
							autoCapitalize="none"
							style={styles.input}
						/>
					</View>
				)}
				name={label}
			/>
      		{error[label] && <Text>{firstLetterUpperCase(label)} is required</Text>}
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
