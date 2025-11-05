import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../../hooks/AuthContext";

export default function LoginScreen() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Missing Fields", "Please enter both email and password.");
      return;
    }

    const success = login(email, password);
    if (success) {
      Alert.alert("Welcome back!");
      setEmail("");
      setPassword("");
      router.push("/dashboard");
    } else {
      Alert.alert("Invalid credentials", "Please sign up first or check your details.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button title="Login" onPress={handleLogin} />

      {/* Small 'Go to Sign Up' label button */}
      <TouchableOpacity
        onPress={() => {
          setEmail("");
          setPassword("");
          router.push("/signup");
        }}
        style={styles.signupLinkContainer}
      >
        <Text style={styles.signupLinkText}>
          Don’t have an account? Sign Up
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#222",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginVertical: 8,
    fontSize: 16,
  },
  signupLinkContainer: {
    marginTop: 15,
    alignItems: "center",
  },
  signupLinkText: {
    fontSize: 14,
    color: "#007AFF",
    textDecorationLine: "underline",
  },
});
