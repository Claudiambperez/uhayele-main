"use client";

import React, { useState, useMemo, useCallback } from "react";
import {
  format,
  addMonths,
  subMonths,
  addWeeks,
  subWeeks,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
  isToday,
  isSameDay,
} from "date-fns";
import { pt } from "date-fns/locale";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  Search,
} from "lucide-react";
import { GoDotFill } from "react-icons/go";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

// Mock data
const allAppointments = [
  {
    id: 1,
    patientName: "João Manuel",
    date: new Date(2026, 3, 7),
    time: "09:00",
    motive: "Check-up completo + análise de exames",
    status: "confirmed" as const,
  },
  {
    id: 2,
    patientName: "Maria Clara Santos",
    date: new Date(2026, 3, 7),
    time: "10:30",
    motive: "Sessão de terapia para ansiedade",
    status: "confirmed" as const,
  },
  {
    id: 3,
    patientName: "António Ferreira",
    date: new Date(2026, 3, 8),
    time: "14:00",
    motive: "Renovação de prescrição",
    status: "pending" as const,
  },
  {
    id: 4,
    patientName: "Isabel Costa",
    date: new Date(2026, 3, 7),
    time: "15:30",
    motive: "Avaliação pós-operatória",
    status: "confirmed" as const,
  },
];

type ViewMode = "week" | "month";

