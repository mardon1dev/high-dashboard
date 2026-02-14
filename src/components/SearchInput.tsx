import { useCallback } from "react";
import { Search } from "lucide-react";
import { Input } from "./ui";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchInput({
  value,
  onChange,
  placeholder = "Search users...",
}: SearchInputProps) {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    },
    [onChange]
  );

  return (
    <Input
      type="search"
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      leftAdornment={<Search className="h-4 w-4 text-dashboard-dark/60" />}
      className="[&_input]:border-dashboard-dark/20 [&_input]:bg-dashboard-cream [&_input]:text-dashboard-dark [&_input]:placeholder:text-dashboard-dark/50"
      aria-label="Search users"
    />
  );
}
