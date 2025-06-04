import React, { createContext, useContext, useReducer } from 'react';
import { Product, useProducts } from './ProductContext';
import { Customer, useCustomers } from './CustomerContext';

// Types
export interface CartItem {
  product: Product;
  quantity: number;
  price: number; // Price per unit (may differ from product.price if discounted)
}

export interface Discount {
  id: string;
  name: string;
  type: 'percentage' | 'fixed';
  value: number;
  applied: boolean;
}

export interface PaymentMethod {
  type: 'cash' | 'credit' | 'debit' | 'gift_card' | 'loyalty';
  amount: number;
  reference?: string;
}

interface CartState {
  items: CartItem[];
  customer: Customer | null;
  discounts: Discount[];
  payments: PaymentMethod[];
  taxRate: number;
}

type CartAction = 
  | { type: 'ADD_ITEM', payload: { product: Product, quantity: number } }
  | { type: 'REMOVE_ITEM', payload: { productId: string } }
  | { type: 'UPDATE_QUANTITY', payload: { productId: string, quantity: number } }
  | { type: 'SET_CUSTOMER', payload: Customer | null }
  | { type: 'APPLY_DISCOUNT', payload: { discountId: string, applied: boolean } }
  | { type: 'ADD_PAYMENT', payload: PaymentMethod }
  | { type: 'REMOVE_PAYMENT', payload: { index: number } }
  | { type: 'CLEAR_CART' };

interface CartContextType {
  state: CartState;
  addItem: (product: Product, quantity: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  setCustomer: (customer: Customer | null) => void;
  applyDiscount: (discountId: string, applied: boolean) => void;
  addPayment: (payment: PaymentMethod) => void;
  removePayment: (index: number) => void;
  clearCart: () => void;
  subtotal: number;
  taxAmount: number;
  discountAmount: number;
  total: number;
  totalPaid: number;
  balance: number;
  itemCount: number;
  completeTransaction: () => Promise<void>;
}

// Available discounts
const AVAILABLE_DISCOUNTS: Discount[] = [
  {
    id: '1',
    name: '10% Off Entire Purchase',
    type: 'percentage',
    value: 10,
    applied: false,
  },
  {
    id: '2',
    name: '₱50 Off Purchase',
    type: 'fixed',
    value: 50,
    applied: false,
  },
  {
    id: '3',
    name: 'Member Discount (15%)',
    type: 'percentage',
    value: 15,
    applied: false,
  },
];

// Initial state
const initialState: CartState = {
  items: [],
  customer: null,
  discounts: AVAILABLE_DISCOUNTS,
  payments: [],
  taxRate: 8.5, // 8.5% tax rate
};

// Reducer function
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, quantity } = action.payload;
      const existingItemIndex = state.items.findIndex(
        item => item.product.id === product.id
      );

      if (existingItemIndex >= 0) {
        // Update existing item
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity,
        };
        return { ...state, items: updatedItems };
      } else {
        // Add new item
        return {
          ...state,
          items: [...state.items, { product, quantity, price: product.price }],
        };
      }
    }

    case 'REMOVE_ITEM': {
      return {
        ...state,
        items: state.items.filter(item => item.product.id !== action.payload.productId),
      };
    }

    case 'UPDATE_QUANTITY': {
      const { productId, quantity } = action.payload;
      if (quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(item => item.product.id !== productId),
        };
      }

      return {
        ...state,
        items: state.items.map(item =>
          item.product.id === productId
            ? { ...item, quantity }
            : item
        ),
      };
    }

    case 'SET_CUSTOMER': {
      return { ...state, customer: action.payload };
    }

    case 'APPLY_DISCOUNT': {
      const { discountId, applied } = action.payload;
      return {
        ...state,
        discounts: state.discounts.map(discount =>
          discount.id === discountId
            ? { ...discount, applied }
            : discount
        ),
      };
    }

    case 'ADD_PAYMENT': {
      return {
        ...state,
        payments: [...state.payments, action.payload],
      };
    }

    case 'REMOVE_PAYMENT': {
      const payments = [...state.payments];
      payments.splice(action.payload.index, 1);
      return { ...state, payments };
    }

    case 'CLEAR_CART': {
      return {
        ...initialState,
        discounts: AVAILABLE_DISCOUNTS,
      };
    }

    default:
      return state;
  }
};

// Create context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider component
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { updateProductStock } = useProducts();
  const { updateLoyaltyPoints } = useCustomers();

  // Add item to cart
  const addItem = (product: Product, quantity: number) => {
    if (quantity <= 0) return;
    if (product.stockQuantity < quantity) {
      alert(`Only ${product.stockQuantity} units available in stock.`);
      return;
    }
    dispatch({ type: 'ADD_ITEM', payload: { product, quantity } });
  };

  // Remove item from cart
  const removeItem = (productId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { productId } });
  };

  // Update item quantity
  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
  };

  // Set customer
  const setCustomer = (customer: Customer | null) => {
    dispatch({ type: 'SET_CUSTOMER', payload: customer });
  };

  // Apply discount
  const applyDiscount = (discountId: string, applied: boolean) => {
    dispatch({ type: 'APPLY_DISCOUNT', payload: { discountId, applied } });
  };

  // Add payment
  const addPayment = (payment: PaymentMethod) => {
    dispatch({ type: 'ADD_PAYMENT', payload: payment });
  };

  // Remove payment
  const removePayment = (index: number) => {
    dispatch({ type: 'REMOVE_PAYMENT', payload: { index } });
  };

  // Clear cart
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  // Calculate subtotal
  const subtotal = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Calculate total discount amount
  const discountAmount = state.discounts
    .filter(discount => discount.applied)
    .reduce((sum, discount) => {
      if (discount.type === 'percentage') {
        return sum + (subtotal * discount.value / 100);
      } else {
        return sum + discount.value;
      }
    }, 0);

  // Calculate tax amount (after discounts)
  const taxableAmount = Math.max(0, subtotal - discountAmount);
  const taxAmount = taxableAmount * (state.taxRate / 100);

  // Calculate total
  const total = taxableAmount + taxAmount;

  // Calculate total paid
  const totalPaid = state.payments.reduce(
    (sum, payment) => sum + payment.amount,
    0
  );

  // Calculate balance
  const balance = totalPaid - total;

  // Calculate item count
  const itemCount = state.items.reduce(
    (count, item) => count + item.quantity,
    0
  );

  // Complete transaction
  const completeTransaction = async () => {
    if (total > totalPaid) {
      throw new Error('Payment amount is insufficient');
    }

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Update inventory
      state.items.forEach(item => {
        const newStockQuantity = item.product.stockQuantity - item.quantity;
        updateProductStock(item.product.id, newStockQuantity);
      });

      // Update loyalty points if customer exists
      if (state.customer) {
        // Award 1 point per dollar spent
        const pointsToAdd = Math.floor(total);
        updateLoyaltyPoints(state.customer.id, pointsToAdd);
      }

      // Clear cart after successful transaction
      clearCart();

    } catch (error) {
      console.error('Transaction failed:', error);
      throw error;
    }
  };

  return (
    <CartContext.Provider value={{
      state,
      addItem,
      removeItem,
      updateQuantity,
      setCustomer,
      applyDiscount,
      addPayment,
      removePayment,
      clearCart,
      subtotal,
      taxAmount,
      discountAmount,
      total,
      totalPaid,
      balance,
      itemCount,
      completeTransaction,
    }}>
      {children}
    </CartContext.Provider>
  );
}

// Custom hook to use cart context
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}