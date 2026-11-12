import { ShieldCheck, RotateCcw, Truck, CheckCircle2 } from "lucide-react";

export function ServiceCommitments() {
  const commitments = [
    {
      icon: ShieldCheck,
      iconBg: "bg-brand-rose-light text-[#933D33]",
      title: "Bảo hành chính hãng 18 tháng",
      desc: "Quản lý bảo hành điện tử theo số điện thoại đặt hàng. Không lo thất lạc hóa đơn hay phiếu bảo hành giấy.",
    },
    {
      icon: RotateCcw,
      iconBg: "bg-brand-peach-light text-[#933D33]",
      title: "1 đổi 1 trong 30 ngày đầu",
      desc: "Nếu máy có lỗi kỹ thuật từ nhà sản xuất, LIVORA đổi ngay sản phẩm mới 100% tận nhà cho bạn.",
    },
    {
      icon: Truck,
      iconBg: "bg-brand-lavender-light text-[#5668AD]",
      title: "Miễn phí vận chuyển toàn quốc",
      desc: "Freeship cho tất cả đơn hàng từ 450.000₫. Đóng gói chuyên dụng 3 lớp chống sốc, an toàn cho đồ sứ và thủy tinh.",
    },
    {
      icon: CheckCircle2,
      iconBg: "bg-brand-lavender-light text-[#5668AD]",
      title: "Đồng kiểm khi nhận hàng",
      desc: "Bạn luôn được quyền mở kiện kiểm tra thân máy và phụ kiện nguyên vẹn trước khi thanh toán cho người giao hàng.",
    },
  ];

  return (
    <section aria-labelledby="commitments-heading" className="py-8 sm:py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-2xl mb-6 sm:mb-8">
          <h2
            id="commitments-heading"
            className="text-2xl sm:text-4xl font-black text-[#1E1616] tracking-tight"
          >
            Chính sách bảo hành & quyền lợi
          </h2>
          <p className="text-sm sm:text-base text-[#3D2E2D] mt-1.5">
            Sự an tâm của khách hàng là ưu tiên hàng đầu trong từng đơn hàng.
          </p>
        </div>

        {/* 4 thẻ cam kết ngắn gọn */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {commitments.map((c, idx) => {
            const Icon = c.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white flex flex-col justify-between"
              >
                <div>
                  <div
                    className={`w-10 h-10 rounded-xl ${c.iconBg} flex items-center justify-center shrink-0 mb-4`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="text-base font-bold text-[#1E1616] mb-2">
                    {c.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#5A4D4B] leading-relaxed">
                    {c.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ServiceCommitments;
