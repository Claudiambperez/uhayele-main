"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Phone, Hash, Plus, X, AlertCircle, Clock, Trash2 } from "lucide-react";

import OnboardingLayout from "../OnboardingLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { SelectScrollable } from "@/components/SelectScrollable";

import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// ====================== ZOD SCHEMA ======================
const availabilitySlotSchema = z.object({
  dayOfWeek: z.number().min(0).max(6),
  startTime: z.string().min(1, "Hora de início é obrigatória"),
  endTime: z.string().min(1, "Hora de fim é obrigatória"),
});

const doctorSchema = z.object({
  firstName: z.string().min(2, "O primeiro nome deve ter pelo menos 2 caracteres."),
  lastName: z.string().min(2, "O apelido deve ter pelo menos 2 caracteres."),
  email: z.string().email("Introduza um email válido."),
  phone: z.string().min(9, "Número de telefone inválido."),
  serialNumber: z.string().min(4, "Número de série é obrigatório."),

  yearsOfExperience: z.string().optional(),
  description: z.string().max(500, "Máximo 500 caracteres").optional(),

  specialities: z.array(z.string()).min(1, "Adicione pelo menos uma especialidade.").max(3),

  availability: z.array(availabilitySlotSchema).optional(),
});

type FormData = z.infer<typeof doctorSchema>;

const daysOfWeek = [
  { value: 1, label: "Segunda-feira" },
  { value: 2, label: "Terça-feira" },
  { value: 3, label: "Quarta-feira" },
  { value: 4, label: "Quinta-feira" },
  { value: 5, label: "Sexta-feira" },
  { value: 6, label: "Sábado" },
  { value: 0, label: "Domingo" },
];

