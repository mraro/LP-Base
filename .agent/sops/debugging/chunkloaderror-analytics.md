# SOP: ChunkLoadError - Página Invisível por Falha no Analytics

## Context

**Quando ocorre**: Intermitente, principalmente em produção
**Sintomas**:
- Página fica completamente invisível (branca)
- Console: `ChunkLoadError: Loading chunk app/layout failed (timeout)`
- Console: `__webpack_modules__[moduleId] is not a function`
- Console: `fbevents.js:1 Failed to load resource: net::ERR_BLOCKED_BY_CLIENT`

**Impacto**: CRÍTICO - Usuários não conseguem usar a aplicação

## Problem

### Causa Raiz

O `AnalyticsWrapper` (componente client) estava sendo importado e renderizado **antes** do conteúdo principal da página no `app/layout.tsx`:

```tsx
// ❌ PROBLEMÁTICO (ordem anterior)
<body>
  <AnalyticsWrapper />  ← Falha aqui bloqueia tudo abaixo
  {children}            ← Nunca renderiza se analytics falhar
  <Toaster />
</body>
```

### Por que causava página invisível?

1. **Chunk Loading Failure**: Em produção, Next.js divide código em chunks. Se o chunk do analytics falha ao carregar (timeout, cache corrompido, CDN lento), um erro é lançado.

2. **Sem Error Boundary**: Não havia proteção contra falhas - erro propagava e quebrava renderização.

3. **Ordem de Renderização**: Analytics era renderizado ANTES do conteúdo, então falha bloqueava children.

4. **Sincronicidade**: Import síncrono significa que o erro acontece durante a renderização inicial, tornando a página inacessível.

### Gatilhos Comuns

1. **ChunkLoadError**: Conexão lenta, cache corrompido, timeout em CDN
2. **__webpack_modules__ error**: Scripts tentam executar antes do módulo estar pronto (race condition entre dynamic import e Script execution)
3. **ERR_BLOCKED_BY_CLIENT**:
   - AdBlockers/Privacy extensions bloqueando scripts
   - OU inicialização duplicada de pixels (conflito de carregamento)
4. **Network instability**: Build cache issues, CDN lento

## Solution

### Implementação em 3 Camadas

#### 1. Error Boundary para Analytics

Criado componente `AnalyticsErrorBoundary` que captura erros de carregamento:

**Arquivo**: `components/tracking/analytics-error-boundary.tsx`

```tsx
export class AnalyticsErrorBoundary extends Component<Props, State> {
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log silencioso - não bloqueia UI
    console.warn("Analytics failed to load:", error.message);
  }

  render() {
    if (this.state.hasError) {
      // Fallback silencioso: renderiza null
      return this.props.fallback ?? null;
    }
    return this.props.children;
  }
}
```

**Benefícios**:
- ✅ Captura ChunkLoadError
- ✅ Não quebra página
- ✅ Logs para debugging
- ✅ Fallback silencioso (usuário não vê erro)

#### 2. Dynamic Import com SSR Desabilitado

Criado wrapper seguro `SafeAnalytics`:

**Arquivo**: `components/tracking/safe-analytics.tsx`

```tsx
const AnalyticsWrapper = dynamic(() => import("./analytics-wrapper"), {
  ssr: false,         // Não renderiza no servidor
  loading: () => null, // Não mostra loading
});

export default function SafeAnalytics() {
  return (
    <AnalyticsErrorBoundary fallback={null}>
      <AnalyticsWrapper />
    </AnalyticsErrorBoundary>
  );
}
```

**Benefícios**:
- ✅ Carrega apenas no cliente (evita hydration issues)
- ✅ Não bloqueia SSR
- ✅ Dupla proteção: dynamic + error boundary
- ✅ Carregamento assíncrono

#### 3. Ordem de Renderização Corrigida

Atualizado `app/layout.tsx`:

```tsx
// ✅ CORRETO (ordem atual)
<body>
  {children}         ← Conteúdo renderiza PRIMEIRO
  <Toaster />        ← UI essencial ANTES de analytics
  <SafeAnalytics />  ← Analytics por último (não crítico)
</body>
```

**Benefícios**:
- ✅ Conteúdo sempre renderiza
- ✅ Analytics não bloqueia página
- ✅ Falha silenciosa se analytics não carregar

#### 4. Client-Side Mounting + Lazy Strategy

Todos os componentes de analytics agora usam:

**Arquivo exemplo**: `components/tracking/meta-pixel.tsx`