export default function DoctorAppointments() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 3));
  const [selectedDate, setSelectedDate] = useState(new Date(2026, 3, 7));
  const [viewMode, setViewMode] = useState<ViewMode>("month");
  const [searchTerm, setSearchTerm] = useState("");

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const weekStart = startOfWeek(selectedDate, { weekStartsOn: 0 });
  const weekEnd = endOfWeek(selectedDate, { weekStartsOn: 0 });
  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });

  const visibleDays = viewMode === "month" ? monthDays : weekDays;

  const filteredAppointments = useMemo(() => {
    return allAppointments.filter((appt) => {
      const matchesDate = isSameDay(appt.date, selectedDate);
      const matchesSearch =
        appt.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appt.motive.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesDate && matchesSearch;
    });
  }, [selectedDate, searchTerm]);

  const dayAppointmentsCount = useMemo(() => {
    return allAppointments.filter((appt) => isSameDay(appt.date, selectedDate)).length;
  }, [selectedDate]);

  const totalInView = useMemo(() => {
    return allAppointments.filter((appt) =>
      visibleDays.some((day) => isSameDay(day, appt.date))
    ).length;
  }, [visibleDays]);

  const goToPrevious = useCallback(() => {
    if (viewMode === "month") {
      setCurrentMonth((prev) => subMonths(prev, 1));
    } else {
      setSelectedDate((prev) => subWeeks(prev, 1));
    }
  }, [viewMode]);

  const goToNext = useCallback(() => {
    if (viewMode === "month") {
      setCurrentMonth((prev) => addMonths(prev, 1));
    } else {
      setSelectedDate((prev) => addWeeks(prev, 1));
    }
  }, [viewMode]);

  const goToToday = useCallback(() => {
    const today = new Date();
    setSelectedDate(today);
    setCurrentMonth(today);
  }, []);

  const weekdays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  return (
    <div className="mx-auto max-w-7xl p-4 md:p-5 space-y-4">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="flex items-start sm:items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-200 bg-white shadow-sm">
            <CalendarIcon className="h-5 w-5 text-zinc-900" />
          </div>

          <div>
            <h1 className="text-2xl md:text-[28px] font-bold tracking-tight text-zinc-950">
              Minha Agenda
            </h1>
            <p className="text-sm text-zinc-500">
              Gerencie suas consultas e disponibilidade
            </p>
          </div>
        </div>

        {/* Top controls */}
        <Card className="border border-zinc-200 shadow-sm rounded-2xl">
          <CardContent className="p-3 md:p-4">
            <div className="flex flex-col gap-3">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                <Input
                  placeholder="Pesquisar paciente ou motivo..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="h-10 rounded-xl border-zinc-200 bg-zinc-50 pl-10 text-sm shadow-none focus-visible:ring-1 focus-visible:ring-zinc-300"
                />
              </div>

              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div className="inline-flex w-fit rounded-xl bg-zinc-100 p-1">
                  <button
                    type="button"
                    onClick={() => setViewMode("week")}
                    className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-all ${
                      viewMode === "week"
                        ? "bg-white text-zinc-950 shadow-sm"
                        : "text-zinc-500 hover:text-zinc-800"
                    }`}
                  >
                    Semana
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode("month")}
                    className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-all ${
                      viewMode === "month"
                        ? "bg-white text-zinc-950 shadow-sm"
                        : "text-zinc-500 hover:text-zinc-800"
                    }`}
                  >
                    Mês
                  </button>
                </div>

              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        {/* Calendar */}
        <Card className="xl:col-span-2 border border-zinc-200 shadow-sm rounded-2xl">
          <CardContent className="p-4 md:p-5">
            {/* Navigation */}
            <div className="mb-6 flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={goToPrevious}
                className="h-9 w-9 rounded-xl p-0 hover:bg-zinc-100"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <div className="text-center">
                <h2 className="text-xl md:text-2xl font-bold capitalize text-zinc-950">
                  {viewMode === "month"
                    ? format(currentMonth, "MMMM yyyy", { locale: pt })
                    : `${format(weekStart, "d MMM", { locale: pt })} - ${format(
                        weekEnd,
                        "d MMM yyyy",
                        { locale: pt }
                      )}`}
                </h2>
                <p className="mt-1 text-xs md:text-sm text-zinc-500">
                  {totalInView} consulta{totalInView !== 1 ? "s" : ""} neste{" "}
                  {viewMode === "month" ? "mês" : "período"}
                </p>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={goToNext}
                className="h-9 w-9 rounded-xl p-0 hover:bg-zinc-100"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Weekday labels */}
            <div className="mb-2 grid grid-cols-7 gap-2">
              {weekdays.map((day) => (
                <div
                  key={day}
                  className="py-1.5 text-center text-[11px] font-semibold uppercase tracking-wide text-zinc-500"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-2">
              {visibleDays.map((day) => {
                const dayAppointments = allAppointments.filter((a) =>
                  isSameDay(a.date, day)
                );
                const hasAppointment = dayAppointments.length > 0;
                const isSelected = isSameDay(day, selectedDate);
                const isCurrentToday = isToday(day);

                return (
                  <button
                    key={day.toString()}
                    type="button"
                    onClick={() => {
                      setSelectedDate(day);
                      if (viewMode === "month") setCurrentMonth(day);
                    }}
                    className={`group relative min-h-[82px] rounded-2xl border text-left transition-all duration-200 ${
                      isSelected
                        ? "border-zinc-800 bg-zinc-800 text-white shadow-sm"
                        : "border-zinc-200 bg-white hover:border-zinc-300 hover:shadow-sm"
                    }`}
                  >
                    <div className="flex h-full flex-col justify-between p-3">
                      <div className="flex items-start justify-between">
                        <span
                          className={`text-sm font-semibold ${
                            isSelected
                              ? "text-white"
                              : isCurrentToday
                              ? "text-zinc-950"
                              : "text-zinc-900"
                          }`}
                        >
                          {format(day, "d")}
                        </span>

                        {hasAppointment && (
                          <span
                            className={`rounded-full px-1.5 py-0.5 text-[10px] font-medium ${
                              isSelected
                                ? "bg-white/15 text-white"
                                : "bg-zinc-100 text-zinc-600"
                            }`}
                          >
                            {dayAppointments.length}
                          </span>
                        )}
                      </div>

                      <div className="flex items-end justify-between">
                        {hasAppointment ? (
                          <div
                            className={`flex items-center gap-1 text-[11px] ${
                              isSelected ? "text-white/90" : "text-zinc-500"
                            }`}
                          >
                            <GoDotFill className="h-2.5 w-2.5" />
                            <span>
                              consulta{dayAppointments.length > 1 ? "s" : ""}
                            </span>
                          </div>
                        ) : (
                          <span className="text-[11px] text-transparent">.</span>
                        )}

                        {isCurrentToday && !isSelected && (
                          <span className="rounded-full bg-zinc-800 px-1.5 py-0.5 text-[9px] font-medium text-white">
                            Hoje
                          </span>
                        )}
                      </div>
                    </div>

                    {hasAppointment && !isSelected && (
                      <div className="pointer-events-none absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-3 rounded-lg border border-zinc-200 bg-white px-2.5 py-1.5 text-[11px] text-zinc-700 opacity-0 shadow-md transition-all group-hover:opacity-100">
                        {dayAppointments.length} consulta
                        {dayAppointments.length > 1 ? "s" : ""}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Right panel */}
        <div className="space-y-4">
          <Card className="border border-zinc-200 shadow-sm rounded-2xl">
            <CardContent className="p-4 md:p-5">
              <div className="mb-4">
                <h3 className="text-lg md:text-xl font-bold uppercase tracking-tight text-zinc-950">
                  {format(selectedDate, "EEEE, dd 'de' MMMM", { locale: pt })}
                </h3>
                <p className="mt-1 text-sm text-zinc-500">
                  {dayAppointmentsCount} consulta
                  {dayAppointmentsCount !== 1 ? "s" : ""}
                </p>
              </div>

              <div className="max-h-[520px] space-y-3 overflow-auto pr-1">
                {filteredAppointments.length > 0 ? (
                  filteredAppointments.map((appt) => (
                    <div
                      key={appt.id}
                      className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm transition-all hover:shadow-md"
                    >
                      <div className="mb-3 flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h4 className="truncate text-[15px] font-medium text-zinc-900">
                            {appt.patientName}
                          </h4>
                          <p className="mt-1 line-clamp-2 text-sm font-normal text-zinc-600">
                            {appt.motive}
                          </p>
                        </div>

                        <Badge
                          className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium ${
                            appt.status === "confirmed"
                              ? "bg-emerald-500 text-white hover:bg-emerald-600"
                              : "bg-amber-500 text-white hover:bg-amber-600"
                          }`}
                        >
                          {appt.status === "confirmed" ? "Confirmado" : "Pendente"}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-2.5 border-t border-zinc-200 pt-3">
                        <div className="flex items-center gap-2 rounded-xl bg-zinc-50 px-3 py-2 text-sm text-zinc-700">
                          <Clock className="h-3.5 w-3.5 text-zinc-400" />
                          <span>{appt.time}</span>
                        </div>

                        <Button className="h-9 flex-1 rounded-xl bg-zinc-950 text-sm font-medium text-white hover:bg-zinc-800">
                          Iniciar
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-200 py-14 text-center">
                    <CalendarIcon className="mb-3 h-10 w-10 text-zinc-300" />
                    <p className="text-sm font-semibold text-zinc-900">
                      Nenhuma consulta
                    </p>
                    <p className="mt-1 text-xs text-zinc-500">
                      para esta data
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}