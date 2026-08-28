import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Amanet NO LIMIT – Evaluare rapidă și oferte corecte",
  description:
    "Evaluare rapidă, discretă și oferte corecte pentru bijuterii, telefoane, laptopuri și ceasuri.",
};

export const viewport: Viewport = {
  themeColor: "#f2f2f7",
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ro" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-ios-bg text-ios-label font-sans">
        {children}
      </body>
    </html>
  );
}
