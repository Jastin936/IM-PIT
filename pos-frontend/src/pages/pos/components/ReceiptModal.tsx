import React from 'react';
import { useCart } from '../../../contexts/CartContext';
import { X, Printer, Download, Mail } from 'lucide-react';

interface ReceiptModalProps {
  onClose: () => void;
}

const ReceiptModal: React.FC<ReceiptModalProps> = ({ onClose }) => {
  const { 
    state: { items, customer, payments }, 
    subtotal,
    taxAmount,
    discountAmount,
    total,
    balance 
  } = useCart();

  const currentDate = new Date().toLocaleDateString();
  const currentTime = new Date().toLocaleTimeString();
  const receiptNumber = 'R' + Math.floor(Math.random() * 10000).toString().padStart(4, '0');

  const handlePrint = () => {
    window.print();
  };

  const handleEmail = () => {
    alert('Receipt would be emailed to customer in a production environment.');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-medium text-gray-900">Receipt</h3>
          <button
            className="text-gray-400 hover:text-gray-500"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-4 bg-white" id="receipt-content">
          <div className="text-center mb-4">
            <h2 className="text-xl font-bold">RetailPro Store</h2>
            <p className="text-sm text-gray-600">Claro M. Recto Avenue, Lapasan, Cagayan de Oro City</p>
            <p className="text-sm text-gray-600">Tel: (555) 123-4567</p>
          </div>
          
          <div className="border-t border-b border-dashed py-2 mb-4">
            <div className="flex justify-between text-sm">
              <span>Receipt #:</span>
              <span>{receiptNumber}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Date:</span>
              <span>{currentDate}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Time:</span>
              <span>{currentTime}</span>
            </div>
            {customer && (
              <div className="flex justify-between text-sm">
                <span>Customer:</span>
                <span>{customer.name}</span>
              </div>
            )}
          </div>
          
          <div className="mb-4">
            <div className="flex justify-between text-sm font-medium mb-2">
              <span>Item</span>
              <div className="flex">
                <span className="w-16 text-right">Price</span>
                <span className="w-8 text-center">Qty</span>
                <span className="w-16 text-right">Total</span>
              </div>
            </div>
            
            {items.map((item) => (
              <div key={item.product.id} className="flex justify-between text-sm mb-1">
                <span className="flex-1 truncate">{item.product.name}</span>
                <div className="flex">
                  <span className="w-16 text-right">₱{item.price.toFixed(2)}</span>
                  <span className="w-8 text-center">₱{item.quantity}</span>
                  <span className="w-16 text-right">₱{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="border-t border-dashed pt-2 mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Subtotal:</span>
              <span>₱{subtotal.toFixed(2)}</span>
            </div>
            
            {discountAmount > 0 && (
              <div className="flex justify-between text-sm mb-1">
                <span>Discounts:</span>
                <span>-₱{discountAmount.toFixed(2)}</span>
              </div>
            )}
            
            <div className="flex justify-between text-sm mb-1">
              <span>Tax (8.5%):</span>
              <span>₱{taxAmount.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between font-bold mb-3">
              <span>Total:</span>
              <span>₱{total.toFixed(2)}</span>
            </div>
            
            {payments.map((payment, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span>
                  {payment.type === 'cash' && 'Cash'}
                  {payment.type === 'credit' && 'Credit Card'}
                  {payment.type === 'debit' && 'Debit Card'}
                  {payment.type === 'gift_card' && 'Gift Card'}
                  {payment.type === 'loyalty' && 'Loyalty Points'}
                  {payment.reference && ` (${payment.reference})`}:
                </span>
                <span>₱{payment.amount.toFixed(2)}</span>
              </div>
            ))}
            
            {balance > 0 && (
              <div className="flex justify-between text-sm font-medium mt-1">
                <span>Change:</span>
                <span>₱{balance.toFixed(2)}</span>
              </div>
            )}
          </div>
          
          {customer && (
            <div className="border-t border-dashed pt-2 mb-4 text-sm">
              <div className="flex justify-between">
                <span>Previous Points:</span>
                <span>{customer.loyaltyPoints}</span>
              </div>
              <div className="flex justify-between">
                <span>Points Earned:</span>
                <span>+{Math.floor(total)}</span>
              </div>
              <div className="flex justify-between font-medium">
                <span>New Balance:</span>
                <span>{customer.loyaltyPoints + Math.floor(total)}</span>
              </div>
            </div>
          )}
          
          <div className="text-center text-sm mt-6">
            <p>Thank you for shopping with us!</p>
            <p className="text-xs text-gray-500 mt-1">Items can be returned within 30 days with receipt</p>
          </div>
        </div>
        
        <div className="p-4 border-t flex justify-between">
          <button
            className="btn btn-ghost text-sm flex items-center"
            onClick={handleEmail}
          >
            <Mail className="h-4 w-4 mr-1" />
            Email
          </button>
          <button
            className="btn btn-ghost text-sm flex items-center"
            onClick={() => {}}
          >
            <Download className="h-4 w-4 mr-1" />
            Download
          </button>
          <button
            className="btn btn-primary text-sm flex items-center"
            onClick={handlePrint}
          >
            <Printer className="h-4 w-4 mr-1" />
            Print
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReceiptModal;