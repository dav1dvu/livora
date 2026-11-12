import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="py-3 text-sm text-stone-500">
      <ol className="flex items-center flex-wrap gap-1.5">
        <li className="flex items-center">
          <Link
            href="/"
            className="flex items-center gap-1 hover:text-brand-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded px-1"
          >
            <Home className="w-4 h-4" />
            <span>Trang chủ</span>
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center gap-1.5">
              <ChevronRight className="w-3.5 h-3.5 text-[#9B8C8A]" />
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="hover:text-brand-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded px-1"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="font-bold text-brand-charcoal truncate max-w-xs sm:max-w-md" aria-current="page">
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

