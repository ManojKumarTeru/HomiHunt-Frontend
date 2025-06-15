'use client';
import { useState } from 'react';

export default function SignupModal({ onClose, onSwitchToLogin }: { onClose: () => void, onSwitchToLogin: () => void }) {
  const [email, setEmail] = useState('');
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const response = await fetch('https://property-listing-backend-khws.onrender.com/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName, lastName, emailId: email, password }),
    });

    const data = await response.text();

    if (response.ok) {
      localStorage.setItem('user', JSON.stringify({ email }));
      window.location.reload();
    } else {
      alert(data);
    }

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/10">
      <div className="bg-white rounded-xl shadow-xl p-6 w-[90%] max-w-md relative backdrop-blur-3xl">
        <button onClick={onClose} className="cursor-pointer absolute top-2 right-3 text-xl font-bold">×</button>
        <h2 className="text-xl font-bold text-center mb-4">Create Account 🚀</h2>

        <form onSubmit={handleSignup} className="space-y-3">
          <input placeholder="First Name" value={firstName} onChange={(e) => setfirstName(e.target.value)}
            className="w-full p-2 border rounded-md" required />
          <input placeholder="Last Name" value={lastName} onChange={(e) => setlastName(e.target.value)}
            className="w-full p-2 border rounded-md" required />
          <input type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-md" required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded-md" required />

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
