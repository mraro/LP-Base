"use client";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import SafeAnalytics from "@/components/tracking/safe-analytics";
import CourseCapturePage from "./course-capture-page";

/**
 * Home Page Wrapper
 *
 * Wrapper exclusivo para a página inicial que inclui:
 * - Vercel Analytics (pageviews e eventos)
 * - Vercel Speed Insights (Core Web Vitals)
 * - Meta Pixel + Google Analytics (via SafeAnalytics)
 *
 * Este wrapper garante que os trackings sejam carregados
 * APENAS na página inicial (/) e não em outras páginas
 * como admin, obrigado, etc.
 */
export default function HomePageWrapper() {
  return (
    <>
      <CourseCapturePage />

      {/* Trackings - Apenas Página Inicial */}
      <SafeAnalytics />
      <Analytics />
      <SpeedInsights />
    </>
  );
}
