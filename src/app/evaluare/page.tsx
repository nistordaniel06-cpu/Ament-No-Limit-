import type { Metadata } from "next";

import BottomNav from "@/components/BottomNav";
import EvaluareForm from "@/components/EvaluareForm";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Cere evaluare – Amanet NO LIMIT",
  description:
    "Trimite detaliile și pozele obiectului tău și primești o evaluare rapidă, discretă și fără obligații.",
};

export default function EvaluarePage() {
  return (
    <>
      <Header />
      <main className="flex-1 pb-24 md:pb-12">
        <EvaluareForm />
      </main>
      <BottomNav />
    </>
  );
}
