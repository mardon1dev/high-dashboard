const ROW_HEIGHT = 52;
const GRID_COLS = "minmax(140px,1fr) minmax(180px,1.5fr) 80px 100px 120px 90px";

/** Skeleton loader mimicking the virtualized table structure */
export function SkeletonLoader() {
  const rowCount = Math.floor(520 / ROW_HEIGHT);

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div
        className="grid border-b border-dashboard-dark/20 bg-dashboard-green"
        style={{ gridTemplateColumns: GRID_COLS }}
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="px-4 py-3">
            <div className="h-3 w-16 animate-pulse rounded bg-white/30" />
          </div>
        ))}
      </div>

      {/* Rows */}
      <div className="flex-1 overflow-hidden rounded-b-lg bg-white">
        {Array.from({ length: rowCount }).map((_, i) => (
          <div
            key={i}
            className="grid border-b border-dashboard-dark/10"
            style={{
              height: ROW_HEIGHT,
              gridTemplateColumns: GRID_COLS,
            }}
          >
            {Array.from({ length: 6 }).map((_, j) => (
              <div key={j} className="flex items-center px-4">
                <div
                  className="h-4 animate-pulse rounded bg-dashboard-cream"
                  style={{
                    width: j === 0 ? "80%" : j === 1 ? "90%" : "60%",
                  }}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
