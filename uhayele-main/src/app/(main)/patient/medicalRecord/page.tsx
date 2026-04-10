"use client";

import React, { useState } from "react";
import jsPDF from "jspdf";
import {
  ArrowLeft,
  FileText,
  User,
  Calendar,
  Activity,
  Pill,
  Syringe,
  Users,
  AlertCircle,
  Droplet,
  Clock,
  Stethoscope,
  ClipboardList,
  Download,
  Plus,
} from "lucide-react";
import { format } from "date-fns";
import { pt } from "date-fns/locale";

import { 
  getBloodTypeLabel, 
  getDiseaseLabel, 
  getImmunizationLabel, 
  mockAppointmentHistory, 
  mockMedicalRecords, 
  mockPatient 
} from "@/app/assets/data/mockDataMedicalRecord";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function MedicalRecord() {
  const [activeTab, setActiveTab] = useState("overview");
  const patient = mockPatient;
  const latestRecord = mockMedicalRecords[0];

  const calculateAge = (dateOfBirth: string) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const completedAppointments = mockAppointmentHistory.filter(
    (apt) => apt.status === "Completo"
  );
  const upcomingAppointments = mockAppointmentHistory.filter(
    (apt) => apt.status === "Scheduled"
  );

  // ====================== EXPORTAR FICHA  ======================
  const handleExportFicha = () => {
    const doc = new jsPDF();
    let y = 20;
    const pageWidth = doc.internal.pageSize.getWidth();

    // === HEADER ===
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("UHAYELE - FICHA MÉDICA", pageWidth / 2, y, { align: "center" });
    y += 10;

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text(`Gerado em: ${format(new Date(), "dd 'de' MMMM 'de' yyyy", { locale: pt })}`, pageWidth / 2, y, { align: "center" });
    y += 15;

    // Linha divisória
    doc.setDrawColor(200);
    doc.line(20, y, pageWidth - 20, y);
    y += 15;

    // === DADOS DO PACIENTE ===
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("INFORMAÇÕES DO PACIENTE", 20, y);
    y += 10;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text(`Nome: ${patient.firstName} ${patient.lastName}`, 20, y);
    y += 8;
    doc.text(`Idade: ${calculateAge(patient.dateOfBirth)} anos`, 20, y);
    y += 8;
    doc.text(`Género: ${patient.gender}`, 20, y);
    y += 8;
    doc.text(`Data de Nascimento: ${format(new Date(patient.dateOfBirth), "dd/MM/yyyy")}`, 20, y);
    y += 8;
    doc.text(`Email: ${patient.email}`, 20, y);
    y += 8;
    doc.text(`Telefone: ${patient.phone}`, 20, y);
    y += 15;

    // === ANTECEDENTES PESSOAIS ===
    if (latestRecord.personalHistory) {
      doc.setFont("helvetica", "bold");
      doc.text("ANTECEDENTES PATOLÓGICOS PESSOAIS", 20, y);
      y += 10;
      doc.setFont("helvetica", "normal");
      
      const personalLines = doc.splitTextToSize(latestRecord.personalHistory, 170);
      doc.text(personalLines, 20, y);
      y += personalLines.length * 6 + 10;
    }

    // === ANTECEDENTES FAMILIARES ===
    if (latestRecord.familyHistory) {
      doc.setFont("helvetica", "bold");
      doc.text("ANTECEDENTES PATOLÓGICOS FAMILIARES", 20, y);
      y += 10;
      doc.setFont("helvetica", "normal");
      
      doc.text(`Doença: ${getDiseaseLabel(latestRecord.familyHistory.disease)}`, 20, y);
      y += 8;
      doc.text(`Relação: ${latestRecord.familyHistory.relationship}`, 20, y);
      y += 8;
      if (latestRecord.familyHistory.notes) {
        const notesLines = doc.splitTextToSize(latestRecord.familyHistory.notes, 170);
        doc.text(notesLines, 20, y);
        y += notesLines.length * 6 + 10;
      }
    }

    // === ALERGIAS ===
    if (latestRecord.allergies) {
      doc.setFont("helvetica", "bold");
      doc.text("ALERGIAS", 20, y);
      y += 10;
      doc.setFont("helvetica", "normal");
      doc.text(latestRecord.allergies, 20, y);
      y += 15;
    }

    // === VACINAS ===
    if (latestRecord.immunizations && latestRecord.immunizations.length > 0) {
      doc.setFont("helvetica", "bold");
      doc.text("REGISTO DE VACINAÇÃO", 20, y);
      y += 10;
      doc.setFont("helvetica", "normal");

      latestRecord.immunizations.forEach((imm) => {
        const text = `${getImmunizationLabel(imm.immunizationType)} - ${format(new Date(imm.dateAdministered), "dd/MM/yyyy")}`;
        doc.text(text, 20, y);
        y += 8;
      });
      y += 5;
    }

    // Rodapé
    doc.setFontSize(10);
    doc.text("Documento gerado pelo sistema Uhayele", pageWidth / 2, 285, { align: "center" });

    // Salvar PDF
    doc.save(`Ficha_Medica_${patient.firstName}_${patient.lastName}.pdf`);
  };
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
    {/* ==================== HEADER ==================== */}
        <div className="max-w-7xl mx-auto ">
            
      <header className="bg-white border-b px-4 sm:px-6 lg:px-8 py-5 rounded-xl top-0 z-50 shadow-sm">
          <div className="flex items-center justify-between">
            
            {/* Left - Title */}
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Ficha Médica</h1>
              <p className="text-sm text-gray-500">
                {patient.firstName} {patient.lastName}
              </p>
            </div>
         
            {/* Right - Export Button */}
           <Button onClick={handleExportFicha} variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Exportar Ficha Completa (PDF)
            </Button>

          </div>
              </header>
    
  

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Patient Header */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Avatar */}
              <div className="w-18 h-18 rounded-full bg-gray-500 flex items-center justify-center text-white shrink-0">
                <span className="text-4xl">
                  {patient.firstName[0]}
                  {patient.lastName[0]}
                </span>
              </div>

              {/* Patient Info */}
              <div className="flex-1">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {patient.firstName} {patient.lastName}
                    </h1>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge variant="secondary">
                        {patient.gender}
                      </Badge>
                      <Badge variant="secondary">
                        {calculateAge(patient.dateOfBirth)} anos
                      </Badge>
                      {latestRecord.bloodType && (
                        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                          <Droplet className="w-3 h-3 mr-1" />
                          Tipo Sanguíneo: {getBloodTypeLabel(latestRecord.bloodType)}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <User className="w-4 h-4" />
                    <span>{patient.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <User className="w-4 h-4" />
                    <span>{patient.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>
                      Nascimento:{" "}
                      {format(new Date(patient.dateOfBirth), "dd/MM/yyyy")}
                    </span>
                  </div>
                </div>

                {patient.address && (
                  <div className="mt-3 text-sm text-gray-600">
                    <strong>Endereço:</strong> {patient.address}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 mb-6">
            <TabsTrigger value="overview">
              <FileText className="w-4 h-4 mr-2" />
              Resumo
            </TabsTrigger>
            <TabsTrigger value="history">
              <Clock className="w-4 h-4 mr-2" />
              Histórico
            </TabsTrigger>
            <TabsTrigger value="immunizations">
              <Syringe className="w-4 h-4 mr-2" />
              Vacinas
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Alerts Section */}
            {latestRecord.allergies && (
              <Card className="border-red-200 bg-red-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-800">
                    <AlertCircle className="w-5 h-5" />
                    Alergias
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-red-700">{latestRecord.allergies}</p>
                </CardContent>
              </Card>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              {/* Current Diagnoses */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Diagnósticos Actuais
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {latestRecord.diagnosis ? (
                    <p className="text-gray-700">{latestRecord.diagnosis}</p>
                  ) : (
                    <p className="text-gray-500 italic">Sem diagnósticos registrados</p>
                  )}
                </CardContent>
              </Card>

              {/* Current Treatment */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Pill className="w-5 h-5" />
                    Tratamento Actual
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {latestRecord.treatment ? (
                    <p className="text-gray-700">{latestRecord.treatment}</p>
                  ) : (
                    <p className="text-gray-500 italic">Sem tratamento em curso</p>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Personal History */}
            {latestRecord.personalHistory && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Antecedentes Patológicos Pessoais
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 whitespace-pre-line">
                    {latestRecord.personalHistory}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Family History */}
            {latestRecord.familyHistory && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Antecedentes Patológicos Familiares
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Badge variant="outline">
                        {latestRecord.familyHistory.relationship}
                      </Badge>
                      <div>
                        <p className="font-medium text-gray-900">
                          {getDiseaseLabel(latestRecord.familyHistory.disease)}
                        </p>
                        {latestRecord.familyHistory.notes && (
                          <p className="text-sm text-gray-600 mt-1">
                            {latestRecord.familyHistory.notes}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Upcoming Appointments */}
            {upcomingAppointments.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Próximas Consultas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {upcomingAppointments.map((apt) => (
                      <div
                        key={apt.id}
                        className="flex items-center justify-between p-3 bg-blue-50 rounded-lg"
                      >
                        <div>
                          <p className="font-medium text-gray-900">
                            {apt.doctorName}
                          </p>
                          <p className="text-sm text-gray-600">
                            {apt.specialization}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-blue-700">
                            {format(new Date(apt.date), "dd/MM/yyyy", {
                              locale: pt,
                            })}
                          </p>
                          <p className="text-sm text-gray-600">{apt.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">
                Histórico de Consultas ({completedAppointments.length})
              </h2>
            </div>

            {completedAppointments.length > 0 ? (
              <div className="space-y-4">
                {completedAppointments.map((apt, index) => (
                  <Card key={apt.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">
                            {apt.doctorName} - {apt.specialization}
                          </CardTitle>
                          <p className="text-sm text-gray-600 mt-1">
                            {format(new Date(apt.date), "dd 'de' MMMM 'de' yyyy", {
                              locale: pt,
                            })}{" "}
                            às {apt.time}
                          </p>
                        </div>
                        <Badge>{apt.type.replace("_", " ")}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {apt.diagnosis && (
                        <div>
                          <h4 className="font-medium text-sm text-gray-700 mb-1">
                            Diagnóstico:
                          </h4>
                          <p className="text-gray-900">{apt.diagnosis}</p>
                        </div>
                      )}

                      {apt.treatment && (
                        <div>
                          <h4 className="font-medium text-sm text-gray-700 mb-1">
                            Tratamento:
                          </h4>
                          <p className="text-gray-900">{apt.treatment}</p>
                        </div>
                      )}

                      {apt.notes && (
                        <div>
                          <h4 className="font-medium text-sm text-gray-700 mb-1">
                            Observações:
                          </h4>
                          <p className="text-gray-600">{apt.notes}</p>
                        </div>
                      )}

                      {apt.prescriptions && apt.prescriptions.length > 0 && (
                        <div>
                          <h4 className="font-medium text-sm text-gray-700 mb-2">
                            Medicamentos Prescritos:
                          </h4>
                          <div className="space-y-2">
                            {apt.prescriptions.map((pres) =>
                              pres.items.map((item, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-center gap-2 text-sm bg-gray-50 p-2 rounded"
                                >
                                  <Pill className="w-4 h-4 text-blue-600" />
                                  <span className="font-medium">{item.name}</span>
                                  <span className="text-gray-600">-</span>
                                  <span className="text-gray-600">{item.dosage}</span>
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      )}

                      {apt.diagnosticTests && apt.diagnosticTests.length > 0 && (
                        <div>
                          <h4 className="font-medium text-sm text-gray-700 mb-2">
                            Exames Realizados:
                          </h4>
                          <div className="space-y-2">
                            {apt.diagnosticTests.map((test, idx) => (
                              <div
                                key={idx}
                                className="bg-gray-50 p-3 rounded"
                              >
                                <div className="flex items-center justify-between mb-1">
                                  <span className="font-medium">{test.name}</span>
                                  <Badge variant="secondary">{test.status}</Badge>
                                </div>
                                {test.result && (
                                  <p className="text-sm text-gray-700 mt-1">
                                    {test.result}
                                  </p>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Stethoscope className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-500">Nenhuma consulta realizada ainda</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Prescriptions Tab */}
          <TabsContent value="prescriptions" className=" space-y-6">
            <div className="space-y-4">
              {completedAppointments
                .filter((apt) => apt.prescriptions && apt.prescriptions.length > 0)
                .map((apt) => (
                  <Card key={apt.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">
                            Receita - {apt.doctorName}
                          </CardTitle>
                          <p className="text-sm text-gray-600 mt-1">
                            {format(new Date(apt.date), "dd/MM/yyyy")}
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Baixar
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {apt.prescriptions?.map((pres) => (
                        <div key={pres.id} className="space-y-3">
                          {pres.description && (
                            <p className="text-sm text-gray-600">{pres.description}</p>
                          )}
                          <div className="space-y-2">
                            {pres.items.map((item, idx) => (
                              <div
                                key={idx}
                                className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                              >
                                <Pill className="w-5 h-5 text-blue-600 mt-0.5" />
                                <div className="flex-1">
                                  <p className="font-medium text-gray-900">
                                    {item.name}
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    {item.dosage}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    Quantidade: {item.quantity}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                ))}

              {completedAppointments.filter(
                (apt) => apt.prescriptions && apt.prescriptions.length > 0
              ).length === 0 && (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Pill className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-500">Nenhuma receita registrada</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Exams Tab */}
          <TabsContent value="exams" className="w-[100%] space-y-6">
            <div className="space-y-4">
              {completedAppointments
                .filter((apt) => apt.diagnosticTests && apt.diagnosticTests.length > 0)
                .map((apt) => (
                  <Card key={apt.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">
                            Exames - {apt.doctorName}
                          </CardTitle>
                          <p className="text-sm text-gray-600 mt-1">
                            {format(new Date(apt.date), "dd/MM/yyyy")}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {apt.diagnosticTests?.map((test, idx) => (
                          <div
                            key={idx}
                            className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium text-gray-900">
                                {test.name}
                              </h4>
                              <Badge
                                variant={
                                  test.status === "Completed"
                                    ? "default"
                                    : "secondary"
                                }
                              >
                                {test.status}
                              </Badge>
                            </div>
                            {test.result && (
                              <div className="mt-2">
                                <p className="text-sm font-medium text-gray-700 mb-1">
                                  Resultado:
                                </p>
                                <p className="text-sm text-gray-900">
                                  {test.result}
                                </p>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}

              {completedAppointments.filter(
                (apt) => apt.diagnosticTests && apt.diagnosticTests.length > 0
              ).length === 0 && (
                <Card>
                  <CardContent className="p-12 text-center">
                    <ClipboardList className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-500">Nenhum exame registrado</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Immunizations Tab */}
          <TabsContent value="immunizations" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Syringe className="w-5 h-5" />
                    Registro de Vacinação
                  </CardTitle>
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar Vacina
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {latestRecord.immunizations.length > 0 ? (
                  <div className="space-y-3">
                    {latestRecord.immunizations.map((imm) => (
                      <div
                        key={imm.id}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <Syringe className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              {getImmunizationLabel(imm.immunizationType)}
                            </p>
                            <p className="text-sm text-gray-600">
                              Dose: {imm.dosage}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">
                            {format(
                              new Date(imm.dateAdministered),
                              "dd/MM/yyyy"
                            )}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Syringe className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-500">Nenhuma vacina registrada</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
        </div>
  );
}
