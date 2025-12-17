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

const faqCategories = [
  {
    title: "General Questions",
    faqs: [
      {
        question: "EA (Expert Advisor) คืออะไร?",
        answer: "Expert Advisor (EA) คือโปรแกรมที่ใช้ในการเทรด Forex อัตโนมัติบนแพลตฟอร์ม MetaTrader (MT4/MT5) EA จะวิเคราะห์ตลาดและทำการเปิด-ปิดออเดอร์โดยอัตโนมัติตามกลยุทธ์ที่ถูกโปรแกรมไว้ โดยไม่ต้องใช้การตัดสินใจจากมนุษย์",
      },
      {
        question: "Trade2live EA แตกต่างจาก EA อื่นอย่างไร?",
        answer: "Trade2live EA ถูกออกแบบมาโดยเน้นการบริหารความเสี่ยงเป็นหลัก (Risk-First Approach) ซึ่งต่างจาก EA ส่วนใหญ่ที่เน้นกำไรสูงสุด ระบบของเรามี Maximum Drawdown ต่ำ และผลลัพธ์ทุกอย่างถูกยืนยันผ่าน Myfxbook อย่างโปร่งใส",
      },
      {
        question: "ต้องมีความรู้เรื่อง Forex มากแค่ไหน?",
        answer: "คุณไม่จำเป็นต้องเป็นผู้เชี่ยวชาญ Forex เราจะมี Setup Guide และทีม Support คอยช่วยเหลือในการติดตั้ง อย่างไรก็ตาม ความเข้าใจพื้นฐานเกี่ยวกับความเสี่ยงในการลงทุนเป็นสิ่งสำคัญ",
      },
    ],
  },
  {
    title: "Capital & Investment",
    faqs: [
      {
        question: "ต้องใช้เงินทุนเท่าไรในการเริ่มต้น?",
        answer: "สำหรับ ZB$ แนะนำเงินทุนขั้นต่ำ $500 (ประมาณ 17,500 บาท) และสำหรับ ICF$ แนะนำขั้นต่ำ $1,000 (ประมาณ 35,000 บาท) เงินทุนที่แนะนำสำหรับผลลัพธ์ที่ดีที่สุดคือ $3,000-5,000 ขึ้นไป",
      },
      {
        question: "Drawdown คืออะไร?",
        answer: "Drawdown คือการวัดการลดลงของบัญชีจากจุดสูงสุดไปยังจุดต่ำสุดก่อนที่จะฟื้นตัว เป็นตัวชี้วัดความเสี่ยงที่สำคัญ ตัวอย่างเช่น หากบัญชีมี $10,000 แล้วลดลงเหลือ $8,500 ก่อนจะกลับมา แสดงว่า Drawdown คือ 15%",
      },
      {
        question: "รับประกันกำไรหรือไม่?",
        answer: "ไม่ การลงทุนในตลาด Forex มีความเสี่ยง เราไม่รับประกันผลกำไรใดๆ ผลการดำเนินงานในอดีตไม่ได้เป็นตัวบ่งชี้ผลลัพธ์ในอนาคต เราแสดงข้อมูลที่ตรวจสอบได้เพื่อให้คุณตัดสินใจอย่างมีข้อมูล",
      },
    ],
  },
  {
    title: "Technical Requirements",
    faqs: [
      {
        question: "ใช้กับโบรกเกอร์ไหนได้บ้าง?",
        answer: "EA ของเราทำงานได้กับโบรกเกอร์ที่รองรับ MT4 หรือ MT5 เกือบทุกเจ้า โบรกเกอร์ที่แนะนำได้แก่ XM, IC Markets, Pepperstone, Exness โดยควรเลือกโบรกเกอร์ที่มี Spread ต่ำและ Execution รวดเร็ว",
      },
      {
        question: "จำเป็นต้องใช้ VPS หรือไม่?",
        answer: "แนะนำอย่างยิ่งให้ใช้ VPS (Virtual Private Server) เพื่อให้ EA ทำงานได้ 24/7 โดยไม่หยุดชะงัก VPS ช่วยลดปัญหาเรื่องไฟฟ้าดับ อินเทอร์เน็ตขาด และทำให้การเทรดมีความต่อเนื่อง ค่าใช้จ่าย VPS เริ่มต้นประมาณ $5-20/เดือน",
      },
      {
        question: "ใช้ได้กี่บัญชี?",
        answer: "แพ็คเกจ Individual EA สามารถใช้ได้ 1 บัญชี MT4/MT5 ต่อ License หากต้องการใช้หลายบัญชี สามารถซื้อ License เพิ่มเติมหรือเลือกแพ็คเกจ Bundle ที่ได้ 2 บัญชี",
      },
    ],
  },
  {
    title: "Subscription & Support",
    faqs: [
      {
        question: "มีนโยบายคืนเงินหรือไม่?",
        answer: "เนื่องจาก EA เป็นผลิตภัณฑ์ดิจิทัล เราไม่มีนโยบายคืนเงินหลังจากส่งมอบ License อย่างไรก็ตาม คุณสามารถติดต่อเราก่อนซื้อเพื่อสอบถามข้อมูลเพิ่มเติมและดูผลการดำเนินงานจริงได้",
      },
      {
        question: "EA มีการอัปเดตบ่อยแค่ไหน?",
        answer: "เราทำการอัปเดต EA เป็นประจำเมื่อมีการปรับปรุงกลยุทธ์หรือแก้ไขบัก ผู้ใช้งานจะได้รับแจ้งเตือนเมื่อมี Version ใหม่ และสามารถดาวน์โหลดได้ฟรีตลอดอายุ Subscription",
      },
      {
        question: "ต่ออายุ Subscription อย่างไร?",
        answer: "เราจะแจ้งเตือนล่วงหน้า 7 วันก่อนหมดอายุ คุณสามารถต่ออายุผ่านทางเว็บไซต์หรือติดต่อทีม Support โดยตรง หากไม่ต่ออายุ EA จะหยุดทำงานเมื่อ License หมดอายุ",
      },
    ],
  },
];

const FAQPage = () => {
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
              FAQ
            </span>
            <h1 className="font-heading text-4xl md:text-6xl font-bold mb-4">
              Frequently Asked <span className="text-gradient-gold">Questions</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Find answers to common questions about our EA trading systems.
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
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: categoryIndex * 0.1 }}
                className="mb-12"
              >
                <div className="flex items-center gap-3 mb-6">
                  <HelpCircle className="w-6 h-6 text-primary" />
                  <h2 className="font-heading text-2xl font-bold">{category.title}</h2>
                </div>

                <Accordion type="single" collapsible className="space-y-4">
                  {category.faqs.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`${categoryIndex}-${index}`}
                      className="stat-card border-none"
                    >
                      <AccordionTrigger className="hover:no-underline text-left font-medium">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pt-2">
                        {faq.answer}
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
            Still Have Questions?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Can't find what you're looking for? Our support team is here to help.
          </p>
          <Link to="/contact">
            <Button variant="gold" size="xl">Contact Support</Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default FAQPage;
