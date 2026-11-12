import { ShieldCheck, Flame, BookOpen, Cpu } from "lucide-react";

export function QualityStandards() {
  const standards = [
    {
      icon: ShieldCheck,
      iconBg: "bg-brand-rose-light text-[#933D33]",
      title: "Thố sứ tự nhiên & thủy tinh chịu nhiệt",
      desc: "Nung ở nhiệt độ cao trên 1.200°C, men sứ tự nhiên không thôi nhiễm chì hay kim loại nặng khi ninh hầm lâu cho bé.",
      tag: "Không chứa chì & BPA",
    },
    {
      icon: Flame,
      iconBg: "bg-brand-peach-light text-[#933D33]",
      title: "Hầm chưng cách thủy 3D giữ dưỡng chất",
      desc: "Làm chín thực phẩm gián tiếp bằng hơi nước, giữ lại 99% vitamin và khoáng chất. Nồi không sôi trào và không khê khét đáy.",
      tag: "Bảo toàn 99% vi chất",
    },
    {
      icon: BookOpen,
      iconBg: "bg-brand-lavender-light text-[#5668AD]",
      title: "Phím bấm hoàn toàn bằng tiếng Việt",
      desc: "Bảng điều khiển và màn hình hiển thị tiếng Việt rõ ràng, kèm thực đơn ăn dặm. Ông bà hay người giúp việc đều dùng được.",
      tag: "Dễ dùng cho cả gia đình",
    },
    {
      icon: Cpu,
      iconBg: "bg-brand-lavender-light text-[#5668AD]",
      title: "Cảm biến chống cạn, tự ngắt an toàn",
      desc: "Tự động ngắt nguồn điện ngay khi cạn nước hoặc quá nhiệt. Vỏ cách nhiệt 2 lớp chống nóng khi chạm vào thân máy.",
      tag: "Tự ngắt nguồn thông minh",
    },
  ];

  return (
    <section aria-labelledby="standards-heading" className="py-8 sm:py-12">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-2xl mb-6 sm:mb-8">
          <h2
            id="standards-heading"
            className="text-2xl sm:text-4xl font-black text-[#1E1616] tracking-tight"
          >
            Tiêu chuẩn an toàn của LIVORA
          </h2>
          <p className="text-sm sm:text-base text-[#3D2E2D] mt-1.5">
            Thiết bị nấu ăn cho trẻ nhỏ cần đạt độ an toàn cao nhất trong từng chi tiết.
          </p>
        </div>

        {/* 4 thẻ súc tích, không thừa chữ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {standards.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div
                      className={`w-10 h-10 rounded-xl ${s.iconBg} flex items-center justify-center shrink-0`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-brand-cream text-[#5A4D4B]">
                      {s.tag}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-[#1E1616] mb-2">
                    {s.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#5A4D4B] leading-relaxed">
                    {s.desc}
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

export default QualityStandards;
