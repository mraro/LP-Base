# 🚀 Base LP - Landing Page Profissional

Landing page base otimizada para captação de leads com integração completa de tracking (Meta Pixel + Google Analytics + Google Ads) e painel administrativo.

## ✨ Features

### Landing Page
- ⚡ **Performance Otimizada** - Next.js 15 com App Router e React Server Components
- 🎨 **Design Moderno** - Animações suaves com Framer Motion
- 📱 **100% Responsivo** - Design adaptado para todos os dispositivos
- 🎯 **Altamente Customizável** - Configuração simples por arquivo
- 🔍 **SEO Otimizado** - Metadados e Open Graph configurados

### Captura de Leads
- 📝 **Formulário Validado** - React Hook Form + Zod
- 🎯 **Tracking UTM** - Captura automática de parâmetros de campanha
- 📊 **Múltiplas Fontes** - Rastreamento de origem do tráfego
- 🔒 **Seguro** - Validação server-side

### Tracking & Analytics
- 📈 **Meta Pixel** - Integração completa com Facebook/Instagram Ads
- 📊 **Google Analytics 4** - Rastreamento de eventos e conversões
- 🎯 **Google Ads** - Tracking de conversões para otimização
- 🔗 **UTM Parameters** - Captura automática de parâmetros de campanha
- 🎪 **Click IDs** - Rastreamento de fbclid e gclid

### Painel Admin
- 🔐 **Autenticação Segura** - NextAuth.js com Supabase
- 📊 **Dashboard com Métricas** - Visualização de KPIs em tempo real
- 📋 **Gerenciamento de Leads** - Lista completa com filtros
- 📥 **Exportação CSV** - Download de todos os leads
- 🎯 **Setup de Tracking** - Guias completos para configuração

---

## 🛠️ Tecnologias

### Frontend
- **Next.js 15** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização utility-first
- **shadcn/ui** - Componentes UI de alta qualidade
- **Framer Motion** - Animações fluidas
- **Lucide React** - Ícones modernos

### Backend & Database
- **Supabase** - Backend as a Service (PostgreSQL)
- **NextAuth.js** - Autenticação
- **React Hook Form + Zod** - Validação de formulários

### Analytics
- **Meta Pixel** - Facebook/Instagram tracking
- **Google Analytics 4** - Analytics e eventos
- **Google Ads** - Conversões

---

## 🚀 Início Rápido

### 1. Clone o Repositório
```bash
git clone <seu-repo>
cd BASE-LP
```

### 2. Instale as Dependências
```bash
npm install
# ou
yarn install
# ou
pnpm install
```

### 3. Configure o Supabase

