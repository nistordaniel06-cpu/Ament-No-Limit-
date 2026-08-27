"use client";

import { Star, ShoppingBag, CalendarDays, LayoutDashboard } from "lucide-react";

const shortcuts = [
  { label: "Evaluare", Icon: Star },
  { label: "Magazin", Icon: ShoppingBag },
  { label: "Scadențe", Icon: CalendarDays },
  { label: "Admin", Icon: LayoutDashboard },
];

export default function MobileShortcuts() {
  return (
    <div className="grid grid-cols-4 gap-3 md:hidden">
      {shortcuts.map(({ label, Icon }) => (
        <button
          key={label}
          className="flex flex-col items-center gap-2 bg-white border border-gray-100 shadow-sm rounded-2xl py-4 hover:border-[#C89D3C] hover:text-[#C89D3C] text-[#6B7280] transition-colors"
        >
          <Icon size={22} />
          <span className="text-xs font-medium">{label}</span>
        </button>
      ))}
    </div>
  );
}
