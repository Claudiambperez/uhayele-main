"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { User, Phone, Calendar, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PatientOnboardingData } from "@/app/types";
import OnboardingLayout from "../OnboardingLayout";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const patientSchema = z.object({
  firstName: z.string().min(2, "O primeiro nome deve ter pelo menos 2 caracteres."),
  lastName: z.string().min(2, "O apelido deve ter pelo menos 2 caracteres."),
  email: z.string().email("Introduza um email válido."),
  phone: z.string().min(9, "Número de telefone inválido (mínimo 9 dígitos)."),
  dateOfBirth: z.string().min(1, "Data de nascimento é obrigatória."),
  gender: z.enum(["Masculino", "Feminino", "Outro"], {
    required_error: "Selecione o género",
  }),
});

type FormData = z.infer<typeof patientSchema>;

export default function PatientOnboarding() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(patientSchema),
    mode: "onTouched",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dateOfBirth: "",
      gender: undefined,
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setIsLoading(true);

    const fullData: PatientOnboardingData = {
      ...data,
      dateOfBirth: data.dateOfBirth,
    };

    try {
      await new Promise((resolve) => setTimeout(resolve, 1400));

      console.log("✅ Patient Onboarding Data:", fullData);

      window.location.href = "/dashboard/patient";
    } catch (error) {
      console.error(error);
      alert("Ocorreu um erro. Tente novamente.");
    } finally {
      setIsSubmitting(false);
      setIsLoading(false);
    }
  };

  return (
    <OnboardingLayout
      currentStep={2}
      title="Dados Pessoais"
      subtitle="Complete as informações para continuar"
      isLoading={isLoading}
    >
      <TooltipProvider delayDuration={150}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* First Name + Last Name */}
          <div className="grid grid-cols-2 gap-4">
            <LabelInputContainer>
              <div className="flex items-center justify-between">
                <Label htmlFor="firstName">Primeiro Nome</Label>
                <FieldError message={form.formState.errors.firstName?.message} />
              </div>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 h-5 w-5" />
                <Input
                  id="firstName"
                  className="pl-11 h-8"
                  placeholder="João"
                  {...form.register("firstName")}
                />
              </div>
            </LabelInputContainer>

            <LabelInputContainer>
              <div className="flex items-center justify-between">
                <Label htmlFor="lastName">Apelido</Label>
                <FieldError message={form.formState.errors.lastName?.message} />
              </div>
              <Input
                id="lastName"
                className="h-8"
                placeholder="Manuel"
                {...form.register("lastName")}
              />
            </LabelInputContainer>
          </div>

          {/* Email */}
          <LabelInputContainer>
            <div className="flex items-center justify-between">
              <Label htmlFor="email">Email</Label>
              <FieldError message={form.formState.errors.email?.message} />
            </div>
            <Input
              id="email"
              type="email"
              className="h-8"
              placeholder="joao.manuel@email.com"
              {...form.register("email")}
            />
          </LabelInputContainer>

          {/* Phone */}
          <LabelInputContainer>
            <div className="flex items-center justify-between">
              <Label htmlFor="phone">Telefone</Label>
              <FieldError message={form.formState.errors.phone?.message} />
            </div>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 h-5 w-5" />
              <Input
                id="phone"
                className="pl-11 h-8"
                placeholder="+244 923 456 789"
                {...form.register("phone")}
              />
            </div>
          </LabelInputContainer>

          {/* Date of Birth + Gender - Same width */}
          <div className="grid grid-cols-2 gap-4">
            <LabelInputContainer>
              <div className="flex items-center justify-between">
                <Label htmlFor="dateOfBirth">Data de Nascimento</Label>
                <FieldError message={form.formState.errors.dateOfBirth?.message} />
              </div>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 h-5 w-5" />
                <Input
                  id="dateOfBirth"
                  type="date"
                  className="pl-11 h-8"
                  {...form.register("dateOfBirth")}
                />
              </div>
            </LabelInputContainer>

            <LabelInputContainer>
              <div className="flex items-center justify-between">
                <Label htmlFor="gender">Género</Label>
                <FieldError message={form.formState.errors.gender?.message} />
              </div>
              <Select 
                onValueChange={(value) => form.setValue("gender", value as any, { shouldValidate: true })}
                value={form.watch("gender")}
              >
                <SelectTrigger id="gender" className="h-8">
                  <SelectValue placeholder="Selecione o género" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Masculino">Masculino</SelectItem>
                  <SelectItem value="Feminino">Feminino</SelectItem>
                  <SelectItem value="Outro">Outro</SelectItem>
                </SelectContent>
              </Select>
            </LabelInputContainer>
          </div>

          <Button
            type="submit"
            className="w-full h-8 text-base font-medium"
            disabled={isSubmitting || isLoading || form.formState.isSubmitting}
          >
            {isLoading || isSubmitting
              ? "A preparar a sua experiência..."
              : "Concluir Registo de Paciente"}
          </Button>
        </form>
      </TooltipProvider>
    </OnboardingLayout>
  );
}

/* ====================== Reusable Components ====================== */

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