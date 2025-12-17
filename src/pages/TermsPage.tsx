import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { FileText, AlertTriangle } from "lucide-react";

const TermsPage = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-dark" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <FileText className="w-16 h-16 text-primary mx-auto mb-6" />
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
              Terms & Conditions
            </h1>
            <p className="text-muted-foreground">
              Last updated: December 2024
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Risk Warning */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="stat-card bg-destructive/10 border-destructive/30 mb-12"
            >
              <div className="flex gap-4">
                <AlertTriangle className="w-8 h-8 text-destructive flex-shrink-0" />
                <div>
                  <h2 className="font-heading text-xl font-bold text-destructive mb-2">Risk Warning</h2>
                  <p className="text-muted-foreground">
                    Trading forex on margin carries a high level of risk and may not be suitable for all investors. 
                    The high degree of leverage can work against you as well as for you. Before deciding to trade 
                    forex, you should carefully consider your investment objectives, level of experience, and risk 
                    appetite. The possibility exists that you could sustain a loss of some or all of your initial 
                    investment and therefore you should not invest money that you cannot afford to lose.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Terms Sections */}
            <div className="space-y-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-heading text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
                <div className="stat-card">
                  <p className="text-muted-foreground mb-4">
                    By purchasing, downloading, or using any Trade2live Expert Advisor (EA), you agree to be bound 
                    by these Terms and Conditions. If you do not agree to these terms, do not use our products.
                  </p>
                  <p className="text-muted-foreground">
                    We reserve the right to modify these terms at any time. Continued use of our products after 
                    changes constitutes acceptance of the modified terms.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-heading text-2xl font-bold mb-4">2. No Guarantee of Profit</h2>
                <div className="stat-card">
                  <p className="text-muted-foreground mb-4">
                    <strong className="text-foreground">Trade2live does not guarantee any profit or specific financial results.</strong> 
                    Past performance of our EA systems is not indicative of future results. Trading results can vary 
                    significantly based on market conditions, broker selection, capital, and other factors.
                  </p>
                  <p className="text-muted-foreground">
                    All performance data displayed on our website is historical and should not be construed as a 
                    promise or guarantee of future performance.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-heading text-2xl font-bold mb-4">3. License Terms</h2>
                <div className="stat-card">
                  <ul className="space-y-3 text-muted-foreground">
                    <li>• Each EA license is valid for the number of trading accounts specified in your subscription plan</li>
                    <li>• Licenses are non-transferable and cannot be shared, resold, or distributed</li>
                    <li>• Reverse engineering, decompiling, or modifying the EA software is prohibited</li>
                    <li>• License validity is tied to your subscription period</li>
                    <li>• We reserve the right to revoke licenses for violation of these terms</li>
                  </ul>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-heading text-2xl font-bold mb-4">4. Refund Policy</h2>
                <div className="stat-card">
                  <p className="text-muted-foreground mb-4">
                    Due to the digital nature of our products, <strong className="text-foreground">all sales are final 
                    and no refunds will be provided</strong> once the EA license has been delivered and activated.
                  </p>
                  <p className="text-muted-foreground">
                    We encourage all potential customers to review our verified performance data, read testimonials, 
                    and contact our support team with any questions before making a purchase decision.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-heading text-2xl font-bold mb-4">5. Limitation of Liability</h2>
                <div className="stat-card">
                  <p className="text-muted-foreground mb-4">
                    Trade2live shall not be liable for any direct, indirect, incidental, special, consequential, 
                    or punitive damages, including but not limited to:
                  </p>
                  <ul className="space-y-2 text-muted-foreground mb-4">
                    <li>• Trading losses or lost profits</li>
                    <li>• Loss of data or business interruption</li>
                    <li>• Technical issues with brokers or platforms</li>
                    <li>• Market volatility or unexpected events</li>
                    <li>• Any other damages arising from use of our products</li>
                  </ul>
                  <p className="text-muted-foreground">
                    Our maximum liability is limited to the amount paid for the subscription.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-heading text-2xl font-bold mb-4">6. User Responsibilities</h2>
                <div className="stat-card">
                  <p className="text-muted-foreground mb-4">As a user, you are responsible for:</p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Understanding the risks of forex trading</li>
                    <li>• Setting appropriate risk parameters within the EA</li>
                    <li>• Maintaining adequate capital for your risk tolerance</li>
                    <li>• Ensuring proper VPS and internet connectivity</li>
                    <li>• Monitoring your trading account regularly</li>
                    <li>• Complying with your broker's terms of service</li>
                  </ul>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-heading text-2xl font-bold mb-4">7. Privacy Policy</h2>
                <div className="stat-card">
                  <p className="text-muted-foreground mb-4">
                    We collect and process personal data in accordance with applicable privacy laws. Information 
                    collected may include:
                  </p>
                  <ul className="space-y-2 text-muted-foreground mb-4">
                    <li>• Name, email, and contact information</li>
                    <li>• Payment information (processed securely by third parties)</li>
                    <li>• MT4/MT5 account numbers for licensing</li>
                  </ul>
                  <p className="text-muted-foreground">
                    We do not share your personal information with third parties except as required to provide 
                    our services or comply with legal obligations.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-heading text-2xl font-bold mb-4">8. Contact Information</h2>
                <div className="stat-card">
                  <p className="text-muted-foreground">
                    For any questions regarding these terms, please contact us at:
                  </p>
                  <ul className="mt-4 space-y-2">
                    <li className="text-primary">Email: support@trade2live.com</li>
                    <li className="text-primary">Line: @trade2live</li>
                    <li className="text-primary">Telegram: @trade2live</li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default TermsPage;
