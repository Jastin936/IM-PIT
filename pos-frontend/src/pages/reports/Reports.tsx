import React, { useState } from 'react';
import { 
  BarChart2, 
  TrendingUp,
  Calendar,
  FileText,
  Download
} from 'lucide-react';

const Reports = () => {
  const [dateRange, setDateRange] = useState('today');

  // Mock report data
  const reportData = {
    today: {
      sales: 1245.75,
      transactions: 24,
      avgTicket: 51.91,
      topSelling: [
        { name: 'Premium Coffee Blend', quantity: 16, amount: 239.84 },
        { name: 'Organic Bananas', quantity: 28, amount: 27.72 },
        { name: 'Fresh Atlantic Salmon', quantity: 9, amount: 116.91 },
        { name: 'Whole Wheat Bread', quantity: 12, amount: 47.88 },
        { name: 'Organic Free-Range Eggs', quantity: 8, amount: 47.92 },
      ]
    },
    week: {
      sales: 7890.25,
      transactions: 156,
      avgTicket: 50.58,
      topSelling: [
        { name: 'Premium Coffee Blend', quantity: 87, amount: 1304.13 },
        { name: 'Organic Avocado', quantity: 64, amount: 159.36 },
        { name: 'Fresh Atlantic Salmon', quantity: 38, amount: 493.62 },
        { name: 'Almond Milk', quantity: 45, amount: 202.05 },
        { name: 'Organic Bananas', quantity: 132, amount: 130.68 },
      ]
    },
    month: {
      sales: 32450.80,
      transactions: 628,
      avgTicket: 51.67,
      topSelling: [
        { name: 'Premium Coffee Blend', quantity: 346, amount: 5187.54 },
        { name: 'Organic Avocado', quantity: 289, amount: 719.61 },
        { name: 'Fresh Atlantic Salmon', quantity: 156, amount: 2026.44 },
        { name: 'Extra Virgin Olive Oil', quantity: 98, amount: 1175.02 },
        { name: 'Organic Free-Range Eggs', quantity: 175, amount: 1048.25 },
      ]
    }
  };

  // Get the current data based on selected range
  const currentData = reportData[dateRange as keyof typeof reportData];

  // Available reports
  const availableReports = [
    { id: 'sales', name: 'Sales Report', icon: <TrendingUp className="h-5 w-5" /> },
    { id: 'inventory', name: 'Inventory Status', icon: <BarChart2 className="h-5 w-5" /> },
    { id: 'transactions', name: 'Transaction Details', icon: <FileText className="h-5 w-5" /> },
    { id: 'customer', name: 'Customer Activity', icon: <Calendar className="h-5 w-5" /> },
  ];

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
        <p className="text-gray-600">View and download store performance reports</p>
      </div>

      {/* Date Range Selector */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-wrap gap-2">
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              dateRange === 'today' 
                ? 'bg-primary-100 text-primary-700 border border-primary-300' 
                : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
            }`}
            onClick={() => setDateRange('today')}
          >
            Today
          </button>
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              dateRange === 'week' 
                ? 'bg-primary-100 text-primary-700 border border-primary-300' 
                : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
            }`}
            onClick={() => setDateRange('week')}
          >
            This Week
          </button>
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              dateRange === 'month' 
                ? 'bg-primary-100 text-primary-700 border border-primary-300' 
                : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
            }`}
            onClick={() => setDateRange('month')}
          >
            This Month
          </button>
          <div className="relative ml-auto">
            <button
              className="px-4 py-2 bg-primary-600 text-white rounded-md text-sm font-medium hover:bg-primary-700 flex items-center"
            >
              <Download className="h-4 w-4 mr-1" />
              Export Report
            </button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">Total Sales</h3>
            <TrendingUp className="h-5 w-5 text-success-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900">${currentData.sales.toFixed(2)}</p>
          <p className="text-sm text-gray-500 mt-1">
            {dateRange === 'today' ? 'Today' : dateRange === 'week' ? 'This Week' : 'This Month'}
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">Transactions</h3>
            <FileText className="h-5 w-5 text-primary-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{currentData.transactions}</p>
          <p className="text-sm text-gray-500 mt-1">
            {dateRange === 'today' ? 'Today' : dateRange === 'week' ? 'This Week' : 'This Month'}
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">Avg. Ticket</h3>
            <BarChart2 className="h-5 w-5 text-accent-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900">${currentData.avgTicket.toFixed(2)}</p>
          <p className="text-sm text-gray-500 mt-1">
            {dateRange === 'today' ? 'Today' : dateRange === 'week' ? 'This Week' : 'This Month'}
          </p>
        </div>
      </div>

      {/* Top Selling Products */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Top Selling Products</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sales
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentData.topSelling.map((product, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                    {product.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                    ${product.amount.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Available Reports */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Available Reports</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {availableReports.map((report) => (
            <div 
              key={report.id}
              className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 hover:bg-primary-50 transition-colors cursor-pointer"
            >
              <div className="flex items-center">
                <div className="rounded-full bg-primary-100 p-3 mr-3">
                  {report.icon}
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">{report.name}</h4>
                  <p className="text-xs text-gray-500 mt-1">Download or view online</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reports;