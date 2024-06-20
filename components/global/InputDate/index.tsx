import { formatBRDateTime } from "@/utils";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { IconButton, TextInput } from "@react-native-material/core";
import { Dialog } from "@rneui/themed";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { StyleSheet } from "react-native";
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
					<TextInput
						variant={"outlined"}
						label={label}
						placeholder={placeholder}
						value={formatBRDateTime(date.toString())}
						editable={false}
						onChangeText={(text) => {
							setValue(date.toString());
							onChange(text);
						}}
						style={{ marginTop: 16, marginLeft: 16, marginRight: 16 }}
						trailing={(props) => (
							<IconButton
								icon={(props) => <Icon name={"calendar"} {...props} />}
								onPress={() => {
									setShowDatePicker(!showDatePicker);
									setVisible(true);
								}}
							/>
						)}
					/>
				)}
			/>

			<Dialog isVisible={visible} onBackdropPress={() => setVisible(false)}>
				<Dialog.Title title="Select Date" />
				<InputDatePicker setOpen={setVisible} setValue={setDate} />
			</Dialog>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F5FCFF",
	},
});
