import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const testimonials = [
  {
    name: "ສົມໄຊ ກ.",
    role: "Trader, 3 ປີ",
    content: "ໃຊ້ ICF$ ມາ 8 ເດືອນ ຜົນຕອບແທນສະໝ່ຳສະເໝີຫຼາຍ Drawdown ຕ່ຳກວ່າທີ່ຄາດໄວ້ ປະທັບໃຈໃນລະບົບ Risk Management",
    rating: 5,
  },
  {
    name: "ວິພາ ສ.",
    role: "ນັກລົງທຶນ",
    content: "ເລີ່ມຈາກ Demo ແລ້ວເຫັນຜົນຈິງ ຕັດສິນໃຈໃຊ້ Real Account ລະບົບ ZB$ ເໝາະກັບຄົນຢ້ານຄວາມສ່ຽງແບບເຮົາຫຼາຍ",
    rating: 5,
  },
  {
    name: "ທະນະພົນ ມ.",
    role: "Full-time Trader",
    content: "Support ດີຫຼາຍ ຕອບໄວແລະຊ່ວຍເຫຼືອເລື່ອງ Setup ທຸກຢ່າງ EA ເຮັດວຽກໄດ້ຕາມທີ່ໂຄສະນາໄວ້ຄັບ",
    rating: 5,
  },
];

export const TestimonialsSection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-dark" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[150px]" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
            {t("testimonials.tagline")}
          </span>
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">
            {t("testimonials.title")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("testimonials.description")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="stat-card relative"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-primary/20" />
              
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>

              {/* Content */}
              <p className="text-foreground mb-6 leading-relaxed">"{testimonial.content}"</p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center text-primary-foreground font-bold">
                  {testimonial.name[0]}
                </div>
                <div>
                  <div className="font-medium">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
