"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

import {
  ArrowLeft,
  Calendar as CalendarIcon,
  Clock,
  User,
  Mail,
  Phone,
  FileText,
  CheckCircle,
} from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { pt } from "date-fns/locale";

import { mockDoctors } from "@/app/assets/data/mockData";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";

const appointmentTypes = [
  { value: "Consulta_Geral", label: "Consulta Geral" },
  { value: "Seguimento", label: "Seguimento" },
  { value: "Retorno", label: "Retorno" },
];

const timeSlots = ["08:00", "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"];

export default function BookAppointment() {
  const { serialNumber } = useParams<{ serialNumber: string }>();
  const router = useRouter();

  const doctor = mockDoctors.find((d) => d.serialNumber === serialNumber);

  const [date, setDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [appointmentType, setAppointmentType] = useState<string>("Consulta_Geral");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // This is the "mounted" we are talking about
  const [mounted, setMounted] = useState(false);

  // Run only once on client after hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!doctor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Médico não encontrado</h2>
          <Link href="/patient/findDoctor">
            <Button>Voltar à busca</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !selectedTime) {
      toast.error("Por favor, selecione a data e horário da consulta");
      return;
    }
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      toast.error("Por favor, preencha todos os campos obrigatórios");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Consulta marcada com sucesso!", {
        description: `Você receberá uma confirmação por email em ${formData.email}`,
        icon: <CheckCircle className="w-5 h-5" />,
      });
      setTimeout(() => router.push("/patient"), 1800);
    }, 1500);
  };

  // Safe disabled function - only runs real logic on client
  const isDateDisabled = (dateToCheck: Date): boolean => {
    if (!mounted) return false;           // During SSR, don't disable anything
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return dateToCheck < today || dateToCheck.getDay() === 0; // Disable past + Sundays
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button
            variant="ghost"
            onClick={() => router.push(`/patient/findDoctor`)}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao perfil
          </Button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <div className="flex items-center gap-4 mb-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white border shadow-sm">
                          <CalendarIcon className="w-6 h-6 text-zinc-600" />
                        </div>
                        <div>
                          <h1 className="text-xl font-semibold text-gray-900">Marcar Consulta</h1>
                         <p className="text-gray-600">
            Agende sua consulta com Dr. {doctor.firstName} {doctor.lastName}
          </p>
                        </div>
      </div>
          
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Doctor Info Summary */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white shrink-0">
                  <span className="text-2xl">
                    {doctor.firstName[0]}{doctor.lastName[0]}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">
                    Dr. {doctor.firstName} {doctor.lastName}
                  </h3>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {doctor.speciality.map((spec) => (
                      <Badge key={spec.id} variant="secondary" className="text-xs">
                        {spec.name}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="ml-auto text-right">
                  <p className="text-sm text-gray-500">Valor da consulta</p>
                  <p className="text-xl font-bold text-green-600">
                    {doctor.consultationFee.toLocaleString("pt-AO")} Kz
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Appointment Type */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Tipo de Consulta
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={appointmentType} onValueChange={setAppointmentType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {appointmentTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Date and Time - Fixed Hydration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5" />
                Data e Horário
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label className="mb-2 block">Selecione a Data</Label>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={isDateDisabled}
                    className="rounded-md border"
                    locale={pt}
                  />
                </div>

                <div>
                  <Label className="mb-2 block">Selecione o Horário</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {timeSlots.map((time) => (
                      <Button
                        key={time}
                        type="button"
                        variant={selectedTime === time ? "default" : "outline"}
                        onClick={() => setSelectedTime(time)}
                        className="w-full"
                      >
                        <Clock className="w-4 h-4 mr-2" />
                        {time}
                      </Button>
                    ))}
                  </div>

                  {date && selectedTime && (
                    <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
                      <p className="text-sm font-medium text-blue-900">Consulta agendada para:</p>
                      <p className="text-sm text-blue-700 mt-1">
                        {format(date, "EEEE, d 'de' MMMM 'de' yyyy", { locale: pt })} às {selectedTime}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Patient Information - unchanged */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Dados do Paciente
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* ... your patient form fields ... */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">Primeiro Nome <span className="text-red-500">*</span></Label>
                  <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} required />
                </div>
                <div>
                  <Label htmlFor="lastName">Último Nome <span className="text-red-500">*</span></Label>
                  <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} className="pl-10" required />
                  </div>
                </div>
                <div>
                  <Label htmlFor="phone">Telefone <span className="text-red-500">*</span></Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} placeholder="+244 9XX XXX XXX" className="pl-10" required />
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="notes">Notas Adicionais (opcional)</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Descreva seus sintomas ou motivo da consulta..."
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push(`/patient/doctor/${serialNumber}`)}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting} className="flex-1">
              {isSubmitting ? "Processando..." : "Confirmar Marcação"}
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}