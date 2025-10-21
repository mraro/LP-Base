# TASK-02: Redirecionamento para Página de Obrigado Pós-Lead

## Ticket
- **Status**: In Progress
- **Data**: 2025-10-21
- **Tipo**: Feature Enhancement
- **Priority**: High

## Context

Substituir o estado de "sucesso inline" atual do formulário de leads (`CourseLeadForm`) na página inicial por um redirecionamento para uma página separada de obrigado, similar ao `/obrigado` mas com contexto adaptado para leads (não compradores do curso).

### Problema Atual
Atualmente, quando um usuário envia o formulário de lead na página inicial:
- Um card de sucesso aparece inline (linhas 195-217 de `course-lead-form.tsx`)
- O usuário permanece na mesma página
- A mensagem é genérica: "Em breve entraremos em contato com você"
- Não há call-to-action adicional ou próximos passos

### Objetivo
Criar uma experiência mais envolvente e profissional:
- Redirecionar para `/ty` após submissão
- Página dedicada com visual celebrativo (similar ao `/obrigado`)
- Contexto específico para leads (não compradores)
- CTAs relevantes (WhatsApp, redes sociais, conhecer mais)
- Animações celebrativas mantendo consistência visual

## Implementation Plan

### Phase 1: Criar Página de Obrigado para Leads
- [ ] Criar rota `/ty/page.tsx`
- [ ] Criar componente `LeadThankyouPage` em `app/_components/`
- [ ] Adaptar design do `CourseThankyouPage` para contexto de lead
- [ ] Configurar metadata SEO apropriado

### Phase 2: Adaptar Conteúdo e Mensagens
- [ ] **Header**: Mensagem de agradecimento (não celebração de compra)
- [ ] **Próximos Passos**: Informar o que acontece agora
  - "Em breve entraremos em contato"
  - "Enquanto isso, siga-nos nas redes sociais"
  - "Tire suas dúvidas pelo WhatsApp"
- [ ] **CTAs**:
  - WhatsApp para dúvidas imediatas
  - Links para Instagram/Facebook
  - Explorar mais sobre a 3SCAR
- [ ] **Tom**: Acolhedor e informativo (não celebrativo como compra)

### Phase 3: Modificar CourseLeadForm
- [ ] Remover estado `isSuccess` e UI de sucesso inline
- [ ] Implementar redirecionamento após submissão bem-sucedida
- [ ] Usar `useRouter` do Next.js para navegação
- [ ] Adicionar loading state durante redirecionamento

### Phase 4: Animações e Efeitos
- [ ] Reutilizar sistema de animações do `/obrigado`
- [ ] Ajustar intensidade (mais sutil que compra)
- [ ] Partículas celebrativas em quantidade reduzida
- [ ] Background gradiente consistente com landing page

### Phase 5: Testing e Refinamentos
- [ ] Testar fluxo completo de submissão → redirecionamento
- [ ] Verificar tracking de eventos (Meta Pixel, GA)
- [ ] Garantir responsividade mobile/desktop
- [ ] Verificar acessibilidade

## Technical Decisions

### Framework & Libraries
- **Next.js 15**: Server Components + Client Components
- **Next.js Router**: `useRouter` para navegação programática
- **Framer Motion**: Animações (reutilizando do `/obrigado`)
- **Lucide React**: Ícones consistentes
- **Tailwind CSS v4**: Styling responsivo

### Component Architecture
```
app/ty/
  └── page.tsx (Server Component)
app/_components/
  ├── course-lead-form.tsx (modificado)
  └── lead-thankyou-page.tsx (novo)
```

### Navigation Flow
```
Homepage → CourseLeadForm → Submit Success → Redirect → /ty
```

### Diferenças vs `/obrigado` (Compra de Curso)

| Aspecto | `/obrigado` (Compra) | `/ty` (Lead) |
|---------|---------------------|------------------------|
| **Tom** | Celebrativo, VIP | Acolhedor, informativo |
| **Header** | "Bem-vindo ao time!" | "Obrigado pelo interesse!" |
| **Ícone** | Troféu dourado | Checkmark ou foguete |
| **Próximos Passos** | Acesso ao curso, grupo VIP | Contato em breve, redes sociais |
| **Animações** | Intensas (20 partículas) | Sutis (10-12 partículas) |
| **CTAs** | WhatsApp suporte curso | WhatsApp dúvidas, redes sociais |

### Design Tokens
```typescript
// Cores principais (consistentes com landing page)
Orange: #f97316, #fb923c, #fdba74
Blue: #3b82f6 (secundária para leads)
Gray: #111827 → #1f2937 → #000000

// Spacing
Container: max-w-3xl (menor que /obrigado)
Padding: p-6 md:p-10
Gap: gap-5
```

