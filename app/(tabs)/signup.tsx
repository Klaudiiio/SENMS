import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
// Path: Up two levels (from app/(tabs)/ to app/ and then to hooks/)
import { useAuth } from "../../hooks/AuthContext"; 
import { Ionicons } from "@expo/vector-icons";

// Consistent Blue Color Scheme
const PRIMARY_COLOR = '#007bff'; 

function Signup() {
  const router = useRouter();
  const { signup, loading } = useAuth(); // Destructure 'loading' from context
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Reset fields whenever the screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      setEmail("");
      setPassword("");
    }, [])
  );

  const handleSignup = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }

    try {
      await signup(email, password); 
      
      // FIX FOR ANDROID 'viewState' ERROR:
      // When signup completes, AuthContext calls setLoading(false) and shows the Alert.
      // We must wait a tiny bit to ensure that state change stabilizes BEFORE navigating away.
      setTimeout(() => {
          // Navigate to login so the user can check their email and then try to login
          router.push("/login"); 
      }, 500); // 500ms delay allows state update and Alert to stabilize

    } catch (error) {
      // Note: The error alert is already shown inside AuthContext, but we re-throw 
      // in the context to prevent the redirect if an error occurs.
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo Container - Consistent with Login */}
      <View style={styles.logoContainer}>
        <Ionicons name="notifications-off-outline" size={48} color={PRIMARY_COLOR} />
        <Text style={styles.logoText}>SENMS</Text>
      </View>

      {/* Form Container - Card-like appearance */}
      <View style={styles.formContainer}>
        <Text style={styles.header}>Create Account</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Button 
          color={PRIMARY_COLOR} 
          title={loading ? "Loading..." : "Sign Up"} // Use loading state
          onPress={handleSignup} 
          disabled={loading} // Disable button when loading
        />
        
        <TouchableOpacity style={styles.linkContainer} onPress={() => router.push("/login")}>
          <Text style={styles.link}>
            Already have an account? Log in
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa", // Light gray background
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  // --- Consistent Styles ---
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 40,
  },
  logoText: {
    fontSize: 40,
    fontWeight: "bold",
    color: PRIMARY_COLOR,
    marginLeft: 10,
  },
  formContainer: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "white",
    padding: 25,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 5,
  },
  header: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 25,
    color: "#333",
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  linkContainer: {
    marginTop: 20,
  },
  link: {
    color: PRIMARY_COLOR,
    textAlign: "center",
    fontSize: 14,
  },
});

export default Signup;