import React, { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { Alert } from 'react-native';
import { supabase } from '../config/supabase'; // Corrected import path
import { router } from 'expo-router';

// Define the shape of the authentication context state and functions
interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define the provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const isMounted = useRef(true); // Ref to track component mount status

  useEffect(() => {
    isMounted.current = true;
    
    // Initial check for session
    const fetchSession = async () => {
        const { data: { session: initialSession }, error } = await supabase.auth.getSession();
        
        if (!isMounted.current) return;

        if (error) {
            console.error('Error fetching initial session:', error.message);
        }

        setSession(initialSession);
        setUser(initialSession?.user || null);
        setLoading(false);
    };

    fetchSession();

    // Listener for session changes
    const { data: authListener } = supabase.auth.onAuthStateChange((event, newSession) => {
        if (!isMounted.current) return;

        setSession(newSession);
        setUser(newSession?.user || null);
        
        // Handle navigation based on auth state change
        if (event === 'SIGNED_IN') {
            router.replace('/(tabs)/dashboard');
        } else if (event === 'SIGNED_OUT') {
            router.replace('/(tabs)/dashboard'); // Navigate to the auth wall/dashboard
        }

        if (loading) setLoading(false);
    });

    // Cleanup function
    return () => {
      isMounted.current = false;
      authListener.subscription.unsubscribe();
    };
  }, []); // Run only on mount

  const login = async (email: string, password: string) => {
    if (user) {
        Alert.alert('Logout First', 'You must log out the current user before logging in another account.');
        return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        Alert.alert('Login Error', error.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Login Error', error.message);
      } else {
        Alert.alert('Login Error', 'An unexpected error occurred.');
      }
    } finally {
        if (isMounted.current) setLoading(false);
    }
  };

  const signup = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({ email, password });
      
      if (error) {
        Alert.alert('Sign Up Error', error.message);
      } else {
        // --- FIX: Prevent Auto-Login ---
        await supabase.auth.signOut();
        // ------------------------------
        
        Alert.alert('Success!', 'Please check your email to confirm your account before logging in.');
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Sign Up Error', error.message);
      } else {
        Alert.alert('Sign Up Error', 'An unexpected error occurred.');
      }
    } finally {
        if (isMounted.current) setLoading(false);
    }
  };
  
  const logout = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        Alert.alert('Logout Error', error.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Logout Error', error.message);
      } else {
        Alert.alert('Logout Error', 'An unexpected error occurred.');
      }
    } finally {
        if (isMounted.current) setLoading(false);
    }
  };

  const value = { user, session, loading, login, signup, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};