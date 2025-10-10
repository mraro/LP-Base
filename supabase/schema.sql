-- Tabela de Leads
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  message TEXT,
  source VARCHAR(100),           -- utm_source
  medium VARCHAR(100),           -- utm_medium
  campaign VARCHAR(100),         -- utm_campaign
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  client_id VARCHAR(100) NOT NULL DEFAULT 'default'
);

-- Tabela de Conversões (para tracking)
CREATE TABLE IF NOT EXISTS conversions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  event_name VARCHAR(100) NOT NULL,
  value DECIMAL(10,2),
  currency VARCHAR(3) DEFAULT 'BRL',
  fbp VARCHAR(255),              -- Facebook browser ID
  fbc VARCHAR(255),              -- Facebook click ID
  gclid VARCHAR(255),            -- Google click ID
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de Admins
CREATE TABLE IF NOT EXISTS admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  client_id VARCHAR(100) NOT NULL DEFAULT 'default',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de Configuração (Tracking IDs)
CREATE TABLE IF NOT EXISTS tracking_config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id VARCHAR(100) UNIQUE NOT NULL,
  meta_pixel_id VARCHAR(50),
  google_analytics_id VARCHAR(50),
  google_ads_conversion_id VARCHAR(50),
  google_ads_conversion_label VARCHAR(50),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes para performance
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_client_id ON leads(client_id);
CREATE INDEX IF NOT EXISTS idx_conversions_lead_id ON conversions(lead_id);
CREATE INDEX IF NOT EXISTS idx_admins_email ON admins(email);
CREATE INDEX IF NOT EXISTS idx_tracking_config_client_id ON tracking_config(client_id);

-- RLS (Row Level Security) Policies
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversions ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE tracking_config ENABLE ROW LEVEL SECURITY;

-- Policy para inserir leads (public)
CREATE POLICY "Anyone can insert leads" ON leads
  FOR INSERT WITH CHECK (true);

-- Policy para admins verem apenas seus leads
CREATE POLICY "Admins can view their client leads" ON leads
  FOR SELECT USING (
    client_id IN (
      SELECT client_id FROM admins WHERE email = auth.jwt() ->> 'email'
    )
  );

-- Policy para conversions
CREATE POLICY "Anyone can insert conversions" ON conversions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view conversions of their leads" ON conversions
  FOR SELECT USING (
    lead_id IN (
      SELECT id FROM leads WHERE client_id IN (
        SELECT client_id FROM admins WHERE email = auth.jwt() ->> 'email'
      )
    )
  );

-- Seed inicial (admin padrão - senha: admin123)
-- IMPORTANTE: Alterar a senha após o primeiro login!
INSERT INTO admins (email, password_hash, client_id)
VALUES (
  'admin@example.com',
  '$2a$10$rK5JLJ5z5z5z5z5z5z5z5uX5YqJ5z5z5z5z5z5z5z5z5z5z5z5z5z',
  'default'
) ON CONFLICT (email) DO NOTHING;

-- Seed de tracking config padrão
INSERT INTO tracking_config (client_id)
VALUES ('default')
ON CONFLICT (client_id) DO NOTHING;

-- Function para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para tracking_config
CREATE TRIGGER update_tracking_config_updated_at
  BEFORE UPDATE ON tracking_config
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
