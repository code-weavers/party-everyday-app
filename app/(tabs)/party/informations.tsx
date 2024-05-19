import InputDate from "@/components/global/InputDate";
import InputMap from "@/components/global/InputMap";
import InputText from "@/components/global/InputText";
import StepperButton from "@/components/global/StepperButton";
import { PartyStep } from "@/constants/Party";
import { ICoordinates } from "@/interfaces/coordinates.interface";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

interface InformationPartyScreenProps {
   onNext: () => void;
}

export default function InformationPartyScreen({
   onNext,
}: InformationPartyScreenProps) {
   const [name, setName] = useState<string>("");
   const [description, setDescription] = useState<string>("");
   const [date, setDate] = useState<string>("");
   const [location, setLocation] = useState<ICoordinates>({
      latitude: 0,
      longitude: 0,
   });

   return (
      <View style={styles.container}>
         <Text
            style={{
               fontSize: 24,
               fontWeight: "bold",
               margin: 16,
            }}
         >
            Create your Party
         </Text>
         <Text
            style={{
               fontSize: 20,
               margin: 16,
            }}
         >
            Plase fill the form below
         </Text>
         <InputText
            label="Name"
            placeholder="Let's set an name for your party"
            value={name}
            setValue={setName}
         />
         <InputText
            label="Description"
            placeholder="Let's set an description for your party"
            value={description}
            setValue={setDescription}
         />
         <InputDate
            label="Date"
            placeholder={"Your party date"}
            value={date}
            setValue={setDate}
         />
         <InputMap location={location} setLocation={setLocation} />
         <StepperButton
            steps={3}
            currentStep={PartyStep.Information}
            onNext={onNext}
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
});
