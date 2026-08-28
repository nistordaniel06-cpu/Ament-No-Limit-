import AdminPanel from "@/components/AdminPanel";
import BottomNav from "@/components/BottomNav";
import ClientDashboard from "@/components/ClientDashboard";
import CtaBand from "@/components/CtaBand";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import MobileShortcuts from "@/components/MobileShortcuts";
import ProductGrid from "@/components/ProductGrid";
import Testimonials from "@/components/Testimonials";
import WhyUs from "@/components/WhyUs";

export default function Home() {
  return (
    <>
      <Header />

      <main className="flex-1 pb-24 md:pb-0">
        <Hero />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {/* Mobile quick shortcuts */}
          <MobileShortcuts />

          {/* Cum funcționează */}
          <HowItWorks />

          {/* Magazin */}
          <div id="magazin" className="scroll-mt-20">
            <ProductGrid />
          </div>

          {/* De ce noi */}
          <WhyUs />

          {/* Recenzii */}
          <Testimonials />

          {/* Contul tău (demo aplicație) */}
          <section className="py-10">
            <h2 className="text-[22px] font-bold tracking-tight text-ios-label">Contul tău</h2>
            <p className="mt-1 text-[15px] text-ios-label-2">
              Așa arată panoul după ce devii client.
            </p>
            <div className="mt-6 grid grid-cols-1 xl:grid-cols-3 gap-4">
              <div id="admin" className="xl:col-span-2 scroll-mt-20">
                <AdminPanel />
              </div>
              <div id="scadente" className="scroll-mt-20">
                <ClientDashboard />
              </div>
            </div>
          </section>

          {/* CTA final */}
          <CtaBand />
        </div>
      </main>

      <Footer />
      <BottomNav />
    </>
  );
}
