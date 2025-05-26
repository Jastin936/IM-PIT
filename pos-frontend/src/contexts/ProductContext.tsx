import React, { createContext, useContext, useState, useEffect } from 'react';

// Types
export interface Product {
  id: string;
  name: string;
  barcode: string;
  category: string;
  price: number;
  cost: number;
  stockQuantity: number;
  lowStockThreshold: number;
  image?: string;
}

interface ProductContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
  getProduct: (id: string) => Product | undefined;
  searchProducts: (query: string) => Product[];
  updateProductStock: (id: string, newQuantity: number) => void;
}

// Mock product data
const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Premium Coffee Blend',
    barcode: '8901234567890',
    category: 'Beverages',
    price: 14.99,
    cost: 8.50,
    stockQuantity: 42,
    lowStockThreshold: 10,
    image: 'https://images.pexels.com/photos/2396220/pexels-photo-2396220.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: '2',
    name: 'Organic Avocado',
    barcode: '7890123456789',
    category: 'Produce',
    price: 2.49,
    cost: 1.25,
    stockQuantity: 78,
    lowStockThreshold: 15,
    image: 'https://images.pexels.com/photos/2228553/pexels-photo-2228553.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: '3',
    name: 'Whole Wheat Bread',
    barcode: '6789012345678',
    category: 'Bakery',
    price: 3.99,
    cost: 1.80,
    stockQuantity: 23,
    lowStockThreshold: 5,
    image: 'https://images.pexels.com/photos/1756061/pexels-photo-1756061.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: '4',
    name: 'Almond Milk',
    barcode: '5678901234567',
    category: 'Dairy & Alternatives',
    price: 4.49,
    cost: 2.75,
    stockQuantity: 36,
    lowStockThreshold: 8,
    image: 'https://images.pexels.com/photos/4397920/pexels-photo-4397920.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: '5',
    name: 'Fresh Atlantic Salmon',
    barcode: '4567890123456',
    category: 'Seafood',
    price: 12.99,
    cost: 8.25,
    stockQuantity: 18,
    lowStockThreshold: 4,
    image: 'https://images.pexels.com/photos/3296424/pexels-photo-3296424.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: '6',
    name: 'Organic Free-Range Eggs',
    barcode: '3456789012345',
    category: 'Dairy & Alternatives',
    price: 5.99,
    cost: 3.50,
    stockQuantity: 48,
    lowStockThreshold: 12,
    image: 'https://images.pexels.com/photos/162712/egg-white-food-protein-162712.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: '7',
    name: 'Extra Virgin Olive Oil',
    barcode: '2345678901234',
    category: 'Pantry',
    price: 11.99,
    cost: 7.25,
    stockQuantity: 32,
    lowStockThreshold: 6,
    image: 'https://images.pexels.com/photos/33783/olive-oil-salad-dressing-cooking.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: '8',
    name: 'Organic Bananas',
    barcode: '1234567890123',
    category: 'Produce',
    price: 0.99,
    cost: 0.45,
    stockQuantity: 120,
    lowStockThreshold: 20,
    image: 'https://images.pexels.com/photos/1093038/pexels-photo-1093038.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
];

// Create context
const ProductContext = createContext<ProductContextType | undefined>(undefined);

// Provider component
export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load products on mount
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 600));
        setProducts(MOCK_PRODUCTS);
        setError(null);
      } catch (err) {
        setError('Failed to load products');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Get single product by ID
  const getProduct = (id: string) => {
    return products.find(product => product.id === id);
  };

  // Search products
  const searchProducts = (query: string) => {
    if (!query) return products;
    
    const lowercaseQuery = query.toLowerCase();
    return products.filter(
      product => 
        product.name.toLowerCase().includes(lowercaseQuery) || 
        product.barcode.includes(query) ||
        product.category.toLowerCase().includes(lowercaseQuery)
    );
  };

  // Update product stock
  const updateProductStock = (id: string, newQuantity: number) => {
    setProducts(prevProducts => 
      prevProducts.map(product => 
        product.id === id ? { ...product, stockQuantity: newQuantity } : product
      )
    );
  };

  return (
    <ProductContext.Provider value={{ 
      products, 
      loading, 
      error, 
      getProduct, 
      searchProducts,
      updateProductStock 
    }}>
      {children}
    </ProductContext.Provider>
  );
}

// Custom hook to use product context
export function useProducts() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}