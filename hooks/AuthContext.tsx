import React, { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { useRouter } from 'expo-router';
import { Alert } from 'react-native'; // Use standard Alert for native UI

// NOTE: Based on your file structure, the correct relative path is
// going up one level (hooks/ -> root), then down into app/lib/
// If this still fails, please move supabase.ts out of the app/ folder entirely.
import { supabase } from '../config/supabase'; 

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

// Helper hook for consuming the context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Define the provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // FIX: isMounted Ref to prevent the Android "viewState" crash on unmounted component updates
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    
    // Cleanup function for when the component unmounts
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    // 1. Initial session check
    const checkSession = async () => {
      // Must check if mounted before updating state after async call
      if (!isMounted.current) return; 

      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) throw error;

        if (isMounted.current) {
          setSession(session);
          setUser(session?.user ?? null);
          // Auto-redirect based on session presence
          if (session) {
            router.replace('/dashboard');
          } else {
            router.replace('/login');
          }
        }
      } catch (e) {
        console.error('Session check failed:', e);
        if (isMounted.current) {
             setSession(null);
             setUser(null);
             router.replace('/login');
        }
      } finally {
        if (isMounted.current) {
          setLoading(false);
        }
      }
    };
    
    // 2. Real-time session listener
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      // Must check if mounted before updating state
      if (!isMounted.current) return; 

      setSession(session);
      setUser(session?.user ?? null);

      if (session) {
        router.replace('/dashboard');
      } else if (user) {
         // User logged out
         router.replace('/login');
      }
      
      // Stop initial loading indicator once the first session state is confirmed
      if (loading && isMounted.current) {
        setLoading(false);
      }
    });

    checkSession();

    // Clean up the listener when component unmounts
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []); // Empty dependency array ensures this runs once on mount

  // --- Auth Functions ---
  
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      // Note: onAuthStateChange listener handles navigation on success
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed';
      Alert.alert('Login Error', message);
      console.error('Login error:', error);
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
    }
  };

  const signup = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Use signUp, which returns user data and session only if email confirmation is disabled.
      // If email confirmation is enabled (default), user and session will be null/undefined.
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;
      
      // If data.user is null, it means email confirmation is required.
      if (!data.user) {
        Alert.alert(
          'Check Your Email',
          'A confirmation link has been sent to your email address. Please click the link to activate your account.'
        );
      }
      // Note: The calling component (signup.tsx) is responsible for navigating to /login
      // after the Alert is shown and the state stabilizes (using a setTimeout).

    } catch (error) {
      const message = error instanceof Error ? error.message : 'Signup failed';
      Alert.alert('Signup Error', message);
      console.error('Signup error:', error);
      throw error; // Re-throw the error so the calling component can catch it
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      router.replace('/login');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Logout failed';
      Alert.alert('Logout Error', message);
      console.error('Logout error:', error);
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
    }
  };

  const value = {
    user,
    session,
    loading,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};