"use client";

import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { waLink } from "@/lib/config";

const navLinks = [
  { label: "Acasă", href: "/" },
  { label: "Cum funcționează", href: "/#cum-functioneaza" },
  { label: "Magazin", href: "/#magazin" },
  { label: "De ce noi", href: "/#despre" },
  { label: "Contact", href: "/#contact" },
];

export default function Header() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href;

  return (
    <header className="sticky top-0 z-50 ios-blur hairline-b pt-safe">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[52px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 tap">
            <div className="w-8 h-8 rounded-[9px] bg-gold flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-base leading-none">A</span>
            </div>
            <span className="font-semibold text-ios-label text-[15px] tracking-tight">
              Amanet NO LIMIT
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`text-[14px] font-medium transition-colors ${
                  isActive(link.href)
                    ? "text-gold"
                    : "text-ios-label-2 hover:text-ios-label"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <a
              href={waLink("Bună ziua, aș dori o evaluare.")}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="tap flex items-center justify-center w-9 h-9 rounded-full text-ios-label-2 hover:text-gold hover:bg-ios-fill"
            >
              <MessageCircle size={18} />
            </a>
            <Link
              href="/evaluare"
              className="tap rounded-full bg-gold hover:bg-gold-dark text-white text-[14px] font-semibold px-4 py-1.5"
            >
              Evaluare
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
