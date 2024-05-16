import { Text } from "react-native";

interface CustomTitleProps {
   title: string;
}

export default function CustomTitle({ title }: CustomTitleProps) {
   return (
      <Text
         style={{
            fontSize: 24,
            fontWeight: "bold",
            margin: 16,
         }}
      >
         {title}
      </Text>
   );
}
