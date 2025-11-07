import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import { useAuth } from '../../hooks/AuthContext';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const INDIGO_PRIMARY = '#4B00FF';

export default function LoginScreen() {
  const { login, loading, user } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (user) {
      Alert.alert('Logout First', 'You must log out the current user before logging in another account.');
      return;
    }
    
    if (!email || !password) {
      Alert.alert('Validation', 'Please enter both email and password.');
      return;
    }

    try {
      await login(email, password);
      // Clear both fields after successful login
      setEmail('');
    } catch (error: any) {
      Alert.alert('Login Failed', error.message || 'Something went wrong.');
    } finally {
      // Always clear the password field, even if login fails
      setPassword('');
    }
  };

  const handleSignupRedirect = () => {
    if (user) {
      Alert.alert('Logout First', 'You must log out the current user before navigating to sign up.');
      return;
    }
    router.push('/signup');
  };

  const isFormDisabled = loading || !!user;

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <FontAwesome5 name="bell-slash" size={80} color={INDIGO_PRIMARY} />
        <Text style={styles.title}>SENMS</Text>
      </View>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          editable={!isFormDisabled}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#999"
          secureTextEntry
          autoCapitalize="none"
          value={password}
          onChangeText={setPassword}
          editable={!isFormDisabled}
        />

        <TouchableOpacity
          style={[styles.button, { backgroundColor: isFormDisabled ? '#ccc' : INDIGO_PRIMARY }]}
          onPress={handleLogin}
          disabled={isFormDisabled}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Logging in...' : (user ? 'Logged In' : 'Log In')}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.linkButton, { opacity: isFormDisabled ? 0.5 : 1 }]}
          onPress={handleSignupRedirect}
          disabled={isFormDisabled}
        >
          <Text style={styles.linkText}>Don't have an account? Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: INDIGO_PRIMARY,
    marginTop: 10,
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    padding: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 8,
  },
  input: {
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
  },
  button: {
    height: 50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  linkButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  linkText: {
    color: INDIGO_PRIMARY,
    fontSize: 15,
  },
});
