import React, { useState } from 'react';
import { useProducts } from '../../contexts/ProductContext';
import { useCustomers } from '../../contexts/CustomerContext';
import { useCart } from '../../contexts/CartContext';
import { 
  Search, 
  ShoppingCart, 
  X, 
  Plus, 
  Minus, 
  Trash2, 
  User, 
  Tag, 
  CreditCard,
  Printer,
  Check,
  Barcode
} from 'lucide-react';

import ProductItem from './components/ProductItem';
import CustomerSearch from './components/CustomerSearch';
import PaymentModal from './components/PaymentModal';
import ReceiptModal from './components/ReceiptModal';

const formatPeso = (value: number) => {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 2,
  }).format(value);
};

const Pos = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showCustomerSearch, setShowCustomerSearch] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const { products, loading, searchProducts } = useProducts();
  const { customers } = useCustomers();
  const { 
    state: { items, customer, discounts }, 
    addItem, 
    removeItem, 
    updateQuantity, 
    setCustomer,
    applyDiscount,
    subtotal,
    taxAmount,
    discountAmount,
    total,
    itemCount,
    completeTransaction
  } = useCart();

  const filteredProducts = searchQuery ? searchProducts(searchQuery) : products;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleScanBarcode = () => {
    const barcode = prompt('Enter product barcode:');
    if (barcode) {
      const product = products.find(p => p.barcode === barcode);
      if (product) {
        addItem(product, 1);
      } else {
        alert('Product not found with barcode: ' + barcode);
      }
    }
  };

  const handleRemoveCustomer = () => {
    setCustomer(null);
  };

  const handleSelectCustomer = (customerId: string) => {
    const selectedCustomer = customers.find(c => c.id === customerId);
    if (selectedCustomer) {
      setCustomer(selectedCustomer);
      setShowCustomerSearch(false);
      if (selectedCustomer.loyaltyPoints > 100) {
        const memberDiscountId = discounts.find(d => d.name.includes('Member'))?.id;
        if (memberDiscountId) {
          applyDiscount(memberDiscountId, true);
        }
      }
    }
  };

  const handleCheckout = async () => {
    if (items.length === 0) {
      alert('Cart is empty. Add items before checkout.');
      return;
    }
    setShowPaymentModal(true);
  };

  const handlePaymentComplete = async () => {
    setIsCheckingOut(true);
    setShowPaymentModal(false);
    try {
      await completeTransaction();
      setCheckoutSuccess(true);
      setShowReceiptModal(true);
    } catch (error) {
      console.error('Transaction failed:', error);
    } finally {
      alert('Transaction failed. Please try again.');
      setIsCheckingOut(false);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Point of Sale</h1>
      <div className="flex flex-col md:flex-row h-full space-y-4 md:space-y-0 md:space-x-4 animate-fade-in">
        <div className="md:w-2/3 bg-white rounded-lg shadow-sm p-4 flex flex-col">
          <div className="flex items-center mb-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="input pl-10"
                placeholder="Search products..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
            <button className="ml-2 btn btn-primary flex items-center" onClick={handleScanBarcode}>
              <Barcode className="h-5 w-5 mr-1" />
              <span className="hidden sm:inline">Scan</span>
            </button>
          </div>
          {loading ? (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-gray-500">Loading products...</p>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredProducts.length === 0 ? (
                <div className="col-span-full flex items-center justify-center h-full">
                  <p className="text-gray-500">No products found</p>
                </div>
              ) : (
                filteredProducts.map(product => (
                  <ProductItem key={product.id} product={product} onAddToCart={() => addItem(product, 1)} />
                ))
              )}
            </div>
          )}
        </div>
        <div className="md:w-1/3 bg-white rounded-lg shadow-sm p-4 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <ShoppingCart className="h-5 w-5 text-gray-500 mr-2" />
              <h2 className="text-lg font-medium text-gray-900">Shopping Cart</h2>
            </div>
            <div className="text-sm text-gray-500">{itemCount} items</div>
          </div>
          <div className="mb-4">
            {customer ? (
              <div className="flex items-center justify-between bg-primary-50 p-2 rounded-md">
                <div className="flex items-center">
                  <User className="h-5 w-5 text-primary-500 mr-2" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{customer.name}</p>
                    <p className="text-xs text-gray-500">
                      {customer.loyaltyPoints} points | {formatPeso(customer.totalSpent)} spent
                    </p>
                  </div>
                </div>
                <button onClick={handleRemoveCustomer} className="text-gray-400 hover:text-gray-600">
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <button className="w-full btn btn-ghost flex items-center justify-center text-sm" onClick={() => setShowCustomerSearch(true)}>
                <User className="h-4 w-4 mr-2" />
                Add Customer
              </button>
            )}
          </div>
          <div className="flex-1 overflow-y-auto mb-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center py-8 text-center">
                <ShoppingCart className="h-12 w-12 text-gray-300 mb-2" />
                <p className="text-gray-500">Your cart is empty</p>
                <p className="text-sm text-gray-400">Add products to get started</p>
              </div>
            ) : (
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.product.id} className="flex items-center">
                    {item.product.image ? (
                      <img src={item.product.image} alt={item.product.name} className="w-12 h-12 object-cover rounded-md" />
                    ) : (
                      <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center">
                        <ShoppingCart className="h-6 w-6 text-gray-400" />
                      </div>
                    )}
                    <div className="ml-3 flex-1">
                      <p className="text-sm font-medium text-gray-900">{item.product.name}</p>
                      <p className="text-sm text-gray-500">{formatPeso(item.price)}</p>
                    </div>
                    <div className="flex items-center">
                      <button className="p-1 text-gray-400 hover:text-gray-600" onClick={() => updateQuantity(item.product.id, item.quantity - 1)} disabled={item.quantity <= 1}>
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <button className="p-1 text-gray-400 hover:text-gray-600" onClick={() => updateQuantity(item.product.id, item.quantity + 1)} disabled={item.quantity >= item.product.stockQuantity}>
                        <Plus className="h-4 w-4" />
                      </button>
                      <button className="p-1 ml-1 text-gray-400 hover:text-error-500" onClick={() => removeItem(item.product.id)}>
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <Tag className="h-4 w-4 text-gray-500 mr-2" />
              <h3 className="text-sm font-medium text-gray-700">Discounts</h3>
            </div>
            <div className="space-y-2">
              {discounts.map((discount) => (
                <div key={discount.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`discount-${discount.id}`}
                    checked={discount.applied}
                    onChange={(e) => applyDiscount(discount.id, e.target.checked)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor={`discount-${discount.id}`} className="ml-2 text-sm text-gray-700 flex-1">
                    {discount.name}
                  </label>
                  <span className="text-sm text-gray-500">
                    {discount.type === 'percentage' ? `${discount.value}%` : formatPeso(discount.value)}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="border-t border-gray-100 pt-4 mb-4">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-500">Subtotal</span>
              <span className="text-sm font-medium">{formatPeso(subtotal)}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-500">Discount</span>
                <span className="text-sm font-medium text-success-600">-{formatPeso(discountAmount)}</span>
              </div>
            )}
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-500">Tax (8.5%)</span>
              <span className="text-sm font-medium">{formatPeso(taxAmount)}</span>
            </div>
            <div className="flex justify-between font-medium">
              <span className="text-base text-gray-900">Total</span>
              <span className="text-base text-gray-900">{formatPeso(total)}</span>
            </div>
          </div>
          <div>
            <button
              className="w-full btn btn-primary flex items-center justify-center"
              onClick={handleCheckout}
              disabled={items.length === 0 || isCheckingOut}
            >
              {isCheckingOut ? (
                <>Processing...</>
              ) : checkoutSuccess ? (
                <>
                  <Check className="h-5 w-5 mr-2" />
                  Transaction Complete
                </>
              ) : (
                <>
                  <CreditCard className="h-5 w-5 mr-2" />
                  Checkout
                </>
              )}
            </button>
            {checkoutSuccess && (
              <button
                className="w-full btn btn-ghost flex items-center justify-center mt-2"
                onClick={() => setShowReceiptModal(true)}
              >
                <Printer className="h-5 w-5 mr-2" />
                Print Receipt
              </button>
            )}
          </div>
        </div>
      </div>
      {showCustomerSearch && (
        <CustomerSearch onClose={() => setShowCustomerSearch(false)} onSelect={handleSelectCustomer} />
      )}
      {showPaymentModal && (
        <PaymentModal onClose={() => setShowPaymentModal(false)} onComplete={handlePaymentComplete} />
      )}
      {showReceiptModal && <ReceiptModal onClose={() => setShowReceiptModal(false)} />}
    </div>
  );
};

export default Pos;
