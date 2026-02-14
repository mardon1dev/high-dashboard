# High-Volume Users Dashboard

A performant React application that handles 10,000+ users with virtualization, debounced search, sorting, filtering, CRUD operations, and optimistic updates.

---

## Run Instructions

```bash
# Install dependencies (if not already done)
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Build & Preview

```bash
# Production build
npm run build

# Preview production build locally
npm run preview
```

---

## Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | React 19 |
| **Build tool** | Vite 7 |
| **Language** | TypeScript 5.9 |
| **Styling** | Tailwind CSS 4 |
| **State** | Zustand |
| **Virtualization** | @tanstack/react-virtual |
| **Animations** | Framer Motion |
| **Icons** | Lucide React |
| **Toasts** | react-hot-toast |
| **Utilities** | clsx, tailwind-merge |

### Dev Dependencies

- ESLint + TypeScript ESLint
- React Hooks & React Refresh plugins
- @vitejs/plugin-react
- PostCSS, Autoprefixer

---

## Project Structure

```
src/
├── components/
│   ├── ui/                    # Reusable UI primitives
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   └── index.ts
│   ├── user-modal/            # Shared modal components
│   │   ├── CoreUserForm.tsx   # Name, email, age, risk score form
│   │   ├── DetailRow.tsx      # Label/value display row
│   │   ├── ExtendedFormFields.tsx  # Bio, hobbies, studies, work form
│   │   ├── ExtendedProfileView.tsx # Read-only extended profile
│   │   ├── ModalPanel.tsx     # ModalPanel, SidePanel
│   │   ├── parseExtended.ts   # Parse/format helpers for extended fields
│   │   └── index.ts
│   ├── AddUserModal.tsx       # Add new user (basic + extended fields)
│   ├── UserDetailsModal.tsx   # View/edit user details
│   ├── UserTable.tsx          # Virtualized table container
│   ├── UserRow.tsx            # Single row (memoized)
│   ├── SortableHeader.tsx     # Sortable column headers
│   ├── SearchInput.tsx        # Debounced search
│   ├── RoleFilter.tsx         # Role dropdown filter
│   ├── SkeletonLoader.tsx     # Loading skeleton
│   └── EmptyState.tsx         # Empty state UI
├── store/
│   └── useUserStore.ts        # Zustand store (CRUD, users list)
├── types/
│   └── user.ts                # User, UserRole, StudyInfo, WorkInfo, etc.
├── utils/
│   ├── mockData.ts            # 10k mock users generator
│   ├── calculateRiskScore.ts  # Per-row risk computation
│   └── useDebounce.ts         # Debounce hook (400ms)
├── App.tsx
├── main.tsx
└── index.css                  # Tailwind + custom theme
```

---

## Features

### Table & Data

- **Virtualized table** – Only visible rows rendered via `@tanstack/react-virtual` (60FPS)
- **10,000 users** – Mock dataset with UUID, name, email, age, role, lastActive, riskScore
- **Search** – 400ms debounced search across name and email
- **Sorting** – By name, age, lastActive, riskScore (asc/desc)
- **Filter** – By role (admin, user, moderator, guest)

### User Details Modal

- **View mode** – Read-only display with Edit button
- **Edit mode** – Inline form for name, email, age, risk score
- **Extended profile** – "Read more" side panel with bio, hobbies, studies, work
- **Edit extended** – Add/edit extended fields with Save/Cancel
- **Optimistic updates** – Immediate UI update on Save
- **10% failure simulation** – Random failures with toast + rollback

### Add User Modal

- **Basic fields** – Name, email, age, role, risk score
- **Extended fields** – Bio, hobbies (comma-separated), studies (School | Degree | Year), work (Company | Role | Years)
- **Calculate risk** – Button to auto-calculate risk score
- **Optimistic add** – Same failure/rollback behavior

### UI States

- **Loading** – Skeleton loader while data initializes
- **Empty state** – Message when no users match filters
- **Error** – react-hot-toast for save failures

---

## Design System

Custom color palette (from Color Hunt):

| Token | Hex | Usage |
|-------|-----|-------|
| `dashboard-dark` | `#40513B` | Dark accents, scrollbar hover |
| `dashboard-green` | `#628141` | Primary, accents, scrollbar |
| `dashboard-cream` | `#E5D9B6` | Backgrounds, scrollbar track |
| `dashboard-orange` | `#E67E22` | Add user modal accent |

Custom scrollbar styling applied globally. Tailwind `@theme` extends these colors.

---

## Performance Optimizations

- **Row virtualization** – Mandatory for 10k rows; only ~20 DOM nodes at a time
- **Expensive row computation** – `calculateRiskScore()` per row (age, role, lastActive)
- **Memoization** – `React.memo` on UserRow, SortableHeader; `useCallback` / `useMemo` where needed
- **Debounced search** – 400ms to avoid re-renders on every keystroke
- **Stable props** – Callbacks and handlers wrapped in `useCallback`

---

## Data Model

```ts
interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  role: "admin" | "user" | "moderator" | "guest";
  lastActive: string;  // ISO date
  riskScore: number;
  avatar?: string;
  bio?: string;
  hobbies?: string[];
  studies?: { school: string; degree?: string; year?: string }[];
  work?: { company: string; role?: string; years?: string }[];
}
```

Extended fields format:

- **Hobbies** – Comma-separated: `Reading, Gaming, Cooking`
- **Studies** – One per line: `School | Degree | Year`
- **Work** – One per line: `Company | Role | Years`

---

## License

Private project.
# high-dashboard
