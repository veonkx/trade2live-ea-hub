import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Mail, MessageCircle, Phone, Clock, Send, Facebook } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const ContactPage = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const contactMethods = [
    {
      icon: MessageCircle,
      title: "Line",
      value: "@trade2live",
      description: t("contact.methods.line.desc"),
      color: "text-profit",
      bg: "bg-profit/10",
    },
    {
      icon: MessageCircle,
      title: "Telegram",
      value: "@trade2live",
      description: t("contact.methods.telegram.desc"),
      color: "text-chart",
      bg: "bg-chart/10",
    },
    {
      icon: Mail,
      title: "Email",
      value: "support@trade2live.com",
      description: t("contact.methods.email.desc"),
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      icon: Facebook,
      title: "Facebook",
      value: "Trade2live Official",
      description: t("contact.methods.facebook.desc"),
      color: "text-chart",
      bg: "bg-chart/10",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: t("contact.form.successTitle"),
      description: t("contact.form.successDesc"),
    });
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-dark" />
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[150px]" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
              {t("contact.label")}
            </span>
            <h1 className="font-heading text-4xl md:text-6xl font-bold mb-4">
              {t("contact.title")} <span className="text-gradient-gold">{t("contact.titleHighlight")}</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              {t("contact.description")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="stat-card text-center hover:border-primary/30 transition-all cursor-pointer group"
              >
                <div className={`w-14 h-14 rounded-xl ${method.bg} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <method.icon className={`w-7 h-7 ${method.color}`} />
                </div>
                <h3 className="font-heading text-lg font-semibold mb-1">{method.title}</h3>
                <p className="text-primary font-medium mb-1">{method.value}</p>
                <p className="text-sm text-muted-foreground">{method.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading text-2xl font-bold mb-6">{t("contact.form.title")}</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">{t("contact.form.name")}</label>
                    <Input
                      placeholder={t("contact.form.namePlaceholder")}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="bg-background border-border"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">{t("contact.form.email")}</label>
                    <Input
                      type="email"
                      placeholder={t("contact.form.emailPlaceholder")}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="bg-background border-border"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">{t("contact.form.subject")}</label>
                  <Input
                    placeholder={t("contact.form.subjectPlaceholder")}
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                    className="bg-background border-border"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">{t("contact.form.message")}</label>
                  <Textarea
                    placeholder={t("contact.form.messagePlaceholder")}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={5}
                    className="bg-background border-border"
                  />
                </div>
                <Button variant="gold" size="lg" type="submit" className="w-full md:w-auto">
                  <Send className="w-4 h-4" />
                  {t("contact.form.send")}
                </Button>
              </form>
            </motion.div>

            {/* Support Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading text-2xl font-bold mb-6">{t("contact.support.title")}</h2>
              
              <div className="stat-card mb-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold">{t("contact.support.hours.title")}</h3>
                    <p className="text-muted-foreground">{t("contact.support.hours.weekday")}</p>
                    <p className="text-muted-foreground">{t("contact.support.hours.weekend")}</p>
                  </div>
                </div>
              </div>

              <div className="stat-card mb-6">
                <h3 className="font-heading font-semibold mb-4">{t("contact.support.response.title")}</h3>
                <ul className="space-y-3">
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Line / Telegram</span>
                    <span className="text-profit font-medium">{t("contact.support.response.fast")}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Email</span>
                    <span className="font-medium">{t("contact.support.response.email")}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">{t("contact.support.response.technical")}</span>
                    <span className="text-primary font-medium">{t("contact.support.response.priority")}</span>
                  </li>
                </ul>
              </div>

              <div className="stat-card bg-primary/5 border-primary/20">
                <h3 className="font-heading font-semibold mb-2">{t("contact.support.premium.title")}</h3>
                <p className="text-muted-foreground text-sm">
                  {t("contact.support.premium.desc")}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ContactPage;