```tsx
export default function MetaPixel() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);  // Garante que está no cliente
  }, []);

  if (!pixelId || !isClient) return null;

  return (
    <Script
      strategy="lazyOnload"  // ← Carrega APÓS página estar interativa
      {...}
    />
  );
}
```

**Por que isso resolve `__webpack_modules__[moduleId] is not a function`**:
1. `isClient` garante que componente só renderiza após hydration
2. `strategy="lazyOnload"` adia carregamento até página estar pronta
3. Elimina race condition entre dynamic import e script execution

**Aplicado em**:
- ✅ `components/tracking/meta-pixel.tsx`
- ✅ `components/tracking/google-analytics.tsx`
- ✅ `components/tracking/google-ads.tsx`

### Fluxo de Proteção (Camadas)

```
┌─────────────────────────────────────────────────────────┐
│ CAMADA 1: Ordem de Renderização                        │
│ → Conteúdo renderiza ANTES de analytics                │
│                                                         │
│ CAMADA 2: Dynamic Import (SafeAnalytics)               │
│ → ssr: false + dynamic import                          │
│                                                         │
│ CAMADA 3: Error Boundary                               │
│ → Captura ChunkLoadError, fallback silencioso          │
│                                                         │
│ CAMADA 4: Client Mounting + Lazy Loading               │
│ → isClient check + strategy="lazyOnload"               │
│ → Previne __webpack_modules__ error                    │
│                                                         │
│ RESULTADO: Página SEMPRE funciona, analytics opcional  │
└─────────────────────────────────────────────────────────┘
```

## Testing

### Como Simular o Bug (Dev)

1. **Simular chunk failure**:
```tsx
// Em analytics-wrapper.tsx temporariamente
throw new Error("Simulated ChunkLoadError");
```

2. **Verificar**:
   - ✅ Página carrega normalmente
   - ✅ Console mostra: "⚠️ Analytics failed to load"
   - ✅ Conteúdo visível
   - ✅ Sem erro na UI

### Como Testar em Produção

1. **Build e deploy**:
```bash
npm run build
npm run start
```

2. **Simular condições ruins**:
   - Chrome DevTools → Network → Throttling: Slow 3G
   - Disable cache
   - Recarregar página múltiplas vezes

3. **Verificar**:
   - ✅ Página sempre carrega
   - ✅ Sem tela branca
   - ✅ Analytics pode falhar silenciosamente

## Prevention

### Checklist para Novos Third-Party Scripts

Ao adicionar novos scripts externos (pixels, analytics, chat widgets):

- [ ] Usar `dynamic()` import com `ssr: false`
- [ ] Envolver com `AnalyticsErrorBoundary`
- [ ] Renderizar no FINAL do body (após conteúdo)
- [ ] Testar com network throttling
- [ ] Adicionar logging de erros
- [ ] Não bloquear renderização crítica

### Pattern Recomendado

```tsx
// ✅ SEMPRE use este pattern para third-party
const ThirdPartyScript = dynamic(() => import("./third-party"), {
  ssr: false,
  loading: () => null,
});

function MyLayout() {
  return (
    <body>
      {children}  {/* Crítico primeiro */}
      <AnalyticsErrorBoundary>
        <ThirdPartyScript />  {/* Não-crítico por último */}
      </AnalyticsErrorBoundary>
    </body>
  );
}
```

## Monitoring

### Logs a Observar

**Development**:
```
⚠️ Analytics failed to load: ChunkLoadError
```

**Production** (integrar com Sentry/LogRocket):
```tsx
<AnalyticsErrorBoundary
  onError={(error) => {
    // Enviar para monitoring
    Sentry.captureException(error);
  }}
>
```

### Métricas

Monitorar:
- Taxa de falha de carregamento do analytics (aceitável: <5%)
- Tempo de carregamento dos chunks de analytics
- Browsers/networks mais afetados

## Related Documents

- System: `.agent/system/project-architecture.md` - Arquitetura geral
- System: `.agent/system/tech-stack-patterns.md` - Padrões Next.js 15
- Component: `components/tracking/safe-analytics.tsx` - Implementação
- Component: `components/tracking/analytics-error-boundary.tsx` - Error Boundary

## References

- Next.js Dynamic Imports: https://nextjs.org/docs/app/building-your-application/optimizing/lazy-loading
- React Error Boundaries: https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary
- ChunkLoadError: https://webpack.js.org/guides/code-splitting/#dynamic-imports

---

**Created**: 2025-10-20
**Last Updated**: 2025-10-20
**Severity**: CRITICAL → RESOLVED ✅
**Status**: Production-Ready
