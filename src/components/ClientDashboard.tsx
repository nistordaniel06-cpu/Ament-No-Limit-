import { ArrowRight } from "lucide-react";
import Link from "next/link";

const transactions = [
  { label: "Împrumut acordat", date: "14 mai 2024", amount: "+680 lei", positive: true },
  { label: "Plată dobândă", date: "20 mai 2024", amount: "-68 lei", positive: false },
  { label: "Prelungire scadență", date: "26 mai 2024", amount: "+15 zile", positive: true },
];

export default function ClientDashboard() {
  const progress = 60;

  return (
    <div className="space-y-4">
      <div className="bg-ios-card rounded-ios p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-ios-label text-[16px]">Dashboard client</h3>
          <span className="text-[11px] font-semibold bg-ios-green/10 text-ios-green px-2.5 py-0.5 rounded-full">
            Activ
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-[12px] text-ios-label-2">Sumă împrumutată</p>
            <p className="text-[26px] font-bold tracking-tight text-ios-label">680 lei</p>
          </div>
          <div className="text-right">
            <p className="text-[12px] text-ios-label-2">Scadență</p>
            <p className="text-[14px] font-semibold text-gold">12 zile rămase</p>
          </div>
        </div>

        <div>
          <div className="h-2 bg-ios-fill rounded-full overflow-hidden">
            <div className="h-full bg-gold rounded-full" style={{ width: `${progress}%` }} />
          </div>
          <div className="flex justify-between mt-1.5 text-[11px] text-ios-label-3">
            <span>Împrumutat 14 mai</span>
            <span>Scadență 30 mai</span>
          </div>
        </div>

        <div className="flex gap-2">
          <button className="tap flex-1 bg-gold hover:bg-gold-dark text-white text-[14px] font-semibold rounded-[12px] py-2.5">
            Plătește
          </button>
          <button className="tap flex-1 bg-ios-fill text-ios-label text-[14px] font-semibold rounded-[12px] py-2.5">
            Prelungește
          </button>
        </div>

        <div className="pt-2 hairline-t">
          <p className="text-[11px] font-semibold text-ios-label-2 uppercase tracking-wide mb-3 mt-3">
            Istoric tranzacții
          </p>
          <div className="space-y-3">
            {transactions.map((tx) => (
              <div key={tx.label} className="flex items-center justify-between">
                <div>
                  <p className="text-[14px] text-ios-label font-medium">{tx.label}</p>
                  <p className="text-[12px] text-ios-label-3">{tx.date}</p>
                </div>
                <span
                  className={`text-[14px] font-bold ${
                    tx.positive ? "text-ios-green" : "text-ios-red"
                  }`}
                >
                  {tx.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-ink rounded-ios p-5 space-y-3">
        <h3 className="font-bold text-white text-[16px]">Ai un obiect de evaluat?</h3>
        <p className="text-[14px] text-white/55 leading-relaxed">
          Trimite-ne poze și primești o evaluare rapidă.
        </p>
        <Link
          href="/evaluare"
          className="tap w-full flex items-center justify-center gap-2 bg-gold hover:bg-gold-dark text-white text-[14px] font-semibold rounded-[12px] py-3"
        >
          Cere evaluare <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
