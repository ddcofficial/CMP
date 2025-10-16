import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isAuthenticated, status, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login({ email, password });
  };

  useEffect(() => {
    if (isAuthenticated) navigate('/');
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input type="email" required className="w-full px-3 py-2 border rounded-md" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input type="password" required className="w-full px-3 py-2 border rounded-md" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          {error && <p className="text-red-500 text-sm">{error.message || 'Login failed'}</p>}
          <button type="submit" className="w-full py-2 px-4 font-bold text-white bg-indigo-500 rounded-md hover:bg-indigo-600 disabled:bg-indigo-300" disabled={status === 'loading'}>
            {status === 'loading' ? 'Logging in...' : 'Login'}
          </button>
          <p className="text-sm text-center">
            Don't have an account? <Link to="/signup" className="text-indigo-500 hover:underline">Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};
export default Login;
