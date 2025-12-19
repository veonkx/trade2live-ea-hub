import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, TrendingUp, Bot } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import heroImage from "@/assets/hero-trading.jpg";

export const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Trading background"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background/50" />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-10" />

      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gold/10 rounded-full blur-[100px] animate-pulse-slow" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-profit animate-pulse" />
              Live Trading • Verified Results
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4"
          >
            {t("hero.title")}
            <br />
            <span className="text-gradient-gold">{t("hero.titleHighlight")}</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, type: "spring", stiffness: 100 }}
            className="mb-6 relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-gold/10 to-primary/20 rounded-2xl blur-xl opacity-50 animate-pulse-slow" />
            <p className="relative text-xl md:text-2xl lg:text-3xl font-semibold italic">
              <span className="text-gradient-gold-shimmer animate-text-glow">
                "Trade to Live, Not Live to Trade"
              </span>
            </p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative text-muted-foreground text-base md:text-lg mt-2"
            >
              Trade เพื่อใช้ชีวิต ไม่ใช่ใช้ชีวิตเพื่อ Trade
            </motion.p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl"
          >
            {t("hero.description")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4 mb-12"
          >
            <Link to="/pricing">
              <Button variant="gold" size="xl" className="group">
                {t("nav.getStarted")}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/performance">
              <Button variant="glass" size="xl">
                {t("hero.viewPerformance")}
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-3 gap-6 md:gap-12"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-profit/10 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-profit" />
              </div>
              <div>
                <div className="font-heading text-2xl md:text-3xl font-bold text-profit">+47%</div>
                <div className="text-sm text-muted-foreground">Yearly Return</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="font-heading text-2xl md:text-3xl font-bold">&lt;15%</div>
                <div className="text-sm text-muted-foreground">{t("hero.stat.maxDrawdown")}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-chart/10 flex items-center justify-center">
                <Bot className="w-6 h-6 text-chart" />
              </div>
              <div>
                <div className="font-heading text-2xl md:text-3xl font-bold">24/7</div>
                <div className="text-sm text-muted-foreground">Auto Trading</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
