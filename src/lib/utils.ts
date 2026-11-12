export function formatPrice(price: number): string {
  if (!price || price === 0) return "Liên hệ";
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function getDiscountLabel(discount: number): string {
  if (!discount) return "";
  return `-${Math.round(discount)}%`;
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}

const CATEGORY_NAMES: Record<string, string> = {
  "be-khoe-me-vui": "Bé khỏe - Mẹ vui",
  "noi-nau-cham": "Nồi nấu chậm",
  "noi-hap-bear": "Nồi hấp Bear",
  "noi-lau": "Nồi lẩu Bear",
  "noi-com-dien": "Nồi cơm điện",
  "noi-ap-suat-bear": "Nồi áp suất",
  "noi-chien-khong-dau": "Nồi chiên không dầu",
  "may-xay-an-dam": "Máy xay ăn dặm",
  "may-xay-thit": "Máy xay thịt",
  "may-xay-sinh-to": "Máy xay sinh tố",
  "may-lam-sua-hat": "Máy làm sữa hạt",
  "may-phun-suong-tao-am": "Máy phun sương tạo ẩm",
  "may-pha-tra": "Máy pha trà",
  "am-sieu-toc": "Ấm siêu tốc",
  "may-pha-cafe": "Máy pha cà phê",
  "may-ham-sua": "Máy hâm sữa",
  "thiet-bi-lam-banh": "Thiết bị làm bánh",
  "do-gia-dung-khac": "Đồ gia dụng",
};

export function getCategoryDisplayName(slugOrName: string | undefined | null): string {
  if (!slugOrName) return "Đồ gia dụng";
  if (CATEGORY_NAMES[slugOrName]) return CATEGORY_NAMES[slugOrName];
  // If it's already a clean capitalized Vietnamese name
  if (slugOrName.includes(" ")) return slugOrName;
  // Convert slug to capitalized readable text as fallback
  return slugOrName
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
