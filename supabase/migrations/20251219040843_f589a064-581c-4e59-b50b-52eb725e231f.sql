-- Add operating system column to vps_plans
ALTER TABLE public.vps_plans 
ADD COLUMN os_type text NOT NULL DEFAULT 'Windows 10';

-- Update existing plans with OS options
UPDATE public.vps_plans SET os_type = 'Windows 10' WHERE name = 'Basic';
UPDATE public.vps_plans SET os_type = 'Windows 10 / Windows Server 2019' WHERE name = 'Standard';
UPDATE public.vps_plans SET os_type = 'Windows 10 / Windows Server 2022' WHERE name = 'Pro';