// components/PropertyDetailsSkeleton.tsx
export default function PropertyDetailsSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10 animate-pulse">
      <div className="mb-6">
        <div className="h-8 w-1/2 bg-gray-300 rounded mb-2"></div>
        <div className="h-5 w-1/3 bg-gray-200 rounded"></div>
      </div>

      <div className="w-full h-[450px] bg-gray-300 rounded-2xl mb-8"></div>

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="h-6 w-1/3 bg-gray-200 rounded"></div>
          <div className="h-6 w-1/4 bg-gray-200 rounded"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-5 bg-gray-200 rounded w-3/4"></div>
          ))}
        </div>

        <div className="space-y-2">
          <div className="h-5 w-32 bg-gray-300 rounded"></div>
          <div className="flex flex-wrap gap-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-6 w-20 bg-gray-200 rounded-full"></div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <div className="h-5 w-24 bg-gray-300 rounded"></div>
          <div className="flex flex-wrap gap-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-6 w-24 bg-gray-200 rounded-full"></div>
            ))}
          </div>
        </div>

        <div className="h-6 w-32 bg-yellow-200 rounded"></div>
      </div>
    </div>
  );
}
