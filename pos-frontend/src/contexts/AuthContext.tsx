import React, { createContext, useContext, useState, useEffect } from 'react';

// Types
interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'cashier' | 'manager';
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  error: string | null;
}

// Mock user data
const MOCK_USERS = [
  {
    id: '1',
    name: 'ejine',
    email: 'ejine@gmail.com',
    password: 'admin123',
    role: 'admin' as const,
  },
  {
    id: '2',
    name: 'kurt',
    email: 'kurt@gmail.com',
    password: 'cashier123',
    role: 'cashier' as const,
  },
  {
    id: '3',
    name: 'mark',
    email: 'mark@gmail.com',
    password: 'manager123',
    role: 'manager' as const,
  },
];

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check for existing session on load
  useEffect(() => {
    const storedUser = localStorage.getItem('posUser');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error('Failed to parse stored user data');
      }
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const foundUser = MOCK_USERS.find(
        (u) => u.email === email && u.password === password
      );

      if (foundUser) {
        const { password, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword);
        localStorage.setItem('posUser', JSON.stringify(userWithoutPassword));
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (err) {
      setError((err as Error).message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('posUser');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}