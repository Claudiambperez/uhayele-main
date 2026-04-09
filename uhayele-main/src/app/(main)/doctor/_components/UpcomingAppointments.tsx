"use client";

import React, { useState, useMemo } from "react";
import { Calendar, Search, Clock } from "lucide-react";
import { GooeyInput } from "@/components/ui/gooey-input";

const upcomingAppointments = [
  {
    id: 1,
    patientName: "João Manuel",
    patientId: "P12345",
    time: "14:30",
    date: "Quarta-feira, 8 de Abril, 2026",
    motive: "Check-up completo + análise de resultados de exames",
    status: "confirmed",
  },
  {
    id: 2,
    patientName: "Maria Clara Santos",
    patientId: "P12346",
    time: "09:00",
    date: "Quarta-feira, 8 de Abril, 2026",
    motive: "Sessão de terapia para gestão de ansiedade e burnout",
    status: "confirmed",
  },
  {
    id: 3,
    patientName: "António Ferreira",
    patientId: "P12347",
    time: "11:15",
    date: "Quinta-feira, 9 de Abril, 2026",
    motive: "Renovação de prescrição + ajuste de medicação atual",
    status: "pending",
  },
];

export default function UpcomingAppointments() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAppointments = useMemo(() => {
    if (!searchTerm.trim()) return upcomingAppointments;
    const term = searchTerm.toLowerCase();
    return upcomingAppointments.filter(app =>
      app.patientName.toLowerCase().includes(term) ||
      app.motive.toLowerCase().includes(term)
    );
  }, [searchTerm]);

  return (
    <div className="border border-gray-200 bg-white rounded-3xl p-6 shadow-sm">
      {/* Header - Kept as you requested */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-zinc-100 text-zinc-600 rounded-2xl">
            <Calendar className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Próximas Consultas</h2>
        </div>

        <div className="w-full sm:w-72">
          <GooeyInput
            placeholder="Pesquisar por nome ou motivo..."
            value={searchTerm}
            onValueChange={(value) => setSearchTerm(value)}
          />
        </div>
      </div>

      {/* Updated Card Layout - Matching your image style */}
      <div className="space-y-4">
        {filteredAppointments.length > 0 ? (
          filteredAppointments.map((appointment) => (
            <div
              key={appointment.id}
              className="bg-white border border-gray-100 hover:border-gray-200 rounded-2xl p-5 transition-all hover:shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <div className="w-10 h-10 bg-zinc-100 rounded-xl flex items-center justify-center text-zinc-600 font-medium flex-shrink-0">
                    {appointment.patientName.split(" ").map(n => n[0]).join("")}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3">
                      <p className="font-semibold text-gray-900 text-[17px]">
                        {appointment.patientName}
                      </p>
                      <span className="text-xs text-zinc-500 font-medium">
                        {appointment.patientId}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-zinc-500 mt-1">
                      <Clock className="h-4 w-4" />
                      <span>{appointment.time}</span>
                      <span className="text-zinc-300">•</span>
                      <span>{appointment.date}</span>
                    </div>

                    <p className="text-sm text-zinc-600 mt-3 line-clamp-2">
                      {appointment.motive}
                    </p>
                  </div>
                </div>

                {/* Status Badge */}
                <div className={`text-xs font-medium px-3 py-1 rounded-full whitespace-nowrap ${
                  appointment.status === "confirmed" 
                    ? "bg-emerald-100 text-emerald-700" 
                    : "bg-amber-100 text-amber-700"
                }`}>
                  {appointment.status === "confirmed" ? "Confirmado" : "Pendente"}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 text-zinc-500 text-sm">
            Nenhuma consulta encontrada.
          </div>
        )}
      </div>
    </div>
  );
}