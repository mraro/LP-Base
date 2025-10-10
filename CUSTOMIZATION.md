# 🎨 Guia de Customização

Este guia explica como customizar a landing page para cada cliente.

## 📋 Checklist de Customização

- [ ] Configurar informações do site
- [ ] Alterar cores e tema
- [ ] Customizar conteúdo das seções
- [ ] Configurar tracking IDs
- [ ] Adicionar logo e imagens
- [ ] Configurar admin
- [ ] Testar formulário
- [ ] Deploy

---

## 1. Informações do Site

**Arquivo:** `config/site.config.ts`

```typescript
export const siteConfig = {
  // Informações básicas
  name: "Nome da Empresa do Cliente",
  description: "Descrição breve do negócio",
  url: "https://cliente.com.br",

  // Hero Section (primeira seção)
  hero: {
    title: "Título Impactante",
    subtitle: "Subtítulo que explica o valor",
    ctaText: "Texto do Botão Principal",
    ctaSubtext: "Texto pequeno abaixo do botão",
  },

  // Features (benefícios/diferenciais)
  features: [
    {
      title: "Primeiro Benefício",
      description: "Descrição detalhada do benefício",
      icon: "rocket", // Opções: chart, headset, rocket, shield, zap, users
    },
    {
      title: "Segundo Benefício",
      description: "Outro diferencial importante",
      icon: "shield",
    },
    {
      title: "Terceiro Benefício",
      description: "Mais um ponto forte",
      icon: "zap",
    },
  ],

  // Formulário de contato
  leadForm: {
    title: "Fale com um Especialista",
    subtitle: "Preencha e retornaremos em até 24h",
    fields: {
      name: {
        label: "Nome Completo",
        placeholder: "João Silva",
        required: true,
      },
      email: {
        label: "E-mail",
        placeholder: "joao@exemplo.com",
        required: true,
      },
      phone: {
        label: "WhatsApp",
        placeholder: "(11) 99999-9999",
        required: true,
      },
      message: {
        label: "Como podemos ajudar?",
        placeholder: "Conte-nos sobre seu projeto...",
        required: false,
      },
    },
    submitText: "Quero uma Proposta",
    successMessage: "Recebemos seu contato! Retornaremos em breve.",
    errorMessage: "Erro ao enviar. Tente novamente.",
  },

  // Informações de contato
  contact: {
    email: "contato@cliente.com.br",
    phone: "(11) 99999-9999",
    whatsapp: "5511999999999", // Sem espaços ou símbolos
    address: "São Paulo, SP",
  },

  // Redes sociais
  social: {
    instagram: "https://instagram.com/cliente",
    facebook: "https://facebook.com/cliente",
    linkedin: "https://linkedin.com/company/cliente",
  },
}
```

---

## 2. Cores e Tema

**Arquivo:** `app/globals.css`

### Tema Claro (Light Mode)

```css
:root {
  /* Cor principal (botões, links, destaques) */
  --primary: 221.2 83.2% 53.3%;  /* Azul por padrão */

  /* Cor secundária (elementos de suporte) */
  --secondary: 210 40% 96.1%;

  /* Outras cores importantes */
  --background: 0 0% 100%;        /* Fundo branco */
  --foreground: 222.2 84% 4.9%;   /* Texto preto */
  --muted: 210 40% 96.1%;         /* Cinza claro */
  --accent: 210 40% 96.1%;        /* Cor de destaque */
}
```

### Exemplos de Paletas de Cores

#### 🔵 Azul Profissional (Padrão)
```css
--primary: 221.2 83.2% 53.3%;
--secondary: 210 40% 96.1%;
```

#### 🟢 Verde Sustentável
```css
--primary: 142 76% 36%;    /* Verde principal */
--secondary: 142 76% 96%;  /* Verde claro */
```

#### 🟣 Roxo Moderno
```css
--primary: 262 83% 58%;    /* Roxo vibrante */
--secondary: 262 83% 96%;  /* Roxo claro */
```

