import ItemList from "@/components/ItemList";
import CustomSubTitle from "@/components/global/CustomSubTitle";
import CustomTitle from "@/components/global/CustomTitle";
import StepperButton from "@/components/global/StepperButton";
import { PartyStep } from "@/constants/Party";
import { useCreateParty } from "@/hooks/party/useCreateParty";
import { useCreatePartyStore } from "@/hooks/useCreatePartyStore";
import { IParty } from "@/interfaces/party.interface";
import { formatBRDateTime } from "@/utils";
import { FlatList, StyleSheet, Text, View } from "react-native";

interface PartySummaryScreenProps {
	onPrevious: () => void;
	onNext: () => void;
}

export default function PartySummaryScreen({
	onPrevious,
	onNext,
}: PartySummaryScreenProps) {
	const { party } = useCreatePartyStore();
	const { handleSubmit } = useCreateParty(party as unknown as IParty);

	const location =
		party?.address?.city +
		", " +
		party?.address?.state +
		", " +
		party?.address?.street +
		", " +
		party?.address?.number;

	const handleNext = async () => {
		await handleSubmit();

		onNext();
	};

	return (
		<>
			<View style={styles.container}>
				<View>
					<CustomTitle title="Summary" />
					<CustomSubTitle subtitle="Check if everything is correct" />
				</View>

				<View style={styles.summary}>
					<View style={styles.information}>
						<Information title="Name" description={String(party?.name)} />
						<Information
							title="Description"
							description={String(party?.description)}
						/>
						<Information
							title="Date"
							description={formatBRDateTime(String(party?.date))}
						/>
						<Information title="Location" description={location} />
					</View>
					<View style={styles.guests}>
						<FlatList
							data={party?.guests}
							renderItem={({ item }) => <ItemList guest={item} />}
							keyExtractor={(item) => item.user.id}
						/>
					</View>
				</View>

				<StepperButton
					steps={3}
					currentStep={PartyStep.Summary}
					onPrevious={onPrevious}
					onNext={handleNext}
				/>
			</View>
		</>
	);
}

interface InformationProps {
	title: string;
	description: string;
}

function Information({ title, description }: InformationProps) {
	return (
		<View style={styles.informationRow}>
			<Text style={styles.informationName}>{title}: </Text>
			<Text style={styles.informationDescription}>{description}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		padding: 16,
	},
	summary: {
		flex: 1,
		maxHeight: "70%",
		width: "100%",
		top: 10,
	},
	guests: {
		flex: 1,
		maxHeight: "70%",
		width: "100%",
		top: 10,
	},
	information: {
		flex: 1,
		padding: 16,
		backgroundColor: "#fff",
		borderRadius: 5,
		maxHeight: "30%",

		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	informationRow: {
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "center",
		marginBottom: 5,
	},
	informationName: {
		fontSize: 18,
		fontWeight: "bold",
	},
	informationDescription: {
		fontSize: 16,
	},
});
