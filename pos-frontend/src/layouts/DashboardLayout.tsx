import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, 
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  Users, 
  BarChart, 
  Settings, 
  LogOut, 
  Menu, 
  X 
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Navigation items
  const navItems = [
    { name: 'Dashboard', to: '/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: 'POS', to: '/pos', icon: <ShoppingCart className="w-5 h-5" /> },
    { name: 'Inventory', to: '/inventory', icon: <Package className="w-5 h-5" /> },
    { name: 'Customers', to: '/customers', icon: <Users className="w-5 h-5" /> },
    { name: 'Reports', to: '/reports', icon: <BarChart className="w-5 h-5" /> },
    { name: 'Settings', to: '/settings', icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">
      {/* Mobile sidebar */}
      <div 
        className={`fixed inset-0 flex z-40 md:hidden ${sidebarOpen ? 'block' : 'hidden'}`}
        role="dialog" 
        aria-modal="true"
      >
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-75"
          aria-hidden="true"
          onClick={() => setSidebarOpen(false)}
        ></div>

        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-primary-700">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <span className="sr-only">Close sidebar</span>
              <X className="h-6 w-6 text-white" />
            </button>
          </div>

          <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <div className="flex-shrink-0 flex items-center px-4">
              <ShoppingBag className="h-8 w-8 text-white" />
              <span className="ml-2 text-white text-xl font-bold">RetailPro</span>
            </div>
            <nav className="mt-5 px-2 space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.to}
                  className={({ isActive }) =>
                    `group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                      isActive
                        ? 'bg-primary-800 text-white'
                        : 'text-white hover:bg-primary-600'
                    }`
                  }
                  onClick={() => setSidebarOpen(false)}
                >
                  {item.icon}
                  <span className="ml-3">{item.name}</span>
                </NavLink>
              ))}
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-primary-800 p-4">
            <div className="flex items-center">
              <div>
                <div className="text-base font-medium text-white">{user?.name}</div>
                <div className="text-sm font-medium text-primary-300">{user?.role}</div>
              </div>
              <button
                className="ml-auto flex-shrink-0 bg-primary-600 p-1 rounded-full text-white hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-700 focus:ring-white"
                onClick={handleLogout}
              >
                <LogOut className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-0 flex-1 bg-primary-700">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
                <ShoppingBag className="h-8 w-8 text-white" />
                <span className="ml-2 text-white text-xl font-bold">RetailPro</span>
              </div>
              <nav className="mt-8 flex-1 px-2 space-y-1">
                {navItems.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.to}
                    className={({ isActive }) =>
                      `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                        isActive
                          ? 'bg-primary-800 text-white'
                          : 'text-white hover:bg-primary-600'
                      }`
                    }
                  >
                    {item.icon}
                    <span className="ml-3">{item.name}</span>
                  </NavLink>
                ))}
              </nav>
            </div>
            <div className="flex-shrink-0 flex border-t border-primary-800 p-4">
              <div className="flex items-center">
                <div>
                  <div className="text-sm font-medium text-white">{user?.name}</div>
                  <div className="text-xs font-medium text-primary-300">{user?.role}</div>
                </div>
                <button
                  className="ml-auto flex-shrink-0 bg-primary-600 p-1 rounded-full text-white hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-700 focus:ring-white"
                  onClick={handleLogout}
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3">
          <button
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Menu className="h-6 w-6" />
          </button>
        </div>
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;