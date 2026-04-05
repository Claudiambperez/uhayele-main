"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { AlertCircle, User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SignUpFormData } from "@/app/types";



// Updated schema with firstName and lastName
const formSchema = z
  .object({
    firstName: z.string().min(2, "O primeiro nome deve ter pelo menos 2 caracteres."),
    lastName: z.string().min(2, "O apelido deve ter pelo menos 2 caracteres."),
    email: z.string().email("Introduza um email válido."),
    password: z.string().superRefine((value, ctx) => {
      const missing: string[] = [];
      if (value.length < 8) missing.push("mínimo de 8 caracteres");
      if (!/[A-Z]/.test(value)) missing.push("uma letra maiúscula");
      if (!/[a-z]/.test(value)) missing.push("uma letra minúscula");
      if (!/[0-9]/.test(value)) missing.push("um número");
      if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value))
        missing.push("um símbolo especial");

      if (missing.length > 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `A senha deve conter ${missing.join(", ")}.`,
        });
      }
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem.",
    path: ["confirmPassword"],
  });

export default function SignUpForm() {
  const form = useForm<SignUpFormData>({
    resolver: zodResolver(formSchema),
    mode: "onTouched",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = (data: SignUpFormData) => {
    console.log("✅ SignUp data:", data);
    // Later when connecting to backend, we can combine them if needed
  };

  return (
    <div className="w-full max-w-md rounded-none bg-white p-8 md:p-10 shadow-input md:rounded-2xl dark:bg-black">
      <h2 className="normal-case text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
        Criar Conta
      </h2>
      <p className="mt-2 text-sm text-neutral-600 italic dark:text-neutral-400">
        Preencha os dados abaixo para criar sua conta na Uhayele
      </p>

      <TooltipProvider delayDuration={150}>
        <form className="my-8" onSubmit={form.handleSubmit(onSubmit)}>
          
          {/* First Name + Last Name - Side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <LabelInputContainer>
              <div className="flex items-center justify-between">
                <Label htmlFor="firstName">Primeiro Nome</Label>
                <FieldError message={form.formState.errors.firstName?.message} />
              </div>
              <div className="relative">
         
                <Input
                  id="firstName"
                  type="text"
                  placeholder="Daniel"
                  className="pl-11"
                  {...form.register("firstName")}
                />
              </div>
            </LabelInputContainer>

            <LabelInputContainer>
              <div className="flex items-center justify-between">
                <Label htmlFor="lastName">Apelido </Label>
                <FieldError message={form.formState.errors.lastName?.message} />
              </div>
              <div className="relative">
              
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Gallego"
                  className="pl-11"
                  {...form.register("lastName")}
                />
              </div>
            </LabelInputContainer>
          </div>

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

          {/* Password + Confirm Password */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <LabelInputContainer>
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
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </LabelInputContainer>

            <LabelInputContainer>
              <div className="flex items-center justify-between">
                <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                <FieldError message={form.formState.errors.confirmPassword?.message} />
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 h-5 w-5" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-11 pr-11"
                  {...form.register("confirmPassword")}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </LabelInputContainer>
          </div>

          <button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="group/btn mt-4 relative block h-11 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] hover:brightness-110"
          >
            Criar Conta
            <BottomGradient />
          </button>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
            <span className="text-sm text-neutral-500">ou</span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
          </div>

          <div className="text-center">
            <p className="text-sm text-neutral-600 italic dark:text-neutral-400">
              Já tem uma conta?{" "}
              <Link
                href="/login"
                className="font-medium text-black underline hover:text-neutral-700 dark:text-white dark:hover:text-neutral-300"
              >
                Entrar
              </Link>
            </p>
          </div>
        </form>
      </TooltipProvider>
    </div>
  );
}

/* Reusable Components */
const BottomGradient = () => (
  <>
    <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
    <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
  </>
);

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
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