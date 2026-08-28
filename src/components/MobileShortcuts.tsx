import { CalendarDays, LayoutDashboard, ShoppingBag, Sparkles } from "lucide-react";
import Link from "next/link";

const shortcuts = [
  { label: "Evaluare", Icon: Sparkles, href: "/evaluare" },
  { label: "Magazin", Icon: ShoppingBag, href: "/#magazin" },
  { label: "Scadențe", Icon: CalendarDays, href: "/#scadente" },
  { label: "Admin", Icon: LayoutDashboard, href: "/#admin" },
];

export default function MobileShortcuts() {
  return (
    <div className="grid grid-cols-4 gap-2.5 md:hidden pt-2">
      {shortcuts.map(({ label, Icon, href }) => (
        <Link
          key={label}
          href={href}
          className="tap flex flex-col items-center gap-2 rounded-ios bg-ios-card py-4 text-ios-label-2"
        >
          <Icon size={22} className="text-gold" />
          <span className="text-[12px] font-medium">{label}</span>
        </Link>
      ))}
    </div>
  );
}
