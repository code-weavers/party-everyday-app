import { PartyStep } from "@/constants/Party";
import { useEffect, useState } from "react";
import GuestListScreen from "./guests";
import InformationPartyScreen from "./informations";

export default function CreatePartyScreen() {
   const [step, setStep] = useState<number>(PartyStep.Information);

   useEffect(() => {}, [step]);

   return <>{renderStep(step, setStep)}</>;
}

function renderStep(step: number, set: (step: number) => void) {
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
         return <></>;
      default:
         return <></>;
   }
}
