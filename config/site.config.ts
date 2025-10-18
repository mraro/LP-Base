export const siteConfig = {
  name: "3S Cars",
  description: "Transforme sua paixão por carros em R$10 mil por mês com estética automotiva",
  url: "https://3scars.com.br",

  // Customização visual
  theme: {
    primaryColor: "#ea580c", // Orange-600
    secondaryColor: "#f97316", // Orange-500
    fontFamily: "Inter",
  },

  // Conteúdo da LP
  hero: {
    title: "Transforme Seu Negócio",
    subtitle: "Soluções personalizadas que geram resultados reais para sua empresa",
    ctaText: "Fale Conosco Agora",
    ctaSubtext: "Consulta gratuita",
  },

  features: [
    {
      title: "Resultados Comprovados",
      description: "Mais de 500 clientes satisfeitos com crescimento de até 300%",
      icon: "chart",
    },
    {
      title: "Suporte Completo",
      description: "Equipe dedicada disponível 24/7 para tirar suas dúvidas",
      icon: "headset",
    },
    {
      title: "Tecnologia de Ponta",
      description: "Utilizamos as melhores ferramentas do mercado",
      icon: "rocket",
    },
  ],

  // Formulário de leads
  leadForm: {
    title: "Fale com um Especialista",
    subtitle: "Preencha o formulário e entraremos em contato em até 24h",
    fields: {
      name: {
        label: "Nome Completo",
        placeholder: "Digite seu nome completo",
        required: true,
      },
      email: {
        label: "E-mail",
        placeholder: "seu@email.com",
        required: true,
      },
      phone: {
        label: "Telefone",
        placeholder: "(51) 99999-9999",
        required: true,
      },
      message: {
        label: "Mensagem",
        placeholder: "Conte-nos um pouco sobre seu negócio...",
        required: false,
      },
    },
    submitText: "Enviar Mensagem",
    successMessage: "Mensagem enviada com sucesso! Entraremos em contato em breve.",
    errorMessage: "Erro ao enviar mensagem. Tente novamente.",
  },

  // Contato
  contact: {
    email: "3scarsscs@gmail.com",
    phone: "(51) 99853-5411",
    whatsapp: "5551998535411",
    address: "Santa Cruz do Sul - RS",
  },

  // Social Media
  social: {
    instagram: "https://instagram.com/3scars_scs",
    facebook: "https://facebook.com/3scarsscs",
    linkedin: "",
  },
}

export type SiteConfig = typeof siteConfig
