# ⚡ Quick Reference - Guia Rápido

Referência rápida para tarefas comuns.

---

## 🚀 Comandos Essenciais

```bash
# Desenvolvimento
npm install              # Instalar dependências
npm run dev             # Iniciar servidor local
npm run build           # Build de produção
npm run start           # Rodar build de produção
npm run lint            # Verificar código

# Scripts
node scripts/create-admin.js email@exemplo.com senha123
```

---

## 🔗 URLs Importantes

| URL | Descrição |
|-----|-----------|
| http://localhost:3000 | Landing page |
| http://localhost:3000/admin/login | Login admin |
| http://localhost:3000/admin/dashboard | Dashboard |
| http://localhost:3000/admin/leads | Listagem de leads |
| http://localhost:3000/admin/tracking-setup | Setup de tracking |

---

## 📁 Arquivos Mais Editados

| Arquivo | Para quê? |
|---------|-----------|
| `config/site.config.ts` | **Customizar conteúdo** |
| `app/globals.css` | **Mudar cores** |
| `.env.local` | **Configurar variáveis** |
| `app/_components/hero-section.tsx` | Editar hero |
| `app/_components/features-section.tsx` | Editar features |

---

## 🎨 Mudar Cores Rápido

`app/globals.css`:

```css
:root {
  /* Mude APENAS esta linha para mudar a cor principal */
  --primary: 221.2 83.2% 53.3%;
}
```

**Cores Prontas:**

```css
/* Azul (padrão) */
--primary: 221.2 83.2% 53.3%;

/* Verde */
--primary: 142 76% 36%;

/* Roxo */
--primary: 262 83% 58%;

/* Vermelho */
--primary: 0 72% 51%;

/* Laranja */
--primary: 25 95% 53%;
```

---

## ⚙️ Variáveis de Ambiente

`.env.local`:

```env
# OBRIGATÓRIAS
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=

# OPCIONAIS (tracking)
NEXT_PUBLIC_META_PIXEL_ID=
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=
NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID=
NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL=
NEXT_PUBLIC_CLIENT_ID=default
```

---

## 🗄️ SQL Essencial

### Criar Admin

```sql
INSERT INTO admins (email, password_hash, client_id)
VALUES (
  'seu@email.com',
  crypt('sua_senha', gen_salt('bf')),
  'default'
);
```

### Ver Todos os Leads

```sql
SELECT * FROM leads
ORDER BY created_at DESC
LIMIT 10;
```

### Contar Leads por Fonte

```sql
SELECT source, COUNT(*) as total
FROM leads
GROUP BY source
ORDER BY total DESC;
```

### Deletar Lead Específico

```sql
DELETE FROM leads
WHERE email = 'email@exemplo.com';
```

### Alterar Senha Admin

```sql
UPDATE admins
SET password_hash = crypt('nova_senha', gen_salt('bf'))
WHERE email = 'admin@exemplo.com';
```

---

## 📊 Estrutura de Pastas

```
BASE-LP/
├── app/                    # Páginas
│   ├── page.tsx           # Landing page
│   ├── layout.tsx         # Layout principal
│   ├── _components/       # Componentes da LP
│   ├── admin/            # Painel admin
│   └── api/              # API routes
├── components/            # Componentes globais
│   ├── ui/               # shadcn/ui
│   ├── forms/            # Formulários
│   ├── animations/       # Animações
│   └── tracking/         # Scripts tracking
├── config/               # Configurações
│   ├── site.config.ts   # ⭐ Conteúdo
│   └── tracking.config.ts
├── lib/                  # Bibliotecas
│   ├── supabase/
│   ├── auth/
│   └── validators.ts
└── supabase/
    └── schema.sql        # Schema do banco
```

---

## 🎯 Customização Rápida

### Mudar Título

`config/site.config.ts`:
```typescript
hero: {
  title: "SEU NOVO TÍTULO",
  subtitle: "Seu novo subtítulo",
}
```

### Mudar CTA

```typescript
hero: {
  ctaText: "MEU BOTÃO",
}
```

### Adicionar Feature

```typescript
features: [
  {
    title: "Novo Benefício",
    description: "Descrição aqui",
    icon: "rocket", // rocket, shield, zap, etc
  },
]
```

---

## 📱 URLs de Campanha

### Template

```
https://seusite.com.br?utm_source=FONTE&utm_medium=MEIO&utm_campaign=CAMPANHA
```

### Exemplos Prontos

```
# Facebook
?utm_source=facebook&utm_medium=cpc&utm_campaign=lancamento

# Instagram
?utm_source=instagram&utm_medium=story&utm_campaign=promo

# Google
?utm_source=google&utm_medium=cpc&utm_campaign=pesquisa

# E-mail
?utm_source=newsletter&utm_medium=email&utm_campaign=blackfriday
```

---

## 🔐 Credenciais Padrão

⚠️ **ALTERAR APÓS PRIMEIRO LOGIN!**

```
Email: admin@example.com
Senha: admin123
```

---

## 🐛 Troubleshooting Rápido

### "Cannot connect to Supabase"
```bash
# Verificar .env.local
cat .env.local

# Testar no Supabase Dashboard
# Settings > API > Test connection
```

### "NextAuth error"
```bash
# Gerar novo secret
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Adicionar ao .env.local
NEXTAUTH_SECRET=resultado_aqui
```

