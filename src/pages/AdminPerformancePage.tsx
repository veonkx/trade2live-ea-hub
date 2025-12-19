import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useUserRole } from "@/hooks/useUserRole";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Save, Calendar, TrendingUp, BarChart3, RefreshCw, Activity, Trash2 } from "lucide-react";
import { format } from "date-fns";

interface PerformanceStats {
  id: string;
  ea_type: string;
  name: string;
  total_return: string;
  monthly_avg: string;
  max_drawdown: string;
  win_rate: string;
  profit_factor: string;
  total_trades: string;
  trading_days: string;
  sharpe_ratio: string;
  status: string;
  start_date: string;
  last_updated_at: string;
}

interface MonthlyReturn {
  id: string;
  ea_type: string;
  year: number;
  month: number;
  return_percent: number;
}

interface EquityData {
  id: string;
  ea_type: string;
  day_number: number;
  equity_value: number;
  record_date: string;
}

const AdminPerformancePage = () => {
  const { user } = useAuth();
  const { isAdmin, isStaff, loading: roleLoading } = useUserRole();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [stats, setStats] = useState<PerformanceStats[]>([]);
  const [monthlyReturns, setMonthlyReturns] = useState<MonthlyReturn[]>([]);
  const [equityData, setEquityData] = useState<EquityData[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedEA, setSelectedEA] = useState<'icf' | 'zb'>('icf');
  const [newMonthlyReturn, setNewMonthlyReturn] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    return_percent: 0
  });
  const [newEquityData, setNewEquityData] = useState({
    day_number: 0,
    equity_value: 10000,
    record_date: format(new Date(), 'yyyy-MM-dd')
  });

  useEffect(() => {
    if (!roleLoading && !isAdmin && !isStaff) {
      navigate("/");
    }
  }, [isAdmin, isStaff, roleLoading, navigate]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [statsRes, monthlyRes, equityRes] = await Promise.all([
        supabase.from("ea_performance_stats").select("*").order("ea_type"),
        supabase.from("ea_monthly_returns").select("*").order("year", { ascending: false }).order("month", { ascending: false }),
        supabase.from("ea_equity_data").select("*").order("day_number", { ascending: true })
      ]);

      if (statsRes.data) setStats(statsRes.data);
      if (monthlyRes.data) setMonthlyReturns(monthlyRes.data);
      if (equityRes.data) setEquityData(equityRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatsChange = (eaType: string, field: keyof PerformanceStats, value: string) => {
    setStats(prev => prev.map(s => 
      s.ea_type === eaType ? { ...s, [field]: value } : s
    ));
  };

  const saveStats = async (eaType: string) => {
    setSaving(true);
    const stat = stats.find(s => s.ea_type === eaType);
    if (!stat) return;

    try {
      const { error } = await supabase
        .from("ea_performance_stats")
        .update({
          name: stat.name,
          total_return: stat.total_return,
          monthly_avg: stat.monthly_avg,
          max_drawdown: stat.max_drawdown,
          win_rate: stat.win_rate,
          profit_factor: stat.profit_factor,
          total_trades: stat.total_trades,
          trading_days: stat.trading_days,
          sharpe_ratio: stat.sharpe_ratio,
          status: stat.status,
          start_date: stat.start_date,
          last_updated_at: new Date().toISOString()
        })
        .eq("ea_type", eaType);

      if (error) throw error;

      toast({
        title: "บันทึกสำเร็จ",
        description: `อัพเดทข้อมูล ${stat.name} เรียบร้อยแล้ว`,
      });

      fetchData();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "เกิดข้อผิดพลาด",
        description: error.message,
      });
    } finally {
      setSaving(false);
    }
  };

  const addMonthlyReturn = async () => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from("ea_monthly_returns")
        .upsert({
          ea_type: selectedEA,
          year: newMonthlyReturn.year,
          month: newMonthlyReturn.month,
          return_percent: newMonthlyReturn.return_percent
        }, { onConflict: 'ea_type,year,month' });

      if (error) throw error;

      toast({
        title: "บันทึกสำเร็จ",
        description: `เพิ่มข้อมูล Monthly Return เรียบร้อยแล้ว`,
      });

      setNewMonthlyReturn({
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        return_percent: 0
      });

      fetchData();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "เกิดข้อผิดพลาด",
        description: error.message,
      });
    } finally {
      setSaving(false);
    }
  };

  const deleteMonthlyReturn = async (id: string) => {
    try {
      const { error } = await supabase
        .from("ea_monthly_returns")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "ลบสำเร็จ",
        description: "ลบข้อมูล Monthly Return เรียบร้อยแล้ว",
      });

      fetchData();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "เกิดข้อผิดพลาด",
        description: error.message,
      });
    }
  };

  const addEquityData = async (eaType: string) => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from("ea_equity_data")
        .insert({
          ea_type: eaType,
          day_number: newEquityData.day_number,
          equity_value: newEquityData.equity_value,
          record_date: newEquityData.record_date
        });

      if (error) throw error;

      toast({
        title: "บันทึกสำเร็จ",
        description: `เพิ่มข้อมูล Equity เรียบร้อยแล้ว`,
      });

      setNewEquityData({
        day_number: 0,
        equity_value: 10000,
        record_date: format(new Date(), 'yyyy-MM-dd')
      });

      fetchData();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "เกิดข้อผิดพลาด",
        description: error.message,
      });
    } finally {
      setSaving(false);
    }
  };

  const deleteEquityData = async (id: string) => {
    try {
      const { error } = await supabase
        .from("ea_equity_data")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "ลบสำเร็จ",
        description: "ลบข้อมูล Equity เรียบร้อยแล้ว",
      });

      fetchData();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "เกิดข้อผิดพลาด",
        description: error.message,
      });
    }
  };

  const getMonthName = (month: number) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[month - 1];
  };

  if (roleLoading || loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <RefreshCw className="w-8 h-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (!isAdmin && !isStaff) {
    return null;
  }

  return (
    <Layout>
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-8">
            <Link to="/admin">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="font-heading text-3xl font-bold">จัดการข้อมูล Performance</h1>
              <p className="text-muted-foreground">อัพเดทข้อมูล EA Performance ทุกสิ้นเดือน</p>
            </div>
          </div>

          <Tabs defaultValue="icf" className="space-y-6">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="icf">Trade2live ICF$</TabsTrigger>
              <TabsTrigger value="zb">Trade2live ZB$</TabsTrigger>
            </TabsList>

            {stats.map((stat) => (
              <TabsContent key={stat.ea_type} value={stat.ea_type} className="space-y-6">
                {/* Last Updated Info */}
                <Card className="border-primary/20 bg-primary/5">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-primary" />
                        <div>
                          <p className="text-sm text-muted-foreground">วันที่อัพเดทล่าสุด</p>
                          <p className="font-medium">{format(new Date(stat.last_updated_at), 'dd/MM/yyyy HH:mm')}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <TrendingUp className="w-5 h-5 text-profit" />
                        <div>
                          <p className="text-sm text-muted-foreground">วันที่เริ่ม Run EA</p>
                          <p className="font-medium">{format(new Date(stat.start_date), 'dd/MM/yyyy')}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Performance Stats */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5" />
                      ข้อมูล Performance หลัก
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>ชื่อ EA</Label>
                        <Input
                          value={stat.name}
                          onChange={(e) => handleStatsChange(stat.ea_type, 'name', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Total Return</Label>
                        <Input
                          value={stat.total_return}
                          onChange={(e) => handleStatsChange(stat.ea_type, 'total_return', e.target.value)}
                          placeholder="+52.4%"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Monthly Average</Label>
                        <Input
                          value={stat.monthly_avg}
                          onChange={(e) => handleStatsChange(stat.ea_type, 'monthly_avg', e.target.value)}
                          placeholder="+4.37%"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Max Drawdown</Label>
                        <Input
                          value={stat.max_drawdown}
                          onChange={(e) => handleStatsChange(stat.ea_type, 'max_drawdown', e.target.value)}
                          placeholder="-12.3%"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Win Rate</Label>
                        <Input
                          value={stat.win_rate}
                          onChange={(e) => handleStatsChange(stat.ea_type, 'win_rate', e.target.value)}
                          placeholder="68%"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Profit Factor</Label>
                        <Input
                          value={stat.profit_factor}
                          onChange={(e) => handleStatsChange(stat.ea_type, 'profit_factor', e.target.value)}
                          placeholder="2.1"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Total Trades</Label>
                        <Input
                          value={stat.total_trades}
                          onChange={(e) => handleStatsChange(stat.ea_type, 'total_trades', e.target.value)}
                          placeholder="847"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Trading Days</Label>
                        <Input
                          value={stat.trading_days}
                          onChange={(e) => handleStatsChange(stat.ea_type, 'trading_days', e.target.value)}
                          placeholder="248"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Sharpe Ratio</Label>
                        <Input
                          value={stat.sharpe_ratio}
                          onChange={(e) => handleStatsChange(stat.ea_type, 'sharpe_ratio', e.target.value)}
                          placeholder="1.82"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Status</Label>
                        <Input
                          value={stat.status}
                          onChange={(e) => handleStatsChange(stat.ea_type, 'status', e.target.value)}
                          placeholder="Live"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>วันที่เริ่ม Run EA</Label>
                        <Input
                          type="date"
                          value={stat.start_date}
                          onChange={(e) => handleStatsChange(stat.ea_type, 'start_date', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="flex justify-end pt-4">
                      <Button 
                        variant="gold" 
                        onClick={() => saveStats(stat.ea_type)}
                        disabled={saving}
                      >
                        <Save className="w-4 h-4 mr-2" />
                        {saving ? "กำลังบันทึก..." : "บันทึกข้อมูล"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Monthly Returns */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      ข้อมูล Monthly Returns
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Add New Monthly Return */}
                    <div className="flex flex-wrap items-end gap-4 p-4 bg-muted/50 rounded-lg">
                      <div className="space-y-2">
                        <Label>ปี</Label>
                        <Input
                          type="number"
                          value={newMonthlyReturn.year}
                          onChange={(e) => setNewMonthlyReturn(prev => ({ ...prev, year: parseInt(e.target.value) }))}
                          className="w-24"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>เดือน</Label>
                        <Input
                          type="number"
                          min={1}
                          max={12}
                          value={newMonthlyReturn.month}
                          onChange={(e) => setNewMonthlyReturn(prev => ({ ...prev, month: parseInt(e.target.value) }))}
                          className="w-20"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Return (%)</Label>
                        <Input
                          type="number"
                          step="0.01"
                          value={newMonthlyReturn.return_percent}
                          onChange={(e) => setNewMonthlyReturn(prev => ({ ...prev, return_percent: parseFloat(e.target.value) }))}
                          className="w-28"
                        />
                      </div>
                      <Button 
                        onClick={() => {
                          setSelectedEA(stat.ea_type as 'icf' | 'zb');
                          addMonthlyReturn();
                        }}
                        disabled={saving}
                      >
                        เพิ่มข้อมูล
                      </Button>
                    </div>

                    {/* Monthly Returns List */}
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm text-muted-foreground">ข้อมูลที่บันทึกไว้ ({stat.ea_type.toUpperCase()})</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
                        {monthlyReturns
                          .filter(m => m.ea_type === stat.ea_type)
                          .map((m) => (
                            <div 
                              key={m.id}
                              className="flex items-center justify-between p-2 bg-muted/30 rounded-lg text-sm group"
                            >
                              <div>
                                <span className="font-medium">{getMonthName(m.month)} {m.year}</span>
                                <span className={`ml-2 ${m.return_percent >= 0 ? 'text-profit' : 'text-loss'}`}>
                                  {m.return_percent >= 0 ? '+' : ''}{m.return_percent}%
                                </span>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="opacity-0 group-hover:opacity-100 h-6 w-6 p-0"
                                onClick={() => deleteMonthlyReturn(m.id)}
                              >
                                ×
                              </Button>
                            </div>
                          ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Equity Curve Data */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="w-5 h-5" />
                      ข้อมูล Equity Curve
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Add New Equity Data */}
                    <div className="flex flex-wrap items-end gap-4 p-4 bg-muted/50 rounded-lg">
                      <div className="space-y-2">
                        <Label>วันที่ (Day)</Label>
                        <Input
                          type="number"
                          value={newEquityData.day_number}
                          onChange={(e) => setNewEquityData(prev => ({ ...prev, day_number: parseInt(e.target.value) || 0 }))}
                          className="w-24"
                          placeholder="0"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Equity ($)</Label>
                        <Input
                          type="number"
                          step="0.01"
                          value={newEquityData.equity_value}
                          onChange={(e) => setNewEquityData(prev => ({ ...prev, equity_value: parseFloat(e.target.value) || 0 }))}
                          className="w-32"
                          placeholder="10000"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>วันที่บันทึก</Label>
                        <Input
                          type="date"
                          value={newEquityData.record_date}
                          onChange={(e) => setNewEquityData(prev => ({ ...prev, record_date: e.target.value }))}
                          className="w-40"
                        />
                      </div>
                      <Button 
                        onClick={() => addEquityData(stat.ea_type)}
                        disabled={saving}
                      >
                        เพิ่มข้อมูล
                      </Button>
                    </div>

                    {/* Equity Data List */}
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm text-muted-foreground">ข้อมูล Equity ที่บันทึกไว้ ({stat.ea_type.toUpperCase()})</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 max-h-[300px] overflow-y-auto">
                        {equityData
                          .filter(e => e.ea_type === stat.ea_type)
                          .map((e) => (
                            <div 
                              key={e.id}
                              className="flex items-center justify-between p-2 bg-muted/30 rounded-lg text-sm group"
                            >
                              <div>
                                <span className="font-medium">Day {e.day_number}</span>
                                <span className="ml-2 text-profit">${Number(e.equity_value).toLocaleString()}</span>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="opacity-0 group-hover:opacity-100 h-6 w-6 p-0 text-destructive"
                                onClick={() => deleteEquityData(e.id)}
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          ))}
                      </div>
                      {equityData.filter(e => e.ea_type === stat.ea_type).length === 0 && (
                        <p className="text-sm text-muted-foreground italic">ยังไม่มีข้อมูล Equity</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>
    </Layout>
  );
};

export default AdminPerformancePage;
