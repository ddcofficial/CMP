import React from 'react';
import { Link } from 'react-router-dom';

const PodStatus = ({ status }) => {
  const statusStyles = {
    Active: 'bg-green-100 text-green-800',
    Charging: 'bg-blue-100 text-blue-800',
    Offline: 'bg-gray-100 text-gray-800',
    Maintenance: 'bg-yellow-100 text-yellow-800',
  };
  return (
    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusStyles[status]}`}>
      {status}
    </span>
  );
};

const PodList = ({ pods }) => {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <ul className="divide-y divide-gray-200">
        {pods.map((pod) => (
          <li key={pod.id}>
            <Link to={`/pods/${pod.id}`} className="block hover:bg-gray-50">
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-indigo-600 truncate">Pod #{pod.id}</p>
                  <div className="ml-2 flex-shrink-0 flex">
                    <PodStatus status={pod.status} />
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500">
                      Battery: {pod.batteryLevel}%
                    </p>
                    <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                      Location: {pod.location}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PodList;