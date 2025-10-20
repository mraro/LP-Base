"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { trackingConfig } from "@/config/tracking.config";

export default function GoogleAds() {
  const { conversionId } = trackingConfig.googleAds;
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!conversionId || !isClient) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${conversionId}`}
        strategy="lazyOnload"
      />
      <Script
        id="google-ads"
        strategy="lazyOnload"
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
