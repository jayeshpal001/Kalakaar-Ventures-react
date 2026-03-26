import { motion } from "framer-motion";
import { Video, Camera, PenTool, Smartphone, ArrowRight } from "lucide-react";
import { servicesData } from "../../data";

const getIcon = (iconName) => {
  switch (iconName) {
    case "video": return <Video className="w-8 h-8 text-foreground" />;
    case "camera": return <Camera className="w-8 h-8 text-foreground" />;
    case "pen": return <PenTool className="w-8 h-8 text-foreground" />;
    case "smartphone": return <Smartphone className="w-8 h-8 text-foreground" />;
    default: return <Video className="w-8 h-8 text-foreground" />;
  }
};

export default function Services() {
  return (
    <section id="services" className="py-24 px-6 max-w-7xl mx-auto w-full relative">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Creative Solutions</h2>
        <p className="text-muted max-w-2xl text-lg">
          Not just documenting the journey, but delivering value. Helping you visually express your ideas through evolving mastery.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {servicesData.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative p-8 rounded-2xl bg-neutral-900/50 border border-neutral-800 hover:bg-neutral-900 transition-colors duration-300"
          >
            <div className="mb-6 inline-flex p-4 rounded-full bg-neutral-800/50 border border-neutral-700/50 group-hover:scale-110 transition-transform duration-300">
              {getIcon(service.iconName)}
            </div>
            
            <h3 className="text-2xl font-bold text-foreground mb-3">{service.title}</h3>
            <p className="text-muted mb-6">{service.description}</p>
            
            <div className="space-y-3 mb-8">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500 block mb-1">Style</span>
                <span className="text-sm text-neutral-300">{service.style}</span>
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500 block mb-1">Perfect For</span>
                <span className="text-sm text-neutral-300">{service.target}</span>
              </div>
            </div>

            <a href="#contact" className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-accent transition-colors group/btn">
              Work with me 
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
}