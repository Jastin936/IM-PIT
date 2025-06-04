import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

// Layouts
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Pages
import Login from './pages/auth/Login';
import Dashboard from './pages/dashboard/Dashboard';
import Pos from './pages/pos/Pos';
import Inventory from './pages/inventory/Inventory';
import Customers from './pages/customers/Customers';
import Reports from './pages/reports/Reports';
import Settings from './pages/settings/Settings';

function App() {
  const { user } = useAuth();

  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
        </Route>

        {/* Protected Routes */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/pos" element={user ? <Pos /> : <Navigate to="/login" />} />
          <Route path="/inventory" element={user ? <Inventory /> : <Navigate to="/login" />} />
          <Route path="/customers" element={user ? <Customers /> : <Navigate to="/login" />} />
          <Route path="/reports" element={user ? <Reports /> : <Navigate to="/login" />} />
          <Route path="/settings" element={user ? <Settings /> : <Navigate to="/login" />} />
        </Route>

        {/* Default Route */}
        <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;