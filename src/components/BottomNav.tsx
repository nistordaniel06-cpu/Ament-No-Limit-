"use client";

import { Home, Star, ShoppingBag, CalendarDays, User } from "lucide-react";
import { useState } from "react";

const navItems = [
  { label: "Acasă", Icon: Home },
  { label: "Evaluare", Icon: Star },
  { label: "Magazin", Icon: ShoppingBag },
  { label: "Scadențe", Icon: CalendarDays },
  { label: "Cont", Icon: User },
];

export default function BottomNav() {
  const [active, setActive] = useState(0);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 shadow-lg md:hidden">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map(({ label, Icon }, i) => (
          <button
            key={label}
            onClick={() => setActive(i)}
            className={`flex flex-col items-center gap-0.5 px-3 py-1 transition-colors ${
              active === i ? "text-[#C89D3C]" : "text-[#9CA3AF] hover:text-[#6B7280]"
            }`}
            aria-label={label}
          >
            <Icon size={22} />
            <span className="text-[10px] font-medium">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
