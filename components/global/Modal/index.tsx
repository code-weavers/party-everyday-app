import { ReactNode } from "react";
import { Alert, Modal, Pressable, StyleSheet, Text, View } from "react-native";

interface CustomModalProps {
   visible: boolean;
   setVisible: (visible: boolean) => void;
   children: ReactNode;
}

export default function CustomModal({
   visible,
   setVisible,
   children,
}: CustomModalProps) {
   const handleSubmit = () => {
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
                  <Pressable
                     style={[styles.button, styles.buttonClose]}
                     onPress={() => setVisible(!visible)}
                  >
                     <Text style={styles.textStyle}>Cancel</Text>
                  </Pressable>
                  <Pressable
                     style={[styles.button, styles.buttonClose]}
                     onPress={handleSubmit}
                  >
                     <Text style={styles.textStyle}>Submit</Text>
                  </Pressable>
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
      padding: 35,
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
      borderRadius: 20,
      padding: 20,
      elevation: 2,
   },
   buttonOpen: {
      backgroundColor: "#F194FF",
   },
   buttonClose: {
      borderRadius: 5,
      margin: 10,
      backgroundColor: "#2196F3",
   },
   textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
   },
   modalText: {
      marginBottom: 15,
      textAlign: "center",
   },
});
