import CustomSubTitle from "@/components/global/CustomSubTitle";
import CustomTitle from "@/components/global/CustomTitle";
import CustomModal from "@/components/global/Modal";
import SafeContainer from "@/components/global/SafeContainer";
import { AdditionalInfoType } from "@/enums";
import { useCreateAdditionalInfo } from "@/hooks/party/useCreateAdditionalInfo";
import { IAdditionalInfo } from "@/interfaces/party.interface";
import { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import CreateAdditionalInfoItem from "../CreateAdditionalInfoItem";

interface IGuestItemListProps {
   partyId: string
   label: string
   type: AdditionalInfoType
}

export default function CreateAdditionalInfo({ label, partyId, type }: IGuestItemListProps) {
   const [visible, setVisible] = useState(false);
   const { additionalInfos, setAdditionalInfos, handleSubmit } = useCreateAdditionalInfo(partyId);
   const handleDelete = (additionalInfoId: string) => {
      setAdditionalInfos(additionalInfos.filter((info) => info.id !== additionalInfoId));
   };
   const handleCancel = () => {
      setAdditionalInfos([{ id: 'new', userId: '', name: "", value: 0, type }]);
   }

   return (
      <View style={styles.buttonContainer}>
         <Pressable onPress={() => setVisible(true)} style={styles.button}>
            <Text style={styles.text}>{label}</Text>
         </Pressable>

         <CustomModal visible={visible} setVisible={setVisible} onSubmit={handleSubmit} onCancel={handleCancel} >
            <SafeContainer>
               <View style={styles.listContainer}>
                  <View>
                     <CustomTitle title="Add your party info" />
                     <CustomSubTitle subtitle="You can add the costs of your party or the entrance value" />
                  </View>

                  <FlatList
                     data={additionalInfos}
                     renderItem={({ item, index }) => (
                        <CreateAdditionalInfoItem
                           additionalInfo={item}
                           setAdditionalInfo={(additionalInfo: IAdditionalInfo) => setAdditionalInfos([...additionalInfos, additionalInfo])}
                           handleDelete={() => handleDelete(String(item.id))}
                           additionalInfoType={type}
                        />
                     )}
                  />
               </View>
            </SafeContainer>
         </CustomModal>
      </View>
   );
}

const styles = StyleSheet.create({
   listContainer: {
      flex: 1,
      backgroundColor: "white",
      paddingTop: 16,
   },
   buttonContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "49%",

   },
   button: {
      backgroundColor: "#52c41a",
      padding: 16,
      borderRadius: 5,
      elevation: 2,
      width: "100%",
      height: 50,
   },
   text: {
      color: "white",
      textAlign: "center",
      fontSize: 16,
      fontWeight: "bold",
   },
});
