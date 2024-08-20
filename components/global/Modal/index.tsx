import { ReactNode } from "react";
import { Alert, Modal, Pressable, StyleSheet, Text, View } from "react-native";

interface CustomModalProps {
   visible: boolean;
   setVisible: (visible: boolean) => void;
   children: ReactNode;
   onSubmit?: () => void;
}

export default function CustomModal({
   visible,
   setVisible,
   children,
   onSubmit,
}: CustomModalProps) {
   const handleSubmit = () => {
      if (onSubmit) onSubmit();
      setVisible(false);
   };

   return (
      <>
         <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={() => {
               Alert.alert("Modal has been closed.");
               setVisible(!visible);
            }}
         >
            <View style={styles.centeredView}>
               <View style={styles.modalView}>
                  {children}

                  <View style={styles.footer}>
                     <Pressable
                        style={[styles.button]}
                        onPress={() => setVisible(!visible)}
                     >
                        <Text style={styles.textStyle}>Cancel</Text>
                     </Pressable>

                     <Pressable
                        style={[styles.button]}
                        onPress={handleSubmit}
                     >
                        <Text style={styles.textStyle}>Submit</Text>
                     </Pressable>
                  </View>
               </View>
            </View>
         </Modal>
      </>
   );
}

const styles = StyleSheet.create({
   centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
   },
   modalView: {
      margin: 20,
      backgroundColor: "white",
      width: "100%",
      height: "100%",
      padding: 16,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
   },
   button: {
      backgroundColor: "black",
      padding: 16,
      borderRadius: 5,
      elevation: 2,
      width: "47%",
   },
   buttonClose: {
      backgroundColor: "black",
   },
   textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
   },
   footer: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
      bottom: 100,
      marginTop: 16,
      marginLeft: 8,
      marginRight: 8,
   },
});
