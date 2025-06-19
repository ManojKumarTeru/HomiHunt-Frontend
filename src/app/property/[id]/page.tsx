'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { getImageById } from '@/utils/imageMapper';
import ClientHeader from '@/components/clientHeader';
import Footer from '@/components/footer';
import PropertyDetailsSkeleton from '@/components/shimmerUI/propertyDetailShimmer';

interface Property {
  _id: string;
  title: string;
  city: string;
  price: number;
  image?: string;
  type?: string;
  state?: string;
  areaSqFt?: number;
  bedrooms?: number;
  bathroom?: number;
  amenities?: string[];
  furnished?: string;
  availableFor?: string;
  listedBy?: string;
  tags?: string[];
  colorTheme?: string;
  rating?: number;
  isVerified?: boolean;
  listingType?: string;
  createdBy?: string;
}



export default function PropertyDetailsPage() {
  const params = useParams(); // ✅ Hook at top-level
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      // const user = JSON.parse(localStorage.getItem("user") || "{}");

      if (!id) return; // Prevent invalid fetch

      try {
        const res = await fetch(`https://property-listing-backend-khws.onrender.com/properties/${id}`, {
          method: "GET",
          credentials: "include",
          headers: {
            'Content-Type': 'application/json'
          }
        });

        const text = await res.text();
        if (!res.ok) {
          throw new Error(`Server responded with ${res.status}`);
        }

        const data = JSON.parse(text);
        setProperty(data);
        setLoading(false);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchProperty();
  }, [id]);



  const image = property?._id ? getImageById(property._id) : null;

   const getListingLabel = () => {
    return property?.listingType === 'rent' ? 'For Rent' : 'For Sale';
  };

  if (loading) return <PropertyDetailsSkeleton />
  if (!property) return <p className="text-center mt-10 text-red-500">Property not found.</p>;

  return (
    <div>
    <ClientHeader />
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Title & Location */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-indigo-800 mb-2 flex items-center gap-2">
        {property.title}
       {property.isVerified && (
  <span className=" text-green-600 text-xs font-bold bg-green-100 px-2 py-1 rounded-full">
    Verified
  </span>
)}

      </h1>
        <p className="text-gray-600 text-lg">{property.city}, {property.state}</p>
      </div>

      {/* Property Image */}
      <div className="relative w-full h-[450px] rounded-2xl overflow-hidden shadow-lg border mb-8">
        {image ? (
          <>
          <Image
            src={image}
            alt={property.title || "Property image"}
            fill
            className="object-cover"
            placeholder="blur"
            priority
          />
          <span
    className="absolute top-2 left-2 text-white text-xs font-bold px-2 py-1 rounded-md"
    style={{ backgroundColor: property?.colorTheme || '#6366f1' }}
  >
    {getListingLabel()}
  </span>
            </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500">
            No Image Available
          </div>
        )}
      </div>

      {/* Property Details */}
      <div className="space-y-6">
        {/* Type + Price */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="text-lg font-semibold text-gray-800 flex items-center gap-4">
            <span>🏠 {property.type}</span>
            <span>•</span>
            <span>🛏️ {property.bedrooms} BHK</span>
          </div>
         <p className="text-indigo-700 text-2xl font-bold">
  ₹{property.price.toLocaleString()}
  {property.listingType === "rent" ? (
    <span className="text-base text-gray-500 font-medium"> / year</span>
  ) : (
    <span className="text-base text-gray-500 font-medium"> (One-time)</span>
  )}
</p>

        </div>

        {/* Info Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 text-base">
          <p>📐 <strong>Area:</strong> {property.areaSqFt} sq.ft</p>
          <p>🛋️ <strong>Furnished:</strong> {property.furnished}</p>
          <p>👤 <strong>Listed By:</strong> {property.listedBy}</p>
          <p>📍 <strong>Location:</strong> {property.city}, {property.state}</p>
        </div>

        {/* Amenities */}
        {property.amenities?.[0] && (
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Amenities</h3>
            <div className="flex flex-wrap gap-2">
              {property.amenities[0].split('|').map((a: string, i: number) => (
                <span key={i} className="bg-gray-100 px-4 py-1 rounded-full text-sm text-gray-800 border shadow-sm">
                  {a}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Tags */}
        {property.tags?.[0] && (
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {property.tags[0].split('|').map((tag: string, i: number) => (
                <span key={i} className="bg-indigo-100 px-4 py-1 rounded-full text-sm text-indigo-700 border border-indigo-300">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Rating */}
        <div className="flex items-center gap-2 text-yellow-500 font-medium text-base mt-2">
          <Star className="w-5 h-5 fill-yellow-500" />
          {property.rating}/5 Rating
        </div>
      </div>
    </div>
    <Footer />
    </div>
  );
}
