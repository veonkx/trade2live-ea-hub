import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useUserRole } from "@/hooks/useUserRole";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { TrendingUp, LogOut, Plus, Edit, Trash2, Shield, Loader2, ArrowLeft, Eye, EyeOff, Copy, Check } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface MT5Account {
  id: string;
  account_name: string;
  account_number: string;
  server_name: string;
  investor_password: string;
  broker_name: string | null;
  ea_type: string;
  description: string | null;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

const AdminMT5AccountsPage = () => {
  const { user, signOut, loading: authLoading } = useAuth();
  const { isAdminOrStaff, loading: roleLoading } = useUserRole();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [accounts, setAccounts] = useState<MT5Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<MT5Account | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [showPassword, setShowPassword] = useState<Record<string, boolean>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    account_name: "",
    account_number: "",
    server_name: "",
    investor_password: "",
    broker_name: "",
    ea_type: "icf",
    description: "",
    is_active: true,
    sort_order: 0,
  });

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
      fetchAccounts();
    }
  }, [isAdminOrStaff]);

  const fetchAccounts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("mt5_investor_accounts")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) {
      toast({ title: "เกิดข้อผิดพลาด", description: error.message, variant: "destructive" });
    } else {
      setAccounts(data || []);
    }
    setLoading(false);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const openCreateDialog = () => {
    setSelectedAccount(null);
    setFormData({
      account_name: "",
      account_number: "",
      server_name: "",
      investor_password: "",
      broker_name: "",
      ea_type: "icf",
      description: "",
      is_active: true,
      sort_order: accounts.length,
    });
    setDialogOpen(true);
  };

  const openEditDialog = (account: MT5Account) => {
    setSelectedAccount(account);
    setFormData({
      account_name: account.account_name,
      account_number: account.account_number,
      server_name: account.server_name,
      investor_password: account.investor_password,
      broker_name: account.broker_name || "",
      ea_type: account.ea_type,
      description: account.description || "",
      is_active: account.is_active,
      sort_order: account.sort_order,
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!formData.account_name || !formData.account_number || !formData.server_name || !formData.investor_password) {
      toast({ title: "กรุณากรอกข้อมูลที่จำเป็น", variant: "destructive" });
      return;
    }

    setIsSaving(true);

    if (selectedAccount) {
      // Update
      const { error } = await supabase
        .from("mt5_investor_accounts")
        .update({
          account_name: formData.account_name,
          account_number: formData.account_number,
          server_name: formData.server_name,
          investor_password: formData.investor_password,
          broker_name: formData.broker_name || null,
          ea_type: formData.ea_type,
          description: formData.description || null,
          is_active: formData.is_active,
          sort_order: formData.sort_order,
        })
        .eq("id", selectedAccount.id);

      if (error) {
        toast({ title: "เกิดข้อผิดพลาด", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "อัปเดตสำเร็จ" });
        fetchAccounts();
        setDialogOpen(false);
      }
    } else {
      // Create
      const { error } = await supabase.from("mt5_investor_accounts").insert({
        account_name: formData.account_name,
        account_number: formData.account_number,
        server_name: formData.server_name,
        investor_password: formData.investor_password,
        broker_name: formData.broker_name || null,
        ea_type: formData.ea_type,
        description: formData.description || null,
        is_active: formData.is_active,
        sort_order: formData.sort_order,
      });

      if (error) {
        toast({ title: "เกิดข้อผิดพลาด", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "สร้างบัญชีสำเร็จ" });
        fetchAccounts();
        setDialogOpen(false);
      }
    }

    setIsSaving(false);
  };

  const handleDelete = async () => {
    if (!selectedAccount) return;

    const { error } = await supabase
      .from("mt5_investor_accounts")
      .delete()
      .eq("id", selectedAccount.id);

    if (error) {
      toast({ title: "เกิดข้อผิดพลาด", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "ลบสำเร็จ" });
      fetchAccounts();
    }
    setDeleteDialogOpen(false);
  };

  const togglePassword = (id: string) => {
    setShowPassword((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const copyToClipboard = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
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
            <Button variant="outline" size="sm" onClick={() => navigate("/admin")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              กลับ Dashboard
            </Button>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              ออกจากระบบ
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold font-heading mb-2">MT5 Investor Accounts</h1>
            <p className="text-muted-foreground">จัดการบัญชี MT5 Investor สำหรับแสดงในหน้า Performance</p>
          </div>
          <Button onClick={openCreateDialog} className="gap-2">
            <Plus className="w-4 h-4" />
            เพิ่มบัญชี
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>รายการบัญชี MT5 Investor</CardTitle>
            <CardDescription>บัญชีที่ Active จะแสดงในหน้า Performance ให้ลูกค้าดู</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : accounts.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                ยังไม่มีบัญชี MT5 Investor
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ชื่อบัญชี</TableHead>
                    <TableHead>เลขบัญชี</TableHead>
                    <TableHead>Server</TableHead>
                    <TableHead>Investor Password</TableHead>
                    <TableHead>EA Type</TableHead>
                    <TableHead>สถานะ</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {accounts.map((account) => (
                    <TableRow key={account.id}>
                      <TableCell className="font-medium">
                        {account.account_name}
                        {account.broker_name && (
                          <span className="block text-xs text-muted-foreground">{account.broker_name}</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <code className="text-sm bg-muted px-2 py-1 rounded">{account.account_number}</code>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => copyToClipboard(account.account_number, `num-${account.id}`)}
                          >
                            {copiedId === `num-${account.id}` ? (
                              <Check className="h-3 w-3 text-green-500" />
                            ) : (
                              <Copy className="h-3 w-3" />
                            )}
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>{account.server_name}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <code className="text-sm bg-muted px-2 py-1 rounded">
                            {showPassword[account.id] ? account.investor_password : "••••••••"}
                          </code>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => togglePassword(account.id)}
                          >
                            {showPassword[account.id] ? (
                              <EyeOff className="h-3 w-3" />
                            ) : (
                              <Eye className="h-3 w-3" />
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => copyToClipboard(account.investor_password, `pwd-${account.id}`)}
                          >
                            {copiedId === `pwd-${account.id}` ? (
                              <Check className="h-3 w-3 text-green-500" />
                            ) : (
                              <Copy className="h-3 w-3" />
                            )}
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={account.ea_type === "icf" ? "default" : "secondary"}>
                          {account.ea_type.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={account.is_active ? "default" : "outline"}>
                          {account.is_active ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => openEditDialog(account)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setSelectedAccount(account);
                              setDeleteDialogOpen(true);
                            }}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Create/Edit Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{selectedAccount ? "แก้ไขบัญชี MT5" : "เพิ่มบัญชี MT5"}</DialogTitle>
              <DialogDescription>กรอกข้อมูลบัญชี MT5 Investor สำหรับแสดงให้ลูกค้าดู</DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>ชื่อบัญชี *</Label>
                <Input
                  value={formData.account_name}
                  onChange={(e) => setFormData({ ...formData, account_name: e.target.value })}
                  placeholder="เช่น ICF Master Account"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>เลขบัญชี MT5 *</Label>
                  <Input
                    value={formData.account_number}
                    onChange={(e) => setFormData({ ...formData, account_number: e.target.value })}
                    placeholder="เช่น 12345678"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Server *</Label>
                  <Input
                    value={formData.server_name}
                    onChange={(e) => setFormData({ ...formData, server_name: e.target.value })}
                    placeholder="เช่น ICMarkets-MT5"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Investor Password *</Label>
                <Input
                  value={formData.investor_password}
                  onChange={(e) => setFormData({ ...formData, investor_password: e.target.value })}
                  placeholder="รหัสผ่าน investor (read-only)"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Broker</Label>
                  <Input
                    value={formData.broker_name}
                    onChange={(e) => setFormData({ ...formData, broker_name: e.target.value })}
                    placeholder="เช่น IC Markets"
                  />
                </div>
                <div className="space-y-2">
                  <Label>EA Type</Label>
                  <Select
                    value={formData.ea_type}
                    onValueChange={(v) => setFormData({ ...formData, ea_type: v })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="icf">ICF</SelectItem>
                      <SelectItem value="zb">ZB</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>คำอธิบาย</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="รายละเอียดเพิ่มเติม"
                  rows={2}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label>Active (แสดงในหน้า Performance)</Label>
                <Switch
                  checked={formData.is_active}
                  onCheckedChange={(v) => setFormData({ ...formData, is_active: v })}
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                ยกเลิก
              </Button>
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                {selectedAccount ? "บันทึก" : "สร้าง"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>ยืนยันการลบ</DialogTitle>
              <DialogDescription>
                คุณต้องการลบบัญชี "{selectedAccount?.account_name}" หรือไม่? การกระทำนี้ไม่สามารถย้อนกลับได้
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                ยกเลิก
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                ลบ
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default AdminMT5AccountsPage;
