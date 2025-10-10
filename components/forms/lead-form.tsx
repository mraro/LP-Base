"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { leadFormSchema, type LeadFormData } from "@/lib/validators";
import { siteConfig } from "@/config/site.config";
import { Loader2 } from "lucide-react";

export default function LeadForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadFormSchema),
  });

  const onSubmit = async (data: LeadFormData) => {
    setIsSubmitting(true);

    try {
      // Get UTM parameters from URL
      const urlParams = new URLSearchParams(window.location.search);
      const utmSource = urlParams.get("utm_source");
      const utmMedium = urlParams.get("utm_medium");
      const utmCampaign = urlParams.get("utm_campaign");

      // Get Facebook click ID (fbclid) and Google click ID (gclid)
      const fbclid = urlParams.get("fbclid");
      const gclid = urlParams.get("gclid");

      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          source: utmSource,
          medium: utmMedium,
          campaign: utmCampaign,
          fbclid,
          gclid,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao enviar formulário");
      }

      const result = await response.json();

      // Fire tracking events
      if (typeof window !== "undefined") {
        // Meta Pixel
        if ((window as any).fbq) {
          (window as any).fbq("track", "Lead", {
            content_name: "Lead Form Submission",
            value: 0,
            currency: "BRL",
          });
        }

        // Google Analytics
        if ((window as any).gtag) {
          (window as any).gtag("event", "generate_lead", {
            event_category: "engagement",
            event_label: "Lead Form",
          });
        }
      }

      toast({
        title: "Sucesso!",
        description: siteConfig.leadForm.successMessage,
      });

      reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Erro",
        description: siteConfig.leadForm.errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">
          {siteConfig.leadForm.fields.name.label}
          {siteConfig.leadForm.fields.name.required && (
            <span className="text-destructive ml-1">*</span>
          )}
        </Label>
        <Input
          id="name"
          type="text"
          placeholder={siteConfig.leadForm.fields.name.placeholder}
          {...register("name")}
          className={errors.name ? "border-destructive" : ""}
        />
        {errors.name && (
          <p className="text-sm text-destructive">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">
          {siteConfig.leadForm.fields.email.label}
          {siteConfig.leadForm.fields.email.required && (
            <span className="text-destructive ml-1">*</span>
          )}
        </Label>
        <Input
          id="email"
          type="email"
          placeholder={siteConfig.leadForm.fields.email.placeholder}
          {...register("email")}
          className={errors.email ? "border-destructive" : ""}
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">
          {siteConfig.leadForm.fields.phone.label}
          {siteConfig.leadForm.fields.phone.required && (
            <span className="text-destructive ml-1">*</span>
          )}
        </Label>
        <Input
          id="phone"
          type="tel"
          placeholder={siteConfig.leadForm.fields.phone.placeholder}
          {...register("phone")}
          className={errors.phone ? "border-destructive" : ""}
        />
        {errors.phone && (
          <p className="text-sm text-destructive">{errors.phone.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">
          {siteConfig.leadForm.fields.message.label}
        </Label>
        <Textarea
          id="message"
          placeholder={siteConfig.leadForm.fields.message.placeholder}
          rows={4}
          {...register("message")}
          className={errors.message ? "border-destructive" : ""}
        />
        {errors.message && (
          <p className="text-sm text-destructive">{errors.message.message}</p>
        )}
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full font-semibold"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Enviando...
          </>
        ) : (
          siteConfig.leadForm.submitText
        )}
      </Button>
    </form>
  );
}
