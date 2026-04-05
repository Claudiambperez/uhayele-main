// app/dashboard/doctor/page.tsx
"use client";

import React from "react";

import { Calendar, Users, Clock, FileText, Bell, Stethoscope } from "lucide-react";
import { UserRole } from "@/app/types";

export default function DoctorDashboard() {
  // In real app, fetch from API using Prisma
  const doctor = {
    firstName: "Dr. Ana",
    lastName: "Santos",
    serialNumber: "DOC-2024001",
    specialities: ["Cardiologia", "Medicina Interna"],
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-neutral-950 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold text-neutral-900 dark:text-white">
              Bem-vinda, Dra. {doctor.lastName}
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400 mt-1">
              Serial: {doctor.serialNumber} • {doctor.specialities.join(" • ")}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-3 rounded-full bg-white dark:bg-neutral-900 border shadow-sm">
              <Bell className="h-5 w-5" />
            </button>
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">
              AS
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {/* Stats Cards */}
          <div className="bg-white dark:bg-neutral-900 p-6 rounded-3xl shadow-sm border">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-950 rounded-2xl">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-3xl font-semibold">12</p>
                <p className="text-sm text-neutral-500">Consultas hoje</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-neutral-900 p-6 rounded-3xl shadow-sm border">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-emerald-100 dark:bg-emerald-950 rounded-2xl">
                <Users className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-3xl font-semibold">47</p>
                <p className="text-sm text-neutral-500">Pacientes este mês</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-neutral-900 p-6 rounded-3xl shadow-sm border">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-amber-100 dark:bg-amber-950 rounded-2xl">
                <Clock className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <p className="text-3xl font-semibold">3</p>
                <p className="text-sm text-neutral-500">Em espera</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-neutral-900 p-6 rounded-3xl shadow-sm border">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 dark:bg-purple-950 rounded-2xl">
                <FileText className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-3xl font-semibold">8</p>
                <p className="text-sm text-neutral-500">Prescrições hoje</p>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="bg-white dark:bg-neutral-900 rounded-3xl p-8 shadow-sm">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
            <Stethoscope className="h-6 w-6" /> Próximas Consultas
          </h2>
          {/* Add appointment list here later */}
          <p className="text-neutral-500 italic">Nenhuma consulta agendada para as próximas horas.</p>
        </div>
      </div>
    </div>
  );
}