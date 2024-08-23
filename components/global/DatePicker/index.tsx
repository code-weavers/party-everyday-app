import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface InputDatePickerProps {
	value: Date;
	setValue: (date: Date) => void;
	setOpen: (open: boolean) => void;
}

export default function InputDatePicker({
	value,
	setValue,
	setOpen,
}: InputDatePickerProps) {
	const [selectedDate, setSelectedDate] = useState<string>("");

	return (
		<View style={styles.container}>
			<DateTimePicker
				value={value}
				onChange={(event, date) => {
					if (date) setValue(date);
				}}
				mode={'datetime'}
				style={styles.datepicker}
			/>

			<View style={styles.buttonContainer}>
				<Pressable
					style={styles.button}
					onPress={() => {
						setOpen(false);
					}}
				>
					<Text style={styles.text}>Cancel</Text>
				</Pressable>
				<Pressable
					style={styles.button}
					onPress={() => { setOpen(false) }}
				>
					<Text style={styles.text}>Confirm</Text>
				</Pressable>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		alignItems: "center",
	},
	datepicker: {
		margin: 16,
	},
	buttonContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		width: "100%",
		top: 10,
	},
	button: {
		backgroundColor: "black",
		padding: 16,
		borderRadius: 5,
		elevation: 2,
		width: "47%",
	},
	text: {
		color: "white",
		textAlign: "center",
	},
});
