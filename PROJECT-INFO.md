# 📊 Informações do Projeto

## 🎯 Visão Geral

Este é um projeto de **Landing Page Base** desenvolvido para gestores de tráfego e agências digitais. O objetivo é fornecer uma solução completa, performática e fácil de customizar para captura de leads com tracking avançado.

---

## 🏗️ Arquitetura

### Frontend
- **Framework:** Next.js 15 (App Router)
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS
- **Componentes:** shadcn/ui (Radix UI)
- **Animações:** Framer Motion

### Backend
- **Plataforma:** Supabase (PostgreSQL)
- **Autenticação:** NextAuth.js v5
- **Validação:** Zod
- **Forms:** React Hook Form

### Analytics
- Meta Pixel (Facebook/Instagram)
- Google Analytics 4
- Google Ads Conversion Tracking

---

## 📁 Estrutura de Pastas

```
BASE-LP/
├── app/                          # Aplicação Next.js (App Router)
│   ├── (public)/                 # Rotas públicas
│   │   ├── _components/          # Componentes da landing page
│   │   │   ├── hero-section.tsx
│   │   │   ├── features-section.tsx
│   │   │   └── cta-section.tsx
│   │   └── page.tsx              # Página principal
│   │
│   ├── admin/                    # Painel administrativo
│   │   ├── _components/          # Componentes do admin
│   │   │   ├── admin-nav.tsx
│   │   │   └── export-leads-button.tsx
│   │   ├── dashboard/            # Dashboard com métricas
│   │   ├── leads/                # Listagem de leads
│   │   ├── tracking-setup/       # Configuração de tracking
│   │   ├── login/                # Login admin
│   │   └── layout.tsx            # Layout do admin
│   │
│   ├── api/                      # API Routes
│   │   ├── auth/[...nextauth]/   # Autenticação
│   │   └── leads/                # Captura de leads
│   │
│   ├── layout.tsx                # Root layout
│   └── globals.css               # Estilos globais
│
├── components/                   # Componentes reutilizáveis
│   ├── ui/                       # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── card.tsx
│   │   └── ...
│   ├── animations/               # Componentes de animação
│   │   ├── scroll-reveal.tsx
│   │   └── fade-in.tsx
│   ├── forms/                    # Formulários
│   │   └── lead-form.tsx
│   └── tracking/                 # Scripts de tracking
│       ├── meta-pixel.tsx
│       ├── google-analytics.tsx
│       ├── google-ads.tsx
│       └── analytics-wrapper.tsx
│
├── config/                       # Arquivos de configuração
│   ├── site.config.ts            # Configuração do site
│   └── tracking.config.ts        # IDs de tracking
│
├── lib/                          # Bibliotecas e utilidades
│   ├── auth/                     # Autenticação
│   │   ├── auth.ts
│   │   └── auth.config.ts
│   ├── supabase/                 # Clientes Supabase
│   │   ├── client.ts
│   │   ├── server.ts
│   │   └── database.types.ts
│   ├── validators.ts             # Schemas Zod
│   └── utils.ts                  # Funções utilitárias
│
├── supabase/                     # Configuração do banco
│   └── schema.sql                # Schema completo
│
├── scripts/                      # Scripts úteis
│   ├── create-admin.js
│   └── README.md
│
├── public/                       # Arquivos estáticos
│   ├── fonts/
│   └── images/
│
├── .env.local                    # Variáveis de ambiente (não commitar)
├── .env.example                  # Exemplo de variáveis
├── middleware.ts                 # Middleware de autenticação
├── next.config.js                # Configuração do Next.js
├── tailwind.config.ts            # Configuração do Tailwind
├── tsconfig.json                 # Configuração do TypeScript
├── package.json                  # Dependências
│
└── Documentação/
    ├── README.md                 # Documentação principal
    ├── GETTING-STARTED.md        # Guia de início rápido
    ├── CUSTOMIZATION.md          # Guia de customização
    ├── CAMPAIGN-GUIDE.md         # Guia de campanhas
    └── PROJECT-INFO.md           # Este arquivo
```

---

## 🔧 Dependências Principais

### Produção
| Pacote | Versão | Uso |
|--------|--------|-----|
| next | ^15.0.0 | Framework React |
| react | ^19.0.0 | Biblioteca UI |
| @supabase/supabase-js | ^2.39.0 | Cliente Supabase |
| @supabase/ssr | ^0.1.0 | SSR para Supabase |
| next-auth | ^5.0.0-beta.4 | Autenticação |
| framer-motion | ^11.0.0 | Animações |
| react-hook-form | ^7.50.0 | Gerenciamento de forms |
| zod | ^3.22.4 | Validação de schemas |
| tailwindcss | ^3.4.1 | Estilização |
| lucide-react | ^0.344.0 | Ícones |
| date-fns | ^3.3.0 | Manipulação de datas |
| bcryptjs | ^2.4.3 | Hash de senhas |

