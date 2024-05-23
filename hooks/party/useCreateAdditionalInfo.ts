import { useState } from "react";
import { useToast } from "../useToast";

export const useCreateAdditionalInfo = () => {
   const [name, setName] = useState<string>("");
   const [value, setValue] = useState<string>("");
   const { showToast } = useToast();

   const handleSubmit = () => {
      console.log("Submit", { name, value, });

      // Save to the database

      setName("");
      setValue("");

      showToast("Additional info created", "success");
   };

   return {
      name,
      setName,
      value,
      setValue,
      handleSubmit,
   };
}