// components/PropertyCardSkeleton.tsx
export default function PropertyCardSkeleton() {
  return (
    <div className="animate-pulse bg-white shadow-md rounded-lg overflow-hidden">
      <div className="h-48 bg-gray-300 w-full"></div>
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="flex justify-between mt-4">
          <div className="h-4 bg-gray-300 rounded w-1/3"></div>
          <div className="h-4 bg-gray-300 rounded w-1/4"></div>
        </div>
      </div>
    </div>
  );
}
