import { useCallback } from "react";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import type { SortField, SortDirection } from "../types/user";

const GRID_COLS =
  "minmax(140px,1fr) minmax(180px,1.5fr) 80px 100px 120px 120px";

interface SortableHeaderProps {
  sortField: SortField;
  sortDirection: SortDirection;
  onSort: (field: SortField) => void;
}

export function SortableHeader({
  sortField,
  sortDirection,
  onSort,
}: SortableHeaderProps) {
  const handleSort = useCallback(
    (field: SortField) => () => {
      onSort(field);
    },
    [onSort]
  );

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field)
      return <ArrowUpDown className="ml-1 inline h-3 w-3 opacity-70" />;
    return sortDirection === "asc" ? (
      <ArrowUp className="ml-1 inline h-3 w-3" />
    ) : (
      <ArrowDown className="ml-1 inline h-3 w-3" />
    );
  };

  return (
    <div
      className="sticky top-0 z-10 grid border-b border-dashboard-dark/20 bg-dashboard-green text-white"
      style={{ gridTemplateColumns: GRID_COLS }}
    >
      <div className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
        <button
          type="button"
          onClick={handleSort("name")}
          className="flex items-center hover:text-dashboard-cream"
        >
          Name
          <SortIcon field="name" />
        </button>
      </div>
      <div className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
        Email
      </div>
      <div className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
        <button
          type="button"
          onClick={handleSort("age")}
          className="flex items-center hover:text-dashboard-cream"
        >
          Age
          <SortIcon field="age" />
        </button>
      </div>
      <div className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
        Role
      </div>
      <div className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
        <button
          type="button"
          onClick={handleSort("lastActive")}
          className="flex items-center hover:text-dashboard-cream"
        >
          Last Active
          <SortIcon field="lastActive" />
        </button>
      </div>
      <div className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
        <button
          type="button"
          onClick={handleSort("riskScore")}
          className="flex items-center hover:text-dashboard-cream"
        >
          Risk Score
          <SortIcon field="riskScore" />
        </button>
      </div>
    </div>
  );
}
