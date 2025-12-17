import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";
import { ArrowRight, Zap, Shield, Target, Clock, Users, AlertTriangle, CheckCircle, XCircle } from "lucide-react";

const eaData = {
  icf: {
    name: "Trade2live ICF$",
    fullName: "Intelligent Capital Flow",
    tagline: "Momentum-driven strategy for active markets",
    description: "ICF$ utilizes advanced momentum analysis and capital flow indicators to identify high-probability trading opportunities in major currency pairs.",
    icon: Zap,
    gradient: "from-primary to-gold",
    stats: {
      return: "+52%",
      drawdown: "12%",
      winRate: "68%",
      profitFactor: "2.1",
      avgTrade: "+18 pips",
      tradingDays: "240+",
    },
    strategy: [
      "Multi-timeframe momentum analysis (H1, H4, D1)",
      "Smart money concept integration",
      "Dynamic position sizing based on volatility",
      "Automated trailing stop management",
    ],
    pairs: ["EUR/USD", "GBP/USD", "USD/JPY", "AUD/USD"],
    timeframe: "H1 / H4",
    minCapital: "$1,000",
    recommendedCapital: "$5,000+",
    suitableFor: [
      "Traders seeking higher returns",
      "Those comfortable with moderate volatility",
      "Accounts with $1,000+ capital",
      "Medium to long-term investors",
    ],
    notSuitableFor: [
      "Very conservative investors",
      "Those needing immediate liquidity",
      "Accounts under $500",
    ],
  },
  zb: {
    name: "Trade2live ZB$",
    fullName: "Zero-Based Risk",
    tagline: "Conservative approach for steady growth",
    description: "ZB$ employs a zero-based risk approach with ultra-conservative position sizing designed for capital preservation and steady, reliable returns.",
    icon: Shield,
    gradient: "from-profit to-chart",
    stats: {
      return: "+38%",
      drawdown: "8%",
      winRate: "72%",
      profitFactor: "2.4",
      avgTrade: "+12 pips",
      tradingDays: "280+",
    },
    strategy: [
      "Mean reversion with support/resistance",
      "Risk-first position management",
      "Multiple confirmation signals required",
      "Conservative profit-taking approach",
    ],
    pairs: ["EUR/USD", "GBP/USD", "USD/CHF"],
    timeframe: "H4 / D1",
    minCapital: "$500",
    recommendedCapital: "$3,000+",
    suitableFor: [
      "Conservative investors",
      "Those prioritizing capital preservation",
      "Smaller accounts ($500+)",
      "Long-term passive income seekers",
    ],
    notSuitableFor: [
      "Those seeking aggressive returns",
      "Short-term profit seekers",
      "High-risk tolerance traders",
    ],
  },
};

const EADetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const ea = eaData[id as keyof typeof eaData];

  if (!ea) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <p>EA not found</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-dark" />
        <div className={`absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r ${ea.gradient} opacity-10 rounded-full blur-[150px]`} />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <div className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${ea.gradient} flex items-center justify-center mb-6`}>
              <ea.icon className="w-10 h-10 text-primary-foreground" />
            </div>

            <h1 className="font-heading text-4xl md:text-6xl font-bold mb-2">{ea.name}</h1>
            <p className="text-xl text-primary mb-4">{ea.fullName}</p>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl">{ea.description}</p>

            <div className="flex flex-wrap gap-4">
              <Link to="/pricing">
                <Button variant="gold" size="xl" className="group">
                  Get Started
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/performance">
                <Button variant="glass" size="xl">
                  View Live Performance
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {Object.entries(ea.stats).map(([key, value], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="stat-card text-center"
              >
                <div className={`font-heading text-2xl md:text-3xl font-bold ${
                  key === 'return' ? 'text-profit' : 
                  key === 'drawdown' ? 'text-primary' : 
                  'text-foreground'
                }`}>
                  {value}
                </div>
                <div className="text-xs text-muted-foreground capitalize mt-1">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Strategy */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading text-2xl font-bold mb-6 flex items-center gap-3">
                <Target className="w-6 h-6 text-primary" />
                Trading Strategy
              </h2>
              <div className="stat-card">
                <ul className="space-y-4">
                  {ea.strategy.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs text-primary font-bold">{index + 1}</span>
                      </div>
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Trading Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading text-2xl font-bold mb-6 flex items-center gap-3">
                <Clock className="w-6 h-6 text-primary" />
                Trading Parameters
              </h2>
              <div className="stat-card space-y-4">
                <div className="flex justify-between py-3 border-b border-border">
                  <span className="text-muted-foreground">Currency Pairs</span>
                  <span className="font-medium">{ea.pairs.join(", ")}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-border">
                  <span className="text-muted-foreground">Timeframe</span>
                  <span className="font-medium">{ea.timeframe}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-border">
                  <span className="text-muted-foreground">Minimum Capital</span>
                  <span className="font-medium">{ea.minCapital}</span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="text-muted-foreground">Recommended Capital</span>
                  <span className="font-medium text-profit">{ea.recommendedCapital}</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Suitable For */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading text-2xl font-bold mb-6 flex items-center gap-3">
                <Users className="w-6 h-6 text-profit" />
                Suitable For
              </h2>
              <div className="stat-card">
                <ul className="space-y-3">
                  {ea.suitableFor.map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-profit flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading text-2xl font-bold mb-6 flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-loss" />
                Not Suitable For
              </h2>
              <div className="stat-card">
                <ul className="space-y-3">
                  {ea.notSuitableFor.map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <XCircle className="w-5 h-5 text-loss flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Ready to Start with <span className="text-gradient-gold">{ea.name}</span>?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Choose a subscription plan and start automated trading today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/pricing">
              <Button variant="gold" size="xl">View Pricing</Button>
            </Link>
            <Link to="/contact">
              <Button variant="glass" size="xl">Ask Questions</Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default EADetailPage;
