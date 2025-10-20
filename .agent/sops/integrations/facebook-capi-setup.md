# SOP: Facebook Conversions API (CAPI) - Setup Completo

## Context

**O que é**: Tracking server-side do Facebook que bypassa AdBlockers
**Quando usar**: Quando quiser 100% de precisão em conversões (leads, vendas)
**Por que**: AdBlockers bloqueiam Pixel browser, mas não conseguem bloquear CAPI
**Onde**: Projeto já tem implementação completa, só precisa configurar

## Problem

### Tracking Tradicional (Pixel Browser)

```
User → Pixel (fbevents.js) → Facebook
         ↓
    ❌ BLOQUEADO por AdBlock
```

**Resultado**: 30-40% dos eventos nunca chegam no Facebook (perda de dados)

### Solução: CAPI (Server-Side)

```
User → Seu Servidor → Facebook API
                    ✅ IMPOSSÍVEL bloquear
```

**Resultado**: 95-100% dos eventos chegam no Facebook

---

## Solution

### Parte 1: Obter Access Token do Facebook

#### Passo 1: Acessar Business Manager

1. Ir para: https://business.facebook.com/settings/system-users
2. Login na conta que TEM o Pixel

#### Passo 2: Criar System User

1. Clicar em **"Add"** (Adicionar)
2. Nome: `CAPI - 3S Cars` (ou nome do projeto)
3. Role: **Admin**
4. Clicar em **"Create System User"**

#### Passo 3: Gerar Access Token

1. Selecionar o System User criado
2. Clicar em **"Generate New Token"**
3. Selecionar o **App** (ou criar novo se não tiver)
4. Permissões necessárias:
   - ✅ `ads_management`
   - ✅ `business_management`
5. Token Expiration: **Never** (recomendado) ou 60 dias
6. Clicar em **"Generate Token"**
7. **COPIAR** o token (só aparece 1x!)

**Exemplo de token**:
```
EAABsbCS1iHgBAOZC9J...muito_longo...YJqQZDZD
```

#### Passo 4: Dar Acesso ao Pixel

1. Ir para **Assets** no System User
2. Add Assets → **Pixels**
3. Selecionar seu Pixel
4. Permissões: **Full Control**
5. Salvar

---

### Parte 2: Configurar no Projeto

#### Passo 1: Adicionar no `.env`

```bash
# Pixel ID (mesmo do browser)
NEXT_PUBLIC_META_PIXEL_ID=123456789

# Access Token (NÃO colocar NEXT_PUBLIC_ - é secreto!)
META_CAPI_ACCESS_TOKEN=EAABsbCS1iHgBAOZC9J...
```

#### Passo 2: Verificar se funcionou

```bash
npm run dev
```

Abrir console do browser:
```
🚀 CAPI Mode: Using server-side tracking instead of Pixel
```

Se aparecer isso = CAPI está ativo! ✅

---

### Parte 3: Como Funciona

#### Modo Pixel (SEM CAPI configurado)

```tsx
// components/tracking/meta-pixel.tsx

if (!META_CAPI_ACCESS_TOKEN) {
  // Carrega Pixel browser (pode ser bloqueado)
  return <Script src="fbevents.js" />
}
```

#### Modo CAPI (COM CAPI configurado)

```tsx
// components/tracking/meta-pixel.tsx

if (META_CAPI_ACCESS_TOKEN) {
  // NÃO carrega Pixel browser
  // Usa apenas CAPI (server-side)
  return null;
}
```

---

## Fluxo de Eventos

### PageView

**Quando**: Usuário acessa a landing page

**Como funciona**:
```typescript
// components/tracking/meta-pixel.tsx
useEffect(() => {
  if (isCapiMode) {
    trackCapiPageView(); // Chama API route
  }
}, []);

// API route envia para Facebook
POST https://graph.facebook.com/v18.0/{pixel_id}/events
{
  "data": [{
    "event_name": "PageView",
    "event_time": 1234567890,
    "action_source": "website",
    "user_data": {
      "client_ip_address": "1.2.3.4",
      "client_user_agent": "Mozilla/5.0...",
      "fbp": "_fb.1.cookie...",
      "fbc": "fb.1.click_id..."
    }
  }],
  "access_token": "EAABsbCS..."
}
```

