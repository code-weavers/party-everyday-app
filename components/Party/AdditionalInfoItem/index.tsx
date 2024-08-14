import InputNumber from "@/components/global/InputNumber";
import InputText from "@/components/global/InputText";
import { useCreateAdditionalInfo } from "@/hooks/party/useCreateAdditionalInfo";
import { useDeleteAdditionalInfo } from "@/hooks/party/useDeleteAdditionalInfo";
import { IAdditionalInfo } from "@/interfaces/party.interface";
import { formatBRCurrency } from "@/utils";
import { Button, Icon, ListItem } from "@rneui/base";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

interface PartyAdditionalInfoProps {
   partyId: string;
   additionalInfo: IAdditionalInfo;
}

export default function AdditionalInfoItem({
   partyId,
   additionalInfo,
}: PartyAdditionalInfoProps) {
   const [isEditing, setIsEditing] = useState<boolean>(false);
   const { name, setName, value, setValue, handleSubmit } =
      useCreateAdditionalInfo(partyId);
   const { handleSubmit: handleDelete } = useDeleteAdditionalInfo(partyId);
   const isNew = additionalInfo.id === "new";

   return (
      <ListItem style={styles.container}>
         <ListItem.Content>
            {isNew ? (
               <EditingContent
                  name={name}
                  setName={setName}
                  value={value}
                  setValue={setValue}
               />
            ) : (
               <Content
                  name={additionalInfo.name}
                  value={formatBRCurrency(additionalInfo.value)}
               />
            )}
         </ListItem.Content>
         <View style={styles.actionButtonContainer}>
            {isNew ? (
               <View style={styles.editContainerButton}>
                  <Button radius={"sm"} type="solid" color={"success"}>
                     <Icon name="add" color="white" onPress={handleSubmit} />
                  </Button>
               </View>
            ) : (
               <ActionButton
                  handleEdit={() => setIsEditing(!isEditing)}
                  handleDelete={() => handleDelete(additionalInfo.id)}
               />
            )}
         </View>
      </ListItem>
   );
}

interface ContentProps {
   name: string;
   value: string;
}

function Content({ name, value }: ContentProps) {
   return (
      <>
         <ListItem.Title style={{ color: "black", fontWeight: "bold" }}>
            {name}
         </ListItem.Title>
         <ListItem.Subtitle style={{ color: "black", fontWeight: "condensed" }}>
            {value}
         </ListItem.Subtitle>
      </>
   );
}

interface EditingContentProps {
   name: string;
   setName: (name: string) => void;
   value: string;
   setValue: (value: string) => void;
}

function EditingContent({
   name,
   setName,
   value,
   setValue,
}: EditingContentProps) {
   return (
      <View style={styles.editContainer}>
         <View style={styles.inputNameContainer}>
            <InputText
               placeholder="Name"
               value={name}
               setValue={setName}
               styleProps={styles.inputName}
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

interface ActionButtonProps {
   handleEdit: () => void;
   handleDelete: () => void;
}

function ActionButton({ handleEdit, handleDelete }: ActionButtonProps) {
   return (
      <>
         {/*
               <Button radius={"sm"} type="solid" color={"primary"}>
            <Icon name="edit" color="white" onPress={handleEdit} />
         </Button>
       */}
         <Button radius={"sm"} type="solid" color={"error"}>
            <Icon name="delete" color="white" onPress={handleDelete} />
         </Button>
      </>
   );
}

interface EditingActionButtonProps {
   handleSave: () => void;
   handleCancel: () => void;
}

function EditingActionButton({
   handleSave,
   handleCancel,
}: EditingActionButtonProps) {
   return (
      <>
         <Button radius={"sm"} type="solid" color={"success"}>
            <Icon name="save" color="white" onPress={handleSave} />
         </Button>
         <Button radius={"sm"} type="solid" color={"error"}>
            <Icon name="close" color="white" onPress={handleCancel} />
         </Button>
      </>
   );
}

const styles = StyleSheet.create({
   container: {
      backgroundColor: "white",
      marginVertical: 5,
      borderRadius: 5,
      padding: 5,
      maxWidth: "95%",
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
   inputName: {
      paddingLeft: 10,
   },
   inputValueContainer: {
      width: 120,
   },
});
