import React, { useState, useMemo } from 'react';
import PodList from '../components/pods/PodList';

// Placeholder data - this would come from an API
const allPods = [
  { id: 101, status: 'Active', batteryLevel: 88, location: 'Downtown' },
  { id: 102, status: 'Charging', batteryLevel: 100, location: 'Central Hub' },
  { id: 103, status: 'Active', batteryLevel: 65, location: 'Uptown' },
  { id: 104, status: 'Offline', batteryLevel: 15, location: 'Warehouse' },
  { id: 105, status: 'Maintenance', batteryLevel: 50, location: 'Central Hub' },
  { id: 106, status: 'Active', batteryLevel: 92, location: 'Suburb' },
];

const Pods = () => {
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredPods = useMemo(() => {
    if (statusFilter === 'All') {
      return allPods;
    }
    return allPods.filter(pod => pod.status === statusFilter);
  }, [statusFilter]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Pod Management</h1>
        <div className="flex items-center space-x-4">
          <label htmlFor="statusFilter" className="text-sm font-medium">Filter by status:</label>
          <select
            id="statusFilter"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option>All</option>
            <option>Active</option>
            <option>Charging</option>
            <option>Offline</option>
            <option>Maintenance</option>
          </select>
        </div>
      </div>

      <PodList pods={filteredPods} />
    </div>
  );
};

export default Pods;