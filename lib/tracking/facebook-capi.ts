/**
 * Facebook Conversions API (CAPI) - Server-Side Tracking
 *
 * Alternativa ao Pixel que funciona 100% server-side, impossível de bloquear
 * por AdBlockers. Usa o MESMO Pixel ID da conta de anúncios.
 *
 * Setup:
 * 1. NEXT_PUBLIC_META_PIXEL_ID (mesmo do Pixel browser)
 * 2. META_CAPI_ACCESS_TOKEN (gerar em: https://business.facebook.com/settings/system-users)
 *
 * Docs: https://developers.facebook.com/docs/marketing-api/conversions-api
 */

import crypto from "crypto";

// Configuração
const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "";
const ACCESS_TOKEN = process.env.META_CAPI_ACCESS_TOKEN || "";
const GRAPH_API_VERSION = "v18.0";

/**
 * Verifica se CAPI está configurado
 */
export function isCapiEnabled(): boolean {
  return !!(PIXEL_ID && ACCESS_TOKEN);
}

/**
 * Hash SHA-256 para dados sensíveis (email, phone)
 * Facebook usa para matching sem ver dados em texto puro
 */
function hashData(data: string): string {
  return crypto.createHash("sha256").update(data.toLowerCase().trim()).digest("hex");
}

/**
 * Normaliza e hash email
 */
function hashEmail(email: string): string {
  return hashData(email);
}

/**
 * Normaliza e hash telefone (remove caracteres especiais)
 */
function hashPhone(phone: string): string {
  // Remove tudo exceto números
  const normalized = phone.replace(/\D/g, "");
  return hashData(normalized);
}

/**
 * Dados do usuário para matching (hasheados)
 */
interface UserData {
  em?: string; // email (hasheado)
  ph?: string; // phone (hasheado)
  client_ip_address?: string;
  client_user_agent?: string;
  fbc?: string; // Facebook Click ID (cookie _fbc)
  fbp?: string; // Facebook Browser ID (cookie _fbp)
}

/**
 * Evento do CAPI
 */
interface CapiEvent {
  event_name: string; // 'Lead', 'PageView', 'Purchase', etc
  event_time: number; // Unix timestamp
  event_id?: string; // Para deduplicação com Pixel
  event_source_url?: string; // URL onde evento ocorreu
  action_source: "website" | "email" | "app" | "phone_call" | "chat" | "physical_store" | "system_generated" | "other";
  user_data: UserData;
  custom_data?: Record<string, any>;
}

/**
 * Payload completo para API
 */
interface CapiPayload {
  data: CapiEvent[];
  access_token: string;
  test_event_code?: string; // Para testar no Event Manager
}

/**
 * Envia evento para Facebook Conversions API
 */
export async function sendCapiEvent(
  eventName: string,
  userData: {
    email?: string;
    phone?: string;
    clientIp?: string;
    userAgent?: string;
    fbc?: string;
    fbp?: string;
  },
  options?: {
    eventId?: string; // Para deduplicação
    eventSourceUrl?: string;
    customData?: Record<string, any>;
    testEventCode?: string; // Para testes
  }
): Promise<{ success: boolean; error?: string }> {
  // Validação
  if (!isCapiEnabled()) {
    console.warn("⚠️ CAPI not configured - skipping server-side tracking");
    return { success: false, error: "CAPI not configured" };
  }

  try {
    // Preparar user_data (hasheado)
    const userDataHashed: UserData = {};

    if (userData.email) {
      userDataHashed.em = hashEmail(userData.email);
    }

    if (userData.phone) {
      userDataHashed.ph = hashPhone(userData.phone);
    }

    if (userData.clientIp) {
      userDataHashed.client_ip_address = userData.clientIp;
    }

    if (userData.userAgent) {
      userDataHashed.client_user_agent = userData.userAgent;
    }

    if (userData.fbc) {
      userDataHashed.fbc = userData.fbc;
    }

    if (userData.fbp) {
      userDataHashed.fbp = userData.fbp;
    }

    // Preparar evento
    const event: CapiEvent = {
      event_name: eventName,
      event_time: Math.floor(Date.now() / 1000),
      action_source: "website",
      user_data: userDataHashed,
    };

    // Adicionar event_id para deduplicação
    if (options?.eventId) {
      event.event_id = options.eventId;
    }

    // Adicionar URL de origem
    if (options?.eventSourceUrl) {
      event.event_source_url = options.eventSourceUrl;
    }

    // Adicionar custom data
    if (options?.customData) {
      event.custom_data = options.customData;
    }

    // Preparar payload
    const payload: CapiPayload = {
      data: [event],
      access_token: ACCESS_TOKEN,
    };

    // Adicionar test_event_code se fornecido
    if (options?.testEventCode) {
      payload.test_event_code = options.testEventCode;
    }

    // Enviar para Facebook
    const response = await fetch(
      `https://graph.facebook.com/${GRAPH_API_VERSION}/${PIXEL_ID}/events`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.error("❌ CAPI Error:", result);
      return { success: false, error: result.error?.message || "Unknown error" };
    }

    console.log("✅ CAPI Event sent:", eventName, result);
    return { success: true };
  } catch (error) {
    console.error("❌ CAPI Exception:", error);
    return { success: false, error: String(error) };
  }
}

/**
 * Helper: Envia evento de Lead
 */
export async function sendLeadEvent(
  email: string,
  phone: string,
  options?: {
    clientIp?: string;
    userAgent?: string;
    fbc?: string;
    fbp?: string;
    eventId?: string;
    eventSourceUrl?: string;
  }
) {
  return sendCapiEvent("Lead", { email, phone, ...options }, {
    eventId: options?.eventId,
    eventSourceUrl: options?.eventSourceUrl,
  });
}

/**
 * Helper: Envia evento de PageView
 */
export async function sendPageViewEvent(
  options?: {
    clientIp?: string;
    userAgent?: string;
    fbc?: string;
    fbp?: string;
    eventId?: string;
    eventSourceUrl?: string;
  }
) {
  return sendCapiEvent("PageView", options || {}, {
    eventId: options?.eventId,
    eventSourceUrl: options?.eventSourceUrl,
  });
}

/**
 * Helper: Envia evento customizado
 */
export async function sendCustomEvent(
  eventName: string,
  userData: {
    email?: string;
    phone?: string;
    clientIp?: string;
    userAgent?: string;
    fbc?: string;
    fbp?: string;
  },
  customData?: Record<string, any>,
  eventId?: string
) {
  return sendCapiEvent(eventName, userData, {
    customData,
    eventId,
  });
}
