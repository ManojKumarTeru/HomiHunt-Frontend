"use client"
import { Star } from 'lucide-react';
import Image from 'next/image';
import { Property } from '@/types/property';

export default function PropertyCard({ property }: { property: Property }) {
  const {
    title,
    image,
    type,
    city,
    state,
    price,
    areaSqFt,
    bedrooms,
    furnished,
    listedBy,
    amenities,
    tags,
    colorTheme,
    rating,
    isVerified,
    listingType,
  } = property;

  const getListingLabel = () => {
    return listingType === 'rent' ? 'For Rent' : 'For Sale';
  };

  return (
    <div
  className=" cursor-pointer rounded-xl shadow-lg overflow-hidden border transition-transform duration-300 hover:-translate-y-3"
  style={{ borderColor: colorTheme || '#ddd' }}
>
      <div className="relative h-48 bg-gradient-to-tr from-white to-gray-100 flex items-center justify-center text-xl font-semibold text-gray-700">
    <Image
      src={image|| ""} 
      alt={title}
      className="w-full h-full object-cover"
  />
  <span
    className="absolute top-2 left-2 text-white text-xs font-bold px-2 py-1 rounded-md"
    style={{ backgroundColor: colorTheme || '#6366f1' }}
  >
    {getListingLabel()}
  </span>
        {isVerified && (
          <span className="absolute top-2 right-2 text-green-600 text-xs font-bold bg-green-100 px-2 py-1 rounded-full">
            ✅ Verified
          </span>
        )}
        <span
          className="absolute top-2 left-2 text-white text-xs font-bold px-2 py-1 rounded-md"
          style={{ backgroundColor: colorTheme || '#6366f1' }}
        >
          {getListingLabel()}
        </span>
      </div>

      <div className="p-4 space-y-2">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-800">{type} • {bedrooms} BHK</h3>
          <span className="text-indigo-600 font-bold text-sm">₹{price.toLocaleString()}</span>
        </div>

        <p className="text-sm text-gray-500">{city}, {state}</p>

        <div className="flex items-center gap-2 text-sm text-gray-700">
          <span>{areaSqFt} sq.ft</span>
          <span>•</span>
          <span>{furnished}</span>
          <span>•</span>
          <span>By {listedBy}</span>
        </div>

       {/* Amenities */}
<div className="flex flex-wrap gap-1 mt-2 text-xs text-gray-600">
  {(amenities?.[0]?.split('|') || []).map((item: string, index: number) => (
    <span key={index} className="bg-gray-100 px-2 py-1 rounded-full">{item}</span>
  ))}
</div>

{/* Tags */}
<div className="flex flex-wrap gap-1 mt-2 text-xs">
  {(tags?.[0]?.split('|') || []).map((tag: string, index: number) => (
    <span key={index} className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">
      #{tag}
    </span>
  ))}
</div>


        {/* Rating */}
        <div className="flex items-center gap-1 mt-2 text-sm text-yellow-500 font-medium">
          <Star className="w-4 h-4 fill-yellow-500" />
          {rating}/5
        </div>

        <button
          className="cursor-pointer w-full mt-3 py-2 text-sm font-semibold rounded-md text-white"
          style={{ backgroundColor: colorTheme || '#4f46e5' }}
        >
          View Details
        </button>
      </div>
    </div>
  );
}
