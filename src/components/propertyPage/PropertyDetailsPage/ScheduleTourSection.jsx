"use client";

import { useState } from "react";
import { Loader2, Send, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { addInquiries } from "@/services/action/inquiries";

const ScheduleTourSection = ({ property }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (field) => (e) =>
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    const name = formData.name.trim();
    const phone = formData.phone.trim();
    const email = formData.email.trim();

    if (!name || !phone || !email) {
      toast.error("Please fill in your name, phone, and email.");
      return;
    }

    setIsSubmitting(true);

    // Same request shape used by the existing tour request flow.
    const payload = {
      requestType: "SCHEDULE_TOUR",
      tourType: "In Person",
      name,
      phone,
      email,
      subject: formData.subject.trim() || null,
      message: formData.message.trim(),
      property: {
        id: property?._id || null,
        slug: property?.slug || null,
        title: property?.title || null,
        coverImage: property?.coverImage || null,
      },
      createdAt: new Date().toISOString(),
    };

    try {
      const body = await addInquiries(payload);
      if (body?.success === false) {
        throw new Error(body.message || "Submission failed.");
      }

      toast.success("Tour request sent successfully!");
      setIsSuccess(true);
      setFormData({
        name: "",
        phone: "",
        email: "",
        subject: "",
        message: "",
      });
      setTimeout(() => setIsSuccess(false), 4000);
    } catch (err) {
      console.error("Schedule Tour Error:", err);
      toast.error(
        err.message || "Could not submit your request. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Underline-only input styling (matches the reference image)
  const inputCls =
    "w-full bg-transparent border-0 border-b border-zinc-300 dark:border-zinc-700 pb-2.5 pt-1 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-[#431780] dark:focus:border-violet-400 transition-colors";

  return (
    <section aria-labelledby="schedule-tour-heading" className="pb-10">
      <div className="max-w-7xl mx-auto">
        <div className="rounded-2xl sm:rounded-3xl bg-white dark:bg-zinc-900  border border-zinc-100 dark:border-zinc-800 p-6 sm:p-10 lg:p-12">
          <h2
            id="schedule-tour-heading"
            className="display-font text-2xl sm:text-3xl lg:text-4xl font-bold text-zinc-900 dark:text-white mb-1.5"
          >
            Schedule A Tour
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mb-7 sm:mb-9">
            Fill in your details and our team will get in touch to arrange a
            visit.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-x-10 sm:gap-y-7">
              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange("name")}
                required
                autoComplete="name"
                className={inputCls}
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange("phone")}
                required
                autoComplete="tel"
                className={inputCls}
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange("email")}
                required
                autoComplete="email"
                className={inputCls}
              />
              <input
                type="text"
                placeholder="Subject (preferred date / time)"
                value={formData.subject}
                onChange={handleChange("subject")}
                className={inputCls}
              />
            </div>

            <textarea
              placeholder="Message"
              rows={4}
              value={formData.message}
              onChange={handleChange("message")}
              className={`${inputCls} resize-none`}
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className={`inline-flex items-center justify-center gap-2 text-white text-sm font-semibold px-8 py-3.5 rounded-lg shadow-lg active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed ${
                isSuccess
                  ? "bg-emerald-600 hover:bg-emerald-700"
                  : "bg-[#431780] hover:bg-[#341166]"
              }`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Sending...
                </>
              ) : isSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  Request Sent
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ScheduleTourSection;
