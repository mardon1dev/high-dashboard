import { forwardRef } from "react";

const variants = {
  primary:
    "rounded-lg bg-dashboard-green px-6 py-2 font-semibold text-white shadow-md transition-all hover:bg-dashboard-dark disabled:opacity-50 active:scale-95",
  secondary:
    "rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-800",
  ghost:
    "rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-800",
  outline:
    "rounded-xl border-2 border-dashboard-green px-4 py-3 font-bold text-dashboard-green transition-all hover:bg-dashboard-green hover:text-white",
  icon: "rounded-full p-1 transition-colors hover:bg-slate-100",
} as const;

type ButtonVariant = keyof typeof variants;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  isLoading?: boolean;
  loadingText?: string;
  children: React.ReactNode;
  className?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      isLoading = false,
      loadingText,
      disabled,
      children,
      className = "",
      ...props
    },
    ref
  ) => {
    const content = isLoading ? (
      <>
        <span className="inline-block h-4 w-4 shrink-0 animate-spin rounded-full border-2 border-current border-t-transparent" />
        <span className="ml-2">{loadingText ?? children}</span>
      </>
    ) : (
      children
    );

    return (
      <button
        ref={ref}
        disabled={disabled ?? isLoading}
        className={`inline-flex items-center justify-center gap-2 ${variants[variant]} ${className}`}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";
