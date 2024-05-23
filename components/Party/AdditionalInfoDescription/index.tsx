import { formatBRCurrency, truncateText } from "@/utils";
import { StyleSheet, Text, View } from "react-native";

interface AdditionalInfoDescriptionProps {
   name: string;
   value: number;
}

export default function AdditionalInfoDescription({
   name,
   value,
}: AdditionalInfoDescriptionProps) {
   return (
      <View style={styles.container}>
         <Text style={styles.informationName}>{truncateText(name, 20)}</Text>
         <Text style={styles.informationDescription}>
            {formatBRCurrency(value)}
         </Text>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      padding: 5,
      backgroundColor: "#fff",
      flexDirection: "row",
      justifyContent: "space-between",
   },
   informationName: {
      fontSize: 18,
      fontWeight: "bold",
   },
   informationDescription: {
      fontSize: 16,
   },
});
