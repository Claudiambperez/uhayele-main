"use client";

import React from "react";
import Link from "next/link";
import { Clock, TrendingUp } from "lucide-react";

const monthlyStats = {
  consultationsDone: 47,
  attendanceRate: "92%",
  averageRating: "4.8",
};

const recentActivities = [
  {
    id: 1,
    message: "Prescrição enviada para",
    patient: "Maria Costa",
    time: "Há 2 horas",
    link: "/dashboard/doctor/prescriptions/123",
  },
  {
    id: 2,
    message: "Consulta concluída com",
    patient: "Pedro Silva",
    time: "Há 5 horas",
    link: "/dashboard/doctor/history/456",
  },
  {
    id: 3,
    message: "Exame solicitado para",
    patient: "Ana Ferreira",
    time: "Ontem • 14:20",
    link: "/dashboard/doctor/exams/789",
  },
];

export default function DoctorSidebarWidgets() {
  return (
    <div className="space-y-5">
      {/* Resumo do Mês - Elegant & Compact */}
      <div className="border border-gray-200 bg-white rounded-3xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2 bg-zinc-100 text-zinc-600 rounded-xl">
            <TrendingUp className="h-4 w-4" />
          </div>
          <h3 className="text-base font-semibold text-gray-900">Resumo do Mês</h3>
        </div>

        <div className="space-y-4 text-sm">
          <div className="flex justify-between">
            <span className="text-zinc-500">Consultas Realizadas</span>
            <span className="font-medium text-gray-900">{monthlyStats.consultationsDone}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-500">Taxa de Presença</span>
            <span className="font-medium text-emerald-600">{monthlyStats.attendanceRate}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-500">Avaliação Média</span>
            <span className="font-medium text-amber-500">{monthlyStats.averageRating} ★</span>
          </div>
        </div>
      </div>

      {/* Atividade Recente - Elegant & Compact */}
      <div className="border border-gray-200 bg-white rounded-3xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2 bg-zinc-100 text-zinc-600 rounded-xl">
            <Clock className="h-4 w-4" />
          </div>
          <h3 className="text-base font-semibold text-gray-900">Atividade Recente</h3>
        </div>

        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <Link
              key={activity.id}
              href={activity.link}
              className="group block p-3 -mx-3 rounded-2xl hover:bg-zinc-50 transition-colors"
            >
              <div className="flex gap-3">
                <div className="w-1.5 h-1.5 mt-2 bg-zinc-400 rounded-full flex-shrink-0 group-hover:bg-violet-500 transition-colors" />

                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-700 leading-tight">
                    {activity.message}{" "}
                    <span className="font-medium text-gray-900">{activity.patient}</span>
                  </p>
                  <p className="text-xs text-zinc-400 mt-1">{activity.time}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}