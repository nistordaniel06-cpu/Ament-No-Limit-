import { Star } from "lucide-react";

const recenzii = [
  {
    nume: "Andrei M.",
    oras: "București",
    text: "Am amanetat un laptop într-o după-amiază. Evaluarea pe WhatsApp, banii în 10 minute la sediu. Corect și rapid.",
  },
  {
    nume: "Elena T.",
    oras: "Cluj-Napoca",
    text: "Mi-a plăcut că mi-au spus din start dobânda și scadența. Am prelungit o dată online, fără drumuri.",
  },
  {
    nume: "Cristian P.",
    oras: "Timișoara",
    text: "Am vândut un lanț de aur. Preț mai bun decât în alte două locuri unde am întrebat. Recomand.",
  },
];

function Stele({ size }: { size: number }) {
  return (
    <div className="flex text-gold">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={size} fill="currentColor" strokeWidth={0} />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="py-10">
      <div className="flex items-end justify-between flex-wrap gap-2">
        <div>
          <h2 className="text-[22px] font-bold tracking-tight text-ios-label">Ce spun clienții</h2>
          <p className="mt-1 text-[15px] text-ios-label-2">
            Peste 1.200 de evaluări făcute anul acesta.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Stele size={15} />
          <span className="text-[14px] font-semibold text-ios-label">4.9 / 5</span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
        {recenzii.map((r) => (
          <figure key={r.nume} className="rounded-ios bg-ios-card p-5 flex flex-col">
            <div className="mb-3">
              <Stele size={13} />
            </div>
            <blockquote className="text-[14px] text-ios-label leading-relaxed flex-1">
              “{r.text}”
            </blockquote>
            <figcaption className="mt-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gold-soft text-gold font-bold text-[14px] flex items-center justify-center">
                {r.nume.charAt(0)}
              </div>
              <div>
                <p className="text-[14px] font-semibold text-ios-label">{r.nume}</p>
                <p className="text-[12px] text-ios-label-3">{r.oras}</p>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
