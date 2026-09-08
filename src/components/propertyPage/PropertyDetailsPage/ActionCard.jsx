import { useState } from "react";
import Image from "next/image";
import { User, Send, Video, UserCheck, Download, Loader2 } from "lucide-react";

const ActionCard = ({
  activeTab,
  setActiveTab,
  tourType,
  setTourType,
  formData,
  handleFieldChange,
  handleFormSubmit,
  isSubmitting,
  submitted,
}) => {
  return (
    <div className="rounded-3xl p-6 sm:p-7 border border-zinc-200/80 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl shadow-xl space-y-6">
      {/* Mode Switching Navigation */}
      <div className="grid grid-cols-2 gap-2 p-1 bg-[#431780]/5 dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700">
        <button
          type="button"
          onClick={() => setActiveTab("TOUR")}
          className={`py-2.5 text-xs font-semibold rounded-xl text-center flex items-center justify-center transition-all ${
            activeTab === "TOUR"
              ? "bg-[#431780] text-white shadow-md"
              : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
          }`}
        >
          Schedule a tour
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("BROCHURE")}
          className={`relative overflow-hidden py-2.5 px-2 text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer border ${
            activeTab === "BROCHURE"
              ? "bg-[#431780] text-white shadow-md border-transparent"
              : "bg-gradient-to-r from-[#431780]/15 via-violet-500/10 to-[#431780]/15 text-[#431780] dark:text-violet-300 border-[#431780]/40 animate-brochure-glow"
          }`}
        >
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 dark:via-white/20 to-transparent skew-x-12 animate-shimmer" />
          </div>
          <Download className="w-3.5 h-3.5 animate-bounce shrink-0" />
          <span className="truncate">Download Brochure</span>
        </button>
      </div>

      {/* Sales Representative Card */}
      <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#431780]/5 border border-zinc-200/60 dark:border-zinc-700/60">
        <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-[#431780] shrink-0 bg-zinc-200">
          <Image
            src="https://ui-avatars.com/api/?name=Probity+Estates&background=431780&color=ffffff&size=128"
            alt="Property advisor"
            fill
            unoptimized
            sizes="44px"
            className="object-cover"
          />
        </div>
        <div>
          <div className="flex items-center gap-1">
            <h4 className="display-font text-sm font-semibold text-zinc-900 dark:text-white">
              Probity Sales Team
            </h4>
            <UserCheck className="w-3.5 h-3.5 text-emerald-500" />
          </div>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
            Senior Real Estate Advisor
          </p>
        </div>
      </div>

      {/* Dynamic Form Flow */}
      <form onSubmit={handleFormSubmit} className="space-y-3.5">
        {activeTab === "BROCHURE" ? (
          <>
            <div>
              <label className="block text-[10px] font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-1.5">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                placeholder="Email address"
                required
                value={formData.email}
                onChange={handleFieldChange("email")}
                className="w-full px-4 py-3 bg-[#431780]/5 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl text-xs text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#431780] transition-all"
              />
            </div>
            <div>
              <label className="block text-[10px] font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-1.5">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                placeholder="Phone number"
                required
                value={formData.phone}
                onChange={handleFieldChange("phone")}
                className="w-full px-4 py-3 bg-[#431780]/5 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl text-xs text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#431780] transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#431780] hover:bg-[#341166] text-white text-xs font-semibold py-3.5 px-6 rounded-2xl transition-all shadow-lg active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed mt-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  Download Brochure Now
                </>
              )}
            </button>
          </>
        ) : (
          <>
            <div>
              <label className="block text-[10px] font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-2">
                Tour type
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setTourType("In Person")}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1.5 transition-all ${
                    tourType === "In Person"
                      ? "border-[#431780] bg-[#431780]/10 text-[#431780] dark:text-violet-300"
                      : "border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400"
                  }`}
                >
                  <User className="w-3.5 h-3.5" />
                  In person
                </button>
                <button
                  type="button"
                  onClick={() => setTourType("Video Chat")}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1.5 transition-all ${
                    tourType === "Video Chat"
                      ? "border-[#431780] bg-[#431780]/10 text-[#431780] dark:text-violet-300"
                      : "border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400"
                  }`}
                >
                  <Video className="w-3.5 h-3.5" />
                  Video chat
                </button>
              </div>
            </div>

            <input
              type="text"
              placeholder="Your name"
              required
              value={formData.name}
              onChange={handleFieldChange("name")}
              className="w-full px-4 py-3 bg-[#431780]/5 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl text-xs text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#431780] transition-all"
            />
            <input
              type="tel"
              placeholder="Phone number"
              required
              value={formData.phone}
              onChange={handleFieldChange("phone")}
              className="w-full px-4 py-3 bg-[#431780]/5 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl text-xs text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#431780] transition-all"
            />
            <input
              type="email"
              placeholder="Email address"
              required
              value={formData.email}
              onChange={handleFieldChange("email")}
              className="w-full px-4 py-3 bg-[#431780]/5 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl text-xs text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#431780] transition-all"
            />
            <textarea
              rows={3}
              placeholder="Preferred date or message..."
              value={formData.message}
              onChange={handleFieldChange("message")}
              className="w-full px-4 py-3 bg-[#431780]/5 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl text-xs text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#431780] transition-all resize-none"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#431780] hover:bg-[#341166] text-white text-xs font-semibold py-3.5 px-6 rounded-2xl transition-all shadow-lg active:scale-[0.98] flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  Submit tour request
                </>
              )}
            </button>

            {submitted && (
              <p className="text-[11px] text-emerald-600 dark:text-emerald-400 text-center font-medium">
                Logged inquiry successfully.
              </p>
            )}
          </>
        )}

        <p className="text-[10px] text-zinc-400 dark:text-zinc-500 text-center pt-1">
          By submitting this form you agree to the Terms of Service.
        </p>
      </form>
    </div>
  );
};

export default ActionCard;
