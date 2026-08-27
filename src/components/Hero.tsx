"use client";

import { ArrowRight, MessageCircle } from "lucide-react";

export default function Hero() {
  return (
    <section className="bg-[#0D0F12] relative overflow-hidden">
      {/* Gold ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#C89D3C] opacity-10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#C89D3C] opacity-5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-white">Valoare corectă.</span>
                <br />
                <span className="text-[#C89D3C]">Bani la timp.</span>
              </h1>
              <p className="mt-4 text-[#9CA3AF] text-lg leading-relaxed">
                Evaluare rapidă, discretă și oferte corecte.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button className="flex items-center gap-2 bg-[#C89D3C] hover:bg-[#B3892F] text-white font-semibold px-6 py-3 rounded-full transition-colors">
                Cere evaluare <ArrowRight size={18} />
              </button>
              <button className="flex items-center gap-2 border border-white/30 hover:border-[#C89D3C] text-white font-semibold px-6 py-3 rounded-full transition-colors">
                <MessageCircle size={18} /> WhatsApp
              </button>
            </div>
          </div>

          {/* Right — decorative luxury mockup */}
          <div className="flex items-center justify-center">
            <div className="relative w-72 h-72 sm:w-96 sm:h-96">
              {/* Champagne plate */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#F5E6C8] to-[#D4B483] rounded-3xl shadow-2xl" />
              {/* Watch circle */}
              <div className="absolute top-8 left-8 w-32 h-32 sm:w-40 sm:h-40 bg-[#1C1C1E] rounded-full shadow-xl flex items-center justify-center border-4 border-[#C89D3C]">
                <div className="text-center">
                  <div className="text-[#C89D3C] text-xs font-semibold tracking-widest">TISSOT</div>
                  <div className="text-white text-[10px] mt-1">PR 100</div>
                </div>
              </div>
              {/* Gold chain */}
              <div className="absolute bottom-12 right-8 w-20 h-20 sm:w-28 sm:h-28">
                <svg viewBox="0 0 100 100" className="w-full h-full opacity-80">
                  <path
                    d="M10 50 Q30 20 50 50 Q70 80 90 50"
                    stroke="#C89D3C"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <path
                    d="M10 60 Q30 30 50 60 Q70 90 90 60"
                    stroke="#B3892F"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              {/* Price badge */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-[#C89D3C] text-white text-sm font-bold px-4 py-1.5 rounded-full shadow-lg whitespace-nowrap">
                Evaluare gratuită
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
