# High-Volume Users Dashboard — Project Overview

## Project Structure

```
src/
├── types/
│   └── user.ts              # User, UserRole, SortField, SortDirection interfaces
├── utils/
│   ├── mockData.ts          # 10k users generator (UUID, name, email, age, role, lastActive)
│   ├── calculateRiskScore.ts # Expensive per-row computation (pseudo-hash)
│   └── useDebounce.ts       # 400ms debounce hook
├── store/
│   └── useUserStore.ts      # Zustand global state
├── components/
│   ├── SearchInput.tsx      # Debounced search bar
│   ├── RoleFilter.tsx       # Filter by role dropdown
│   ├── SortableHeader.tsx   # Sort by name, age, lastActive
│   ├── UserRow.tsx          # Memoized row with risk score
│   ├── UserTable.tsx        # Virtualized table (@tanstack/react-virtual)
│   ├── UserDetailsModal.tsx # Editable modal + optimistic update + 10% failure
│   ├── SkeletonLoader.tsx   # Loading skeleton
│   ├── EmptyState.tsx       # No results state
│   └── ui/
│       └── Toast.tsx         # Error notifications
└── App.tsx                  # Main app with full-height layout
```

## Features

| Requirement | Implementation |
|-------------|----------------|
| **Virtualization** | `@tanstack/react-virtual` — only visible rows rendered |
| **Expensive computation** | `calculateRiskScore(user)` — heavy loop per row |
| **Memoization** | `React.memo(UserRow)`, `useCallback` for handlers, `useMemo` for sort/filter |
| **Search** | 400ms debounce via `useDebounce` |
| **Sorting** | Name, age, lastActive (asc/desc) |
| **Filter** | Role dropdown (admin, user, moderator, guest) |
| **Details modal** | Row click → modal with editable name/email |
| **Optimistic update** | Immediate UI update on Save |
| **10% failure** | Random failure with toast + rollback |
| **UI states** | Skeleton loading, empty state, error toast |

## Run Instructions

```bash
npm install
npm run dev
```

Open **http://localhost:5173** in your browser.

## Tech Stack

- React 19 + Vite + TypeScript
- Tailwind CSS v4
- Zustand (state management)
- @tanstack/react-virtual (row virtualization)
- Lucide React (icons)
