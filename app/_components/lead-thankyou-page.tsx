"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  CheckCircle2,
  MessageCircle,
  ArrowRight,
  Sparkles,
  Instagram,
  Facebook,
  Clock,
  Rocket,
  Star,
  Youtube,
} from "lucide-react";

export default function LeadThankyouPage() {
  const whatsappGroupLink = "https://chat.whatsapp.com/FaSn3EatHJyGXndgeLWK0s";
  const instagramLink = "https://www.instagram.com/3scars_scs/";
  const facebookLink = "https://web.facebook.com/3scarsscs";
  const tiktokLink = "https://tiktok.com/@3scarsscs";
  const youtubeLink = "https://www.youtube.com/@3scars_scs";

  // Animação de partículas celebrativas (reduzida - 10 partículas vs 20)
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
        delay: i * 0.15,
        ease: [0.23, 1, 0.32, 1],
      },
    }),
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Celebration Particles - Reduzidas (5 sparkles + 5 stars) */}
      <div className="pointer-events-none absolute inset-0 z-0 flex items-end justify-center">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={particleVariants}
            className="absolute bottom-0"
            style={{ left: `${25 + (i * 10)}%` }}
          >
            <Sparkles
              className="h-6 w-6"
              style={{
                color: [
                  "#f97316",
                  "#fbbf24",
                  "#34d399",
                  "#fb923c",
                  "#3b82f6",
                ][i % 5],
                filter: "drop-shadow(0 0 6px currentColor)",
              }}
            />
          </motion.div>
        ))}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            custom={i + 5}
            initial="hidden"
            animate="visible"
            variants={particleVariants}
            className="absolute bottom-0"
            style={{ left: `${30 + (i * 10)}%` }}
          >
            <Star
              className="h-5 w-5"
              fill="currentColor"
              style={{
                color: ["#fbbf24", "#34d399", "#3b82f6"][i % 3],
                filter: "drop-shadow(0 0 5px currentColor)",
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
          className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl"
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
          className="mx-auto max-w-3xl rounded-2xl border border-orange-500/30 bg-white/5 p-8 backdrop-blur-md md:p-10"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Header */}
          <div className="mb-8 text-center">
            {/* Checkmark Icon */}
            <motion.div
              className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-green-600 shadow-2xl shadow-green-500/50"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.2,
              }}
            >
              <CheckCircle2 className="h-10 w-10 text-white" />
            </motion.div>

            {/* Success Message */}
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
                  Inscrição Confirmada!
                </span>
                <Sparkles className="h-4 w-4 text-green-400" />
              </motion.div>

              <motion.h1
                className="mb-2 text-3xl font-black text-white md:text-4xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                Obrigado pelo{" "}
                <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-orange-600 bg-clip-text text-transparent">
                  Interesse
                </span>
                !
              </motion.h1>

              <motion.p
                className="mx-auto max-w-2xl text-base text-gray-300 md:text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                Recebemos sua inscrição com sucesso e estamos animados para falar
                com você!
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

          {/* Next Steps */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <div className="flex items-center gap-2">
              <Rocket className="h-5 w-5 text-orange-400" />
              <h3 className="text-lg font-bold text-white">
                O que acontece agora?
              </h3>
            </div>

            <div className="space-y-3 text-sm text-gray-300">
              <motion.div
                className="rounded-lg bg-gradient-to-br from-green-600/10 to-green-700/10 p-4 transition-all hover:from-green-600/20 hover:to-green-700/20"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4, duration: 0.5 }}
                whileHover={{ scale: 1.02, x: 5 }}
              >
                <div className="mb-2 flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500/20 text-xs font-bold text-green-400">
                    1
                  </div>
                  <p className="font-bold text-white">Entre no grupo do WhatsApp</p>
                </div>
                <p className="pl-8 text-xs leading-relaxed">
                  Junte-se à nossa comunidade exclusiva! Receba dicas, tire dúvidas e
                  fique por dentro de todas as novidades
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
                  <p className="font-bold text-white">Acompanhe nosso trabalho</p>
                </div>
                <p className="pl-8 text-xs leading-relaxed mb-3">
                  Veja os resultados reais dos nossos alunos e inspire-se!
                </p>
                <div className="pl-8 flex flex-wrap gap-2">
                  <a
                    href={instagramLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-pink-600 to-purple-600 px-3 py-1.5 text-xs font-medium text-white transition-all hover:from-pink-700 hover:to-purple-700"
                  >
                    <Instagram className="h-3.5 w-3.5" />
                    Instagram
                  </a>
                  <a
                    href={facebookLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-3 py-1.5 text-xs font-medium text-white transition-all hover:from-blue-700 hover:to-blue-800"
                  >
                    <Facebook className="h-3.5 w-3.5" />
                    Facebook
                  </a>
                  <a
                    href={tiktokLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-gray-900 to-black px-3 py-1.5 text-xs font-medium text-white transition-all hover:from-gray-800 hover:to-gray-900"
                  >
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                    </svg>
                    TikTok
                  </a>
                  <a
                    href={youtubeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-red-600 to-red-700 px-3 py-1.5 text-xs font-medium text-white transition-all hover:from-red-700 hover:to-red-800"
                  >
                    <Youtube className="h-3.5 w-3.5" />
                    YouTube
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* CTA WhatsApp Group */}
          <motion.div
            className="mt-8 border-t border-white/10 pt-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.6 }}
          >
            <motion.a
              href={whatsappGroupLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-green-600 to-green-700 px-8 py-4 text-base font-bold text-white shadow-lg shadow-green-500/30 transition-all hover:shadow-green-500/50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageCircle className="h-6 w-6" />
              <span>Entrar no Grupo Agora</span>
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </motion.a>
          </motion.div>

          {/* Footer */}
          <motion.div
            className="mt-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2, duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-2">
              <Clock className="h-4 w-4 text-orange-400" />
              <p className="text-xs italic text-gray-400">
                Estamos ansiosos para ter você em nosso time! 🚀
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
