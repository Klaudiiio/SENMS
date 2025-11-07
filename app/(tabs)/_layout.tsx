import { Tabs } from 'expo-router';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
// Note: We keep the useAuth import, but are ignoring the 'user' variable 
// to ensure all tabs are always visible as requested.
import { useAuth } from '../../hooks/AuthContext'; 

export default function TabLayout() {
  // const { user } = useAuth(); // Logically ignored for permanent visibility

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#007bff',
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color }) => <Ionicons name="home" color={color} size={28} />,
          // href is now explicitly set to the path, making it always visible
          href: '/dashboard', 
        }}
      /><Tabs.Screen
        name="login"
        options={{
          title: 'Login',
          tabBarIcon: ({ color }) => <Ionicons name="log-in-outline" color={color} size={28} />,
          // href is now explicitly set to the path, making it always visible
          href: '/login',
        }}
      /><Tabs.Screen
        name="signup"
        options={{
          title: 'Sign Up',
          tabBarIcon: ({ color }) => <Ionicons name="person-add-outline" color={color} size={28} />,
          // href is now explicitly set to the path, making it always visible
          href: '/signup',
        }}
      />
    </Tabs>
  );
}