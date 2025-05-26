import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useProducts } from '../../contexts/ProductContext';
import { useCustomers } from '../../contexts/CustomerContext';
import { 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  AlertTriangle,
  DollarSign,
  ShoppingCart,
  UserCheck,
  BarChart2
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const { products, loading: productsLoading } = useProducts();
  const { customers, loading: customersLoading } = useCustomers();

  // Calculate low stock items
  const lowStockItems = products.filter(
    product => product.stockQuantity <= product.lowStockThreshold
  );

  // Mock sales data
  const salesData = {
    today: 1245.75,
    yesterday: 980.50,
    thisWeek: 7890.25,
    lastWeek: 6540.80,
    percentChange: 20.6
  };

  // Calculate trend (up or down)
  const salesTrend = salesData.today > salesData.yesterday;

  // Mock transaction data
  const recentTransactions = [
    { id: 'TX12345', customer: 'John Smith', total: 124.99, items: 5, date: '2025-06-08 14:30' },
    { id: 'TX12344', customer: 'Sarah Johnson', total: 89.50, items: 3, date: '2025-06-08 13:15' },
    { id: 'TX12343', customer: 'Guest', total: 34.25, items: 2, date: '2025-06-08 12:40' },
    { id: 'TX12342', customer: 'Michael Brown', total: 156.75, items: 7, date: '2025-06-08 11:20' },
    { id: 'TX12341', customer: 'Emily Davis', total: 67.30, items: 4, date: '2025-06-08 10:05' },
  ];

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome back, {user?.name}!</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="card border-l-4 border-l-primary-500">
          <div className="flex items-center">
            <div className="bg-primary-100 p-3 rounded-lg">
              <DollarSign className="h-6 w-6 text-primary-700" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Today's Sales</p>
              <div className="flex items-center">
                <h3 className="text-lg font-bold text-gray-900">${salesData.today.toFixed(2)}</h3>
                <div className={`flex items-center ml-2 ${salesTrend ? 'text-success-600' : 'text-error-600'}`}>
                  <TrendingUp className={`h-4 w-4 ${salesTrend ? '' : 'transform rotate-180'}`} />
                  <span className="text-xs font-medium ml-1">{salesData.percentChange}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card border-l-4 border-l-secondary-500">
          <div className="flex items-center">
            <div className="bg-secondary-100 p-3 rounded-lg">
              <ShoppingCart className="h-6 w-6 text-secondary-700" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Transactions</p>
              <div className="flex items-center">
                <h3 className="text-lg font-bold text-gray-900">24 Today</h3>
                <div className="flex items-center ml-2 text-success-600">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-xs font-medium ml-1">12%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card border-l-4 border-l-accent-500">
          <div className="flex items-center">
            <div className="bg-accent-100 p-3 rounded-lg">
              <ShoppingBag className="h-6 w-6 text-accent-700" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Products</p>
              <h3 className="text-lg font-bold text-gray-900">
                {productsLoading ? '...' : products.length}
              </h3>
              <p className="text-xs text-error-600">
                {productsLoading ? '' : `${lowStockItems.length} low stock`}
              </p>
            </div>
          </div>
        </div>

        <div className="card border-l-4 border-l-success-500">
          <div className="flex items-center">
            <div className="bg-success-100 p-3 rounded-lg">
              <UserCheck className="h-6 w-6 text-success-700" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Customers</p>
              <h3 className="text-lg font-bold text-gray-900">
                {customersLoading ? '...' : customers.length}
              </h3>
              <p className="text-xs text-success-600">3 new today</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions and Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Transactions */}
        <div className="lg:col-span-2 card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Transactions</h2>
            <a href="#" className="text-sm font-medium text-primary-600 hover:text-primary-500">
              View all
            </a>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Transaction
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Items
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-primary-600">
                      {transaction.id}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                      {transaction.customer}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {transaction.items} items
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                      ${transaction.total.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {new Date(transaction.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Stock Alert */}
        <div className="card">
          <div className="flex items-center mb-4">
            <AlertTriangle className="h-5 w-5 text-warning-500 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Low Stock Alert</h2>
          </div>
          {productsLoading ? (
            <p className="text-gray-500">Loading stock information...</p>
          ) : lowStockItems.length === 0 ? (
            <div className="text-center py-6">
              <ShoppingBag className="h-12 w-12 text-success-500 mx-auto mb-3" />
              <p className="text-gray-500">All products are sufficiently stocked</p>
            </div>
          ) : (
            <div className="space-y-3">
              {lowStockItems.map(product => (
                <div key={product.id} className="flex items-center justify-between border-b border-gray-100 pb-2">
                  <div className="flex items-center">
                    {product.image && (
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-10 h-10 object-cover rounded-md mr-3"
                      />
                    )}
                    <div>
                      <p className="font-medium text-gray-900">{product.name}</p>
                      <p className="text-sm text-gray-500">SKU: {product.barcode}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-medium ${
                      product.stockQuantity === 0 
                        ? 'text-error-600' 
                        : product.stockQuantity <= product.lowStockThreshold / 2
                          ? 'text-warning-600'
                          : 'text-gray-700'
                    }`}>
                      {product.stockQuantity} left
                    </p>
                    <p className="text-xs text-gray-500">Min: {product.lowStockThreshold}</p>
                  </div>
                </div>
              ))}
              
              <a 
                href="/inventory" 
                className="block text-center text-sm font-medium text-primary-600 hover:text-primary-500 mt-3"
              >
                View inventory
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;