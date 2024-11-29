import { useState } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Map, 
  Users, 
  Package, 
  UserSquare2, 
  FileText, 
  Settings,
  Menu,
  X
} from 'lucide-react';
import { Overview } from '../pages/Overview';
import { RegionalInsights } from '../pages/RegionalInsights';
import { CustomerAnalysis } from '../pages/CustomerAnalysis';
import { ProductTrends } from '../pages/ProductTrends';
import { SalesTeam } from '../pages/SalesTeam';
import { Reports } from '../pages/Reports';
import { Settings as SettingsPage } from '../pages/Settings';

const navigation = [
  { name: 'Overview', href: '/', icon: LayoutDashboard },
  { name: 'Regional Insights', href: '/regional', icon: Map },
  { name: 'Customer Analysis', href: '/customers', icon: Users },
  { name: 'Product Trends', href: '/products', icon: Package },
  { name: 'Sales Team', href: '/team', icon: UserSquare2 },
  { name: 'Reports', href: '/reports', icon: FileText },
];

export function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile menu button */}
      <button
        className="fixed top-4 left-4 z-40 lg:hidden bg-white p-2 rounded-md shadow-md"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-30
        w-64 bg-white border-r border-gray-200
        transform transition-transform duration-200 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center h-16 px-6 border-b border-gray-200">
            <h1 className="text-xl font-bold text-gray-900">SalesPulse</h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 pt-4 space-y-1">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) => `
                  flex items-center px-2 py-2 text-sm font-medium rounded-md
                  ${isActive
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }
                `}
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Settings */}
          <div className="p-4 border-t border-gray-200">
            <NavLink
              to="/settings"
              className={({ isActive }) => `
                flex items-center px-2 py-2 text-sm font-medium rounded-md
                ${isActive
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }
              `}
              onClick={() => setSidebarOpen(false)}
            >
              <Settings className="mr-3 h-5 w-5" />
              Settings
            </NavLink>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        <main className="p-8">
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/regional" element={<RegionalInsights />} />
            <Route path="/customers" element={<CustomerAnalysis />} />
            <Route path="/products" element={<ProductTrends />} />
            <Route path="/team" element={<SalesTeam />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}