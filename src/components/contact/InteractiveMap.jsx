import { MapPin, Phone, Mail } from "lucide-react";

export default function InteractiveMap() {
  return (
    <div className="space-y-0 sm:space-y-0">
      <div className="relative w-full h-[280px] sm:h-[360px] lg:h-[410px] bg-slate-100 rounded-t-xl sm:rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden group">
        {/* Map Embed */}
        <iframe
          title="Probity Office Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3617.922123548981!2d89.3705!3d24.8481!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fc8872b78121f3%3A0x2db4811f58ef56b1!2sJaleswaritola%2C%20Bogra!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd"
          className="w-full h-full grayscale contrast-125 opacity-80 group-hover:grayscale-0 transition-all duration-500 border-0"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />

        {/* Floating Info Overlay Card — sm and up only */}
        <div className="absolute top-6 right-6 w-72 bg-white/95 backdrop-blur-md p-5 rounded-xl border border-slate-200 shadow-xl space-y-3 z-10 hidden sm:block">
          <div>
            <h4 className="text-sm font-extrabold text-brand">Probity</h4>
            <p className="text-[10px] text-slate-500">Real Estate Ltd.</p>
          </div>

          <p className="text-[11px] text-slate-600 font-medium">
            We are here to help you find your dream space.
          </p>

          <div className="space-y-1.5 pt-1 text-[11px] text-slate-600">
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-brand shrink-0" />
              <span>Station Road, Bogura</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-brand shrink-0" />
              <span>+880 1700-000000</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-brand shrink-0" />
              <span>inquiries@probity.com</span>
            </div>
          </div>

          <button className="w-full py-2 bg-brand hover:bg-brand-dark text-white rounded-lg text-xs font-semibold transition-colors shadow-sm">
            Send Message
          </button>
        </div>
      </div>

      {/* Mobile Info Card — below map, sm and up hidden */}
      <div className="sm:hidden bg-white p-4 rounded-b-xl border border-t-0 border-slate-200/80 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-extrabold text-brand">Probity</h4>
            <p className="text-[10px] text-slate-500">Real Estate Ltd.</p>
          </div>
          <button className="px-4 py-2 bg-brand hover:bg-brand-dark text-white rounded-lg text-[11px] font-semibold transition-colors shadow-sm shrink-0">
            Send Message
          </button>
        </div>

        <div className="grid grid-cols-1 gap-1.5 text-[11px] text-slate-600 pt-1 border-t border-slate-100">
          <div className="flex items-center gap-2 pt-1.5">
            <MapPin className="w-3.5 h-3.5 text-brand shrink-0" />
            <span>Station Road, Bogura</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-3.5 h-3.5 text-brand shrink-0" />
            <span>+880 1700-000000</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-3.5 h-3.5 text-brand shrink-0" />
            <span>inquiries@probity.com</span>
          </div>
        </div>
      </div>
    </div>
  );
}
