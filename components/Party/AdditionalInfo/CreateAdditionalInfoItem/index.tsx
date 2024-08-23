import Input from "@/components/global/Input";
import InputNumber from "@/components/global/InputNumber";
import { AdditionalInfoType } from "@/enums";
import { useUserStore } from "@/hooks/useUserStore";
import { IAdditionalInfo } from "@/interfaces/party.interface";
import { formatBRCurrency } from "@/utils";
import { Button, Icon, ListItem } from "@rneui/base";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

interface PartyAdditionalInfoProps {
   additionalInfo: IAdditionalInfo;
   setAdditionalInfo: (additionalInfo: IAdditionalInfo) => void;
   handleDelete: () => void;
   additionalInfoType: AdditionalInfoType;
}

export default function CreateAdditionalInfoItem({
   additionalInfo,
   setAdditionalInfo,
   handleDelete,
   additionalInfoType,
}: PartyAdditionalInfoProps) {
   const [name, setName] = useState("");
   const [value, setValue] = useState(0);
   const { user } = useUserStore()
   const isNew = additionalInfo.id === "new";

   const removeComma = (value: number) => {
      return Number(value.toString().replace(/,/g, ''));
   }

   const handleAdd = () => {
      const formattedName = additionalInfoType === AdditionalInfoType.PAYMENT ? name.trim() + ' - ' + user?.username : name.trim();

      setAdditionalInfo({ id: '', userId: String(user?.id), name: formattedName, value: Number(removeComma(value)), type: additionalInfoType });
      setName("");
      setValue(0);
   }

   return (
      <ListItem style={styles.container}>
         <ListItem.Content>
            {isNew ? (
               <NewAdditionalInfoContent
                  name={name}
                  setName={setName}
                  value={value}
                  setValue={setValue}
               />
            ) : (
               <AdditionalInfoContent
                  name={additionalInfo.name}
                  value={formatBRCurrency(additionalInfo.value)}
               />
            )}
         </ListItem.Content>
         <View style={styles.actionButtonContainer}>
            {isNew ? (
               <View style={styles.editContainerButton}>
                  <Button radius={"sm"} type="solid" color={"success"}>
                     <Icon name="add" color="white" onPress={handleAdd} />
                  </Button>
               </View>
            ) : (
               <Button radius={"sm"} type="solid" color={"error"} onPress={handleDelete}>
                  <Icon name="delete" color="white" />
               </Button>
            )}
         </View>
      </ListItem>
   );
}

function AdditionalInfoContent({ name, value }: any) {
   return (
      <View>
         <ListItem.Title style={{ color: "black", fontWeight: "bold" }}>
            {name}
         </ListItem.Title>
         <ListItem.Subtitle style={{ color: "black", fontWeight: "condensed" }}>
            {value}
         </ListItem.Subtitle>
      </View>
   );
}

function NewAdditionalInfoContent({ name, setName, value, setValue }: any) {
   return (
      <View style={styles.editContainer}>
         <View style={styles.inputNameContainer}>
            <Input
               placeholder="Name"
               value={name}
               setValue={setName}
            />
         </View>

         <View style={styles.inputValueContainer}>
            <InputNumber
               placeholder="R$ 0,00"
               value={value}
               setValue={setValue}
            />
         </View>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      backgroundColor: "white",
      marginVertical: 5,
      borderRadius: 5,
      paddingBottom: 5,
      paddingTop: 5,
      maxWidth: "99%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      alignSelf: "center",

      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
   },
   actionButtonContainer: {
      flexDirection: "row",
      justifyContent: "flex-end", //If have more than one button, use space-between
      alignItems: "center",
      width: 100,
   },
   editContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: 310,
   },
   editContainerButton: {
      justifyContent: "center",
      alignItems: "center",
   },
   inputNameContainer: {
      width: 180,
   },
   inputValueContainer: {
      width: 120,
   },
});
