'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

      const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const response = await fetch(
        'https://property-listing-backend-khws.onrender.com/auth/login',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            emailId: email,
            password,
          }),
        }
      );

      if (response.ok) {
        const text = await response.text();
        setMessage(text);

        // ✅ AUTO-LOGIN: Simulate storing user info (replace this with real logic)
        localStorage.setItem('user', JSON.stringify({ email,password }));

        // ✅ Redirect to dashboard/home/profile after auto-login
        router.push('/home'); // change to your actual path
      } else {
        const errText = await response.text();
        setError(errText);
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Welcome Back 👋
        </h2>
        <form onSubmit={handleLogin} className="space-y-5">

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 sm:text-sm p-2"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 sm:text-sm p-2"
            />
          </div>
          <div>
            <button
              type="submit"
              className="cursor-pointer w-full flex justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700"
            >
              Login in
            </button>
          </div>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don’t have an account?{' '}
          <a href="/signup" className="font-medium text-indigo-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
