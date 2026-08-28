import ContactHero from "@/components/contact/ContactHero";
import ContactInfoGrid from "@/components/contact/ContactInfoGrid";
import InteractiveMap from "@/components/contact/InteractiveMap";
import InquiryForm from "@/components/contact/InquiryForm";
import ContactFAQ from "@/components/contact/ContactFAQ";
import ContactCTA from "@/components/contact/ContactCTA";

export const metadata = {
  title: "Contact Us | Probity Real Estate",
  description:
    "Connect with our team of specialists to discuss your architectural needs or schedule a viewing.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-50 font-sans text-slate-900 antialiased selection:bg-purple-600 selection:text-white">
      {/* Hero Header Section */}
      <ContactHero />

      {/* Main Info Cards & Map Grid */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 -mt-16 sm:-mt-24 relative z-10 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4">
            <ContactInfoGrid />
          </div>
          <div className="lg:col-span-8">
            <InteractiveMap />
          </div>
        </div>
      </section>

      {/* Form and FAQ Section */}
      <section className="py-20 bg-slate-100/70 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-6">
              <InquiryForm />
            </div>
            <div className="lg:col-span-6">
              <ContactFAQ />
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <ContactCTA />
    </main>
  );
}
