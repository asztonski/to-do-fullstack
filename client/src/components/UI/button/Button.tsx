import React from "react";
import clsx from "clsx";

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style — all variants share the same neon / synthwave glow */
  variant?: "primary" | "secondary" | "danger" | "link";
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
  className,
  ...props
}: ButtonProps) {
  /* shared look */
  const base =
    "rounded-md px-4 py-2 text-sm text-white uppercase font-synth text-white flex items-center" +
    "transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

  /* neon palettes */
  const styles: Record<NonNullable<ButtonProps["variant"]>, string> = {
    primary:
      "bg-pink shadow-[0_0_6px_#ff7edb] " +
      "hover:bg-yellow hover:shadow-[0_0_6px_#ffe86b] focus:ring-pink",
    secondary:
      "bg-purple shadow-[0_0_6px_#c084fc] " +
      "hover:bg-teal hover:shadow-[0_0_6px_#5eead4] focus:ring-purple",
    danger:
      "bg-red shadow-[0_0_6px_#ff296b] " +
      "hover:bg-orange hover:shadow-[0_0_6px_#ff9c52] focus:ring-red",
    link:
      "bg-transparent px-0 py-0 text-pink hover:text-yellow hover:underline " +
      "focus:ring-transparent shadow-none",
  };

  return (
    <button className={clsx(base, styles[variant], className)} {...props} />
  );
}
