import React from "react";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style — all variants share the same neon / synthwave glow */
  variant?: "primary" | "secondary" | "danger" | "link";
  /** Shows a small spinner and disables the button */
  isLoading?: boolean;
  /** Optional icons */
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

function Spinner() {
  return (
    <svg
      className="h-4 w-4 animate-spin"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  );
}

/**
 * Neon-glow button, tuned for the app’s synthwave palette.
 *
 * • `primary`   – pink → yellow hover
 * • `secondary` – purple → teal hover
 * • `danger`    – red → orange hover
 * • `link`      – text-only, subtle hover underline
 */
export default function Button({
  variant = "primary",
  isLoading = false,
  leftIcon,
  rightIcon,
  className,
  disabled,
  children,
  ...props
}: ButtonProps) {
  // shared look
  const base =
    "inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm uppercase font-synth text-white " +
    "transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 " +
    "disabled:opacity-60 disabled:cursor-not-allowed disabled:shadow-none";

  // neon palettes
  const styles: Record<NonNullable<ButtonProps["variant"]>, string> = {
    primary:
      "bg-pink shadow-[0_0_6px_#ff7edb] hover:bg-yellow hover:shadow-[0_0_6px_#ffe86b] focus:ring-pink",
    secondary:
      "bg-purple shadow-[0_0_6px_#c084fc] hover:bg-teal hover:shadow-[0_0_6px_#5eead4] focus:ring-purple",
    danger:
      "bg-red shadow-[0_0_6px_#ff296b] hover:bg-orange hover:shadow-[0_0_6px_#ff9c52] focus:ring-red",
    link:
      "bg-transparent px-0 py-0 text-pink hover:text-yellow hover:underline focus:ring-transparent shadow-none",
  };

  return (
    <button
      className={clsx(base, styles[variant], isLoading && "cursor-wait", className)}
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
      {...props}
    >
      {isLoading ? (
        <>
          <Spinner />
          <span className="sr-only">Loading…</span>
        </>
      ) : (
        <>
          {leftIcon}
          {children}
          {rightIcon}
        </>
      )}
    </button>
  );
}
