import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Zap, Shield } from "lucide-react";

const eaSystems = [
  {
    id: "icf",
    name: "Trade2live ICF$",
    description: "Intelligent Capital Flow strategy focusing on major currency pairs with momentum-based entries.",
    stats: {
      return: "+52%",
      drawdown: "12%",
      winRate: "68%",
    },
    color: "from-primary to-gold",
    icon: Zap,
    link: "/ea/icf",
    badge: "Popular",
  },
  {
    id: "zb",
    name: "Trade2live ZB$",
    description: "Zero-Based risk approach with conservative position sizing for steady, reliable growth.",
    stats: {
      return: "+38%",
      drawdown: "8%",
      winRate: "72%",
    },
    color: "from-profit to-chart",
    icon: Shield,
    link: "/ea/zb",
    badge: "Low Risk",
  },
];

export const EAOverviewSection = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
            Our Products
          </span>
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">
            Choose Your <span className="text-gradient-gold">Trading System</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Two distinct strategies designed for different risk appetites. 
            Both verified and consistently profitable.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {eaSystems.map((ea, index) => (
            <motion.div
              key={ea.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${ea.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`} />
              <div className="stat-card relative p-8 h-full">
                {/* Badge */}
                <div className="absolute top-6 right-6">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${ea.color} text-primary-foreground`}>
                    {ea.badge}
                  </span>
                </div>

                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${ea.color} flex items-center justify-center mb-6`}>
                  <ea.icon className="w-8 h-8 text-primary-foreground" />
                </div>

                {/* Content */}
                <h3 className="font-heading text-2xl font-bold mb-3">{ea.name}</h3>
                <p className="text-muted-foreground mb-6">{ea.description}</p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="text-center p-3 rounded-lg bg-background/50">
                    <div className="font-heading text-xl font-bold text-profit">{ea.stats.return}</div>
                    <div className="text-xs text-muted-foreground">Yearly Return</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-background/50">
                    <div className="font-heading text-xl font-bold text-primary">{ea.stats.drawdown}</div>
                    <div className="text-xs text-muted-foreground">Max DD</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-background/50">
                    <div className="font-heading text-xl font-bold text-chart">{ea.stats.winRate}</div>
                    <div className="text-xs text-muted-foreground">Win Rate</div>
                  </div>
                </div>

                {/* CTA */}
                <Link to={ea.link}>
                  <Button variant="gold-outline" className="w-full group/btn">
                    Learn More
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
