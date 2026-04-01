import { MapPin, Phone, Mail } from "lucide-react";

const Footer = () => (
  <footer className="bg-foreground text-primary-foreground">
    <div className="container px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">Island Wheels</h3>
          <div className="space-y-3 text-primary-foreground/70 text-sm">
            <p className="flex items-start gap-2">
              <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-accent" />
              42 Harbour Road, Naxos Town, 843 00, Greece
            </p>
            <p className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0 text-accent" />
              +30 690 000 0000
            </p>
            <p className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0 text-accent" />
              info@islandwheels.gr
            </p>
          </div>
        </div>
        <div className="rounded-xl overflow-hidden h-48 md:h-auto">
          <iframe
            title="Location map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d51567.71396924158!2d25.355!3d37.105!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14a0d89e5e5c5555%3A0x5555555555555555!2sNaxos!5e0!3m2!1sen!2sgr!4v1"
            width="100%"
            height="100%"
            style={{ border: 0, minHeight: 200 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
      <div className="border-t border-primary-foreground/10 mt-8 pt-6 text-center text-primary-foreground/40 text-xs">
        © {new Date().getFullYear()} Island Wheels. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
