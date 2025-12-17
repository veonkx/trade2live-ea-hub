import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { TrendingUp, TrendingDown, BarChart3, Calendar, Target, Activity } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";

const monthlyData = [
  { month: "Jan", icf: 4.2, zb: 3.1 },
  { month: "Feb", icf: 3.8, zb: 2.9 },
  { month: "Mar", icf: 5.1, zb: 3.5 },
  { month: "Apr", icf: -1.2, zb: 0.8 },
  { month: "May", icf: 4.5, zb: 3.2 },
  { month: "Jun", icf: 3.9, zb: 2.8 },
  { month: "Jul", icf: 5.8, zb: 3.9 },
  { month: "Aug", icf: 4.1, zb: 3.0 },
  { month: "Sep", icf: 3.2, zb: 2.5 },
  { month: "Oct", icf: 4.7, zb: 3.4 },
  { month: "Nov", icf: 5.2, zb: 3.7 },
  { month: "Dec", icf: 4.0, zb: 3.0 },
];

const equityData = [
  { day: 0, icf: 10000, zb: 10000 },
  { day: 30, icf: 10420, zb: 10310 },
  { day: 60, icf: 10830, zb: 10610 },
  { day: 90, icf: 11390, zb: 10980 },
  { day: 120, icf: 11250, zb: 11070 },
  { day: 150, icf: 11760, zb: 11420 },
  { day: 180, icf: 12220, zb: 11740 },
  { day: 210, icf: 12930, zb: 12200 },
  { day: 240, icf: 13460, zb: 12560 },
  { day: 270, icf: 13890, zb: 12870 },
  { day: 300, icf: 14550, zb: 13310 },
  { day: 330, icf: 15310, zb: 13800 },
  { day: 365, icf: 15920, zb: 14210 },
];

const portfolioStats = {
  icf: {
    name: "Trade2live ICF$",
    totalReturn: "+52.4%",
    monthlyAvg: "+4.37%",
    maxDrawdown: "-12.3%",
    winRate: "68%",
    profitFactor: "2.1",
    totalTrades: "847",
    tradingDays: "248",
    sharpeRatio: "1.82",
    color: "#d4a017",
    status: "Live",
  },
  zb: {
    name: "Trade2live ZB$",
    totalReturn: "+38.2%",
    monthlyAvg: "+3.18%",
    maxDrawdown: "-8.1%",
    winRate: "72%",
    profitFactor: "2.4",
    totalTrades: "623",
    tradingDays: "284",
    sharpeRatio: "2.14",
    color: "#22c55e",
    status: "Live",
  },
};

