import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

// --- Supabase Credentials ---
// This includes your Project URL and Anon Key.
const supabaseUrl = 'https://fqqslifrjifxmhhhebxb.supabase.co'; 
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZxcXNsaWZyamlmeG1oaGhlYnhiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI0NDg3MTYsImV4cCI6MjA3ODAyNDcxNn0.EgndwIBYq6HorA4x4fgfweokE6y-vnS61Ug-lRfn4Xw';
// ----------------------------

// Supabase configuration for React Native/Expo
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage, // Use AsyncStorage for persistent session storage
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});