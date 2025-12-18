import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useUserRole } from "@/hooks/useUserRole";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { TrendingUp, LogOut, Users, Package, CreditCard, Key, Search, Plus, Edit, Trash2, Shield, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { th } from "date-fns/locale";
import type { Database } from "@/integrations/supabase/types";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];
type Subscription = Database["public"]["Tables"]["subscriptions"]["Row"];
type Payment = Database["public"]["Tables"]["payments"]["Row"];
type LicenseKey = Database["public"]["Tables"]["license_keys"]["Row"];
type UserRole = Database["public"]["Tables"]["user_roles"]["Row"];
type SubscriptionStatus = Database["public"]["Enums"]["subscription_status"];
type PaymentStatus = Database["public"]["Enums"]["payment_status"];
type EAType = Database["public"]["Enums"]["ea_type"];

interface UserWithRole extends Profile {
  roles: string[];
}

const AdminDashboard = () => {
  const { user, signOut, loading: authLoading } = useAuth();
  const { isAdminOrStaff, loading: roleLoading } = useUserRole();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [users, setUsers] = useState<UserWithRole[]>([]);
  const [subscriptions, setSubscriptions] = useState<(Subscription & { profile?: Profile })[]>([]);
  const [payments, setPayments] = useState<(Payment & { profile?: Profile })[]>([]);
  const [licenseKeys, setLicenseKeys] = useState<LicenseKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Dialog states
  const [editSubDialog, setEditSubDialog] = useState(false);
  const [editPaymentDialog, setEditPaymentDialog] = useState(false);
  const [addLicenseDialog, setAddLicenseDialog] = useState(false);
  const [selectedSub, setSelectedSub] = useState<Subscription | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [selectedSubForLicense, setSelectedSubForLicense] = useState<string>("");

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (!roleLoading && !isAdminOrStaff && user) {
      toast({
        title: "ไม่มีสิทธิ์เข้าถึง",
        description: "คุณไม่มีสิทธิ์เข้าถึงหน้านี้",
        variant: "destructive",
      });
      navigate("/dashboard");
    }
  }, [isAdminOrStaff, roleLoading, user, navigate, toast]);

  useEffect(() => {
    if (isAdminOrStaff) {
      fetchAllData();
    }
  }, [isAdminOrStaff]);

  const fetchAllData = async () => {
    setLoading(true);
    await Promise.all([fetchUsers(), fetchSubscriptions(), fetchPayments(), fetchLicenseKeys()]);
    setLoading(false);
  };

  const fetchUsers = async () => {
    const { data: profiles } = await supabase.from("profiles").select("*").order("created_at", { ascending: false });
    
    if (profiles) {
      const { data: roles } = await supabase.from("user_roles").select("*");
      const usersWithRoles: UserWithRole[] = profiles.map((p) => ({
        ...p,
        roles: roles?.filter((r) => r.user_id === p.user_id).map((r) => r.role) || [],
      }));
      setUsers(usersWithRoles);
    }
  };

  const fetchSubscriptions = async () => {
    const { data } = await supabase
      .from("subscriptions")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) {
      const { data: profiles } = await supabase.from("profiles").select("*");
      const subsWithProfiles = data.map((s) => ({
        ...s,
        profile: profiles?.find((p) => p.user_id === s.user_id),
      }));
      setSubscriptions(subsWithProfiles);
    }
  };

  const fetchPayments = async () => {
    const { data } = await supabase
      .from("payments")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) {
      const { data: profiles } = await supabase.from("profiles").select("*");
      const paymentsWithProfiles = data.map((p) => ({
        ...p,
        profile: profiles?.find((pr) => pr.user_id === p.user_id),
      }));
      setPayments(paymentsWithProfiles);
    }
  };

  const fetchLicenseKeys = async () => {
    const { data } = await supabase.from("license_keys").select("*").order("created_at", { ascending: false });
    setLicenseKeys(data || []);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const updateSubscriptionStatus = async (id: string, status: SubscriptionStatus) => {
    const { error } = await supabase.from("subscriptions").update({ status }).eq("id", id);
    if (error) {
      toast({ title: "เกิดข้อผิดพลาด", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "อัปเดตสำเร็จ" });
      fetchSubscriptions();
    }
    setEditSubDialog(false);
  };

  const updatePaymentStatus = async (id: string, status: PaymentStatus) => {
    const { error } = await supabase.from("payments").update({ status }).eq("id", id);
    if (error) {
      toast({ title: "เกิดข้อผิดพลาด", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "อัปเดตสำเร็จ" });
      fetchPayments();
    }
    setEditPaymentDialog(false);
  };

  const generateLicenseKey = async (subscriptionId: string) => {
    const { data, error } = await supabase.rpc("generate_license_key");
    if (error || !data) {
      toast({ title: "เกิดข้อผิดพลาด", description: error?.message, variant: "destructive" });
      return;
    }

    const { error: insertError } = await supabase.from("license_keys").insert({
      subscription_id: subscriptionId,
      license_key: data,
      is_active: true,
    });

    if (insertError) {
      toast({ title: "เกิดข้อผิดพลาด", description: insertError.message, variant: "destructive" });
    } else {
      toast({ title: "สร้าง License Key สำเร็จ" });
      fetchLicenseKeys();
    }
    setAddLicenseDialog(false);
  };

  const toggleLicenseKeyStatus = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase.from("license_keys").update({ is_active: !currentStatus }).eq("id", id);
    if (error) {
      toast({ title: "เกิดข้อผิดพลาด", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "อัปเดตสำเร็จ" });
      fetchLicenseKeys();
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      u.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string, type: "subscription" | "payment") => {
    const subVariants: Record<string, { variant: "default" | "secondary" | "destructive" | "outline"; label: string }> = {
      active: { variant: "default", label: "ใช้งานอยู่" },
      pending: { variant: "secondary", label: "รอดำเนินการ" },
      expired: { variant: "destructive", label: "หมดอายุ" },
      cancelled: { variant: "outline", label: "ยกเลิก" },
    };
    const payVariants: Record<string, { variant: "default" | "secondary" | "destructive" | "outline"; label: string }> = {
      completed: { variant: "default", label: "สำเร็จ" },
      pending: { variant: "secondary", label: "รอดำเนินการ" },
      failed: { variant: "destructive", label: "ล้มเหลว" },
      refunded: { variant: "outline", label: "คืนเงิน" },
    };
    const variants = type === "subscription" ? subVariants : payVariants;
    const config = variants[status] || { variant: "outline" as const, label: status };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  if (authLoading || roleLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
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
            <Badge variant="outline" className="ml-2">
              <Shield className="w-3 h-3 mr-1" />
              Admin
            </Badge>
          </a>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              ออกจากระบบ
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-heading mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">จัดการ users, subscriptions และ payments</p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                Users ทั้งหมด
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{users.length}</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Package className="w-4 h-4 text-success" />
                Subscriptions Active
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{subscriptions.filter((s) => s.status === "active").length}</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-accent" />
                Payments Pending
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{payments.filter((p) => p.status === "pending").length}</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Key className="w-4 h-4 text-blue-400" />
                License Keys Active
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{licenseKeys.filter((k) => k.is_active).length}</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="users" className="space-y-4">
          <TabsList>
            <TabsTrigger value="users">
              <Users className="w-4 h-4 mr-2" />
              Users
            </TabsTrigger>
            <TabsTrigger value="subscriptions">
              <Package className="w-4 h-4 mr-2" />
              Subscriptions
            </TabsTrigger>
            <TabsTrigger value="payments">
              <CreditCard className="w-4 h-4 mr-2" />
              Payments
            </TabsTrigger>
            <TabsTrigger value="licenses">
              <Key className="w-4 h-4 mr-2" />
              License Keys
            </TabsTrigger>
          </TabsList>

          {/* Users Tab */}
          <TabsContent value="users">
            <Card className="bg-card border-border">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <CardTitle>Users ทั้งหมด</CardTitle>
                    <CardDescription>จัดการผู้ใช้งานในระบบ</CardDescription>
                  </div>
                  <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="ค้นหา..."
                      className="pl-9"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">ชื่อ</th>
                          <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">อีเมล</th>
                          <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">โทร</th>
                          <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Role</th>
                          <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">วันที่สมัคร</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredUsers.map((u) => (
                          <tr key={u.id} className="border-b border-border/50 hover:bg-secondary/30">
                            <td className="py-3 px-2">{u.full_name}</td>
                            <td className="py-3 px-2 text-sm text-muted-foreground">{u.email}</td>
                            <td className="py-3 px-2 text-sm">{u.phone || "-"}</td>
                            <td className="py-3 px-2">
                              <div className="flex gap-1">
                                {u.roles.map((r) => (
                                  <Badge key={r} variant={r === "admin" ? "default" : r === "staff" ? "secondary" : "outline"}>
                                    {r}
                                  </Badge>
                                ))}
                              </div>
                            </td>
                            <td className="py-3 px-2 text-sm text-muted-foreground">
                              {format(new Date(u.created_at), "d MMM yyyy", { locale: th })}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Subscriptions Tab */}
          <TabsContent value="subscriptions">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Subscriptions ทั้งหมด</CardTitle>
                <CardDescription>จัดการ subscription ของผู้ใช้</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">ผู้ใช้</th>
                          <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">แพ็กเกจ</th>
                          <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">EA</th>
                          <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">สถานะ</th>
                          <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">วันเริ่ม</th>
                          <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">วันสิ้นสุด</th>
                          <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {subscriptions.map((s) => (
                          <tr key={s.id} className="border-b border-border/50 hover:bg-secondary/30">
                            <td className="py-3 px-2">{s.profile?.full_name || "-"}</td>
                            <td className="py-3 px-2">{s.package_name}</td>
                            <td className="py-3 px-2">
                              <Badge variant="outline">{s.ea_type.toUpperCase()}</Badge>
                            </td>
                            <td className="py-3 px-2">{getStatusBadge(s.status, "subscription")}</td>
                            <td className="py-3 px-2 text-sm">
                              {s.start_date ? format(new Date(s.start_date), "d MMM yy", { locale: th }) : "-"}
                            </td>
                            <td className="py-3 px-2 text-sm">
                              {s.end_date ? format(new Date(s.end_date), "d MMM yy", { locale: th }) : "-"}
                            </td>
                            <td className="py-3 px-2">
                              <div className="flex gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    setSelectedSub(s);
                                    setEditSubDialog(true);
                                  }}
                                >
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    setSelectedSubForLicense(s.id);
                                    setAddLicenseDialog(true);
                                  }}
                                >
                                  <Key className="w-4 h-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payments Tab */}
          <TabsContent value="payments">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Payments ทั้งหมด</CardTitle>
                <CardDescription>จัดการการชำระเงิน</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : payments.length === 0 ? (
                  <p className="text-center py-8 text-muted-foreground">ยังไม่มีข้อมูลการชำระเงิน</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">ผู้ใช้</th>
                          <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">จำนวน</th>
                          <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">สถานะ</th>
                          <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">อ้างอิง</th>
                          <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">วันที่</th>
                          <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {payments.map((p) => (
                          <tr key={p.id} className="border-b border-border/50 hover:bg-secondary/30">
                            <td className="py-3 px-2">{p.profile?.full_name || "-"}</td>
                            <td className="py-3 px-2 font-medium">
                              {Number(p.amount).toLocaleString()} {p.currency}
                            </td>
                            <td className="py-3 px-2">{getStatusBadge(p.status, "payment")}</td>
                            <td className="py-3 px-2 text-sm text-muted-foreground">{p.payment_reference || "-"}</td>
                            <td className="py-3 px-2 text-sm">
                              {format(new Date(p.created_at), "d MMM yy HH:mm", { locale: th })}
                            </td>
                            <td className="py-3 px-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setSelectedPayment(p);
                                  setEditPaymentDialog(true);
                                }}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* License Keys Tab */}
          <TabsContent value="licenses">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>License Keys ทั้งหมด</CardTitle>
                <CardDescription>จัดการ license keys</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : licenseKeys.length === 0 ? (
                  <p className="text-center py-8 text-muted-foreground">ยังไม่มี license keys</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">License Key</th>
                          <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">สถานะ</th>
                          <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Broker</th>
                          <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">MT Account</th>
                          <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">วันที่สร้าง</th>
                          <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {licenseKeys.map((k) => (
                          <tr key={k.id} className="border-b border-border/50 hover:bg-secondary/30">
                            <td className="py-3 px-2">
                              <code className="text-xs bg-muted px-2 py-1 rounded font-mono">{k.license_key}</code>
                            </td>
                            <td className="py-3 px-2">
                              <Badge variant={k.is_active ? "default" : "secondary"}>
                                {k.is_active ? "Active" : "Inactive"}
                              </Badge>
                            </td>
                            <td className="py-3 px-2 text-sm">{k.broker_name || "-"}</td>
                            <td className="py-3 px-2 text-sm">{k.mt_account_number || "-"}</td>
                            <td className="py-3 px-2 text-sm">
                              {format(new Date(k.created_at), "d MMM yy", { locale: th })}
                            </td>
                            <td className="py-3 px-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleLicenseKeyStatus(k.id, k.is_active ?? false)}
                              >
                                {k.is_active ? "Deactivate" : "Activate"}
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Edit Subscription Dialog */}
        <Dialog open={editSubDialog} onOpenChange={setEditSubDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>แก้ไข Subscription</DialogTitle>
              <DialogDescription>เปลี่ยนสถานะ subscription</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>สถานะ</Label>
                <Select
                  defaultValue={selectedSub?.status}
                  onValueChange={(value) => selectedSub && updateSubscriptionStatus(selectedSub.id, value as SubscriptionStatus)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">รอดำเนินการ</SelectItem>
                    <SelectItem value="active">ใช้งานอยู่</SelectItem>
                    <SelectItem value="expired">หมดอายุ</SelectItem>
                    <SelectItem value="cancelled">ยกเลิก</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Edit Payment Dialog */}
        <Dialog open={editPaymentDialog} onOpenChange={setEditPaymentDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>แก้ไข Payment</DialogTitle>
              <DialogDescription>เปลี่ยนสถานะการชำระเงิน</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>สถานะ</Label>
                <Select
                  defaultValue={selectedPayment?.status}
                  onValueChange={(value) => selectedPayment && updatePaymentStatus(selectedPayment.id, value as PaymentStatus)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">รอดำเนินการ</SelectItem>
                    <SelectItem value="completed">สำเร็จ</SelectItem>
                    <SelectItem value="failed">ล้มเหลว</SelectItem>
                    <SelectItem value="refunded">คืนเงิน</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Add License Key Dialog */}
        <Dialog open={addLicenseDialog} onOpenChange={setAddLicenseDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>สร้าง License Key</DialogTitle>
              <DialogDescription>สร้าง license key ใหม่สำหรับ subscription นี้</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setAddLicenseDialog(false)}>
                ยกเลิก
              </Button>
              <Button onClick={() => generateLicenseKey(selectedSubForLicense)}>
                <Plus className="w-4 h-4 mr-2" />
                สร้าง License Key
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default AdminDashboard;
