"use client";

import ScrollReveal from "@/components/animations/scroll-reveal";
import LeadForm from "@/components/forms/lead-form";
import { siteConfig } from "@/config/site.config";

export default function CTASection() {
  return (
    <section id="contact-form" className="py-24 bg-gradient-to-br from-primary/5 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                {siteConfig.leadForm.title}
              </h2>
              <p className="text-xl text-muted-foreground">
                {siteConfig.leadForm.subtitle}
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2} direction="up">
            <div className="bg-card/80 backdrop-blur border-2 rounded-2xl p-8 sm:p-12 shadow-xl">
              <LeadForm />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
