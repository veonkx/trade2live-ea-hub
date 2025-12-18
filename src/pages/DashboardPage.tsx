import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useUserRole } from "@/hooks/useUserRole";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp, LogOut, User, Package, Key, CreditCard, Shield } from "lucide-react";
import { format } from "date-fns";
import { th } from "date-fns/locale";
import type { Database } from "@/integrations/supabase/types";

type Subscription = Database["public"]["Tables"]["subscriptions"]["Row"];
type LicenseKey = Database["public"]["Tables"]["license_keys"]["Row"];
type Profile = Database["public"]["Tables"]["profiles"]["Row"];

const DashboardPage = () => {
  const { user, signOut, loading: authLoading } = useAuth();
  const { isAdminOrStaff } = useUserRole();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [licenseKeys, setLicenseKeys] = useState<LicenseKey[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    if (!user) return;
    
    setLoading(true);
    
    // Fetch profile
    const { data: profileData } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle();
    
    setProfile(profileData);

    // Fetch subscriptions
    const { data: subsData } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });
    
    setSubscriptions(subsData || []);

    // Fetch license keys through subscriptions
    if (subsData && subsData.length > 0) {
      const subIds = subsData.map(s => s.id);
      const { data: keysData } = await supabase
        .from("license_keys")
        .select("*")
        .in("subscription_id", subIds);
      
      setLicenseKeys(keysData || []);
    }

    setLoading(false);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: "default" | "secondary" | "destructive" | "outline"; label: string }> = {
      active: { variant: "default", label: "ใช้งานอยู่" },
      pending: { variant: "secondary", label: "รอดำเนินการ" },
      expired: { variant: "destructive", label: "หมดอายุ" },
      cancelled: { variant: "outline", label: "ยกเลิก" },
    };
    const config = variants[status] || { variant: "outline" as const, label: status };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getEATypeBadge = (eaType: string) => {
    const colors: Record<string, string> = {
      icf: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      zb: "bg-purple-500/20 text-purple-400 border-purple-500/30",
      bundle: "bg-primary/20 text-primary border-primary/30",
    };
    return (
      <Badge className={colors[eaType] || ""} variant="outline">
        {eaType.toUpperCase()}
      </Badge>
    );
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-gold rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold font-heading">Trade2live</span>
          </a>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:block">
              {profile?.full_name || user?.email}
            </span>
            {isAdminOrStaff && (
              <Button variant="outline" size="sm" asChild>
                <Link to="/admin">
                  <Shield className="w-4 h-4 mr-2" />
                  Admin
                </Link>
              </Button>
            )}
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              ออกจากระบบ
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-heading mb-2">Dashboard</h1>
          <p className="text-muted-foreground">จัดการ subscription และ license keys ของคุณ</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          {/* Profile Card */}
          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <User className="w-6 h-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg">โปรไฟล์</CardTitle>
                <CardDescription>ข้อมูลบัญชีของคุณ</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              ) : (
                <div className="space-y-2 text-sm">
                  <p><span className="text-muted-foreground">ชื่อ:</span> {profile?.full_name}</p>
                  <p><span className="text-muted-foreground">อีเมล:</span> {profile?.email}</p>
                  <p><span className="text-muted-foreground">โทร:</span> {profile?.phone || "-"}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Subscriptions Count */}
          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <div className="w-12 h-12 rounded-full bg-success/20 flex items-center justify-center">
                <Package className="w-6 h-6 text-success" />
              </div>
              <div>
                <CardTitle className="text-lg">Subscriptions</CardTitle>
                <CardDescription>แพ็กเกจที่สมัครใช้งาน</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <p className="text-3xl font-bold text-primary">{subscriptions.length}</p>
              )}
            </CardContent>
          </Card>

          {/* License Keys Count */}
          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                <Key className="w-6 h-6 text-accent" />
              </div>
              <div>
                <CardTitle className="text-lg">License Keys</CardTitle>
                <CardDescription>คีย์ที่ใช้งานได้</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <p className="text-3xl font-bold text-primary">
                  {licenseKeys.filter(k => k.is_active).length}
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Subscriptions List */}
        <Card className="bg-card border-border mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              Subscriptions ของคุณ
            </CardTitle>
            <CardDescription>รายการแพ็กเกจทั้งหมดที่คุณสมัครใช้งาน</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-4">
                {[1, 2].map(i => (
                  <Skeleton key={i} className="h-24 w-full" />
                ))}
              </div>
            ) : subscriptions.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>ยังไม่มี subscription</p>
                <Button variant="outline" className="mt-4" onClick={() => navigate("/pricing")}>
                  ดูแพ็กเกจ
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {subscriptions.map((sub) => {
                  const subLicenses = licenseKeys.filter(k => k.subscription_id === sub.id);
                  return (
                    <div
                      key={sub.id}
                      className="p-4 rounded-lg border border-border bg-secondary/30"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold">{sub.package_name}</h3>
                            {getEATypeBadge(sub.ea_type)}
                            {getStatusBadge(sub.status)}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            เริ่ม: {sub.start_date ? format(new Date(sub.start_date), "d MMM yyyy", { locale: th }) : "-"}
                            {" • "}
                            สิ้นสุด: {sub.end_date ? format(new Date(sub.end_date), "d MMM yyyy", { locale: th }) : "-"}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            บัญชีสูงสุด: {sub.max_accounts} บัญชี
                          </p>
                        </div>
                      </div>

                      {/* License Keys for this subscription */}
                      {subLicenses.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-border">
                          <p className="text-sm font-medium mb-2 flex items-center gap-2">
                            <Key className="w-4 h-4" />
                            License Keys
                          </p>
                          <div className="space-y-2">
                            {subLicenses.map((license) => (
                              <div
                                key={license.id}
                                className="flex flex-wrap items-center gap-2 text-sm bg-background/50 p-2 rounded"
                              >
                                <code className="font-mono text-xs bg-muted px-2 py-1 rounded">
                                  {license.license_key}
                                </code>
                                <Badge variant={license.is_active ? "default" : "secondary"}>
                                  {license.is_active ? "Active" : "Inactive"}
                                </Badge>
                                {license.broker_name && (
                                  <span className="text-muted-foreground">
                                    Broker: {license.broker_name}
                                  </span>
                                )}
                                {license.mt_account_number && (
                                  <span className="text-muted-foreground">
                                    MT: {license.mt_account_number}
                                  </span>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* CTA */}
        <Card className="bg-gradient-card border-border">
          <CardContent className="py-8 text-center">
            <CreditCard className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">ต้องการสมัครแพ็กเกจใหม่?</h3>
            <p className="text-muted-foreground mb-4">
              เลือกแพ็กเกจที่เหมาะกับการเทรดของคุณ
            </p>
            <Button onClick={() => navigate("/pricing")}>
              ดูแพ็กเกจทั้งหมด
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default DashboardPage;