### Lead

**Quando**: Usuário preenche formulário

**Como funciona**:
```typescript
// components/forms/lead-form.tsx
const onSubmit = async (data) => {
  // Envia para /api/leads
  await fetch('/api/leads', {
    method: 'POST',
    body: JSON.stringify({
      ...data,
      fbc: cookies._fbc, // Facebook Click ID
      fbp: cookies._fbp, // Facebook Browser ID
    })
  });
}

// app/api/leads/route.ts
if (isCapiEnabled()) {
  await sendLeadEvent(email, phone, {
    clientIp,
    userAgent,
    fbc, // Matching com clique no anúncio
    fbp, // Matching com visita anterior
  });
}
```

**Dados enviados (hasheados)**:
```json
{
  "data": [{
    "event_name": "Lead",
    "event_time": 1234567890,
    "action_source": "website",
    "user_data": {
      "em": "a665a45920422f9d...", // Email hasheado (SHA-256)
      "ph": "b7f27e9c0c8f3e1a...", // Phone hasheado (SHA-256)
      "client_ip_address": "1.2.3.4",
      "client_user_agent": "Mozilla/5.0...",
      "fbc": "fb.1.1234567890.AbCdEfG", // Click ID
      "fbp": "fb.1.1234567890.123456789" // Browser ID
    },
    "event_source_url": "https://seusite.com/"
  }],
  "access_token": "EAABsbCS..."
}
```

---

## Matching: Como Facebook Identifica o Usuário

O Facebook usa **múltiplos sinais** para fazer matching:

| Sinal | O que é | Como ajuda |
|-------|---------|------------|
| **em** (email hash) | SHA-256 do email | Match com perfil do FB |
| **ph** (phone hash) | SHA-256 do telefone | Match com número do FB |
| **fbc** | Facebook Click ID | Match com clique no anúncio |
| **fbp** | Facebook Browser ID | Match com visita anterior |
| **client_ip_address** | IP do usuário | Geolocalização |
| **client_user_agent** | Browser do usuário | Device matching |

**Quanto mais sinais, melhor o matching!** 🎯

---

## Testing

### Testar Eventos no Event Manager

1. Ir para: https://business.facebook.com/events_manager2/list/pixel/{PIXEL_ID}/test_events
2. Copiar o **Test Event Code**
3. Adicionar temporariamente no código:

```typescript
// lib/tracking/facebook-capi.ts
await sendCapiEvent(eventName, userData, {
  testEventCode: "TEST12345", // ← Seu código de teste
});
```

4. Disparar evento (ex: preencher formulário)
5. Verificar no Event Manager se apareceu
6. **Remover** o `testEventCode` depois

### Verificar Logs

**Development**:
```bash
npm run dev
```

Console do browser:
```
🚀 CAPI Mode: Using server-side tracking instead of Pixel
```

Console do terminal (servidor):
```
✅ CAPI Event sent: PageView { events_received: 1, ... }
✅ CAPI Lead event sent for: joao@email.com
```

**Production**:
```bash
npm run build
npm run start
```

Verificar logs do servidor (Vercel/AWS/etc)

---

## Deduplicação (se usar Pixel + CAPI juntos)

Se você quiser usar **ambos** (Pixel E CAPI), precisa deduplic ar:

```typescript
// Gerar ID único
const eventId = `lead_${Date.now()}_${randomUUID()}`;

// Pixel usa o ID
fbq('track', 'Lead', {}, { eventID: eventId });

// CAPI usa MESMO ID
await sendCapiEvent('Lead', userData, { eventId });

// Facebook vê: "Mesmo eventId = 1 conversão só"
```

Mas **no nosso projeto**: usamos **OU Pixel OU CAPI**, não os dois juntos.

---

## Troubleshooting

### "CAPI not configured - skipping"

**Causa**: `META_CAPI_ACCESS_TOKEN` não está no `.env`
**Solução**: Adicionar token gerado no Facebook Business

### "Invalid OAuth 2.0 Access Token"