#### 3.1. Crie um Projeto no Supabase
1. Acesse [supabase.com](https://supabase.com)
2. Crie um novo projeto
3. Copie as credenciais (URL e anon key)

#### 3.2. Execute o Schema SQL
1. No Supabase, vá em **SQL Editor**
2. Cole o conteúdo do arquivo `supabase/schema.sql`
3. Execute o script

### 4. Configure as Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_anon_key_do_supabase
SUPABASE_SERVICE_ROLE_KEY=sua_service_role_key

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=gere_um_secret_aqui

# Tracking IDs (opcional - configure depois)
NEXT_PUBLIC_META_PIXEL_ID=
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=
NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID=
NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL=

# Client ID (para multi-tenant)
NEXT_PUBLIC_CLIENT_ID=default
```

**Gerar NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

### 5. Inicie o Servidor de Desenvolvimento

```bash
npm run dev
```

Acesse:
- **Landing Page:** http://localhost:3000
- **Admin Login:** http://localhost:3000/admin/login

---

## 🎨 Customização

### Configuração do Site

Edite `config/site.config.ts`:

```typescript
export const siteConfig = {
  name: "Sua Empresa",
  description: "Descrição da sua empresa",

  hero: {
    title: "Título Principal",
    subtitle: "Subtítulo atrativo",
    ctaText: "Botão CTA",
  },

  features: [
    {
      title: "Feature 1",
      description: "Descrição",
      icon: "rocket", // chart, headset, rocket, shield, zap, users
    },
  ],

  contact: {
    email: "contato@suaempresa.com",
    phone: "(11) 99999-9999",
  },
}
```

### Configuração de Tracking

Edite o arquivo `.env.local` e adicione seus IDs:

```env
NEXT_PUBLIC_META_PIXEL_ID=123456789
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID=AW-XXXXXXXXX
NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL=xxxxx
```

### Cores e Tema

Edite `app/globals.css` para alterar as cores:

```css
:root {
  --primary: 221.2 83.2% 53.3%; /* Azul principal */
  --secondary: 210 40% 96.1%; /* Cor secundária */
  /* ... outras variáveis */
}
```

### Adicionar Novas Seções

Crie componentes em `app/_components/` e adicione em `app/page.tsx`:

```tsx
import NovaSecao from "./_components/nova-secao";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <FeaturesSection />
      <NovaSecao /> {/* Nova seção */}
      <CTASection />
    </main>
  );
}
```

---

## 🔐 Admin Panel

### Login Padrão (IMPORTANTE: Alterar!)

```
Email: admin@example.com
Senha: admin123
```

⚠️ **ALTERE IMEDIATAMENTE após o primeiro acesso!**

### Criar Novo Admin

Execute no SQL Editor do Supabase:

```sql
INSERT INTO admins (email, password_hash, client_id)
VALUES (
  'novo@email.com',
  crypt('sua_senha', gen_salt('bf')),
  'default'
);
```

### Funcionalidades do Admin

1. **Dashboard** - Métricas e KPIs
   - Total de leads
   - Leads hoje/semana
   - Leads por fonte
   - Leads recentes

2. **Leads** - Gerenciamento completo
   - Visualização de todos os leads
   - Informações de contato
   - Origem do tráfego (UTM)
   - Exportação para CSV

3. **Tracking Setup** - Guias de configuração
   - IDs configurados
   - Instruções para Meta Pixel
   - Instruções para Google Analytics
   - Instruções para Google Ads

---

## 📊 Tracking & Analytics

### Meta Pixel (Facebook/Instagram Ads)

1. Acesse o [Meta Events Manager](https://business.facebook.com/events_manager)
2. Copie seu Pixel ID
3. Adicione ao `.env.local`:
   ```env
   NEXT_PUBLIC_META_PIXEL_ID=seu_pixel_id
   ```

**Eventos Rastreados:**
- `PageView` - Automático ao carregar a página
- `Lead` - Quando o formulário é enviado

### Google Analytics 4

1. Acesse o [Google Analytics](https://analytics.google.com)
2. Crie uma propriedade GA4
3. Copie o Measurement ID (G-XXXXXXXXXX)
4. Adicione ao `.env.local`:
   ```env
   NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
   ```

**Eventos Rastreados:**
- `page_view` - Automático
- `generate_lead` - Quando o formulário é enviado

### Google Ads

1. Acesse o [Google Ads](https://ads.google.com)
2. Vá em Ferramentas > Conversões
3. Crie uma conversão do tipo "Lead"
4. Copie o Conversion ID e Label
5. Adicione ao `.env.local`:
   ```env
   NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID=AW-XXXXXXXXX
   NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL=xxxxx
   ```

### Parâmetros UTM

Use estas URLs nas suas campanhas:

```
https://seusite.com.br?utm_source=facebook&utm_medium=cpc&utm_campaign=lancamento
https://seusite.com.br?utm_source=google&utm_medium=cpc&utm_campaign=black-friday
https://seusite.com.br?utm_source=instagram&utm_medium=story&utm_campaign=promocao
```

**Parâmetros Capturados:**
- `utm_source` - Fonte (facebook, google, instagram, etc)
- `utm_medium` - Meio (cpc, organic, social, email)
- `utm_campaign` - Nome da campanha
- `fbclid` - Click ID do Facebook (automático)
- `gclid` - Click ID do Google (automático)

---

## 🗄️ Banco de Dados

### Tabelas Principais

#### `leads`
Armazena todos os leads capturados
- `id` - UUID único
- `name` - Nome completo
- `email` - E-mail
- `phone` - Telefone
- `message` - Mensagem (opcional)
- `source` - UTM Source
- `medium` - UTM Medium
- `campaign` - UTM Campaign
- `ip_address` - IP do visitante
- `user_agent` - Navegador
- `created_at` - Data de criação
- `client_id` - ID do cliente (multi-tenant)

#### `conversions`
Rastreia eventos de conversão
- `id` - UUID único
- `lead_id` - Referência ao lead
- `event_name` - Nome do evento
- `value` - Valor da conversão
- `fbp` - Facebook Browser ID
- `fbc` - Facebook Click ID
- `gclid` - Google Click ID
- `created_at` - Data da conversão

#### `admins`
Usuários administrativos
- `id` - UUID único
- `email` - E-mail de login
- `password_hash` - Senha criptografada
- `client_id` - ID do cliente
- `created_at` - Data de criação

---

## 🚢 Deploy

### Vercel (Recomendado)

1. Faça push do código para GitHub
2. Acesse [vercel.com](https://vercel.com)
3. Importe o repositório
4. Configure as variáveis de ambiente
5. Deploy!

### Variáveis de Ambiente na Vercel

Adicione todas as variáveis do `.env.local` no painel da Vercel:

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
NEXTAUTH_URL (use a URL de produção)
NEXTAUTH_SECRET
NEXT_PUBLIC_META_PIXEL_ID
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID
NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID
NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL
NEXT_PUBLIC_CLIENT_ID
```

