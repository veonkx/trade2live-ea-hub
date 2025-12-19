import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Eye, EyeOff, Copy, Check, TrendingUp, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";

interface MT5Account {
  id: string;
  account_name: string;
  account_number: string;
  server_name: string;
  investor_password: string;
  broker_name: string | null;
  ea_type: string;
  description: string | null;
}

interface MT5InvestorAccountsProps {
  eaFilter?: "all" | "icf" | "zb";
}

export const MT5InvestorAccounts = ({ eaFilter = "all" }: MT5InvestorAccountsProps) => {
  const { t } = useLanguage();
  const [accounts, setAccounts] = useState<MT5Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState<Record<string, boolean>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredAccounts = accounts.filter(
    (account) => eaFilter === "all" || account.ea_type === eaFilter
  );

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    const { data } = await supabase
      .from("mt5_investor_accounts")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

    setAccounts(data || []);
    setLoading(false);
  };

  const togglePassword = (id: string) => {
    setShowPassword((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const copyToClipboard = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (loading) {
    return null;
  }

  if (filteredAccounts.length === 0) {
    return null;
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h2 className="font-heading text-2xl font-bold flex items-center gap-3">
            <Shield className="w-6 h-6 text-primary" />
            MT5 Investor Accounts
          </h2>
          <p className="text-muted-foreground">
            เชื่อมต่อด้วย Investor Password เพื่อดูผลการเทรดแบบ Real-time (Read-only)
          </p>
        </motion.div>

        <div className={`grid gap-6 ${filteredAccounts.length === 1 ? 'grid-cols-1 max-w-2xl mx-auto' : 'grid-cols-1 md:grid-cols-2'}`}>
          {filteredAccounts.map((account, index) => (
            <motion.div
              key={account.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="stat-card"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      account.ea_type === "icf" ? "bg-primary/10" : "bg-profit/10"
                    }`}
                  >
                    <TrendingUp
                      className={`w-6 h-6 ${account.ea_type === "icf" ? "text-primary" : "text-profit"}`}
                    />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold">{account.account_name}</h3>
                    {account.broker_name && (
                      <p className="text-sm text-muted-foreground">{account.broker_name}</p>
                    )}
                  </div>
                </div>
                <Badge variant={account.ea_type === "icf" ? "default" : "secondary"}>
                  {account.ea_type.toUpperCase()}
                </Badge>
              </div>

              {account.description && (
                <p className="text-sm text-muted-foreground mb-4">{account.description}</p>
              )}

              <div className="space-y-3">
                {/* Account Number */}
                <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Account Number</p>
                    <code className="text-sm font-mono">{account.account_number}</code>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => copyToClipboard(account.account_number, `num-${account.id}`)}
                  >
                    {copiedId === `num-${account.id}` ? (
                      <Check className="h-4 w-4 text-profit" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>

                {/* Server */}
                <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Server</p>
                    <code className="text-sm font-mono">{account.server_name}</code>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => copyToClipboard(account.server_name, `srv-${account.id}`)}
                  >
                    {copiedId === `srv-${account.id}` ? (
                      <Check className="h-4 w-4 text-profit" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>

                {/* Investor Password */}
                <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Investor Password</p>
                    <code className="text-sm font-mono">
                      {showPassword[account.id] ? account.investor_password : "••••••••••"}
                    </code>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => togglePassword(account.id)}
                    >
                      {showPassword[account.id] ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => copyToClipboard(account.investor_password, `pwd-${account.id}`)}
                    >
                      {copiedId === `pwd-${account.id}` ? (
                        <Check className="h-4 w-4 text-profit" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-3 bg-primary/5 rounded-lg border border-primary/10">
                <p className="text-xs text-muted-foreground">
                  💡 <span className="font-medium">วิธีใช้:</span> เปิด MT5 → File → Login to Trade Account → กรอกข้อมูลด้านบน
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
