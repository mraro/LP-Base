/**
 * API Route: Facebook CAPI Event Tracking
 *
 * Recebe eventos do client-side e envia para Facebook via CAPI (server-side).
 * Usado quando CAPI está habilitado como alternativa ao Pixel browser.
 *
 * POST /api/tracking/capi
 * Body: {
 *   eventName: string,
 *   userData: { email?, phone?, fbc?, fbp? },
 *   customData?: object,
 *   eventId?: string,
 *   eventSourceUrl?: string
 * }
 */

import { NextRequest, NextResponse } from "next/server";
import { sendCapiEvent } from "@/lib/tracking/facebook-capi";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { eventName, userData = {}, customData, eventId, eventSourceUrl } = body;

    // Validação
    if (!eventName) {
      return NextResponse.json(
        { success: false, error: "eventName is required" },
        { status: 400 }
      );
    }

    // Capturar metadados do request
    const clientIp =
      request.headers.get("x-forwarded-for")?.split(",")[0] ||
      request.headers.get("x-real-ip") ||
      undefined;

    const userAgent = request.headers.get("user-agent") || undefined;

    // Enviar para CAPI
    const result = await sendCapiEvent(
      eventName,
      {
        email: userData.email,
        phone: userData.phone,
        clientIp,
        userAgent,
        fbc: userData.fbc,
        fbp: userData.fbp,
      },
      {
        eventId,
        eventSourceUrl: eventSourceUrl || request.headers.get("referer") || undefined,
        customData,
      }
    );

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ CAPI API Route Error:", error);
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}
