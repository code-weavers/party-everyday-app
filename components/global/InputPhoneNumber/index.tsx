import { firstLetterUpperCase } from "@/utils";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";
import PhoneInput, { ICountry } from "react-native-international-phone-number";
import { ICountryName } from "react-native-international-phone-number/lib/interfaces/countryName";

interface InputPhoneNumberProps {
   label: string;
   placeholder: string;
   value: string;
   setValue: (text: string) => void;
   control?: any;
   error?: any;
}

export default function InputPhoneNumber({
   label,
   value,
   setValue,
   control,
   error,
}: InputPhoneNumberProps) {
   const countryName: ICountryName = {
      en: 'United States',
      ru: 'Russian Federation',
      pl: 'Polska',
      ua: 'Ukraine',
      cz: 'Česká republika',
      by: 'Belarus',
      pt: 'Brasil',
      es: 'España',
      ro: 'România',
      bg: 'Bulgaria',
      de: 'Deutschland',
      fr: 'France',
      nl: 'Nederland',
      it: 'Italia',
      cn: 'China',
      ee: 'Eesti',
      jp: 'Japan',
      he: 'Hebrew',
      ar: 'Arabic',
   };
   const [selectedCountry, setSelectedCountry] = useState<ICountry>({
      cca2: "BR",
      callingCode: "55",
      flag: "🇧🇷",
      name: countryName,
   });
   return (
      <>
         <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
               <View style={styles.container}>
                  <PhoneInput
                     value={value}
                     onChangePhoneNumber={(text) => {
                        onChange(text);

                        const formattedPhoneNumber = text.replace(/ /g, '');
                        const countryCode = selectedCountry.callingCode;

                        setValue(`${countryCode}${formattedPhoneNumber}`);
                     }}
                     selectedCountry={selectedCountry}
                     onChangeSelectedCountry={setSelectedCountry}
                     placeholder="Enter phone number"
                     phoneInputStyles={{
                        container: {
                           borderWidth: 1,
                           borderColor: "#000",
                           borderRadius: 5,

                           flexDirection: 'row',
                           alignItems: 'center',

                           height: 55,
                           marginBottom: -15,
                        },
                        flagContainer: {
                           backgroundColor: "#fff",
                        },
                        input: {
                           fontSize: 16,
                        },
                     }}
                  />
               </View>
            )}
            name={label}
         />
         {error?.telephoneNumber && <Text>{firstLetterUpperCase(label)} is required</Text>}
      </>
   );
}

const styles = StyleSheet.create({
   container: {
      padding: 16,

      flexDirection: 'row',
      alignItems: 'center',
   },
   icon: {
      marginRight: 10,
   },
   input: {
      flex: 1,
      fontSize: 16,
   }
});