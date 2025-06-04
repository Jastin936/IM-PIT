import { useState } from 'react';
import { useCustomers } from '../../contexts/CustomerContext';
import { FaPesoSign } from 'react-icons/fa6';


import { 
  Search, 
  Plus,
  User, 
  Mail, 
  Phone, 
  Gift,  
  Calendar,
  Edit,
  Trash2 
} from 'lucide-react';

const Customers = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { customers, loading, searchCustomers } = useCustomers();

  const filteredCustomers = searchQuery ? searchCustomers(searchQuery) : customers;

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customer Management</h1>
          <p className="text-gray-600">Manage your customers and loyalty programs</p>
        </div>
        <button className="btn btn-primary flex items-center mt-3 sm:mt-0">
          <Plus className="h-4 w-4 mr-1" />
          Add Customer
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="input pl-10"
            placeholder="Search customers by name, email, or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <p className="text-gray-500">Loading customer data...</p>
          </div>
        ) : filteredCustomers.length === 0 ? (
          <div className="p-8 text-center">
            <User className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No customers found</p>
            <p className="text-sm text-gray-400 mt-1">Try adjusting your search or add a new customer</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Loyalty
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Spending
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Member Since
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                          <User className="h-5 w-5 text-primary-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                          <div className="text-xs text-gray-500">ID: {customer.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-500 mb-1">
                        <Mail className="h-4 w-4 mr-1 text-gray-400" />
                        {customer.email}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Phone className="h-4 w-4 mr-1 text-gray-400" />
                        {customer.phone}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Gift className="h-4 w-4 mr-1 text-primary-500" />
                        <span className="text-sm font-medium text-gray-900">{customer.loyaltyPoints} points</span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {customer.loyaltyPoints >= 500 ? 'Gold Member' : 
                         customer.loyaltyPoints >= 200 ? 'Silver Member' : 'Bronze Member'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm font-medium text-gray-900">
                        <FaPesoSign className="h-4 w-4 mr-1 text-success-500" />
                        {customer.totalSpent.toFixed(2)}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Lifetime value
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                        {new Date(customer.memberSince).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-primary-600 hover:text-primary-900 mr-3">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-error-600 hover:text-error-900">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Customers;