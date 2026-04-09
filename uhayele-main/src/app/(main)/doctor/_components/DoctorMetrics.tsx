"use client";

import React from "react";
import { Users2, Clock, FileText, Calendar, ArrowUpIcon, ArrowDownIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Real data structure - ready for database/API
const statsData = [
  {
    id: 1,
    label: "Consultas Hoje",
    value: "04",
    icon: Calendar,
    trend: "up",
    trendValue: "11%",
    trendLabel: "ontem",
    color: "violet",
  },
  {
    id: 2,
    label: "Pacientes Atendidos",
    value: "124",
    icon: Users2,
    trend: "up",
    trendValue: "8.4%",
    trendLabel: "este mês",
    color: "violet",
  },
  {
    id: 3,
    label: "Em Espera",
    value: "03",
    icon: Clock,
    trend: "down",
    trendValue: "2",
    trendLabel: "esta semana",
    color: "amber",
  },
  {
    id: 4,
    label: "Prescrições Hoje",
    value: "11",
    icon: FileText,
    trend: "down",
    trendValue: "2",
    trendLabel: "vs ontem",
    color: "teal",
  },
];

export default function DoctorMetrics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
      {statsData.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.id}
            className="bg-white border border-gray-200 dark:border-neutral-800 rounded-3xl p-5 hover:shadow-sm transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-zinc-500 text-xs font-medium">{stat.label}</p>
                <p className="text-3xl font-semibold text-zinc-900 mt-3">{stat.value}</p>
              </div>
              <div className="w-10 h-10 bg-zinc-100 text-zinc-600 rounded-2xl flex items-center justify-center">
                <Icon className="h-5 w-5" />
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2">
              {stat.trend === "up" ? (
                <Badge color="success" className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5">
                  <ArrowUpIcon className="h-3 w-3 mr-1" />
                  {stat.trendValue}
                </Badge>
              ) : (
                <Badge color="destructive" className="text-xs bg-red-100 text-red-700 px-2 py-0.5">
                  <ArrowDownIcon className="h-3 w-3 mr-1" />
                  {stat.trendValue}
                </Badge>
              )}
              <span className="text-xs text-zinc-500">{stat.trendLabel}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}