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

const features = [
  {
    icon: Copy,
    title: "Easy Copy Trading",
    description: "Copy trades from professional traders automatically. No trading experience required.",
  },
  {
    icon: TrendingUp,
    title: "Proven Performance",
    description: "Follow traders with verified track records and consistent profitability.",
  },
  {
    icon: Shield,
    title: "Risk Management",
    description: "Set your own risk limits and stop-loss parameters for complete control.",
  },
  {
    icon: Zap,
    title: "Real-time Execution",
    description: "Trades are copied instantly to your account with minimal latency.",
  },
];

const stats = [
  { value: "500+", label: "Active Copiers" },
  { value: "85%", label: "Win Rate" },
  { value: "$2M+", label: "Copied Volume" },
  { value: "24/7", label: "Auto Trading" },
];

const benefits = [
  "No trading experience needed",
  "Automatic position sizing",
  "Real-time trade copying",
  "Choose from multiple signal providers",
  "Set your own risk limits",
  "Transparent performance history",
  "Easy setup in minutes",
  "Works with any MT4/MT5 broker",
];

const howItWorks = [
  {
    step: 1,
    title: "Choose a Signal Provider",
    description: "Browse our verified traders and select one that matches your risk tolerance and trading style.",
    icon: Users,
  },
  {
    step: 2,
    title: "Connect Your Account",
    description: "Link your MT4/MT5 trading account securely. Your funds stay with your broker.",
    icon: Target,
  },
  {
    step: 3,
    title: "Set Your Parameters",
    description: "Configure your lot size, risk limits, and which pairs to copy. Full control is yours.",
    icon: BarChart3,
  },
  {
    step: 4,
    title: "Start Copying",
    description: "Trades are automatically copied to your account in real-time. Sit back and watch.",
    icon: Zap,
  },
];

const CopyTradePage = () => {
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
              Copy Trade Service
            </div>

            <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6">
              Copy Professional Traders{" "}
              <span className="text-gradient-gold">Automatically</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Don't have time to trade? Let our expert traders do it for you. 
              Copy their trades automatically and grow your account with minimal effort.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Link to="/pricing">
                <Button variant="gold" size="xl" className="group">
                  Start Copy Trading
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="glass" size="xl">
                  Ask Questions
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="stat-card text-center"
                >
                  <div className="font-heading text-2xl md:text-3xl font-bold text-profit">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
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
              Why Choose <span className="text-gradient-gold">Copy Trade</span>?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Experience the benefits of professional trading without the learning curve.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="stat-card text-center group hover:border-chart/50 transition-colors"
              >
                <div className="w-14 h-14 rounded-2xl bg-chart/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-chart/20 transition-colors">
                  <feature.icon className="w-7 h-7 text-chart" />
                </div>
                <h3 className="font-heading text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
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
              How It <span className="text-gradient-gold">Works</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get started in four simple steps and begin copying trades today.
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
                  <h3 className="font-heading text-lg font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
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
                Everything You Need to{" "}
                <span className="text-gradient-gold">Succeed</span>
              </h2>
              <p className="text-muted-foreground mb-8">
                Our copy trading service is designed to make automated trading accessible 
                to everyone, regardless of experience level.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-profit flex-shrink-0" />
                    <span className="text-sm">{benefit}</span>
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
                  <h3 className="font-heading text-xl font-bold">Pro Signal Provider</h3>
                  <p className="text-sm text-muted-foreground">Top Performing Trader</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b border-border">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Monthly Return
                  </span>
                  <span className="font-bold text-profit">+12.5%</span>
                </div>
                <div className="flex justify-between py-3 border-b border-border">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    Win Rate
                  </span>
                  <span className="font-bold">85%</span>
                </div>
                <div className="flex justify-between py-3 border-b border-border">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Trading Since
                  </span>
                  <span className="font-bold">2019</span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Active Copiers
                  </span>
                  <span className="font-bold">248</span>
                </div>
              </div>

              <Button variant="gold" className="w-full mt-6">
                <Copy className="w-4 h-4 mr-2" />
                Copy This Trader
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
              Simple <span className="text-gradient-gold">Pricing</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose a plan that fits your trading needs. No hidden fees.
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
                  <span className="text-muted-foreground mb-1">/month</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Full access to copy trading service
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                {[
                  "Unlimited trade copying",
                  "Multiple signal providers",
                  "Real-time execution",
                  "Risk management tools",
                  "24/7 support",
                  "Performance analytics",
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-profit flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link to="/pricing" className="block">
                <Button variant="gold" size="lg" className="w-full">
                  Get Started
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
              Ready to Start <span className="text-gradient-gold">Copy Trading</span>?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Join hundreds of traders who are already copying our expert signals 
              and growing their accounts automatically.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/pricing">
                <Button variant="gold" size="xl">
                  View All Plans
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="glass" size="xl">
                  Contact Us
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
