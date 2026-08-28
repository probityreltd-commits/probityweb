import { MapPin, Phone, Mail } from "lucide-react";

export default function InteractiveMap() {
  return (
    <div className="relative w-full h-[410px] bg-slate-100 rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden group">
      {/* Map Embed/Background Mock */}
      <iframe
        title="Probity Office Location"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3617.922123548981!2d89.3705!3d24.8481!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fc8872b78121f3%3A0x2db4811f58ef56b1!2sJaleswaritola%2C%20Bogra!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd"
        className="w-full h-full grayscale contrast-125 opacity-80 group-hover:grayscale-0 transition-all duration-500 border-0"
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />

      {/* Floating Info Overlay Card (Matching UI Screenshot) */}
      <div className="absolute top-6 right-6 w-72 bg-white/95 backdrop-blur-md p-5 rounded-xl border border-slate-200 shadow-xl space-y-3 z-10 hidden sm:block">
        <div>
          <h4 className="text-sm font-extrabold text-purple-900">Probity</h4>
          <p className="text-[10px] text-slate-500">Real Estate Ltd.</p>
        </div>

        <p className="text-[11px] text-slate-600 font-medium">
          We are here to help you find your dream space.
        </p>

        <div className="space-y-1.5 pt-1 text-[11px] text-slate-600">
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-purple-600 shrink-0" />
            <span>Station Road, Bogura</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-3.5 h-3.5 text-purple-600 shrink-0" />
            <span>+880 1700-000000</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-3.5 h-3.5 text-purple-600 shrink-0" />
            <span>inquiries@probity.com</span>
          </div>
        </div>

        <button className="w-full py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-lg text-xs font-semibold transition-colors shadow-sm">
          Send Message
        </button>
      </div>
    </div>
  );
}
