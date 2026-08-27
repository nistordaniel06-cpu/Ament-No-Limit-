"use client";

import { ArrowRight } from "lucide-react";

const transactions = [
  { label: "Împrumut acordat", date: "14 mai 2024", amount: "+680 lei", positive: true },
  { label: "Plată dobândă", date: "20 mai 2024", amount: "-68 lei", positive: false },
  { label: "Prelungire scadență", date: "26 mai 2024", amount: "+15 zile", positive: true },
];

export default function ClientDashboard() {
  const progress = 60; // days remaining out of total

  return (
    <div className="space-y-5">
      {/* Dashboard client card */}
      <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-[#111827] text-base">Dashboard client</h3>
          <span className="text-xs font-semibold bg-emerald-50 text-emerald-600 px-2.5 py-0.5 rounded-full">
            Activ
          </span>
        </div>

        {/* Loan info */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-[#6B7280]">Sumă împrumutată</p>
            <p className="text-2xl font-bold text-[#111827]">680 lei</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-[#6B7280]">Scadență</p>
            <p className="text-sm font-semibold text-[#C89D3C]">12 zile rămase</p>
          </div>
        </div>

        {/* Progress bar */}
        <div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#C89D3C] rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between mt-1.5 text-xs text-[#6B7280]">
            <span>Împrumutat pe 14 mai 2024</span>
            <span>Scadență pe 30 mai 2024</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button className="flex-1 bg-[#C89D3C] hover:bg-[#B3892F] text-white text-sm font-semibold rounded-xl py-2.5 transition-colors">
            Plătește
          </button>
          <button className="flex-1 border border-gray-200 hover:border-[#C89D3C] text-[#6B7280] hover:text-[#C89D3C] text-sm font-semibold rounded-xl py-2.5 transition-colors">
            Prelungește
          </button>
        </div>

        {/* Transaction history */}
        <div className="pt-2 border-t border-gray-100">
          <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-3">
            Istoric tranzacții
          </p>
          <div className="space-y-2.5">
            {transactions.map((tx) => (
              <div key={tx.label} className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#111827] font-medium">{tx.label}</p>
                  <p className="text-xs text-[#6B7280]">{tx.date}</p>
                </div>
                <span
                  className={`text-sm font-bold ${
                    tx.positive ? "text-emerald-600" : "text-red-500"
                  }`}
                >
                  {tx.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Promotional CTA card */}
      <div className="bg-[#121417] rounded-2xl p-5 space-y-3">
        <h3 className="font-bold text-white text-base">Ai un obiect de evaluat?</h3>
        <p className="text-sm text-gray-400 leading-relaxed">
          Trimite-ne poze și primești o evaluare rapidă.
        </p>
        <button className="w-full flex items-center justify-center gap-2 bg-[#C89D3C] hover:bg-[#B3892F] text-white text-sm font-semibold rounded-xl py-3 transition-colors">
          Cere evaluare <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
