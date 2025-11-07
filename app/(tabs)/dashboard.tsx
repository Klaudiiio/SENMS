import React from 'react';
import { View, Text, StyleSheet, Button, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../hooks/AuthContext'; // Access the AuthContext

// Consistent Blue Color Scheme
const PRIMARY_COLOR = '#4B00FF'; // Slightly darker purple/blue for primary actions
const SECONDARY_COLOR = '#E5E5FF'; // Light background for secondary actions

/**
 * Renders the main Dashboard content (for authenticated users).
 */
const AuthenticatedDashboard = () => {
    const { logout, user } = useAuth();
    
    // Placeholder content for the actual dashboard
    return (
        <ScrollView style={styles.dashboardContainer}>
            <Text style={styles.welcomeHeader}>Welcome, {user?.email || 'User'}!</Text>
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
        </ScrollView>
    );
};

/**
 * Renders the Welcome/Auth Wall screen (when no user is logged in).
 * This component mirrors the design from your uploaded image.
 */
const WelcomeScreen = () => {
    const router = useRouter();

    return (
        <View style={styles.welcomeContainer}>
            {/* Logo and Icon Section */}
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

            {/* Action Buttons */}
            <View style={styles.buttonGroup}>
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: PRIMARY_COLOR }]}
                    onPress={() => router.push("/login")}
                >
                    <Text style={[styles.buttonText, { color: 'white' }]}>Log In</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, { backgroundColor: SECONDARY_COLOR }]}
                    onPress={() => router.push("/signup")}
                >
                    <Text style={[styles.buttonText, { color: PRIMARY_COLOR }]}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

/**
 * Main component that decides which view to render based on authentication status.
 */
export default function Dashboard() {
    const { user, loading } = useAuth();

    if (loading) {
        // Show a blank view while the session is being checked
        return <View style={styles.loadingContainer}><Text style={styles.loadingText}>Loading...</Text></View>;
    }

    if (user) {
        return <AuthenticatedDashboard />;
    } else {
        return <WelcomeScreen />;
    }
}

const styles = StyleSheet.create({
    // --- Styles for the Authenticated Dashboard ---
    dashboardContainer: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f4f4f9',
    },
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
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
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
    
    // --- Styles for Loading State ---
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

    // --- Styles for the Welcome/Auth Wall (from your image) ---
    welcomeContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
        backgroundColor: '#fff',
    },
    welcomeLogoContainer: {
        alignItems: 'center',
        marginBottom: 80,
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
    buttonGroup: {
        width: '100%',
        maxWidth: 300,
    },
    button: {
        paddingVertical: 15,
        borderRadius: 10,
        marginBottom: 15,
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