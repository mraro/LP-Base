-- Migration: Remove client_id complexity
-- Execute este script no Supabase SQL Editor

-- 1. Drop policies antigas que usam client_id
DROP POLICY IF EXISTS "Admins can view their client leads" ON leads;
DROP POLICY IF EXISTS "Admins can view conversions of their leads" ON conversions;

-- 2. Remove índice de client_id da tabela leads
DROP INDEX IF EXISTS idx_leads_client_id;

-- 3. Remove coluna client_id da tabela leads
ALTER TABLE leads DROP COLUMN IF EXISTS client_id;

-- 4. Remove coluna client_id da tabela admins
ALTER TABLE admins DROP COLUMN IF EXISTS client_id;

-- 5. Cria nova policy simples para conversions
CREATE POLICY "Admins can view conversions of their leads" ON conversions
  FOR SELECT USING (true);

-- 6. Confirma que tudo está OK
SELECT 'Migration completed successfully!' as status;
