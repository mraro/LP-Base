"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { leadFormSchema, type LeadFormData } from "@/lib/validators";
import { siteConfig } from "@/config/site.config";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Função para aplicar máscara de WhatsApp (internacional - qualquer país)
const formatWhatsApp = (value: string): string => {
  // Remove tudo que não é dígito
  let digits = value.replace(/\D/g, "");

  // Limita a 15 dígitos (padrão E.164)
  digits = digits.slice(0, 15);

  // Detecta formato brasileiro (55 + 10-11 dígitos OU sem código + 10-11 dígitos)
  const isBrazilWithCode = digits.startsWith("55") && digits.length >= 12 && digits.length <= 13;
  const isBrazilNational = !digits.startsWith("55") && digits.length >= 10 && digits.length <= 11;

  // Formato brasileiro com código do país (+55)
  if (isBrazilWithCode) {
    const countryCode = digits.slice(0, 2); // 55
    const ddd = digits.slice(2, 4); // DDD (2 dígitos)
    const restDigits = digits.slice(4);

    if (digits.length <= 4) {
      return `+${countryCode} ${ddd}`;
    } else if (digits.length <= 9) {
      return `+${countryCode} (${ddd}) ${restDigits}`;
    } else {
      const isCellphone = digits.length === 13; // 13 dígitos = celular com 9
      const firstPart = isCellphone ? restDigits.slice(0, 5) : restDigits.slice(0, 4);
      const secondPart = isCellphone ? restDigits.slice(5, 9) : restDigits.slice(4, 8);
      return `+${countryCode} (${ddd}) ${firstPart}${secondPart ? `-${secondPart}` : ""}`;
    }
  }

  // Formato brasileiro nacional (sem código do país)
  if (isBrazilNational) {
    if (digits.length <= 2) {
      return digits;
    } else if (digits.length <= 7) {
      return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    } else {
      const ddd = digits.slice(0, 2);
      const firstPart = digits.length === 11 ? digits.slice(2, 7) : digits.slice(2, 6);
      const secondPart = digits.length === 11 ? digits.slice(7, 11) : digits.slice(6, 10);
      return `(${ddd}) ${firstPart}${secondPart ? `-${secondPart}` : ""}`;
    }
  }

  // Formato internacional genérico (outros países)
  // Formato: +XX XXX XXX XXXX (divide em grupos)
  if (digits.length >= 7) {
    // Detecta tamanho do código do país (1-3 dígitos)
    let countryCodeLength = 1;
    if (digits.startsWith("1")) countryCodeLength = 1; // EUA/Canadá
    else if (digits.startsWith("44")) countryCodeLength = 2; // UK
    else if (digits.startsWith("351") || digits.startsWith("352")) countryCodeLength = 3; // Portugal, Luxembourg
    else if (parseInt(digits.slice(0, 2)) >= 30 && parseInt(digits.slice(0, 2)) <= 49) countryCodeLength = 2; // Europa (maioria)
    else if (parseInt(digits.slice(0, 3)) >= 200) countryCodeLength = 3; // Códigos de 3 dígitos

    const countryCode = digits.slice(0, countryCodeLength);
    const number = digits.slice(countryCodeLength);

    // Formata: +CC XXX XXX XXXX
    if (number.length <= 3) {
      return `+${countryCode} ${number}`;
    } else if (number.length <= 6) {
      return `+${countryCode} ${number.slice(0, 3)} ${number.slice(3)}`;
    } else if (number.length <= 10) {
      return `+${countryCode} ${number.slice(0, 3)} ${number.slice(3, 6)} ${number.slice(6)}`;
    } else {
      return `+${countryCode} ${number.slice(0, 3)} ${number.slice(3, 6)} ${number.slice(6, 10)}`;
    }
  }

  // Números muito curtos (menos de 7 dígitos) - retorna sem formatação
  return digits;
};

export default function LeadForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadFormSchema),
  });

  // Aplicar máscara ao digitar
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatWhatsApp(e.target.value);
    setValue("phone", formatted);
  };

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

      // Get Facebook cookies for CAPI matching
      const getFacebookCookies = () => {
        const cookies = document.cookie.split("; ").reduce((acc, cookie) => {
          const [key, value] = cookie.split("=");
          acc[key] = value;
          return acc;
        }, {} as Record<string, string>);

        return {
          fbc: cookies._fbc,
          fbp: cookies._fbp,
        };
      };

      const fbCookies = getFacebookCookies();

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
          // Facebook cookies para CAPI
          fbc: fbCookies.fbc,
          fbp: fbCookies.fbp,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        // Exibir mensagem específica do servidor (duplicatas, validação, etc.)
        throw new Error(result.message || "Erro ao enviar formulário");
      }

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

      // Mostrar mensagem de sucesso (não resetar formulário)
      setShowSuccess(true);
      // reset(); // Removido - causava o formulário voltar
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Erro",
        description: error instanceof Error ? error.message : siteConfig.leadForm.errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Se já enviou com sucesso, mostra mensagem de agradecimento
  if (showSuccess) {
    return (
      <div className="space-y-6 text-center py-8">
        <div className="space-y-4">
          <h3 className="text-3xl font-bold">Obrigado! 🎉</h3>
          <p className="text-xl text-muted-foreground">
            Nos vemos em breve
          </p>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            Entre agora no nosso grupo exclusivo do WhatsApp para receber as aulas gratuitas
            e ficar por dentro de tudo sobre o lançamento!
          </p>
        </div>

        <a
          href="https://chat.whatsapp.com/FaSn3EatHJyGXndgeLWK0s?mode=wwt"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            size="lg"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold text-base h-14 px-8"
          >
            <svg
              className="mr-2 h-5 w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            ENTRAR NO GRUPO DO WHATSAPP
          </Button>
        </a>
      </div>
    );
  }

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
          onChange={handlePhoneChange}
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