#### 🔴 Vermelho Energético
```css
--primary: 0 72% 51%;      /* Vermelho */
--secondary: 0 72% 96%;    /* Vermelho claro */
```

#### 🟠 Laranja Criativo
```css
--primary: 25 95% 53%;     /* Laranja */
--secondary: 25 95% 96%;   /* Laranja claro */
```

### Como Converter Cores HEX para HSL

Use [esta ferramenta](https://www.cssportal.com/css-hex-to-hsl-converter/) ou:

1. Cor HEX: `#0066FF`
2. Converter para HSL: `hsl(217, 100%, 50%)`
3. Remover `hsl()` e `%`: `217 100% 50%`
4. Usar no CSS: `--primary: 217 100% 50%;`

---

## 3. Fontes Personalizadas

**Arquivo:** `app/layout.tsx`

### Google Fonts

```typescript
import { Inter, Poppins, Roboto } from "next/font/google";

// Escolha uma fonte
const font = Inter({ subsets: ["latin"], display: "swap" });
// const font = Poppins({ weight: ["400", "600", "700"], subsets: ["latin"] });
// const font = Roboto({ weight: ["400", "700"], subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={font.className}>
        {children}
      </body>
    </html>
  );
}
```

### Fontes Populares

- **Inter** - Moderna e legível
- **Poppins** - Amigável e arredondada
- **Roboto** - Clássica e profissional
- **Montserrat** - Bold e impactante
- **Open Sans** - Limpa e versátil

---

## 4. Imagens e Logo

### Adicionar Logo

1. Coloque o logo em `public/images/logo.png`
2. Edite `app/_components/hero-section.tsx`:

```tsx
import Image from "next/image";

export default function HeroSection() {
  return (
    <section>
      {/* Logo */}
      <Image
        src="/images/logo.png"
        alt="Logo"
        width={200}
        height={60}
        priority
      />

      {/* Resto do conteúdo */}
    </section>
  );
}
```

### Adicionar Imagens de Fundo

```tsx
<section className="relative">
  <Image
    src="/images/hero-bg.jpg"
    alt="Background"
    fill
    className="object-cover"
    priority
  />
  <div className="relative z-10">
    {/* Conteúdo */}
  </div>
</section>
```

### Otimização de Imagens

- Use WebP quando possível
- Comprima imagens com [TinyPNG](https://tinypng.com/)
- Dimensões recomendadas:
  - Logo: 400x120px (max)
  - Hero background: 1920x1080px
  - Ícones: 256x256px

---

## 5. Adicionar Novas Seções

### Exemplo: Seção de Depoimentos

**Criar:** `app/_components/testimonials-section.tsx`

```tsx
"use client";

import { Card, CardContent } from "@/components/ui/card";
import ScrollReveal from "@/components/animations/scroll-reveal";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "João Silva",
    role: "CEO, Empresa X",
    content: "Excelente serviço! Resultados incríveis.",
    rating: 5,
  },
  {
    name: "Maria Santos",
    role: "Gerente, Empresa Y",
    content: "Superou nossas expectativas.",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <h2 className="text-4xl font-bold text-center mb-12">
            O Que Nossos Clientes Dizem
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="mb-4 text-muted-foreground">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
```

**Adicionar em:** `app/page.tsx`

```tsx
import TestimonialsSection from "./_components/testimonials-section";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection /> {/* Nova seção */}
      <CTASection />
    </main>
  );
}
```

---

## 6. Configurar Tracking

**Arquivo:** `.env.local`

```env
# Meta Pixel (Facebook/Instagram Ads)
NEXT_PUBLIC_META_PIXEL_ID=123456789

# Google Analytics 4
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX

# Google Ads
NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID=AW-XXXXXXXXX
NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL=xxxxx

# Client ID (identificador único do cliente)
NEXT_PUBLIC_CLIENT_ID=nome_cliente
```

### Onde Encontrar os IDs

#### Meta Pixel
1. [Meta Events Manager](https://business.facebook.com/events_manager)
2. Selecione seu Pixel
3. Configurações > ID do Pixel

#### Google Analytics
1. [Google Analytics](https://analytics.google.com)
2. Admin > Fluxos de dados
3. Copie o ID de medição (G-XXXXXXXXXX)

#### Google Ads
1. [Google Ads](https://ads.google.com)
2. Ferramentas > Conversões
3. Criar conversão > Copiar ID e rótulo

---

## 7. Configurar Admin

### Criar Novo Admin

No Supabase SQL Editor:

```sql
-- Insira um novo admin
INSERT INTO admins (email, password_hash, client_id)
VALUES (
  'admin@cliente.com.br',
  crypt('senha_segura_123', gen_salt('bf')),
  'nome_cliente'
);
```

### Alterar Senha de Admin Existente

```sql
UPDATE admins
SET password_hash = crypt('nova_senha_123', gen_salt('bf'))
WHERE email = 'admin@cliente.com.br';
```

---

## 8. Personalizar Animações

### Ajustar Velocidade

**Arquivo:** `components/animations/scroll-reveal.tsx`

```tsx
<ScrollReveal
  delay={0.2}      // Atraso em segundos
  duration={0.5}   // Duração da animação
  direction="up"   // up, down, left, right
>
  <Componente />
</ScrollReveal>
```

### Desabilitar Animações

Remova os componentes `<ScrollReveal>` e `<FadeIn>`:

```tsx
// Antes
<ScrollReveal>
  <h1>Título</h1>
</ScrollReveal>

// Depois
<h1>Título</h1>
```

---

## 9. SEO & Metadata

**Arquivo:** `app/layout.tsx`

```typescript
export const metadata: Metadata = {
  title: "Nome da Empresa - Slogan",
  description: "Descrição otimizada para SEO com palavras-chave",
  keywords: ["palavra1", "palavra2", "palavra3"],

  openGraph: {
    title: "Nome da Empresa",
    description: "Descrição para redes sociais",
    url: "https://cliente.com.br",
    images: ["/images/og-image.jpg"], // 1200x630px
  },

  twitter: {
    card: "summary_large_image",
    title: "Nome da Empresa",
    description: "Descrição para Twitter",
    images: ["/images/og-image.jpg"],
  },
};
```

---

## 10. Checklist Final

Antes de fazer deploy:

### Conteúdo
- [ ] Alterar nome e descrição em `site.config.ts`
- [ ] Personalizar hero title e subtitle
- [ ] Atualizar features/benefícios
- [ ] Customizar textos do formulário
- [ ] Adicionar informações de contato

### Design
- [ ] Alterar cores primária e secundária
- [ ] Escolher e aplicar fonte
- [ ] Adicionar logo
- [ ] Otimizar imagens

### Tracking
- [ ] Configurar Meta Pixel ID
- [ ] Configurar Google Analytics ID
- [ ] Configurar Google Ads IDs
- [ ] Definir CLIENT_ID único

### Admin
- [ ] Criar usuário admin específico
- [ ] Testar login
- [ ] Verificar permissões no Supabase

### Testes
- [ ] Testar formulário de leads
- [ ] Verificar tracking no console
- [ ] Testar responsividade
- [ ] Validar performance (Lighthouse)
- [ ] Testar em múltiplos navegadores

### Deploy
- [ ] Configurar variáveis na Vercel
- [ ] Fazer deploy
- [ ] Testar em produção
- [ ] Configurar domínio customizado

---

## 🎯 Dicas de Performance

1. **Imagens**
   - Use WebP
   - Comprima antes de upload
   - Use `next/image` sempre

2. **Fontes**
   - Carregue apenas weights necessários
   - Use `display: swap`

3. **Animações**
   - Não exagere
   - Use `will-change` com cuidado

4. **Tracking**
   - Scripts são carregados após interação
   - Não afetam performance inicial

---

## 📞 Suporte

Para dúvidas sobre customização, consulte:
- README.md (documentação completa)
- Código comentado nos arquivos
- Documentação do Next.js
- Documentação do Tailwind CSS
