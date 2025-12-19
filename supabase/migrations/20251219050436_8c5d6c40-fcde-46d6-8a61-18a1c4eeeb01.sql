-- Create table for MT5 investor accounts
CREATE TABLE public.mt5_investor_accounts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  account_name TEXT NOT NULL,
  account_number TEXT NOT NULL,
  server_name TEXT NOT NULL,
  investor_password TEXT NOT NULL,
  broker_name TEXT,
  ea_type TEXT NOT NULL DEFAULT 'icf',
  description TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.mt5_investor_accounts ENABLE ROW LEVEL SECURITY;

-- Anyone can view active accounts (for performance page)
CREATE POLICY "Anyone can view active MT5 accounts" 
ON public.mt5_investor_accounts 
FOR SELECT 
USING (is_active = true);

-- Admin/Staff can manage accounts
CREATE POLICY "Admin/Staff can manage MT5 accounts" 
ON public.mt5_investor_accounts 
FOR ALL 
USING (is_admin_or_staff(auth.uid()));

-- Add trigger for updated_at
CREATE TRIGGER update_mt5_investor_accounts_updated_at
BEFORE UPDATE ON public.mt5_investor_accounts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();