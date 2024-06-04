import { TextInput } from "@react-native-material/core";
import { Controller } from "react-hook-form";
import { StyleSheet } from "react-native";

interface InputTextProps {
	label: string;
	placeholder: string;
	value: string;
	setValue: (text: string) => void;
	control?: any;
}

export default function InputText({
	label,
	placeholder,
	value,
	setValue,
	control,
}: InputTextProps) {
	return (
		<>
			<Controller
				control={control}
				name={label}
				rules={{ required: `${label} is required` }}
				render={({ field: { onChange, value } }) => (
					<TextInput
						variant={"outlined"}
						label={label}
						placeholder={placeholder}
						value={value}
						onChangeText={(text) => {
							setValue(text);
							onChange(text);
						}}
						style={styles.input}
					/>
				)}
			/>
		</>
	);
}

const styles = StyleSheet.create({
	input: {
		marginTop: 16,
		marginLeft: 16,
		marginRight: 16,
	},
});
