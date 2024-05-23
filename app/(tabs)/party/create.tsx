import { PartyStep } from "@/constants/Party";
import { ReactNode, useEffect, useState } from "react";
import GuestListScreen from "./guests";
import InformationPartyScreen from "./informations";
import PartySubmitScreen from "./submit";
import PartySummaryScreen from "./summary";

export default function PartyCreateScreen() {
   const [step, setStep] = useState<number>(PartyStep.Information);
   const handleSubmit = () => {
      //start animation, on click the submit button send to new component with image set timeout to 3 seconds and redirect to home
   };

   useEffect(() => {}, [step]);

   return <>{renderStep(step, setStep, handleSubmit)}</>;
}

function renderStep(
   step: number,
   set: (step: number) => void,
   handleSubmit: () => void
): ReactNode {
   switch (step) {
      case PartyStep.Information:
         return <InformationPartyScreen onNext={() => set(PartyStep.Guests)} />;
      case PartyStep.Guests:
         return (
            <GuestListScreen
               onPrevious={() => set(PartyStep.Information)}
               onNext={() => set(PartyStep.Summary)}
            />
         );
      case PartyStep.Summary:
         return (
            <PartySummaryScreen
               onPrevious={() => set(PartyStep.Guests)}
               onNext={() => set(PartyStep.Submit)}
            />
         );
      case PartyStep.Submit:
         return <PartySubmitScreen />;
      default:
         return <></>;
   }
}
