"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";

export function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/danh-muc/tat-ca?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-md">
      <label htmlFor="search-input" className="sr-only">
        Tìm kiếm sản phẩm Livora
      </label>
      <input
        id="search-input"
        type="search"
        placeholder="Tìm nồi nấu chậm, máy xay ăn dặm, máy làm sữa hạt..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full pl-10 pr-9 py-2.5 rounded-full border border-[#EDE4E1] bg-white text-brand-charcoal text-sm placeholder:text-[#9B8C8A] focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-colors"
      />
      <Search className="w-4 h-4 text-[#9B8C8A] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
      {query && (
        <button
          type="button"
          onClick={() => setQuery("")}
          className="p-1 rounded-full text-[#9B8C8A] hover:text-brand-charcoal absolute right-3 top-1/2 -translate-y-1/2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary cursor-pointer"
          aria-label="Xóa từ khóa tìm kiếm"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </form>
  );
}

