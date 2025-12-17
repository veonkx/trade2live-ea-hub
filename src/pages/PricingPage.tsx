import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Check, Zap, Shield, Crown } from "lucide-react";

const plans = [
  {
    duration: "3 Months",
    popular: false,
    prices: {
      icf: { price: 4500, per: "฿1,500/mo" },
      zb: { price: 3900, per: "฿1,300/mo" },
      bundle: { price: 6900, per: "฿2,300/mo" },
    },
  },
  {
    duration: "6 Months",
    popular: true,
    prices: {
      icf: { price: 7800, per: "฿1,300/mo" },
      zb: { price: 6600, per: "฿1,100/mo" },
      bundle: { price: 11900, per: "฿1,983/mo" },
    },
  },
  {
    duration: "12 Months",
    popular: false,
    prices: {
      icf: { price: 12900, per: "฿1,075/mo" },
      zb: { price: 10900, per: "฿908/mo" },
      bundle: { price: 19900, per: "฿1,658/mo" },
    },
  },
];

const features = [
  "Licensed for 1 MT4/MT5 Account",
  "Free EA Updates",
  "Setup Guide & Documentation",
  "Technical Support via Line/Telegram",
  "Access to Private Community",
];

const bundleFeatures = [
  "Both ICF$ and ZB$ EA",
  "Licensed for 2 MT4/MT5 Accounts",
  "Priority Support",
  "Free EA Updates",
  "VIP Community Access",
  "Monthly Strategy Calls",
];

const PricingPage = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-dark" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
              Pricing
            </span>
            <h1 className="font-heading text-4xl md:text-6xl font-bold mb-4">
              Choose Your <span className="text-gradient-gold">Plan</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Flexible subscription options for every trading style. 
              All plans include full EA access, updates, and support.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Individual EA Pricing */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* ICF$ Pricing */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-primary to-gold flex items-center justify-center">
                <Zap className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h2 className="font-heading text-2xl font-bold">Trade2live ICF$</h2>
                <p className="text-muted-foreground">Intelligent Capital Flow Strategy</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {plans.map((plan, index) => (
                <motion.div
                  key={`icf-${plan.duration}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`stat-card relative ${plan.popular ? 'border-primary/50 glow-gold-sm' : ''}`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="px-3 py-1 bg-gradient-gold text-primary-foreground text-xs font-medium rounded-full">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <div className="text-center">
                    <h3 className="font-heading text-lg font-semibold mb-2">{plan.duration}</h3>
                    <div className="mb-2">
                      <span className="font-heading text-4xl font-bold">฿{plan.prices.icf.price.toLocaleString()}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-6">{plan.prices.icf.per}</p>
                    <Button variant={plan.popular ? "gold" : "gold-outline"} className="w-full">
                      Subscribe
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ZB$ Pricing */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-profit to-chart flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h2 className="font-heading text-2xl font-bold">Trade2live ZB$</h2>
                <p className="text-muted-foreground">Zero-Based Risk Strategy</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {plans.map((plan, index) => (
                <motion.div
                  key={`zb-${plan.duration}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`stat-card relative ${plan.popular ? 'border-profit/50' : ''}`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="px-3 py-1 bg-profit text-profit-foreground text-xs font-medium rounded-full">
                        Best Value
                      </span>
                    </div>
                  )}
                  <div className="text-center">
                    <h3 className="font-heading text-lg font-semibold mb-2">{plan.duration}</h3>
                    <div className="mb-2">
                      <span className="font-heading text-4xl font-bold">฿{plan.prices.zb.price.toLocaleString()}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-6">{plan.prices.zb.per}</p>
                    <Button variant="outline" className="w-full border-profit text-profit hover:bg-profit hover:text-profit-foreground">
                      Subscribe
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Bundle Pricing */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-gold to-primary flex items-center justify-center">
                <Crown className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h2 className="font-heading text-2xl font-bold">Premium Bundle</h2>
                <p className="text-muted-foreground">Both EA Systems • Best Value</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {plans.map((plan, index) => (
                <motion.div
                  key={`bundle-${plan.duration}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`stat-card relative ${plan.popular ? 'border-gold/50 glow-gold' : ''}`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="px-3 py-1 bg-gradient-gold text-primary-foreground text-xs font-medium rounded-full">
                        ⭐ Recommended
                      </span>
                    </div>
                  )}
                  <div className="text-center">
                    <h3 className="font-heading text-lg font-semibold mb-2">{plan.duration}</h3>
                    <div className="mb-2">
                      <span className="font-heading text-4xl font-bold text-gradient-gold">฿{plan.prices.bundle.price.toLocaleString()}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-6">{plan.prices.bundle.per}</p>
                    <Button variant="premium" className="w-full">
                      Get Bundle
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Comparison */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Individual Features */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="stat-card"
            >
              <h3 className="font-heading text-xl font-bold mb-6">Individual EA Plan Includes</h3>
              <ul className="space-y-4">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-profit flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Bundle Features */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="stat-card border-gold/30"
            >
              <h3 className="font-heading text-xl font-bold mb-6 text-gradient-gold">Premium Bundle Includes</h3>
              <ul className="space-y-4">
                {bundleFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl font-bold mb-4">
            Have Questions About Pricing?
          </h2>
          <p className="text-muted-foreground mb-8">
            Contact our team for custom solutions or any inquiries.
          </p>
          <Link to="/contact">
            <Button variant="glass" size="xl">Contact Us</Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default PricingPage;
