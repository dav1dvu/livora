"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { getDiscountLabel } from "@/lib/utils";

interface ProductGalleryProps {
  images: string[];
  productName: string;
  discountPercentage?: number;
  isHot?: boolean;
  videoUrl?: string | null;
}

export function ProductGallery({
  images,
  productName,
  discountPercentage = 0,
  isHot = false,
  videoUrl,
}: ProductGalleryProps) {
  const validImages = images.length > 0 ? images : ["/placeholder.png"];
  const [selectedMedia, setSelectedMedia] = useState<{ type: "image" | "video"; src: string }>({
    type: "image",
    src: validImages[0],
  });

  return (
    <div className="flex flex-col gap-4">
      {/* Main Media View */}
      <div className="relative aspect-square w-full rounded-2xl bg-[#FAF6F2] border border-[#EDE4E1] overflow-hidden group">
        {selectedMedia.type === "video" ? (
          <div className="w-full h-full flex items-center justify-center bg-black">
            <video
              src={selectedMedia.src}
              controls
              autoPlay
              playsInline
              className="max-w-full max-h-full object-contain"
            >
              Trình duyệt của bạn không hỗ trợ xem video.
            </video>
          </div>
        ) : (
          <Image
            src={selectedMedia.src}
            alt={productName}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain p-6 transition-transform duration-300 group-hover:scale-105"
          />
        )}

        {/* Badges Overlay */}
        <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10 pointer-events-none">
          {discountPercentage > 0 && (
            <Badge variant="sale" className="text-sm px-2.5 py-1">
              {getDiscountLabel(discountPercentage)}
            </Badge>
          )}
          {isHot && (
            <Badge variant="hot" className="text-sm px-2.5 py-1">
              HOT BÁN CHẠY
            </Badge>
          )}
        </div>
      </div>

      {/* Thumbnails Strip */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-thin">
        {/* Video Thumbnail if present */}
        {videoUrl && (
          <button
            onClick={() => setSelectedMedia({ type: "video", src: videoUrl })}
            className={`relative w-20 h-20 shrink-0 rounded-xl bg-stone-900 border-2 overflow-hidden transition-all duration-150 cursor-pointer flex flex-col items-center justify-center text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary ${
              selectedMedia.type === "video"
                ? "border-brand-primary shadow-md ring-2 ring-brand-rose/30"
                : "border-[#EDE4E1] opacity-75 hover:opacity-100"
            }`}
            aria-label="Xem video giới thiệu sản phẩm"
          >
            <div className="w-8 h-8 rounded-full bg-brand-primary flex items-center justify-center mb-1 shadow-sm">
              <Play className="w-4 h-4 fill-white text-white ml-0.5" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider">Video</span>
          </button>
        )}

        {/* Image Thumbnails */}
        {validImages.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedMedia({ type: "image", src: img })}
            className={`relative w-20 h-20 shrink-0 rounded-xl bg-white border-2 overflow-hidden transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary ${
              selectedMedia.type === "image" && selectedMedia.src === img
                ? "border-brand-primary shadow-md ring-2 ring-brand-rose/30"
                : "border-[#EDE4E1] hover:border-brand-rose opacity-75 hover:opacity-100"
            }`}
            aria-label={`Xem hình ảnh ${idx + 1} của sản phẩm`}
          >
            <Image
              src={img}
              alt={`${productName} thumbnail ${idx + 1}`}
              fill
              sizes="80px"
              className="object-contain p-1.5"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
