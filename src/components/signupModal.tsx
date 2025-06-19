'use client';
import { useState } from 'react';

type SignupModalProps = {
  onClose: () => void;
  onSwitchToLogin: () => void;
   onSignupSuccess?: () => void;
};


export default function SignupModal({ onClose, onSwitchToLogin,onSignupSuccess  }: SignupModalProps) {
  const [email, setEmail] = useState('');
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setLoading(true);

  const response = await fetch('https://property-listing-backend-khws.onrender.com/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ firstName, lastName, emailId: email, password }),
  });

  const data = await response.text();

  if (response.ok) {
    // ✅ Show login modal instead of reloading
    onSignupSuccess?.();
  } else {
    alert(data);
  }

  setLoading(false);
};

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/10">
      <div className="bg-white rounded-xl shadow-xl p-6 w-[90%] max-w-md relative backdrop-blur-3xl">
        <button onClick={onClose} className="cursor-pointer absolute top-2 right-3 text-xl font-bold">×</button>
        {/* <h2 className="text-xl font-bold text-center mb-4">Create Account 🚀</h2> */}
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Create Account 🚀
        </h2>
        <form onSubmit={handleSignup} className="space-y-3">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              required
              value={firstName}
              onChange={(e) => setfirstName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 sm:text-sm p-2"
            />
          </div>
         <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              required
              value={lastName}
              onChange={(e) => setlastName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 sm:text-sm p-2"
            />
          </div>
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

          <button type="submit" disabled={loading} className="cursor-pointer w-full bg-indigo-600 text-white py-2 rounded-md">
            {loading ? 'Signing up...' : 'Signup'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <span onClick={onSwitchToLogin} className="text-indigo-600 hover:underline cursor-pointer">Login</span>
        </p>
      </div>
    </div>
  );
}
