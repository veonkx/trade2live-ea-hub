import { motion } from "framer-motion";
import { Shield, TrendingDown, Bot, LineChart, Lock, Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const FeaturesSection = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Shield,
      title: t("features.riskManagement"),
      description: t("features.riskManagementDesc"),
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      icon: TrendingDown,
      title: "Low Drawdown",
      description: "Historically maintained drawdown below 15%, protecting your capital.",
      color: "text-profit",
      bg: "bg-profit/10",
    },
    {
      icon: Bot,
      title: t("features.autoTrading"),
      description: t("features.autoTradingDesc"),
      color: "text-chart",
      bg: "bg-chart/10",
    },
    {
      icon: LineChart,
      title: t("features.transparency"),
      description: t("features.transparencyDesc"),
      color: "text-gold",
      bg: "bg-gold/10",
    },
    {
      icon: Lock,
      title: "Secure System",
      description: "Licensed per account with secure activation and regular updates.",
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      icon: Clock,
      title: "Long-term Strategy",
      description: "Designed for sustainable growth, not quick wins. Built for serious traders.",
      color: "text-profit",
      bg: "bg-profit/10",
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-dark" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
            {t("features.tagline")}
          </span>
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">
            {t("features.title")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("features.description")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="stat-card group hover:border-primary/30 transition-all duration-300"
            >
              <div className={`w-14 h-14 rounded-xl ${feature.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className={`w-7 h-7 ${feature.color}`} />
              </div>
              <h3 className="font-heading text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
