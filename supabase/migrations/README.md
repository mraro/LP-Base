# Supabase Migrations

Este diretório contém as migrations do banco de dados do projeto 3S-CARS.

## 📋 Migrations Disponíveis

### 1. `add_unique_constraints_leads.sql`

**Objetivo**: Adicionar constraints UNIQUE em `email` e `phone` na tabela `leads`.

**O que faz**:
- Remove duplicatas existentes (mantém registro mais antigo)
- Adiciona constraint `UNIQUE` em `email`
- Adiciona constraint `UNIQUE` em `phone`
- Cria índices únicos para melhor performance

**Quando executar**: Antes de colocar o formulário em produção.

---

## 🚀 Como Aplicar as Migrations

### Opção 1: Via Supabase Dashboard (Recomendado)

1. Acesse o [Supabase Dashboard](https://supabase.com/dashboard)
2. Selecione seu projeto
3. Vá em **SQL Editor** (ícone de banco de dados na sidebar)
4. Clique em **+ New Query**
5. Copie e cole o conteúdo de `add_unique_constraints_leads.sql`
6. Clique em **Run** (ou pressione `Ctrl+Enter`)
7. Verifique se executou sem erros

### Opção 2: Via Supabase CLI

```bash
# 1. Certifique-se de estar logado
supabase login

# 2. Link com seu projeto remoto
supabase link --project-ref <your-project-ref>

# 3. Execute a migration
supabase db push
```

### Opção 3: Usando SQL direto

```bash
# Via psql
psql postgresql://<user>:<password>@<host>:5432/<database> -f supabase/migrations/add_unique_constraints_leads.sql

# Via node (exemplo)
node -e "require('fs').readFileSync('supabase/migrations/add_unique_constraints_leads.sql', 'utf8')"
```

---

## ✅ Verificar se a Migration Foi Aplicada

Execute no **SQL Editor** do Supabase:

```sql
-- Verificar constraints
SELECT
  conname AS constraint_name,
  contype AS constraint_type,
  pg_get_constraintdef(c.oid) AS definition
FROM pg_constraint c
JOIN pg_class t ON c.conrelid = t.oid
WHERE t.relname = 'leads'
AND contype IN ('u', 'p'); -- u = unique, p = primary key

-- Esperado:
-- leads_email_unique | u | UNIQUE (email)
-- leads_phone_unique | u | UNIQUE (phone)
```

---

## 🔄 Rollback (Desfazer)

Se precisar reverter a migration:

```sql
-- Remover constraints UNIQUE
ALTER TABLE leads DROP CONSTRAINT IF EXISTS leads_email_unique;
ALTER TABLE leads DROP CONSTRAINT IF EXISTS leads_phone_unique;

-- Remover índices únicos
DROP INDEX IF EXISTS idx_leads_email_unique;
DROP INDEX IF EXISTS idx_leads_phone_unique;

-- Recriar índices não-únicos (opcionais)
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_phone ON leads(phone);
```

---

## ⚠️ Avisos Importantes

### Duplicatas Existentes

Se você já tem duplicatas no banco:
1. A migration vai **deletar automaticamente** os registros duplicados
2. Será mantido apenas o **mais antigo** (menor `id`)
3. **Recomendação**: Faça backup antes de executar

### Backup Recomendado

```sql
-- Criar backup da tabela leads
CREATE TABLE leads_backup AS SELECT * FROM leads;

-- Se algo der errado, restaurar:
-- TRUNCATE leads;
-- INSERT INTO leads SELECT * FROM leads_backup;
```

---

## 📊 Impacto da Migration

### Antes (Sem Constraints)

| Email | Phone | Ação |
|-------|-------|------|
| `test@email.com` | `11987654321` | ✅ Inserido |
| `test@email.com` | `11999999999` | ✅ Inserido (duplicata!) |
| `outro@email.com` | `11987654321` | ✅ Inserido (duplicata!) |

### Depois (Com Constraints)

| Email | Phone | Ação |
|-------|-------|------|
| `test@email.com` | `11987654321` | ✅ Inserido |
| `test@email.com` | `11999999999` | ❌ Erro: Email duplicado |
| `outro@email.com` | `11987654321` | ❌ Erro: Phone duplicado |

---

## 🧪 Testar as Constraints

Após aplicar a migration, teste:

```sql
-- 1. Inserir lead válido
INSERT INTO leads (name, email, phone)
VALUES ('Teste 1', 'test1@example.com', '11987654321');
-- ✅ Sucesso

-- 2. Tentar inserir email duplicado
INSERT INTO leads (name, email, phone)
VALUES ('Teste 2', 'test1@example.com', '11999999999');
-- ❌ Erro: duplicate key value violates unique constraint "leads_email_unique"

-- 3. Tentar inserir phone duplicado
INSERT INTO leads (name, email, phone)
VALUES ('Teste 3', 'test2@example.com', '11987654321');
-- ❌ Erro: duplicate key value violates unique constraint "leads_phone_unique"
```

---

## 🔗 Integração com o Código

O error handling no arquivo `app/api/leads/route.ts` já está preparado para detectar duplicatas:

```typescript
if (leadError.code === "23505") { // PostgreSQL unique violation
  if (leadError.message.includes("email")) {
    return NextResponse.json(
      { success: false, message: "Este e-mail já está cadastrado" },
      { status: 400 }
    );
  }
  if (leadError.message.includes("phone")) {
    return NextResponse.json(
      { success: false, message: "Este número de WhatsApp já está cadastrado" },
      { status: 400 }
    );
  }
}
```

**Código do erro PostgreSQL**: `23505 = unique_violation`

---

## 📝 Histórico de Migrations

| Data | Migration | Descrição |
|------|-----------|-----------|
| 2025-10-20 | `add_unique_constraints_leads.sql` | Adiciona UNIQUE em email e phone |
| (anterior) | `remove_client_id.sql` | Remove campo client_id |

---

## 🆘 Troubleshooting

### Erro: "duplicate key value violates unique constraint"

**Causa**: Já existem duplicatas no banco

**Solução**:
```sql
-- Verificar duplicatas de EMAIL
SELECT email, COUNT(*)
FROM leads
GROUP BY email
HAVING COUNT(*) > 1;

-- Verificar duplicatas de PHONE
SELECT phone, COUNT(*)
FROM leads
WHERE phone IS NOT NULL
GROUP BY phone
HAVING COUNT(*) > 1;

-- A migration já remove duplicatas automaticamente
-- Basta executá-la novamente
```

### Erro: "relation 'leads' does not exist"

**Causa**: Tabela ainda não foi criada

**Solução**: Execute primeiro `schema.sql` e depois a migration

---

**Última atualização**: 2025-10-20
