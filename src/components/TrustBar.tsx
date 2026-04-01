import { ShieldCheck, Ship, BadgeCheck } from "lucide-react";

const items = [
  { icon: BadgeCheck, label: "No Hidden Fees" },
  { icon: Ship, label: "Free Port Delivery" },
  { icon: ShieldCheck, label: "Full Insurance Included" },
];

const TrustBar = () => (
  <section className="bg-primary">
    <div className="container py-5 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-12">
      {items.map(({ icon: Icon, label }) => (
        <div key={label} className="flex items-center gap-2">
          <Icon className="h-5 w-5 text-accent" />
          <span className="text-primary-foreground font-medium text-sm">{label}</span>
        </div>
      ))}
    </div>
  </section>
);

export default TrustBar;
