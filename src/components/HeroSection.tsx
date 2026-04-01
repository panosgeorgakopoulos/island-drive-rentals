import { CalendarDays } from "lucide-react";
import { motion } from "framer-motion";
import heroImage from "@/assets/hero-island.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[85vh] md:min-h-[90vh] flex items-center justify-center overflow-hidden">
      <img
        src={heroImage}
        alt="Scenic coastal road on a Greek island"
        className="absolute inset-0 w-full h-full object-cover"
        width={1920}
        height={1080}
      />
      <div
        className="absolute inset-0"
        style={{ background: "var(--hero-overlay)" }}
      />

      <div className="relative z-10 container text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-primary-foreground leading-tight mb-4"
        >
          Explore the Island
          <br />
          on Your Terms
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          className="text-primary-foreground/80 text-lg md:text-xl max-w-xl mx-auto mb-8"
        >
          Affordable, reliable car rentals — delivered to your port or hotel.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="bg-card/95 backdrop-blur-md rounded-2xl p-5 md:p-6 max-w-md mx-auto shadow-card-hover"
        >
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="flex items-center gap-2 rounded-lg bg-muted p-3">
              <CalendarDays className="h-5 w-5 text-primary shrink-0" />
              <div className="text-left">
                <span className="block text-xs text-muted-foreground">Pick-up</span>
                <span className="block text-sm font-semibold text-foreground">Select Date</span>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-muted p-3">
              <CalendarDays className="h-5 w-5 text-primary shrink-0" />
              <div className="text-left">
                <span className="block text-xs text-muted-foreground">Drop-off</span>
                <span className="block text-sm font-semibold text-foreground">Select Date</span>
              </div>
            </div>
          </div>
          <a
            href="#fleet"
            className="block w-full text-center bg-accent text-accent-foreground font-bold text-lg py-4 rounded-xl hover:brightness-110 transition-all duration-200"
          >
            View Our Fleet
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
