import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  Copy, 
  TrendingUp, 
  Shield, 
  Users, 
  Zap,
  CheckCircle,
  BarChart3,
  Clock,
  DollarSign,
  Star,
  Target
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const CopyTradePage = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Copy,
      titleKey: "copyTrade.features.easy.title",
      descKey: "copyTrade.features.easy.desc",
    },
    {
      icon: TrendingUp,
      titleKey: "copyTrade.features.proven.title",
      descKey: "copyTrade.features.proven.desc",
    },
    {
      icon: Shield,
      titleKey: "copyTrade.features.risk.title",
      descKey: "copyTrade.features.risk.desc",
    },
    {
      icon: Zap,
      titleKey: "copyTrade.features.realtime.title",
      descKey: "copyTrade.features.realtime.desc",
    },
  ];

  const stats = [
    { valueKey: "copyTrade.stats.copiers.value", labelKey: "copyTrade.stats.copiers.label" },
    { valueKey: "copyTrade.stats.winRate.value", labelKey: "copyTrade.stats.winRate.label" },
    { valueKey: "copyTrade.stats.volume.value", labelKey: "copyTrade.stats.volume.label" },
    { valueKey: "copyTrade.stats.trading.value", labelKey: "copyTrade.stats.trading.label" },
  ];

  const benefitKeys = [
    "copyTrade.benefits.noExperience",
    "copyTrade.benefits.autoSizing",
    "copyTrade.benefits.realtime",
    "copyTrade.benefits.multiProviders",
    "copyTrade.benefits.riskLimits",
    "copyTrade.benefits.transparent",
    "copyTrade.benefits.easySetup",
    "copyTrade.benefits.anyBroker",
  ];

  const howItWorks = [
    {
      step: 1,
      titleKey: "copyTrade.howItWorks.step1.title",
      descKey: "copyTrade.howItWorks.step1.desc",
      icon: Users,
    },
    {
      step: 2,
      titleKey: "copyTrade.howItWorks.step2.title",
      descKey: "copyTrade.howItWorks.step2.desc",
      icon: Target,
    },
    {
      step: 3,
      titleKey: "copyTrade.howItWorks.step3.title",
      descKey: "copyTrade.howItWorks.step3.desc",
      icon: BarChart3,
    },
    {
      step: 4,
      titleKey: "copyTrade.howItWorks.step4.title",
      descKey: "copyTrade.howItWorks.step4.desc",
      icon: Zap,
    },
  ];

  const pricingFeatureKeys = [
    "copyTrade.pricing.features.unlimited",
    "copyTrade.pricing.features.multiProviders",
    "copyTrade.pricing.features.realtime",
    "copyTrade.pricing.features.riskTools",
    "copyTrade.pricing.features.support",
    "copyTrade.pricing.features.analytics",
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-dark" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-chart to-profit opacity-10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-primary to-gold opacity-10 rounded-full blur-[150px]" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-chart/10 border border-chart/20 text-chart text-sm font-medium mb-6">
              <Copy className="w-4 h-4" />
              {t("copyTrade.badge")}
            </div>

            <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6">
              {t("copyTrade.hero.title")}{" "}
              <span className="text-gradient-gold">{t("copyTrade.hero.titleHighlight")}</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t("copyTrade.hero.description")}
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Link to="/pricing">
                <Button variant="gold" size="xl" className="group">
                  {t("copyTrade.hero.startButton")}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="glass" size="xl">
                  {t("copyTrade.hero.askButton")}
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.labelKey}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="stat-card text-center"
                >
                  <div className="font-heading text-2xl md:text-3xl font-bold text-profit">
                    {t(stat.valueKey)}
                  </div>
                  <div className="text-sm text-muted-foreground">{t(stat.labelKey)}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              {t("copyTrade.whyChoose.title")} <span className="text-gradient-gold">{t("copyTrade.whyChoose.titleHighlight")}</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("copyTrade.whyChoose.description")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.titleKey}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="stat-card text-center group hover:border-chart/50 transition-colors"
              >
                <div className="w-14 h-14 rounded-2xl bg-chart/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-chart/20 transition-colors">
                  <feature.icon className="w-7 h-7 text-chart" />
                </div>
                <h3 className="font-heading text-lg font-bold mb-2">{t(feature.titleKey)}</h3>
                <p className="text-sm text-muted-foreground">{t(feature.descKey)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              {t("copyTrade.howItWorks.title")} <span className="text-gradient-gold">{t("copyTrade.howItWorks.titleHighlight")}</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("copyTrade.howItWorks.description")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                {/* Connection line */}
                {index < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[60%] w-full h-0.5 bg-gradient-to-r from-chart/50 to-transparent" />
                )}
                
                <div className="stat-card text-center relative z-10">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-chart to-profit flex items-center justify-center mx-auto mb-4">
                    <span className="font-heading text-2xl font-bold text-primary-foreground">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="font-heading text-lg font-bold mb-2">{t(item.titleKey)}</h3>
                  <p className="text-sm text-muted-foreground">{t(item.descKey)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
                {t("copyTrade.benefits.title")}{" "}
                <span className="text-gradient-gold">{t("copyTrade.benefits.titleHighlight")}</span>
              </h2>
              <p className="text-muted-foreground mb-8">
                {t("copyTrade.benefits.description")}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefitKeys.map((key, index) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-profit flex-shrink-0" />
                    <span className="text-sm">{t(key)}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="stat-card p-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-chart to-profit flex items-center justify-center">
                  <Star className="w-8 h-8 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold">{t("copyTrade.provider.title")}</h3>
                  <p className="text-sm text-muted-foreground">{t("copyTrade.provider.subtitle")}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b border-border">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    {t("copyTrade.provider.monthlyReturn")}
                  </span>
                  <span className="font-bold text-profit">+12.5%</span>
                </div>
                <div className="flex justify-between py-3 border-b border-border">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    {t("copyTrade.provider.winRate")}
                  </span>
                  <span className="font-bold">85%</span>
                </div>
                <div className="flex justify-between py-3 border-b border-border">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {t("copyTrade.provider.tradingSince")}
                  </span>
                  <span className="font-bold">2019</span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    {t("copyTrade.provider.activeCopiers")}
                  </span>
                  <span className="font-bold">248</span>
                </div>
              </div>

              <Button variant="gold" className="w-full mt-6">
                <Copy className="w-4 h-4 mr-2" />
                {t("copyTrade.provider.copyButton")}
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              {t("copyTrade.pricing.title")} <span className="text-gradient-gold">{t("copyTrade.pricing.titleHighlight")}</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("copyTrade.pricing.description")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-md mx-auto"
          >
            <div className="stat-card p-8 border-chart/50">
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-chart/10 text-chart text-sm font-medium mb-4">
                  <Copy className="w-4 h-4" />
                  Copy Trade
                </div>
                <div className="flex items-end justify-center gap-1 mb-2">
                  <span className="font-heading text-4xl font-bold">$49</span>
                  <span className="text-muted-foreground mb-1">/{t("copyTrade.pricing.perMonth")}</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {t("copyTrade.pricing.fullAccess")}
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                {pricingFeatureKeys.map((key) => (
                  <li key={key} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-profit flex-shrink-0" />
                    <span className="text-sm">{t(key)}</span>
                  </li>
                ))}
              </ul>

              <Link to="/pricing" className="block">
                <Button variant="gold" size="lg" className="w-full">
                  {t("copyTrade.pricing.getStarted")}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              {t("copyTrade.cta.title")} <span className="text-gradient-gold">{t("copyTrade.cta.titleHighlight")}</span>
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              {t("copyTrade.cta.description")}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/pricing">
                <Button variant="gold" size="xl">
                  {t("copyTrade.cta.viewPlans")}
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="glass" size="xl">
                  {t("copyTrade.cta.contactUs")}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default CopyTradePage;