## Code Examples

### Modificação em CourseLeadForm (Redirecionamento)
```typescript
// app/_components/course-lead-form.tsx

import { useRouter } from "next/navigation";

export default function CourseLeadForm() {
  const router = useRouter();
  // ... (resto do código)

  const onSubmit = async (data: CourseLeadFormData) => {
    setIsSubmitting(true);

    try {
      // ... (código de submissão existente)

      // Fire tracking events
      if (typeof window !== "undefined") {
        // Meta Pixel
        if ((window as any).fbq) {
          (window as any).fbq("track", "Lead", {
            content_name: "Curso Detalhamento - Lead Form",
            content_category: "Education",
            value: 0,
            currency: "BRL",
          });
        }

        // Google Analytics
        if ((window as any).gtag) {
          (window as any).gtag("event", "generate_lead", {
            event_category: "curso",
            event_label: "Course Lead Form",
            value: 1,
          });
        }
      }

      // ✅ NOVO: Redirecionar para página de obrigado
      reset();
      router.push("/ty");

    } catch (error) {
      // ... (tratamento de erro)
    } finally {
      setIsSubmitting(false);
    }
  };

  // ✅ REMOVER: Todo bloco AnimatePresence com isSuccess
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      {/* Campos do formulário permanecem iguais */}
    </form>
  );
}
```

### Nova Página de Obrigado Lead
```typescript
// app/ty/page.tsx

import type { Metadata } from "next";
import LeadThankyouPage from "@/app/_components/lead-thankyou-page";

export const metadata: Metadata = {
  title: "Obrigado! | 3SCAR",
  description: "Obrigado pelo seu interesse no curso de Estética Automotiva!",
  robots: "noindex, nofollow", // Não indexar página de thank you
};

export default function ObrigadoLeadPage() {
  return <LeadThankyouPage />;
}
```

### Estrutura do LeadThankyouPage (Baseado em CourseThankyouPage)
```typescript
// app/_components/lead-thankyou-page.tsx
"use client";

import { motion } from "framer-motion";
import { CheckCircle2, MessageCircle, Instagram, Facebook, ArrowRight } from "lucide-react";

export default function LeadThankyouPage() {
  const whatsappNumber = "5551992252909";
  const whatsappMessage = encodeURIComponent(
    "Olá! Acabei de me inscrever para receber mais informações sobre o curso."
  );
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Background animated orbs (reutilizar de course-thankyou-page) */}

      {/* Partículas (10-12, mais sutil que compra) */}

      {/* Main Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className="w-full max-w-3xl rounded-3xl bg-white/95 backdrop-blur-sm shadow-2xl p-8 md:p-10"
        >
          {/* Header com checkmark */}
          <div className="text-center">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100"
            >
              <CheckCircle2 className="h-10 w-10 text-green-600" />
            </motion.div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Obrigado pelo Interesse!
            </h1>
            <p className="text-gray-600 text-lg">
              Recebemos sua inscrição com sucesso.
            </p>
          </div>

          {/* Próximos Passos */}
          <div className="mt-8 space-y-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              O que acontece agora?
            </h2>

            {/* Step 1 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="flex gap-4 p-4 rounded-xl bg-orange-50 border border-orange-200"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  Em breve entraremos em contato
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Nossa equipe vai analisar sua inscrição e entrar em contato via WhatsApp ou email em até 24 horas.
                </p>
              </div>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="flex gap-4 p-4 rounded-xl bg-blue-50 border border-blue-200"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  Siga-nos nas redes sociais
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Enquanto isso, acompanhe nosso trabalho e veja resultados reais dos nossos alunos!
                </p>
                <div className="flex gap-3 mt-3">
                  <a
                    href="https://instagram.com/3scar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-medium text-pink-600 hover:text-pink-700 transition"
                  >
                    <Instagram className="h-4 w-4" />
                    Instagram
                  </a>
                  <a
                    href="https://facebook.com/3scar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition"
                  >
                    <Facebook className="h-4 w-4" />
                    Facebook
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="flex gap-4 p-4 rounded-xl bg-green-50 border border-green-200"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  Tem dúvidas urgentes?
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Fale conosco diretamente pelo WhatsApp!
                </p>
              </div>
            </motion.div>
          </div>

          {/* CTA WhatsApp */}
          <motion.a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-8 flex items-center justify-center gap-3 rounded-xl bg-green-500 px-8 py-4 text-lg font-bold text-white shadow-lg hover:bg-green-600 transition-colors"
          >
            <MessageCircle className="h-6 w-6" />
            Falar Agora no WhatsApp
            <ArrowRight className="h-5 w-5" />
          </motion.a>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-8 text-center text-sm text-gray-500"
          >
            <p>Estamos ansiosos para ter você em nosso time! 🚀</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
```

