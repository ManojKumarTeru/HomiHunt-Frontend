'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Header() {
  const [user, setUser] = useState<{ email?: string } | null>(null);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const parsedUser = JSON.parse(userStr);
        setUser(parsedUser);
      } catch (e) {
        setUser(null);
        console.log(e);
      }
    }
  }, []);

  const username = user?.email?.split('@')[0] || 'Guest';

  // const handleAuthClick = () => {
  //   if (user) {
  //     localStorage.removeItem('user');
  //     window.location.reload();
  //   } else {
  //     // Open login modal or redirect to login
  //     window.location.href = '/login'; // or show modal
  //   }
  // };

  return (
    <header className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/home">
          <div className="text-4xl font-extrabold text-indigo-600 flex items-center gap-2">
            HomiHunt <span className="text-3xl">🏡</span>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
          <Link href="/home" className="hover:text-indigo-800 transition">Home</Link>
          <Link href="/favorites" className="hover:text-indigo-800 transition">Favorites</Link>
          <Link href="/recommendations" className="hover:text-indigo-800 transition">Recommended</Link>
          <Link href="/profile" className="hover:text-indigo-800 transition">Profile</Link>
        </nav>

        {/* User Info */}
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-700 font-semibold hidden sm:block">
            Hello, <span className="text-indigo-600">{username}</span>
          </span>

          <button
            className="cursor-pointer bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 text-sm font-medium"
            // onClick={handleAuthClick}
          >
            {user ? 'Logout' : 'Login'}
          </button>
        </div>
      </div>
    </header>
  );
}
