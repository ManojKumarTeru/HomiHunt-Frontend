'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import PropertyCard from '@/components/propertyCard';
import { StaticImageData } from 'next/image';

import LoginModal from '@/components/loginModel';
import SignupModal from '@/components/signupModal';
import PropertyCardSkeleton from '@/components/shimmerUI/propertyCardShimmer';


import one from "../../../public/PropertyImgs/one.jpeg"
import two from "../../../public/PropertyImgs/two.jpeg"
import three from "../../../public/PropertyImgs/three.jpeg"
import four from "../../../public/PropertyImgs/four.jpeg"
import five from "../../../public/PropertyImgs/five.jpeg"
import six from "../../../public/PropertyImgs/six.jpeg"
import seven from "../../../public/PropertyImgs/seven.jpeg"
import eight from "../../../public/PropertyImgs/eight.jpeg"
import  nine from "../../../public/PropertyImgs/nine.jpeg"
import ten from "../../../public/PropertyImgs/ten.jpeg"
import eleven from "../../../public/PropertyImgs/eleven.jpeg"
import twelve from "../../../public/PropertyImgs/twelve.jpeg"
import thirteen from "../../../public/PropertyImgs/thirteen.jpeg"
import fourteen from "../../../public/PropertyImgs/fourteen.jpeg"
import fifteen from "../../../public/PropertyImgs/fifteen.jpeg"
import sixteen from "../../../public/PropertyImgs/sixteen.jpeg"
import seventeen from "../../../public/PropertyImgs/seventeen.jpeg"
import eighteen from "../../../public/PropertyImgs/eighteen.jpeg"
import nineteen from "../../../public/PropertyImgs/nineteen.jpeg"
import twenty from "../../../public/PropertyImgs/twenty.jpeg"
import twentyone from "../../../public/PropertyImgs/twentyone.jpeg"
import twentytwo from "../../../public/PropertyImgs/twentytwo.jpeg"
import twentythree from "../../../public/PropertyImgs/twentythree.jpeg"
import twentyfour from "../../../public/PropertyImgs/twentyfour.jpeg"
import twentyfive from "../../../public/PropertyImgs/twentyfive.jpeg"
import twentysix from "../../../public/PropertyImgs/twentysix.jpeg"
import twentyseven from "../../../public/PropertyImgs/twentyseven.jpeg"
import twentyeight from "../../../public/PropertyImgs/twentyeight.jpeg"
import twentynine from "../../../public/PropertyImgs/twentynine.jpeg"
import thirty from "../../../public/PropertyImgs/thirty.jpeg"





interface Property {
  _id: string;
  title: string;
  city: string;
  price: string;
  image: string | StaticImageData; 
  type?: string;
  state?: string;
  areaSqFt?: number;
  bedrooms?: number;
  furnished?: string;
  listedBy?: string;
  amenities?: string[];
  tags?: string[];
  colorTheme?: string;
  rating?: number;
  isVerified?: boolean;
  listingType?: string;
}


const ClientHeader = dynamic(() => import('../../components/clientHeader'), { ssr: false });

