import { truncateText } from "@/utils";
import { StyleSheet, Text, View } from "react-native";

interface InformationProps {
   name: string;
   value: string;
}

export default function InformationDescription({
   name,
   value,
}: InformationProps) {
   return (
      <View style={styles.container}>
         <Text style={styles.informationName}>{name}</Text>
         <Text style={styles.informationDescription}>
            {truncateText(value, 20)}
         </Text>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      padding: 10,
      paddingLeft: 16,
   },
   informationName: {
      fontSize: 18,
      fontWeight: "bold",
   },
   informationDescription: {
      fontSize: 16,
   },
});
