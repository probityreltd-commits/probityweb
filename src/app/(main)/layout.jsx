import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";

export default function MainLayout({ children }) {
  return (
    <>
      <Navbar></Navbar>
      <main className="min-h-screen">{children}</main>
      <Footer></Footer>
    </>
  );
}
