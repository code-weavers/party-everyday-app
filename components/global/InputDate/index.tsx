import { formatBRDateTime } from "@/utils";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Dialog } from "@rneui/themed";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { StyleSheet, TextInput, View } from "react-native";
import InputDatePicker from "../DatePicker";

interface InputDateProps {
	label: string;
	placeholder: string;
	value: string;
	setValue: (date: string) => void;
	control?: any;
}

export default function InputDate({
	label,
	placeholder,
	value,
	setValue,
	control,
}: InputDateProps) {
	const [date, setDate] = useState<Date>(new Date());
	const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		setValue(date.toString());
	}, [date]);

	return (
		<>
			<Controller
				control={control}
				name={label}
				rules={{ required: `${label} is required` }}
				render={({ field: { onChange, value } }) => (
					<View style={styles.container}>
						<TextInput
							placeholder={placeholder}
							editable={false}
							value={formatBRDateTime(date.toString())}
							onChangeText={(text) => {
								setValue(date.toString());
								onChange(text);
							}}
							autoCorrect={true}
							autoCapitalize="none"
							style={styles.input}
						/>
						<Icon
							name={'calendar'}
							size={20}
							color="#000"
							style={styles.icon}	
							onPress={() => {
								setShowDatePicker(!showDatePicker);
								setVisible(true);
							}}
						/>
				</View>
				)}
			/>

			<Dialog isVisible={visible} onBackdropPress={() => setVisible(false)}>
				<Dialog.Title title="Select Date" />
				<InputDatePicker setOpen={setVisible} value={new Date(value)} setValue={setDate} />
			</Dialog>
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