### shadcn/ui (Radix)
- @radix-ui/react-* (vários componentes)
- class-variance-authority
- clsx
- tailwind-merge
- tailwindcss-animate

---

## 📊 Banco de Dados

### Tabelas

#### `leads`
Armazena todos os leads capturados.

**Colunas:**
- `id` (UUID) - Primary key
- `name` (VARCHAR) - Nome completo
- `email` (VARCHAR) - E-mail
- `phone` (VARCHAR) - Telefone
- `message` (TEXT) - Mensagem opcional
- `source` (VARCHAR) - UTM Source
- `medium` (VARCHAR) - UTM Medium
- `campaign` (VARCHAR) - UTM Campaign
- `ip_address` (INET) - IP do usuário
- `user_agent` (TEXT) - Navegador/dispositivo
- `created_at` (TIMESTAMPTZ) - Data de criação
- `client_id` (VARCHAR) - ID do cliente (multi-tenant)

**Índices:**
- `idx_leads_email` - Por email
- `idx_leads_created_at` - Por data (DESC)
- `idx_leads_client_id` - Por cliente

#### `conversions`
Rastreia eventos de conversão para tracking.

**Colunas:**
- `id` (UUID) - Primary key
- `lead_id` (UUID) - FK para leads
- `event_name` (VARCHAR) - Nome do evento
- `value` (DECIMAL) - Valor da conversão
- `currency` (VARCHAR) - Moeda (BRL)
- `fbp` (VARCHAR) - Facebook Browser ID
- `fbc` (VARCHAR) - Facebook Click ID
- `gclid` (VARCHAR) - Google Click ID
- `created_at` (TIMESTAMPTZ) - Data

**Índice:**
- `idx_conversions_lead_id` - Por lead

#### `admins`
Usuários administrativos.

**Colunas:**
- `id` (UUID) - Primary key
- `email` (VARCHAR) - E-mail único
- `password_hash` (TEXT) - Senha criptografada
- `client_id` (VARCHAR) - ID do cliente
- `created_at` (TIMESTAMPTZ) - Data de criação

**Índice:**
- `idx_admins_email` - Por email (único)

#### `tracking_config`
Configuração de IDs de tracking por cliente.

**Colunas:**
- `id` (UUID) - Primary key
- `client_id` (VARCHAR) - ID do cliente (único)
- `meta_pixel_id` (VARCHAR) - Meta Pixel ID
- `google_analytics_id` (VARCHAR) - GA4 ID
- `google_ads_conversion_id` (VARCHAR) - Google Ads ID
- `google_ads_conversion_label` (VARCHAR) - Label
- `created_at` (TIMESTAMPTZ) - Data de criação
- `updated_at` (TIMESTAMPTZ) - Última atualização

**Índice:**
- `idx_tracking_config_client_id` - Por cliente (único)

### Row Level Security (RLS)

- **leads:** Qualquer um pode inserir, admins veem apenas seus leads
- **conversions:** Qualquer um pode inserir, admins veem apenas suas conversões
- **admins:** Apenas admins autenticados
- **tracking_config:** Apenas admins autenticados

---

## 🔐 Segurança

### Autenticação
- NextAuth.js com Credentials Provider
- Senhas hash com bcryptjs (10 rounds)
- Session management com cookies HTTP-only
- Middleware protege rotas /admin

### Validação
- Server-side com Zod
- Client-side com React Hook Form
- Sanitização de inputs
- Rate limiting (configurar se necessário)

### Env Variables
- Todas as secrets em .env.local
- NEVER commit .env.local
- Use .env.example como template
- Variáveis públicas com NEXT_PUBLIC_

---

## 📈 Performance

### Métricas Alvo
- Lighthouse Score: > 90
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Largest Contentful Paint: < 2.5s

### Otimizações Implementadas
- ✅ React Server Components
- ✅ Image optimization (next/image)
- ✅ Font optimization (next/font)
- ✅ Code splitting automático
- ✅ Lazy loading de animações
- ✅ CSS-in-JS otimizado (Tailwind)
- ✅ Scripts de tracking após interação

---

## 🔄 Fluxo de Dados

