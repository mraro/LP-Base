# 📦 Guia de Instalação - Primeira Vez

## ⚡ Instalação Rápida (Para Quem Tem Pressa)

```bash
# 1. Instalar dependências
npm install

# 2. Copiar arquivo de exemplo
copy .env.example .env.local
# (ou cp .env.example .env.local no Mac/Linux)

# 3. Editar .env.local com suas credenciais

# 4. Iniciar servidor
npm run dev

# Pronto! Acesse http://localhost:3000
```

---

## 📋 Instalação Detalhada

### Passo 1: Verificar Pré-requisitos

```bash
# Node.js (v18+)
node --version

# npm
npm --version

# Git (opcional)
git --version
```

**Não tem Node.js?** [Baixe aqui](https://nodejs.org/)

---

### Passo 2: Instalar Dependências

```bash
npm install
```

**Tempo:** ~2-3 minutos

**O que está sendo instalado:**
- Next.js 15
- React 19
- Supabase Client
- NextAuth
- Framer Motion
- Tailwind CSS
- shadcn/ui
- E mais...

---

### Passo 3: Configurar Supabase

#### 3.1. Criar Conta no Supabase

1. Acesse [supabase.com](https://supabase.com)
2. Clique em "Start your project"
3. Faça login com GitHub (recomendado)

#### 3.2. Criar Novo Projeto

1. Clique em "New Project"
2. Preencha:
   - **Name:** `base-lp` (ou nome do cliente)
   - **Database Password:** Use um gerador de senhas
   - **Region:** `South America (São Paulo)`
3. Clique em "Create new project"
4. Aguarde ~2 minutos

#### 3.3. Copiar Credenciais

1. Vá em **Settings** (ícone de engrenagem)
2. Clique em **API**
3. Copie:
   - **Project URL** (ex: https://xxx.supabase.co)
   - **anon public** key
   - **service_role** key (clique em "Reveal")

**⚠️ Guarde essas credenciais com segurança!**

#### 3.4. Executar Schema SQL

1. No Supabase, vá em **SQL Editor** (no menu lateral)
2. Clique em "+ New query"
3. Abra o arquivo `supabase/schema.sql` deste projeto
4. Copie TODO o conteúdo
5. Cole no SQL Editor do Supabase
6. Clique em "Run" (ou Ctrl/Cmd + Enter)
7. Aguarde até ver "Success. No rows returned"

**Se der erro:**
- Verifique se copiou o SQL completo
- Tente executar em partes menores
- Verifique a aba "Logs" para detalhes do erro

---

### Passo 4: Configurar Variáveis de Ambiente

#### 4.1. Criar arquivo .env.local

**Windows (PowerShell):**
```powershell
copy .env.example .env.local
notepad .env.local
```

**Mac/Linux:**
```bash
cp .env.example .env.local
nano .env.local
```

#### 4.2. Preencher Credenciais do Supabase

```env
# Cole as credenciais que você copiou
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxxx...
```

#### 4.3. Gerar NEXTAUTH_SECRET

**Opção 1 - Node.js:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

**Opção 2 - OpenSSL (Mac/Linux):**
```bash
openssl rand -base64 32
```

**Opção 3 - Online:**
https://generate-secret.vercel.app/32

Copie o resultado e cole no .env.local:

```env
NEXTAUTH_SECRET=o_secret_gerado_aqui
```

#### 4.4. Configurar NEXTAUTH_URL

```env
# Desenvolvimento
NEXTAUTH_URL=http://localhost:3000

# Produção (depois do deploy)
# NEXTAUTH_URL=https://seu-site.vercel.app
```

#### 4.5. Arquivo .env.local Completo

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxxx...

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=seu_secret_aqui

# Tracking (deixe vazio por enquanto)
NEXT_PUBLIC_META_PIXEL_ID=
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=
NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID=
NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL=

# Client ID
NEXT_PUBLIC_CLIENT_ID=default
```

**⚠️ IMPORTANTE:**
- NUNCA commite o .env.local para o Git
- Ele já está no .gitignore
- Mantenha backup seguro dessas credenciais

---

### Passo 5: Iniciar Servidor de Desenvolvimento

```bash
npm run dev
```

Aguarde ver:

```
✓ Ready in 2.5s
○ Local:   http://localhost:3000
```

---

### Passo 6: Testar Aplicação

#### 6.1. Testar Landing Page

1. Abra http://localhost:3000
2. Deve ver a landing page
3. Role a página
4. Veja as animações funcionando

**Problemas?**
- Veja erros no terminal
- Abra console do browser (F12)
- Verifique .env.local

#### 6.2. Testar Formulário

1. Role até o formulário
2. Preencha:
   - Nome: João Teste
   - Email: teste@email.com
   - Telefone: (11) 99999-9999
   - Mensagem: Teste
3. Clique em "Enviar"
4. Deve ver mensagem de sucesso

**Se der erro:**
- Veja console do browser (F12)
- Verifique se o schema SQL foi executado
- Confirme credenciais do Supabase

#### 6.3. Verificar Lead no Supabase

1. Vá no Supabase Dashboard
2. Clique em "Table Editor"
3. Selecione tabela "leads"
4. Deve ver o lead de teste

**Sucesso!** ✅ O formulário está funcionando!

#### 6.4. Testar Login Admin

1. Acesse http://localhost:3000/admin/login
2. Use credenciais padrão:
   ```
   Email: admin@example.com
   Senha: admin123
   ```
3. Clique em "Entrar"
4. Deve redirecionar para dashboard

**⚠️ IMPORTANTE:** Altere essa senha após o primeiro login!

#### 6.5. Ver Lead no Admin

1. No menu, clique em "Leads"
2. Deve ver o lead de teste
3. Clique em "Exportar CSV" para testar export

**Tudo funcionando?** 🎉 Instalação concluída!

---

## ✅ Checklist de Instalação

- [ ] Node.js instalado (v18+)
- [ ] Dependências instaladas (`npm install`)
- [ ] Projeto Supabase criado
- [ ] Schema SQL executado
- [ ] Arquivo .env.local criado
- [ ] Credenciais Supabase configuradas
- [ ] NEXTAUTH_SECRET gerado
- [ ] Servidor iniciado (`npm run dev`)
- [ ] Landing page acessível (http://localhost:3000)
- [ ] Formulário testado e funcionando
- [ ] Lead aparece no Supabase
- [ ] Login admin funcionando
- [ ] Lead visível no admin

---

## 🐛 Problemas Comuns

### "npm install" falha

**Erro: EACCES permissions**
```bash
# Limpar cache
npm cache clean --force

# Tentar novamente
npm install
```

**Erro: Network timeout**
- Verifique conexão com internet
- Tente com VPN desligado
- Use `npm install --prefer-offline`

---

### "Cannot connect to Supabase"

**Verificar:**

1. **Credenciais corretas?**
   ```bash
   # Windows
   type .env.local

   # Mac/Linux
   cat .env.local
   ```

2. **Projeto Supabase ativo?**
   - Vá no Supabase Dashboard
   - Veja se projeto está "Healthy"

3. **RLS configurado?**
   - Vá em Authentication > Policies
   - Deve ter políticas nas tabelas

**Solução:**
- Reexecute o schema.sql completo
- Verifique se copiou as credenciais certas

---

### "NextAuth error"

**Erro: No secret provided**

```env
# Gere um novo secret
NEXTAUTH_SECRET=...
```

**Erro: Invalid redirect**

```env
# Verifique a URL
NEXTAUTH_URL=http://localhost:3000
```

---

### "Build falha"

```bash
# Limpar cache do Next.js
rm -rf .next

# (Windows PowerShell)
Remove-Item -Recurse -Force .next

# Build novamente
npm run build
```

---

### "Port 3000 já em uso"

**Opção 1 - Mudar porta:**
```bash
# Windows
set PORT=3001 && npm run dev

# Mac/Linux
PORT=3001 npm run dev
```

**Opção 2 - Matar processo:**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9
```

---

## 📝 Próximos Passos

Instalação concluída! Agora:

1. **Personalizar Conteúdo**
   - Leia [CUSTOMIZATION.md](./CUSTOMIZATION.md)
   - Edite `config/site.config.ts`

2. **Ajustar Cores**
   - Edite `app/globals.css`
   - Escolha sua paleta

3. **Criar Admin Personalizado**
   ```bash
   node scripts/create-admin.js seu@email.com senha123
   ```

4. **Configurar Tracking** (opcional)
   - Adicione IDs no .env.local
   - Leia [CAMPAIGN-GUIDE.md](./CAMPAIGN-GUIDE.md)

5. **Deploy em Produção**
   - Leia [README.md](./README.md) seção "Deploy"
   - Use Vercel (gratuito)

---

## 🎓 Aprender Mais

### Documentação do Projeto

- **README.md** - Documentação completa
- **GETTING-STARTED.md** - Setup passo a passo
- **CUSTOMIZATION.md** - Como personalizar
- **CAMPAIGN-GUIDE.md** - Guia de campanhas
- **QUICK-REFERENCE.md** - Referência rápida

### Tecnologias

- [Next.js](https://nextjs.org/docs)
- [Supabase](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)

---

## 💬 Precisa de Ajuda?

1. **Verifique a documentação** (README.md)
2. **Veja erros no terminal**
3. **Abra console do browser** (F12)
4. **Tente reexecutar schema SQL**
5. **Verifique .env.local**
6. **Reinstale dependências** (`rm -rf node_modules && npm install`)

---

## 🎉 Instalação Concluída!

Agora você tem:

✅ Servidor rodando localmente
✅ Banco de dados configurado
✅ Formulário capturando leads
✅ Admin funcionando

**Próximo:** Personalize o conteúdo e faça deploy! 🚀

---

_Tempo total de instalação: 15-20 minutos_
