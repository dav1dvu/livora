const fs = require('fs');
const path = require('path');

const dirs = [
  'src/lib',
  'src/components/layout',
  'src/components/ui',
  'src/components/landing',
  'src/components/product',
  'src/app/san-pham/[slug]',
  'src/app/danh-muc/[slug]'
];

for (const dir of dirs) {
  fs.mkdirSync(path.join(process.cwd(), dir), { recursive: true });
}

const files = {
  'src/lib/types.ts': `export interface Product {
  name: string;
  url: string;
  slug: string;
  price: number;
  originalPrice: number | null;
  discountPercentage: number;
  imageUrl: string | null;
  category: string;
  specs: Record<string, string>;
  images: string[];
  description?: string;
  isNew?: boolean;
  isFeatured?: boolean;
}

export interface Category {
  name: string;
  slug: string;
  url: string;
  imageUrl?: string;
}

export interface SiteInfo {
  name: string;
  phone: string;
  email: string;
  address: string;
}
`,
  'src/lib/utils.ts': `export function formatPrice(price: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(price);
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}
`,
  'src/lib/products.ts': `import fs from 'fs/promises';
import path from 'path';
import { Product } from './types';

const dataFile = path.join(process.cwd(), 'data', 'products.json');

export async function getProducts(): Promise<Product[]> {
  try {
    const content = await fs.readFile(dataFile, 'utf-8');
    return JSON.parse(content) as Product[];
  } catch (error) {
    return [];
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const products = await getProducts();
  return products.find((p) => p.slug === slug) || null;
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  const products = await getProducts();
  return products.filter((p) => p.category === categorySlug);
}

export async function getFeaturedProducts(limit: number = 10): Promise<Product[]> {
  const products = await getProducts();
  return products.slice(0, limit); // just return first ones
}

export async function getNewProducts(limit: number = 10): Promise<Product[]> {
  const products = await getProducts();
  return products.slice(0, limit);
}
`,
  'src/lib/categories.ts': `import fs from 'fs/promises';
import path from 'path';
import { Category } from './types';

const dataFile = path.join(process.cwd(), 'data', 'categories.json');

export async function getCategories(): Promise<Category[]> {
  try {
    const content = await fs.readFile(dataFile, 'utf-8');
    return JSON.parse(content) as Category[];
  } catch (error) {
    return [];
  }
}
`,
  'src/components/layout/Header.tsx': `import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-[#E8531E]">
          Bear Việt Nam
        </Link>
        <nav className="hidden md:flex space-x-6">
          <Link href="/" className="text-gray-800 hover:text-[#E8531E]">Trang chủ</Link>
          <Link href="/danh-muc/tat-ca" className="text-gray-800 hover:text-[#E8531E]">Sản phẩm</Link>
        </nav>
      </div>
    </header>
  );
}
`,
  'src/components/layout/Footer.tsx': `export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">Bear Việt Nam</h3>
          <p>Địa chỉ: 19 Nguyễn Trãi, Thanh Xuân, Hà Nội</p>
          <p>Điện thoại: 086.240.5715</p>
        </div>
      </div>
    </footer>
  );
}
`,
  'src/components/product/BuyButton.tsx': `import { ShoppingCart } from "lucide-react";

export default function BuyButton() {
  return (
    <a
      href="https://www.tiktok.com/@maymaytaplamtiktok"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center bg-[#E8531E] hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition-colors w-full md:w-auto"
    >
      <ShoppingCart className="w-5 h-5 mr-2" />
      Mua trên TikTok Shop
    </a>
  );
}
`,
  'src/components/product/ProductCard.tsx': `import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group border rounded-lg overflow-hidden hover:shadow-lg transition">
      <Link href={\`/san-pham/\${product.slug}\`}>
        <div className="relative h-64 bg-gray-100">
          {product.imageUrl && (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition duration-300"
            />
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">{product.name}</h3>
          <p className="text-[#E8531E] font-bold mt-2">{formatPrice(product.price)}</p>
        </div>
      </Link>
    </div>
  );
}
`,
  'src/app/page.tsx': `import { getProducts } from "@/lib/products";
import ProductCard from "@/components/product/ProductCard";

export default async function Home() {
  const products = await getProducts();
  
  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Sản phẩm nổi bật</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
}
`,
  'src/app/san-pham/[slug]/page.tsx': `import { getProductBySlug } from "@/lib/products";
import BuyButton from "@/components/product/BuyButton";
import { formatPrice } from "@/lib/utils";
import { notFound } from "next/navigation";
import Image from "next/image";
import type { PageProps } from "../../../../.next/types/app/page";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="relative h-[500px] bg-gray-100 rounded-lg overflow-hidden">
          {product.imageUrl && (
            <Image src={product.imageUrl} alt={product.name} fill className="object-contain" />
          )}
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-2xl text-[#E8531E] font-bold mb-6">{formatPrice(product.price)}</p>
          <div className="mb-8">
            <BuyButton />
          </div>
          <div className="prose">
            <h3>Thông số kỹ thuật</h3>
            <ul>
              {Object.entries(product.specs || {}).map(([key, val]) => (
                <li key={key}><strong>{key}:</strong> {val}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
`,
  'src/app/layout.tsx': `import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Bear Việt Nam - Đồ Gia Dụng',
  description: 'Đồ gia dụng Bear chính hãng tại Việt Nam',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
`,
  'src/app/globals.css': `@tailwind base;
@tailwind components;
@tailwind utilities;

html {
  scroll-behavior: smooth;
}

::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: #f1f1f1;
}
::-webkit-scrollbar-thumb {
  background: #E8531E;
  border-radius: 4px;
}
`
};

for (const [filePath, content] of Object.entries(files)) {
  fs.writeFileSync(path.join(process.cwd(), filePath), content);
}
console.log("Files generated.");
