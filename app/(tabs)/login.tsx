import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
// FIX: Path adjusted for hooks folder. Should be '../../hooks/AuthContext'
import { useAuth } from "../../hooks/AuthContext"; 
import { Ionicons } from "@expo/vector-icons";

// Consistent Blue Color Scheme
const PRIMARY_COLOR = '#007bff'; 

function Login() {
  const router = useRouter();
  // Get both login function and the current user object
  const { login, user, loading } = useAuth(); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => { 
    
    // 1. Check if a user is already logged in
    if (user) {
        Alert.alert(
            "Already Logged In",
            "Please log out of the current account (User: " + user.email + ") before attempting to log in with a different account."
        );
        return; // Stop the login process
    }

    if (!email || !password) {
      Alert.alert("Missing Fields", "Please enter both email and password.");
      return;
    }

    try {
      // Use the loading state here, which is managed by AuthContext
      await login(email, password); 
      
      // Note: The navigation to /dashboard is now primarily handled by 
      // the onAuthStateChange listener in AuthContext upon success.
      
      // Clear fields regardless of navigation
      setEmail("");
      setPassword("");

    } catch (error) {
      // Error handling is primarily done within AuthContext, 
      // but keeping this catch block for structural integrity.
      console.error("Login attempt failed:", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo Container */}
      <View style={styles.logoContainer}>
        <Ionicons name="notifications-off-outline" size={48} color={PRIMARY_COLOR} />
        <Text style={styles.logoText}>SENMS</Text>
      </View>
      <View style={styles.formContainer}>
        {/* Form Container */}
        <Text style={styles.header}>Login</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          editable={!loading && !user} // Disable editing if loading or user is present
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          editable={!loading && !user} // Disable editing if loading or user is present
        />

        <Button 
          color={PRIMARY_COLOR} 
          title={loading ? "Loading..." : "Login"}
          onPress={handleLogin} 
          // Disable button if loading OR if a user is already logged in
          disabled={loading || !!user} 
        />
        <Text
          style={styles.link}
          onPress={() => router.push("/signup")}
        >
          Don’t have an account? Sign up
        </Text>
        
        {/* Display current user email if logged in, guiding the user */}
        {user && (
            <Text style={styles.loggedInStatus}>
                Currently logged in as: **{user.email}**
            </Text>
        )}

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
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
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  link: {
    marginTop: 10,
    color: PRIMARY_COLOR,
    textAlign: "center",
  },
  loggedInStatus: {
    marginTop: 15,
    textAlign: 'center',
    color: 'green',
    fontWeight: '500',
    padding: 5,
    backgroundColor: '#e6ffe6',
    borderRadius: 5,
  }
});

export default Login;