"use client";

import { cn } from "@/lib/utils";
import { icons, LucideProps } from "lucide-react";

type Props = {
  name: keyof typeof icons;
  className?: string;
} & LucideProps;
export function Icon({ name, className, ...props }: Props) {
  const Icon = icons[name];
  return <Icon className={cn("aspect-square", className)} {...props} />;
}
