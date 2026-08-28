import { ArrowRight, MessageCircle } from "lucide-react";
import Link from "next/link";

import { waLink } from "@/lib/config";

export default function CtaBand() {
  return (
    <section className="py-10">
      <div className="relative overflow-hidden rounded-ios-lg bg-ink px-6 py-11 sm:px-12 sm:py-12">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-10 right-8 w-72 h-72 bg-gold opacity-10 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="max-w-xl">
            <h2 className="text-[22px] sm:text-[26px] font-bold tracking-tight text-white">
              Ai un obiect de evaluat?
            </h2>
            <p className="mt-1.5 text-[15px] text-white/60">
              Trimite pozele acum și primești o estimare în cel mai scurt timp.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link
              href="/evaluare"
              className="tap flex items-center gap-2 bg-gold hover:bg-gold-dark text-white font-semibold px-6 py-3 rounded-full"
            >
              Cere evaluare <ArrowRight size={18} />
            </Link>
            <a
              href={waLink("Bună ziua, aș dori o evaluare.")}
              target="_blank"
              rel="noopener noreferrer"
              className="tap flex items-center gap-2 border border-white/25 hover:border-gold text-white font-semibold px-6 py-3 rounded-full"
            >
              <MessageCircle size={18} /> WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
