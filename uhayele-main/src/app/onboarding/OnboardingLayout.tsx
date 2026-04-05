// components/onboarding/OnboardingLayout.tsx
import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { RiArrowGoBackLine } from "react-icons/ri";
import { Loader2 } from "lucide-react";

type Step = {
  number: number;
  title: string;
};

const steps: Step[] = [
  { number: 1, title: "Escolha de Perfil" },
  { number: 2, title: "Dados Pessoais" },
];

export default function OnboardingLayout({
  children,
  currentStep,
  title,
  subtitle,
  isLoading = false,
}: {
  children: React.ReactNode;
  currentStep: number;
  title: string;
  subtitle?: string;
  isLoading?: boolean;
}) {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-zinc-100 p-6 dark:bg-neutral-950">
      {/* Back Button */}
      <Link
        href="/onboarding/role"
        className="absolute top-8 left-8 z-50 flex items-center gap-2 text-gray-600 transition-colors hover:text-black group dark:text-gray-400 dark:hover:text-white"
      >
        <RiArrowGoBackLine className="text-3xl transition-transform group-hover:-translate-x-1" />
        <span className="hidden text-sm font-medium sm:inline">Voltar</span>
      </Link>

      <div className="w-full max-w-2xl">
        {/* Progress Steps */}
        <div className="mb-10 flex justify-center">
          <div className="flex gap-8">
            {steps.map((step) => (
              <div key={step.number} className="flex flex-col items-center">
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-all",
                    "bg-[linear-gradient(180deg,rgba(255,255,255,0.6),transparent_60%)] text-neutral-700 ring-4 ring-neutral-300"
                  )}
                >
                  {step.number}
                </div>
                <p className="mt-2 max-w-[100px] text-center italic text-xs normal-case text-neutral-500 dark:text-neutral-400">
                  {step.title}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Card */}
        <div className="relative rounded-3xl bg-white p-10 shadow-xl md:p-12 dark:bg-neutral-900">
          <div className="mb-10 text-center">
            <h1 className="text-2xl font-bold normal-case text-neutral-900 dark:text-white">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-3 text-xs italic normal-case text-neutral-600 dark:text-neutral-400">
                {subtitle}
              </p>
            )}
          </div>

          {children}

          {isLoading && (
            <div className="absolute inset-0 z-20 flex items-center justify-center rounded-3xl bg-white/90 backdrop-blur-sm dark:bg-neutral-900/90">
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="h-8 w-8 animate-spin text-neutral-600 dark:text-neutral-400" />
                <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                  A preparar a sua experiência...
                </p>
              </div>
            </div>
          )}
        </div>

    
      </div>
    </div>
  );
}