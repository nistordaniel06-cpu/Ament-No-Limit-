import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Amanet NO LIMIT – Evaluare rapidă și oferte corecte",
  description: "Evaluare rapidă, discretă și oferte corecte pentru bijuterii, telefoane, laptopuri și ceasuri.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ro" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#F8F9FA] font-sans">{children}</body>
    </html>
  );
}
