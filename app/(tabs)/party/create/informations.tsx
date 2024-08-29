import CustomSubTitle from "@/components/global/CustomSubTitle";
import CustomTitle from "@/components/global/CustomTitle";
import InputDate from "@/components/global/InputDate";
import InputMap from "@/components/global/InputMap";
import InputText from "@/components/global/InputText";
import StepperButton from "@/components/global/StepperButton";
import { PartyStep } from "@/constants/Party";
import { useCreatePartyStore } from "@/hooks/useCreatePartyStore";
import { ICoordinates } from "@/interfaces/coordinates.interface";
import { getAddressByCoordinates } from "@/services/Google/geocoding.service";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";

interface InformationPartyScreenProps {
	onNext: () => void;
}

type FormData = {
	name: string;
	description: string;
	date: string;
	location: ICoordinates;
};

export default function InformationPartyScreen({
	onNext,
}: InformationPartyScreenProps) {
	const [name, setName] = useState<string>("");
	const [description, setDescription] = useState<string>("");
	const [date, setDate] = useState<string>("");
	const [location, setLocation] = useState<ICoordinates>({
		lat: "",
		lng: "",
	});
	const {
		control,
		handleSubmit,
		formState: { errors, isDirty, isSubmitting, isValid },
	} = useForm<FormData>({
		defaultValues: { name, description, date, location },
	});
	const { party, setParty } = useCreatePartyStore();

	const handleNext = async () => {
		const address = await getAddressByCoordinates({
			lat: location.lat,
			lng: location.lng,
		});

		//TODO: Verify if Date are being setted correctly and when the screen is being mounted set the fields with the values from the store

		setParty({
			name,
			description,
			date,
			address: {
				zipCode: address.zipCode,
				state: address.state,
				city: address.city,
				street: address.street,
				number: address.number,
				lat: location.lat,
				lng: location.lng,
			},
		});

		onNext();
	};

	return (
		<View style={styles.container}>
			<View>
				<CustomTitle title="Create your Party" />
				<CustomSubTitle subtitle="Plase fill the form below" />
			</View>

			<View style={styles.form}>
				<InputText
					placeholder="Let's set an name for your party"
					value={party?.name ? party?.name : name}
					setValue={setName}
				/>
				<InputText
					placeholder="Let's set an description for your party"
					value={party?.description ? party?.description : description}
					setValue={setDescription}
				/>
				<InputDate
					label="Date"
					placeholder={"Your party date"}
					value={party?.date ? party?.date : date}
					setValue={setDate}
					control={control}
				/>
				<InputMap
					location={location}
					setLocation={setLocation}
					control={control}
				/>
			</View>

			<StepperButton
				steps={3}
				currentStep={PartyStep.Information}
				onNext={handleNext}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		padding: 16,
	},
	form: {
		flex: 1,
		maxHeight: "70%",
		width: "100%",
		top: 10,
	},
});
