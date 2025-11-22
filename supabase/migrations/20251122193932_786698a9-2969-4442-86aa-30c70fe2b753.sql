-- Create medicines table
CREATE TABLE public.medicines (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  qr_hash TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  brand TEXT NOT NULL,
  batch TEXT NOT NULL,
  expiry DATE NOT NULL,
  is_genuine BOOLEAN NOT NULL DEFAULT true,
  category TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create scan_logs table
CREATE TABLE public.scan_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  qr_hash TEXT NOT NULL,
  result TEXT NOT NULL CHECK (result IN ('genuine', 'counterfeit', 'unknown')),
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  city TEXT NOT NULL,
  synced BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create pharmacies table
CREATE TABLE public.pharmacies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT,
  counterfeit_count INTEGER NOT NULL DEFAULT 0,
  total_scans INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create enforcement_alerts table
CREATE TABLE public.enforcement_alerts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  pharmacy_id UUID REFERENCES public.pharmacies(id) ON DELETE CASCADE,
  severity TEXT NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  detection_count INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL CHECK (status IN ('pending', 'investigating', 'resolved', 'escalated')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.medicines ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scan_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pharmacies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enforcement_alerts ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (demo app)
CREATE POLICY "Allow public read access to medicines" 
ON public.medicines FOR SELECT 
USING (true);

CREATE POLICY "Allow public read access to scan_logs" 
ON public.scan_logs FOR SELECT 
USING (true);

CREATE POLICY "Allow public read access to pharmacies" 
ON public.pharmacies FOR SELECT 
USING (true);

CREATE POLICY "Allow public read access to enforcement_alerts" 
ON public.enforcement_alerts FOR SELECT 
USING (true);

-- Allow public insert for scan logs (from app)
CREATE POLICY "Allow public insert to scan_logs" 
ON public.scan_logs FOR INSERT 
WITH CHECK (true);

-- Create indexes for better query performance
CREATE INDEX idx_scan_logs_timestamp ON public.scan_logs(timestamp DESC);
CREATE INDEX idx_scan_logs_city ON public.scan_logs(city);
CREATE INDEX idx_scan_logs_result ON public.scan_logs(result);
CREATE INDEX idx_medicines_qr_hash ON public.medicines(qr_hash);
CREATE INDEX idx_pharmacies_city ON public.pharmacies(city);

-- Enable realtime for scan_logs and enforcement_alerts
ALTER PUBLICATION supabase_realtime ADD TABLE public.scan_logs;
ALTER PUBLICATION supabase_realtime ADD TABLE public.enforcement_alerts;