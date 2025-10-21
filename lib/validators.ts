import { z } from "zod";

// Validação personalizada de WhatsApp
// Aceita números nacionais e internacionais de qualquer país
const validateWhatsApp = (phone: string): boolean => {
  const digitsOnly = phone.replace(/\D/g, ""); // Remove tudo que não é dígito

  // Aceita formatos:
  // - Nacional (Brasil): 10-11 dígitos (ex: 11987654321)
  // - Internacional: 7-15 dígitos (padrão E.164 permite até 15)
  //   - +1 (EUA/Canadá): 11 dígitos (1 + 10)
  //   - +44 (UK): 12-13 dígitos (44 + 10-11)
  //   - +55 (Brasil): 12-13 dígitos (55 + 10-11)
  //   - +351 (Portugal): 12 dígitos (351 + 9)
  //   - +34 (Espanha): 11 dígitos (34 + 9)
  //   - etc.
  return /^[0-9]{7,15}$/.test(digitsOnly);
};

export const leadFormSchema = z.object({
  name: z
    .string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(100, "Nome muito longo"),
  email: z
    .string()
    .email("E-mail inválido")
    .min(1, "E-mail é obrigatório para garantir que não perderemos nosso contato com você 😉"),
  phone: z
    .string()
    .min(1, "Por favor, forneça seu número de WhatsApp")
    .refine(validateWhatsApp, {
      message: "WhatsApp inválido. Digite com código do país: +55 11 98765-4321",
    }),
  message: z
    .string()
    .max(1000, "Mensagem muito longa")
    .optional(),
});

export type LeadFormData = z.infer<typeof leadFormSchema>;

// Função auxiliar para normalizar WhatsApp (remove caracteres especiais)
// IMPORTANTE: Mantém o número COMPLETO, incluindo código do país se houver
export const normalizeWhatsApp = (phone: string): string => {
  const digits = phone.replace(/\D/g, "");

  // Retorna apenas os dígitos, mantendo código do país
  // Isso permite armazenar números internacionais completos
  return digits;
};
