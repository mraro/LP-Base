# Scripts Úteis

## create-admin.js

Cria um novo usuário admin gerando o hash da senha automaticamente.

### Uso

```bash
node scripts/create-admin.js EMAIL SENHA [CLIENT_ID]
```

### Exemplos

#### Admin padrão
```bash
node scripts/create-admin.js admin@cliente.com minhasenha123
```

#### Admin para cliente específico
```bash
node scripts/create-admin.js admin@clienteabc.com senha123 cliente_abc
```

### Passos

1. Execute o script no terminal
2. Copie o SQL gerado
3. Cole no Supabase SQL Editor
4. Execute o SQL
5. Faça login com as credenciais

### Segurança

⚠️ **NUNCA** commite senhas no repositório!
⚠️ **SEMPRE** use senhas fortes em produção!
⚠️ **MUDE** a senha padrão após o primeiro login!

---

## Outros Scripts (Futuro)

Adicione mais scripts úteis aqui:

- `seed-database.js` - Popular banco com dados de exemplo
- `migrate-data.js` - Migrar dados entre ambientes
- `export-leads.js` - Exportar leads via CLI
- `check-health.js` - Verificar saúde do sistema
