import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { CompositeScreenProps } from "@react-navigation/native";

export type RootStackParamList = {
   SignUp: undefined;
   SignIn: undefined;
   Home: undefined;
   PartyScreen: undefined;
   CreatePartyScreen: undefined;
   PartyContentScreen: PartyContentScreenProps;
   PartyCheckoutScreen: PartyCheckoutScreenProps;
   ProfileScreen: undefined;
};

export type HomeTabParamList = {
   Popular: undefined;
   Latest: undefined;
};

export type HomeTabScreenProps<T extends keyof HomeTabParamList> =
   CompositeScreenProps<
      BottomTabScreenProps<HomeTabParamList, T>,
      BottomTabScreenProps<RootStackParamList, "Home">
   >;

type PartyContentScreenProps = {
   id: string;
};

type PartyCheckoutScreenProps = {
   id: string;
};

declare global {
   namespace ReactNavigation {
      interface RootParamList extends RootStackParamList {}
   }
}
