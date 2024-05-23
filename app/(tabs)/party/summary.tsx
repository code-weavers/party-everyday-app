import ItemList from "@/components/ItemList";
import CustomSubTitle from "@/components/global/CustomSubTitle";
import CustomTitle from "@/components/global/CustomTitle";
import StepperButton from "@/components/global/StepperButton";
import { PartyStep } from "@/constants/Party";
import { useGetAllUsers } from "@/hooks/user/useGetAllUsers";
import { IGuest } from "@/interfaces/guest.interface";
import { formatBRDate } from "@/utils";
import { FlatList, StyleSheet, Text, View } from "react-native";

interface PartySummaryScreenProps {
   onPrevious: () => void;
   onNext: () => void;
}

const newPartyMock = {
   name: "Party",
   description: "Party description",
   date: "2021-09-15",
   locationDescription: "Fernandópolis, São Paulo, Brasil",
};

export default function PartySummaryScreen({
   onPrevious,
   onNext,
}: PartySummaryScreenProps) {
   const { users } = useGetAllUsers();
   const guests: IGuest[] = users.map((user) => ({
      user,
      selected: true,
   }));

   return (
      <>
         <View style={styles.container}>
            <View>
               <CustomTitle title="Summary" />
               <CustomSubTitle subtitle="Check if everything is correct" />
            </View>

            <View style={styles.summary}>
               <View style={styles.information}>
                  <Information title="Name" description={newPartyMock.name} />
                  <Information
                     title="Description"
                     description={newPartyMock.description}
                  />
                  <Information
                     title="Date"
                     description={formatBRDate(newPartyMock.date)}
                  />
                  <Information
                     title="Location"
                     description={newPartyMock.locationDescription}
                  />
               </View>
               <View style={styles.guests}>
                  <FlatList
                     data={guests}
                     renderItem={({ item }) => <ItemList guest={item} />}
                     keyExtractor={(item) => item.user.id}
                  />
               </View>
            </View>

            <StepperButton
               steps={3}
               currentStep={PartyStep.Summary}
               onPrevious={onPrevious}
               onNext={onNext}
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
      paddingRight: 16,
      paddingLeft: 16,
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
