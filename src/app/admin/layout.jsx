import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";

export default function DashboardLayout({ children }) {
  return (
    <section className="min-h-screen bg-zinc-50">
      <aside></aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen min-w-0">
        <Navbar />
        <main className="flex-1 overflow-y-auto ">{children}</main>
        <Footer />
      </div>
    </section>
  );
}
