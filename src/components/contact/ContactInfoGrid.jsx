import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function ContactInfoGrid() {
  const contactDetails = [
    {
      icon: <MapPin className="w-4 h-4 text-brand" />,
      title: "Office Address",
      lines: ["Kibria Mansion, Level-6", "Jalesswitola, Bogura, Bangladesh"],
    },
    {
      icon: <Phone className="w-4 h-4 text-brand" />,
      title: "Phone",
      lines: ["+880 1700-000000"],
    },
    {
      icon: <Mail className="w-4 h-4 text-brand" />,
      title: "Email",
      lines: ["info@probity.com"],
    },
    {
      icon: <Clock className="w-4 h-4 text-brand" />,
      title: "Office Hours",
      lines: ["Sun-Thu: 9:00 AM - 6:00 PM", "Friday: Closed"],
    },
  ];

  return (
    <div className="space-y-3 sm:space-y-4">
      {contactDetails.map((detail, idx) => (
        <div
          key={idx}
          className="p-4 sm:p-5 bg-white rounded-xl sm:rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow flex items-start gap-3 sm:gap-4"
        >
          <div className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-brand/10 shrink-0 mt-0.5">
            {detail.icon}
          </div>
          <div className="space-y-0.5">
            <h3 className="text-[16px] sm:text-lg font-bold text-slate-900 tracking-wide">
              {detail.title}
            </h3>
            {detail.lines.map((line, lIdx) => (
              <p key={lIdx} className="text-[16px] sm:text-xs text-slate-500">
                {line}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