export default function HomePage() {
  const [userName, setUserName] = useState('Guest');
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [currpage, setPage] = useState(1);
  const [hasMore,setHasMore]=useState(true);
  // const [showLogin, setShowLogin] = useState(false);

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);




  // ✅ Fetch user name only once
  // useEffect(() => {
  //   const userStr = localStorage.getItem('user');
  //   if (userStr) {
  //     const user = JSON.parse(userStr);
  //     const emailPrefix = user.email.split('@')[0];
  //     const name = emailPrefix.charAt(0).toUpperCase() + emailPrefix.slice(1);
  //     setUserName(name);
  //   }
  // }, []);

  // ✅ Fetch properties on page change
  useEffect(() => {
    setLoading(true);
    fetch(`https://property-listing-backend-khws.onrender.com/properties?page=${currpage}&limit=6`)
      .then((res) => res.json())
      .then((data) => {
        const newProperties = Array.isArray(data) ? data : data.properties || [];
        setProperties((prev) => [...prev, ...newProperties]);
        setLoading(false);
        setHasMore(data.hasMore);
      })
      .catch((err) => {
        console.error("Error fetching properties:", err);
        setLoading(false);
      });
  }, [currpage]);


    useEffect(() => {
  const fetchUser = async () => {
    try {
      const res = await fetch('https://property-listing-backend-khws.onrender.com/auth/me', {
        credentials: 'include',
      });
      if (res.ok) {
        const user = await res.json();
        const name = user.firstName || user.emailId.split('@')[0];
        setUserName(name.charAt(0).toUpperCase() + name.slice(1));
      }
    } catch (err) {
      console.log("User not logged in",err);
    }
  };

  fetchUser();
}, []);



  // ✅ Infinite scroll: detect bottom
  useEffect(() => {
    const handleScroll = () => {
      const bottomReached = window.innerHeight + window.scrollY >= document.body.offsetHeight - 500;
      if (bottomReached && !loading &&hasMore) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading,hasMore]);

  const curatedHouseImages = [
   one,two,three,four,five,six,seven,eight,nine,ten,eleven,twelve,thirteen,fourteen,fifteen,
   sixteen,seventeen,eighteen,nineteen,twenty,twentyone,twentytwo,twentythree,twentyfour,twentyfive,
   twentysix,twentyseven,twentyeight,twentynine,thirty
  ];



  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <ClientHeader />
      <br />
      <div className="mb-8 p-4 rounded-xl bg-indigo-100 shadow">
        <h2 className="text-xl font-semibold text-indigo-900">Welcome back, {userName} 👋</h2>
        <p className="text-gray-700">Find your perfect home from 500+ listings!</p>
      </div>

      {/* Filters UI (not wired yet) */}
      <div className="mb-6 grid grid-cols-1 sm:grid-cols-4 gap-4">
        <input
  type="text"
  placeholder="City"
  className="w-full p-3 text-sm text-black placeholder-gray-500 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
/>

        <select className="w-full p-3 text-sm text-black border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>Price Range</option>
          <option>₹5k - ₹15k</option>
          <option>₹15k - ₹30k</option>
          <option>₹30k+</option>
        </select>
        <select className="w-full p-3 text-sm text-black border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>Property Type</option>
          <option>1BHK</option>
          <option>2BHK</option>
          <option>Villa</option>
        </select>
        <button className="bg-indigo-600 text-white font-medium py-2 px-4 rounded-md hover:bg-indigo-700">
          🔍 Apply Filters
        </button>
      </div>

      {properties.length > 0 && (
        <>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">🏘️ All Properties</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property, index) => {
  const image = curatedHouseImages[index % curatedHouseImages.length];
  return <PropertyCard key={index} property={{ ...property, image }} onRequireLogin={() => setShowLoginModal(true)} />;
})}

          </div>
        </>
      )}
{showLoginModal && (
  <LoginModal
    onClose={() => setShowLoginModal(false)}
     onLogin={(email) => {
    const name = email.split('@')[0];
    setUserName(name.charAt(0).toUpperCase() + name.slice(1));
    setShowLoginModal(false);
  }}
    onSwitchToSignup={() => {
      setShowLoginModal(false);
      setShowSignupModal(true); // 👈 open signup
    }}
  />
)}

{showSignupModal && (
  <SignupModal
    onClose={() => setShowSignupModal(false)}
    onSwitchToLogin={() => {
      setShowSignupModal(false);
      setShowLoginModal(true); // 👈 back to login
    }}
  />
)}



      {loading && (
  <>
    <h3 className="text-lg font-semibold text-gray-800 mb-4">🏘️ Loading Properties</h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <PropertyCardSkeleton key={i} />
      ))}
    </div>
  </>
)}


      {!loading && properties.length === 0 && (
        <p className="text-center text-gray-600">No properties available.</p>
      )}
    </div>
  );
}
