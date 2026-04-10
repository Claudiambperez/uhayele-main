"use client";
import { useState } from "react";

import {
  ArrowLeft,
  Calendar as CalendarIcon,
  Clock,
  CheckCircle,
  Stethoscope,
  MapPin,
  Star,
  Video,
  CreditCard,
  Copy,
  PhoneCall,
  Calendar,
  FileText,
} from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import { mockDoctors, speciality } from "@/app/assets/data/mockData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

const appointmentTypes = [
  { value: "Consulta_Geral", label: "Consulta Geral" },
  { value: "Seguimento", label: "Seguimento" },
  { value: "Retorno", label: "Retorno" },
];

const timeSlots = ["08:00", "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"];

const appointmentModes = [
  { value: "video", label: "Vídeo Chamada", icon: Video },
  { value: "call", label: "Chamada Telefónica", icon: PhoneCall },
];

export default function ScheduleAppointment() {
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSpecialization, setSelectedSpecialization] = useState<string>("");
  const [date, setDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [appointmentType, setAppointmentType] = useState<string>("Consulta_Geral");
  const [appointmentMode, setAppointmentMode] = useState<string>("video");
  const [motivo, setMotivo] = useState<string>("");
  const [selectedDoctor, setSelectedDoctor] = useState<string>("");
  const [paymentReference, setPaymentReference] = useState<string>("");
  const [paymentReferenceInput, setPaymentReferenceInput] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const availableDoctors = selectedSpecialization
    ? mockDoctors.filter((doctor) =>
        doctor.speciality.some((spec) => spec.id === selectedSpecialization)
      )
    : [];

  const generatePaymentReference = () => {
    const timestamp = Date.now().toString().slice(-8);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${timestamp}${random}`;
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (!selectedSpecialization || !appointmentType || !motivo.trim()) {
        toast.error("Por favor, preencha todos os campos obrigatórios");
        return;
      }
    } else if (currentStep === 2) {
      if (!date || !selectedTime) {
        toast.error("Por favor, selecione a data e horário");
        return;
      }
    } else if (currentStep === 3) {
      if (!selectedDoctor) {
        toast.error("Por favor, selecione um médico");
        return;
      }
    } else if (currentStep === 4) {
      const reference = generatePaymentReference();
      setPaymentReference(reference);
    } else if (currentStep === 5) {
      if (paymentReferenceInput !== paymentReference) {
        toast.error("Referência de pagamento inválida");
        return;
      }

      // ✅ SUCCESS
      setIsSubmitting(true);

      const doctor = mockDoctors.find((d) => d.serialNumber === selectedDoctor);

     toast.success("Consulta marcada com sucesso!", {
    description: `Agendada com Dr. ${doctor?.firstName} ${doctor?.lastName} para ${date && format(date, "dd/MM/yyyy", { locale: pt })} às ${selectedTime}`,
    duration: 6000,
    action: {
      label: "Ver Consultas",
      onClick: () => router.push("/patient/dashboard"),
    },
  });

  setTimeout(() => {
    router.push("/patient/dashboard");
  }, 2800);

  setCurrentStep(6);
  return;
    }

    setCurrentStep(currentStep + 1);
  };

  const handlePreviousStep = () => setCurrentStep(currentStep - 1);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Referência copiada!");
  };

  const getStepTitle = () => {
    const titles = ["", "Tipo de Consulta", "Data e Horário", "Escolha o Médico", "Confirmação", "Pagamento", "Concluído"];
    return titles[currentStep] || "";
  };

  const selectedDoctorData = mockDoctors.find((d) => d.serialNumber === selectedDoctor);

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            {[1, 2, 3, 4, 5, 6].map((step) => (
              <div key={step} className="flex items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                    step < currentStep
                      ? "bg-green-500 text-white"
                      : step === currentStep
                      ? "bg-gray-900 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {step < currentStep ? "✓" : step}
                </div>
                {step < 6 && (
                  <div className={`h-1 flex-1 mx-2 ${step < currentStep ? "bg-green-500" : "bg-gray-200"}`} />
                )}
              </div>
            ))}
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mt-4">{getStepTitle()}</h1>
        </div>
        {/* Step 1: Specialization, Type, Motivo, and Mode */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Stethoscope className="w-5 h-5" />
                  Especialidade Médica
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Label className="mb-3 block">
                  Qual especialidade você precisa? <span className="text-red-500">*</span>
                </Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {speciality.map((spec) => (
                    <div
                      key={spec.id}
                      onClick={() => setSelectedSpecialization(spec.id)}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        selectedSpecialization === spec.id
                          ? "border-gray-600 bg-gray-50"
                          : "border-gray-200 hover:border-blue-300"
                      }`}
                    >
                      <h3 className="font-semibold text-gray-900">{spec.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{spec.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Detalhes da Consulta
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="mb-2 block">
                    Tipo de Consulta <span className="text-red-500">*</span>
                  </Label>
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
                </div>

                <div>
                  <Label htmlFor="motivo" className="mb-2 block">
                    Motivo da Consulta <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="motivo"
                    value={motivo}
                    onChange={(e) => setMotivo(e.target.value)}
                    placeholder="Descreva seus sintomas ou motivo da consulta..."
                    rows={4}
                  />
                </div>

                <div>
                  <Label className="mb-3 block">
                    Modalidade de Atendimento <span className="text-red-500">*</span>
                  </Label>
                  <div className="grid md:grid-cols-2 gap-3">
                    {appointmentModes.map((mode) => (
                      <div
                        key={mode.value}
                        onClick={() => setAppointmentMode(mode.value)}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all flex items-center gap-3 ${
                          appointmentMode === mode.value
                            ? "border-gray-600 bg-gray-50"
                            : "border-gray-200 hover:border-blue-300"
                        }`}
                      >
                        <mode.icon className="w-6 h-6 text-gray-600" />
                        <span className="font-medium">{mode.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 2: Date and Time */}
        {currentStep === 2 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5" />
                Escolha Data e Horário
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label className="mb-2 block">Selecione a Data</Label>
                  <CalendarComponent
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(date) =>
                      date < new Date() || date.getDay() === 0
                    }
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
                      <p className="text-sm font-medium text-blue-900">
                        Horário selecionado:
                      </p>
                      <p className="text-sm text-blue-700 mt-1">
                        {format(date, "EEEE, d 'de' MMMM 'de' yyyy", { locale: pt })} às {selectedTime}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Select Doctor */}
        {currentStep === 3 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Stethoscope className="w-5 h-5" />
                Médicos Disponíveis
              </CardTitle>
              <p className="text-sm text-gray-600 mt-2">
                {availableDoctors.length === 0
                  ? "Nenhum médico disponível para esta especialidade. Tente outra data ou especialidade."
                  : "Selecione um médico para sua consulta."}
              
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {availableDoctors.map((doctor) => (
                  <div
                    key={doctor.serialNumber}
                    onClick={() => setSelectedDoctor(doctor.serialNumber)}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedDoctor === doctor.serialNumber
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                  >
                    <div className="flex gap-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white shrink-0">
                        <span className="text-xl">
                          {doctor.firstName[0]}
                          {doctor.lastName[0]}
                        </span>
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">
                          Dr. {doctor.firstName} {doctor.lastName}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          {doctor.speciality.map((spec) => (
                            <Badge key={spec.id} variant="secondary" className="text-xs">
                              {spec.name}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex items-center gap-1 mt-2">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium text-sm">{doctor.rating}</span>
                          <span className="text-gray-500 text-sm">
                            ({doctor.reviewCount} avaliações)
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{doctor.yearsOfExperience} anos exp.</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>Luanda</span>
                          </div>
                        </div>

                        <div className="mt-3">
                          <p className="text-sm text-gray-500">Valor da consulta</p>
                          <p className="font-semibold text-green-600">
                            {doctor.consultationFee.toLocaleString("pt-AO")} Kz
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Confirmation */}
        {currentStep === 4 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                Confirme os Dados da Consulta
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Appointment Details */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Detalhes da Consulta</h3>
                <div className="bg-gray-50 p-4 rounded-lg space-y-1">
                  <p className="text-sm">
                    <strong>Especialidade:</strong>{" "}
                    {speciality.find((s) => s.id === selectedSpecialization)?.name}
                  </p>
                  <p className="text-sm">
                    <strong>Tipo:</strong>{" "}
                    {appointmentTypes.find((t) => t.value === appointmentType)?.label}
                  </p>
                  <p className="text-sm">
                    <strong>Modalidade:</strong>{" "}
                    {appointmentModes.find((m) => m.value === appointmentMode)?.label}
                  </p>
                  <p className="text-sm"><strong>Motivo:</strong> {motivo}</p>
                  {date && selectedTime && (
                    <p className="text-sm">
                      <strong>Data/Hora:</strong>{" "}
                      {format(date, "d 'de' MMMM 'de' yyyy", { locale: pt })} às {selectedTime}
                    </p>
                  )}
                </div>
              </div>

              {/* Doctor Info */}
              {selectedDoctorData && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Médico</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex gap-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white shrink-0">
                        <span className="text-xl">
                          {selectedDoctorData.firstName[0]}
                          {selectedDoctorData.lastName[0]}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">
                          Dr. {selectedDoctorData.firstName} {selectedDoctorData.lastName}
                        </h4>
                        <p className="text-sm text-gray-600">{selectedDoctorData.phone}</p>
                        <p className="text-sm text-gray-600">{selectedDoctorData.email}</p>
                        <p className="font-semibold text-green-600 mt-2">
                          {selectedDoctorData.consultationFee.toLocaleString("pt-AO")} Kz
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Próximo passo:</strong> Após confirmar, você receberá uma referência de pagamento para concluir a marcação.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 5: Payment */}
        {currentStep === 5 && selectedDoctorData && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Pagamento
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-white border border-zinc-100 shadow-sm p-6 rounded-lg text-gray-900">
                <p className="text-sm opacity-90 mb-2">Valor a Pagar</p>
                <p className="text-3xl font-bold">
                  {selectedDoctorData.consultationFee.toLocaleString("pt-AO")} Kz
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Referência de Pagamento</h3>
                <div className="bg-gray-50 p-4 rounded-lg border-2 border-dashed border-gray-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Use os seguintes dados para pagar:</p>
                      <div className="flex gap-2">
                         <p className="text-md text-gray-600 mb-1">Entidade:</p>
                          <p className="text-md font-mono font-bold text-gray-900">10995</p>
                      </div>
                          <div className="flex gap-2">
                         <p className="text-md text-gray-600 mb-1">Referência:</p>
                      <p className="text-md font-mono font-bold text-gray-900">{paymentReference}</p>
                      </div>
                   
                      
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(paymentReference)}
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copiar
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900">Como pagar:</h4>
                <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                  <li>Copie a referência de pagamento acima</li>
                  <li>Acesse o aplicativo do seu banco ou Multicaixa Express</li>
                  <li>Selecione "Pagamento de Serviços"</li>
                  <li>Insira a referência e confirme o pagamento</li>
                  <li>Após o pagamento, insira a referência abaixo para confirmar</li>
                </ol>
              </div>

              <div>
                <Label htmlFor="paymentRef" className="mb-2 block">
                  Confirmar Referência de Pagamento <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="paymentRef"
                  value={paymentReferenceInput}
                  onChange={(e) => setPaymentReferenceInput(e.target.value)}
                  placeholder="Digite a referência de pagamento"
                  className="font-mono"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Digite a mesma referência exibida acima para confirmar que realizou o pagamento
                </p>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>Nota:</strong> O pagamento pode levar até 24 horas para ser processado.
                  Você receberá um email de confirmação assim que o pagamento for verificado.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 6: Success */}
        {/* Step 6: Success Screen - IMPROVED */}
        {currentStep === 6 && selectedDoctorData && (
          <Card className="border-green-200 shadow-sm">
            <CardContent className="pt-10 pb-12 text-center">
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="w-16 h-16 text-green-600" />
                </div>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Consulta Marcada com Sucesso!
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                A sua consulta foi agendada e o pagamento foi registado.
              </p>

              <div className="max-w-md mx-auto bg-white border rounded-2xl p-6 text-left space-y-5 mb-8">
                <div>
                  <p className="text-sm text-gray-500">Médico</p>
                  <p className="font-semibold text-xl">
                    Dr. {selectedDoctorData.firstName} {selectedDoctorData.lastName}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Data</p>
                    <p className="font-medium">
                      {date && format(date, "dd 'de' MMMM 'de' yyyy", { locale: pt })}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Hora</p>
                    <p className="font-medium">{selectedTime}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Modalidade</p>
                  <p className="font-medium">
                    {appointmentModes.find((m) => m.value === appointmentMode)?.label}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={() => router.push("/patient/appointmentsHistory")}
                  className="w-full h-12 text-base font-medium"
                >
                  Ver Minhas Consultas
                </Button>

                <Button
                  variant="outline"
                  onClick={() => router.push("/patient/book")}
                  className="w-full h-12"
                >
                  Voltar ao Início
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Navigation Buttons */}
        {currentStep < 6 && (
          <div className="flex gap-3 mt-8">
            {currentStep > 1 && (
              <Button type="button" variant="outline" onClick={handlePreviousStep} className="flex-1">
                Voltar
              </Button>
            )}
            <Button
              type="button"
              onClick={handleNextStep}
              disabled={isSubmitting}
              className="flex-1"
            >
              {currentStep === 5 ? "Confirmar Pagamento e Marcar Consulta" : "Continuar"}
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
