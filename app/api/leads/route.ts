import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { leadFormSchema } from "@/lib/validators";
import { trackingConfig } from "@/config/tracking.config";

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

    // Create Supabase client
    const supabase = await createClient();

    // Insert lead into database
    const { data: lead, error: leadError } = await supabase
      .from("leads")
      .insert({
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        message: validatedData.message || null,
        source: source || null,
        medium: medium || null,
        campaign: campaign || null,
        ip_address: ip,
        user_agent: userAgent,
        client_id: trackingConfig.clientId,
      })
      .select()
      .single();

    if (leadError) {
      console.error("Error inserting lead:", leadError);
      throw new Error("Failed to save lead");
    }

    // Track conversion
    const { error: conversionError } = await supabase
      .from("conversions")
      .insert({
        lead_id: lead.id,
        event_name: "Lead",
        value: 0,
        currency: "BRL",
        fbc: fbclid ? `fb.1.${Date.now()}.${fbclid}` : null,
        gclid: gclid || null,
      });

    if (conversionError) {
      console.error("Error tracking conversion:", conversionError);
      // Don't throw error, conversion tracking is not critical
    }

    // Send webhook notification (optional - add your webhook URL)
    // await fetch("YOUR_WEBHOOK_URL", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ lead }),
    // });

    return NextResponse.json(
      {
        success: true,
        message: "Lead captured successfully",
        leadId: lead.id,
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
      .eq("client_id", trackingConfig.clientId)
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
