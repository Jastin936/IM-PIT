import React, { useState } from 'react';
import { useCustomers } from '../../../contexts/CustomerContext';
import { Search, X, User } from 'lucide-react';

interface CustomerSearchProps {
  onClose: () => void;
  onSelect: (customerId: string) => void;
}

const CustomerSearch: React.FC<CustomerSearchProps> = ({ onClose, onSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { customers, searchCustomers } = useCustomers();

  const filteredCustomers = searchQuery ? searchCustomers(searchQuery) : customers;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-medium text-gray-900">Select Customer</h3>
          <button
            className="text-gray-400 hover:text-gray-500"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-4">
          <div className="relative mb-4">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="input pl-10"
              placeholder="Search customers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="max-h-80 overflow-y-auto">
            {filteredCustomers.length === 0 ? (
              <div className="text-center py-4">
                <p className="text-gray-500">No customers found</p>
              </div>
            ) : (
              <div className="space-y-2">
                {filteredCustomers.map((customer) => (
                  <div
                    key={customer.id}
                    className="p-3 border rounded-md hover:bg-gray-50 cursor-pointer transition-colors duration-150"
                    onClick={() => onSelect(customer.id)}
                  >
                    <div className="flex items-center">
                      <div className="bg-primary-100 p-2 rounded-full">
                        <User className="h-5 w-5 text-primary-600" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{customer.name}</p>
                        <div className="flex text-xs text-gray-500 space-x-2">
                          <p>{customer.phone}</p>
                          <p>•</p>
                          <p>{customer.loyaltyPoints} points</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="p-4 border-t flex justify-end">
          <button
            className="btn btn-ghost mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              // Create new customer flow would go here
              onClose();
            }}
          >
            New Customer
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerSearch;