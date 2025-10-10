# 🚀 Primeiros Passos - Guia Rápido

Este guia vai te ajudar a colocar a landing page no ar em **menos de 30 minutos**.

---

## ✅ Pré-requisitos

Certifique-se de ter:
- [Node.js](https://nodejs.org/) (v18 ou superior)
- [Git](https://git-scm.com/)
- Conta no [Supabase](https://supabase.com) (gratuita)
- Conta na [Vercel](https://vercel.com) (gratuita)

---

## 📦 Passo 1: Instalar Dependências

```bash
npm install
```

⏱️ Tempo estimado: 2-3 minutos

---

## 🗄️ Passo 2: Configurar Supabase

### 2.1 Criar Projeto

1. Acesse [supabase.com](https://supabase.com)
2. Clique em "New Project"
3. Preencha:
   - **Name:** base-lp-cliente
   - **Database Password:** (gere uma senha forte)
   - **Region:** South America (São Paulo)
4. Clique em "Create new project"

⏱️ Tempo estimado: 2 minutos

### 2.2 Copiar Credenciais

1. Vá em **Settings** > **API**
2. Copie:
   - **Project URL** (`https://xxx.supabase.co`)
   - **anon public** key
   - **service_role** key (clique em "Reveal")

### 2.3 Executar Schema SQL

1. Vá em **SQL Editor** no Supabase
2. Clique em "New Query"
3. Copie TODO o conteúdo de `supabase/schema.sql`
4. Cole no editor
5. Clique em "Run" (Ctrl/Cmd + Enter)
6. Deve aparecer "Success. No rows returned"

⏱️ Tempo estimado: 2 minutos

---

## ⚙️ Passo 3: Configurar Variáveis de Ambiente

### 3.1 Criar arquivo .env.local

Na raiz do projeto, crie o arquivo `.env.local`:

```env
# Supabase (Cole suas credenciais aqui)
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxxx...

# NextAuth (Gere um secret abaixo)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=cole_o_secret_aqui

# Tracking (Deixe vazio por enquanto)
NEXT_PUBLIC_META_PIXEL_ID=
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=
NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID=
NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL=

# Client ID
NEXT_PUBLIC_CLIENT_ID=default
```

### 3.2 Gerar NEXTAUTH_SECRET

**Windows (PowerShell):**
```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

**Mac/Linux:**
```bash
openssl rand -base64 32
```

Copie o resultado e cole no `.env.local`

⏱️ Tempo estimado: 3 minutos

---

## 🎨 Passo 4: Personalizar Conteúdo

### 4.1 Informações Básicas

Edite `config/site.config.ts`:

```typescript
export const siteConfig = {
  name: "Nome da Sua Empresa",
  description: "O que sua empresa faz",

  hero: {
    title: "Título Impactante",
    subtitle: "Subtítulo explicativo",
    ctaText: "Quero Saber Mais",
  },

  // ... resto da configuração
}
```

### 4.2 Cores (Opcional)

Se quiser mudar as cores agora, edite `app/globals.css`:

```css
:root {
  --primary: 221.2 83.2% 53.3%; /* Sua cor principal */
}
```

⏱️ Tempo estimado: 5 minutos

---

## 🚀 Passo 5: Testar Localmente

```bash
npm run dev
```

Acesse:
- **Landing Page:** http://localhost:3000
- **Admin:** http://localhost:3000/admin/login

### 5.1 Testar Formulário

1. Acesse http://localhost:3000
2. Role até o formulário
3. Preencha e envie
4. Deve aparecer mensagem de sucesso

### 5.2 Login no Admin

```
Email: admin@example.com
Senha: admin123
```

⚠️ **IMPORTANTE:** Altere essa senha após o primeiro login!

### 5.3 Ver Lead no Admin

1. Faça login
2. Vá em "Leads"
3. Deve aparecer o lead de teste

⏱️ Tempo estimado: 5 minutos

---

## 🌐 Passo 6: Deploy na Vercel

### 6.1 Fazer Push para GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/SEU_REPO.git
git push -u origin main
```

### 6.2 Deploy na Vercel

1. Acesse [vercel.com](https://vercel.com)
2. Clique em "New Project"
3. Importe seu repositório do GitHub
4. Clique em "Deploy"

⏱️ Tempo estimado: 3 minutos

### 6.3 Configurar Variáveis de Ambiente

1. No projeto da Vercel, vá em **Settings** > **Environment Variables**
2. Adicione TODAS as variáveis do `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL
   NEXT_PUBLIC_SUPABASE_ANON_KEY
   SUPABASE_SERVICE_ROLE_KEY
   NEXTAUTH_URL (use https://seu-site.vercel.app)
   NEXTAUTH_SECRET
   NEXT_PUBLIC_CLIENT_ID
   ```
3. Deixe as de tracking vazias por enquanto
4. Clique em "Save"
5. Vá em **Deployments** > clique nos "..." > **Redeploy**

⏱️ Tempo estimado: 5 minutos

---

## 🎉 Passo 7: Validar em Produção

### 7.1 Acessar Site

Acesse `https://seu-site.vercel.app`

### 7.2 Testar Formulário

1. Preencha e envie um lead de teste
2. Deve funcionar normalmente

### 7.3 Verificar Admin

1. Acesse `https://seu-site.vercel.app/admin/login`
2. Faça login com admin@example.com / admin123
3. Vá em "Leads"
4. Deve aparecer o lead de teste

⏱️ Tempo estimado: 3 minutos

---

## 🔐 Passo 8: Criar Admin Personalizado

### 8.1 Gerar Hash da Senha

No terminal local:

```bash
node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('SUA_SENHA_AQUI', 10));"
```

### 8.2 Criar Admin no Supabase

1. Vá no Supabase > **SQL Editor**
2. Execute:

```sql
INSERT INTO admins (email, password_hash, client_id)
VALUES (
  'seu@email.com',
  'COLE_O_HASH_AQUI',
  'default'
);
```

### 8.3 Fazer Login com Novo Admin

1. Acesse `/admin/login`
2. Use seu novo email/senha
3. ✅ Funcionou!

### 8.4 (Opcional) Remover Admin Padrão

```sql
DELETE FROM admins WHERE email = 'admin@example.com';
```

⏱️ Tempo estimado: 3 minutos

---

## 📊 Passo 9: Configurar Tracking (Opcional)

Se você já tem os IDs de tracking:

### 9.1 Adicionar na Vercel

1. Vercel > **Settings** > **Environment Variables**
2. Adicione:
   ```
   NEXT_PUBLIC_META_PIXEL_ID=seu_id
   NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
   ```
3. Salve e faça **Redeploy**

### 9.2 Verificar Funcionamento

Use extensões do navegador:
- **Meta Pixel Helper** (Chrome)
- **Google Tag Assistant** (Chrome)

⏱️ Tempo estimado: 5 minutos (se você já tem os IDs)

---

## ✅ Checklist Final

Antes de compartilhar com o cliente:

- [ ] Site está no ar e funcionando
- [ ] Formulário envia leads corretamente
- [ ] Leads aparecem no admin
- [ ] Admin tem email/senha personalizado
- [ ] Conteúdo foi personalizado
- [ ] Cores ajustadas (se necessário)
- [ ] Tracking configurado (se aplicável)
- [ ] Domínio customizado configurado (se aplicável)

---

## 🎯 Próximos Passos

### Para Você (Desenvolvedor)

1. **Personalização Completa**
   - Leia [CUSTOMIZATION.md](./CUSTOMIZATION.md)
   - Ajuste cores, fontes, layout
   - Adicione seções específicas

2. **Domínio Customizado**
   - Compre domínio
   - Configure na Vercel
   - Configure DNS

3. **Otimizações**
   - Lighthouse audit
   - SEO checklist
   - Performance optimization

### Para o Cliente

1. **Acessar Admin**
   - URL: `https://seu-site.vercel.app/admin/login`
   - Email: (que você criou)
   - Senha: (que você definiu)

2. **Gerenciar Leads**
   - Ver todos os leads
   - Exportar para CSV
   - Acompanhar métricas

3. **Configurar Campanhas**
   - Usar parâmetros UTM
   - Monitorar conversões
   - Otimizar estratégia

---

## 🆘 Problemas Comuns

### "Cannot connect to Supabase"
- Verifique se as credenciais estão corretas no `.env.local`
- Confirme que o schema SQL foi executado
- Tente fazer logout/login no Supabase

### "NextAuth error"
- Verifique se o NEXTAUTH_SECRET foi gerado
- Confirme que a URL está correta (http://localhost:3000 local, https://... produção)
- Limpe cookies do navegador

### "Leads não aparecem"
- Verifique o console do navegador
- Olhe os logs da Vercel (Deployments > Functions)
- Confirme que o client_id está correto

### Deploy falhou na Vercel
- Verifique se todas as variáveis foram adicionadas
- Olhe os logs de build
- Tente fazer redeploy

---

## 📚 Documentação Completa

- **[README.md](./README.md)** - Documentação técnica completa
- **[CUSTOMIZATION.md](./CUSTOMIZATION.md)** - Guia de personalização detalhado
- **Este arquivo** - Setup inicial rápido

---

## 💬 Suporte

Se tiver problemas:

1. Releia este guia
2. Verifique os logs (console + Vercel)
3. Consulte a documentação do Next.js/Supabase
4. Entre em contato com o desenvolvedor

---

## 🎊 Parabéns!

Você configurou com sucesso uma landing page profissional com:
- ✅ Captura de leads
- ✅ Tracking completo
- ✅ Painel administrativo
- ✅ Deploy em produção

**Agora é só divulgar e capturar leads!** 🚀

---

⏱️ **Tempo total estimado: 25-30 minutos**
