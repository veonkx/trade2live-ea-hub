
-- Create VPS subscriptions table
CREATE TABLE public.vps_subscriptions (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  vps_plan_id uuid REFERENCES public.vps_plans(id) ON DELETE SET NULL,
  plan_name text NOT NULL,
  status text NOT NULL DEFAULT 'active',
  start_date timestamp with time zone NOT NULL DEFAULT now(),
  end_date timestamp with time zone NOT NULL,
  ip_address text,
  username text,
  password text,
  notes text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.vps_subscriptions ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Admin/Staff can manage VPS subscriptions"
ON public.vps_subscriptions
FOR ALL
USING (is_admin_or_staff(auth.uid()));

CREATE POLICY "Users can view their own VPS subscriptions"
ON public.vps_subscriptions
FOR SELECT
USING (auth.uid() = user_id);

-- Trigger for updated_at
CREATE TRIGGER update_vps_subscriptions_updated_at
BEFORE UPDATE ON public.vps_subscriptions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
