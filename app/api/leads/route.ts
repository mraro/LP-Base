import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { leadFormSchema } from "@/lib/validators";
import { trackingConfig } from "@/config/tracking.config";
import { sendLeadEvent } from "@/lib/tracking/facebook-capi";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate form data
    const validatedData = leadFormSchema.parse(body);

    // Get additional tracking data
    const { source, medium, campaign, fbclid, gclid } = body;

    // Get IP address
    const ip =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";

    // Get user agent
    const userAgent = request.headers.get("user-agent") || "unknown";

    // Define source: se não vier de plataforma (utm_source, fbclid, gclid), marca como "organico"
    const finalSource = source || fbclid || gclid ? source : "organico";

    // Create Supabase client
    const supabase = await createClient();

    // Insert lead into database
    // Nota: Não usamos .select() porque RLS bloqueia SELECT para anônimos
    // O INSERT funciona graças à policy "Anyone can insert leads"
    const { error: leadError } = await supabase
      .from("leads")
      .insert({
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        message: validatedData.message || null,
        source: finalSource,
        medium: medium || null,
        campaign: campaign || null,
        ip_address: ip,
        user_agent: userAgent,
      });

    if (leadError) {
      console.error("Error inserting lead:", leadError);
      throw new Error("Failed to save lead");
    }

    // CAPI Tracking: Se habilitado, envia evento Lead para Facebook (server-side)
    if (trackingConfig.metaCapi.enabled) {
      // Pega cookies do Facebook para matching (se enviados pelo client)
      const { fbc, fbp } = body;

      await sendLeadEvent(validatedData.email, validatedData.phone, {
        clientIp: ip,
        userAgent,
        fbc: fbc || fbclid, // Facebook Click ID
        fbp, // Facebook Browser ID
        eventSourceUrl: request.headers.get("referer") || undefined,
      });

      console.log("✅ CAPI Lead event sent for:", validatedData.email);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Lead captured successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error processing lead:", error);

    if (error instanceof Error && error.message.includes("validation")) {
      return NextResponse.json(
        { success: false, message: "Invalid form data" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

// GET endpoint for admin to fetch leads
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();

    // TODO: Add authentication check here

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "50");
    const offset = parseInt(searchParams.get("offset") || "0");

    const { data: leads, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
      leads,
      count: leads.length,
    });
  } catch (error) {
    console.error("Error fetching leads:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch leads" },
      { status: 500 }
    );
  }
}
