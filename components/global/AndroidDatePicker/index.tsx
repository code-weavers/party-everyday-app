import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";

interface InputDatePickerProps {
	value: Date;
	setValue: (date: Date) => void;
	setOpen: (open: boolean) => void;
}

export default function InputAndroidDatePicker({
	value,
	setValue,
	setOpen,
}: InputDatePickerProps) {
	const [date, setDate] = useState(new Date());
	const [mode, setMode] = useState('date');
	const [show, setShow] = useState(false);

	const onChange = (event: any, selectedDate: any) => {
		const currentDate = selectedDate || date;
		setShow(Platform.OS === 'ios');
		setDate(currentDate);
		setValue(currentDate);
	};

	const showMode = (currentMode: any) => {
		setShow(true);
		setMode(currentMode);
	};

	const showDatepicker = () => {
		showMode('date');
	};

	const showTimepicker = () => {
		showMode('time');
	};

	return (
		<View>
			<View style={styles.buttonContainer}>
				<Pressable style={styles.button} onPress={showDatepicker}>
					<Text style={styles.text}>Data</Text>
				</Pressable>

				<Pressable style={styles.button} onPress={showTimepicker}>
					<Text style={styles.text}>Horário</Text>
				</Pressable>
			</View>
			<Text style={styles.display}>
				{date.toLocaleDateString()} {date.toLocaleTimeString()}
			</Text>

			<View style={styles.buttonContainer}>
				<Pressable style={styles.button} onPress={() => setOpen(false)}>
					<Text style={styles.text}>Pronto</Text>
				</Pressable>
			</View>
			{show && (
				<DateTimePicker
					testID="dateTimePicker"
					value={date}
					//@ts-ignore
					mode={mode}
					is24Hour={true}
					display="default"
					onChange={onChange}
				/>
			)}
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
	display: {
		fontSize: 20,
		textAlign: "center",
		fontWeight: "bold",
		margin: 16,
		padding: 16,
	}
});
