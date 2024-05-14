import React, { ReactNode } from "react";
import { SafeAreaView, StyleSheet } from "react-native";

interface CustomSafeAreaViewProps {
   children: ReactNode;
}

export default function CustomSafeAreaView({
   children,
}: CustomSafeAreaViewProps) {
   return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
});
