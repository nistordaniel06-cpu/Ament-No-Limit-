import { Camera, HandCoins, ScrollText } from "lucide-react";
import Link from "next/link";

const pasi = [
  {
    Icon: Camera,
    titlu: "Trimiți pozele",
    text: "Completezi un formular scurt cu detaliile obiectului și adaugi câteva poze clare.",
  },
  {
    Icon: ScrollText,
    titlu: "Primești oferta",
    text: "Te contactăm rapid cu o estimare corectă și condițiile clare, fără obligații.",
  },
  {
    Icon: HandCoins,
    titlu: "Iei banii pe loc",
    text: "Vii la sediu cu obiectul, semnezi contractul și pleci cu banii în câteva minute.",
  },
];

export default function HowItWorks() {
  return (
    <section id="cum-functioneaza" className="scroll-mt-20 py-10">
      <h2 className="text-[22px] font-bold tracking-tight text-ios-label">Cum funcționează</h2>
      <p className="mt-1 text-[15px] text-ios-label-2">Trei pași simpli, de la poză la bani.</p>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
        {pasi.map((p, i) => (
          <div key={p.titlu} className="relative rounded-ios bg-ios-card p-5">
            <span className="absolute top-4 right-4 text-[32px] font-bold text-ios-separator/70 select-none leading-none">
              {i + 1}
            </span>
            <div className="w-11 h-11 rounded-xl bg-gold-soft flex items-center justify-center mb-3">
              <p.Icon size={22} className="text-gold" />
            </div>
            <h3 className="font-semibold text-[16px] text-ios-label">{p.titlu}</h3>
            <p className="mt-1 text-[14px] text-ios-label-2 leading-relaxed">{p.text}</p>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <Link
          href="/evaluare"
          className="tap inline-flex items-center justify-center bg-gold hover:bg-gold-dark text-white font-semibold px-6 py-3 rounded-full"
        >
          Începe evaluarea
        </Link>
      </div>
    </section>
  );
}
