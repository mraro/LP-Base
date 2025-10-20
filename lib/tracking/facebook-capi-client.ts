/**
 * Facebook CAPI - Client-Side Helper
 *
 * Funções para enviar eventos do browser via CAPI (server-side).
 * Usa API route interna para não expor Access Token no client.
 */

"use client";

import { trackingConfig } from "@/config/tracking.config";

/**
 * Verifica se CAPI está habilitado
 */
export function isCapiMode(): boolean {
  return trackingConfig.metaCapi.enabled;
}

/**
 * Gera event_id único para deduplicação
 */
function generateEventId(eventName: string): string {
  return `${eventName}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Pega cookies do Facebook (_fbc e _fbp) para matching
 */
function getFacebookCookies(): { fbc?: string; fbp?: string } {
  if (typeof document === "undefined") return {};

  const cookies = document.cookie.split("; ").reduce((acc, cookie) => {
    const [key, value] = cookie.split("=");
    acc[key] = value;
    return acc;
  }, {} as Record<string, string>);

  return {
    fbc: cookies._fbc,
    fbp: cookies._fbp,
  };
}

/**
 * Envia evento via CAPI (API route)
 */
export async function trackCapiEvent(
  eventName: string,
  userData?: {
    email?: string;
    phone?: string;
  },
  customData?: Record<string, any>
): Promise<{ success: boolean; eventId?: string }> {
  // Se CAPI não está habilitado, skip
  if (!isCapiMode()) {
    console.warn("⚠️ CAPI mode not enabled");
    return { success: false };
  }

  try {
    const eventId = generateEventId(eventName);
    const cookies = getFacebookCookies();

    const response = await fetch("/api/tracking/capi", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eventName,
        userData: {
          ...userData,
          ...cookies,
        },
        customData,
        eventId,
        eventSourceUrl: window.location.href,
      }),
    });

    const result = await response.json();

    if (!result.success) {
      console.error("❌ CAPI tracking failed:", result.error);
      return { success: false };
    }

    console.log("✅ CAPI event tracked:", eventName, eventId);
    return { success: true, eventId };
  } catch (error) {
    console.error("❌ CAPI tracking error:", error);
    return { success: false };
  }
}

/**
 * Helper: Track Lead event via CAPI
 */
export async function trackCapiLead(email: string, phone: string) {
  return trackCapiEvent("Lead", { email, phone });
}

/**
 * Helper: Track PageView event via CAPI
 */
export async function trackCapiPageView() {
  return trackCapiEvent("PageView");
}

/**
 * Helper: Track custom event via CAPI
 */
export async function trackCapiCustomEvent(
  eventName: string,
  userData?: { email?: string; phone?: string },
  customData?: Record<string, any>
) {
  return trackCapiEvent(eventName, userData, customData);
}
