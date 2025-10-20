"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import {
  Loader2,
  CheckCircle2,
  ArrowRight,
  Zap,
  Send,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Form validation schema
const courseLeadSchema = z.object({
  name: z
    .string()
    .min(3, "Nome deve ter pelo menos 3 caracteres")
    .max(100, "Nome muito longo"),
  email: z.string().email("Email inválido"),
  phone: z
    .string()
    .min(10, "Telefone deve ter pelo menos 10 dígitos")
    .max(15, "Telefone inválido")
    .regex(
      /^[\d\s\-\(\)\+]+$/,
      "Telefone deve conter apenas números e caracteres válidos"
    ),
});

type CourseLeadFormData = z.infer<typeof courseLeadSchema>;

export default function CourseLeadForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CourseLeadFormData>({
    resolver: zodResolver(courseLeadSchema),
  });

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

      if (!response.ok) {
        throw new Error("Erro ao enviar formulário");
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

      setIsSuccess(true);
      reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Erro ao enviar",
        description:
          "Ocorreu um erro ao processar sua inscrição. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-5">
      <AnimatePresence mode="wait">
        {isSuccess ? (
          <motion.div
            key="success"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="py-8 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 mx-auto"
            >
              <CheckCircle2 className="h-10 w-10 text-green-600" />
            </motion.div>
            <h4 className="mt-4 text-xl font-bold text-gray-900">
              Inscrição Confirmada!
            </h4>
            <p className="mt-2 text-sm text-gray-600">
              Em breve entraremos em contato com você.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
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
        </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
