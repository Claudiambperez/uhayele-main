"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { AlertCircle, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Import from types
import { LoginCredentials } from "@/app/types";

const loginSchema = z.object({
  email: z.string().email("Introduza um email válido."),
  password: z.string().min(1, "A senha é obrigatória."),
});

export default function LoginForm() {
  const form = useForm<LoginCredentials>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const onSubmit = async (data: LoginCredentials) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 800)); // simulate loading

      console.log("✅ Login data:", data);

      // TODO: Later connect to real backend
      // For now, go to role selection
      window.location.href = "/onboarding/role";

    } catch (error) {
      console.error("Login failed:", error);
      alert("Erro ao fazer login. Tente novamente.");
    }
  };

  return (
    <div className="w-full max-w-md rounded-none bg-white p-8 md:p-10 shadow-input md:rounded-2xl dark:bg-black">
      <h2 className="text-2xl  normal-case font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
        Entre na sua conta
      </h2>
      <p className="mt-2 text-sm italic text-neutral-600 dark:text-neutral-400">
        Insira seu email e senha para acessar sua conta na Uhayele
      </p>

      <TooltipProvider delayDuration={150}>
        <form className="my-8" onSubmit={form.handleSubmit(onSubmit)}>
          
          {/* Email */}
          <LabelInputContainer className="mb-6">
            <div className="flex items-center justify-between">
              <Label htmlFor="email">Email</Label>
              <FieldError message={form.formState.errors.email?.message} />
            </div>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 h-5 w-5" />
              <Input
                id="email"
                type="email"
                placeholder="danielgallego@yahoo.com"
                className="pl-11"
                {...form.register("email")}
              />
            </div>
          </LabelInputContainer>

          {/* Password */}
          <LabelInputContainer className="mb-8">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Senha</Label>
              <FieldError message={form.formState.errors.password?.message} />
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 h-5 w-5" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="pl-11 pr-11"
                {...form.register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </LabelInputContainer>

          {/* Remember Me + Forgot Password */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 accent-black dark:accent-white"
              />
              <Label htmlFor="remember" className="text-sm text-neutral-600 dark:text-neutral-400 cursor-pointer">
                Lembra-me
              </Label>
            </div>

            <Link href="/forgot-password" className="text-sm text-neutral-600 italic underline hover:text-neutral-900 dark:text-neutral-400">
              Esqueceu a senha?
            </Link>
          </div>

          <button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="group/btn relative block h-11 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] hover:brightness-110"
          >
            Entrar
            <BottomGradient />
          </button>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
            <span className="text-sm text-neutral-500">ou</span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
          </div>

          <div className="text-center">
            <p className="text-sm text-neutral-600 italic dark:text-neutral-400">
              Não tem uma conta?{" "}
              <Link href="/signup" className="font-medium text-black underline hover:text-neutral-700 dark:text-white">
                Criar conta
              </Link>
            </p>
          </div>
        </form>
      </TooltipProvider>
    </div>
  );
}

/* Reusable Components (kept the same) */
const BottomGradient = () => (
  <>
    <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
    <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
  </>
);

const LabelInputContainer = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn("flex w-full flex-col space-y-2", className)}>
    {children}
  </div>
);

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button type="button" className="text-red-500">
          <AlertCircle className="h-4 w-4" />
        </button>
      </TooltipTrigger>
      <TooltipContent side="top" align="end" className="max-w-[260px] bg-black text-white">
        {message}
      </TooltipContent>
    </Tooltip>
  );
}