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
  const [selectedMedia, setSelectedMedia] = useState<{
    type: "image" | "video";
    src: string;
  }>({
    type: "image",
    src: validImages[0],
  });

  return (
    <div className="flex flex-col gap-3 sm:gap-4">
      {/* Main Media View */}
      <div className="relative aspect-square w-full rounded-2xl bg-[#FAF6F2] overflow-hidden group">
        {selectedMedia.type === "video" ? (
          <div className="w-full h-full flex items-center justify-center bg-[#1E1616]">
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
            className="object-contain p-5 sm:p-6 transition-transform duration-300 ease-out group-hover:scale-105"
          />
        )}

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex flex-col gap-1.5 z-10 pointer-events-none">
          {discountPercentage > 0 && (
            <Badge variant="sale" className="text-xs sm:text-sm px-2.5 py-1">
              {getDiscountLabel(discountPercentage)}
            </Badge>
          )}
          {isHot && (
            <Badge variant="hot" className="text-xs sm:text-sm px-2.5 py-1">
              HOT BÁN CHẠY
            </Badge>
          )}
        </div>
      </div>

      {/* Thumbnails Strip */}
      <div className="flex items-center gap-2.5 sm:gap-3 overflow-x-auto pb-2">
        {videoUrl && (
          <button
            type="button"
            onClick={() => setSelectedMedia({ type: "video", src: videoUrl })}
            className={`relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-xl bg-[#241818] overflow-hidden transition-[opacity,transform] duration-150 cursor-pointer flex flex-col items-center justify-center text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary ${
              selectedMedia.type === "video"
                ? "outline-2 outline-brand-primary opacity-100"
                : "opacity-75 hover:opacity-100"
            }`}
            aria-label="Xem video giới thiệu sản phẩm"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-brand-primary flex items-center justify-center mb-1">
              <Play className="w-3.5 h-3.5 fill-white text-white ml-0.5" />
            </div>
            <span className="text-xs font-bold">Video</span>
          </button>
        )}

        {validImages.map((img, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setSelectedMedia({ type: "image", src: img })}
            className={`relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-xl bg-white overflow-hidden transition-[opacity,transform] duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary ${
              selectedMedia.type === "image" && selectedMedia.src === img
                ? "outline-2 outline-brand-primary opacity-100"
                : "opacity-70 hover:opacity-100"
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
