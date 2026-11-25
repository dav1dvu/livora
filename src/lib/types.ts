export interface Product {
  id: number;
  name: string;
  slug: string;
  url: string;
  price: number;
  originalPrice: number | null;
  salePrice: number | null;
  discountPercentage: number;
  thumbnail: string | null;
  imageUrl: string | null;
  images: string[];
  gallery: string[];
  category: string;
  categories: string[];
  badges: string[];
  description: string;
  specs: Record<string, string>;
  rating: number;
  reviewCount: number;
  isNew: boolean;
  isHot: boolean;
  isFeatured: boolean;
  sourceUrl: string;
  videoUrl?: string | null;
}

export interface Category {
  name: string;
  slug: string;
  url: string;
  parentSlug: string | null;
  productCount: number;
  imageUrl?: string;
}

export interface SiteInfo {
  name: string;
  phone: string;
  email: string;
  address: string;
  description: string;
}

export const SITE_INFO: SiteInfo = {
  name: "Livora Việt Nam",
  phone: "086.240.5715",
  email: "livoravietnam@gmail.com",
  address: "19 Nguyễn Trãi, Thanh Xuân, Hà Nội",
  description:
    "Livora Official - Yêu thương từ những điều nhỏ bé, chăm sóc bằng cả trái tim. Phân phối chính hãng thiết bị gia dụng và sản phẩm mẹ & bé.",
};

export const TIKTOK_SHOP_URL = "https://www.tiktok.com/@maymaytaplamtiktok";
export const FACEBOOK_PAGE_URL = "https://www.facebook.com/profile.php?id=61595278235275";

export interface NavItem {
  label: string;
  href: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About us", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
  { label: "Shop", href: "/shop" },
];

export const DEFAULT_CATEGORIES: Category[] = [
  { name: "Bé khỏe - Mẹ vui", slug: "be-khoe-me-vui", url: "/danh-muc/be-khoe-me-vui", parentSlug: null, productCount: 7 },
  { name: "Nồi nấu chậm", slug: "noi-nau-cham", url: "/danh-muc/noi-nau-cham", parentSlug: null, productCount: 5 },
  { name: "Máy xay ăn dặm", slug: "may-xay-an-dam", url: "/danh-muc/may-xay-an-dam", parentSlug: null, productCount: 3 },
];
