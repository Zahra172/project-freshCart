/**
 * Skeleton loader for the Cart page table rows.
 */
export default function CartSkeleton() {
  return (
    <div className="animate-pulse space-y-4 my-10">
      {/* Table header placeholder */}
      <div className="h-10 bg-base-300 rounded-lg w-full" />

      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="flex items-center gap-4 bg-base-100 border border-base-300 rounded-xl p-4"
        >
          {/* Image */}
          <div className="h-16 w-16 rounded-lg bg-base-300 shrink-0" />

          {/* Title */}
          <div className="flex-1 space-y-2">
            <div className="h-4 w-2/3 rounded bg-base-300" />
            <div className="h-3 w-1/3 rounded bg-base-300" />
          </div>

          {/* Qty controls */}
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-full bg-base-300" />
            <div className="h-5 w-6 rounded bg-base-300" />
            <div className="h-7 w-7 rounded-full bg-base-300" />
          </div>

          {/* Price */}
          <div className="h-5 w-20 rounded bg-base-300" />

          {/* Remove */}
          <div className="h-8 w-8 rounded-full bg-base-300" />
        </div>
      ))}

      {/* Total row */}
      <div className="flex justify-between items-center pt-4">
        <div className="h-7 w-48 rounded bg-base-300" />
        <div className="h-10 w-32 rounded-lg bg-base-300" />
      </div>
    </div>
  );
}
