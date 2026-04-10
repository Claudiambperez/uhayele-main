"use client";

import React, { useState, useMemo } from 'react';
import { format, isBefore, startOfDay, isAfter, isSameDay } from 'date-fns';
import { pt } from 'date-fns/locale';
import { 
  Calendar, 
  Clock, 
  User, 
  Search, 
  CheckCircle, 
  AlertCircle,
  ArrowRight 
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type ViewType = 'upcoming' | 'past';

interface Appointment {
  id: string;
  doctorName: string;
  time: string;
  date: Date;
  type: string;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  diagnosis?: string;
  notes?: string;
  prescriptions?: string;
}

// Mock data from patient's perspective
const mockMyAppointments: Appointment[] = [
  {
    id: '1',
    doctorName: 'Dr. João Manuel Mendes',
    time: '09:00',
    date: new Date(2026, 3, 8),
    type: 'Retorno',
    status: 'confirmed'
  },
  {
    id: '2',
    doctorName: 'Dr. Ana Paula Costa',
    time: '10:30',
    date: new Date(2026, 3, 9),
    type: 'Seguimento',
    status: 'confirmed'
  },
  {
    id: '3',
    doctorName: 'Dr. João Manuel Mendes',
    time: '14:00',
    date: new Date(2026, 3, 7),
    type: 'Primeira Consulta',
    status: 'confirmed'
  },
  {
    id: '4',
    doctorName: 'Dr. Maria Silva',
    time: '11:00',
    date: new Date(2026, 3, 10),
    type: 'Retorno',
    status: 'pending'
  },
  // Past appointments
  {
    id: '5',
    doctorName: 'Dr. João Manuel Mendes',
    time: '09:30',
    date: new Date(2026, 3, 4),
    type: 'Seguimento',
    status: 'completed',
    diagnosis: 'Hipertensão - bem controlada',
    notes: 'Pressão arterial estável. Manter medicação atual.',
    prescriptions: 'Losartan 50mg diário'
  },
  {
    id: '6',
    doctorName: 'Dr. Ana Paula Costa',
    time: '11:00',
    date: new Date(2026, 3, 3),
    type: 'Consulta Inicial',
    status: 'completed',
    diagnosis: 'Diabetes Tipo 2',
    notes: 'Iniciado plano de controlo glicémico.',
    prescriptions: 'Metformina 850mg 2x/dia'
  },
];

export default function MyAppointments() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

  const today = startOfDay(new Date());

  const upcomingAppointments = mockMyAppointments.filter(apt =>
    isAfter(apt.date, today) || isSameDay(apt.date, today)
  );

  const pastAppointments = mockMyAppointments.filter(apt =>
    isBefore(apt.date, today) && apt.status === 'completed'
  );

  const filteredUpcoming = useMemo(() => 
    upcomingAppointments.filter(apt =>
      apt.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.type.toLowerCase().includes(searchQuery.toLowerCase())
    ), [searchQuery, upcomingAppointments]
  );

  const filteredPast = useMemo(() => 
    pastAppointments.filter(apt =>
      apt.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (apt.diagnosis && apt.diagnosis.toLowerCase().includes(searchQuery.toLowerCase()))
    ), [searchQuery, pastAppointments]
  );

  return (
    <div className="min-h-screen bg-zinc-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white border border-zinc-600 shadow-sm">
            <Calendar className="w-6 h-6 text-zinc-600" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Minhas Consultas</h1>
            <p className="text-zinc-600">Acompanhe suas consultas passadas e futuras</p>
          </div>
        </div>

        {/* Search */}
        <Card className="mb-8">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <Input
                placeholder="Pesquisar por médico ou tipo de consulta..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-11 h-12"
              />
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Appointments List */}
          <div className="lg:col-span-7">
            <Card>
              <CardHeader>
                <div className="flex gap-2">
                  <Button
                    onClick={() => setActiveTab('upcoming')}
                    className={`flex-1 p-6 rounded-xl font-medium transition-all ${
                      activeTab === 'upcoming'
                        ? 'bg-zinc-900 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Próximas Consultas ({upcomingAppointments.length})
                  </Button>
                  <Button
                    onClick={() => setActiveTab('past')}
                    className={`flex-1 p-6 rounded-xl font-medium transition-all ${
                      activeTab === 'past'
                        ? 'bg-zinc-900 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Consultas Passadas ({pastAppointments.length})
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="p-6">
                <div className="space-y-4 max-h-[680px] overflow-y-auto pr-2">
                  {activeTab === 'upcoming' ? (
                    filteredUpcoming.length === 0 ? (
                      <div className="text-center py-12 text-zinc-500">
                        <Calendar className="w-12 h-12 mx-auto mb-3 opacity-40" />
                        <p>Nenhuma consulta futura encontrada</p>
                      </div>
                    ) : (
                      filteredUpcoming.map((apt) => (
                        <div
                          key={apt.id}
                          onClick={() => setSelectedAppointment(apt)}
                          className={`border rounded-2xl p-5 hover:shadow-md transition-all cursor-pointer ${
                            selectedAppointment?.id === apt.id 
                              ? "border-emerald-500 bg-emerald-50" 
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold text-lg">{apt.doctorName}</h3>
                              <p className="text-sm text-zinc-600 mt-1">{apt.type}</p>
                            </div>
                            <div className="text-right">
                              <div className="font-medium">{apt.time}</div>
                              <div className="text-xs text-zinc-500">
                                {format(apt.date, "dd 'de' MMMM", { locale: pt })}
                              </div>
                            </div>
                          </div>

                          <div className="mt-4 flex items-center gap-2 text-xs">
                            <div className={`px-3 py-1 rounded-full font-medium ${
                              apt.status === 'confirmed' 
                                ? 'bg-emerald-100 text-emerald-700' 
                                : 'bg-amber-100 text-amber-700'
                            }`}>
                              {apt.status === 'confirmed' ? 'Confirmada' : 'Pendente'}
                            </div>
                          </div>
                        </div>
                      ))
                    )
                  ) : (
                    filteredPast.length === 0 ? (
                      <div className="text-center py-12 text-zinc-500">
                        <Calendar className="w-12 h-12 mx-auto mb-3 opacity-40" />
                        <p>Nenhuma consulta passada encontrada</p>
                      </div>
                    ) : (
                      filteredPast.map((apt) => (
                        <div
                          key={apt.id}
                          onClick={() => setSelectedAppointment(apt)}
                          className={`border rounded-2xl p-5 hover:shadow-md transition-all cursor-pointer ${
                            selectedAppointment?.id === apt.id 
                              ? "border-emerald-500 bg-emerald-50" 
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <div className="flex justify-between">
                            <div>
                              <h3 className="font-semibold">{apt.doctorName}</h3>
                              <p className="text-sm text-zinc-600">{apt.type}</p>
                            </div>
                            <div className="text-right text-sm">
                              {format(apt.date, "dd MMM yyyy", { locale: pt })}
                            </div>
                          </div>

                          {apt.diagnosis && (
                            <div className="mt-4 bg-zinc-50 p-3 rounded-2xl text-sm">
                              <span className="font-medium text-zinc-500">Diagnóstico: </span>
                              {apt.diagnosis}
                            </div>
                          )}
                        </div>
                      ))
                    )
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Details Sidebar */}
          <div className="xl:col-span-5">
            {selectedAppointment ? (
              <Card className="bg-white border border-gray-200 rounded-3xl h-[520px] w-[360px] flex flex-col overflow-hidden top-6">
               
                <CardHeader className='px-6 py-5 border-b flex gap-2 items-center justify-between flex-shrink-0'>
                  <CardTitle>Detalhes da Consulta</CardTitle>
                     <button
                    onClick={() => setSelectedAppointment(null)}
                    className="text-sm text-zinc-500 hover:text-zinc-700 font-medium"
                  >
                    Fechar
                  </button>
                </CardHeader>
                <CardContent className="flex-1 overflow-y-auto p-6 space-y-6">
                  <div>
                    <p className="text-zinc-500 text-sm">Médico</p>
                    <p className="font-semibold text-xl">{selectedAppointment.doctorName}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-zinc-500 text-sm">Data</p>
                      <p className="font-medium">
                        {format(selectedAppointment.date, "dd 'de' MMMM 'de' yyyy", { locale: pt })}
                      </p>
                    </div>
                    <div>
                      <p className="text-zinc-500 text-sm">Hora</p>
                      <p className="font-medium">{selectedAppointment.time}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-zinc-500 text-sm">Tipo de Consulta</p>
                    <p className="font-medium">{selectedAppointment.type}</p>
                  </div>

                  <div className={`inline-flex px-4 py-1 rounded-full text-sm font-medium ${
                    selectedAppointment.status === 'confirmed' 
                      ? 'bg-emerald-100 text-emerald-700' 
                      : selectedAppointment.status === 'pending'
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-zinc-100 text-zinc-700'
                  }`}>
                    {selectedAppointment.status === 'confirmed' ? 'Confirmada' : 
                     selectedAppointment.status === 'pending' ? 'Pendente' : 'Concluída'}
                  </div>

                  {selectedAppointment.status === 'completed' && (
                    <>
                      {selectedAppointment.diagnosis && (
                        <div>
                          <p className="text-zinc-500 text-sm mb-1">Diagnóstico</p>
                          <p className="bg-zinc-50 p-4 rounded-2xl text-sm">{selectedAppointment.diagnosis}</p>
                        </div>
                      )}

                      {selectedAppointment.notes && (
                        <div>
                          <p className="text-zinc-500 text-sm mb-1">Notas do Médico</p>
                          <p className="bg-zinc-50 p-4 rounded-2xl text-sm">{selectedAppointment.notes}</p>
                        </div>
                      )}
                    </>
                  )}

                  {/* Action Buttons for Upcoming */}
                  {selectedAppointment.status !== 'completed' && (
                    <div className="pt-4 space-y-3">
                      <Button className="w-full h-12 bg-zinc-900  hover:bg-black ">
                        Confirmar Presença
                      </Button>
                      <Button variant="outline" className="w-full h-12">
                        Reagendar Consulta
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card className="h-[420px]  w-[360px] flex items-center justify-center text-center border-dashed">
                <div>
                  <Calendar className="w-12 h-12 mx-auto mb-4 text-zinc-300" />
                  <p className="text-zinc-500">Selecione uma consulta</p>
                  <p className="text-sm text-zinc-400 mt-1">Clique em qualquer item para ver detalhes</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}