**Causa**: Token expirado ou inválido
**Solução**:
1. Gerar novo token no Business Manager
2. Atualizar `.env`
3. Reiniciar servidor

### "Pixel ID not found"

**Causa**: Pixel ID errado ou System User não tem acesso
**Solução**:
1. Verificar `NEXT_PUBLIC_META_PIXEL_ID` está correto
2. No Business Manager → System User → Assets → Verificar se Pixel está adicionado

### Eventos não aparecem no Event Manager

**Causa 1**: Access Token sem permissões
**Solução**: Gerar novo token com `ads_management` e `business_management`

**Causa 2**: Matching fraco (poucos sinais)
**Solução**: Enviar `fbc`, `fbp`, `email`, `phone` quando possível

**Causa 3**: Test Event Code ainda ativo
**Solução**: Remover `testEventCode` do código

---

## Best Practices

### ✅ DO

- Usar CAPI para conversões importantes (Lead, Purchase)
- Enviar `fbc` e `fbp` para melhor matching
- Hashear email/telefone (já feito automaticamente)
- Testar com Test Event Code primeiro
- Monitorar logs de erro

### ❌ DON'T

- Expor `META_CAPI_ACCESS_TOKEN` no client (NUNCA colocar `NEXT_PUBLIC_`)
- Enviar dados sensíveis em texto puro (sempre hasheado)
- Esquecer de dar acesso ao Pixel para o System User
- Usar token pessoal (sempre System User token)

---

## Arquitetura Implementada

```
.
├── lib/tracking/
│   ├── facebook-capi.ts           # Funções server-side (hash, send)
│   └── facebook-capi-client.ts    # Funções client-side (wrapper)
│
├── app/api/
│   ├── tracking/capi/route.ts     # API route para eventos client→server
│   └── leads/route.ts             # Integrado com CAPI
│
├── components/tracking/
│   └── meta-pixel.tsx             # Detecta CAPI mode
│
├── components/forms/
│   └── lead-form.tsx              # Envia cookies FB (_fbc, _fbp)
│
└── config/
    └── tracking.config.ts         # Configuração centralizada
```

---

## Performance Impact

**Antes (Pixel browser)**:
- Carrega `fbevents.js` (~45KB)
- Executado no browser (consome CPU do cliente)
- Bloqueado por AdBlock (30-40% perda)

**Agora (CAPI)**:
- ✅ Zero JS no browser (faster page load)
- ✅ Executado no servidor (zero impacto no cliente)
- ✅ 100% entrega (não bloqueável)

**Resultado**: Página mais rápida + Tracking mais preciso! 🚀

---

## Compliance (LGPD/GDPR)

CAPI está em compliance porque:

1. ✅ Dados hasheados (Facebook não vê email/telefone em texto puro)
2. ✅ Server-side (mais controle sobre dados)
3. ✅ Cookies first-party (`_fbc`, `_fbp`)
4. ✅ Usuário pode opt-out (cookie consent)

**Recomendação**: Adicionar Cookie Consent banner se ainda não tem.

---

## Monitoring

### Métricas para Acompanhar

**Event Manager**:
- Taxa de matching (quanto % dos eventos foram associados a usuários)
- Eventos processados vs eventos recebidos
- Erros de API

**Seu servidor**:
- Taxa de sucesso de CAPI requests
- Latência da API do Facebook
- Erros de authentication

---

## Related Documents

- System: `.agent/system/project-architecture.md` - Arquitetura geral
- SOP: `.agent/sops/debugging/chunkloaderror-analytics.md` - Problemas com Pixel
- Code: `lib/tracking/facebook-capi.ts` - Implementação server-side
- Code: `components/tracking/meta-pixel.tsx` - Lógica de ativação

---

## References

- Facebook CAPI Docs: https://developers.facebook.com/docs/marketing-api/conversions-api
- Event Parameters: https://developers.facebook.com/docs/marketing-api/conversions-api/parameters
- System Users: https://www.facebook.com/business/help/503306463479099
- Matching Quality: https://www.facebook.com/business/help/471978536642445

---

**Created**: 2025-10-20
**Last Updated**: 2025-10-20
**Status**: Production-Ready ✅
**Complexity**: Medium
**Setup Time**: ~15 minutos
