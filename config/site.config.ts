export const siteConfig = {
  name: "Sua Empresa",
  description: "Transforme seu negócio com nossas soluções",
  url: "https://seusite.com.br",

  // Customização visual
  theme: {
    primaryColor: "#0066FF",
    secondaryColor: "#FF6B00",
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
        placeholder: "João Silva",
        required: true,
      },
      email: {
        label: "E-mail",
        placeholder: "joao@exemplo.com",
        required: true,
      },
      phone: {
        label: "Telefone",
        placeholder: "(11) 99999-9999",
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
    email: "contato@suaempresa.com",
    phone: "(11) 99999-9999",
    whatsapp: "5511999999999",
    address: "São Paulo, SP",
  },

  // Social Media
  social: {
    instagram: "https://instagram.com/suaempresa",
    facebook: "https://facebook.com/suaempresa",
    linkedin: "https://linkedin.com/company/suaempresa",
  },
}

export type SiteConfig = typeof siteConfig
