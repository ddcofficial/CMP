import React from 'react';
import { useAuth } from '../../hooks/useAuth';

const Navbar = () => {
  const { logout } = useAuth();
  return (
    <nav className="bg-gray-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Call My Pods</h1>
        <div>
          <button onClick={logout} className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded">
            Log Out
          </button>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
