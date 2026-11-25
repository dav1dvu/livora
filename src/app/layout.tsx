import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Lora } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { getCategories } from "@/lib/categories";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "vietnamese"],
  display: "swap",
  variable: "--font-sans",
});

const lora = Lora({
  subsets: ["latin", "vietnamese"],
  display: "swap",
  variable: "--font-serif",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://livora-official.vercel.app"),
  title: "LIVORA Official - Yêu Thương Từ Những Điều Nhỏ Bé",
  description:
    "LIVORA Official Store: Gia dụng thông minh & sản phẩm mẹ và bé cao cấp. Chăm sóc bằng cả trái tim, bảo hành 18 tháng, 1 đổi 1 trong 30 ngày. Đặt mua chính hãng qua TikTok Shop & kết nối Fanpage Facebook.",
  keywords: [
    "LIVORA",
    "Livora Việt Nam",
    "nồi nấu chậm Bear",
    "máy xay ăn dặm",
    "đồ gia dụng mẹ và bé",
    "chăm sóc mẹ và bé",
  ],
  openGraph: {
    title: "LIVORA Official - Yêu thương từ những điều nhỏ bé",
    description: "Chăm sóc bằng cả trái tim - Bảo hành 18 tháng - 1 đổi 1 trong 30 ngày",
    type: "website",
    locale: "vi_VN",
    images: ["/images/banner.png"],
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await getCategories();

  return (
    <html lang="vi" className={`scroll-smooth ${plusJakarta.variable} ${lora.variable}`}>
      <body className={`${plusJakarta.className} min-h-screen flex flex-col bg-brand-cream text-brand-charcoal antialiased selection:bg-brand-rose selection:text-white`}>
        <Header categories={categories} />
        <main className="flex-1">{children}</main>
        <Footer categories={categories} />
        <ScrollToTop />
      </body>
    </html>
  );
}
