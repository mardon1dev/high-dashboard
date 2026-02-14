import { useState, useEffect } from 'react';

/**
 * Debounces a value by the specified delay (ms).
 * @param value - The value to debounce
 * @param delay - Delay in milliseconds (e.g., 400)
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
