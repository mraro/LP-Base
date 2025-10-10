"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { siteConfig } from "@/config/site.config";
import ScrollReveal from "@/components/animations/scroll-reveal";
import { TrendingUp, Headset, Rocket, Shield, Zap, Users } from "lucide-react";

const iconMap = {
  chart: TrendingUp,
  headset: Headset,
  rocket: Rocket,
  shield: Shield,
  zap: Zap,
  users: Users,
};

export default function FeaturesSection() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Por Que Escolher Nossa Solução?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Oferecemos as melhores ferramentas e suporte para transformar seu negócio
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {siteConfig.features.map((feature, index) => {
            const Icon = iconMap[feature.icon as keyof typeof iconMap] || Rocket;

            return (
              <ScrollReveal key={index} delay={index * 0.1} direction="up">
                <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary/50 bg-card/50 backdrop-blur">
                  <CardHeader>
                    <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
