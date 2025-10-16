import React from 'react';
import { Link } from 'react-router-dom';

// Placeholder data - this would come from an API
const metrics = {
  totalPods: 150,
  active: 115,
  charging: 25,
  offline: 10,
  batteryHealth: '92%',
  activeAlerts: 3,
};

const recentActivities = [
  { id: 1, message: 'Pod #102 completed a ride.' },
  { id: 2, message: 'Pod #58 reported low battery.' },
  { id: 3, message: 'Admin marked Pod #12 for maintenance.' },
];

const MetricCard = ({ title, value }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
    <p className="text-3xl font-bold mt-2">{value}</p>
  </div>
);

const Dashboard = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <MetricCard title="Total Pods" value={metrics.totalPods} />
        <MetricCard title="Active Pods" value={metrics.active} />
        <MetricCard title="Active Alerts" value={<span className="text-red-500">{metrics.activeAlerts}</span>} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Live Pod Map */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Live Pod Map</h2>
          <div className="h-96 bg-gray-200 rounded-md flex items-center justify-center">
            <p className="text-gray-500">[Map Placeholder]</p>
          </div>
        </div>

        {/* Quick Actions & Recent Activity */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
            <div className="flex flex-col space-y-2">
              <Link to="/pods" className="w-full text-center bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700">
                View All Pods
              </Link>
              <button className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">
                Start a New Ride
              </button>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
            <ul className="space-y-3">
              {recentActivities.map(activity => (
                <li key={activity.id} className="text-sm text-gray-600">{activity.message}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;