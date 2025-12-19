import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useUserRole } from "@/hooks/useUserRole";
import { Loader2, Save, ArrowLeft, Server } from "lucide-react";

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
  is_active: boolean;
  sort_order: number;
}

const AdminVPSPage = () => {
  const [plans, setPlans] = useState<VPSPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isAdmin, isStaff, loading: roleLoading } = useUserRole();

  useEffect(() => {
    if (!roleLoading && !isAdmin && !isStaff) {
      navigate("/");
    }
  }, [isAdmin, isStaff, roleLoading, navigate]);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const { data, error } = await supabase
        .from("vps_plans")
        .select("*")
        .order("sort_order", { ascending: true });

      if (error) throw error;
      setPlans(data || []);
    } catch (error) {
      console.error("Error fetching VPS plans:", error);
      toast({
        title: "Error",
        description: "Failed to load VPS plans",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updatePlan = (id: string, field: keyof VPSPlan, value: string | number | boolean) => {
    setPlans((prev) =>
      prev.map((plan) =>
        plan.id === id ? { ...plan, [field]: value } : plan
      )
    );
  };

  const savePlan = async (plan: VPSPlan) => {
    setSaving(plan.id);
    try {
      const { error } = await supabase
        .from("vps_plans")
        .update({
          name: plan.name,
          price_usd: plan.price_usd,
          price_lak: plan.price_lak,
          price_3m_usd: plan.price_3m_usd,
          price_3m_lak: plan.price_3m_lak,
          price_6m_usd: plan.price_6m_usd,
          price_6m_lak: plan.price_6m_lak,
          price_12m_usd: plan.price_12m_usd,
          price_12m_lak: plan.price_12m_lak,
          ram: plan.ram,
          cpu: plan.cpu,
          storage: plan.storage,
          mt_accounts: plan.mt_accounts,
          os_type: plan.os_type,
          is_popular: plan.is_popular,
          is_active: plan.is_active,
          sort_order: plan.sort_order,
        })
        .eq("id", plan.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: `${plan.name} plan updated successfully`,
      });
    } catch (error) {
      console.error("Error updating plan:", error);
      toast({
        title: "Error",
        description: "Failed to update plan",
        variant: "destructive",
      });
    } finally {
      setSaving(null);
    }
  };

  if (roleLoading || loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (!isAdmin && !isStaff) {
    return null;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-24">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="icon" onClick={() => navigate("/admin")}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Server className="w-8 h-8 text-primary" />
              VPS Plans Management
            </h1>
            <p className="text-muted-foreground mt-1">
              Update pricing and specifications for VPS packages
            </p>
          </div>
        </div>

        <div className="grid gap-6">
          {plans.map((plan) => (
            <Card key={plan.id} className={!plan.is_active ? "opacity-60" : ""}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{plan.name}</span>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Label htmlFor={`active-${plan.id}`} className="text-sm">
                        Active
                      </Label>
                      <Switch
                        id={`active-${plan.id}`}
                        checked={plan.is_active}
                        onCheckedChange={(checked) =>
                          updatePlan(plan.id, "is_active", checked)
                        }
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Label htmlFor={`popular-${plan.id}`} className="text-sm">
                        Popular
                      </Label>
                      <Switch
                        id={`popular-${plan.id}`}
                        checked={plan.is_popular}
                        onCheckedChange={(checked) =>
                          updatePlan(plan.id, "is_popular", checked)
                        }
                      />
                    </div>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Basic Info */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="space-y-2">
                    <Label htmlFor={`name-${plan.id}`}>Plan Name</Label>
                    <Input
                      id={`name-${plan.id}`}
                      value={plan.name}
                      onChange={(e) => updatePlan(plan.id, "name", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`sort-${plan.id}`}>Sort Order</Label>
                    <Input
                      id={`sort-${plan.id}`}
                      type="number"
                      value={plan.sort_order}
                      onChange={(e) =>
                        updatePlan(plan.id, "sort_order", parseInt(e.target.value) || 0)
                      }
                    />
                  </div>
                </div>

                {/* Monthly Pricing */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold mb-3 text-muted-foreground">Monthly Price (1 Month)</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`price-usd-${plan.id}`}>USD ($)</Label>
                      <Input
                        id={`price-usd-${plan.id}`}
                        type="number"
                        value={plan.price_usd}
                        onChange={(e) =>
                          updatePlan(plan.id, "price_usd", parseFloat(e.target.value) || 0)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`price-lak-${plan.id}`}>LAK (₭)</Label>
                      <Input
                        id={`price-lak-${plan.id}`}
                        type="number"
                        value={plan.price_lak}
                        onChange={(e) =>
                          updatePlan(plan.id, "price_lak", parseFloat(e.target.value) || 0)
                        }
                      />
                    </div>
                  </div>
                </div>

                {/* 3 Month Pricing */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold mb-3 text-muted-foreground">3 Months Price</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`price-3m-usd-${plan.id}`}>USD ($)</Label>
                      <Input
                        id={`price-3m-usd-${plan.id}`}
                        type="number"
                        value={plan.price_3m_usd}
                        onChange={(e) =>
                          updatePlan(plan.id, "price_3m_usd", parseFloat(e.target.value) || 0)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`price-3m-lak-${plan.id}`}>LAK (₭)</Label>
                      <Input
                        id={`price-3m-lak-${plan.id}`}
                        type="number"
                        value={plan.price_3m_lak}
                        onChange={(e) =>
                          updatePlan(plan.id, "price_3m_lak", parseFloat(e.target.value) || 0)
                        }
                      />
                    </div>
                  </div>
                </div>

                {/* 6 Month Pricing */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold mb-3 text-muted-foreground">6 Months Price</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`price-6m-usd-${plan.id}`}>USD ($)</Label>
                      <Input
                        id={`price-6m-usd-${plan.id}`}
                        type="number"
                        value={plan.price_6m_usd}
                        onChange={(e) =>
                          updatePlan(plan.id, "price_6m_usd", parseFloat(e.target.value) || 0)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`price-6m-lak-${plan.id}`}>LAK (₭)</Label>
                      <Input
                        id={`price-6m-lak-${plan.id}`}
                        type="number"
                        value={plan.price_6m_lak}
                        onChange={(e) =>
                          updatePlan(plan.id, "price_6m_lak", parseFloat(e.target.value) || 0)
                        }
                      />
                    </div>
                  </div>
                </div>

                {/* 12 Month Pricing */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold mb-3 text-muted-foreground">1 Year Price</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`price-12m-usd-${plan.id}`}>USD ($)</Label>
                      <Input
                        id={`price-12m-usd-${plan.id}`}
                        type="number"
                        value={plan.price_12m_usd}
                        onChange={(e) =>
                          updatePlan(plan.id, "price_12m_usd", parseFloat(e.target.value) || 0)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`price-12m-lak-${plan.id}`}>LAK (₭)</Label>
                      <Input
                        id={`price-12m-lak-${plan.id}`}
                        type="number"
                        value={plan.price_12m_lak}
                        onChange={(e) =>
                          updatePlan(plan.id, "price_12m_lak", parseFloat(e.target.value) || 0)
                        }
                      />
                    </div>
                  </div>
                </div>

                {/* Specs */}
                <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
                  <div className="space-y-2">
                    <Label htmlFor={`ram-${plan.id}`}>RAM</Label>
                    <Input
                      id={`ram-${plan.id}`}
                      value={plan.ram}
                      onChange={(e) => updatePlan(plan.id, "ram", e.target.value)}
                      placeholder="e.g., 4 GB"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`cpu-${plan.id}`}>CPU</Label>
                    <Input
                      id={`cpu-${plan.id}`}
                      value={plan.cpu}
                      onChange={(e) => updatePlan(plan.id, "cpu", e.target.value)}
                      placeholder="e.g., 2 Cores"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`storage-${plan.id}`}>Storage</Label>
                    <Input
                      id={`storage-${plan.id}`}
                      value={plan.storage}
                      onChange={(e) => updatePlan(plan.id, "storage", e.target.value)}
                      placeholder="e.g., 50 GB SSD"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`os-${plan.id}`}>Operating System</Label>
                    <Input
                      id={`os-${plan.id}`}
                      value={plan.os_type}
                      onChange={(e) => updatePlan(plan.id, "os_type", e.target.value)}
                      placeholder="e.g., Windows 10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`mt-${plan.id}`}>MT4/MT5 Accounts</Label>
                    <Input
                      id={`mt-${plan.id}`}
                      type="number"
                      value={plan.mt_accounts}
                      onChange={(e) =>
                        updatePlan(plan.id, "mt_accounts", parseInt(e.target.value) || 1)
                      }
                    />
                  </div>
                </div>

                <Button
                  onClick={() => savePlan(plan)}
                  disabled={saving === plan.id}
                  className="w-full md:w-auto"
                >
                  {saving === plan.id ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4 mr-2" />
                  )}
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default AdminVPSPage;