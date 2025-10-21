"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import {
  Loader2,
  ArrowRight,
  Zap,
  Send,
} from "lucide-react";
import { motion } from "framer-motion";
import { leadFormSchema, type LeadFormData } from "@/lib/validators";

type CourseLeadFormData = LeadFormData;

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

export default function CourseLeadForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<CourseLeadFormData>({
    resolver: zodResolver(leadFormSchema),
  });

  // Aplicar máscara ao digitar
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatWhatsApp(e.target.value);
    setValue("phone", formatted);
  };

  const onSubmit = async (data: CourseLeadFormData) => {
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
          message: "Lead capturado da lp",
          source: utmSource || "organico",
          medium: utmMedium,
          campaign: utmCampaign,
          fbclid,
          gclid,
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
            content_name: "Curso Detalhamento - Lead Form",
            content_category: "Education",
            value: 0,
            currency: "BRL",
          });
        }

        // Google Analytics
        if ((window as any).gtag) {
          (window as any).gtag("event", "generate_lead", {
            event_category: "curso",
            event_label: "Course Lead Form",
            value: 1,
          });
        }
      }

      // Reset form and redirect to thank you page
      reset();
      router.push("/ty");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Erro ao enviar",
        description: error instanceof Error
          ? error.message
          : "Ocorreu um erro ao processar sua inscrição. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-5">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >
          {/* Name Field */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-semibold text-gray-700">
              Nome Completo <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Digite seu nome completo"
              {...register("name")}
              className={`h-12 border-2 transition-all ${
                errors.name
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-200 focus:border-orange-500"
              }`}
              disabled={isSubmitting}
            />
            {errors.name && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-red-500"
              >
                {errors.name.message}
              </motion.p>
            )}
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
              Email <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              {...register("email")}
              className={`h-12 border-2 transition-all ${
                errors.email
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-200 focus:border-orange-500"
              }`}
              disabled={isSubmitting}
            />
            {errors.email && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-red-500"
              >
                {errors.email.message}
              </motion.p>
            )}
          </div>

          {/* Phone Field */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-semibold text-gray-700">
              WhatsApp <span className="text-red-500">*</span>
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="(51) 99999-9999"
              {...register("phone")}
              onChange={handlePhoneChange}
              className={`h-12 border-2 transition-all ${
                errors.phone
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-200 focus:border-orange-500"
              }`}
              disabled={isSubmitting}
            />
            {errors.phone && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-red-500"
              >
                {errors.phone.message}
              </motion.p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            size="lg"
            className="group relative h-12 w-full overflow-hidden bg-gradient-to-r from-orange-600 to-orange-700 text-base font-bold text-white shadow-2xl transition-all hover:scale-[1.02] hover:from-orange-700 hover:to-orange-800 hover:shadow-orange-500/50 disabled:opacity-50 disabled:hover:scale-100 md:h-14 md:text-lg"
            disabled={isSubmitting}
            style={{
              boxShadow: "0 10px 40px -10px rgba(249, 115, 22, 0.6), 0 0 20px rgba(251, 146, 60, 0.4)",
            }}
          >
            {/* Glow effect on hover */}
            <span className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-30" />

            {/* Shine effect */}
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

            {/* Button content */}
            <span className="relative flex items-center justify-center">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin md:h-5 md:w-5" />
                  Processando...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                  Garantir Minha Vaga Agora
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 md:h-5 md:w-5" />
                </>
              )}
            </span>
          </Button>

          {/* Additional CTA */}
          <motion.div
            className="flex items-center justify-center gap-1 text-center text-[10px] text-gray-500 md:text-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Zap className="h-2.5 w-2.5 text-yellow-500 md:h-3 md:w-3" />
            <span>Inscreva-se agora e receba acesso imediato</span>
          </motion.div>
      </form>
    </div>
  );
}
