"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Phone, Hash, Plus, X, AlertCircle } from "lucide-react";

import OnboardingLayout from "../OnboardingLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { SelectScrollable } from "@/components/SelectScrollable";

import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Fixed Schema - Better handling of yearsOfExperience
const doctorSchema = z.object({
  firstName: z.string().min(2, "O primeiro nome deve ter pelo menos 2 caracteres."),
  lastName: z.string().min(2, "O apelido deve ter pelo menos 2 caracteres."),
  email: z.string().email("Introduza um email válido."),
  phone: z.string().min(9, "Número de telefone inválido (mínimo 9 dígitos)."),
  serialNumber: z
    .string()
    .min(4, "Número de série é obrigatório.")
    .max(30, "Número de série demasiado longo."),
  
  // yearsOfExperience: Keep as string in form, transform only on submit
  yearsOfExperience: z.string().optional(),
  
  description: z
    .string()
    .max(500, "A descrição não pode ter mais de 500 caracteres")
    .optional(),
  
  specialities: z
    .array(z.string())
    .min(1, "Adicione pelo menos uma especialidade.")
    .max(3, "Pode adicionar no máximo 3 especialidades."),
});

type FormData = z.infer<typeof doctorSchema>;

export default function DoctorOnboarding() {
  const router = useRouter();
  const [specialities, setSpecialities] = useState<string[]>([]);
  const [selectedSpeciality, setSelectedSpeciality] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(doctorSchema),
    mode: "onTouched",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      serialNumber: "",
      yearsOfExperience: "",
      description: "",
      specialities: [],
    },
  });

  const addSpeciality = (value: string) => {
    const speciality = value.trim();
    if (!speciality || specialities.includes(speciality) || specialities.length >= 3) return;

    const newSpecialities = [...specialities, speciality];
    setSpecialities(newSpecialities);
    form.setValue("specialities", newSpecialities, { shouldValidate: true });
    setSelectedSpeciality("");
  };

  const removeSpeciality = (index: number) => {
    const newSpecialities = specialities.filter((_, i) => i !== index);
    setSpecialities(newSpecialities);
    form.setValue("specialities", newSpecialities, { shouldValidate: true });
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setIsLoading(true);

    // Convert yearsOfExperience to number only when submitting
    const fullData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      serialNumber: data.serialNumber,
      yearsOfExperience: data.yearsOfExperience 
        ? parseInt(data.yearsOfExperience, 10) 
        : undefined,
      description: data.description || undefined,
      specialities: data.specialities,
    };

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("✅ Doctor Onboarding Data:", fullData);

      alert("Perfil de Médico criado com sucesso!");
      router.push("/doctor");

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
      subtitle="Complete as informações para continuar."
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
              <Input 
                id="firstName" 
                className="h-8" 
                placeholder="Ana" 
                {...form.register("firstName")} 
              />
            </LabelInputContainer>

            <LabelInputContainer>
              <div className="flex items-center justify-between">
                <Label htmlFor="lastName">Apelido</Label>
                <FieldError message={form.formState.errors.lastName?.message} />
              </div>
              <Input 
                id="lastName" 
                className="h-8" 
                placeholder="Santos" 
                {...form.register("lastName")} 
              />
            </LabelInputContainer>
          </div>

          {/* Email */}
          <LabelInputContainer>
            <div className="flex items-center justify-between">
              <Label htmlFor="email">Email Profissional</Label>
              <FieldError message={form.formState.errors.email?.message} />
            </div>
            <Input
              id="email"
              type="email"
              className="h-8"
              placeholder="ana.santos@uhayele.ao"
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

          {/* Serial Number */}
          <LabelInputContainer>
            <div className="flex items-center justify-between">
              <Label htmlFor="serialNumber">Número de Ordem Médica</Label>
              <FieldError message={form.formState.errors.serialNumber?.message} />
            </div>
            <div className="relative">
              <Hash className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 h-5 w-5" />
              <Input
                id="serialNumber"
                className="pl-11 h-8"
                placeholder="12345/OMA ou OMA-98765"
                {...form.register("serialNumber")}
              />
            </div>
          </LabelInputContainer>

          {/* Years of Experience + Description */}
          <div className="grid grid-cols-2 gap-4">
            <LabelInputContainer>
              <div className="flex items-center justify-between">
                <Label htmlFor="yearsOfExperience">Anos de Experiência</Label>
              </div>
              <Input
                id="yearsOfExperience"
                type="number"
                className="h-8"
                placeholder="Ex: 8"
                min="0"
                {...form.register("yearsOfExperience")}
              />
            </LabelInputContainer>

            <LabelInputContainer>
              <div className="flex items-center justify-between">
                <Label htmlFor="description">Descrição Profissional (Opcional)</Label>
              </div>
              <Textarea
                id="description"
                className="h-20 resize-y"
                placeholder="Sou especialista em cardiologia com foco em prevenção cardiovascular..."
                {...form.register("description")}
              />
            </LabelInputContainer>
          </div>

          {/* Specialities */}
          <LabelInputContainer>
            <div className="flex items-center justify-between">
              <Label>Especialidades (máx. 3)</Label>
              <FieldError message={form.formState.errors.specialities?.message} />
            </div>

            <div className="flex gap-2">
              <SelectScrollable
                value={selectedSpeciality}
                onValueChange={(value) => {
                  setSelectedSpeciality(value);
                  if (value) addSpeciality(value);
                }}
              />
              <Button
                type="button"
                onClick={() => addSpeciality(selectedSpeciality)}
                variant="secondary"
                disabled={!selectedSpeciality || specialities.length >= 3}
                className="h-8"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 mt-3">
              {specialities.map((spec, index) => (
                <Badge
                  key={`${spec}-${index}`}
                  variant="secondary"
                  className="py-1 pl-3 pr-2 text-sm"
                >
                  {spec}
                  <button
                    type="button"
                    onClick={() => removeSpeciality(index)}
                    className="ml-2 text-neutral-500 hover:text-red-500 transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </LabelInputContainer>


           <Button
                      type="submit"
                      className="w-full h-8 text-base font-medium"
                      disabled={isSubmitting || isLoading || form.formState.isSubmitting}
                    >
                      {isLoading || isSubmitting
                        ? "A criar perfil profissional..."
                        : "Concluir Registo de Médico"}
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