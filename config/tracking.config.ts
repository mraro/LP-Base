export const trackingConfig = {
  // Meta (Facebook) Pixel
  metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID || "",

  // Google Analytics 4
  googleAnalyticsId: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || "",

  // Google Ads
  googleAds: {
    conversionId: process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID || "",
    conversionLabel: process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL || "",
  },

  // Client ID (multi-tenant)
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID || "default",

  // Eventos de conversão
  events: {
    lead: "Lead",
    pageView: "PageView",
    contact: "Contact",
    formSubmit: "FormSubmit",
  },
}

export type TrackingConfig = typeof trackingConfig