const PerformancePage = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-dark" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-profit/10 rounded-full blur-[150px]" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
              Live Performance
            </span>
            <h1 className="font-heading text-4xl md:text-6xl font-bold mb-4">
              Verified <span className="text-gradient-gold">Results</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Real-time performance data from our live trading accounts. 
              All results are tracked and verified through Myfxbook.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Overview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {Object.entries(portfolioStats).map(([key, stats], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="stat-card"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${stats.color}20` }}
                    >
                      <TrendingUp className="w-6 h-6" style={{ color: stats.color }} />
                    </div>
                    <div>
                      <h3 className="font-heading text-xl font-bold">{stats.name}</h3>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-profit animate-pulse" />
                        <span className="text-sm text-muted-foreground">{stats.status}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-heading text-3xl font-bold text-profit">{stats.totalReturn}</div>
                    <div className="text-sm text-muted-foreground">Total Return</div>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4">
                  <div className="text-center p-3 rounded-lg bg-background/50">
                    <div className="font-heading text-lg font-bold">{stats.monthlyAvg}</div>
                    <div className="text-xs text-muted-foreground">Monthly Avg</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-background/50">
                    <div className="font-heading text-lg font-bold text-primary">{stats.maxDrawdown}</div>
                    <div className="text-xs text-muted-foreground">Max DD</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-background/50">
                    <div className="font-heading text-lg font-bold">{stats.winRate}</div>
                    <div className="text-xs text-muted-foreground">Win Rate</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-background/50">
                    <div className="font-heading text-lg font-bold">{stats.profitFactor}</div>
                    <div className="text-xs text-muted-foreground">Profit Factor</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Equity Curve */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="font-heading text-2xl font-bold flex items-center gap-3">
              <Activity className="w-6 h-6 text-primary" />
              Equity Curve (12 Months)
            </h2>
            <p className="text-muted-foreground">Starting balance: $10,000</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="stat-card h-[400px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={equityData}>
                <defs>
                  <linearGradient id="colorIcf" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#d4a017" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#d4a017" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorZb" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a3f5f" />
                <XAxis dataKey="day" stroke="#64748b" tick={{ fill: '#64748b' }} />
                <YAxis stroke="#64748b" tick={{ fill: '#64748b' }} tickFormatter={(value) => `$${(value/1000).toFixed(0)}k`} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0f1729', 
                    border: '1px solid #2a3f5f',
                    borderRadius: '8px'
                  }}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
                />
                <Area type="monotone" dataKey="icf" stroke="#d4a017" fillOpacity={1} fill="url(#colorIcf)" name="ICF$" strokeWidth={2} />
                <Area type="monotone" dataKey="zb" stroke="#22c55e" fillOpacity={1} fill="url(#colorZb)" name="ZB$" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Legend */}
          <div className="flex justify-center gap-8 mt-6">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-gold" />
              <span className="text-sm text-muted-foreground">Trade2live ICF$</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-profit" />
              <span className="text-sm text-muted-foreground">Trade2live ZB$</span>
            </div>
          </div>
        </div>
      </section>

      {/* Monthly Returns */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="font-heading text-2xl font-bold flex items-center gap-3">
              <Calendar className="w-6 h-6 text-primary" />
              Monthly Returns (%)
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="stat-card h-[350px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a3f5f" />
                <XAxis dataKey="month" stroke="#64748b" tick={{ fill: '#64748b' }} />
                <YAxis stroke="#64748b" tick={{ fill: '#64748b' }} tickFormatter={(value) => `${value}%`} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0f1729', 
                    border: '1px solid #2a3f5f',
                    borderRadius: '8px'
                  }}
                  formatter={(value: number) => [`${value}%`, '']}
                />
                <Line type="monotone" dataKey="icf" stroke="#d4a017" strokeWidth={2} dot={{ fill: '#d4a017' }} name="ICF$" />
                <Line type="monotone" dataKey="zb" stroke="#22c55e" strokeWidth={2} dot={{ fill: '#22c55e' }} name="ZB$" />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </section>

      {/* Detailed Stats */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="font-heading text-2xl font-bold flex items-center gap-3">
              <BarChart3 className="w-6 h-6 text-primary" />
              Detailed Statistics
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {Object.entries(portfolioStats).map(([key, stats], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="stat-card"
              >
                <h3 className="font-heading text-xl font-bold mb-6" style={{ color: stats.color }}>
                  {stats.name}
                </h3>
                <div className="space-y-4">
                  {[
                    { label: "Total Return", value: stats.totalReturn },
                    { label: "Monthly Average", value: stats.monthlyAvg },
                    { label: "Max Drawdown", value: stats.maxDrawdown },
                    { label: "Win Rate", value: stats.winRate },
                    { label: "Profit Factor", value: stats.profitFactor },
                    { label: "Total Trades", value: stats.totalTrades },
                    { label: "Trading Days", value: stats.tradingDays },
                    { label: "Sharpe Ratio", value: stats.sharpeRatio },
                  ].map((item) => (
                    <div key={item.label} className="flex justify-between py-2 border-b border-border last:border-0">
                      <span className="text-muted-foreground">{item.label}</span>
                      <span className="font-medium">{item.value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Myfxbook Embed Placeholder */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="stat-card text-center py-12"
          >
            <Target className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="font-heading text-xl font-bold mb-2">Live Myfxbook Verification</h3>
            <p className="text-muted-foreground mb-6">
              View our fully verified live trading results on Myfxbook
            </p>
            <Button variant="gold-outline">
              View on Myfxbook
            </Button>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl font-bold mb-4">
            Start Trading with <span className="text-gradient-gold">Proven Results</span>
          </h2>
          <p className="text-muted-foreground mb-8">
            Join our growing community of successful automated traders.
          </p>
          <Link to="/pricing">
            <Button variant="gold" size="xl">View Pricing</Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default PerformancePage;
