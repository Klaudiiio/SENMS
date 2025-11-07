import React from 'react';
import { View, Text, StyleSheet, Button, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../hooks/AuthContext'; // Access the AuthContext

// Consistent Blue Color Scheme
const PRIMARY_COLOR = '#4B00FF';
const SECONDARY_COLOR = '#E5E5FF';

/**
 * Authenticated Dashboard content
 */
const AuthenticatedDashboard = () => {
    const { logout, user } = useAuth();
    
    return (
        <SafeAreaView style={styles.safeContainer}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.dashboardContainer}>
                    <Text style={styles.welcomeHeader}>Welcome {user?.email || 'User'}!</Text>
                    <Text style={styles.dashboardText}>
                        This is your School Exam Noise Monitoring System (SENMS) Dashboard. 
                        Your alerts and monitoring data will appear here.
                    </Text>

                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Current Status</Text>
                        <Text style={styles.cardContent}>Monitoring Active. Quiet Level: Normal.</Text>
                    </View>

                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Recent Alerts</Text>
                        <Text style={styles.cardContent}>No noise violations recorded in the last 24 hours.</Text>
                    </View>

                    <Button title="Logout" onPress={logout} color="red" />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

/**
 * Welcome/Auth Wall screen
 */
const WelcomeScreen = () => {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.safeContainer}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.dashboardContainer}>
                    <View style={styles.welcomeLogoContainer}>
                        <Ionicons name="notifications-off-outline" size={80} color={PRIMARY_COLOR} />
                        <Text style={styles.welcomeLogoText}>SENMS</Text>
                        <Text style={styles.welcomeSubtitle}>
                            School Exam Noise Monitoring System
                        </Text>
                        <Text style={styles.welcomeDescription}>
                            Ensuring quiet, distraction-free exams.
                        </Text>
                    </View>

                    {/* Buttons aligned horizontally */}
                    <View style={styles.buttonRow}>
                        <TouchableOpacity
                            style={[styles.button, { backgroundColor: PRIMARY_COLOR, flex: 1, marginRight: 10 }]}
                            onPress={() => router.push("/login")}
                        >
                            <Text style={[styles.buttonText, { color: 'white' }]}>Log In</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.button, { backgroundColor: SECONDARY_COLOR, flex: 1, marginLeft: 10 }]}
                            onPress={() => router.push("/signup")}
                        >
                            <Text style={[styles.buttonText, { color: PRIMARY_COLOR }]}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

/**
 * Main Dashboard component
 */
export default function Dashboard() {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <SafeAreaView style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Loading...</Text>
            </SafeAreaView>
        );
    }

    return user ? <AuthenticatedDashboard /> : <WelcomeScreen />;
}

const styles = StyleSheet.create({
    // --- SafeAreaView ---
    safeContainer: {
        flex: 1,
        backgroundColor: '#f0f2f5',
        padding: 10,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
    },

    // --- Dashboard Container (main card) ---
    dashboardContainer: {
        width: '100%',
        maxWidth: 500,
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 4,
    },

    // --- Authenticated Dashboard ---
    welcomeHeader: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    dashboardText: {
        fontSize: 16,
        color: '#666',
        marginBottom: 20,
    },
    card: {
        backgroundColor: '#f9f9f9',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: PRIMARY_COLOR,
        marginBottom: 5,
    },
    cardContent: {
        fontSize: 16,
        color: '#555',
    },

    // --- Loading State ---
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    loadingText: {
        fontSize: 18,
        color: '#888',
    },

    // --- Welcome Screen ---
    welcomeLogoContainer: {
        alignItems: 'center',
        marginBottom: 40,
    },
    welcomeLogoText: {
        fontSize: 42,
        fontWeight: 'bold',
        color: PRIMARY_COLOR,
        marginTop: 10,
    },
    welcomeSubtitle: {
        fontSize: 18,
        color: '#666',
        marginTop: 5,
        textAlign: 'center',
    },
    welcomeDescription: {
        fontSize: 14,
        color: '#888',
        marginTop: 5,
        textAlign: 'center',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        width: '100%',
    },
    button: {
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: '600',
    },
});
