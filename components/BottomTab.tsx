import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "@/app/(tabs)/home";
import ResepScreen from "@/app/(tabs)/resep";
import ProfileScreen from "@/app/(tabs)/profile";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === "Home") {
              iconName = "home-outline";
            } else if (route.name === "Resep") {
              iconName = "book-outline";
            } else if (route.name === "Profile") {
              iconName = "Person-outline";
            }
            return <Ionicons name={iconName as any} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#F4A261",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: { backgroundColor: "#fff", paddingBottom: 5, height: 60 },
          headerShown: false,
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Resep" component={ResepScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default BottomTabNavigator;
