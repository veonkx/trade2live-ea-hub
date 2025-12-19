import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { TrendingUp, BarChart3, Calendar, Target, Activity, RefreshCw } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

interface PerformanceStats {
  ea_type: string;
  name: string;
  total_return: string;
  monthly_avg: string;
  max_drawdown: string;
  win_rate: string;
  profit_factor: string;
  total_trades: string;
  trading_days: string;
  sharpe_ratio: string;
  status: string;
  start_date: string;
  last_updated_at: string;
  color: string;
}

interface MonthlyReturn {
  ea_type: string;
  year: number;
  month: number;
  return_percent: number;
}

// Fallback data
const fallbackStats: Record<string, PerformanceStats> = {
  icf: {
    ea_type: "icf",
    name: "Trade2live ICF$",
    total_return: "+52.4%",
    monthly_avg: "+4.37%",
    max_drawdown: "-12.3%",
    win_rate: "68%",
    profit_factor: "2.1",
    total_trades: "847",
    trading_days: "248",
    sharpe_ratio: "1.82",
    color: "#d4a017",
    status: "Live",
    start_date: "2024-01-01",
    last_updated_at: new Date().toISOString(),
  },
  zb: {
    ea_type: "zb",
    name: "Trade2live ZB$",
    total_return: "+38.2%",
    monthly_avg: "+3.18%",
    max_drawdown: "-8.1%",
    win_rate: "72%",
    profit_factor: "2.4",
    total_trades: "623",
    trading_days: "284",
    sharpe_ratio: "2.14",
    color: "#22c55e",
    status: "Live",
    start_date: "2024-01-01",
    last_updated_at: new Date().toISOString(),
  },
};

