import { BadgePercent, Coins, Eye, FileCheck2, Repeat2, ShieldCheck } from "lucide-react";

const motive = [
  {
    Icon: Coins,
    titlu: "Evaluare gratuită",
    text: "Îți spunem cât face obiectul înainte să vii la sediu. Fără costuri, fără obligații.",
  },
  {
    Icon: BadgePercent,
    titlu: "Dobândă corectă",
    text: "Condiții transparente, comunicate din start. Fără taxe ascunse la final.",
  },
  {
    Icon: Eye,
    titlu: "Discreție totală",
    text: "Tranzacții confidențiale. Datele tale sunt folosite doar pentru contract.",
  },
  {
    Icon: FileCheck2,
    titlu: "Acte simple",
    text: "Ai nevoie doar de buletin. Contractul se face pe loc, în câteva minute.",
  },
  {
    Icon: Repeat2,
    titlu: "Prelungire ușoară",
    text: "Poți prelungi scadența online sau la sediu, fără drumuri inutile.",
  },
  {
    Icon: ShieldCheck,
    titlu: "Obiecte în siguranță",
    text: "Bunurile amanetate sunt păstrate securizat și asigurate până le recuperezi.",
  },
];

export default function WhyUs() {
  return (
    <section id="despre" className="scroll-mt-20 py-10">
      <h2 className="text-[22px] font-bold tracking-tight text-ios-label">De ce Amanet NO LIMIT</h2>
      <p className="mt-1 text-[15px] text-ios-label-2 max-w-lg">
        Lucrăm simplu și corect: afli valoarea reală, primești banii repede și îți recuperezi
        obiectul fără bătăi de cap.
      </p>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {motive.map((m) => (
          <div key={m.titlu} className="rounded-ios bg-ios-card p-5">
            <div className="w-10 h-10 rounded-[10px] bg-ink flex items-center justify-center mb-3">
              <m.Icon size={19} className="text-gold" />
            </div>
            <h3 className="font-semibold text-[15px] text-ios-label">{m.titlu}</h3>
            <p className="mt-1 text-[14px] text-ios-label-2 leading-relaxed">{m.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
