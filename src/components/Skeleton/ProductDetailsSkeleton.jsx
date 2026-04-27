/**
 * Skeleton loader for the Product Details page.
 */
export default function ProductDetailsSkeleton() {
  return (
    <div className="animate-pulse py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Image column */}
        <div className="space-y-3">
          <div className="h-80 w-full rounded-2xl bg-base-300" />
          <div className="flex gap-2 justify-center">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 w-16 rounded-lg bg-base-300" />
            ))}
          </div>
        </div>

        {/* Info column */}
        <div className="space-y-4 py-4">
          <div className="h-6 w-3/4 rounded bg-base-300" />
          <div className="h-4 w-full rounded bg-base-300" />
          <div className="h-4 w-5/6 rounded bg-base-300" />
          <div className="h-4 w-4/6 rounded bg-base-300" />

          <div className="flex items-center gap-3 pt-2">
            <div className="h-5 w-5 rounded-full bg-base-300" />
            <div className="h-4 w-16 rounded bg-base-300" />
          </div>

          <div className="h-8 w-28 rounded bg-base-300" />

          <div className="flex gap-3 pt-4">
            <div className="h-11 w-36 rounded-lg bg-base-300" />
            <div className="h-11 w-11 rounded-full bg-base-300" />
          </div>
        </div>
      </div>

      {/* Related products */}
      <div className="mt-12">
        <div className="h-6 w-40 rounded bg-base-300 mb-6" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="space-y-2">
              <div className="h-32 rounded-xl bg-base-300" />
              <div className="h-3 w-3/4 rounded bg-base-300" />
              <div className="h-3 w-1/2 rounded bg-base-300" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
