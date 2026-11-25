import { ExternalLink } from "lucide-react";
import { FacebookIcon, TikTokIcon } from "@/components/ui/Icons";
import { FACEBOOK_PAGE_URL, TIKTOK_SHOP_URL } from "@/lib/types";
import { cn } from "@/lib/utils";

interface BuyButtonProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  channel?: "tiktok" | "facebook";
}

export default function BuyButton({
  className,
  size = "md",
  fullWidth = false,
  channel = "tiktok",
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

  const isFacebook = channel === "facebook";
  const href = isFacebook ? FACEBOOK_PAGE_URL : TIKTOK_SHOP_URL;
  const label = isFacebook ? "Mua qua Facebook" : "Mua trên TikTok Shop";
  const ariaLabel = isFacebook
    ? "Mua sản phẩm này qua Facebook (Mở trong tab mới)"
    : "Mua sản phẩm này trên TikTok Shop (Mở trong tab mới)";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center justify-center gap-2 font-bold rounded-xl text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 cursor-pointer select-none min-h-11",
        isFacebook
          ? "bg-[#374880] hover:bg-[#2B3966] focus-visible:ring-[#5668AD]"
          : "bg-[#933D33] hover:bg-[#7D2E25] focus-visible:ring-[#933D33]",
        sizeStyles[size],
        fullWidth ? "w-full" : "",
        className
      )}
      aria-label={ariaLabel}
    >
      {isFacebook ? (
        <FacebookIcon className={cn(iconSizes[size], "shrink-0 fill-current")} />
      ) : (
        <TikTokIcon className={cn(iconSizes[size], "shrink-0 fill-current")} />
      )}
      <span>{label}</span>
      <ExternalLink className="w-3.5 h-3.5 opacity-70 shrink-0" />
    </a>
  );
}
