"use client";

import { PhoneCall } from "lucide-react";
import { FacebookIcon } from "./Icons";
import { FACEBOOK_PAGE_URL, SITE_INFO } from "@/lib/types";

export function FloatingContact() {
  return (
    <aside aria-label="Kênh liên hệ nhanh" className="fixed bottom-6 right-5 z-40 flex flex-col items-end gap-3 pointer-events-none">
      {/* Facebook Fanpage Quick Action */}
      <a
        href={FACEBOOK_PAGE_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Nhắn tin qua Fanpage Facebook Livora (Mở trong tab mới)"
        className="pointer-events-auto group flex items-center gap-2.5 pl-3.5 pr-4 py-2.5 rounded-full bg-[#45558E] hover:bg-[#384675] text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary cursor-pointer min-h-11"
      >
        <span className="w-8 h-8 rounded-full bg-white text-[#45558E] flex items-center justify-center shrink-0">
          <FacebookIcon className="w-4 h-4 fill-current" />
        </span>
        <div className="flex flex-col text-left leading-tight">
          <span className="text-[11px] font-medium text-indigo-100">Fanpage Facebook</span>
          <span className="text-xs font-bold text-white">Tư vấn trực tiếp</span>
        </div>
      </a>

      {/* Hotline Quick Call */}
      <a
        href={`tel:${SITE_INFO.phone.replace(/[^0-9]/g, "")}`}
        aria-label={`Gọi hotline tư vấn ${SITE_INFO.phone}`}
        className="pointer-events-auto group flex items-center gap-2 pl-3 pr-3.5 py-2.5 rounded-full bg-[#933D33] hover:bg-[#7D2E25] text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#933D33] cursor-pointer min-h-11"
      >
        <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center shrink-0">
          <PhoneCall className="w-3.5 h-3.5 text-white" />
        </span>
        <span className="text-xs font-bold">{SITE_INFO.phone}</span>
      </a>
    </aside>
  );
}

export default FloatingContact;
