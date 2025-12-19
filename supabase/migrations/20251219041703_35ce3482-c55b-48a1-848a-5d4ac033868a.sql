-- Add duration-based pricing columns
ALTER TABLE public.vps_plans 
ADD COLUMN price_3m_usd numeric NOT NULL DEFAULT 0,
ADD COLUMN price_6m_usd numeric NOT NULL DEFAULT 0,
ADD COLUMN price_12m_usd numeric NOT NULL DEFAULT 0,
ADD COLUMN price_3m_lak numeric NOT NULL DEFAULT 0,
ADD COLUMN price_6m_lak numeric NOT NULL DEFAULT 0,
ADD COLUMN price_12m_lak numeric NOT NULL DEFAULT 0;

-- Update pricing for Basic plan (5% off for 3m, 10% off for 6m, 15% off for 12m)
UPDATE public.vps_plans SET 
  price_3m_usd = 43,
  price_6m_usd = 81,
  price_12m_usd = 153,
  price_3m_lak = 950000,
  price_6m_lak = 1800000,
  price_12m_lak = 3400000
WHERE name = 'Basic';

-- Update pricing for Standard plan
UPDATE public.vps_plans SET 
  price_3m_usd = 71,
  price_6m_usd = 135,
  price_12m_usd = 255,
  price_3m_lak = 1570000,
  price_6m_lak = 2970000,
  price_12m_lak = 5610000
WHERE name = 'Standard';

-- Update pricing for Pro plan
UPDATE public.vps_plans SET 
  price_3m_usd = 128,
  price_6m_usd = 243,
  price_12m_usd = 459,
  price_3m_lak = 2820000,
  price_6m_lak = 5350000,
  price_12m_lak = 10100000
WHERE name = 'Pro';