import { forwardRef } from "react";

const baseInputClass =
  "w-full rounded-lg border border-slate-200 p-2 text-sm outline-none transition-all focus:border-dashboard-green focus:ring-2 focus:ring-dashboard-green focus:ring-opacity-50";

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "className"> {
  label?: string;
  error?: string;
  className?: string;
  inputClassName?: string;
  addon?: React.ReactNode;
  leftAdornment?: React.ReactNode;
  rightAdornment?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      className = "",
      inputClassName = "",
      addon,
      leftAdornment,
      rightAdornment,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className={className}>
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-semibold uppercase tracking-wider text-slate-500"
          >
            {label}
          </label>
        )}
        {leftAdornment || rightAdornment ? (
          <div className={`relative flex ${label ? "mt-1" : ""}`}>
            {leftAdornment && (
              <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
                {leftAdornment}
              </div>
            )}
            {rightAdornment && (
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                {rightAdornment}
              </div>
            )}
            <input
              ref={ref}
              id={inputId}
              className={`${baseInputClass} ${inputClassName} ${
                leftAdornment ? "pl-10" : ""
              } ${rightAdornment ? "pr-10" : ""}`}
              aria-invalid={!!error}
              aria-describedby={error ? `${inputId}-error` : undefined}
              {...props}
            />
          </div>
        ) : (
          <input
            ref={ref}
            id={inputId}
            className={`${baseInputClass} ${inputClassName} ${
              label ? "mt-1" : ""
            }`}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : undefined}
            {...props}
          />
        )}
        {error && (
          <p
            id={`${inputId}-error`}
            className="mt-1 text-sm text-red-600"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
