import { useRef, useCallback } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import type { User } from '../types/user';
import type { SortField, SortDirection } from '../types/user';
import { UserRow } from './UserRow';
import { SortableHeader } from './SortableHeader';

const ROW_HEIGHT = 52;

interface UserTableProps {
  users: User[];
  onRowClick: (user: User) => void;
  sortField: SortField;
  sortDirection: SortDirection;
  onSort: (field: SortField) => void;
}

export function UserTable({ users, onRowClick, sortField, sortDirection, onSort }: UserTableProps) {
  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: users.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => ROW_HEIGHT,
    overscan: 10,
  });

  const virtualRows = rowVirtualizer.getVirtualItems();
  const totalSize = rowVirtualizer.getTotalSize();

  const handleRowClick = useCallback(
    (user: User) => {
      onRowClick(user);
    },
    [onRowClick]
  );

  return (
    <div
      ref={parentRef}
      className="h-full overflow-auto"
      style={{ minHeight: 0 }}
    >
      <SortableHeader
        sortField={sortField}
        sortDirection={sortDirection}
        onSort={onSort}
      />

      {/* Virtualized body */}
      <div
        style={{
          height: `${totalSize}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {virtualRows.map((virtualRow) => {
          const user = users[virtualRow.index];
          return (
            <UserRow
              key={user.id}
              user={user}
              onRowClick={handleRowClick}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
