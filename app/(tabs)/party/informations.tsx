import CustomSubTitle from "@/components/global/CustomSubTitle";
import CustomTitle from "@/components/global/CustomTitle";
import InputDate from "@/components/global/InputDate";
import InputMap from "@/components/global/InputMap";
import InputText from "@/components/global/InputText";
import StepperButton from "@/components/global/StepperButton";
import { PartyStep } from "@/constants/Party";
import { ICoordinates } from "@/interfaces/coordinates.interface";
import StorageUtils from "@/utils/storage.utils";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

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

   const handleNext = () => {
      StorageUtils.set(
         "new-party",
         JSON.stringify({
            name,
            description,
            date,
            location,
            guests: [],
         })
      );
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
