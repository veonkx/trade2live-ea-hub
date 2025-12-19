import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Server, Shield, Zap, Clock, Globe, Headphones, CheckCircle } from "lucide-react";

const VPSServicePage = () => {
  const { language } = useLanguage();
  const isLao = language === 'lo';

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

  const plans = [
    {
      name: "Basic",
      price: isLao ? "₭150,000" : "$15",
      period: isLao ? "/ເດືອນ" : "/month",
      specs: [
        { label: "RAM", value: "2 GB" },
        { label: "CPU", value: "1 Core" },
        { label: "Storage", value: "30 GB SSD" },
        { label: "MT4/MT5", value: "1" },
      ],
      popular: false,
    },
    {
      name: "Standard",
      price: isLao ? "₭250,000" : "$25",
      period: isLao ? "/ເດືອນ" : "/month",
      specs: [
        { label: "RAM", value: "4 GB" },
        { label: "CPU", value: "2 Cores" },
        { label: "Storage", value: "50 GB SSD" },
        { label: "MT4/MT5", value: "2" },
      ],
      popular: true,
    },
    {
      name: "Pro",
      price: isLao ? "₭450,000" : "$45",
      period: isLao ? "/ເດືອນ" : "/month",
      specs: [
        { label: "RAM", value: "8 GB" },
        { label: "CPU", value: "4 Cores" },
        { label: "Storage", value: "100 GB SSD" },
        { label: "MT4/MT5", value: "4" },
      ],
      popular: false,
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
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {isLao 
                ? "ເລືອກແພັກເກັດທີ່ເໝາະກັບຄວາມຕ້ອງການຂອງທ່ານ"
                : "Choose the package that suits your needs"}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative p-6 rounded-2xl border ${
                  plan.popular 
                    ? "border-primary bg-primary/5" 
                    : "border-border bg-card"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary rounded-full text-xs font-semibold text-primary-foreground">
                    {isLao ? "ແນະນຳ" : "Popular"}
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold text-primary">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                </div>
                <div className="space-y-3 mb-6">
                  {plan.specs.map((spec) => (
                    <div key={spec.label} className="flex items-center justify-between">
                      <span className="text-muted-foreground">{spec.label}</span>
                      <span className="font-semibold">{spec.value}</span>
                    </div>
                  ))}
                </div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-chart-2" />
                    <span>{isLao ? "ຮອງຮັບ Windows" : "Windows Support"}</span>
                  </li>
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
                  variant={plan.popular ? "gold" : "outline"} 
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
