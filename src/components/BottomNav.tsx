"use client";

import { CalendarDays, Home, ShoppingBag, Sparkles, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Acasă", Icon: Home, href: "/" },
  { label: "Evaluare", Icon: Sparkles, href: "/evaluare" },
  { label: "Magazin", Icon: ShoppingBag, href: "/#magazin" },
  { label: "Scadențe", Icon: CalendarDays, href: "/#scadente" },
  { label: "Cont", Icon: User, href: "/#contact" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 ios-blur hairline-t pb-safe md:hidden">
      <div className="flex items-stretch justify-around h-[49px] px-1">
        {navItems.map(({ label, Icon, href }) => {
          const active = href === "/" ? pathname === "/" : pathname === href;
          return (
            <Link
              key={label}
              href={href}
              className={`tap flex flex-col items-center justify-center gap-1 flex-1 ${
                active ? "text-gold" : "text-ios-label-3"
              }`}
              aria-label={label}
              aria-current={active ? "page" : undefined}
            >
              <Icon size={23} strokeWidth={active ? 2.4 : 2} />
              <span className="text-[10px] font-medium leading-none tracking-tight">
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
