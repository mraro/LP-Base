"use client";

import { motion } from "framer-motion";
import CourseLeadForm from "./course-lead-form";
import Image from "next/image";
import {
  GraduationCap,
  Sparkles,
  Target,
  TrendingUp,
  DollarSign,
  MapPin,
  Award,
  Flame,
} from "lucide-react";

export default function CourseCapturePage() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-gray-900">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0 h-full w-full bg-gray-900" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
        <Image
          src="/images/car-detailing-hero.png"
          alt="Carro com pintura impecável"
          fill
          className="object-cover object-center"
          priority
          quality={75}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwABmQ/9k="
          sizes="100vw"
        />
        {/* Gradient Overlay - darker on the left for better form contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/80 md:bg-gradient-to-r md:from-black/85 md:via-black/70 md:to-black/80" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 min-h-screen py-8 md:py-0">
        <div className="container mx-auto h-full px-4 md:px-6 lg:px-8">
          <div className="flex h-full min-h-screen flex-col items-center justify-center gap-8 md:flex-row md:justify-center md:gap-6 lg:gap-8 xl:gap-10 2xl:gap-12">
            {/* Left Side - Form */}
            <motion.div
              className="w-full md:w-auto md:max-w-md lg:max-w-lg"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            >
              <motion.div
                className="group relative rounded-2xl border border-white/10 bg-white p-6 shadow-2xl transition-all duration-300 hover:shadow-orange-500/20 md:bg-white/95 md:backdrop-blur-md md:p-8"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                {/* Glossy shine effect overlay */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-400/5 via-transparent to-amber-400/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Subtle border glow on hover */}
                <div className="pointer-events-none absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-orange-400/20 via-amber-400/20 to-yellow-400/20 opacity-0 blur-sm transition-opacity duration-500 group-hover:opacity-100" />

                {/* Form Header */}
                <div className="relative z-10 mb-5 text-center md:mb-6">
                  <motion.div
                    className="mb-2 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-600 to-orange-700 px-3 py-1 shadow-lg shadow-orange-500/30 md:px-4"
                    animate={{
                      filter: [
                        "drop-shadow(0 4px 20px rgba(249, 115, 22, 0.3))",
                        "drop-shadow(0 4px 30px rgba(249, 115, 22, 0.5))",
                        "drop-shadow(0 4px 20px rgba(249, 115, 22, 0.3))",
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Flame className="h-3.5 w-3.5 text-white md:h-4 md:w-4" />
                    <span className="text-xs font-bold uppercase tracking-wide text-white md:text-sm">
                      Vagas Limitadas
                    </span>
                  </motion.div>
                  <h3 className="mb-2 text-xl font-black text-gray-900 md:text-2xl">
                    Sua Jornada Começa Agora
                  </h3>
                  <p className="text-xs text-gray-600 md:text-sm">
                    Inscreva-se e descubra como faturar R$10k/mês com estética automotiva
                  </p>
                </div>

                {/* Form */}
                <CourseLeadForm />

                {/* Privacy Note */}
                <div className="relative z-10 mt-3 flex items-center justify-center gap-1 text-[10px] text-gray-500 md:mt-4 md:text-xs">
                  <svg
                    className="h-2.5 w-2.5 md:h-3 md:w-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  <span>Seus dados estão seguros e não serão compartilhados</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Side - Copy */}
            <motion.div
              className="w-full flex-1 text-white md:max-w-3xl"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Logo */}
              <motion.div
                className="mb-8 md:mb-12"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <div className="flex items-center justify-center gap-4 md:justify-start">
                  <motion.div
                    className="relative h-16 w-16 md:h-20 md:w-20"
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image
                      src="/images/logo.jpg"
                      alt="3S Cars Logo"
                      fill
                      sizes="(max-width: 768px) 64px, 80px"
                      className="rounded-full object-cover shadow-2xl shadow-orange-500/30 ring-2 ring-orange-500/20"
                      priority
                    />
                  </motion.div>
                  <div>
                    <h1 className="text-lg font-bold tracking-tight md:text-xl">
                      3S CARS
                    </h1>
                    <p className="text-xs text-orange-400 md:text-sm">
                      Estética Automotiva
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Main Headline */}
              <motion.div
                className="space-y-4 text-center md:space-y-6 md:text-left"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 rounded-full bg-orange-600/30 px-3 py-1.5 backdrop-blur-sm md:px-4 md:py-2">
                  <GraduationCap className="h-3 w-3 text-orange-300 md:h-4 md:w-4" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-orange-300 md:text-sm">
                    Curso Online Exclusivo
                  </span>
                </div>

                <h2 className="text-3xl font-black leading-tight sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                  Transforme Sua Paixão por Carros em{" "}
                  <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                    R$10 Mil por Mês
                  </span>
                </h2>

                <p className="text-base leading-relaxed text-gray-300 sm:text-lg md:text-xl lg:text-2xl">
                  Você vai descobrir{" "}
                  <span className="font-bold text-orange-400">
                    exatamente como começar do zero
                  </span>
                  {" "}na estética automotiva — mesmo sem experiência.
                  <br />
                  O{" "}
                  <span className="font-bold text-orange-400">
                    Método 3S CARS
                  </span>{" "}
                  é direto, prático e feito para quem quer{" "}
                  <span className="font-bold text-orange-400">
                    resultados reais
                  </span>.
                </p>

                {/* Value Propositions */}
                <div className="space-y-3 pt-4 md:space-y-4 md:pt-6">
                  {[
                    {
                      icon: Sparkles,
                      text: "A mentalidade que levou a 3S Cars ao sucesso (história real)",
                    },
                    {
                      icon: Target,
                      text: "Como se destacar e não competir por preço",
                    },
                    {
                      icon: TrendingUp,
                      text: "Quais serviços oferecer e quanto cobrar (sem erros)",
                    },
                    {
                      icon: DollarSign,
                      text: "Estratégias para conquistar os primeiros clientes pagantes",
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
                    >
                      <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-orange-500/20 md:h-8 md:w-8">
                        <item.icon className="h-4 w-4 text-orange-400 md:h-5 md:w-5" />
                      </div>
                      <p className="text-sm text-gray-200 sm:text-base md:text-lg">{item.text}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Trust Badge */}
                <motion.div
                  className="mt-6 inline-flex items-center gap-2 rounded-lg border border-orange-500/30 bg-orange-600/10 px-3 py-2 backdrop-blur-sm md:mt-8 md:gap-3 md:px-4 md:py-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 0.6 }}
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500/20 md:h-10 md:w-10">
                    <MapPin className="h-4 w-4 text-orange-300 md:h-5 md:w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-orange-300 md:text-sm">
                      Santa Cruz do Sul - RS
                    </p>
                    <div className="flex items-center gap-1 text-[10px] text-gray-400 md:text-xs">
                      <Award className="h-2.5 w-2.5 md:h-3 md:w-3" />
                      <span>Excelência | Confiança | Qualidade</span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Animated Particles/Shine Effect - Car Detailing Theme */}
      <div className="pointer-events-none absolute inset-0 z-20">
        {/* Orange shine effect - representing polish/wax */}
        <motion.div
          className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl"
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

        {/* Amber/gold shine - representing ceramic coating */}
        <motion.div
          className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl"
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

        {/* Yellow accent - representing premium finish */}
        <motion.div
          className="absolute left-1/2 top-1/2 h-64 w-64 rounded-full bg-yellow-400/5 blur-2xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [-20, 20, -20],
            y: [-20, 20, -20],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Sparkle/shine lines - simulating car paint reflection */}
        <motion.div
          className="absolute right-0 top-0 h-full w-1 bg-gradient-to-b from-transparent via-orange-400/20 to-transparent"
          animate={{
            opacity: [0, 0.6, 0],
            x: [-100, 0, 100],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
            repeatDelay: 2,
          }}
        />

        <motion.div
          className="absolute left-1/4 top-0 h-1 w-full bg-gradient-to-r from-transparent via-amber-400/20 to-transparent"
          animate={{
            opacity: [0, 0.5, 0],
            y: [-50, 0, 50],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
            repeatDelay: 3,
          }}
        />
      </div>
    </div>
  );
}
