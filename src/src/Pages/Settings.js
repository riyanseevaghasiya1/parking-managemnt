import React, { useState } from 'react';
import { FaUser, FaBell, FaCog, FaLock, FaSave } from 'react-icons/fa';

const Settings = () => {
  const [settings, setSettings] = useState({
    profile: {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1234567890',
      role: 'Administrator'
    },
    notifications: {
      emailNotifications: true,
      pushNotifications: true,
      smsNotifications: false,
      weeklyReports: true
    },
    system: {
      language: 'English',
      timezone: 'UTC',
      dateFormat: 'MM/DD/YYYY',
      theme: 'Light'
    }
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      profile: {
        ...prev.profile,
        [name]: value
      }
    }));
  };

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [name]: checked
      }
    }));
  };

  const handleSystemChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      system: {
        ...prev.system,
        [name]: value
      }
    }));
  };

  return (
    <div className="settings-container p-6">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      
      {/* Profile Settings */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center mb-4">
          <FaUser className="text-blue-600 mr-2" />
          <h2 className="text-xl font-semibold">Profile Settings</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={settings.profile.name}
              onChange={handleProfileChange}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={settings.profile.email}
              onChange={handleProfileChange}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="tel"
              name="phone"
              value={settings.profile.phone}
              onChange={handleProfileChange}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <input
              type="text"
              name="role"
              value={settings.profile.role}
              disabled
              className="w-full p-2 border rounded-md bg-gray-100"
            />
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center mb-4">
          <FaBell className="text-blue-600 mr-2" />
          <h2 className="text-xl font-semibold">Notification Preferences</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              name="emailNotifications"
              checked={settings.notifications.emailNotifications}
              onChange={handleNotificationChange}
              className="h-4 w-4 text-blue-600"
            />
            <label className="ml-2">Email Notifications</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="pushNotifications"
              checked={settings.notifications.pushNotifications}
              onChange={handleNotificationChange}
              className="h-4 w-4 text-blue-600"
            />
            <label className="ml-2">Push Notifications</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="smsNotifications"
              checked={settings.notifications.smsNotifications}
              onChange={handleNotificationChange}
              className="h-4 w-4 text-blue-600"
            />
            <label className="ml-2">SMS Notifications</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="weeklyReports"
              checked={settings.notifications.weeklyReports}
              onChange={handleNotificationChange}
              className="h-4 w-4 text-blue-600"
            />
            <label className="ml-2">Weekly Reports</label>
          </div>
        </div>
      </div>

      {/* System Settings */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center mb-4">
          <FaCog className="text-blue-600 mr-2" />
          <h2 className="text-xl font-semibold">System Settings</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
            <select
              name="language"
              value={settings.system.language}
              onChange={handleSystemChange}
              className="w-full p-2 border rounded-md"
            >
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
            <select
              name="timezone"
              value={settings.system.timezone}
              onChange={handleSystemChange}
              className="w-full p-2 border rounded-md"
            >
              <option value="UTC">UTC</option>
              <option value="EST">EST</option>
              <option value="PST">PST</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date Format</label>
            <select
              name="dateFormat"
              value={settings.system.dateFormat}
              onChange={handleSystemChange}
              className="w-full p-2 border rounded-md"
            >
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Theme</label>
            <select
              name="theme"
              value={settings.system.theme}
              onChange={handleSystemChange}
              className="w-full p-2 border rounded-md"
            >
              <option value="Light">Light</option>
              <option value="Dark">Dark</option>
              <option value="System">System</option>
            </select>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          className="bg-blue-600 text-white px-6 py-2 rounded-md flex items-center hover:bg-blue-700"
          onClick={() => {
            // Handle save settings
            console.log('Settings saved:', settings);
          }}
        >
          <FaSave className="mr-2" />
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Settings; 