import HomeScreen from "@/app/(tabs)";
import { CustomTabBar } from "@/components/navigation/CustomTabBar";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import PartyScreen from "./party";
import CreatePartyScreen from "./party/create";
import ProfileScreen from "./profile";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeTabs() {
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
            name="PartyScreen"
            component={PartyScreen}
            options={{
               tabBarIcon: "party-popper" as any,
            }}
         />
         <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
               tabBarIcon: "account" as any,
            }}
         />
      </Tab.Navigator>
   );
}

export default function TabLayout() {
   return (
      <Stack.Navigator
         screenOptions={{
            headerShown: false,
         }}
      >
         <Stack.Screen name="Home" component={HomeTabs} />
         <Stack.Screen name="CreatePartyScreen" component={CreatePartyScreen} />
         <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      </Stack.Navigator>
   );
}
