"use client";

import { useEffect } from "react";
import Script from "next/script";
import { trackingConfig } from "@/config/tracking.config";

export default function MetaPixel() {
  const pixelId = trackingConfig.metaPixelId;

  useEffect(() => {
    if (!pixelId) return;

    // Initialize Meta Pixel
    if (typeof window !== "undefined") {
      (window as any).fbq =
        (window as any).fbq ||
        function () {
          ((window as any).fbq.q = (window as any).fbq.q || []).push(arguments);
        };
      (window as any).fbq.loaded = true;
      (window as any).fbq.version = "2.0";
      (window as any).fbq.queue = [];

      // Track PageView
      (window as any).fbq("init", pixelId);
      (window as any).fbq("track", "PageView");
    }
  }, [pixelId]);

  if (!pixelId) return null;

  return (
    <>
      <Script
        id="meta-pixel"
        strategy="afterInteractive"
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
