-- Create table for EA performance stats
CREATE TABLE public.ea_performance_stats (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ea_type TEXT NOT NULL CHECK (ea_type IN ('icf', 'zb')),
  name TEXT NOT NULL,
  total_return TEXT NOT NULL DEFAULT '0%',
  monthly_avg TEXT NOT NULL DEFAULT '0%',
  max_drawdown TEXT NOT NULL DEFAULT '0%',
  win_rate TEXT NOT NULL DEFAULT '0%',
  profit_factor TEXT NOT NULL DEFAULT '0',
  total_trades TEXT NOT NULL DEFAULT '0',
  trading_days TEXT NOT NULL DEFAULT '0',
  sharpe_ratio TEXT NOT NULL DEFAULT '0',
  status TEXT NOT NULL DEFAULT 'Live',
  start_date DATE NOT NULL DEFAULT CURRENT_DATE,
  last_updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(ea_type)
);

-- Create table for monthly returns data
CREATE TABLE public.ea_monthly_returns (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ea_type TEXT NOT NULL CHECK (ea_type IN ('icf', 'zb')),
  year INTEGER NOT NULL,
  month INTEGER NOT NULL CHECK (month >= 1 AND month <= 12),
  return_percent DECIMAL(10, 2) NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(ea_type, year, month)
);

-- Create table for equity curve data
CREATE TABLE public.ea_equity_data (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ea_type TEXT NOT NULL CHECK (ea_type IN ('icf', 'zb')),
  day_number INTEGER NOT NULL,
  equity_value DECIMAL(15, 2) NOT NULL DEFAULT 10000,
  record_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(ea_type, day_number)
);

-- Enable RLS
ALTER TABLE public.ea_performance_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ea_monthly_returns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ea_equity_data ENABLE ROW LEVEL SECURITY;

-- Public read policies (anyone can view performance data)
CREATE POLICY "Anyone can view EA performance stats"
ON public.ea_performance_stats
FOR SELECT
USING (true);

CREATE POLICY "Anyone can view EA monthly returns"
ON public.ea_monthly_returns
FOR SELECT
USING (true);

CREATE POLICY "Anyone can view EA equity data"
ON public.ea_equity_data
FOR SELECT
USING (true);

-- Admin/Staff management policies
CREATE POLICY "Admin/Staff can manage EA performance stats"
ON public.ea_performance_stats
FOR ALL
USING (is_admin_or_staff(auth.uid()));

CREATE POLICY "Admin/Staff can manage EA monthly returns"
ON public.ea_monthly_returns
FOR ALL
USING (is_admin_or_staff(auth.uid()));

CREATE POLICY "Admin/Staff can manage EA equity data"
ON public.ea_equity_data
FOR ALL
USING (is_admin_or_staff(auth.uid()));

-- Triggers for updated_at
CREATE TRIGGER update_ea_performance_stats_updated_at
BEFORE UPDATE ON public.ea_performance_stats
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_ea_monthly_returns_updated_at
BEFORE UPDATE ON public.ea_monthly_returns
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_ea_equity_data_updated_at
BEFORE UPDATE ON public.ea_equity_data
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default data for ICF and ZB
INSERT INTO public.ea_performance_stats (ea_type, name, total_return, monthly_avg, max_drawdown, win_rate, profit_factor, total_trades, trading_days, sharpe_ratio, start_date)
VALUES 
  ('icf', 'Trade2live ICF$', '+52.4%', '+4.37%', '-12.3%', '68%', '2.1', '847', '248', '1.82', '2024-01-01'),
  ('zb', 'Trade2live ZB$', '+38.2%', '+3.18%', '-8.1%', '72%', '2.4', '623', '284', '2.14', '2024-01-01');