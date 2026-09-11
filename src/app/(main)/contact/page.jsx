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
    <main className="min-h-screen bg-background text-zinc-800 dark:text-zinc-100">
      {/* Hero Header Section */}
      <ContactHero />

      {/* Main Info Cards & Map Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-16 lg:-mt-24 relative z-10 pb-12 sm:pb-16 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-start">
          <div className="lg:col-span-4">
            <ContactInfoGrid />
          </div>
          <div className="lg:col-span-8">
            <InteractiveMap />
          </div>
        </div>
      </section>

      {/* Form and FAQ Section */}
      <section className="py-12 sm:py-16 lg:py-20 border-t border-zinc-200/80 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
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
