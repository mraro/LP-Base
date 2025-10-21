"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  CheckCircle2,
  Gift,
  MessageCircle,
  ArrowRight,
  Sparkles,
  Trophy,
  Zap,
  Rocket,
  Target,
  FileSpreadsheet,
  Camera,
  Users,
  Star,
} from "lucide-react";

export default function CourseThankyouPage() {
  const whatsappNumber = "5551998535411";
  const whatsappMessage = encodeURIComponent(
    "Olá! Acabei de adquirir o curso e gostaria de mais informações sobre o acesso."
  );
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  // Animação de partículas celebrativas com estrelas (saindo de baixo)
  const particleVariants = {
    hidden: { opacity: 0, scale: 0, y: 0 },
    visible: (i: number) => ({
      opacity: [0, 1, 0.8, 0],
      scale: [0, 1.5, 1, 0],
      y: [0, -250, -450, -600],
      x: [0, (i % 2 === 0 ? 1 : -1) * (200 + Math.random() * 400)],
      rotate: [0, (i % 2 === 0 ? 360 : -360)],
      transition: {
        duration: 2.5,
        delay: i * 0.1,
        ease: [0.23, 1, 0.32, 1],
      },
    }),
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Celebration Particles - Sparkles (saindo de baixo) */}
      <div className="pointer-events-none absolute inset-0 z-0 flex items-end justify-center">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={particleVariants}
            className="absolute bottom-0"
            style={{ left: `${20 + (i * 5)}%` }}
          >
            <Sparkles
              className="h-8 w-8"
              style={{
                color: [
                  "#f97316",
                  "#fbbf24",
                  "#34d399",
                  "#fb923c",
                  "#fdba74",
                ][i % 5],
                filter: "drop-shadow(0 0 8px currentColor)",
              }}
            />
          </motion.div>
        ))}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            custom={i + 12}
            initial="hidden"
            animate="visible"
            variants={particleVariants}
            className="absolute bottom-0"
            style={{ left: `${25 + (i * 6.5)}%` }}
          >
            <Star
              className="h-6 w-6"
              fill="currentColor"
              style={{
                color: ["#fbbf24", "#34d399", "#fb923c"][i % 3],
                filter: "drop-shadow(0 0 6px currentColor)",
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Animated Background Effects */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-orange-500/20 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-amber-500/20 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-4 py-8 md:px-6">
        <motion.div
          className="mx-auto max-w-4xl rounded-2xl border border-orange-500/30 bg-white/5 p-8 backdrop-blur-md md:p-12"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Celebration Header */}
          <div className="mb-8 text-center">
            {/* Trophy Icon with Pulse */}
            <motion.div
              className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-amber-500 shadow-2xl shadow-orange-500/50"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.2,
              }}
            >
              <Trophy className="h-10 w-10 text-white" />
            </motion.div>

            {/* Success Message with Stagger */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <motion.div
                className="mb-3 inline-flex items-center gap-2 rounded-full bg-green-600/20 px-4 py-2"
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(34, 197, 94, 0.3)",
                    "0 0 30px rgba(34, 197, 94, 0.5)",
                    "0 0 20px rgba(34, 197, 94, 0.3)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <CheckCircle2 className="h-5 w-5 text-green-400" />
                <span className="text-sm font-bold uppercase tracking-wider text-green-400">
                  Você conseguiu!
                </span>
                <Sparkles className="h-4 w-4 text-green-400" />
              </motion.div>

              <motion.h1
                className="mb-2 text-3xl font-black text-white md:text-5xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                Bem-vindo à família{" "}
                <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-orange-600 bg-clip-text text-transparent">
                  3SCAR
                </span>
              </motion.h1>

              <motion.p
                className="mx-auto max-w-2xl text-base text-gray-300 md:text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                Este é o início da sua transformação. Vamos caminhar juntos até você
                faturar seus primeiros{" "}
                <span className="font-bold text-orange-400">R$10 mil por mês</span>!
              </motion.p>
            </motion.div>

            {/* Logo */}
            <motion.div
              className="relative mx-auto mt-6 h-16 w-16 md:h-20 md:w-20"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 1,
                type: "spring",
                stiffness: 200,
              }}
            >
              <Image
                src="/images/logo.jpg"
                alt="3S Cars Logo"
                fill
                sizes="(max-width: 768px) 64px, 80px"
                className="rounded-full object-cover shadow-xl shadow-orange-500/30 ring-2 ring-orange-500/20"
                priority
              />
            </motion.div>
          </div>

          {/* Single Column Layout */}
          <div className="grid gap-6">
            {/* Left: Next Steps */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-orange-400" />
                <h3 className="text-lg font-bold text-white">
                  Vamos começar agora!
                </h3>
              </div>

              <div className="space-y-3 text-sm text-gray-300">
                <motion.div
                  className="rounded-lg bg-white/5 p-4 transition-all hover:bg-white/10"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.4, duration: 0.5 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                >
                  <div className="mb-2 flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-500/20 text-xs font-bold text-orange-400">
                      1
                    </div>
                    <p className="font-bold text-white">Abra seu e-mail agora</p>
                  </div>
                  <p className="pl-8 text-xs leading-relaxed">
                    Enviamos o link mágico de acesso! Se não aparecer, dá uma olhadinha
                    no spam (às vezes ele se esconde lá)
                  </p>
                </motion.div>

                <motion.div
                  className="rounded-lg bg-white/5 p-4 transition-all hover:bg-white/10"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.6, duration: 0.5 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                >
                  <div className="mb-2 flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-500/20 text-xs font-bold text-orange-400">
                      2
                    </div>
                    <p className="font-bold text-white">Comece pelo Módulo 1</p>
                  </div>
                  <p className="pl-8 text-xs leading-relaxed">
                    É ali que você vai conhecer nossa história real e desenvolver a
                    mentalidade certa para crescer
                  </p>
                </motion.div>

                <motion.div
                  className="rounded-lg bg-white/5 p-4 transition-all hover:bg-white/10"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.8, duration: 0.5 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                >
                  <div className="mb-2 flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-500/20 text-xs font-bold text-orange-400">
                      3
                    </div>
                    <p className="font-bold text-white">Baixe seus presentes</p>
                  </div>
                  <p className="pl-8 text-xs leading-relaxed">
                    A Planilha e o Pack de Fotos vão te ajudar desde o dia 1. Use sem
                    moderação!
                  </p>
                </motion.div>
              </div>
            </motion.div>

            {/* Right: Bonus - COMENTADO */}
            {/* <motion.div
              className="space-y-4"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              <div className="flex items-center gap-2">
                <Gift className="h-5 w-5 text-green-400" />
                <h3 className="text-lg font-bold text-white">
                  Seus presentes especiais
                </h3>
              </div>

              <div className="space-y-3">
                <motion.div
                  className="rounded-lg bg-gradient-to-br from-green-600/10 to-emerald-600/10 p-4 transition-all hover:from-green-600/20 hover:to-emerald-600/20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4, duration: 0.5 }}
                  whileHover={{ scale: 1.03, y: -2 }}
                >
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileSpreadsheet className="h-4 w-4 text-green-400" />
                      <p className="text-sm font-bold text-white">
                        Planilha de Precificação
                      </p>
                    </div>
                    <motion.span
                      className="rounded-full bg-green-500/30 px-2 py-0.5 text-xs font-bold text-green-300"
                      animate={{
                        boxShadow: [
                          "0 0 10px rgba(34, 197, 94, 0.3)",
                          "0 0 20px rgba(34, 197, 94, 0.5)",
                          "0 0 10px rgba(34, 197, 94, 0.3)",
                        ],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    >
                      R$97
                    </motion.span>
                  </div>
                  <p className="text-xs leading-relaxed text-gray-300">
                    Nunca mais erre no preço! Calcule seus valores com a margem perfeita
                  </p>
                </motion.div>

                <motion.div
                  className="rounded-lg bg-gradient-to-br from-green-600/10 to-emerald-600/10 p-4 transition-all hover:from-green-600/20 hover:to-emerald-600/20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.6, duration: 0.5 }}
                  whileHover={{ scale: 1.03, y: -2 }}
                >
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Camera className="h-4 w-4 text-green-400" />
                      <p className="text-sm font-bold text-white">
                        Pack de Fotos Profissionais
                      </p>
                    </div>
                    <motion.span
                      className="rounded-full bg-green-500/30 px-2 py-0.5 text-xs font-bold text-green-300"
                      animate={{
                        boxShadow: [
                          "0 0 10px rgba(34, 197, 94, 0.3)",
                          "0 0 20px rgba(34, 197, 94, 0.5)",
                          "0 0 10px rgba(34, 197, 94, 0.3)",
                        ],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: 0.5,
                      }}
                    >
                      R$97
                    </motion.span>
                  </div>
                  <p className="text-xs leading-relaxed text-gray-300">
                    Posts prontos para bombar nas redes! É só postar e começar a atrair
                    clientes
                  </p>
                </motion.div>

                <motion.div
                  className="rounded-lg border-2 border-amber-500/40 bg-gradient-to-br from-amber-600/10 to-orange-600/10 p-4 transition-all hover:border-amber-500/60 hover:from-amber-600/20 hover:to-orange-600/20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.8, duration: 0.5 }}
                  whileHover={{ scale: 1.03, y: -2 }}
                >
                  <div className="mb-2 flex items-center gap-2">
                    <Users className="h-4 w-4 text-amber-400" />
                    <p className="text-sm font-bold text-white">
                      Mentoria com os Fundadores
                    </p>
                    <motion.span
                      className="rounded-full bg-amber-500/40 px-2 py-0.5 text-xs font-bold uppercase text-amber-200"
                      animate={{
                        scale: [1, 1.05, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    >
                      VIP
                    </motion.span>
                  </div>
                  <p className="text-xs leading-relaxed text-amber-100">
                    Bate-papo exclusivo com a gente! Vamos te dar aquele empurrãozinho
                    para você decolar
                  </p>
                </motion.div>
              </div>
            </motion.div> */}
          </div>

          {/* CTA WhatsApp */}
          <motion.div
            className="mt-8 border-t border-white/10 pt-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.6 }}
          >
            <p className="mb-3 text-sm text-gray-300">
              Ficou com alguma dúvida? A gente tá aqui pra te ajudar!
            </p>
            <motion.a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-green-600 to-green-700 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-green-500/30 transition-all hover:shadow-green-500/50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageCircle className="h-5 w-5" />
              <span>Chamar no WhatsApp</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </motion.a>
          </motion.div>

          {/* Motivational Footer */}
          <motion.div
            className="mt-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2, duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-2">
              <Target className="h-4 w-4 text-orange-400" />
              <p className="text-xs italic text-gray-400">
                &ldquo;O segredo é começar. E você acabou de dar o primeiro passo.&rdquo;
              </p>
              <Rocket className="h-4 w-4 text-orange-400" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
