import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { Server, Shield, Zap, Clock, Globe, Headphones, CheckCircle, Loader2 } from "lucide-react";

interface VPSPlan {
  id: string;
  name: string;
  price_usd: number;
  price_lak: number;
  price_3m_usd: number;
  price_3m_lak: number;
  price_6m_usd: number;
  price_6m_lak: number;
  price_12m_usd: number;
  price_12m_lak: number;
  ram: string;
  cpu: string;
  storage: string;
  mt_accounts: number;
  os_type: string;
  is_popular: boolean;
}

type DurationOption = '1m' | '3m' | '6m' | '12m';

const VPSServicePage = () => {
  const { language } = useLanguage();
  const isLao = language === 'lo';
  const [plans, setPlans] = useState<VPSPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDuration, setSelectedDuration] = useState<DurationOption>('1m');

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const { data, error } = await supabase
        .from("vps_plans")
        .select("*")
        .eq("is_active", true)
        .order("sort_order", { ascending: true });

      if (error) throw error;
      setPlans(data || []);
    } catch (error) {
      console.error("Error fetching VPS plans:", error);
    } finally {
      setLoading(false);
    }
  };

  const durationOptions: { value: DurationOption; label: string; labelLao: string; discount?: string }[] = [
    { value: '1m', label: '1 Month', labelLao: '1 ເດືອນ' },
    { value: '3m', label: '3 Months', labelLao: '3 ເດືອນ', discount: '-5%' },
    { value: '6m', label: '6 Months', labelLao: '6 ເດືອນ', discount: '-10%' },
    { value: '12m', label: '1 Year', labelLao: '1 ປີ', discount: '-15%' },
  ];

  const getPrice = (plan: VPSPlan) => {
    switch (selectedDuration) {
      case '3m':
        return isLao ? plan.price_3m_lak : plan.price_3m_usd;
      case '6m':
        return isLao ? plan.price_6m_lak : plan.price_6m_usd;
      case '12m':
        return isLao ? plan.price_12m_lak : plan.price_12m_usd;
      default:
        return isLao ? plan.price_lak : plan.price_usd;
    }
  };

  const formatPrice = (plan: VPSPlan) => {
    const price = getPrice(plan);
    if (isLao) {
      return `₭${price.toLocaleString()}`;
    }
    return `$${price}`;
  };

  const getDurationLabel = () => {
    const option = durationOptions.find(o => o.value === selectedDuration);
    if (!option) return '';
    return isLao ? option.labelLao : option.label;
  };

  const features = [
    {
      icon: Server,
      title: isLao ? "Server ຄຸນນະພາບສູງ" : "High-Quality Servers",
      description: isLao 
        ? "Server ທີ່ມີ uptime 99.9% ແລະ latency ຕ່ຳ ເໝາະສຳລັບ run EA ຕະຫຼອດ 24/7"
        : "Servers with 99.9% uptime and low latency, perfect for running EA 24/7"
    },
    {
      icon: Zap,
      title: isLao ? "ຄວາມໄວສູງ" : "High Speed",
      description: isLao
        ? "ການເຊື່ອມຕໍ່ທີ່ວ່ອງໄວ ແລະ ໝັ້ນຄົງ ບໍ່ພາດທຸກໂອກາດໃນການເທຣດ"
        : "Fast and stable connections, never miss any trading opportunities"
    },
    {
      icon: Shield,
      title: isLao ? "ຄວາມປອດໄພສູງສຸດ" : "Maximum Security",
      description: isLao
        ? "ການເຂົ້າລະຫັດຂໍ້ມູນລະດັບສູງ ປົກປ້ອງຂໍ້ມູນການເທຣດຂອງທ່ານ"
        : "High-level encryption to protect your trading data"
    },
    {
      icon: Clock,
      title: isLao ? "ເຮັດວຽກ 24/7" : "24/7 Operation",
      description: isLao
        ? "Server ເຮັດວຽກຕະຫຼອດເວລາ ບໍ່ຈຳເປັນຕ້ອງເປີດຄອມພິວເຕີຕະຫຼອດ"
        : "Server runs continuously, no need to keep your computer on"
    },
    {
      icon: Globe,
      title: isLao ? "ຫຼາຍໂລເຄຊັນ" : "Multiple Locations",
      description: isLao
        ? "ເລືອກ Server ທີ່ໃກ້ກັບ Broker ຂອງທ່ານເພື່ອ latency ທີ່ຕ່ຳທີ່ສຸດ"
        : "Choose server closest to your broker for lowest latency"
    },
    {
      icon: Headphones,
      title: isLao ? "ຊັບພອດຕະຫຼອດ 24 ຊມ." : "24/7 Support",
      description: isLao
        ? "ທີມງານພ້ອມຊ່ວຍເຫຼືອທ່ານຕະຫຼອດເວລາ"
        : "Our team is ready to assist you anytime"
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Server className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">VPS Service</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">
                {isLao ? "VPS Server ສຳລັບ EA" : "VPS Server for EA"}
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              {isLao 
                ? "ບໍລິການເຊົ່າ Server ຄຸນນະພາບສູງ ສຳລັບ run EA ຂອງທ່ານຕະຫຼອດ 24/7 ດ້ວຍຄວາມໝັ້ນຄົງ ແລະ ຄວາມປອດໄພສູງສຸດ"
                : "High-quality server rental service for running your EA 24/7 with maximum stability and security"}
            </p>
            <Button variant="gold" size="lg" asChild>
              <Link to="/contact">
                {isLao ? "ສົນໃຈບໍລິການ" : "Get Started"}
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {isLao ? "ເປັນຫຍັງຕ້ອງໃຊ້ບໍລິການຂອງເຮົາ?" : "Why Choose Our Service?"}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {isLao 
                ? "ເຮົາໃຫ້ບໍລິການ Server ຄຸນນະພາບສູງ ພ້ອມຟີເຈີຄົບຄັນ"
                : "We provide high-quality servers with comprehensive features"}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-xl bg-background border border-border hover:border-primary/50 transition-all duration-300"
              >
                <feature.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {isLao ? "ແພັກເກັດບໍລິການ" : "Service Packages"}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              {isLao 
                ? "ເລືອກແພັກເກັດທີ່ເໝາະກັບຄວາມຕ້ອງການຂອງທ່ານ"
                : "Choose the package that suits your needs"}
            </p>

            {/* Duration Selector */}
            <div className="inline-flex flex-wrap justify-center gap-2 p-2 rounded-xl bg-card border border-border">
              {durationOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSelectedDuration(option.value)}
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    selectedDuration === option.value
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {isLao ? option.labelLao : option.label}
                  {option.discount && (
                    <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded ${
                      selectedDuration === option.value
                        ? 'bg-primary-foreground/20 text-primary-foreground'
                        : 'bg-chart-2/20 text-chart-2'
                    }`}>
                      {option.discount}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </motion.div>

          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {plans.map((plan, index) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative p-6 rounded-2xl border ${
                    plan.is_popular 
                      ? "border-primary bg-primary/5" 
                      : "border-border bg-card"
                  }`}
                >
                  {plan.is_popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary rounded-full text-xs font-semibold text-primary-foreground">
                      {isLao ? "ແນະນຳ" : "Popular"}
                    </div>
                  )}
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-bold text-primary">{formatPrice(plan)}</span>
                      <span className="text-muted-foreground">/{getDurationLabel()}</span>
                    </div>
                  </div>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">RAM</span>
                      <span className="font-semibold">{plan.ram}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">CPU</span>
                      <span className="font-semibold">{plan.cpu}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Storage</span>
                      <span className="font-semibold">{plan.storage}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">OS</span>
                      <span className="font-semibold text-right text-xs">{plan.os_type}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">MT4/MT5</span>
                      <span className="font-semibold">{plan.mt_accounts}</span>
                    </div>
                  </div>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-chart-2" />
                      <span>Remote Desktop</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-chart-2" />
                      <span>{isLao ? "ຊັບພອດ 24/7" : "24/7 Support"}</span>
                    </li>
                  </ul>
                  <Button 
                    variant={plan.is_popular ? "gold" : "outline"} 
                    className="w-full"
                    asChild
                  >
                    <Link to="/contact">
                      {isLao ? "ສະໝັກໃຊ້ງານ" : "Subscribe"}
                    </Link>
                  </Button>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {isLao ? "ພ້ອມເລີ່ມຕົ້ນໃຊ້ງານບໍ?" : "Ready to Get Started?"}
            </h2>
            <p className="text-muted-foreground mb-8">
              {isLao 
                ? "ຕິດຕໍ່ເຮົາມື້ນີ້ເພື່ອຮັບຄຳປຶກສາຟຣີ ແລະ ເລີ່ມຕົ້ນ run EA ຂອງທ່ານເທິງ Server ຄຸນນະພາບສູງ"
                : "Contact us today for free consultation and start running your EA on high-quality servers"}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="gold" size="lg" asChild>
                <Link to="/contact">
                  {isLao ? "ຕິດຕໍ່ເຮົາ" : "Contact Us"}
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/faq">
                  {isLao ? "ຄຳຖາມທີ່ພົບເລື້ອຍ" : "FAQ"}
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default VPSServicePage;