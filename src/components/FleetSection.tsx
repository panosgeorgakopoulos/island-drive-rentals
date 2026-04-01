import { motion } from "framer-motion";
import { MessageCircle, Users, Fuel, Settings2 } from "lucide-react";
import carEconomy from "@/assets/car-economy.png";
import carJeep from "@/assets/car-jeep.png";
import carSuv from "@/assets/car-suv.png";

const cars = [
  {
    category: "Economy",
    model: "Fiat 500",
    price: 45,
    image: carEconomy,
    seats: 4,
    fuel: "Petrol",
    transmission: "Manual",
    tag: "Best Seller",
  },
  {
    category: "4x4 / Jeep",
    model: "Suzuki Jimny",
    price: 75,
    image: carJeep,
    seats: 4,
    fuel: "Petrol",
    transmission: "Manual",
    tag: "Adventure",
  },
  {
    category: "Family SUV",
    model: "Nissan Qashqai",
    price: 90,
    image: carSuv,
    seats: 5,
    fuel: "Diesel",
    transmission: "Automatic",
    tag: "Most Spacious",
  },
];

const FleetSection = () => (
  <section id="fleet" className="py-16 md:py-24 bg-muted/50">
    <div className="container px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-2">
        Our Fleet
      </h2>
      <p className="text-center text-muted-foreground mb-10 max-w-md mx-auto">
        Choose the perfect ride for your island adventure.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {cars.map((car, i) => (
          <motion.div
            key={car.model}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="bg-card rounded-2xl shadow-card hover:shadow-card-hover transition-shadow duration-300 overflow-hidden flex flex-col"
          >
            <div className="relative bg-muted/60 p-4 flex items-center justify-center">
              <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-semibold px-2.5 py-1 rounded-full">
                {car.tag}
              </span>
              <img
                src={car.image}
                alt={`${car.model} rental car`}
                loading="lazy"
                className="h-36 md:h-40 object-contain"
                width={800}
                height={512}
              />
            </div>
            <div className="p-5 flex flex-col flex-1">
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                {car.category}
              </span>
              <h3 className="text-xl font-bold text-foreground mt-1">{car.model}</h3>

              <div className="flex items-center gap-4 mt-3 text-muted-foreground text-sm">
                <span className="flex items-center gap-1"><Users className="h-4 w-4" />{car.seats}</span>
                <span className="flex items-center gap-1"><Fuel className="h-4 w-4" />{car.fuel}</span>
                <span className="flex items-center gap-1"><Settings2 className="h-4 w-4" />{car.transmission}</span>
              </div>

              <div className="mt-auto pt-5 flex items-end justify-between">
                <div>
                  <span className="text-3xl font-extrabold text-foreground">€{car.price}</span>
                  <span className="text-muted-foreground text-sm">/day</span>
                </div>
                <a
                  href={`https://wa.me/306900000000?text=Hi!%20I'd%20like%20to%20book%20the%20${encodeURIComponent(car.model)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-accent text-accent-foreground font-bold text-sm px-5 py-3 rounded-xl hover:brightness-110 transition-all duration-200"
                >
                  <MessageCircle className="h-4 w-4" />
                  Book via WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default FleetSection;
