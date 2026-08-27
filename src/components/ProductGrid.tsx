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
  {
    id: 1,
    name: "iPhone 13 128GB",
    price: "2.199 lei",
    category: "Telefon",
    tag: "Verificat",
    tagColor: "green",
    emoji: "📱",
  },
  {
    id: 2,
    name: "Lanț aur 14K 20g",
    price: "3.450 lei",
    category: "Aur",
    tag: "Premium",
    tagColor: "gold",
    emoji: "⛓️",
  },
  {
    id: 3,
    name: "MacBook Air M1",
    price: "3.250 lei",
    category: "Laptop",
    tag: "Verificat",
    tagColor: "green",
    emoji: "💻",
  },
  {
    id: 4,
    name: "Tissot PR 100",
    price: "1.150 lei",
    category: "Ceasuri",
    tag: "Verificat",
    tagColor: "green",
    emoji: "⌚",
  },
];

export default function ProductGrid() {
  return (
    <section className="py-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-[#111827]">Magazin</h2>
        <a href="#" className="text-sm font-medium text-[#C89D3C] hover:text-[#B3892F] transition-colors">
          Vezi toate →
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white border border-gray-100 shadow-sm rounded-2xl overflow-hidden hover:shadow-md transition-shadow"
          >
            {/* Product image area */}
            <div className="bg-gray-50 h-44 flex items-center justify-center text-5xl">
              {product.emoji}
            </div>

            <div className="p-4 space-y-2">
              {/* Tag + Category */}
              <div className="flex items-center justify-between">
                <span
                  className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                    product.tagColor === "green"
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-amber-50 text-[#C89D3C]"
                  }`}
                >
                  {product.tag}
                </span>
                <span className="text-xs text-[#6B7280]">{product.category}</span>
              </div>

              <h3 className="font-semibold text-[#111827] text-sm leading-snug">{product.name}</h3>
              <p className="text-lg font-bold text-[#111827]">{product.price}</p>

              <button className="w-full flex items-center justify-center gap-1.5 border border-gray-200 hover:border-[#C89D3C] hover:text-[#C89D3C] text-[#6B7280] text-sm font-medium rounded-xl py-2 transition-colors">
                <ShoppingCart size={15} /> Adaugă
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
