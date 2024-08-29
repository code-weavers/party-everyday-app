import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from "react-native";

interface InputDatePickerProps {
	value: Date;
	setValue: (date: Date) => void;
	setOpen: (open: boolean) => void;
}

export default function InputIosDatePicker({
	value,
	setValue,
	setOpen,
}: InputDatePickerProps) {
	const [date, setDate] = useState(new Date());

	const onChange = (event: any, selectedDate: any) => {
		const currentDate = selectedDate || date;
		setValue(currentDate);
	};

	return (
		<View style={styles.container}>
			<DateTimePicker
				testID="iosDateTimePicker"
				value={value}
				mode={'datetime'}
				display="spinner"
				onChange={onChange}
				themeVariant={'light'}
				locale='pt-BR'
			/>

			<View style={styles.buttonContainer}>
				<Pressable style={styles.button} onPress={() => setOpen(false)}>
					<Text style={styles.text}>Pronto</Text>
				</Pressable>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		alignItems: "center",
		height: 300,
	},
	datepicker: {
		margin: 16,
	},
	buttonContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		width: "100%",
		top: 16,
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
	}
});
