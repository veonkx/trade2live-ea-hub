import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useUserRole } from "@/hooks/useUserRole";
import { Loader2, ArrowLeft, Plus, Edit, Trash2, Users, Calendar, Server } from "lucide-react";
import { format, differenceInDays, isPast } from "date-fns";

interface VPSSubscription {
  id: string;
  user_id: string;
  vps_plan_id: string | null;
  plan_name: string;
  status: string;
  start_date: string;
  end_date: string;
  ip_address: string | null;
  username: string | null;
  password: string | null;
  notes: string | null;
  created_at: string;
  profile?: {
    full_name: string;
    email: string;
  };
}

interface VPSPlan {
  id: string;
  name: string;
}

interface Profile {
  user_id: string;
  full_name: string;
  email: string;
}

const AdminVPSSubscriptionsPage = () => {
  const [subscriptions, setSubscriptions] = useState<VPSSubscription[]>([]);
  const [plans, setPlans] = useState<VPSPlan[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    user_id: "",
    vps_plan_id: "",
    plan_name: "",
    status: "active",
    start_date: format(new Date(), "yyyy-MM-dd"),
    end_date: "",
    ip_address: "",
    username: "",
    password: "",
    notes: "",
  });

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
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [subsRes, plansRes, profilesRes] = await Promise.all([
        supabase.from("vps_subscriptions").select("*").order("created_at", { ascending: false }),
        supabase.from("vps_plans").select("id, name").eq("is_active", true),
        supabase.from("profiles").select("user_id, full_name, email"),
      ]);

      if (subsRes.error) throw subsRes.error;
      if (plansRes.error) throw plansRes.error;

      // Map profiles to subscriptions
      const profileMap = new Map(profilesRes.data?.map(p => [p.user_id, p]) || []);
      const subsWithProfiles = (subsRes.data || []).map(sub => ({
        ...sub,
        profile: profileMap.get(sub.user_id),
      }));

      setSubscriptions(subsWithProfiles);
      setPlans(plansRes.data || []);
      setProfiles(profilesRes.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast({
        title: "Error",
        description: "Failed to load data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      user_id: "",
      vps_plan_id: "",
      plan_name: "",
      status: "active",
      start_date: format(new Date(), "yyyy-MM-dd"),
      end_date: "",
      ip_address: "",
      username: "",
      password: "",
      notes: "",
    });
    setEditingId(null);
  };

  const openCreateDialog = () => {
    resetForm();
    setDialogOpen(true);
  };

  const openEditDialog = (sub: VPSSubscription) => {
    setFormData({
      user_id: sub.user_id,
      vps_plan_id: sub.vps_plan_id || "",
      plan_name: sub.plan_name,
      status: sub.status,
      start_date: format(new Date(sub.start_date), "yyyy-MM-dd"),
      end_date: format(new Date(sub.end_date), "yyyy-MM-dd"),
      ip_address: sub.ip_address || "",
      username: sub.username || "",
      password: sub.password || "",
      notes: sub.notes || "",
    });
    setEditingId(sub.id);
    setDialogOpen(true);
  };

  const handlePlanChange = (planId: string) => {
    const plan = plans.find(p => p.id === planId);
    setFormData(prev => ({
      ...prev,
      vps_plan_id: planId,
      plan_name: plan?.name || "",
    }));
  };

  const handleSubmit = async () => {
    if (!formData.user_id || !formData.plan_name || !formData.end_date) {
      toast({
        title: "Error",
        description: "Please fill in required fields (User, Plan Name, End Date)",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);
    try {
      const payload = {
        user_id: formData.user_id,
        vps_plan_id: formData.vps_plan_id || null,
        plan_name: formData.plan_name,
        status: formData.status,
        start_date: new Date(formData.start_date).toISOString(),
        end_date: new Date(formData.end_date).toISOString(),
        ip_address: formData.ip_address || null,
        username: formData.username || null,
        password: formData.password || null,
        notes: formData.notes || null,
      };

      if (editingId) {
        const { error } = await supabase
          .from("vps_subscriptions")
          .update(payload)
          .eq("id", editingId);
        if (error) throw error;
        toast({ title: "Success", description: "Subscription updated" });
      } else {
        const { error } = await supabase
          .from("vps_subscriptions")
          .insert(payload);
        if (error) throw error;
        toast({ title: "Success", description: "Subscription created" });
      }

      setDialogOpen(false);
      resetForm();
      fetchData();
    } catch (error) {
      console.error("Error saving subscription:", error);
      toast({
        title: "Error",
        description: "Failed to save subscription",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this subscription?")) return;

    try {
      const { error } = await supabase
        .from("vps_subscriptions")
        .delete()
        .eq("id", id);
      if (error) throw error;
      toast({ title: "Success", description: "Subscription deleted" });
      fetchData();
    } catch (error) {
      console.error("Error deleting subscription:", error);
      toast({
        title: "Error",
        description: "Failed to delete subscription",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string, endDate: string) => {
    const isExpired = isPast(new Date(endDate));
    if (isExpired && status === "active") {
      return <Badge variant="destructive">Expired</Badge>;
    }
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>;
      case "suspended":
        return <Badge variant="secondary">Suspended</Badge>;
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getDaysRemaining = (endDate: string) => {
    const days = differenceInDays(new Date(endDate), new Date());
    if (days < 0) return <span className="text-destructive">Expired {Math.abs(days)} days ago</span>;
    if (days === 0) return <span className="text-yellow-500">Expires today</span>;
    if (days <= 7) return <span className="text-yellow-500">{days} days left</span>;
    return <span className="text-muted-foreground">{days} days left</span>;
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

  const activeCount = subscriptions.filter(s => s.status === "active" && !isPast(new Date(s.end_date))).length;
  const expiredCount = subscriptions.filter(s => isPast(new Date(s.end_date))).length;
  const expiringCount = subscriptions.filter(s => {
    const days = differenceInDays(new Date(s.end_date), new Date());
    return days >= 0 && days <= 7 && s.status === "active";
  }).length;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-24">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="icon" onClick={() => navigate("/admin")}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Users className="w-8 h-8 text-primary" />
              VPS Subscriptions
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage customer VPS subscriptions and track usage
            </p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={openCreateDialog}>
                <Plus className="w-4 h-4 mr-2" />
                Add Subscription
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingId ? "Edit Subscription" : "Create New Subscription"}
                </DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Customer *</Label>
                    <Select value={formData.user_id} onValueChange={(v) => setFormData(prev => ({ ...prev, user_id: v }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select customer" />
                      </SelectTrigger>
                      <SelectContent>
                        {profiles.map((profile) => (
                          <SelectItem key={profile.user_id} value={profile.user_id}>
                            {profile.full_name} ({profile.email})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>VPS Plan</Label>
                    <Select value={formData.vps_plan_id} onValueChange={handlePlanChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select plan" />
                      </SelectTrigger>
                      <SelectContent>
                        {plans.map((plan) => (
                          <SelectItem key={plan.id} value={plan.id}>
                            {plan.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Plan Name *</Label>
                    <Input
                      value={formData.plan_name}
                      onChange={(e) => setFormData(prev => ({ ...prev, plan_name: e.target.value }))}
                      placeholder="e.g., VPS Standard"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Select value={formData.status} onValueChange={(v) => setFormData(prev => ({ ...prev, status: v }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="suspended">Suspended</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Start Date *</Label>
                    <Input
                      type="date"
                      value={formData.start_date}
                      onChange={(e) => setFormData(prev => ({ ...prev, start_date: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>End Date *</Label>
                    <Input
                      type="date"
                      value={formData.end_date}
                      onChange={(e) => setFormData(prev => ({ ...prev, end_date: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>IP Address</Label>
                    <Input
                      value={formData.ip_address}
                      onChange={(e) => setFormData(prev => ({ ...prev, ip_address: e.target.value }))}
                      placeholder="e.g., 192.168.1.1"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Username</Label>
                    <Input
                      value={formData.username}
                      onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Password</Label>
                    <Input
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Notes</Label>
                  <Input
                    value={formData.notes}
                    onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="Additional notes..."
                  />
                </div>

                <Button onClick={handleSubmit} disabled={saving} className="w-full">
                  {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  {editingId ? "Update Subscription" : "Create Subscription"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{subscriptions.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-green-500">Active</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">{activeCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-yellow-500">Expiring Soon</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-500">{expiringCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-destructive">Expired</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">{expiredCount}</div>
            </CardContent>
          </Card>
        </div>

        {/* Subscriptions Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="w-5 h-5" />
              All Subscriptions
            </CardTitle>
          </CardHeader>
          <CardContent>
            {subscriptions.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No subscriptions yet. Click "Add Subscription" to create one.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Plan</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Start Date</TableHead>
                      <TableHead>End Date</TableHead>
                      <TableHead>Remaining</TableHead>
                      <TableHead>IP Address</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {subscriptions.map((sub) => (
                      <TableRow key={sub.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{sub.profile?.full_name || "Unknown"}</div>
                            <div className="text-sm text-muted-foreground">{sub.profile?.email}</div>
                          </div>
                        </TableCell>
                        <TableCell>{sub.plan_name}</TableCell>
                        <TableCell>{getStatusBadge(sub.status, sub.end_date)}</TableCell>
                        <TableCell>{format(new Date(sub.start_date), "dd/MM/yyyy")}</TableCell>
                        <TableCell>{format(new Date(sub.end_date), "dd/MM/yyyy")}</TableCell>
                        <TableCell>{getDaysRemaining(sub.end_date)}</TableCell>
                        <TableCell>{sub.ip_address || "-"}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => openEditDialog(sub)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="destructive"
                              size="icon"
                              onClick={() => handleDelete(sub.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AdminVPSSubscriptionsPage;
