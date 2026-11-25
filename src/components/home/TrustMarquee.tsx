const TRUST_ITEMS = [
  "Thố sứ tự nhiên nung > 1.200°C",
  "Hầm chưng cách thủy giữ 99% vi chất",
  "Phím bấm tiếng Việt 100%",
  "Bảo hành điện tử 18 tháng",
  "1 đổi 1 tận nhà trong 30 ngày",
  "Đồng kiểm nguyên vẹn khi nhận hàng",
  "Freeship toàn quốc từ 450.000₫",
];

export function TrustMarquee() {
  const repeated = [...TRUST_ITEMS, ...TRUST_ITEMS];

  return (
    <section
      aria-label="Cam kết thương hiệu LIVORA"
      className="group/marquee bg-[#241818] text-[#F3EBE7] border-y border-[#3B2B2B] overflow-hidden py-3.5"
    >
      <div className="flex w-max animate-livora-marquee motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-y-2 motion-reduce:px-4">
        {repeated.map((label, idx) => (
          <div
            key={`${label}-${idx}`}
            className="flex items-center gap-4 px-5 text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-rose shrink-0" />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
