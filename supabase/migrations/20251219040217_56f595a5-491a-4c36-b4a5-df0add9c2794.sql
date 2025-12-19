-- Create VPS plans table
CREATE TABLE public.vps_plans (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  price_usd numeric NOT NULL DEFAULT 0,
  price_lak numeric NOT NULL DEFAULT 0,
  ram text NOT NULL DEFAULT '2 GB',
  cpu text NOT NULL DEFAULT '1 Core',
  storage text NOT NULL DEFAULT '30 GB SSD',
  mt_accounts integer NOT NULL DEFAULT 1,
  is_popular boolean NOT NULL DEFAULT false,
  sort_order integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.vps_plans ENABLE ROW LEVEL SECURITY;

-- Public can view active VPS plans
CREATE POLICY "Anyone can view active VPS plans"
ON public.vps_plans
FOR SELECT
USING (is_active = true);

-- Admin/Staff can manage VPS plans
CREATE POLICY "Admin/Staff can manage VPS plans"
ON public.vps_plans
FOR ALL
USING (is_admin_or_staff(auth.uid()));

-- Create trigger for updated_at
CREATE TRIGGER update_vps_plans_updated_at
BEFORE UPDATE ON public.vps_plans
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default plans
INSERT INTO public.vps_plans (name, price_usd, price_lak, ram, cpu, storage, mt_accounts, is_popular, sort_order)
VALUES 
  ('Basic', 15, 150000, '2 GB', '1 Core', '30 GB SSD', 1, false, 1),
  ('Standard', 25, 250000, '4 GB', '2 Cores', '50 GB SSD', 2, true, 2),
  ('Pro', 45, 450000, '8 GB', '4 Cores', '100 GB SSD', 4, false, 3);