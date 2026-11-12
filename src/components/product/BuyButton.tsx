import { ExternalLink } from "lucide-react";
import { TikTokIcon } from "@/components/ui/Icons";
import { TIKTOK_SHOP_URL } from "@/lib/types";
import { cn } from "@/lib/utils";

interface BuyButtonProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

export default function BuyButton({
  className,
  size = "md",
  fullWidth = false,
}: BuyButtonProps) {
  const sizeStyles = {
    sm: "px-3.5 py-2 text-xs",
    md: "px-5 py-3 text-sm",
    lg: "px-7 py-3.5 text-base",
  };

  const iconSizes = {
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  return (
    <a
      href={TIKTOK_SHOP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center justify-center gap-2 font-bold rounded-xl text-white bg-[#933D33] hover:bg-[#7D2E25] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#933D33] cursor-pointer select-none min-h-11",
        sizeStyles[size],
        fullWidth ? "w-full" : "",
        className
      )}
      aria-label="Mua sản phẩm này trên TikTok Shop (Mở trong tab mới)"
    >
      <TikTokIcon className={cn(iconSizes[size], "shrink-0 fill-current")} />
      <span>Mua trên TikTok Shop</span>
      <ExternalLink className="w-3.5 h-3.5 opacity-70 shrink-0" />
    </a>
  );
}