## Dependencies

### Required
- Next.js 15 (App Router, useRouter)
- React 19
- Framer Motion
- Lucide React
- Tailwind CSS v4

### No New Dependencies
Reutiliza todas as dependências existentes do projeto.

## Files Created/Modified

### Created
```
app/ty/page.tsx
app/_components/lead-thankyou-page.tsx
```

### Modified
```
app/_components/course-lead-form.tsx
  - Adicionar import de useRouter
  - Remover estado isSuccess e UI inline
  - Adicionar router.push("/ty") após submissão
```

## Testing Checklist

- [ ] Formulário envia dados corretamente para `/api/leads`
- [ ] Tracking events (Meta Pixel, GA) disparam antes do redirect
- [ ] Redirecionamento funciona após submissão bem-sucedida
- [ ] Página `/ty` carrega sem erros
- [ ] Animações funcionam suavemente (60fps)
- [ ] Responsivo em mobile e desktop
- [ ] Links de WhatsApp e redes sociais funcionam
- [ ] Partículas aparecem atrás do container (z-index)
- [ ] Lint/TypeScript sem erros
- [ ] Build produção sem warnings
- [ ] Caso de erro: mensagem de erro exibida sem redirecionar

## Accessibility

- [ ] Ícones com cores contrastantes
- [ ] Texto legível (mínimo 14px em mobile)
- [ ] Animações respeitam prefers-reduced-motion
- [ ] Links com aria-labels quando necessário
- [ ] Estrutura semântica HTML
- [ ] Navegação por teclado funcional

## SEO Considerations

- [ ] Página `/ty` com `robots: "noindex, nofollow"`
- [ ] Metadata apropriado para página de conversão
- [ ] Título e descrição otimizados
- [ ] Não rastreável por buscadores (página interna)

## Performance Considerations

- [ ] Server Component para routing (page.tsx)
- [ ] Client Component apenas para animações (lead-thankyou-page.tsx)
- [ ] Redirecionamento programático (não server-side)
- [ ] Reutilizar componentes de animação existentes
- [ ] Lazy loading de imagens (se aplicável)

## User Experience Flow

```
1. Usuário preenche formulário na homepage
   ↓
2. Clica em "Garantir Minha Vaga Agora"
   ↓
3. Loading state (botão mostra "Processando...")
   ↓
4. Submissão bem-sucedida + tracking events
   ↓
5. Redirecionamento para /ty
   ↓
6. Página de agradecimento carrega com animações
   ↓
7. Usuário vê próximos passos e CTAs
```

## Error Handling

### Caso de Submissão com Erro
- **NÃO redirecionar**
- Exibir toast de erro
- Manter usuário no formulário
- Preservar dados preenchidos (exceto em caso de duplicata)

### Caso de Duplicata (Email/Phone existente)
- Exibir mensagem específica do servidor
- Não redirecionar
- Sugerir contato direto via WhatsApp

## Future Enhancements

- [ ] A/B testing de diferentes mensagens
- [ ] Personalização baseada em UTM parameters
- [ ] Countdown timer para retorno do time
- [ ] Video de apresentação da 3SCAR
- [ ] Testimonials de alunos na página de obrigado
- [ ] Opção de agendar call diretamente (Calendly)

## Related Documents

- `.agent/tasks/TASK-01-course-thankyou-page.md` (página de referência)
- Design system: Seguir padrões da landing page principal
- Form handling: `components/forms/lead-form.tsx`
- API endpoint: `app/api/leads/route.ts`

## Completion Criteria

**Task será considerada completa quando**:
1. ✅ Página `/ty` criada e funcional
2. ✅ `CourseLeadForm` redirecionando após sucesso
3. ✅ Animações e design consistentes com `/obrigado`
4. ✅ Tracking events funcionando corretamente
5. ✅ Todos os testes passando
6. ✅ Responsividade validada
7. ✅ Acessibilidade verificada
8. ✅ Build produção sem erros

## Estimated Effort

- **Development**: 2-3 horas
- **Testing**: 1 hora
- **Refinements**: 30 minutos
- **Total**: ~4 horas

---

**Status**: Ready for Implementation
**Blocked by**: None
**Assigned to**: Claude (via JITD workflow)
