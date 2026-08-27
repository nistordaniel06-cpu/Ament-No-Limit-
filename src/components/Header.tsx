"use client";

import { Bell, ChevronDown, MessageCircle } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { label: "Acasă", active: true },
  { label: "Evaluare", active: false },
  { label: "Magazin", active: false },
  { label: "Despre noi", active: false },
  { label: "Contact", active: false },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-[#C89D3C] flex items-center justify-center">
              <span className="text-white font-bold text-lg leading-none">A</span>
            </div>
            <span className="font-bold text-[#111827] text-sm sm:text-base tracking-wide">
              AMANET NO LIMIT
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href="#"
                className={`text-sm font-medium transition-colors ${
                  link.active
                    ? "text-[#C89D3C] border-b-2 border-[#C89D3C] pb-0.5"
                    : "text-[#6B7280] hover:text-[#111827]"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-3">
            <button className="flex items-center gap-1.5 text-sm font-medium text-[#6B7280] border border-gray-200 rounded-full px-4 py-1.5 hover:border-[#C89D3C] hover:text-[#C89D3C] transition-colors">
              <MessageCircle size={15} />
              WhatsApp
            </button>
            <button className="flex items-center gap-1.5 text-sm font-medium text-white bg-[#C89D3C] hover:bg-[#B3892F] rounded-full px-4 py-1.5 transition-colors">
              Cere evaluare
            </button>
            <div className="relative">
              <button className="text-[#6B7280] hover:text-[#111827] transition-colors">
                <Bell size={20} />
              </button>
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
            </div>
            <button className="flex items-center gap-1 text-sm font-medium text-[#6B7280] hover:text-[#111827] transition-colors">
              Contul meu <ChevronDown size={15} />
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-[#6B7280]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="md:hidden py-3 border-t border-gray-100 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href="#"
                className={`block text-sm font-medium py-1.5 ${
                  link.active ? "text-[#C89D3C]" : "text-[#6B7280]"
                }`}
              >
                {link.label}
              </a>
            ))}
            <div className="flex gap-2 pt-2">
              <button className="flex-1 flex items-center justify-center gap-1.5 text-sm font-medium text-[#6B7280] border border-gray-200 rounded-full px-3 py-1.5">
                <MessageCircle size={14} /> WhatsApp
              </button>
              <button className="flex-1 text-sm font-medium text-white bg-[#C89D3C] rounded-full px-3 py-1.5">
                Cere evaluare
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
