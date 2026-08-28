"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export default function InquiryForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    propertyType: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Inquiry Sent Successfully!");
  };

  return (
    <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          Send an Inquiry
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Fill out the form below and our real estate team will get back to you
          shortly.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              FULL NAME
            </label>
            <input
              type="text"
              required
              placeholder="John Doe"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-purple-600 focus:bg-white transition-colors"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              EMAIL ADDRESS
            </label>
            <input
              type="email"
              required
              placeholder="john@example.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-purple-600 focus:bg-white transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              PHONE NUMBER
            </label>
            <input
              type="tel"
              placeholder="+880 1XXX-XXXXXX"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-purple-600 focus:bg-white transition-colors"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              INTERESTED PROPERTY
            </label>
            <select
              value={formData.propertyType}
              onChange={(e) =>
                setFormData({ ...formData, propertyType: e.target.value })
              }
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 focus:outline-none focus:border-purple-600 focus:bg-white transition-colors"
            >
              <option value="">Select a property type...</option>
              <option value="residential">Residential Apartment</option>
              <option value="commercial">Commercial Space</option>
              <option value="land">Land Development</option>
            </select>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            SUBJECT
          </label>
          <input
            type="text"
            placeholder="How can we help you?"
            value={formData.subject}
            onChange={(e) =>
              setFormData({ ...formData, subject: e.target.value })
            }
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-purple-600 focus:bg-white transition-colors"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            MESSAGE
          </label>
          <textarea
            rows={4}
            placeholder="Please provide details about your inquiry..."
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-purple-600 focus:bg-white transition-colors resize-none"
          />
        </div>

        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#3b1a83] hover:bg-purple-900 text-white rounded-lg text-xs font-semibold transition-all shadow-md shadow-purple-900/20"
        >
          <span>Send Inquiry</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
}