### Captura de Lead

```
Usuário preenche formulário
         ↓
React Hook Form valida (client)
         ↓
POST /api/leads
         ↓
Zod valida (server)
         ↓
Extrai UTM params e IPs
         ↓
Insere em Supabase (leads)
         ↓
Cria conversão (conversions)
         ↓
Fire tracking events
         ↓
Retorna sucesso/erro
```

### Visualização no Admin

```
Admin faz login
         ↓
NextAuth autentica
         ↓
Middleware verifica sessão
         ↓
Query leads por client_id
         ↓
Renderiza dashboard/lista
         ↓
Admin pode exportar CSV
```

---

## 🎨 Temas e Customização

### Design System

**Cores:**
- Primary: Cor principal (botões, links)
- Secondary: Cor secundária (suporte)
- Accent: Destaques
- Muted: Cinzas
- Destructive: Erros

**Tipografia:**
- Font: Inter (padrão), customizável
- Scales: text-sm, text-base, text-lg, text-xl, etc.

**Spacing:**
- Tailwind scale: 0, 1, 2, 3, 4, 6, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64

**Breakpoints:**
- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px
- 2xl: 1536px

---

## 🧪 Testing (Futuro)

### Recomendações

#### Unit Tests
```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom
```

#### E2E Tests
```bash
npm install -D @playwright/test
```

#### Testes Importantes
- [ ] Validação de formulário
- [ ] Captura de leads
- [ ] Login admin
- [ ] Exportação CSV
- [ ] Tracking events

---

## 🚀 Deploy

### Plataformas Suportadas

#### Vercel (Recomendado)
- Deploy automático
- Edge functions
- Analytics integrado
- Domínio grátis

#### Alternativas
- Netlify
- Railway
- AWS Amplify
- Self-hosted (Docker)

---

## 📝 Logs e Monitoramento

### Logs Importantes

**Produção:**
- Vercel Functions logs
- Supabase logs
- Browser console (tracking)

**Desenvolvimento:**
- Terminal (Next.js)
- Browser console
- Network tab (DevTools)

### Monitoramento

Recomendações:
- Sentry (erros)
- Vercel Analytics (performance)
- Google Analytics (usuários)
- Supabase Dashboard (database)

---

## 🔧 Manutenção

### Atualizações Regulares

```bash
# Verificar atualizações
npm outdated

# Atualizar dependências
npm update

# Atualizar major versions (cuidado!)
npm install package@latest
```

### Backups

**Supabase:**
- Backups automáticos (plano pago)
- Export manual via SQL Editor
- Replicar para outro projeto

**Código:**
- Git (GitHub, GitLab)
- Branches de backup
- Tags de versão

---

## 📞 Suporte Técnico

### Problemas Comuns

1. **Build falha**
   - Verificar tipos TypeScript
   - Limpar cache: `rm -rf .next`
   - Reinstalar: `rm -rf node_modules && npm install`

2. **Supabase não conecta**
   - Verificar .env.local
   - Testar no Supabase Dashboard
   - Verificar RLS policies

3. **Tracking não funciona**
   - Verificar console do browser
   - Testar com extensões (Pixel Helper)
   - Confirmar IDs no .env

### Recursos

- **Next.js:** [nextjs.org/docs](https://nextjs.org/docs)
- **Supabase:** [supabase.com/docs](https://supabase.com/docs)
- **Tailwind:** [tailwindcss.com/docs](https://tailwindcss.com/docs)
- **shadcn/ui:** [ui.shadcn.com](https://ui.shadcn.com)

---

## 🎯 Roadmap (Futuro)

### Features Potenciais

- [ ] Multi-idioma (i18n)
- [ ] Tema dark/light toggle
- [ ] Mais seções (FAQ, Pricing, Blog)
- [ ] Integração com CRM
- [ ] Webhooks configuráveis
- [ ] Dashboard analytics avançado
- [ ] A/B testing interno
- [ ] Chat widget
- [ ] Agendamento de calls
- [ ] E-mail marketing integration

---

## 📄 Licença

MIT License

---

## 👥 Créditos

Desenvolvido para gestores de tráfego e agências digitais.

**Stack:**
- Next.js by Vercel
- Supabase
- Tailwind CSS
- shadcn/ui by shadcn
- Framer Motion
- E mais...

---

## 📊 Status do Projeto

**Versão:** 1.0.0
**Status:** ✅ Produção
**Última atualização:** 2024
**Manutenção:** Ativa

---

Dúvidas? Consulte os outros arquivos de documentação! 📚
