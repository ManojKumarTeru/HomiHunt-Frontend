'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import LoginModal from "../components/loginModel"; // ✅ Make sure filename is correct (case-sensitive)
import SignupModal from "../components/signupModal";
import toast from 'react-hot-toast';
import { Router } from 'lucide-react';
import { useRouter } from 'next/router';

export default function ClientHeader() {
  const [username, setUsername] = useState('Guest');
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  // useEffect(() => {
  //   const userStr = localStorage.getItem('user');
  //   if (userStr) {
  //     try {
  //       const parsedUser = JSON.parse(userStr);
  //       const name = parsedUser?.email?.split('@')[0] || 'Guest';
  //       setUsername(name.charAt(0).toUpperCase() + name.slice(1));
  //     } catch {
  //       setUsername('Guest');
  //     }
  //   }
  // }, []);

  const router=useRouter();

  const handleLogout = async () => {
  try {
    const res = await fetch("https://property-listing-backend-khws.onrender.com/auth/logout", {
      method: "POST",
      credentials: "include", // Important for cookie removal
    });

    if (res.ok) {
      setUsername("Guest"); // Reset username
      toast.success("Logged out successfully!");
      router.push("/home");
      // setShowLogin(true);   // Show login modal again (optional)
    } else {
      toast.error("Logout failed");
    }
  } catch (err) {
    console.error("Logout error:", err);
    toast.error("Something went wrong");
  }
};




  useEffect(() => {
  const fetchUser = async () => {
    try {
      const res = await fetch('https://property-listing-backend-khws.onrender.com/auth/me', {
        credentials: 'include',
      });
      if (res.ok) {
        const user = await res.json();
        const name = user.firstName || user.emailId.split('@')[0];
        setUsername(name.charAt(0).toUpperCase() + name.slice(1));
      }
    } catch (err) {
      console.log("User not logged in",err);
    }
  };

  fetchUser();
}, []);


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
            onClick={() => {
  if (username === 'Guest') setShowLogin(true);
  else handleLogout();
}}

          >
            {username === "Guest" ? "Login" : "Logout"}
          </button>
        </div>
      </div>

      {/* Modals */}
      {showLogin && (
        <LoginModal
         onClose={() => setShowLogin(false)}
            onLogin={(email) => {
      const name = email.split('@')[0];
      setUsername(name.charAt(0).toUpperCase() + name.slice(1));
      setShowLogin(false);
    }}
    onSwitchToSignup={() => {
      setShowLogin(false);
      setShowSignup(true);
    }}
  />
)}

     {showSignup && (
  <SignupModal
    onClose={() => setShowSignup(false)}
    onSwitchToLogin={() => {
      setShowSignup(false);
      setShowLogin(true);
    }}
    onSignupSuccess={() => {
      setShowSignup(false);
      setShowLogin(true);
      toast.success("Signup successful! Please log in.");
    }}
  />
)}


    </header>
  );
}
