/**
 * Skeleton loader for the Wishlist page grid.
 */
export default function WishlistSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Page title */}
      <div className="h-8 w-48 rounded bg-base-300 mb-8" />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-base-100 border border-base-300 rounded-2xl overflow-hidden shadow-sm"
          >
            <div className="h-44 bg-base-300 w-full" />
            <div className="p-4 space-y-2">
              <div className="h-4 w-3/4 rounded bg-base-300" />
              <div className="h-4 w-1/3 rounded bg-base-300" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
