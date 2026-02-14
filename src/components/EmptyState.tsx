import { Users } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="flex flex-1 h-full flex-col items-center justify-center gap-4 rounded-lg border border-dashboard-dark/20 bg-white p-8 text-center">
      <div className="rounded-full bg-dashboard-cream p-4">
        <Users className="h-12 w-12 text-dashboard-dark/60" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-dashboard-dark">
          No users found
        </h3>
        <p className="mt-1 text-sm text-dashboard-dark/70">
          Try adjusting your search or filter criteria
        </p>
      </div>
    </div>
  );
}