export default function DoctorOnboarding() {
  const router = useRouter();
  const [specialities, setSpecialities] = useState<string[]>([]);
  const [selectedSpeciality, setSelectedSpeciality] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [selectedDays, setSelectedDays] = useState<number[]>([]); // Dias selecionados
  const [availability, setAvailability] = useState<
    { dayOfWeek: number; startTime: string; endTime: string }[]
  >([]);

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
      availability: [],
    },
  });

  // Specialities handlers
  const addSpeciality = (value: string) => { /* ... teu código anterior */ };
  const removeSpeciality = (index: number) => { /* ... teu código anterior */ };

  // Day Selection
  const toggleDay = (dayValue: number) => {
    if (selectedDays.includes(dayValue)) {
      setSelectedDays(selectedDays.filter(d => d !== dayValue));
      // Remove slots for this day
      const newAvailability = availability.filter(s => s.dayOfWeek !== dayValue);
      setAvailability(newAvailability);
      form.setValue("availability", newAvailability);
    } else {
      setSelectedDays([...selectedDays, dayValue]);
    }
  };

  // Add time slot for a selected day
  const addTimeSlot = (dayValue: number) => {
    const newSlot = { dayOfWeek: dayValue, startTime: "09:00", endTime: "17:00" };
    const newAvailability = [...availability, newSlot];
    setAvailability(newAvailability);
    form.setValue("availability", newAvailability);
  };

  const removeTimeSlot = (index: number) => {
    const newAvailability = availability.filter((_, i) => i !== index);
    setAvailability(newAvailability);
    form.setValue("availability", newAvailability);
  };

  const updateTime = (index: number, field: "startTime" | "endTime", value: string) => {
    const updated = [...availability];
    updated[index] = { ...updated[index], [field]: value };
    setAvailability(updated);
    form.setValue("availability", updated);
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    const fullData = {
      ...data,
      yearsOfExperience: data.yearsOfExperience ? parseInt(data.yearsOfExperience, 10) : undefined,
    };

    try {
      await new Promise((resolve) => setTimeout(resolve, 1400));
      console.log("✅ Doctor Onboarding Data:", fullData);
      alert("Perfil de Médico criado com sucesso!");
      router.push("/doctor");
    } catch (error) {
      alert("Ocorreu um erro. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <OnboardingLayout
      currentStep={2}
      title="Dados Profissionais"
      subtitle="Complete as informações para continuar"
      isLoading={isSubmitting}
    >
      <TooltipProvider delayDuration={150}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

          {/* === Seus campos anteriores (mantidos) === */}
          <div className="grid grid-cols-2 gap-4">
            <LabelInputContainer>
              <div className="flex items-center justify-between">
                <Label htmlFor="firstName">Primeiro Nome</Label>
                <FieldError message={form.formState.errors.firstName?.message} />
              </div>
              <Input id="firstName" className="h-8" placeholder="João" {...form.register("firstName")} />
            </LabelInputContainer>

            <LabelInputContainer>
              <div className="flex items-center justify-between">
                <Label htmlFor="lastName">Apelido</Label>
                <FieldError message={form.formState.errors.lastName?.message} />
              </div>
              <Input id="lastName" className="h-8" placeholder="Manuel" {...form.register("lastName")} />
            </LabelInputContainer>
          </div>

          {/* Email */}
          <LabelInputContainer>
            <div className="flex items-center justify-between">
              <Label htmlFor="email">Email Profissional</Label>
              <FieldError message={form.formState.errors.email?.message} />
            </div>
            <Input id="email" type="email" className="h-8" placeholder="ana.santos@uhayele.ao" {...form.register("email")} />
          </LabelInputContainer>

          {/* Phone */}
          <LabelInputContainer>
            <div className="flex items-center justify-between">
              <Label htmlFor="phone">Telefone</Label>
              <FieldError message={form.formState.errors.phone?.message} />
            </div>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 h-5 w-5" />
              <Input id="phone" className="pl-11 h-8" placeholder="+244 923 456 789" {...form.register("phone")} />
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
              <Input id="serialNumber" className="pl-11 h-8" placeholder="12345/OMA" {...form.register("serialNumber")} />
            </div>
          </LabelInputContainer>

          {/* Years of Experience + Description */}
          <div className="grid grid-cols-2 gap-4">
            <LabelInputContainer>
              <div className="flex items-center justify-between">
                <Label htmlFor="yearsOfExperience">Anos de Experiência</Label>
              </div>
              <Input id="yearsOfExperience" type="number" className="h-8" placeholder="8" min="0" {...form.register("yearsOfExperience")} />
            </LabelInputContainer>

            <LabelInputContainer>
              <div className="flex items-center justify-between">
                <Label htmlFor="description">Descrição Profissional (Opcional)</Label>
              </div>
              <Textarea id="description" className="h-20 resize-y" placeholder="Sou especialista em..." {...form.register("description")} />
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
              <Button type="button" onClick={() => addSpeciality(selectedSpeciality)} variant="secondary" disabled={!selectedSpeciality || specialities.length >= 3} className="h-8">
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 mt-3">
              {specialities.map((spec, index) => (
                <Badge key={index} variant="secondary" className="py-1 pl-3 pr-2 text-sm">
                  {spec}
                  <button type="button" onClick={() => removeSpeciality(index)} className="ml-2 text-neutral-500 hover:text-red-500">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </LabelInputContainer>
{/* ====================== DISPONIBILIDADE ====================== */}
        <div className="space-y-6 pt-6 border-t">
          <Label className="text-base font-semibold">Disponibilidade Semanal</Label>
          <p className="text-sm text-zinc-500">Primeiro selecione os dias, depois defina os horários</p>

          {/* Step 1: Select Days */}
          <div>
            <Label className="text-sm mb-3 block">Dias de Atendimento</Label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {daysOfWeek.map((day) => (
                <div
                  key={day.value}
                  onClick={() => toggleDay(day.value)}
                  className={`border rounded-xl p-4 text-center cursor-pointer transition-all ${
                    selectedDays.includes(day.value)
                      ? "border-blue-600 bg-blue-50 font-medium"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {day.label}
                </div>
              ))}
            </div>
          </div>

          {/* Step 2: Set Times for Selected Days */}
          {selectedDays.length > 0 && (
            <div className="mt-8">
              <Label className="text-sm mb-4 block">Horários por Dia Selecionado</Label>
              <div className="space-y-6">
                {selectedDays.map((dayValue) => {
                  const dayLabel = daysOfWeek.find(d => d.value === dayValue)?.label;
                  const daySlots = availability.filter(s => s.dayOfWeek === dayValue);

                  return (
                    <div key={dayValue} className="border rounded-2xl p-5">
                      <div className="font-medium mb-4">{dayLabel}</div>

                      {daySlots.length === 0 ? (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => addTimeSlot(dayValue)}
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          Adicionar Horário
                        </Button>
                      ) : (
                        <div className="space-y-3">
                          {daySlots.map((slot, idx) => (
                            <div key={idx} className="flex items-center gap-3">
                              <Input
                                type="time"
                                value={slot.startTime}
                                onChange={(e) => updateTime(availability.indexOf(slot), "startTime", e.target.value)}
                                className="w-36"
                              />
                              <span className="text-zinc-400">até</span>
                              <Input
                                type="time"
                                value={slot.endTime}
                                onChange={(e) => updateTime(availability.indexOf(slot), "endTime", e.target.value)}
                                className="w-36"
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => removeTimeSlot(availability.indexOf(slot))}
                              >
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <Button type="submit" className="w-full h-11 text-base font-medium" disabled={isSubmitting}>
          {isSubmitting ? "A criar perfil profissional..." : "Concluir Registo de Médico"}
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