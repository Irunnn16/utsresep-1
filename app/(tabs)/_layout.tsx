import { useSession } from "@/contexts/ctx";
import { Octicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout () {
  const { session, isLoading } =useSession()
  
  return (
    <Tabs screenOptions={{headerShown: false}}>
      <Tabs.Screen name="home" options={{
        tabBarLabel: "Home",
        title: "Beranda",
        tabBarIcon: ({color, size }) => (
        <Octicons name="home" color={color} size={size} />
        )
      }}/>
      <Tabs.Screen name="resep" options={{
        tabBarLabel: "Resep",
        title: "Resep",
        tabBarIcon: ({color, size }) => (
        <Octicons name="book" color={color} size={size} />
        )
      }} />
       <Tabs.Screen name="profile" options={{
        tabBarLabel: "Profile",
        title: "Profile",
        tabBarIcon: ({color, size }) => (
        <Octicons name="person" color={color} size={size} />
        )
      }}/>
    </Tabs>
  )
}