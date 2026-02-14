import { useState, useCallback, useMemo, useEffect } from "react";
import { useUserStore } from "./store/useUserStore";
import { generateMockUsers } from "./utils/mockData";
import { useDebounce } from "./utils/useDebounce";
import type { User, SortField, SortDirection, UserRole } from "./types/user";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "./components/ui";
import { SearchInput } from "./components/SearchInput";
import { RoleFilter } from "./components/RoleFilter";
import { UserTable } from "./components/UserTable";
import { UserDetailsModal } from "./components/UserDetailsModal";
import { AddUserModal } from "./components/AddUserModal";
import { SkeletonLoader } from "./components/SkeletonLoader";
import { EmptyState } from "./components/EmptyState";

const USER_COUNT = 10_000;
const DEBOUNCE_MS = 400;

function sortUsers(
  users: User[],
  field: SortField,
  direction: SortDirection
): User[] {
  return [...users].sort((a, b) => {
    let cmp = 0;
    switch (field) {
      case "name":
        cmp = a.name.localeCompare(b.name);
        break;
      case "age":
        cmp = a.age - b.age;
        break;
      case "lastActive":
        cmp =
          new Date(a.lastActive).getTime() - new Date(b.lastActive).getTime();
        break;
      case "riskScore":
        cmp = a.riskScore - b.riskScore;
        break;
      default:
        return 0;
    }
    return direction === "asc" ? cmp : -cmp;
  });
}

function filterUsers(
  users: User[],
  search: string,
  roleFilter: UserRole | "all"
): User[] {
  const q = search.toLowerCase().trim();
  return users.filter((u) => {
    const matchesSearch =
      !q ||
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q);
    const matchesRole = roleFilter === "all" || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });
}

export default function App() {
  const { users, setUsers } = useUserStore();
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [roleFilter, setRoleFilter] = useState<UserRole | "all">("all");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);

  const debouncedSearch = useDebounce(search, DEBOUNCE_MS);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setUsers(generateMockUsers(USER_COUNT));
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [setUsers]);

  // Stable refs for virtualized table (UserRow is memoized – avoids re-rendering 10k rows)
  const handleSort = useCallback((field: SortField) => {
    setSortField((prev) => {
      if (prev === field) {
        setSortDirection((d) => (d === "asc" ? "desc" : "asc"));
        return prev;
      }
      setSortDirection("asc");
      return field;
    });
  }, []);

  const handleRowClick = useCallback((user: User) => setSelectedUser(user), []);

  const filteredAndSortedUsers = useMemo(() => {
    const filtered = filterUsers(users, debouncedSearch, roleFilter);
    return sortUsers(filtered, sortField, sortDirection);
  }, [users, debouncedSearch, roleFilter, sortField, sortDirection]);

  return (
    <div className="flex h-full flex-col bg-dashboard-cream">
      {/* Fixed header */}
      <header className="flex shrink-0 flex-col gap-4 border-b border-dashboard-dark/20 bg-dashboard-dark px-6 py-4">
        <h1 className="text-xl font-bold text-dashboard-cream">
          High-Volume Users Dashboard
        </h1>
        <div className="flex flex-wrap items-center gap-4">
          <div className="min-w-50 flex-1">
            <SearchInput value={search} onChange={setSearch} />
          </div>
          <RoleFilter value={roleFilter} onChange={setRoleFilter} />
          <Button
            type="button"
            variant="primary"
            className="px-4! py-2! hover:bg-dashboard-orange!"
            onClick={() => setIsAddUserOpen(true)}
          >
            + Add User
          </Button>
          <span className="text-sm text-dashboard-cream/80">
            {filteredAndSortedUsers.length.toLocaleString()} users
          </span>
        </div>
      </header>

      {/* Scrollable table body */}
      <main className="min-h-0 flex-1 px-6 py-4">
        {isLoading ? (
          <SkeletonLoader />
        ) : filteredAndSortedUsers.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="h-full rounded-lg border border-dashboard-dark/20 bg-white shadow-sm">
            <UserTable
              users={filteredAndSortedUsers}
              onRowClick={handleRowClick}
              sortField={sortField}
              sortDirection={sortDirection}
              onSort={handleSort}
            />
          </div>
        )}
      </main>

      {selectedUser && (
        <UserDetailsModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onSaveFailure={(msg) => toast.error(msg, { duration: 4000 })}
          onSaveSuccess={() =>
            toast.success("Profile updated successfully.", { duration: 3000 })
          }
        />
      )}

      {isAddUserOpen && (
        <AddUserModal
          onClose={() => setIsAddUserOpen(false)}
          onSuccess={() =>
            toast.success("User added successfully.", { duration: 3000 })
          }
          onFailure={(msg) => toast.error(msg, { duration: 4000 })}
        />
      )}

      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: "var(--color-dashboard-cream)",
            color: "var(--color-dashboard-dark)",
            border: "1px solid rgba(64, 81, 59, 0.2)",
          },
        }}
      />
    </div>
  );
}
