"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { trackingConfig } from "@/config/tracking.config";
import { trackCapiPageView } from "@/lib/tracking/facebook-capi-client";

export default function MetaPixel() {
  const pixelId = trackingConfig.metaPixelId;
  const isCapiMode = trackingConfig.metaCapi.enabled;
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Garantir que está no cliente antes de carregar scripts
    setIsClient(true);

    // Se CAPI está habilitado, usar CAPI em vez de Pixel browser
    if (isCapiMode && isClient) {
      trackCapiPageView();
    }
  }, [isCapiMode, isClient]);

  // Se CAPI está habilitado, NÃO carrega Pixel browser
  if (isCapiMode) {
    console.log("🚀 CAPI Mode: Using server-side tracking instead of Pixel");
    return null;
  }

  if (!pixelId || !isClient) return null;

  return (
    <>
      <Script
        id="meta-pixel"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${pixelId}');
            fbq('track', 'PageView');
          `,
        }}
      />
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}
