"use client";

import Script from "next/script";
import { trackingConfig } from "@/config/tracking.config";

export default function GoogleAds() {
  const { conversionId } = trackingConfig.googleAds;

  if (!conversionId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${conversionId}`}
        strategy="afterInteractive"
      />
      <Script
        id="google-ads"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${conversionId}');
          `,
        }}
      />
    </>
  );
}
