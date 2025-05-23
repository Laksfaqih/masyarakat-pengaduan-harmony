
import { User, UserRole } from "@/types";

// Mock user data for simulating authentication
const MOCK_USERS = [
  {
    id: '1',
    name: 'Budi Santoso',
    email: 'citizen@example.com',
    password: 'password123',
    role: 'citizen' as UserRole,
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=687&ixlib=rb-4.0.3',
  },
  {
    id: '2',
    name: 'Raden Ayu',
    email: 'secretary@example.com',
    password: 'password123',
    role: 'secretary' as UserRole,
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=1522&ixlib=rb-4.0.3',
  },
  {
    id: '3',
    name: 'Haji Soeharto',
    email: 'villagehead@example.com',
    password: 'password123',
    role: 'village_head' as UserRole,
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1587&ixlib=rb-4.0.3',
  },
  {
    id: '4',
    name: 'Admin Utama',
    email: 'admin@example.com',
    password: 'password123',
    role: 'super_admin' as UserRole,
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&q=80&w=1587&ixlib=rb-4.0.3',
  }
];

// Mock local storage keys
const AUTH_TOKEN_KEY = 'harmony_auth_token';
const AUTH_USER_KEY = 'harmony_auth_user';

export type AuthResponse = {
  success: boolean;
  message: string;
  user?: User;
  token?: string;
};

// Function to simulate login
export const login = async (email: string, password: string): Promise<AuthResponse> => {
  // Simulate API request
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const user = MOCK_USERS.find(u => u.email === email);
  
  if (!user) {
    return { success: false, message: 'User not found' };
  }
  
  if (user.password !== password) {
    return { success: false, message: 'Invalid password' };
  }
  
  // Create a token (just a demo)
  const token = btoa(`${user.id}:${user.email}:${Date.now()}`);
  
  // Create a safe user object without password
  const safeUser: User = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    verified: user.verified,
    avatar: user.avatar,
  };
  
  // Store authentication state
  localStorage.setItem(AUTH_TOKEN_KEY, token);
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(safeUser));
  
  return {
    success: true,
    message: 'Login successful',
    user: safeUser,
    token,
  };
};

// Function to simulate registration
export const register = async (
  name: string, 
  email: string, 
  password: string
): Promise<AuthResponse> => {
  // Simulate API request
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Check if user already exists
  if (MOCK_USERS.some(u => u.email === email)) {
    return { success: false, message: 'Email already in use' };
  }
  
  // Create new user
  const newUser = {
    id: (MOCK_USERS.length + 1).toString(),
    name,
    email,
    password,
    role: 'citizen' as UserRole, // Default role for new registrations
    verified: false,
    avatar: undefined,
  };
  
  // In a real app, we would store this on the server
  MOCK_USERS.push(newUser);
  
  const safeUser: User = {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    role: newUser.role,
    verified: newUser.verified,
  };
  
  return {
    success: true,
    message: 'Registration successful. Please verify your email.',
    user: safeUser,
  };
};

// Function to get current authenticated user
export const getCurrentUser = (): User | null => {
  const userJson = localStorage.getItem(AUTH_USER_KEY);
  if (!userJson) return null;
  
  try {
    return JSON.parse(userJson) as User;
  } catch (error) {
    console.error('Error parsing user from localStorage', error);
    return null;
  }
};

// Function to check if user is authenticated
export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem(AUTH_TOKEN_KEY) && !!getCurrentUser();
};

// Function to logout
export const logout = (): void => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_USER_KEY);
};

// Function to verify if user has specific role
export const hasRole = (role: UserRole | UserRole[]): boolean => {
  const user = getCurrentUser();
  if (!user) return false;
  
  if (Array.isArray(role)) {
    return role.includes(user.role);
  }
  
  return user.role === role;
};

// Function to verify if user is a super admin
export const isSuperAdmin = (): boolean => {
  return hasRole('super_admin');
};

// Function to verify if user has admin privileges (super_admin or village_head)
export const hasAdminPrivileges = (): boolean => {
  return hasRole(['super_admin', 'village_head']);
};

// Function to simulate email verification
export const verifyEmail = async (token: string): Promise<AuthResponse> => {
  // Simulate API request
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // In a real app, we would verify the token on the server
  
  return {
    success: true,
    message: 'Email verified successfully',
  };
};

// Function for super admin to change user role
export const changeUserRole = async (userId: string, newRole: UserRole): Promise<AuthResponse> => {
  // Simulate API request
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Check if current user is super admin
  if (!isSuperAdmin()) {
    return { 
      success: false, 
      message: 'Unauthorized. Only super admins can change user roles.' 
    };
  }
  
  // Find user in mock data
  const userIndex = MOCK_USERS.findIndex(u => u.id === userId);
  
  if (userIndex === -1) {
    return { success: false, message: 'User not found' };
  }
  
  // Update user role
  MOCK_USERS[userIndex].role = newRole;
  
  return {
    success: true,
    message: `User role changed to ${newRole} successfully`,
  };
};

// Get all users (for super admin)
export const getAllUsers = async (): Promise<User[]> => {
  // Simulate API request
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Check if current user is super admin
  if (!isSuperAdmin()) {
    console.error('Unauthorized. Only super admins can view all users.');
    return [];
  }
  
  // Return safe user objects without passwords
  return MOCK_USERS.map(user => ({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    verified: user.verified,
    avatar: user.avatar,
  }));
};
