"use client";

import { useState } from "react";
import { Loader2, Send, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { addInquiries } from "@/services/action/inquiries";

export default function InquiryForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    propertyType: "",
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

    const fullName = formData.fullName.trim();
    const email = formData.email.trim();
    const phone = formData.phone.trim();

    if (!fullName || !email) {
      toast.error("Please fill in your name and email.");
      return;
    }

    setIsSubmitting(true);

    const payload = {
      requestType: "GENERAL_INQUIRY",
      name: fullName,
      email,
      phone: phone || null,
      propertyType: formData.propertyType || null,
      subject: formData.subject.trim() || null,
      message: formData.message.trim(),
      createdAt: new Date().toISOString(),
    };

    try {
      const body = await addInquiries(payload);
      if (body?.success === false) {
        throw new Error(body.message || "Submission failed.");
      }

      toast.success("Inquiry sent successfully!");
      setIsSuccess(true);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        propertyType: "",
        subject: "",
        message: "",
      });
      setTimeout(() => setIsSuccess(false), 4000);
    } catch (err) {
      console.error("Inquiry Form Error:", err);
      toast.error(
        err.message || "Could not send your inquiry. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputCls =
    "w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand focus:bg-white transition-colors";

  const labelCls =
    "text-[10px] font-bold text-slate-500 uppercase tracking-wider";

  return (
    <div className="bg-white p-5 sm:p-8 rounded-xl sm:rounded-2xl border border-slate-200/80 shadow-sm space-y-4 sm:space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Send an Inquiry
        </h2>
        <p className="text-[11px] sm:text-sm text-slate-500 mt-1">
          Fill out the form below and our real estate team will get back to you
          shortly.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
          <div className="space-y-1">
            <label className={labelCls}>FULL NAME</label>
            <input
              type="text"
              required
              placeholder="John Doe"
              value={formData.fullName}
              onChange={handleChange("fullName")}
              autoComplete="name"
              className={inputCls}
            />
          </div>

          <div className="space-y-1">
            <label className={labelCls}>EMAIL ADDRESS</label>
            <input
              type="email"
              required
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange("email")}
              autoComplete="email"
              className={inputCls}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
          <div className="space-y-1">
            <label className={labelCls}>PHONE NUMBER</label>
            <input
              type="tel"
              placeholder="+880 1XXX-XXXXXX"
              value={formData.phone}
              onChange={handleChange("phone")}
              autoComplete="tel"
              className={inputCls}
            />
          </div>

          <div className="space-y-1">
            <label className={labelCls}>INTERESTED PROPERTY</label>
            <select
              value={formData.propertyType}
              onChange={handleChange("propertyType")}
              className={`${inputCls} text-slate-700 cursor-pointer`}
            >
              <option value="">Select a property type...</option>
              <option value="residential">Residential Apartment</option>
              <option value="commercial">Commercial Space</option>
              <option value="land">Land Development</option>
            </select>
          </div>
        </div>

        <div className="space-y-1">
          <label className={labelCls}>SUBJECT</label>
          <input
            type="text"
            placeholder="How can we help you?"
            value={formData.subject}
            onChange={handleChange("subject")}
            className={inputCls}
          />
        </div>

        <div className="space-y-1">
          <label className={labelCls}>MESSAGE</label>
          <textarea
            rows={4}
            placeholder="Please provide details about your inquiry..."
            value={formData.message}
            onChange={handleChange("message")}
            className={`${inputCls} resize-none`}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 text-white rounded-lg text-xs font-semibold transition-all shadow-md active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed ${
            isSuccess
              ? "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-900/20"
              : "bg-brand hover:bg-brand-dark shadow-brand/20"
          }`}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Sending...</span>
            </>
          ) : isSuccess ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Inquiry Sent</span>
            </>
          ) : (
            <>
              <span>Send Inquiry</span>
              <Send className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
