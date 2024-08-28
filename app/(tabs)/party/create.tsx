import { PartyStep } from "@/constants/Party";
import { useCreatePartyStore } from "@/hooks/useCreatePartyStore";
import { ReactNode, useEffect, useState } from "react";
import GuestListScreen from "./create/guests";
import InformationPartyScreen from "./create/informations";
import PartySubmitScreen from "./create/submit";
import PartySummaryScreen from "./create/summary";

export default function PartyCreateScreen() {
   const [step, setStep] = useState<number>(PartyStep.Information);
   const { setParty } = useCreatePartyStore();
   const handleSubmit = () => { }

   useEffect(() => {
      if (step === PartyStep.Submit) setParty(undefined);
   }, [step]);

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
