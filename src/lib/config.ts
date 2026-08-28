// Configurare centrală — completează cu datele reale ale afacerii.

export const BUSINESS = {
  name: "Amanet NO LIMIT",
  // Număr WhatsApp în format internațional, fără "+", fără spații. Ex: 40712345678
  whatsappNumber: "40712345678",
  phone: "+40 712 345 678",
  email: "contact@amanetnolimit.ro",
  address: "Str. Exemplu nr. 10",
  city: "București",
} as const;

/** Link wa.me cu mesaj pre-completat. */
export function waLink(message?: string): string {
  const base = `https://wa.me/${BUSINESS.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
