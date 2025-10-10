"use client";

import MetaPixel from "./meta-pixel";
import GoogleAnalytics from "./google-analytics";
import GoogleAds from "./google-ads";

export default function AnalyticsWrapper() {
  return (
    <>
      <MetaPixel />
      <GoogleAnalytics />
      <GoogleAds />
    </>
  );
}
