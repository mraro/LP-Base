import { z } from "zod";

export const leadFormSchema = z.object({
  name: z
    .string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(100, "Nome muito longo"),
  email: z
    .string()
    .email("E-mail inválido")
    .min(1, "E-mail é obrigatório"),
  phone: z
    .string()
    .min(10, "Telefone inválido")
    .max(20, "Telefone muito longo")
    .regex(/^[\d\s()+-]+$/, "Telefone deve conter apenas números e símbolos válidos"),
  message: z
    .string()
    .max(1000, "Mensagem muito longa")
    .optional(),
});

export type LeadFormData = z.infer<typeof leadFormSchema>;
