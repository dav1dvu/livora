import { Table } from "lucide-react";

interface ProductSpecsProps {
  specs: Record<string, string>;
}

export function ProductSpecs({ specs }: ProductSpecsProps) {
  const entries = Object.entries(specs || {});

  if (entries.length === 0) {
    return (
      <div className="py-6 text-[#5A4D4B] text-sm">
        Thông số kỹ thuật đang được cập nhật.
      </div>
    );
  }

  return (
    <div data-ui className="bg-white rounded-2xl overflow-hidden">
      <div className="px-5 py-4 bg-[#FAF6F2] flex items-center gap-2">
        <Table className="w-5 h-5 text-brand-primary" />
        <h3 className="font-bold text-brand-charcoal text-base">
          Thông số kỹ thuật chi tiết
        </h3>
      </div>
      <div>
        {entries.map(([key, value], idx) => (
          <div
            key={key}
            className={`grid grid-cols-1 sm:grid-cols-3 px-5 py-3 text-sm ${
              idx % 2 === 0 ? "bg-white" : "bg-[#FAF6F2]/60"
            }`}
          >
            <span className="font-semibold text-[#5A4D4B] sm:col-span-1">
              {key}
            </span>
            <span className="text-[#1E1616] sm:col-span-2 font-normal mt-0.5 sm:mt-0">
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
