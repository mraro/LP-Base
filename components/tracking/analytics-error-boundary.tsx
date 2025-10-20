"use client";

import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
}

/**
 * Error Boundary para componentes de Analytics
 *
 * Implementa fallback silencioso: se analytics falhar ao carregar,
 * não bloqueia a página - simplesmente não carrega o tracking.
 *
 * Isso previne o ChunkLoadError de tornar a página invisível.
 */
export class AnalyticsErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log silencioso para debugging (não bloqueia UI)
    console.warn("Analytics failed to load:", error.message);
    console.debug("Error details:", errorInfo);

    // Callback opcional para monitoring externo
    this.props.onError?.(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Fallback silencioso: renderiza null por padrão
      // Usuário não percebe, página funciona normalmente
      return this.props.fallback ?? null;
    }

    return this.props.children;
  }
}
