/**
 * Skeleton loader for a single product card.
 * Mimics the shape of the real product card during loading.
 */
export default function ProductCardSkeleton() {
  return (
    <div className="w-full bg-base-100 border border-base-300 rounded-2xl shadow-sm overflow-hidden animate-pulse">
      {/* Image placeholder */}
      <div className="bg-base-300 h-52 w-full" />

      <div className="p-4 space-y-3">
        {/* Rating row */}
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded-full bg-base-300" />
          <div className="h-3 w-10 rounded bg-base-300" />
        </div>

        {/* Title */}
        <div className="h-4 w-3/4 rounded bg-base-300" />
        <div className="h-4 w-1/2 rounded bg-base-300" />

        {/* Price + button row */}
        <div className="flex items-center justify-between pt-2">
          <div className="h-6 w-20 rounded bg-base-300" />
          <div className="h-9 w-28 rounded-lg bg-base-300" />
        </div>
      </div>
    </div>
  );
}
