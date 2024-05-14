import {
   Color,
   TypographyVariant,
   usePaletteColor,
   useTheme,
} from "@react-native-material/core";
import React from "react";
import { Text as RNText, TextProps as RNTextProps } from "react-native";

export interface TextProps extends RNTextProps {
   /**
    * The variant of the text.
    *
    * @default "body1"
    */
   variant?: TypographyVariant;

   /**
    * The color of the text.
    *
    * @default "on-background"
    */
   color?: Color;
}

const Text: React.FC<TextProps> = ({
   variant = "body1",
   color = "on-background",
   style,
   ...rest
}) => {
   const { typography } = useTheme();
   const palette = usePaletteColor(color);

   return (
      <RNText
         {...rest}
         style={[typography[variant], { color: palette.main }, style]}
      />
   );
};

export default Text;
