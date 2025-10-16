import React from 'react';
import { useParams, Link } from 'react-router-dom';

// Placeholder data - this would come from an API
const allPods = [
    { id: 101, status: 'Active', batteryLevel: 88, location: 'Downtown', speed: 15, temperature: 25, maintenanceHistory: [] },
    { id: 102, status: 'Charging', batteryLevel: 100, location: 'Central Hub', speed: 0, temperature: 22, maintenanceHistory: [{ date: '2023-10-15', note: 'Replaced tire' }] },
    { id: 103, status: 'Active', batteryLevel: 65, location: 'Uptown', speed: 12, temperature: 26, maintenanceHistory: [] },
    { id: 104, status: 'Offline', batteryLevel: 15, location: 'Warehouse', speed: 0, temperature: 20, maintenanceHistory: [] },
    { id: 105, status: 'Maintenance', batteryLevel: 50, location: 'Central Hub', speed: 0, temperature: 23, maintenanceHistory: [{ date: '2023-10-20', note: 'Software update' }] },
    { id: 106, status: 'Active', batteryLevel: 92, location: 'Suburb', speed: 18, temperature: 24, maintenanceHistory: [] },
];

const TelemetryItem = ({ label, value }) => (
    <div>
        <dt className="text-sm font-medium text-gray-500">{label}</dt>
        <dd className="mt-1 text-lg font-semibold text-gray-900">{value}</dd>
    </div>
);

const PodDetails = () => {
  const { id } = useParams();
  const pod = allPods.find(p => p.id.toString() === id);

  if (!pod) {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-4">Pod Not Found</h1>
        <Link to="/pods" className="text-indigo-600 hover:underline">Back to Pod List</Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4">
        <Link to="/pods" className="text-sm font-medium text-gray-500 hover:text-gray-700">
          &larr; Back to Pods
        </Link>
      </div>
      <h1 className="text-3xl font-bold">Pod #{pod.id}</h1>
      <p className="text-lg text-gray-600">{pod.location}</p>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Telemetry & Map */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Real-time Telemetry</h2>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-8">
              <TelemetryItem label="Status" value={pod.status} />
              <TelemetryItem label="Battery" value={`${pod.batteryLevel}%`} />
              <TelemetryItem label="Speed" value={`${pod.speed} km/h`} />
              <TelemetryItem label="Temperature" value={`${pod.temperature}°C`} />
            </dl>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Current Location</h2>
            <div className="h-64 bg-gray-200 rounded-md flex items-center justify-center">
              <p className="text-gray-500">[Map for Pod #{pod.id}]</p>
            </div>
          </div>
        </div>

        {/* Right Column: Maintenance History */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Maintenance History</h2>
          {pod.maintenanceHistory.length > 0 ? (
            <ul className="space-y-4">
              {pod.maintenanceHistory.map((item, index) => (
                <li key={index} className="border-l-4 border-indigo-500 pl-4">
                  <p className="font-semibold">{item.date}</p>
                  <p className="text-sm text-gray-600">{item.note}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">No maintenance history found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PodDetails;