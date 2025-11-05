import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>🔕</Text>
      <Text style={styles.title}>SENMS</Text>
      <Text style={styles.subtitle}>School Exam Noise Monitoring System</Text>
      <Text style={styles.caption}>Ensuring quiet, distraction-free exams.</Text>

      <Link href="/login" asChild>
        <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.loginText}>Log In</Text>
        </TouchableOpacity>
      </Link>

      <Link href="/signup" asChild>
        <TouchableOpacity style={styles.signupBtn}>
          <Text style={styles.signupText}>Sign Up</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff',
  },
  logo: { fontSize: 60, color: '#4C48EF', marginBottom: 10 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#4C48EF' },
  subtitle: { fontSize: 16, color: '#555', marginTop: 8 },
  caption: { fontSize: 14, color: '#999', marginBottom: 40 },
  loginBtn: {
    backgroundColor: '#4C48EF', paddingVertical: 12, width: '80%', borderRadius: 10, marginBottom: 10,
  },
  loginText: { color: '#fff', textAlign: 'center', fontWeight: '600' },
  signupBtn: {
    backgroundColor: '#f2f2f2', paddingVertical: 12, width: '80%', borderRadius: 10,
  },
  signupText: { color: '#4C48EF', textAlign: 'center', fontWeight: '600' },
});
