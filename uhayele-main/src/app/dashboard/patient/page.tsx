// app/dashboard/patient/page.tsx
"use client";

import React from "react";
import { Calendar, Clock, FileText, Heart, Bell } from "lucide-react";

export default function PatientDashboard() {
  const patient = {
    firstName: "João",
    lastName: "Manuel",
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-neutral-950 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold text-neutral-900 dark:text-white">
              Olá, {patient.firstName}!
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400 mt-1">
              Aqui está o resumo da sua saúde
            </p>
          </div>
          <button className="p-3 rounded-full bg-white dark:bg-neutral-900 border shadow-sm">
            <Bell className="h-5 w-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white dark:bg-neutral-900 p-6 rounded-3xl shadow-sm border">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-100 dark:bg-red-950 rounded-2xl">
                <Heart className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-3xl font-semibold">Próxima consulta</p>
                <p className="text-sm text-neutral-500">15 Abr • 10:30 • Cardiologia</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-neutral-900 p-6 rounded-3xl shadow-sm border">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-950 rounded-2xl">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-3xl font-semibold">4</p>
                <p className="text-sm text-neutral-500">Prescrições ativas</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-neutral-900 p-6 rounded-3xl shadow-sm border">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-emerald-100 dark:bg-emerald-950 rounded-2xl">
                <Clock className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-3xl font-semibold">2</p>
                <p className="text-sm text-neutral-500">Exames pendentes</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white p-8 rounded-3xl text-left hover:brightness-105 transition-all">
            <Calendar className="h-10 w-10 mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Marcar Consulta</h3>
            <p className="opacity-90">Agende uma nova consulta rapidamente</p>
          </button>

          <button className="bg-white dark:bg-neutral-900 border p-8 rounded-3xl text-left hover:shadow-md transition-all">
            <FileText className="h-10 w-10 mb-4 text-neutral-700" />
            <h3 className="text-2xl font-semibold mb-2">Ver Prontuário</h3>
            <p className="text-neutral-600 dark:text-neutral-400">Aceda ao seu histórico clínico completo</p>
          </button>
        </div>
      </div>
    </div>
  );
}

