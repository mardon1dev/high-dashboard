import { useCallback } from "react";
import type { UserRole } from "../types/user";
import { Select } from "./ui";

const OPTIONS: { value: UserRole | "all"; label: string }[] = [
  { value: "all", label: "All roles" },
  { value: "admin", label: "Admin" },
  { value: "user", label: "User" },
  { value: "moderator", label: "Moderator" },
  { value: "guest", label: "Guest" },
];

interface RoleFilterProps {
  value: UserRole | "all";
  onChange: (value: UserRole | "all") => void;
}

export function RoleFilter({ value, onChange }: RoleFilterProps) {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      onChange(e.target.value as UserRole | "all");
    },
    [onChange]
  );

  return (
    <Select
      value={value}
      onChange={handleChange}
      options={OPTIONS}
      aria-label="Filter by role"
      className="[&_select]:border-dashboard-dark/20 [&_select]:bg-dashboard-cream [&_select]:text-dashboard-dark"
    />
  );
}
