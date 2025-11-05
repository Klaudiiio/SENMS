import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Link } from "expo-router";

export default function SignupScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      {/* Logo Section */}
      <View style={styles.header}>
        <Image
          source={{ uri: "https://cdn-icons-png.flaticon.com/512/1048/1048953.png" }}
          style={styles.logo}
        />
        <Text style={styles.title}>SENMS</Text>
        <Text style={styles.subtitle}>Create Your Account</Text>
      </View>

      {/* Card Section */}
      <View style={styles.card}>
        <Text style={styles.heading}>Sign Up</Text>

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>

        <Text style={styles.footer}>
          Already have an account?{" "}
          <Link href="/login" style={styles.link}>
            Log In
          </Link>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB", alignItems: "center", justifyContent: "center" },
  header: { alignItems: "center", marginBottom: 20 },
  logo: { width: 80, height: 80, marginBottom: 8 },
  title: { fontSize: 26, fontWeight: "bold", color: "#4C48EF" },
  subtitle: { color: "#555", fontSize: 14, marginBottom: 10 },
  card: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    elevation: 5,
    shadowOpacity: 0.1,
  },
  heading: { fontSize: 20, fontWeight: "bold", color: "#4C48EF", marginBottom: 20, textAlign: "center" },
  label: { fontWeight: "600", marginTop: 10, marginBottom: 5 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    marginBottom: 5,
  },
  button: { backgroundColor: "#4C48EF", padding: 12, borderRadius: 8, marginTop: 20 },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "600" },
  footer: { marginTop: 15, textAlign: "center", color: "#666" },
  link: { color: "#4C48EF", fontWeight: "bold" },
});
