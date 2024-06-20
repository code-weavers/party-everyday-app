import { formatToTimestamp } from "@/utils";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import DatePicker from "react-native-modern-datepicker";

interface InputDatePickerProps {
	setValue: (date: Date) => void;
	setOpen: (open: boolean) => void;
}

export default function InputDatePicker({
	setValue,
	setOpen,
}: InputDatePickerProps) {
	const [selectedDate, setSelectedDate] = useState<string>("");

	return (
		<View>
			<DatePicker
				onSelectedChange={(date) => setSelectedDate(date)}
				options={{
					textHeaderColor: "#3f51b5",
					textDefaultColor: "#000000",
					selectedTextColor: "#ffffff",
					mainColor: "#000",
					textSecondaryColor: "#000000",
				}}
				selected={selectedDate}
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
					onPress={() => {
						const formattedDate = formatToTimestamp(selectedDate);
						setValue(new Date(formattedDate));
						setOpen(false);
					}}
				>
					<Text style={styles.text}>Confirm</Text>
				</Pressable>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
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
