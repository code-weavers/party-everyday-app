import { useDeleteAdditionalInfo } from "@/hooks/party/useDeleteAdditionalInfo";
import { IAdditionalInfo } from "@/interfaces/party.interface";
import { formatBRCurrency } from "@/utils";
import { Button, Icon, ListItem } from "@rneui/base";
import { StyleSheet, View } from "react-native";

interface PartyAdditionalInfoProps {
   partyId: string;
   additionalInfo: IAdditionalInfo
   canDelete?: boolean;
}

export default function AdditionalInfoItem({
   partyId,
   additionalInfo,
   canDelete = false,
}: PartyAdditionalInfoProps) {
   const { handleDelete } = useDeleteAdditionalInfo(partyId, String(additionalInfo.id));

   return (
      <ListItem style={styles.container}>
         <ListItem.Content>
            <Content
               name={additionalInfo.name}
               value={formatBRCurrency(additionalInfo.value)}
            />
         </ListItem.Content>
         {canDelete && (
            <View style={styles.actionButtonContainer}>
               <Button radius={"sm"} type="solid" color={"error"} onPress={handleDelete}>
                  <Icon name="delete" color="white" />
               </Button>
            </View>
         )}
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
