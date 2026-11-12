import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "primary" | "hot" | "new" | "sale" | "neutral";
  className?: string;
}

export function Badge({ children, variant = "neutral", className }: BadgeProps) {
  const variantStyles = {
    primary: "bg-brand-rose-light text-brand-primary border-brand-rose-border",
    hot: "bg-[#FDECE8] text-[#C24B3B] border-[#F5C2BA] font-bold",
    new: "bg-brand-lavender-light text-[#6071B8] border-brand-lavender-border font-semibold",
    sale: "bg-[#FFF2EB] text-[#C55E38] border-[#F7D3C1] font-bold",
    neutral: "bg-[#F5EBE6] text-[#4A3B3A] border-[#E8DAD4]",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-md text-xs border font-medium shadow-xs",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
