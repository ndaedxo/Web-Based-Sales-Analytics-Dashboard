import { useState, useEffect } from 'react';
import { Save, Bell, Palette, Globe, Monitor } from 'lucide-react';

interface SettingsState {
  theme: 'light' | 'dark' | 'system';
  notifications: {
    email: boolean;
    push: boolean;
    sales: boolean;
    team: boolean;
  };
  display: {
    compactView: boolean;
    showTrends: boolean;
    currency: string;
    dateFormat: string;
  };
}

const defaultSettings: SettingsState = {
  theme: 'system',
  notifications: {
    email: true,
    push: true,
    sales: true,
    team: true,
  },
  display: {
    compactView: false,
    showTrends: true,
    currency: 'USD',
    dateFormat: 'MM/DD/YYYY',
  },
};

export function Settings() {
  const [settings, setSettings] = useState<SettingsState>(defaultSettings);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedSettings = localStorage.getItem('salesPulseSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('salesPulseSettings', JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <button
          onClick={handleSave}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Save className="h-4 w-4 mr-2" />
          {saved ? 'Saved!' : 'Save Changes'}
        </button>
      </div>

      {/* Theme Settings */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center mb-4">
          <Palette className="h-5 w-5 text-gray-400 mr-2" />
          <h2 className="text-lg font-medium text-gray-900">Theme Preferences</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700">Theme Mode</label>
            <select
              value={settings.theme}
              onChange={(e) => setSettings({
                ...settings,
                theme: e.target.value as SettingsState['theme']
              })}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center mb-4">
          <Bell className="h-5 w-5 text-gray-400 mr-2" />
          <h2 className="text-lg font-medium text-gray-900">Notification Preferences</h2>
        </div>
        <div className="space-y-4">
          {Object.entries(settings.notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer">
                <span className="ml-2 text-sm text-gray-900 capitalize">
                  {key === 'email' ? 'Email Notifications' :
                   key === 'push' ? 'Push Notifications' :
                   key === 'sales' ? 'Sales Alerts' : 'Team Updates'}
                </span>
              </label>
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => setSettings({
                  ...settings,
                  notifications: {
                    ...settings.notifications,
                    [key]: e.target.checked
                  }
                })}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Display Settings */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center mb-4">
          <Monitor className="h-5 w-5 text-gray-400 mr-2" />
          <h2 className="text-lg font-medium text-gray-900">Display Options</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm text-gray-900">Compact View</label>
            <input
              type="checkbox"
              checked={settings.display.compactView}
              onChange={(e) => setSettings({
                ...settings,
                display: {
                  ...settings.display,
                  compactView: e.target.checked
                }
              })}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="text-sm text-gray-900">Show Trends</label>
            <input
              type="checkbox"
              checked={settings.display.showTrends}
              onChange={(e) => setSettings({
                ...settings,
                display: {
                  ...settings.display,
                  showTrends: e.target.checked
                }
              })}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
          </div>
          <div className="flex items-center space-x-4">
            <label className="text-sm text-gray-900">Currency</label>
            <select
              value={settings.display.currency}
              onChange={(e) => setSettings({
                ...settings,
                display: {
                  ...settings.display,
                  currency: e.target.value
                }
              })}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="JPY">JPY (¥)</option>
            </select>
          </div>
          <div className="flex items-center space-x-4">
            <label className="text-sm text-gray-900">Date Format</label>
            <select
              value={settings.display.dateFormat}
              onChange={(e) => setSettings({
                ...settings,
                display: {
                  ...settings.display,
                  dateFormat: e.target.value
                }
              })}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}