import { Table } from "lucide-react";

interface ProductSpecsProps {
  specs: Record<string, string>;
}

export function ProductSpecs({ specs }: ProductSpecsProps) {
  const entries = Object.entries(specs || {});

  if (entries.length === 0) {
    return (
      <div className="py-6 text-stone-500 text-sm italic">
        Thông số kỹ thuật đang được cập nhật.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-[#EDE4E1] overflow-hidden">
      <div className="px-5 py-4 bg-[#FAF6F2] border-b border-[#EDE4E1] flex items-center gap-2">
        <Table className="w-5 h-5 text-brand-primary" />
        <h3 className="font-bold text-brand-charcoal text-base">Thông số kỹ thuật chi tiết</h3>
      </div>
      <div className="divide-y divide-stone-100">
        {entries.map(([key, value], idx) => (
          <div
            key={key}
            className={`grid grid-cols-1 sm:grid-cols-3 px-5 py-3 text-sm ${
              idx % 2 === 0 ? "bg-white" : "bg-stone-50/40"
            }`}
          >
            <span className="font-medium text-stone-600 sm:col-span-1">{key}</span>
            <span className="text-stone-900 sm:col-span-2 font-normal mt-0.5 sm:mt-0">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

