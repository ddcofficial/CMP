import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => (
  <aside className="w-64 bg-gray-900 text-white p-4">
    <nav>
      <ul>
        <li className="mb-2"><Link to="/" className="block p-2 rounded hover:bg-gray-700">Dashboard</Link></li>
        <li className="mb-2"><Link to="/pods" className="block p-2 rounded hover:bg-gray-700">Pods</Link></li>
        <li className="mb-2"><Link to="/rides" className="block p-2 rounded hover:bg-gray-700">Rides</Link></li>
        <li className="mb-2"><Link to="/settings" className="block p-2 rounded hover:bg-gray-700">Settings</Link></li>
      </ul>
    </nav>
  </aside>
);
export default Sidebar;