const PerformancePage = () => {
  const { t } = useLanguage();
  const [portfolioStats, setPortfolioStats] = useState<Record<string, PerformanceStats>>(fallbackStats);
  const [monthlyData, setMonthlyData] = useState<{ month: string; icf: number; zb: number }[]>([]);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPerformanceData();
  }, []);

  const fetchPerformanceData = async () => {
    try {
      // Fetch stats
      const { data: statsData } = await supabase
        .from("ea_performance_stats")
        .select("*");

      if (statsData && statsData.length > 0) {
        const statsMap: Record<string, PerformanceStats> = {};
        statsData.forEach((stat) => {
          statsMap[stat.ea_type] = {
            ...stat,
            color: stat.ea_type === 'icf' ? '#d4a017' : '#22c55e',
          };
        });
        setPortfolioStats(statsMap);
        
        // Get latest update time
        const latestUpdate = statsData.reduce((latest, stat) => {
          return new Date(stat.last_updated_at) > new Date(latest) ? stat.last_updated_at : latest;
        }, statsData[0].last_updated_at);
        setLastUpdated(latestUpdate);
      }

      // Fetch monthly returns
      const { data: monthlyReturnsData } = await supabase
        .from("ea_monthly_returns")
        .select("*")
        .order("year")
        .order("month");

      if (monthlyReturnsData && monthlyReturnsData.length > 0) {
        // Group by month and create chart data
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const monthlyMap: Record<string, { icf: number; zb: number }> = {};
        
        monthlyReturnsData.forEach((m) => {
          const key = `${m.year}-${m.month}`;
          if (!monthlyMap[key]) {
            monthlyMap[key] = { icf: 0, zb: 0 };
          }
          monthlyMap[key][m.ea_type as 'icf' | 'zb'] = Number(m.return_percent);
        });

        const chartData = Object.entries(monthlyMap)
          .sort(([a], [b]) => a.localeCompare(b))
          .slice(-12) // Last 12 months
          .map(([key, values]) => {
            const [year, month] = key.split('-');
            return {
              month: monthNames[parseInt(month) - 1],
              icf: values.icf,
              zb: values.zb,
            };
          });

        setMonthlyData(chartData);
      }
    } catch (error) {
      console.error("Error fetching performance data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Generate equity data based on monthly returns
  const equityData = (() => {
    let icfEquity = 10000;
    let zbEquity = 10000;
    const data = [{ day: 0, icf: 10000, zb: 10000 }];
    
    monthlyData.forEach((m, i) => {
      icfEquity = icfEquity * (1 + m.icf / 100);
      zbEquity = zbEquity * (1 + m.zb / 100);
      data.push({
        day: (i + 1) * 30,
        icf: Math.round(icfEquity),
        zb: Math.round(zbEquity),
      });
    });
    
    return data.length > 1 ? data : [
      { day: 0, icf: 10000, zb: 10000 },
      { day: 365, icf: 15920, zb: 14210 },
    ];
  })();

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <RefreshCw className="w-8 h-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

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
              {t("performance.label")}
            </span>
            <h1 className="font-heading text-4xl md:text-6xl font-bold mb-4">
              {t("performance.title")} <span className="text-gradient-gold">{t("performance.titleHighlight")}</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              {t("performance.description")}
            </p>
            {lastUpdated && (
              <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
                <Calendar className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">
                  อัพเดทล่าสุด: {format(new Date(lastUpdated), 'dd/MM/yyyy')}
                </span>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Portfolio Overview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {Object.entries(portfolioStats).map(([key, stats]: [string, PerformanceStats], index) => (
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
                    <div className="font-heading text-3xl font-bold text-profit">{stats.total_return}</div>
                    <div className="text-sm text-muted-foreground">{t("performance.totalReturn")}</div>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4">
                  <div className="text-center p-3 rounded-lg bg-background/50">
                    <div className="font-heading text-lg font-bold">{stats.monthly_avg}</div>
                    <div className="text-xs text-muted-foreground">{t("performance.monthlyAvg")}</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-background/50">
                    <div className="font-heading text-lg font-bold text-primary">{stats.max_drawdown}</div>
                    <div className="text-xs text-muted-foreground">{t("performance.maxDD")}</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-background/50">
                    <div className="font-heading text-lg font-bold">{stats.win_rate}</div>
                    <div className="text-xs text-muted-foreground">{t("performance.winRate")}</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-background/50">
                    <div className="font-heading text-lg font-bold">{stats.profit_factor}</div>
                    <div className="text-xs text-muted-foreground">{t("performance.profitFactor")}</div>
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
              {t("performance.equityCurve")}
            </h2>
            <p className="text-muted-foreground">{t("performance.startingBalance")}</p>
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
              {t("performance.monthlyReturns")}
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
              {t("performance.detailedStats")}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {Object.entries(portfolioStats).map(([key, stats]: [string, PerformanceStats], index) => (
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
                    { labelKey: "performance.stats.totalReturn", value: stats.total_return },
                    { labelKey: "performance.stats.monthlyAverage", value: stats.monthly_avg },
                    { labelKey: "performance.stats.maxDrawdown", value: stats.max_drawdown },
                    { labelKey: "performance.stats.winRate", value: stats.win_rate },
                    { labelKey: "performance.stats.profitFactor", value: stats.profit_factor },
                    { labelKey: "performance.stats.totalTrades", value: stats.total_trades },
                    { labelKey: "performance.stats.tradingDays", value: stats.trading_days },
                    { labelKey: "performance.stats.sharpeRatio", value: stats.sharpe_ratio },
                  ].map((item) => (
                    <div key={item.labelKey} className="flex justify-between py-2 border-b border-border last:border-0">
                      <span className="text-muted-foreground">{t(item.labelKey)}</span>
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
            <h3 className="font-heading text-xl font-bold mb-2">{t("performance.myfxbook.title")}</h3>
            <p className="text-muted-foreground mb-6">
              {t("performance.myfxbook.description")}
            </p>
            <Button variant="gold-outline">
              {t("performance.myfxbook.button")}
            </Button>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl font-bold mb-4">
            {t("performance.cta.title")} <span className="text-gradient-gold">{t("performance.cta.titleHighlight")}</span>
          </h2>
          <p className="text-muted-foreground mb-8">
            {t("performance.cta.description")}
          </p>
          <Link to="/pricing">
            <Button variant="gold" size="xl">{t("performance.cta.button")}</Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default PerformancePage;