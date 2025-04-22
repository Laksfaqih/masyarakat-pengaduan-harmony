
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, Profile } from "@/integrations/supabase/client";
import type { User } from '@supabase/supabase-js';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { UserRole } from '@/types';

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session?.user?.email);
      setUser(session?.user ?? null);
      if (session?.user) {
        await fetchProfile(session.user.id);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function fetchProfile(userId: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching profile:', error);
      setLoading(false);
      return;
    }

    // Add default role if not present
    const profileWithRole = {
      ...data,
      role: (data as any).role || 'citizen'
    } as Profile;

    setProfile(profileWithRole);
    setLoading(false);
  }

  const signIn = async (email: string, password: string) => {
    try {
      console.log("Attempting to sign in with:", email);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Sign in error:", error.message);
        throw error;
      }

      console.log("Sign in successful:", data);
      toast.success('Login berhasil!');

      // Redirect based on user role
      if (data.user) {
        // Instead of directly accessing profile.role, let's fetch the user roles from user_roles table
        const { data: userRoleData, error: userRoleError } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', data.user.id)
          .single();

        if (userRoleError) {
          console.error("Error fetching user role:", userRoleError);
          // If no specific role is found, default to citizen role
          navigate('/dashboard/citizen');
          return;
        }

        if (userRoleData) {
          const role = userRoleData.role as UserRole;
          console.log("User role:", role);
          switch (role) {
            case 'super_admin':
              navigate('/dashboard/super-admin');
              break;
            case 'secretary':
              navigate('/dashboard/secretary');
              break;
            case 'village_head':
              navigate('/dashboard/village-head');
              break;
            case 'citizen':
            default:
              navigate('/dashboard/citizen');
              break;
          }
        } else {
          // Default route if no role is found
          navigate('/dashboard/citizen');
        }
      }
    } catch (error: any) {
      console.error("Login error details:", error);
      
      // Show more descriptive error message
      if (error.message.includes('Invalid login credentials')) {
        toast.error('Email atau kata sandi salah. Silakan coba lagi.');
      } else {
        toast.error(error.message || 'Error logging in');
      }
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      });

      if (error) throw error;

      toast.success('Registrasi berhasil! Silakan periksa email Anda untuk verifikasi.');
      navigate('/verification-sent', { state: { email } });
    } catch (error: any) {
      toast.error(error.message || 'Error signing up');
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/login');
      toast.success('Logout berhasil');
    } catch (error: any) {
      toast.error(error.message || 'Error signing out');
    }
  };

  const value = {
    user,
    profile,
    loading,
    signIn,
    signOut,
    signUp,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