---

## 🎯 Multi-Tenant

Este projeto suporta múltiplos clientes usando o campo `client_id`.

### Configurar para Cliente Específico

1. Defina o `CLIENT_ID` no `.env.local`:
   ```env
   NEXT_PUBLIC_CLIENT_ID=cliente_a
   ```

2. Crie um admin para esse cliente:
   ```sql
   INSERT INTO admins (email, password_hash, client_id)
   VALUES ('admin@clientea.com', crypt('senha123', gen_salt('bf')), 'cliente_a');
   ```

3. Os leads serão automaticamente associados ao `client_id`

---

## 📝 Scripts Úteis

### Desenvolvimento
```bash
npm run dev      # Inicia servidor de desenvolvimento
npm run build    # Build de produção
npm run start    # Inicia servidor de produção
npm run lint     # Executa ESLint
```

### Criar Hash de Senha (Node.js)
```javascript
const bcrypt = require('bcryptjs');
const hash = bcrypt.hashSync('sua_senha', 10);
console.log(hash);
```

---

## 🐛 Troubleshooting

### Erro de autenticação do Supabase
- Verifique se as variáveis `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY` estão corretas
- Confirme que o schema SQL foi executado
- Verifique as políticas RLS no Supabase

### Tracking não funciona
- Confirme que os IDs estão configurados no `.env.local`
- Verifique o console do navegador para erros
- Use extensões de debugging (Facebook Pixel Helper, Google Tag Assistant)

### Leads não aparecem no admin
- Verifique se o `client_id` está correto
- Confirme que o lead foi salvo no Supabase
- Verifique as políticas RLS

---

## 📄 Licença

Este projeto está sob a licença MIT.

---

## 🤝 Suporte

Para dúvidas ou problemas:
1. Verifique a documentação acima
2. Consulte os logs do servidor
3. Verifique o console do navegador
4. Entre em contato com o desenvolvedor

---

## 🎉 Próximos Passos

1. ✅ Configure suas variáveis de ambiente
2. ✅ Customize o conteúdo em `config/site.config.ts`
3. ✅ Altere as cores em `app/globals.css`
4. ✅ Configure tracking (Meta Pixel, GA4, Google Ads)
5. ✅ Teste o formulário de leads
6. ✅ Acesse o admin e visualize os dados
7. ✅ Faça deploy na Vercel
8. ✅ Configure suas campanhas com parâmetros UTM
9. ✅ Monitore os resultados no admin panel!

**Boa sorte com suas campanhas!** 🚀
