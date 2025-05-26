import React, { createContext, useContext, useState, useEffect } from 'react';

// Types
export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  loyaltyPoints: number;
  totalSpent: number;
  memberSince: string;
}

interface CustomerContextType {
  customers: Customer[];
  loading: boolean;
  error: string | null;
  getCustomer: (id: string) => Customer | undefined;
  searchCustomers: (query: string) => Customer[];
  updateLoyaltyPoints: (id: string, points: number) => void;
}

// Mock customer data
const MOCK_CUSTOMERS: Customer[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '555-123-4567',
    loyaltyPoints: 240,
    totalSpent: 1250.75,
    memberSince: '2023-03-15',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    phone: '555-234-5678',
    loyaltyPoints: 680,
    totalSpent: 3450.25,
    memberSince: '2022-11-08',
  },
  {
    id: '3',
    name: 'Michael Brown',
    email: 'michael.b@example.com',
    phone: '555-345-6789',
    loyaltyPoints: 120,
    totalSpent: 780.50,
    memberSince: '2023-08-22',
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily.d@example.com',
    phone: '555-456-7890',
    loyaltyPoints: 410,
    totalSpent: 2150.00,
    memberSince: '2023-01-30',
  },
  {
    id: '5',
    name: 'David Wilson',
    email: 'david.w@example.com',
    phone: '555-567-8901',
    loyaltyPoints: 890,
    totalSpent: 4560.75,
    memberSince: '2022-05-17',
  },
];

// Create context
const CustomerContext = createContext<CustomerContextType | undefined>(undefined);

// Provider component
export function CustomerProvider({ children }: { children: React.ReactNode }) {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load customers on mount
  useEffect(() => {
    const loadCustomers = async () => {
      setLoading(true);
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 700));
        setCustomers(MOCK_CUSTOMERS);
        setError(null);
      } catch (err) {
        setError('Failed to load customers');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadCustomers();
  }, []);

  // Get single customer by ID
  const getCustomer = (id: string) => {
    return customers.find(customer => customer.id === id);
  };

  // Search customers
  const searchCustomers = (query: string) => {
    if (!query) return customers;
    
    const lowercaseQuery = query.toLowerCase();
    return customers.filter(
      customer => 
        customer.name.toLowerCase().includes(lowercaseQuery) || 
        customer.email.toLowerCase().includes(lowercaseQuery) ||
        customer.phone.includes(query)
    );
  };

  // Update customer loyalty points
  const updateLoyaltyPoints = (id: string, points: number) => {
    setCustomers(prevCustomers => 
      prevCustomers.map(customer => 
        customer.id === id 
          ? { ...customer, loyaltyPoints: customer.loyaltyPoints + points } 
          : customer
      )
    );
  };

  return (
    <CustomerContext.Provider value={{ 
      customers, 
      loading, 
      error, 
      getCustomer, 
      searchCustomers,
      updateLoyaltyPoints 
    }}>
      {children}
    </CustomerContext.Provider>
  );
}

// Custom hook to use customer context
export function useCustomers() {
  const context = useContext(CustomerContext);
  if (context === undefined) {
    throw new Error('useCustomers must be used within a CustomerProvider');
  }
  return context;
}