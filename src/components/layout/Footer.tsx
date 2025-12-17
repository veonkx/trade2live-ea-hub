import { Link } from "react-router-dom";
import { TrendingUp, Mail, MessageCircle, Facebook } from "lucide-react";

const footerLinks = {
  products: [
    { label: "Trade2live ICF$", href: "/ea/icf" },
    { label: "Trade2live ZB$", href: "/ea/zb" },
    { label: "Pricing", href: "/pricing" },
    { label: "Performance", href: "/performance" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
    { label: "Terms", href: "/terms" },
  ],
};

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-gold flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-heading font-bold text-xl">Trade2live</span>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-md">
              Premium Expert Advisor (EA) trading solutions designed for sustainable, 
              long-term growth with professional risk management.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all">
                <MessageCircle className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Products</h4>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Risk Warning */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 mb-8">
            <p className="text-sm text-muted-foreground">
              <span className="text-destructive font-semibold">⚠️ Risk Warning:</span> Trading forex 
              involves significant risk and may not be suitable for all investors. Past performance 
              is not indicative of future results. You should carefully consider your investment 
              objectives, level of experience, and risk appetite before making any investment decisions.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Trade2live. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </Link>
              <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
