import { memo, useCallback } from "react";
import type { User } from "../types/user";

interface UserRowProps {
  user: User;
  onRowClick: (user: User) => void;
  style: React.CSSProperties;
}

/** Memoized row component. Risk score is computed per row (expensive). */
function UserRowComponent({ user, onRowClick, style }: UserRowProps) {
  const handleClick = useCallback(() => {
    onRowClick(user);
  }, [onRowClick, user]);

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const gridCols =
    "minmax(140px,1fr) minmax(180px,1.5fr) 80px 100px 120px 120px";

  return (
    <div
      style={{ ...style, display: "grid", gridTemplateColumns: gridCols }}
      onClick={handleClick}
      className="grid cursor-pointer border-b border-dashboard-dark/10 transition-colors hover:bg-dashboard-cream/60"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      <div className="px-4 py-3 text-sm font-medium text-dashboard-dark">
        {user.name}
      </div>
      <div className="px-4 py-3 text-sm text-dashboard-dark/80">
        {user.email}
      </div>
      <div className="px-4 py-3 text-sm text-dashboard-dark/80">{user.age}</div>
      <div className="px-4 py-3 text-sm text-dashboard-dark/80">
        <span className="rounded-full bg-dashboard-green/20 px-2 py-0.5 text-xs font-medium capitalize text-dashboard-dark">
          {user.role}
        </span>
      </div>
      <div className="px-4 py-3 text-sm text-dashboard-dark/80">
        {formatDate(user.lastActive)}
      </div>
      <div className="px-4 py-3 text-sm">
        <span
          className={`font-mono font-medium ${
            user.riskScore >= 70
              ? "text-red-600"
              : user.riskScore >= 40
              ? "text-dashboard-orange"
              : "text-dashboard-green"
          }`}
        >
          {user.riskScore}
        </span>
      </div>
    </div>
  );
}

export const UserRow = memo(UserRowComponent);
