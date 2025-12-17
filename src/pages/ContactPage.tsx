import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Mail, MessageCircle, Phone, Clock, Send, Facebook } from "lucide-react";

const contactMethods = [
  {
    icon: MessageCircle,
    title: "Line",
    value: "@trade2live",
    description: "Fastest response time",
    color: "text-profit",
    bg: "bg-profit/10",
  },
  {
    icon: MessageCircle,
    title: "Telegram",
    value: "@trade2live",
    description: "24/7 support channel",
    color: "text-chart",
    bg: "bg-chart/10",
  },
  {
    icon: Mail,
    title: "Email",
    value: "support@trade2live.com",
    description: "For detailed inquiries",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: Facebook,
    title: "Facebook",
    value: "Trade2live Official",
    description: "Community updates",
    color: "text-chart",
    bg: "bg-chart/10",
  },
];

const ContactPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours.",
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
              Contact Us
            </span>
            <h1 className="font-heading text-4xl md:text-6xl font-bold mb-4">
              Get in <span className="text-gradient-gold">Touch</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Have questions about our EA systems? Our team is here to help.
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
              <h2 className="font-heading text-2xl font-bold mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">Name</label>
                    <Input
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="bg-background border-border"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">Email</label>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="bg-background border-border"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Subject</label>
                  <Input
                    placeholder="How can we help?"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                    className="bg-background border-border"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Message</label>
                  <Textarea
                    placeholder="Tell us more about your inquiry..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={5}
                    className="bg-background border-border"
                  />
                </div>
                <Button variant="gold" size="lg" type="submit" className="w-full md:w-auto">
                  <Send className="w-4 h-4" />
                  Send Message
                </Button>
              </form>
            </motion.div>

            {/* Support Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading text-2xl font-bold mb-6">Support Information</h2>
              
              <div className="stat-card mb-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold">Working Hours</h3>
                    <p className="text-muted-foreground">Monday - Friday: 9:00 - 21:00 (GMT+7)</p>
                    <p className="text-muted-foreground">Weekend: 10:00 - 18:00 (GMT+7)</p>
                  </div>
                </div>
              </div>

              <div className="stat-card mb-6">
                <h3 className="font-heading font-semibold mb-4">Response Time</h3>
                <ul className="space-y-3">
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Line / Telegram</span>
                    <span className="text-profit font-medium">&lt; 2 hours</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Email</span>
                    <span className="font-medium">&lt; 24 hours</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Technical Issues</span>
                    <span className="text-primary font-medium">Priority</span>
                  </li>
                </ul>
              </div>

              <div className="stat-card bg-primary/5 border-primary/20">
                <h3 className="font-heading font-semibold mb-2">Premium Support</h3>
                <p className="text-muted-foreground text-sm">
                  Bundle subscribers receive priority support with dedicated assistance 
                  and monthly strategy consultation calls.
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
