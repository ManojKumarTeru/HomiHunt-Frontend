'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import PropertyCard from '@/components/propertyCard';

interface Property {
  _id: string;
  title: string;
  city: string;
  price: string;
  image?: string;
}

const ClientHeader = dynamic(() => import('../../components/clientHeader'), { ssr: false });

export default function HomePage() {
  const [userName, setUserName] = useState('Guest');
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [currpage, setPage] = useState(1);
  const [hasMore,setHasMore]=useState(true);
  const [showLogin, setShowLogin] = useState(false);


  // ✅ Fetch user name only once
  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      const emailPrefix = user.email.split('@')[0];
      const name = emailPrefix.charAt(0).toUpperCase() + emailPrefix.slice(1);
      setUserName(name);
    }
  }, []);

  // ✅ Fetch properties on page change
  useEffect(() => {
    setLoading(true);
    fetch(`https://property-listing-backend-khws.onrender.com/properties?page=${currpage}&limit=30`)
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
  }, [loading]);

  const curatedHouseImages = [
    "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg",
    "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg",
    "https://images.pexels.com/photos/279746/pexels-photo-279746.jpeg",
    "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg",
    "https://images.pexels.com/photos/439391/pexels-photo-439391.jpeg",
    "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg",
    "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg",
    "https://images.pexels.com/photos/208736/pexels-photo-208736.jpeg",
    "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg",
    "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg",
    "https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg",
    "https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg",
    "https://images.pexels.com/photos/259962/pexels-photo-259962.jpeg",
    "https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg",
    "https://images.pexels.com/photos/221540/pexels-photo-221540.jpeg",
    "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
    "https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg",
    "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg",
    "https://images.pexels.com/photos/534151/pexels-photo-534151.jpeg",
    "https://images.pexels.com/photos/221502/pexels-photo-221502.jpeg",
    "https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg",
    "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg",
    "https://images.pexels.com/photos/261146/pexels-photo-261146.jpeg",
    "https://images.pexels.com/photos/1571458/pexels-photo-1571458.jpeg",
    "https://images.pexels.com/photos/323775/pexels-photo-323775.jpeg",
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
        <input type="text" placeholder="City" className="p-2 border rounded-md w-full" />
        <select className="p-2 border rounded-md w-full">
          <option>Price Range</option>
          <option>₹5k - ₹15k</option>
          <option>₹15k - ₹30k</option>
          <option>₹30k+</option>
        </select>
        <select className="p-2 border rounded-md w-full">
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
              const imageUrl = curatedHouseImages[index % curatedHouseImages.length];
              return <PropertyCard key={property._id} property={{ ...property, imageUrl }} />;
            })}
          </div>
        </>
      )}

      {loading && (
        <div className="text-center text-indigo-600 text-lg font-semibold mt-4">
          Loading properties...
        </div>
      )}

      {!loading && properties.length === 0 && (
        <p className="text-center text-gray-600">No properties available.</p>
      )}
    </div>
  );
}
