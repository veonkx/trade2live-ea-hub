import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Target, Shield, TrendingUp, Award, Users, Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const valueKeys = [
  { icon: Shield, titleKey: "about.values.risk.title", descKey: "about.values.risk.desc" },
  { icon: TrendingUp, titleKey: "about.values.growth.title", descKey: "about.values.growth.desc" },
  { icon: Target, titleKey: "about.values.transparency.title", descKey: "about.values.transparency.desc" },
  { icon: Users, titleKey: "about.values.community.title", descKey: "about.values.community.desc" },
];

const timelineKeys = [
  { year: "2019", eventKey: "about.timeline.2019" },
  { year: "2020", eventKey: "about.timeline.2020" },
  { year: "2021", eventKey: "about.timeline.2021" },
  { year: "2022", eventKey: "about.timeline.2022" },
  { year: "2023", eventKey: "about.timeline.2023" },
  { year: "2024", eventKey: "about.timeline.2024" },
];

const statKeys = [
  { valueKey: "about.stats.users.value", labelKey: "about.stats.users.label" },
  { valueKey: "about.stats.experience.value", labelKey: "about.stats.experience.label" },
  { valueKey: "about.stats.volume.value", labelKey: "about.stats.volume.label" },
  { valueKey: "about.stats.support.value", labelKey: "about.stats.support.label" },
];

const AboutPage = () => {
  const { t } = useLanguage();

  return (
    <Layout>
      {/* Hero */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-dark" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[150px]" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
              {t("about.label")}
            </span>
            <h1 className="font-heading text-4xl md:text-6xl font-bold mb-4">
              {t("about.title")} <span className="text-gradient-gold">{t("about.titleHighlight")}</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              {t("about.description")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading text-3xl font-bold mb-6">{t("about.story.title")}</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>{t("about.story.p1")}</p>
                <p>
                  {t("about.story.p2")}
                </p>
                <p>{t("about.story.p3")}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="stat-card"
            >
              <h3 className="font-heading text-xl font-bold mb-6 flex items-center gap-3">
                <Clock className="w-6 h-6 text-primary" />
                {t("about.journey.title")}
              </h3>
              <div className="space-y-6">
                {timelineKeys.map((item, index) => (
                  <div key={item.year} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 rounded-full bg-primary" />
                      {index < timelineKeys.length - 1 && (
                        <div className="w-0.5 h-full bg-border mt-2" />
                      )}
                    </div>
                    <div className="pb-6">
                      <span className="text-primary font-bold">{item.year}</span>
                      <p className="text-muted-foreground text-sm">{t(item.eventKey)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
              {t("about.values.label")}
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold">
              {t("about.values.title")} <span className="text-gradient-gold">{t("about.values.titleHighlight")}</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {valueKeys.map((value, index) => (
              <motion.div
                key={value.titleKey}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="stat-card flex gap-6"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <value.icon className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-semibold mb-2">{t(value.titleKey)}</h3>
                  <p className="text-muted-foreground">{t(value.descKey)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {statKeys.map((stat, index) => (
              <motion.div
                key={stat.labelKey}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="stat-card text-center"
              >
                <div className="font-heading text-3xl md:text-4xl font-bold text-gradient-gold mb-2">
                  {t(stat.valueKey)}
                </div>
                <div className="text-muted-foreground">{t(stat.labelKey)}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4 text-center">
          <Award className="w-16 h-16 text-primary mx-auto mb-6" />
          <h2 className="font-heading text-3xl font-bold mb-4">
            {t("about.cta.title")}
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            {t("about.cta.description")}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/pricing">
              <Button variant="gold" size="xl">{t("about.cta.viewPlans")}</Button>
            </Link>
            <Link to="/contact">
              <Button variant="glass" size="xl">{t("about.cta.contactUs")}</Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;