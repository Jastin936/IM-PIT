import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Settings as SettingsIcon, 
  User, 
  ShieldCheck, 
  CreditCard,
  Printer,
  Tag,
  Bell,
  Store
} from 'lucide-react';

const Settings = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('account');

  // Tabs
  const tabs = [
    { id: 'account', name: 'Account', icon: <User className="h-5 w-5" /> },
    { id: 'security', name: 'Security', icon: <ShieldCheck className="h-5 w-5" /> },
    { id: 'payments', name: 'Payment Methods', icon: <CreditCard className="h-5 w-5" /> },
    { id: 'receipts', name: 'Receipt Settings', icon: <Printer className="h-5 w-5" /> },
    { id: 'taxes', name: 'Tax Settings', icon: <Tag className="h-5 w-5" /> },
    { id: 'notifications', name: 'Notifications', icon: <Bell className="h-5 w-5" /> },
    { id: 'store', name: 'Store Details', icon: <Store className="h-5 w-5" /> },
  ];

  // Check if user has access to settings
  const hasAccess = user?.role === 'admin' || user?.role === 'manager';

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Configure your POS system preferences</p>
      </div>

      {!hasAccess ? (
        <div className="bg-warning-50 border border-warning-200 rounded-md p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <ShieldCheck className="h-5 w-5 text-warning-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-warning-800">Access Restricted</h3>
              <div className="mt-2 text-sm text-warning-700">
                <p>
                  You don't have permission to access settings. Please contact an administrator or manager for assistance.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="md:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-4 border-b">
                <div className="flex items-center">
                  <SettingsIcon className="h-5 w-5 text-gray-500 mr-2" />
                  <h2 className="text-lg font-medium text-gray-900">Settings</h2>
                </div>
              </div>
              <nav className="p-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md mb-1 ${
                      activeTab === tab.id
                        ? 'bg-primary-50 text-primary-700'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <span className={`mr-3 ${activeTab === tab.id ? 'text-primary-500' : 'text-gray-400'}`}>
                      {tab.icon}
                    </span>
                    {tab.name}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {activeTab === 'account' && <AccountSettings />}
              {activeTab === 'security' && <SecuritySettings />}
              {activeTab === 'payments' && <PaymentSettings />}
              {activeTab === 'receipts' && <ReceiptSettings />}
              {activeTab === 'taxes' && <TaxSettings />}
              {activeTab === 'notifications' && <NotificationSettings />}
              {activeTab === 'store' && <StoreSettings />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const AccountSettings = () => {
  const { user } = useAuth();

  return (
    <div>
      <h2 className="text-xl font-medium text-gray-900 mb-6">Account Settings</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Profile Information</h3>
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                First name
              </label>
              <input
                type="text"
                name="first-name"
                id="first-name"
                className="mt-1 input"
                defaultValue={user?.name.split(' ')[0]}
              />
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                Last name
              </label>
              <input
                type="text"
                name="last-name"
                id="last-name"
                className="mt-1 input"
                defaultValue={user?.name.split(' ')[1] || ''}
              />
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="mt-1 input"
                defaultValue={user?.email}
              />
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                Role
              </label>
              <select
                id="role"
                name="role"
                className="mt-1 input"
                defaultValue={user?.role}
                disabled
              >
                <option value="admin">Administrator</option>
                <option value="manager">Manager</option>
                <option value="cashier">Cashier</option>
              </select>
            </div>
          </div>
        </div>

        <div className="pt-5">
          <div className="flex justify-end">
            <button type="button" className="btn btn-ghost mr-3">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const SecuritySettings = () => {
  return (
    <div>
      <h2 className="text-xl font-medium text-gray-900 mb-6">Security Settings</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Change Password</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="current-password" className="block text-sm font-medium text-gray-700">
                Current password
              </label>
              <input
                type="password"
                name="current-password"
                id="current-password"
                className="mt-1 input"
              />
            </div>

            <div>
              <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
                New password
              </label>
              <input
                type="password"
                name="new-password"
                id="new-password"
                className="mt-1 input"
              />
            </div>

            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                Confirm password
              </label>
              <input
                type="password"
                name="confirm-password"
                id="confirm-password"
                className="mt-1 input"
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Two-Factor Authentication</h3>
          <div className="bg-gray-50 p-4 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <ShieldCheck className="h-5 w-5 text-gray-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-gray-800">Two-factor authentication not enabled</h3>
                <div className="mt-2 text-sm text-gray-500">
                  <p>
                    Add additional security to your account using two-factor authentication.
                  </p>
                </div>
                <div className="mt-3">
                  <button type="button" className="btn btn-primary text-sm">
                    Enable two-factor authentication
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-5">
          <div className="flex justify-end">
            <button type="button" className="btn btn-ghost mr-3">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const PaymentSettings = () => {
  return (
    <div>
      <h2 className="text-xl font-medium text-gray-900 mb-6">Payment Method Settings</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Providers</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-md">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <CreditCard className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-gray-800">Credit Card Processor</h3>
                  <p className="text-sm text-gray-500">Stripe</p>
                </div>
              </div>
              <div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success-100 text-success-800">
                  Connected
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-md">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <CreditCard className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-gray-800">Mobile Payment Processor</h3>
                  <p className="text-sm text-gray-500">Not configured</p>
                </div>
              </div>
              <div>
                <button type="button" className="btn btn-ghost text-sm">
                  Configure
                </button>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Accepted Payment Methods</h3>
          <div className="space-y-3">
            <div className="relative flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="payment-cash"
                  name="payment-cash"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 border-gray-300 rounded"
                  defaultChecked
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="payment-cash" className="font-medium text-gray-700">
                  Cash
                </label>
              </div>
            </div>

            <div className="relative flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="payment-credit"
                  name="payment-credit"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 border-gray-300 rounded"
                  defaultChecked
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="payment-credit" className="font-medium text-gray-700">
                  Credit Cards
                </label>
              </div>
            </div>

            <div className="relative flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="payment-debit"
                  name="payment-debit"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 border-gray-300 rounded"
                  defaultChecked
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="payment-debit" className="font-medium text-gray-700">
                  Debit Cards
                </label>
              </div>
            </div>

            <div className="relative flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="payment-gift"
                  name="payment-gift"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 border-gray-300 rounded"
                  defaultChecked
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="payment-gift" className="font-medium text-gray-700">
                  Gift Cards
                </label>
              </div>
            </div>

            <div className="relative flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="payment-mobile"
                  name="payment-mobile"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 border-gray-300 rounded"
                  defaultChecked
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="payment-mobile" className="font-medium text-gray-700">
                  Mobile Payments (Apple Pay, Google Pay)
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-5">
          <div className="flex justify-end">
            <button type="button" className="btn btn-ghost mr-3">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ReceiptSettings = () => {
  return (
    <div>
      <h2 className="text-xl font-medium text-gray-900 mb-6">Receipt Settings</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Receipt Content</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label htmlFor="store-name" className="block text-sm font-medium text-gray-700">
                  Store Name
                </label>
                <input
                  type="text"
                  name="store-name"
                  id="store-name"
                  className="mt-1 input"
                  defaultValue="RetailPro Store"
                />
              </div>

              <div className="sm:col-span-4">
                <label htmlFor="store-address" className="block text-sm font-medium text-gray-700">
                  Store Address
                </label>
                <input
                  type="text"
                  name="store-address"
                  id="store-address"
                  className="mt-1 input"
                  defaultValue="123 Main Street, Anytown USA"
                />
              </div>

              <div className="sm:col-span-4">
                <label htmlFor="store-phone" className="block text-sm font-medium text-gray-700">
                  Store Phone
                </label>
                <input
                  type="text"
                  name="store-phone"
                  id="store-phone"
                  className="mt-1 input"
                  defaultValue="(555) 123-4567"
                />
              </div>

              <div className="sm:col-span-4">
                <label htmlFor="receipt-footer" className="block text-sm font-medium text-gray-700">
                  Receipt Footer Message
                </label>
                <textarea
                  name="receipt-footer"
                  id="receipt-footer"
                  rows={2}
                  className="mt-1 input"
                  defaultValue="Thank you for shopping with us!"
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Receipt Options</h3>
          <div className="space-y-3">
            <div className="relative flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="option-logo"
                  name="option-logo"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 border-gray-300 rounded"
                  defaultChecked
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="option-logo" className="font-medium text-gray-700">
                  Display store logo
                </label>
              </div>
            </div>

            <div className="relative flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="option-barcode"
                  name="option-barcode"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 border-gray-300 rounded"
                  defaultChecked
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="option-barcode" className="font-medium text-gray-700">
                  Print receipt barcode/QR code
                </label>
              </div>
            </div>

            <div className="relative flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="option-items"
                  name="option-items"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 border-gray-300 rounded"
                  defaultChecked
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="option-items" className="font-medium text-gray-700">
                  Show item details (SKU, price per unit)
                </label>
              </div>
            </div>

            <div className="relative flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="option-tax"
                  name="option-tax"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 border-gray-300 rounded"
                  defaultChecked
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="option-tax" className="font-medium text-gray-700">
                  Show tax breakdown
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-5">
          <div className="flex justify-end">
            <button type="button" className="btn btn-ghost mr-3">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const TaxSettings = () => {
  return (
    <div>
      <h2 className="text-xl font-medium text-gray-900 mb-6">Tax Settings</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Tax Configuration</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="tax-rate" className="block text-sm font-medium text-gray-700">
                  Default Tax Rate (%)
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type="text"
                    name="tax-rate"
                    id="tax-rate"
                    className="input pr-12"
                    defaultValue="8.5"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">%</span>
                  </div>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="tax-name" className="block text-sm font-medium text-gray-700">
                  Tax Name
                </label>
                <input
                  type="text"
                  name="tax-name"
                  id="tax-name"
                  className="mt-1 input"
                  defaultValue="Sales Tax"
                />
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="tax-region" className="block text-sm font-medium text-gray-700">
                  Tax Region
                </label>
                <input
                  type="text"
                  name="tax-region"
                  id="tax-region"
                  className="mt-1 input"
                  defaultValue="Default"
                />
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="tax-number" className="block text-sm font-medium text-gray-700">
                  Tax Registration Number
                </label>
                <input
                  type="text"
                  name="tax-number"
                  id="tax-number"
                  className="mt-1 input"
                  placeholder="Optional"
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Tax Options</h3>
          <div className="space-y-3">
            <div className="relative flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="tax-inclusive"
                  name="tax-inclusive"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="tax-inclusive" className="font-medium text-gray-700">
                  Prices include tax
                </label>
                <p className="text-gray-500">When enabled, product prices will be displayed with tax included.</p>
              </div>
            </div>

            <div className="relative flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="tax-automatic"
                  name="tax-automatic"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 border-gray-300 rounded"
                  defaultChecked
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="tax-automatic" className="font-medium text-gray-700">
                  Automatically calculate tax
                </label>
                <p className="text-gray-500">When enabled, tax will be calculated based on the customer's location.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-5">
          <div className="flex justify-end">
            <button type="button" className="btn btn-ghost mr-3">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const NotificationSettings = () => {
  return (
    <div>
      <h2 className="text-xl font-medium text-gray-900 mb-6">Notification Settings</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Email Notifications</h3>
          <div className="space-y-3">
            <div className="relative flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="notify-sales"
                  name="notify-sales"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 border-gray-300 rounded"
                  defaultChecked
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="notify-sales" className="font-medium text-gray-700">
                  Daily sales summary
                </label>
                <p className="text-gray-500">Receive a daily email with sales summary and key metrics.</p>
              </div>
            </div>

            <div className="relative flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="notify-inventory"
                  name="notify-inventory"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 border-gray-300 rounded"
                  defaultChecked
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="notify-inventory" className="font-medium text-gray-700">
                  Low stock alerts
                </label>
                <p className="text-gray-500">Receive notifications when products fall below their threshold.</p>
              </div>
            </div>

            <div className="relative flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="notify-returns"
                  name="notify-returns"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 border-gray-300 rounded"
                  defaultChecked
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="notify-returns" className="font-medium text-gray-700">
                  Return and refund alerts
                </label>
                <p className="text-gray-500">Receive notifications for returns and refunds processed.</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">System Notifications</h3>
          <div className="space-y-3">
            <div className="relative flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="notify-login"
                  name="notify-login"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 border-gray-300 rounded"
                  defaultChecked
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="notify-login" className="font-medium text-gray-700">
                  Login alerts
                </label>
                <p className="text-gray-500">Receive notifications when users log in to the system.</p>
              </div>
            </div>

            <div className="relative flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="notify-system"
                  name="notify-system"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 border-gray-300 rounded"
                  defaultChecked
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="notify-system" className="font-medium text-gray-700">
                  System updates
                </label>
                <p className="text-gray-500">Receive notifications for system updates and maintenance.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-5">
          <div className="flex justify-end">
            <button type="button" className="btn btn-ghost mr-3">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const StoreSettings = () => {
  return (
    <div>
      <h2 className="text-xl font-medium text-gray-900 mb-6">Store Settings</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Store Information</h3>
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="store-name" className="block text-sm font-medium text-gray-700">
                Store Name
              </label>
              <input
                type="text"
                name="store-name"
                id="store-name"
                className="mt-1 input"
                defaultValue="RetailPro Store"
              />
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="store-phone" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="text"
                name="store-phone"
                id="store-phone"
                className="mt-1 input"
                defaultValue="(555) 123-4567"
              />
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="store-email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="store-email"
                id="store-email"
                className="mt-1 input"
                defaultValue="contact@retailpro.example"
              />
            </div>

            <div className="sm:col-span-6">
              <label htmlFor="store-address" className="block text-sm font-medium text-gray-700">
                Street Address
              </label>
              <input
                type="text"
                name="store-address"
                id="store-address"
                className="mt-1 input"
                defaultValue="123 Main Street"
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="store-city" className="block text-sm font-medium text-gray-700">
                City
              </label>
              <input
                type="text"
                name="store-city"
                id="store-city"
                className="mt-1 input"
                defaultValue="Anytown"
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="store-state" className="block text-sm font-medium text-gray-700">
                State / Province
              </label>
              <input
                type="text"
                name="store-state"
                id="store-state"
                className="mt-1 input"
                defaultValue="CA"
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="store-zip" className="block text-sm font-medium text-gray-700">
                ZIP / Postal Code
              </label>
              <input
                type="text"
                name="store-zip"
                id="store-zip"
                className="mt-1 input"
                defaultValue="12345"
              />
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="store-country" className="block text-sm font-medium text-gray-700">
                Country
              </label>
              <select
                id="store-country"
                name="store-country"
                className="mt-1 input"
                defaultValue="US"
              >
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="MX">Mexico</option>
                <option value="GB">United Kingdom</option>
                <option value="AU">Australia</option>
              </select>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="store-timezone" className="block text-sm font-medium text-gray-700">
                Time Zone
              </label>
              <select
                id="store-timezone"
                name="store-timezone"
                className="mt-1 input"
                defaultValue="America/Los_Angeles"
              >
                <option value="America/Los_Angeles">Pacific Time (US & Canada)</option>
                <option value="America/Denver">Mountain Time (US & Canada)</option>
                <option value="America/Chicago">Central Time (US & Canada)</option>
                <option value="America/New_York">Eastern Time (US & Canada)</option>
              </select>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Business Hours</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Day</label>
                <div className="mt-1 py-2">Monday</div>
              </div>
              <div>
                <label htmlFor="monday-open" className="block text-sm font-medium text-gray-700">Opening Time</label>
                <input
                  type="time"
                  name="monday-open"
                  id="monday-open"
                  className="mt-1 input"
                  defaultValue="09:00"
                />
              </div>
              <div>
                <label htmlFor="monday-close" className="block text-sm font-medium text-gray-700">Closing Time</label>
                <input
                  type="time"
                  name="monday-close"
                  id="monday-close"
                  className="mt-1 input"
                  defaultValue="18:00"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="mt-1 py-2">Tuesday</div>
              </div>
              <div>
                <input
                  type="time"
                  name="tuesday-open"
                  id="tuesday-open"
                  className="mt-1 input"
                  defaultValue="09:00"
                />
              </div>
              <div>
                <input
                  type="time"
                  name="tuesday-close"
                  id="tuesday-close"
                  className="mt-1 input"
                  defaultValue="18:00"
                />
              </div>
            </div>

            {/* Additional days would follow the same pattern */}
          </div>
        </div>

        <div className="pt-5">
          <div className="flex justify-end">
            <button type="button" className="btn btn-ghost mr-3">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;