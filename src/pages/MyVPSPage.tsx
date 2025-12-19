import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useUserRole } from "@/hooks/useUserRole";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp, LogOut, ArrowLeft, Server, Calendar, Clock, Globe, Shield, AlertTriangle } from "lucide-react";
import { format, differenceInDays, isPast } from "date-fns";
import { th } from "date-fns/locale";

interface VPSSubscription {
  id: string;
  plan_name: string;
  status: string;
  start_date: string;
  end_date: string;
  ip_address: string | null;
  username: string | null;
  notes: string | null;
}

const MyVPSPage = () => {
  const { user, signOut, loading: authLoading } = useAuth();
  const { isAdminOrStaff } = useUserRole();
  const navigate = useNavigate();
  const [subscriptions, setSubscriptions] = useState<VPSSubscription[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchVPSSubscriptions();
    }
  }, [user]);

  const fetchVPSSubscriptions = async () => {
    if (!user) return;
    
    setLoading(true);
    const { data, error } = await supabase
      .from("vps_subscriptions")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (!error) {
      setSubscriptions(data || []);
    }
    setLoading(false);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const getStatusBadge = (status: string, endDate: string) => {
    const isExpired = isPast(new Date(endDate));
    if (isExpired && status === "active") {
      return <Badge variant="destructive">หมดอายุ</Badge>;
    }
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">ใช้งานอยู่</Badge>;
      case "suspended":
        return <Badge variant="secondary">ระงับชั่วคราว</Badge>;
      case "cancelled":
        return <Badge variant="destructive">ยกเลิก</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getDaysRemaining = (endDate: string) => {
    const days = differenceInDays(new Date(endDate), new Date());
    if (days < 0) {
      return (
        <div className="flex items-center gap-2 text-destructive">
          <AlertTriangle className="w-4 h-4" />
          <span>หมดอายุแล้ว {Math.abs(days)} วัน</span>
        </div>
      );
    }
    if (days === 0) {
      return (
        <div className="flex items-center gap-2 text-yellow-500">
          <AlertTriangle className="w-4 h-4" />
          <span>หมดอายุวันนี้</span>
        </div>
      );
    }
    if (days <= 7) {
      return (
        <div className="flex items-center gap-2 text-yellow-500">
          <Clock className="w-4 h-4" />
          <span>เหลืออีก {days} วัน</span>
        </div>
      );
    }
    return (
      <div className="flex items-center gap-2 text-muted-foreground">
        <Clock className="w-4 h-4" />
        <span>เหลืออีก {days} วัน</span>
      </div>
    );
  };

  const activeCount = subscriptions.filter(s => s.status === "active" && !isPast(new Date(s.end_date))).length;

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
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="icon" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold font-heading flex items-center gap-3">
              <Server className="w-8 h-8 text-primary" />
              VPS ของฉัน
            </h1>
            <p className="text-muted-foreground mt-1">จัดการและติดตาม VPS subscription ของคุณ</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">VPS ทั้งหมด</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{subscriptions.length}</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-green-500">ใช้งานอยู่</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-green-500">{activeCount}</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">ยังไม่มี VPS?</CardTitle>
            </CardHeader>
            <CardContent>
              <Button size="sm" onClick={() => navigate("/vps-service")}>
                สั่งซื้อ VPS
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* VPS List */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="w-5 h-5" />
              รายการ VPS ของคุณ
            </CardTitle>
            <CardDescription>VPS ทั้งหมดที่คุณสมัครใช้งาน</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-4">
                {[1, 2].map(i => (
                  <Skeleton key={i} className="h-32 w-full" />
                ))}
              </div>
            ) : subscriptions.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Server className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-semibold mb-2">ยังไม่มี VPS</h3>
                <p className="mb-4">คุณยังไม่ได้สมัครใช้บริการ VPS</p>
                <Button onClick={() => navigate("/vps-service")}>
                  ดูแพ็กเกจ VPS
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {subscriptions.map((sub) => (
                  <div
                    key={sub.id}
                    className="p-6 rounded-lg border border-border bg-secondary/30"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold">{sub.plan_name}</h3>
                          {getStatusBadge(sub.status, sub.end_date)}
                        </div>
                        {getDaysRemaining(sub.end_date)}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 pt-4 border-t border-border">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">วันเริ่มต้น</p>
                          <p className="font-medium">
                            {format(new Date(sub.start_date), "d MMM yyyy", { locale: th })}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">วันหมดอายุ</p>
                          <p className="font-medium">
                            {format(new Date(sub.end_date), "d MMM yyyy", { locale: th })}
                          </p>
                        </div>
                      </div>
                      {sub.ip_address && (
                        <div className="flex items-center gap-3">
                          <Globe className="w-5 h-5 text-muted-foreground" />
                          <div>
                            <p className="text-xs text-muted-foreground">IP Address</p>
                            <p className="font-mono font-medium">{sub.ip_address}</p>
                          </div>
                        </div>
                      )}
                      {sub.username && (
                        <div className="flex items-center gap-3">
                          <Server className="w-5 h-5 text-muted-foreground" />
                          <div>
                            <p className="text-xs text-muted-foreground">Username</p>
                            <p className="font-medium">{sub.username}</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {sub.notes && (
                      <div className="mt-4 pt-4 border-t border-border">
                        <p className="text-sm text-muted-foreground">{sub.notes}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* CTA */}
        <Card className="bg-gradient-card border-border mt-6">
          <CardContent className="py-8 text-center">
            <Server className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">ต้องการ VPS เพิ่ม?</h3>
            <p className="text-muted-foreground mb-4">
              เลือกแพ็กเกจ VPS ที่เหมาะกับการเทรดของคุณ
            </p>
            <Button onClick={() => navigate("/vps-service")}>
              ดูแพ็กเกจ VPS ทั้งหมด
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default MyVPSPage;
