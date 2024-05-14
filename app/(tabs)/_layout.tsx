import HomeScreen from "@/app/(tabs)";
import { CustomTabBar } from "@/components/navigation/CustomTabBar";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import CreatePartyScreen from "./party/create";

export default function TabLayout() {
   const Tab = createBottomTabNavigator();

   return (
      <Tab.Navigator
         screenOptions={{
            headerShown: false,
            tabBarHideOnKeyboard: true,
            tabBarShowLabel: false,
            tabBarActiveTintColor: "#121212",

            tabBarStyle: {
               backgroundColor: "#FFF",
               borderTopWidth: 0,
            },
         }}
         tabBar={(props) => <CustomTabBar {...props} />}
      >
         <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
               tabBarIcon: "home" as any,
            }}
         />
         <Tab.Screen
            name="Money"
            component={CreatePartyScreen}
            options={{
               tabBarIcon: "party-popper" as any,
            }}
         />
         <Tab.Screen
            name="Store"
            component={HomeScreen}
            options={{
               tabBarIcon: "account" as any,
            }}
         />
      </Tab.Navigator>
   );
}
