"use client";

import { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { FACEBOOK_PAGE_URL } from "@/lib/types";
import { FacebookIcon } from "@/components/ui/Icons";

interface FormState {
  name: string;
  phone: string;
  topic: string;
  message: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  message?: string;
}

const INITIAL_FORM: FormState = {
  name: "",
  phone: "",
  topic: "Tư vấn sản phẩm",
  message: "",
};

export function ContactForm() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const nextErrors: FormErrors = {};
    if (!form.name.trim()) {
      nextErrors.name = "Vui lòng nhập họ và tên của bạn.";
    }
    const cleanPhone = form.phone.replace(/\s+/g, "");
    if (!cleanPhone) {
      nextErrors.phone = "Vui lòng nhập số điện thoại liên hệ.";
    } else if (!/^[0-9+]{9,13}$/.test(cleanPhone)) {
      nextErrors.phone = "Số điện thoại chưa hợp lệ (9–13 chữ số).";
    }
    if (!form.message.trim() || form.message.trim().length < 10) {
      nextErrors.message = "Vui lòng nhập nội dung cần hỗ trợ (tối thiểu 10 ký tự).";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
    setForm(INITIAL_FORM);
    setErrors({});
  };

  if (submitted) {
    return (
      <div className="rounded-2xl bg-brand-rose-light border border-brand-rose-border p-6 sm:p-8 text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-[#3B7A57]/15 text-[#3B7A57] flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-black text-[#1E1616]">
          Đã ghi nhận thông tin liên hệ!
        </h3>
        <p className="text-xs sm:text-sm text-[#5A4D4B] max-w-md mx-auto leading-relaxed">
          Cảm ơn bạn đã liên hệ LIVORA. Để được phản hồi tức thì 24/7, bạn cũng có thể nhắn trực tiếp qua Fanpage Facebook chính thức của chúng tôi.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <a
            href={FACEBOOK_PAGE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#374880] hover:bg-[#2B3966] text-white text-xs font-bold transition-colors"
          >
            <FacebookIcon className="w-4 h-4 fill-current" />
            <span>Nhắn qua Facebook ngay</span>
          </a>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="px-4 py-2.5 rounded-xl border border-[#EDE4E1] bg-white hover:bg-brand-cream text-xs font-bold text-[#1E1616] cursor-pointer transition-colors"
          >
            Gửi yêu cầu khác
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-name" className="block text-xs font-bold text-[#1E1616] mb-1.5">
            Họ và tên <span className="text-[#933D33]">*</span>
          </label>
          <input
            id="contact-name"
            type="text"
            value={form.name}
            onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
            placeholder="Ví dụ: Nguyễn Minh Anh"
            className="w-full px-4 py-2.5 rounded-xl border border-[#EDE4E1] bg-brand-cream text-sm text-[#1E1616] focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary"
          />
          {errors.name && <p className="text-xs text-[#933D33] mt-1">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="contact-phone" className="block text-xs font-bold text-[#1E1616] mb-1.5">
            Số điện thoại <span className="text-[#933D33]">*</span>
          </label>
          <input
            id="contact-phone"
            type="tel"
            value={form.phone}
            onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
            placeholder="Ví dụ: 0862405715"
            className="w-full px-4 py-2.5 rounded-xl border border-[#EDE4E1] bg-brand-cream text-sm text-[#1E1616] focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary"
          />
          {errors.phone && <p className="text-xs text-[#933D33] mt-1">{errors.phone}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="contact-topic" className="block text-xs font-bold text-[#1E1616] mb-1.5">
          Chủ đề hỗ trợ
        </label>
        <select
          id="contact-topic"
          value={form.topic}
          onChange={(e) => setForm((prev) => ({ ...prev, topic: e.target.value }))}
          className="w-full px-4 py-2.5 rounded-xl border border-[#EDE4E1] bg-brand-cream text-sm text-[#1E1616] focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary"
        >
          <option value="Tư vấn sản phẩm">Tư vấn chọn sản phẩm</option>
          <option value="Đặt mua Bé khỏe - Mẹ vui">Đặt mua danh mục Bé khỏe - Mẹ vui</option>
          <option value="Bảo hành & Đổi trả">Bảo hành 18 tháng / 1 đổi 1 trong 30 ngày</option>
          <option value="Hợp tác & Khác">Hợp tác & Khác</option>
        </select>
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-xs font-bold text-[#1E1616] mb-1.5">
          Nội dung cần hỗ trợ <span className="text-[#933D33]">*</span>
        </label>
        <textarea
          id="contact-message"
          rows={4}
          value={form.message}
          onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
          placeholder="Nhập tên sản phẩm hoặc câu hỏi bạn cần LIVORA tư vấn..."
          className="w-full px-4 py-2.5 rounded-xl border border-[#EDE4E1] bg-brand-cream text-sm text-[#1E1616] focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary resize-y"
        />
        {errors.message && <p className="text-xs text-[#933D33] mt-1">{errors.message}</p>}
      </div>

      <button
        type="submit"
        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#933D33] hover:bg-[#7D2E25] text-white font-bold text-sm transition-colors cursor-pointer min-h-11"
      >
        <Send className="w-4 h-4" />
        <span>Gửi tin nhắn liên hệ</span>
      </button>
    </form>
  );
}
