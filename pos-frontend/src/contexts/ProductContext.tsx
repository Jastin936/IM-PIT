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
    price: 560.00,
    cost: 450.00,
    stockQuantity: 42,
    lowStockThreshold: 10,
    image: 'https://images.pexels.com/photos/2396220/pexels-photo-2396220.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: '2',
    name: 'Organic Avocado',
    barcode: '7890123456789',
    category: 'Fruits',
    price: 325.00,
    cost: 140.00,
    stockQuantity: 78,
    lowStockThreshold: 15,
    image: 'https://images.pexels.com/photos/2228553/pexels-photo-2228553.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: '3',
    name: 'Whole Wheat Bread',
    barcode: '6789012345678',
    category: 'Bread',
    price: 98.00,
    cost: 40,
    stockQuantity: 23,
    lowStockThreshold: 5,
    image: 'https://images.pexels.com/photos/1756061/pexels-photo-1756061.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: '4',
    name: 'Vitamilk: Double Choco',
    barcode: '5678901234567',
    category: 'Dairy',
    price: 106.75,
    cost: 19.00,
    stockQuantity: 36,
    lowStockThreshold: 8,
    image: 'https://shopmetro.ph/marketmarket-supermarket/wp-content/uploads/2021/03/SM102250126-1.jpg',
  },
  {
    id: '5',
    name: 'Nestlé Chuckie',
    barcode: '4567890123456',
    category: 'Dairy',
    price: 13.80,
    cost: 10.00,
    stockQuantity: 18,
    lowStockThreshold: 4,
    image: 'https://asiayaosho.com/PIC_ITEMS/PIC9100541.png',
  },
  {
    id: '6',
    name: 'Birch Tree: Fortified Milk',
    barcode: '3456789012345',
    category: 'Dairy',
    price: 299.00,
    cost: 200.00,
    stockQuantity: 48,
    lowStockThreshold: 12,
    image: 'https://onekanimo.com/image/cache/catalog/grocery/drinks/BirchTreeFortifiedMilk300g-1000x1000.jpg',
  },
  {
    id: '7',
    name: 'Vitasoy: Coconut Milk Unsweetened',
    barcode: '2345678901234',
    category: 'Dairy',
    price: 90.07,
    cost: 50.00,
    stockQuantity: 32,
    lowStockThreshold: 6,
    image: 'https://images.omnivore.com.au/coles/2/1000_2088512.jpg',
  },
  {
    id: '8',
    name: 'Organic Bananas',
    barcode: '1234567890123',
    category: 'Fruits',
    price: 159.00,
    cost: 90.00,
    stockQuantity: 120,
    lowStockThreshold: 20,
    image: 'https://images.pexels.com/photos/1093038/pexels-photo-1093038.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: '9',
    name: 'Eden Cheese',
    barcode: '1545658805445',
    category: 'Dairy',
    price: 58.00,
    cost: 40.00,
    stockQuantity: 120,
    lowStockThreshold: 20,
    image: 'https://bayanmallonline.com/wp-content/uploads/2024/08/img_9417.jpeg',
  },
  {
    id: '10',
    name: 'Coca-Cola 1.5L',
    barcode: '7673657893652',
    category: 'Beverages',
    price: 83.00,
    cost: 15.00,
    stockQuantity: 120,
    lowStockThreshold: 20,
    image: 'https://purposefoods.ph/cdn/shop/products/KobiCoke1.5.jpg?v=1669010072',
  },
  {
    id: '11',
    name: 'Pepsi 1.5L',
    barcode: '2458900545678',
    category: 'Beverages',
    price: 68.00,
    cost: 45.00,
    stockQuantity: 120,
    lowStockThreshold: 20,
    image: 'https://pabilimanila.com/cdn/shop/files/Pepsi-1.5L-500x500_500x_f44109ca-bdc7-43c8-90e9-2ef3fcf7f9b9.jpg?v=1700643138',
  },
  {
    id: '12',
    name: 'Gardenia: White Bread Classic Loaf 400g',
    barcode: '1144678903453',
    category: 'Bread',
    price: 58.50,
    cost: 50.00,
    stockQuantity: 120,
    lowStockThreshold: 20,
    image: 'https://ever.ph/cdn/shop/files/9000000119-Gardenia-White-Bread-Classic-Loaf-400g-240129_dffe5170-36fd-434c-b9c8-c880c6bab752.jpg?v=1744772642',
  },
  {
    id: '13',
    name: 'Whole Chicken',
    barcode: '9907545432345',
    category: 'Poultry',
    price: 332.00,
    cost: 145.00,
    stockQuantity: 120,
    lowStockThreshold: 20,
    image: 'https://www.greenag.com.au/assets/full/GAC2002.jpg?20230516121631',
  },
   {
    id: '14',
    name: 'Chicken Egg',
    barcode: '1674890063890',
    category: 'Poultry',
    price: 310.00,
    cost: 150.00,
    stockQuantity: 120,
    lowStockThreshold: 20,
    image: 'https://www.australianeggs.org.au/assets/tiles/How-chickens-make-eggs__FocusFillWyIwLjAwIiwiMC4wMCIsMTIwMCw2Mjhd.jpg',
  },
  {
    id: '15',
    name: 'Pork Loin',
    barcode: '1146905356789',
    category: 'Meat',
    price: 214.00,
    cost: 125.00,
    stockQuantity: 120,
    lowStockThreshold: 20,
    image: 'https://t4.ftcdn.net/jpg/02/41/62/21/360_F_241622171_4MsPjakftp1qrMaIFoeTZ3uw0yLRHUGC.jpg',
  },
  {
    id: '16',
    name: 'Ground Beef',
    barcode: '9809746375890',
    category: 'Meat',
    price: 350.00,
    cost: 200.00,
    stockQuantity: 120,
    lowStockThreshold: 20,
    image: 'https://justcook.butcherbox.com/wp-content/uploads/2019/06/ground-beef.jpg',
  },
  {
    id: '17',
    name: 'Potato',
    barcode: '0908637452546',
    category: 'Vegetables',
    price: 117.55,
    cost: 100.00,
    stockQuantity: 120,
    lowStockThreshold: 20,
    image: 'https://www.kew.org/sites/default/files/styles/original/public/2025-01/many-potatoes-solanum-tuberosum.jpg.webp?itok=RhcGjOE3',
  },
  {
    id: '18',
    name: 'Carrot',
    barcode: '4567368902467',
    category: 'Vegetables',
    price: 110.00,
    cost: 56.00,
    stockQuantity: 120,
    lowStockThreshold: 20,
    image: 'https://www.hhs1.com/hubfs/carrots%20on%20wood-1.jpg',
  },
  {
    id: '19',
    name: 'Eggplant',
    barcode: '458904346789',
    category: 'Vegetables',
    price: 96.96,
    cost: 55.00,
    stockQuantity: 120,
    lowStockThreshold: 20,
    image: 'https://www.tasteofhome.com/wp-content/uploads/2019/07/Chinese-eggplant-shutterstock_2033421.jpg',
  },
  {
    id: '20',
    name: 'Whole Turkey',
    barcode: '9112456700989',
    category: 'Poultry',
    price: 330.00,
    cost: 250.00,
    stockQuantity: 120,
    lowStockThreshold: 20,
    image: 'https://www.snowwhite.com.mt/wp-content/uploads/2023/05/Turkey-Whole.jpg',
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