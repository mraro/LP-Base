"use client";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site.config";
import ScrollReveal from "@/components/animations/scroll-reveal";
import FadeIn from "@/components/animations/fade-in";
import { ArrowRight, Sparkles } from "lucide-react";

export default function HeroSection() {
  const scrollToForm = () => {
    const form = document.getElementById("contact-form");
    form?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn delay={0.2}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 border border-primary/20">
              <Sparkles className="w-4 h-4" />
              <span>Soluções que Transformam</span>
            </div>
          </FadeIn>

          <ScrollReveal delay={0.3} duration={0.7}>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
              {siteConfig.hero.title}
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.5} duration={0.7}>
            <p className="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              {siteConfig.hero.subtitle}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.7} duration={0.7}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="xl"
                onClick={scrollToForm}
                className="group font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {siteConfig.hero.ctaText}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <span className="text-sm text-muted-foreground">
                {siteConfig.hero.ctaSubtext}
              </span>
            </div>
          </ScrollReveal>

          <FadeIn delay={1} duration={1}>
            <div className="mt-16 flex justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span>Suporte 24/7</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                <span>500+ Clientes</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div>
                <span>Resultados Garantidos</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-primary rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}
