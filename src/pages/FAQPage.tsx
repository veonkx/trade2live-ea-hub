import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, MessageCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const FAQPage = () => {
  const { t } = useLanguage();

  const faqCategories = [
    {
      titleKey: "faq.categories.general.title",
      faqs: [
        { questionKey: "faq.categories.general.q1.question", answerKey: "faq.categories.general.q1.answer" },
        { questionKey: "faq.categories.general.q2.question", answerKey: "faq.categories.general.q2.answer" },
        { questionKey: "faq.categories.general.q3.question", answerKey: "faq.categories.general.q3.answer" },
      ],
    },
    {
      titleKey: "faq.categories.capital.title",
      faqs: [
        { questionKey: "faq.categories.capital.q1.question", answerKey: "faq.categories.capital.q1.answer" },
        { questionKey: "faq.categories.capital.q2.question", answerKey: "faq.categories.capital.q2.answer" },
        { questionKey: "faq.categories.capital.q3.question", answerKey: "faq.categories.capital.q3.answer" },
      ],
    },
    {
      titleKey: "faq.categories.technical.title",
      faqs: [
        { questionKey: "faq.categories.technical.q1.question", answerKey: "faq.categories.technical.q1.answer" },
        { questionKey: "faq.categories.technical.q2.question", answerKey: "faq.categories.technical.q2.answer" },
        { questionKey: "faq.categories.technical.q3.question", answerKey: "faq.categories.technical.q3.answer" },
      ],
    },
    {
      titleKey: "faq.categories.subscription.title",
      faqs: [
        { questionKey: "faq.categories.subscription.q1.question", answerKey: "faq.categories.subscription.q1.answer" },
        { questionKey: "faq.categories.subscription.q2.question", answerKey: "faq.categories.subscription.q2.answer" },
        { questionKey: "faq.categories.subscription.q3.question", answerKey: "faq.categories.subscription.q3.answer" },
      ],
    },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-dark" />
        <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-primary/10 rounded-full blur-[150px]" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
              {t("faq.label")}
            </span>
            <h1 className="font-heading text-4xl md:text-6xl font-bold mb-4">
              {t("faq.title")} <span className="text-gradient-gold">{t("faq.titleHighlight")}</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              {t("faq.description")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {faqCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.titleKey}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: categoryIndex * 0.1 }}
                className="mb-12"
              >
                <div className="flex items-center gap-3 mb-6">
                  <HelpCircle className="w-6 h-6 text-primary" />
                  <h2 className="font-heading text-2xl font-bold">{t(category.titleKey)}</h2>
                </div>

                <Accordion type="single" collapsible className="space-y-4">
                  {category.faqs.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`${categoryIndex}-${index}`}
                      className="stat-card border-none"
                    >
                      <AccordionTrigger className="hover:no-underline text-left font-medium">
                        {t(faq.questionKey)}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pt-2">
                        {t(faq.answerKey)}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4 text-center">
          <MessageCircle className="w-16 h-16 text-primary mx-auto mb-6" />
          <h2 className="font-heading text-3xl font-bold mb-4">
            {t("faq.stillHaveQuestions.title")}
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            {t("faq.stillHaveQuestions.description")}
          </p>
          <Link to="/contact">
            <Button variant="gold" size="xl">{t("faq.stillHaveQuestions.button")}</Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default FAQPage;