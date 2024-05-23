import { useCreateAdditionalInfo } from "@/hooks/party/useCreateAdditionalInfo";
import { IAdditionalInfo } from "@/interfaces/party.interface";
import { formatBRCurrency } from "@/utils";
import { TextInput } from "@react-native-material/core";
import { Button, Icon, ListItem } from "@rneui/base";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

interface PartyAdditionalInfoProps {
   additionalInfo: IAdditionalInfo;
}

export default function AdditionalInfoItem({
   additionalInfo,
}: PartyAdditionalInfoProps) {
   const [isEditing, setIsEditing] = useState<boolean>(false);
   const { name, setName, value, setValue, handleSubmit } =
      useCreateAdditionalInfo();
   const isNew = additionalInfo.id === "new";

   const handleDelete = (id: string) => {
      console.log("Delete", id);
   };

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
               <Button radius={"sm"} type="solid" color={"success"}>
                  <Icon name="add" color="white" onPress={handleSubmit} />
               </Button>
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
         <TextInput
            variant={"outlined"}
            label={"Name"}
            placeholder={"Name"}
            value={name}
            onChangeText={(text) => setName(text)}
            style={styles.inputName}
         />
         <TextInput
            variant={"outlined"}
            label={"Value"}
            placeholder="Value"
            value={value}
            onChangeText={(text) => setValue(text)}
            style={styles.inputValue}
         />
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
      padding: 10,
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
      width: 300,
   },
   inputName: {
      width: 170,
   },
   inputValue: {
      width: 120,
   },
});
