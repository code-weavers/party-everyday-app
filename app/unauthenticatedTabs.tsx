import { CustomTabBar } from "@/components/navigation/CustomTabBar";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import SigninScreen from "./(tabs)/auth/signin";
import SignupScreen from "./(tabs)/auth/signup";
import PartyScreen from "./(tabs)/party";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function UnauthTabs() {
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
            name="SignInScreen"
            component={SigninScreen}
            options={{
               tabBarIcon: "login" as any,
            }}
         />
         <Tab.Screen
            name="SignUpScreen"
            component={PartyScreen}
            options={{
               tabBarIcon: "account-plus" as any,
            }}
         />
      </Tab.Navigator>
   );
}

export default function UnauthenticatedTabs() {
   return (
      <Tab.Navigator
         initialRouteName="SignInScreen"
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
            name="SignInScreen"
            component={SigninScreen}
            options={{
               tabBarIcon: "login" as any,
            }}
         />
         <Tab.Screen
            name="SignUpScreen"
            component={SignupScreen}
            options={{
               tabBarIcon: "account-plus" as any,
            }}
         />
      </Tab.Navigator>
   );
}
