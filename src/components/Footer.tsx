import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import Link from "next/link";

import { BUSINESS, waLink } from "@/lib/config";

const linkuri = [
  { label: "Cere evaluare", href: "/evaluare" },
  { label: "Cum funcționează", href: "/#cum-functioneaza" },
  { label: "Magazin", href: "/#magazin" },
  { label: "De ce noi", href: "/#despre" },
];

const program = [
  ["Luni – Vineri", "09:00 – 19:00"],
  ["Sâmbătă", "10:00 – 15:00"],
  ["Duminică", "Închis"],
];

export default function Footer() {
  return (
    <footer id="contact" className="scroll-mt-20 bg-ink text-white/60 pb-safe">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-[11px] bg-gold flex items-center justify-center">
                <span className="text-white font-bold text-lg leading-none">A</span>
              </div>
              <span className="font-semibold text-white tracking-tight">Amanet NO LIMIT</span>
            </div>
            <p className="text-sm leading-relaxed">
              Amanet și magazin pentru bijuterii, telefoane, laptopuri și ceasuri. Evaluare rapidă,
              discretă și oferte corecte.
            </p>
          </div>

          {/* Linkuri */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-3">Linkuri</h3>
            <ul className="space-y-2 text-sm">
              {linkuri.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="hover:text-[#C89D3C] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-3">Contact</h3>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-center gap-2.5">
                <Phone size={15} className="text-[#C89D3C] shrink-0" />
                <a href={`tel:${BUSINESS.phone.replace(/\s/g, "")}`} className="hover:text-[#C89D3C]">
                  {BUSINESS.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MessageCircle size={15} className="text-[#C89D3C] shrink-0" />
                <a
                  href={waLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#C89D3C]"
                >
                  WhatsApp
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={15} className="text-[#C89D3C] shrink-0" />
                <a href={`mailto:${BUSINESS.email}`} className="hover:text-[#C89D3C]">
                  {BUSINESS.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin size={15} className="text-[#C89D3C] shrink-0 mt-0.5" />
                <span>
                  {BUSINESS.address}, {BUSINESS.city}
                </span>
              </li>
            </ul>
          </div>

          {/* Program */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-3 flex items-center gap-2">
              <Clock size={15} className="text-[#C89D3C]" /> Program
            </h3>
            <ul className="space-y-2 text-sm">
              {program.map(([zi, ore]) => (
                <li key={zi} className="flex justify-between gap-4">
                  <span>{zi}</span>
                  <span className="text-white/80">{ore}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between text-xs">
          <p>© {new Date().getFullYear()} Amanet NO LIMIT. Toate drepturile rezervate.</p>
          <p className="text-white/40">
            Împrumutul se acordă pe baza unui contract de amanet. Datele afișate sunt demonstrative.
          </p>
        </div>
      </div>
    </footer>
  );
}
