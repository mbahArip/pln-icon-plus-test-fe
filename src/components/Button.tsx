import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import * as React from "react";

// Jika ingin dipakai di tag selain button
export const buttonVariants = cva(
  "text-sm leading-5 justify-center tracking-[3%] font-semibold inline-flex items-center gap-2 rounded-lg [&>svg]:size-[18px] transition disabled:bg-[#D3D3D3] disabled:text-[#9E9E9E] focus:ring-2 h-fit",
  {
    variants: {
      variant: {
        primary:
          "[--bg:#4A8394] [--hover-bg:#3A6D7D] [--hover-bg-ghost:#3A6D7D1A] [--focus-ring:#3A6D7D] [--text:white]",
        destructive:
          "[--bg:#FF6363] [--hover-bg:#E53E3E] [--hover-bg-ghost:#E53E3E1A] [--focus-ring:#E53E3E] [--text:white]",
      },
      fill: {
        solid: "bg-[var(--bg)] text-[var(--text)] hover:bg-[var(--hover-bg)] focus:ring-[var(--focus-ring)]",
        ghost: "bg-transparent text-[var(--bg)] hover:bg-[var(--hover-bg-ghost)] focus:ring-[var(--focus-ring)]",
      },
      size: {
        default: "px-4 py-3",
        icon: "p-3",
      },
    },
    defaultVariants: {
      variant: "primary",
      fill: "solid",
      size: "default",
    },
  }
);
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}

export function Button({ variant, fill, size, className, ...rest }: ButtonProps) {
  return <button className={cn(buttonVariants({ variant, fill, size, className }))} {...rest} />;
}
