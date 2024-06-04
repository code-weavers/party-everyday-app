import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { IconButton, TextInput } from "@react-native-material/core";
import { useState } from "react";
import { Controller } from "react-hook-form";

interface InputPasswordProps {
	label: string;
	placeholder: string;
	value: string;
	setValue: (text: string) => void;
	control?: any;
}

export default function InputPassword({
	label,
	placeholder,
	value,
	setValue,
	control,
}: InputPasswordProps) {
	const [secureTextEntry, setSecureTextEntry] = useState(true);

	return (
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
					style={{ margin: 16 }}
					secureTextEntry={secureTextEntry}
					textContentType="password"
					trailing={(props) => (
						<IconButton
							icon={(props) => (
								<Icon
									name={secureTextEntry ? "eye" : "eye-off"}
									{...props}
								/>
							)}
							onPress={() => setSecureTextEntry(!secureTextEntry)}
						/>
					)}
				/>
			)}
		/>
	);
}
