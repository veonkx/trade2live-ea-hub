import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Target, Shield, TrendingUp, Award, Users, Clock } from "lucide-react";

const values = [
  {
    icon: Shield,
    title: "Risk First",
    description: "We prioritize capital preservation over aggressive returns. Every strategy is built with risk management at its core.",
  },
  {
    icon: TrendingUp,
    title: "Sustainable Growth",
    description: "Our systems are designed for long-term profitability, not quick wins. Consistency is our priority.",
  },
  {
    icon: Target,
    title: "Transparency",
    description: "All our results are publicly verified. We believe in complete transparency with our trading community.",
  },
  {
    icon: Users,
    title: "Community",
    description: "We're building a community of serious traders who understand that successful trading is a marathon, not a sprint.",
  },
];

const timeline = [
  { year: "2019", event: "Started developing proprietary trading algorithms" },
  { year: "2020", event: "Launched Trade2live ICF$ for private testing" },
  { year: "2021", event: "Released ZB$ strategy, expanded to beta users" },
  { year: "2022", event: "Public launch with verified Myfxbook tracking" },
  { year: "2023", event: "Reached 500+ active users across Thailand" },
  { year: "2024", event: "Continuous improvement and new features" },
];

const AboutPage = () => {
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
              About Us
            </span>
            <h1 className="font-heading text-4xl md:text-6xl font-bold mb-4">
              Building the Future of <span className="text-gradient-gold">Automated Trading</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Trade2live is a premium Expert Advisor service dedicated to providing 
              sustainable, low-risk automated trading solutions for serious investors.
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
              <h2 className="font-heading text-3xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Trade2live was founded by a team of experienced forex traders and software 
                  developers who were frustrated with the unreliable and overhyped EA market.
                </p>
                <p>
                  After years of developing and testing various strategies, we created a set of 
                  Expert Advisors that prioritize what matters most: <span className="text-primary font-medium">capital preservation</span> and 
                  <span className="text-profit font-medium"> sustainable growth</span>.
                </p>
                <p>
                  Our philosophy is simple — trading is a long-term game. We don't promise 
                  overnight riches, but we do deliver consistent, verified results that speak 
                  for themselves.
                </p>
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
                Our Journey
              </h3>
              <div className="space-y-6">
                {timeline.map((item, index) => (
                  <div key={item.year} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 rounded-full bg-primary" />
                      {index < timeline.length - 1 && (
                        <div className="w-0.5 h-full bg-border mt-2" />
                      )}
                    </div>
                    <div className="pb-6">
                      <span className="text-primary font-bold">{item.year}</span>
                      <p className="text-muted-foreground text-sm">{item.event}</p>
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
              Our Values
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold">
              What We <span className="text-gradient-gold">Stand For</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
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
                  <h3 className="font-heading text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
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
            {[
              { value: "500+", label: "Active Users" },
              { value: "5+", label: "Years Experience" },
              { value: "₿10M+", label: "Volume Traded" },
              { value: "24/7", label: "Support Available" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="stat-card text-center"
              >
                <div className="font-heading text-3xl md:text-4xl font-bold text-gradient-gold mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
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
            Join Our Trading Community
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Experience the difference of professional-grade automated trading 
            with verified results and dedicated support.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/pricing">
              <Button variant="gold" size="xl">View Plans</Button>
            </Link>
            <Link to="/contact">
              <Button variant="glass" size="xl">Contact Us</Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;
