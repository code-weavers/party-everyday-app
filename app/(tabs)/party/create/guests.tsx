import ItemList from "@/components/ItemList";
import CustomFlatList from "@/components/global/CustomFlatList";
import CustomSubTitle from "@/components/global/CustomSubTitle";
import CustomTitle from "@/components/global/CustomTitle";
import StepperButton from "@/components/global/StepperButton";
import { PartyStep } from "@/constants/Party";
import { useCreatePartyStore } from "@/hooks/useCreatePartyStore";
import { useUserStore } from "@/hooks/useUserStore";
import { useGetAllUsers } from "@/hooks/user/useGetAllUsers";
import { IGuest } from "@/interfaces/guest.interface";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

interface GuestListScreenProps {
	onPrevious: () => void;
	onNext: () => void;
}

export default function GuestListScreen({
	onPrevious,
	onNext,
}: GuestListScreenProps) {
	const { user } = useUserStore();
	const { users, refetch, isLoading } = useGetAllUsers();
	const { party, setParty } = useCreatePartyStore();
	const [refreshing, setRefreshing] = useState(false);
	const queryClient = useQueryClient();

	const guests: IGuest[] = users
		.map((user) => ({
			user,
			selected: false,
		}))
		.filter((guest) => guest.user.id !== user?.id);

	useEffect(() => {
		refetch();
	}, [users, refetch]);

	const onRefresh = () => {
		setRefreshing(true);
		queryClient.refetchQueries({ queryKey: ["users"] });
		setRefreshing(false);
	};

	const handleNext = async () => {
		const selectedGuests = guests.filter((guest) => guest.selected);

		setParty({
			...party,
			guests: selectedGuests,
		});

		onNext();
	};

	return (
		<View style={styles.container}>
			<View>
				<CustomTitle title="Select your guests" />
				<CustomSubTitle subtitle="You can select your guests for the party" />
			</View>

			<CustomFlatList
				items={guests}
				onRefresh={onRefresh}
				refreshing={refreshing}
			>
				{(item) => <ItemList guest={item} />}
			</CustomFlatList>

			<StepperButton
				steps={3}
				currentStep={PartyStep.Guests}
				onPrevious={onPrevious}
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
	flatList: {
		flex: 1,
		maxHeight: "70%",
		width: "100%",
		top: 10,
	},
});
