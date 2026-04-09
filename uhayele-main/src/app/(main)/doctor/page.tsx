"use client";

import React from "react";
import DoctorMetrics from "./_components/DoctorMetrics";
import UpcomingAppointments from "./_components/UpcomingAppointments";
import DoctorSidebarWidgets from "./_components/DoctorSidebarWidgets";
import { LayoutDashboard } from "lucide-react";

export default function DoctorDashboard() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-neutral-950 p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
             {/* Header */}
      <div className="flex flex-col gap-4 pb-12">
        <div className="flex items-start sm:items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-200 bg-white shadow-sm">
            <LayoutDashboard className="h-5 w-5 text-zinc-900" />
          </div>

          <div>
            <h1 className="text-2xl md:text-[28px] font-bold tracking-tight text-zinc-950">
               Visão Geral
            </h1>
            <p className="text-sm text-zinc-500">
            Últimas actualizações  e insights do seu consultório
            </p>
          </div>
        </div>

       
      </div>

        {/* Metrics / Stats Cards */}
        <DoctorMetrics />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Upcoming Appointments */}
          <div className="lg:col-span-8">
            <UpcomingAppointments />
          </div>

          {/* Sidebar Widgets */}
          <div className="lg:col-span-4 space-y-5">
            <DoctorSidebarWidgets />
          </div>
        </div>

      </div>
    </div>
  );
}