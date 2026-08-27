import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import AdminPanel from "@/components/AdminPanel";
import ClientDashboard from "@/components/ClientDashboard";
import BottomNav from "@/components/BottomNav";
import MobileShortcuts from "@/components/MobileShortcuts";

export default function Home() {
  return (
    <>
      <Header />

      <main className="flex-1 pb-20 md:pb-0">
        <Hero />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
          {/* Mobile quick shortcuts */}
          <MobileShortcuts />

          {/* Magazin */}
          <ProductGrid />

          {/* Admin + Sidebar */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2">
              <AdminPanel />
            </div>
            <div>
              <ClientDashboard />
            </div>
          </div>
        </div>
      </main>

      <BottomNav />
    </>
  );
}