### "Build falhou"
```bash
# Limpar cache
rm -rf .next node_modules
npm install
npm run build
```

### "Leads não aparecem"
- Verificar console do browser (F12)
- Ver logs da Vercel
- Confirmar client_id no .env

---

## 📦 Deploy Vercel

```bash
# 1. Push para GitHub
git add .
git commit -m "Initial commit"
git push

# 2. Importar na Vercel
# vercel.com > New Project > Import

# 3. Configurar variáveis
# Settings > Environment Variables
# Copiar TODAS do .env.local

# 4. Redeploy
# Deployments > ... > Redeploy
```

---

## 🎨 Componentes Úteis

### Adicionar Botão

```tsx
import { Button } from "@/components/ui/button";

<Button size="lg">Clique Aqui</Button>
```

### Adicionar Card

```tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

<Card>
  <CardHeader>
    <CardTitle>Título</CardTitle>
  </CardHeader>
  <CardContent>
    Conteúdo aqui
  </CardContent>
</Card>
```

### Adicionar Animação

```tsx
import ScrollReveal from "@/components/animations/scroll-reveal";

<ScrollReveal delay={0.2}>
  <div>Conteúdo animado</div>
</ScrollReveal>
```

---

## 📊 Atalhos Admin

| Ação | Atalho |
|------|--------|
| Ver dashboard | `/admin/dashboard` |
| Ver leads | `/admin/leads` |
| Exportar CSV | Botão "Exportar CSV" |
| Ver tracking | `/admin/tracking-setup` |
| Logout | Botão "Sair" no topo |

---

## 🔍 Debug Tracking

### Verificar Meta Pixel

```javascript
// No console do browser (F12)
fbq('track', 'PageView');

// Deve retornar: true
```

### Verificar Google Analytics

```javascript
// No console
gtag('event', 'test');

// Network tab > Filtrar: google-analytics
```

### Extensões Úteis

- **Meta Pixel Helper** (Chrome)
- **Google Tag Assistant** (Chrome)
- **Wappalyzer** (Ver tecnologias)

---

## 📝 Documentação Completa

| Arquivo | Quando Ler |
|---------|-----------|
| **GETTING-STARTED.md** | Primeiro setup (30 min) |
| **README.md** | Referência completa |
| **CUSTOMIZATION.md** | Personalizar tudo |
| **CAMPAIGN-GUIDE.md** | Criar campanhas |
| **PROJECT-INFO.md** | Detalhes técnicos |
| **SUMMARY.md** | Visão geral |
| **QUICK-REFERENCE.md** | Este arquivo! |

---

## ⚡ Dicas Pro

1. **Sempre teste localmente antes de fazer deploy**
2. **Documente as customizações feitas**
3. **Faça backup do .env.local**
4. **Use git branches para testar mudanças**
5. **Monitore leads diariamente**
6. **Responda leads rapidamente**
7. **Teste URLs de campanha antes de lançar**
8. **Use UTMs em TODAS as campanhas**
9. **Exporte leads semanalmente**
10. **Mantenha senha admin segura**

---

## 🎯 Métricas Para Acompanhar

No Admin Dashboard:

- **Total de Leads** - Crescimento geral
- **Leads Hoje** - Performance diária
- **Leads Esta Semana** - Tendência
- **Leads por Fonte** - Melhor canal
- **Taxa de Conversão** - Otimização

No Google Analytics:

- **Usuários** - Tráfego total
- **Taxa de Rejeição** - Qualidade do tráfego
- **Tempo na Página** - Engajamento
- **Conversões** - Leads gerados

---

## 🚀 Fluxo de Trabalho

### Para Cada Novo Cliente

1. **Clonar projeto**
2. **Customizar conteúdo** (site.config.ts)
3. **Ajustar cores** (globals.css)
4. **Criar projeto Supabase**
5. **Executar schema SQL**
6. **Configurar .env.local**
7. **Testar localmente**
8. **Deploy na Vercel**
9. **Configurar tracking IDs**
10. **Criar admin personalizado**
11. **Testar em produção**
12. **Entregar para cliente**

⏱️ Tempo: ~1-2 horas por cliente

---

## 📞 Links Úteis

| Recurso | URL |
|---------|-----|
| **Supabase** | https://supabase.com |
| **Vercel** | https://vercel.com |
| **Next.js Docs** | https://nextjs.org/docs |
| **Tailwind Docs** | https://tailwindcss.com |
| **shadcn/ui** | https://ui.shadcn.com |
| **Meta Events Manager** | https://business.facebook.com/events_manager |
| **Google Analytics** | https://analytics.google.com |
| **Google Ads** | https://ads.google.com |
| **UTM Builder** | https://ga-dev-tools.google/campaign-url-builder |

---

## ✅ Checklist Pre-Launch

- [ ] Conteúdo personalizado
- [ ] Cores ajustadas
- [ ] Imagens otimizadas
- [ ] Tracking configurado
- [ ] Formulário testado
- [ ] Admin criado
- [ ] URLs de campanha preparadas
- [ ] Deploy realizado
- [ ] Teste em produção feito
- [ ] Cliente treinado

---

## 🎊 Pronto!

Agora você tem tudo que precisa em uma página! 🚀

Para detalhes, consulte a documentação completa.

**Sucesso com suas campanhas!** 📈
