import { Text } from "react-native";

interface CustomSubTitleProps {
   subtitle: string;
}

export default function CustomSubTitle({ subtitle }: CustomSubTitleProps) {
   return (
      <Text
         style={{
            fontSize: 20,
            margin: 16,
         }}
      >
         {subtitle}
      </Text>
   );
}
