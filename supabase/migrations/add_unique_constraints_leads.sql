-- Migration: Adicionar constraints UNIQUE em email e phone na tabela leads
-- Created: 2025-10-20
-- Purpose: Prevenir duplicatas de email e WhatsApp

-- 1. Remover duplicatas existentes ANTES de adicionar constraint
-- (mantém apenas o registro mais antigo de cada email/phone duplicado)

-- Remove duplicatas de EMAIL (mantém o mais antigo por created_at)
DELETE FROM leads
WHERE id IN (
  SELECT id
  FROM (
    SELECT id,
           ROW_NUMBER() OVER (PARTITION BY email ORDER BY created_at ASC, id::text ASC) AS rn
    FROM leads
  ) t
  WHERE rn > 1
);

-- Remove duplicatas de PHONE (mantém o mais antigo por created_at)
DELETE FROM leads
WHERE id IN (
  SELECT id
  FROM (
    SELECT id,
           ROW_NUMBER() OVER (PARTITION BY phone ORDER BY created_at ASC, id::text ASC) AS rn
    FROM leads
    WHERE phone IS NOT NULL AND phone != ''
  ) t
  WHERE rn > 1
);

-- 2. Adicionar constraint UNIQUE em email
ALTER TABLE leads
ADD CONSTRAINT leads_email_unique UNIQUE (email);

-- 3. Adicionar constraint UNIQUE em phone
ALTER TABLE leads
ADD CONSTRAINT leads_phone_unique UNIQUE (phone);

-- 4. Criar índices parciais para melhor performance
-- (índice apenas para phones não-nulos, já que UNIQUE permite múltiplos NULLs)
DROP INDEX IF EXISTS idx_leads_email; -- Remove índice antigo
CREATE UNIQUE INDEX idx_leads_email_unique ON leads(email);

DROP INDEX IF EXISTS idx_leads_phone; -- Remove índice antigo se existir
CREATE UNIQUE INDEX idx_leads_phone_unique ON leads(phone) WHERE phone IS NOT NULL;

-- 5. Comentários para documentação
COMMENT ON CONSTRAINT leads_email_unique ON leads IS 'Garante que cada email seja único na tabela de leads';
COMMENT ON CONSTRAINT leads_phone_unique ON leads IS 'Garante que cada número de WhatsApp seja único na tabela de leads';
