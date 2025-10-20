"use client";

import dynamic from "next/dynamic";
import { AnalyticsErrorBoundary } from "./analytics-error-boundary";

/**
 * Safe Analytics Wrapper
 *
 * Carrega o AnalyticsWrapper de forma segura usando:
 * 1. Dynamic import com ssr: false (não bloqueia SSR)
 * 2. Error Boundary (captura ChunkLoadError)
 * 3. Fallback silencioso (não quebra página)
 * 4. Loading state opcional (não bloqueia renderização)
 *
 * Se analytics falhar ao carregar, página funciona normalmente.
 */

// Dynamic import: não bloqueia SSR, carrega apenas no cliente
const AnalyticsWrapper = dynamic(() => import("./analytics-wrapper"), {
  ssr: false, // Não renderiza no servidor (evita hydration issues)
  loading: () => null, // Não mostra loading (silencioso)
});

export default function SafeAnalytics() {
  return (
    <AnalyticsErrorBoundary
      fallback={null} // Fallback silencioso
      onError={(error) => {
        // Log para monitoring (pode integrar com Sentry, etc.)
        if (process.env.NODE_ENV === "development") {
          console.warn("⚠️ Analytics failed to load:", error.message);
        }
      }}
    >
      <AnalyticsWrapper />
    </AnalyticsErrorBoundary>
  );
}
