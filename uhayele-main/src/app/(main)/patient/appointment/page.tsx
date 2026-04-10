"use client";

import { useState } from 'react';
import { Video, Calendar, Clock, User, ExternalLink, AlertCircle } from 'lucide-react';
import { format, isToday, isFuture } from 'date-fns';
import { pt } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface VirtualAppointment {
  id: string;
  doctorName: string;
  dateTime: Date;
  platform: string;           // "Zoom", "Google Meet", "WhatsApp", etc.
  virtualLink: string | null;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
  notes?: string;
}

// Mock data - In real app, fetch from Prisma via API
const mockVirtualAppointments: VirtualAppointment[] = [
  {
    id: "VA-001",
    doctorName: "Dr. João Manuel Mendes",
    dateTime: new Date(2026, 3, 10, 10, 0),   // 10 April 2026, 10:00
    platform: "Zoom",
    virtualLink: "https://zoom.us/j/1234567890?pwd=abc123",
    status: "Scheduled",
    notes: "Consulta de seguimento de hipertensão"
  },
  {
    id: "VA-002",
    doctorName: "Dr. João Manuel Mendes",
    dateTime: new Date(2026, 3, 5, 15, 30),   // Past
    platform: "Google Meet",
    virtualLink: "https://meet.google.com/xyz-abc-def",
    status: "Completed",
    notes: "Avaliação inicial"
  },
  {
    id: "VA-003",
    doctorName: "Dr. Ana Paula Costa",
    dateTime: new Date(2026, 3, 12, 9, 0),
    platform: "WhatsApp Video",
    virtualLink: null,   // Not generated yet
    status: "Scheduled",
    notes: "Controlo de diabetes"
  }
];

export default function VirtualAppointmentsPage() {
  const [appointments] = useState(mockVirtualAppointments);

  const upcoming = appointments.filter(a => isFuture(a.dateTime) && a.status === 'Scheduled');
  const past = appointments.filter(a => !isFuture(a.dateTime) || a.status === 'Completed');

  const canJoin = (appt: VirtualAppointment) => {
    if (appt.status !== 'Scheduled') return false;
    if (!appt.virtualLink) return false;
    
    // Allow joining 15 minutes before
    const now = new Date();
    const appointmentTime = new Date(appt.dateTime);
    const diffMinutes = (appointmentTime.getTime() - now.getTime()) / (1000 * 60);
    
    return diffMinutes <= 15 && diffMinutes >= -30; // 15 min before to 30 min after
  };

  const handleJoin = (link: string) => {
    window.open(link, '_blank');
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-900">Consultas Virtuais</h1>
        <p className="text-gray-500 mt-2">Acompanhe e participe das suas consultas online</p>
      </div>

      {/* Upcoming Virtual Appointments */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Video className="w-5 h-5 text-emerald-600" />
          Próximas Consultas Virtuais
        </h2>

        {upcoming.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Video className="w-12 h-12 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">Não tem consultas virtuais agendadas no momento.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {upcoming.map((appt) => {
              const isJoinable = canJoin(appt);
              return (
                <Card key={appt.id} className="overflow-hidden">
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{appt.doctorName}</CardTitle>
                        <p className="text-sm text-gray-500 mt-1">{appt.notes}</p>
                      </div>
                      <Badge variant="outline" className="bg-emerald-50 text-emerald-700">
                        Virtual
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="flex flex-wrap gap-x-8 gap-y-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span>{format(appt.dateTime, "dd 'de' MMMM yyyy", { locale: pt })}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span>{format(appt.dateTime, "HH:mm")}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500">Plataforma:</span>
                        <span className="font-medium">{appt.platform}</span>
                      </div>
                    </div>

                    <div className="mt-6">
                      {isJoinable && appt.virtualLink ? (
                        <Button 
                          onClick={() => handleJoin(appt.virtualLink!)}
                          className="w-full bg-emerald-600 hover:bg-emerald-700"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Entrar na Consulta Virtual
                        </Button>
                      ) : appt.virtualLink ? (
                        <Button disabled className="w-full">
                          Entrar na Consulta (Disponível 15 min antes)
                        </Button>
                      ) : (
                        <div className="text-amber-600 text-sm flex items-center gap-2">
                          <AlertCircle className="w-4 h-4" />
                          Link ainda não foi gerado pelo médico
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* Past Virtual Appointments */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Histórico de Consultas Virtuais</h2>
        
        <div className="space-y-3">
          {past.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Ainda não tem histórico de consultas virtuais.</p>
          ) : (
            past.map((appt) => (
              <Card key={appt.id}>
                <CardContent className="p-5">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{appt.doctorName}</p>
                      <p className="text-sm text-gray-500">
                        {format(appt.dateTime, "dd MMMM yyyy 'às' HH:mm", { locale: pt })} • {appt.platform}
                      </p>
                    </div>
                    <Badge variant="secondary">
                      {appt.status === 'Completed' ? 'Concluída' : 'Cancelada'}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}