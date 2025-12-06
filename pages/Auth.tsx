import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/storage';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ identity: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const result = await authService.login(formData.identity, formData.password);
    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="max-w-md mx-auto py-12">
      <h1 className="text-2xl font-bold mb-6">Log in</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <div className="p-3 bg-red-900/20 border border-red-900 text-red-200 text-sm rounded">{error}</div>}
        <div>
          <label className="block text-sm mb-1.5 text-neutral-400">Email or username</label>
          <input
            type="text"
            required
            className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2.5 text-sm focus:border-neutral-600 focus:outline-none focus:ring-1 focus:ring-neutral-600 transition-all"
            value={formData.identity}
            onChange={e => setFormData({...formData, identity: e.target.value})}
          />
        </div>
        <div>
           <div className="flex justify-between items-center mb-1.5">
                <label className="block text-sm text-neutral-400">Password</label>
           </div>
          <input
            type="password"
            required
            className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2.5 text-sm focus:border-neutral-600 focus:outline-none focus:ring-1 focus:ring-neutral-600 transition-all"
            value={formData.password}
            onChange={e => setFormData({...formData, password: e.target.value})}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-white text-black py-2.5 text-sm font-bold hover:bg-neutral-200 transition-colors mt-2"
        >
          {loading ? 'Logging in...' : 'Log in'}
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-neutral-500">
        Don't have an account? <Link to="/register" className="text-white hover:underline">Sign up</Link>
      </p>
    </div>
  );
};

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    // Basic validation
    if (/[^a-zA-Z0-9_]/.test(formData.username)) {
        setError('Username can only contain letters, numbers, and underscores.');
        setLoading(false);
        return;
    }

    const result = await authService.register({
        name: formData.name,
        email: formData.email,
        username: formData.username.toLowerCase(),
        passwordHash: formData.password // Plain text for demo
    });

    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="max-w-md mx-auto py-12">
      <h1 className="text-2xl font-bold mb-6">Create account</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <div className="p-3 bg-red-900/20 border border-red-900 text-red-200 text-sm rounded">{error}</div>}
        <div>
          <label className="block text-sm mb-1.5 text-neutral-400">Display Name</label>
          <input
            type="text"
            required
            className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2.5 text-sm focus:border-neutral-600 focus:outline-none focus:ring-1 focus:ring-neutral-600 transition-all"
            value={formData.name}
            onChange={e => setFormData({...formData, name: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-sm mb-1.5 text-neutral-400">Email</label>
          <input
            type="email"
            required
            className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2.5 text-sm focus:border-neutral-600 focus:outline-none focus:ring-1 focus:ring-neutral-600 transition-all"
            value={formData.email}
            onChange={e => setFormData({...formData, email: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-sm mb-1.5 text-neutral-400">Username</label>
          <input
            type="text"
            required
            placeholder="e.g. mkbhd"
            className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2.5 text-sm focus:border-neutral-600 focus:outline-none focus:ring-1 focus:ring-neutral-600 transition-all"
            value={formData.username}
            onChange={e => setFormData({...formData, username: e.target.value})}
          />
           <p className="text-[11px] text-neutral-600 mt-1">
            Your public page: promohub.com/#/u/{formData.username || 'username'}
           </p>
        </div>
        <div>
          <label className="block text-sm mb-1.5 text-neutral-400">Password</label>
          <input
            type="password"
            required
            className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2.5 text-sm focus:border-neutral-600 focus:outline-none focus:ring-1 focus:ring-neutral-600 transition-all"
            value={formData.password}
            onChange={e => setFormData({...formData, password: e.target.value})}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-white text-black py-2.5 text-sm font-bold hover:bg-neutral-200 transition-colors mt-2"
        >
          {loading ? 'Creating account...' : 'Create Account'}
        </button>
      </form>
       <p className="mt-6 text-center text-sm text-neutral-500">
        Already have an account? <Link to="/login" className="text-white hover:underline">Log in</Link>
      </p>
    </div>
  );
};