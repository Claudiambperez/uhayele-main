"use client";

import React from 'react';
import { Calendar, FileText, Activity, Heart, Clock, User, Phone, Mail, LayoutDashboard, Link2 } from 'lucide-react';
import { MetricCard } from './_components/MetricCard';
import { AppointmentCard } from './_components/AppointmentCard';
import { PrescriptionCard } from './_components/PrescriptionCard';
import { MedicalRecordCard } from './_components/MedicalRecordCard';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';
import Link from 'next/link';


// ==================== MOCK DATA ALINHADO COM PRISMA ====================
const mockPatient = {
  id: 'pat-001',
  firstName: 'Maria Clara',
  lastName: 'Santos',
  dateOfBirth: new Date('1992-05-15'),
  gender: 'Feminino',
  email: 'maria.clara@email.com',
  phone: '+244 912 345 678',
};


const mockAppointments = [
  {
    id: 'apt-001',
    doctorName: 'João Manuel',
    speciality: 'Cardiologia',
    dateTime: new Date('2026-04-15T10:00:00'),
    appointmentType: 'Seguimento',           // From new enum
    platform: 'Telemedicina',
    status: 'Scheduled' as const,
    notes: 'Controlo de hipertensão',
  },
  {
    id: 'apt-002',
    doctorName: 'Isabel Correia',
    speciality: 'Ginecologia e Obstetrícia',
    dateTime: new Date('2026-04-22T14:30:00'),
    appointmentType: 'Consulta_Geral',
    platform: 'Clínica Principal - Sala 204',
    status: 'Scheduled' as const,
  },
  {
    id: 'apt-003',
    doctorName: 'João Manuel',
    speciality: 'Cardiologia',
    dateTime: new Date('2026-03-18T09:00:00'),
    appointmentType: 'Retorno',
    platform: 'Telemedicina',
    status: 'Completed' as const,
  },
];

const mockPrescriptions = [
  {
    id: 'prx-001',
    doctorName: 'Dr. João Manuel',
    createdAt: new Date('2026-03-18'),
    appointmentType: 'Seguimento',
    isSigned: true,
    doctorSignature: "Dr. João Manuel Mendes",
    signedAt: new Date('2026-03-18T11:20:00'),
    items: [
      { name: 'Lisinopril 10mg', description: 'Tomar 1x ao dia de manhã', quantity: 30 },
      { name: 'Atorvastatina 20mg', description: 'Tomar 1x à noite', quantity: 30 },
    ],
  },
  {
    id: 'prx-002',
    doctorName: 'Dr. Isabel Correia',
    createdAt: new Date('2026-02-10'),
    appointmentType: 'Consulta_Geral',
    isSigned: true,
    items: [
      { name: 'Ácido Fólico 5mg', description: 'Tomar 1x ao dia', quantity: 60 },
    ],
  },
];

const mockMedicalRecord = {
 id: 'mr-001',
  bloodType: 'A+',
  allergy: 'Penicilina',
  diagnosis: 'Hipertensão controlada com medicação. Monitorização regular recomendada.',
  treatment: 'Medicação diária + dieta com baixo teor de sódio e exercício físico regular.',
  virtualVisitDate: new Date('2026-03-18'),
  doctorName: ' João Manuel',
  immunizations: [
    { type: 'Influenza', dateAdministered: new Date('2025-10-15') },
    { type: 'Tétano', dateAdministered: new Date('2024-05-20') },
    { type: 'Pneumonia', dateAdministered: new Date('2023-08-10') },
  ],
};

export default function PatientDashboard() {
  const upcomingAppointments = mockAppointments.filter(a => a.status === 'Scheduled');
  const activePrescriptions = mockPrescriptions.filter(p => p.isSigned);

  const age = new Date().getFullYear() - mockPatient.dateOfBirth.getFullYear();

  return (
   <div className="min-h-screen bg-zinc-50">
      <div className="max-w-7xl mx-auto px-6 py-6"> 

        {/* Header */}
        <div className="flex flex-col gap-3 pb-8">   
          <div className="flex items-start sm:items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 bg-white shadow-sm">
              <Calendar className="h-5 w-5 text-zinc-900" />
            </div>

            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-zinc-950">
                Visão Geral
              </h1>
              <p className="text-sm text-zinc-500">
                Últimas actualizações e insights do seu perfil de saúde
              </p>
            </div>
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">   
          <MetricCard
            label="Próximas Consultas"
            value={upcomingAppointments.length}
            icon={Calendar}
            sublabel={`Próxima: ${format(upcomingAppointments[0]?.dateTime || new Date(), 'dd MMM', { locale: pt })}`}
            status="default"
          />
          <MetricCard
            label="Prescrições"
            value={activePrescriptions.length}
            icon={FileText}
            sublabel="Todas assinadas"
            status="success"
          />
          <MetricCard
            label="Tipo Sanguíneo"
            value={mockMedicalRecord.bloodType}
            icon={Activity}
            sublabel="Verificado"
            status="default"
          />
          <MetricCard
            label="Total de Consultas"
            value={`${age}`}
            icon={Heart}
            sublabel="Actualizado"
            status="default"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">  
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">  
            <section>
              <div className="flex justify-between items-center mb-4">
              
                <h2 className="text-lg font-semibold">Próximas Consultas</h2>
                <Link href="/patient/appointments" className='flex justify-between gap-2'>
                <Link2  className="text-sm text-blue-600 hover:underline"/>
                Ver todas
                </Link>
                
              
              </div>
              <div className="space-y-3">   
                {mockAppointments.map((apt) => (
                  <AppointmentCard key={apt.id} appointment={apt} />
                ))}
              </div>
            </section>

            <section>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Prescrições Recentes</h2>
                     <Link href="/patient/prescriptions" className='flex justify-between gap-2'>
                <Link2  className="text-sm text-blue-600 hover:underline"/>
                Ver histórico
                </Link>
          
              </div>
              <div className="space-y-3">
                {mockPrescriptions.map((prx) => (
                  <PrescriptionCard key={prx.id} prescription={prx} />
                ))}
              </div>
            </section>
          </div>

          {/* Right Column */}
          <div className="space-y-5">   
            <MedicalRecordCard record={mockMedicalRecord} />

            {/* Health Summary  */}
            <div className="bg-white border border-border rounded-2xl p-5">   
              <h3 className="font-semibold mb-4 flex items-center gap-2 text-base"> 
                <User className="w-4 h-4" />
                Resumo Pessoal
              </h3>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Idade</span>
                  <span className="font-medium">{age} anos</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Género</span>
                  <span className="font-medium">{mockPatient.gender}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Telefone</span>
                  <span className="font-medium">{mockPatient.phone}</span>
                </div>
                <div className="pt-3 border-t">
                  <p className="text-xs text-muted-foreground mb-1">Email</p>
                  <p className="text-sm break-all">{mockPatient.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}