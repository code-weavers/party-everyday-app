import { Pressable, StyleSheet, Text, View } from "react-native";

interface StepperButtonProps {
   steps: number;
   currentStep: number;
   onPrevious?: () => void;
   onNext?: () => void;
}

export default function StepperButton({
   steps,
   currentStep,
   onPrevious,
   onNext,
}: StepperButtonProps) {
   return (
      <View style={styles.buttonContainer}>
         {currentStep === 0 ? null : (
            <Pressable style={styles.button} onPress={onPrevious}>
               <Text
                  style={{ color: "white", textAlign: "center", fontSize: 16 }}
               >
                  Previous
               </Text>
            </Pressable>
         )}

         {currentStep === steps - 1 ? (
            <Pressable style={styles.button} onPress={onNext}>
               <Text
                  style={{ color: "white", textAlign: "center", fontSize: 16 }}
               >
                  Submit
               </Text>
            </Pressable>
         ) : (
            <Pressable style={styles.button} onPress={onNext}>
               <Text
                  style={{ color: "white", textAlign: "center", fontSize: 16 }}
               >
                  Next
               </Text>
            </Pressable>
         )}
      </View>
   );
}

const styles = StyleSheet.create({
   buttonContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
      paddingRight: 10,
      paddingLeft: 10,
   },
   button: {
      backgroundColor: "black",
      padding: 16,
      borderRadius: 5,
      elevation: 2,
      width: "47%",
   },
});
