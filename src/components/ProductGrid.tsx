"use client";

import { ShoppingCart } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: string;
  category: string;
  tag: string;
  tagColor: "green" | "gold";
  emoji: string;
}

const products: Product[] = [
  { id: 1, name: "iPhone 13 128GB", price: "2.199 lei", category: "Telefon", tag: "Verificat", tagColor: "green", emoji: "📱" },
  { id: 2, name: "Lanț aur 14K 20g", price: "3.450 lei", category: "Aur", tag: "Premium", tagColor: "gold", emoji: "⛓️" },
  { id: 3, name: "MacBook Air M1", price: "3.250 lei", category: "Laptop", tag: "Verificat", tagColor: "green", emoji: "💻" },
  { id: 4, name: "Tissot PR 100", price: "1.150 lei", category: "Ceasuri", tag: "Verificat", tagColor: "green", emoji: "⌚" },
];

export default function ProductGrid() {
  return (
    <section className="py-10">
      <div className="flex items-end justify-between mb-6">
        <div>
          <h2 className="text-[22px] font-bold tracking-tight text-ios-label">Magazin</h2>
          <p className="mt-1 text-[15px] text-ios-label-2">Obiecte verificate, gata de livrare.</p>
        </div>
        <a href="#" className="text-[14px] font-medium text-gold shrink-0">
          Vezi toate
        </a>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="tap rounded-ios bg-ios-card overflow-hidden shadow-[0_1px_10px_rgba(0,0,0,0.04)]"
          >
            <div className="bg-ios-bg h-36 flex items-center justify-center text-5xl">
              {product.emoji}
            </div>

            <div className="p-3.5 space-y-2">
              <div className="flex items-center justify-between">
                <span
                  className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                    product.tagColor === "green"
                      ? "bg-ios-green/10 text-ios-green"
                      : "bg-gold-soft text-gold"
                  }`}
                >
                  {product.tag}
                </span>
                <span className="text-[11px] text-ios-label-3">{product.category}</span>
              </div>

              <h3 className="font-semibold text-ios-label text-[14px] leading-snug">
                {product.name}
              </h3>
              <p className="text-[17px] font-bold text-ios-label">{product.price}</p>

              <button className="tap w-full flex items-center justify-center gap-1.5 bg-ios-fill text-ios-label text-[13px] font-semibold rounded-[10px] py-2">
                <ShoppingCart size={14} /> Adaugă
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
