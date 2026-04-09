"use client";
import { useState } from 'react';
import { Search, User, Clock, Phone, Mail, FileText, DollarSign } from 'lucide-react';
import { format, isBefore, startOfDay, isAfter, isSameDay } from 'date-fns';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type ViewType = 'today' | 'week' | 'month';

interface Appointment {
  id: string;
  patientName: string;
  patientId: string;
  phone: string;
  email: string;
  time: string;
  date: Date;
  type: string;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  diagnosis?: string;
  notes?: string;
  prescriptions?: string;
}

// Mock appointments data - Updated to Angolan context
const mockAppointments: Appointment[] = [
  // Upcoming appointments
  {
    id: '1',
    patientName: 'João Manuel',
    patientId: 'P12345',
    phone: '+244 923 456 789',
    email: 'joao.m@uhayele.ao',
    time: '09:00',
    date: new Date(2026, 3, 8),
    type: 'Retorno ',
    status: 'confirmed'
  },
  {
    id: '2',
    patientName: 'Maria Clara Santos',
    patientId: 'P12346',
    phone: '+244 923 123 456',
    email: 'maria.s@uhayele.ao',
    time: '10:30',
    date: new Date(2026, 3, 9),
    type: 'Seguimento',
    status: 'confirmed'
  },
  {
    id: '3',
    patientName: 'António Ferreira',
    patientId: 'P12347',
    phone: '+244 923 789 012',
    email: 'antonio.f@uhayele.ao',
    time: '14:00',
    date: new Date(2026, 3, 7),
    type: 'Primeira Consulta',
    status: 'confirmed'
  },
  {
    id: '4',
    patientName: 'Isabel Costa',
    patientId: 'P12348',
    phone: '+244 923 234 567',
    email: 'isabel.c@uhayele.ao',
    time: '11:00',
    date: new Date(2026, 3, 10),
    type: 'Retorno',
    status: 'pending'
  },
  {
    id: '5',
    patientName: 'Pedro dos Santos',
    patientId: 'P12349',
    phone: '+244 923 345 678',
    email: 'pedro.s@uhayele.ao',
    time: '15:30',
    date: new Date(2026, 3, 11),
    type: 'Consulta Inicial',
    status: 'confirmed'
  },
  // Past appointments
  {
    id: '6',
    patientName: 'Ana Luísa Mendes',
    patientId: 'P12350',
    phone: '+244 923 456 123',
    email: 'ana.m@uhayele.ao',
    time: '09:30',
    date: new Date(2026, 3, 4),
    type: 'Seguimento',
    status: 'completed',
    diagnosis: 'Hipertensão - bem controlada',
    notes: 'Pressão arterial estável. Manter medicação atual.',
    prescriptions: 'Losartan 50mg diário'
  },
  {
    id: '7',
    patientName: 'Manuel Pereira',
    patientId: 'P12351',
    phone: '+244 923 567 890',
    email: 'manuel.p@uhayele.ao',
    time: '11:00',
    date: new Date(2026, 3, 3),
    type: 'Segimento',
    status: 'completed',
    diagnosis: 'Exame de rotina - saudável',
    notes: 'Todos os sinais vitais normais. Recomendado rastreio anual.',
    prescriptions: 'Nenhum'
  },
  {
    id: '8',
    patientName: 'Luísa Oliveira',
    patientId: 'P12352',
    phone: '+244 923 678 901',
    email: 'luisa.o@uhayele.ao',
    time: '14:00',
    date: new Date(2026, 3, 2),
    type: 'Consulta Especializada',
    status: 'completed',
    diagnosis: 'Diabetes Tipo 2',
    notes: 'Iniciado plano de controlo de diabetes. Aconselhamento nutricional.',
    prescriptions: 'Metformina 500mg duas vezes ao dia'
  },
  {
    id: '9',
    patientName: 'Carlos Silva',
    patientId: 'P12353',
    phone: '+244 923 789 234',
    email: 'carlos.s@uhayele.ao',
    time: '10:00',
    date: new Date(2026, 3, 1),
    type: 'Seguimento',
    status: 'completed',
    diagnosis: 'Gestão de enxaqueca',
    notes: 'Sintomas melhorados. Continuar monitorização.',
    prescriptions: 'Sumatriptano 50mg quando necessário'
  },
  {
    id: '10',
    patientName: 'Sofia Rodrigues',
    patientId: 'P12354',
    phone: '+244 923 890 345',
    email: 'sofia.r@uhayele.ao',
    time: '15:00',
    date: new Date(2026, 2, 30),
    type: 'Consulta Inicial',
    status: 'completed',
    diagnosis: 'Adulto saudável',
    notes: 'Exame físico completo. Todos os testes normais.',
    prescriptions: 'Multivitamínico diário'
  },
  {
    id: '11',
    patientName: 'José Eduardo',
    patientId: 'P12355',
    phone: '+244 923 901 456',
    email: 'jose.e@uhayele.ao',
    time: '13:30',
    date: new Date(2026, 2, 28),
    type: 'Retorno',
    status: 'completed',
    diagnosis: 'Transtorno de ansiedade',
    notes: 'Referência para terapia iniciada.',
    prescriptions: 'Sertralina 25mg diário'
  },
  {
    id: '12',
    patientName: 'Teresa Neto',
    patientId: 'P12356',
    phone: '+244 923 012 567',
    email: 'teresa.n@uhayele.ao',
    time: '09:00',
    date: new Date(2026, 2, 27),
    type: 'Consulta Inicial',
    status: 'completed',
    diagnosis: 'Gestão de colesterol',
    notes: 'Níveis de LDL elevados. Iniciada estatina.',
    prescriptions: 'Atorvastatina 20mg diário'
  },
  {
    id: '13',
    patientName: 'Paulo André',
    patientId: 'P12357',
    phone: '+244 923 123 678',
    email: 'paulo.a@uhayele.ao',
    time: '16:00',
    date: new Date(2026, 2, 25),
    type: 'Seguimento',
    status: 'cancelled'
  }
];

export default function App() {
 
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');


  const today = startOfDay(new Date());

  const upcomingAppointments = mockAppointments.filter(apt =>
    isAfter(apt.date, today) || isSameDay(apt.date, today)
  );

  const pastAppointments = mockAppointments.filter(apt =>
    isBefore(apt.date, today) && apt.status === 'completed'
  );

  const filteredUpcomingAppointments = upcomingAppointments.filter(apt =>
    apt.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    apt.patientId.toLowerCase().includes(searchQuery.toLowerCase()) 

  );

  const filteredPastAppointments = pastAppointments.filter(apt =>
    apt.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    apt.patientId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (apt.diagnosis && apt.diagnosis.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const todayAppointments = mockAppointments.filter(apt => isSameDay(apt.date, new Date()));
  const totalPatients = new Set(mockAppointments.map(apt => apt.patientId)).size;
  const completedThisMonth = mockAppointments.filter(apt =>
    apt.date.getMonth() === new Date().getMonth() &&
    apt.date.getFullYear() === new Date().getFullYear() &&
    apt.status === 'completed'
  ).length;

  return (
    <div className="min-h-screen bg-zinc-50 p-6">
      <div className="max-w-[1600px] mx-auto">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-gray-200 bg-white shadow-sm">
              <FileText className="h-6 w-6 text-zinc-900" />
            </div>
            <div>
              <h1 className="text-3xl font-semibold text-gray-900">Histórico de Consultas</h1>
              <p className="text-zinc-500">Visualize todas as suas consultas passadas</p>
            </div>
          </div>
        </div>

        {/* FILTERS */}
        <Card className="border border-gray-200 mb-6">
          <CardContent className="p-3 md:p-4">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <Input
                placeholder={`Pesquisar ${activeTab === 'upcoming' ? 'consultas futuras' : 'consultas passadas'} por nome, ID${activeTab === 'past' ? ', ou diagnóstico' : ''}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-10 rounded-2xl bg-zinc-50 border-gray-200 focus:border-violet-300"
              />
            </div>

          </CardContent>
        </Card>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Left Column - Appointments List */}
          <div className="xl:col-span-2">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6">
              {/* Tabs */}
              <div className="flex items-center gap-2 mb-6">
                <button
                  onClick={() => setActiveTab('upcoming')}
                  className={`flex-1 py-3 px-6 rounded-2xl font-medium transition-all ${
                    activeTab === 'upcoming'
                      ? 'bg-zinc-900 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Consultas Futuras ({upcomingAppointments.length})
                </button>
                <button
                  onClick={() => setActiveTab('past')}
                  className={`flex-1 py-3 px-6 rounded-2xl font-medium transition-all ${
                    activeTab === 'past'
                      ? 'bg-zinc-900 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Consultas Passadas ({pastAppointments.length})
                </button>
              </div>

              {/* Appointments List */}
              <div className="space-y-3 max-h-[700px] overflow-y-auto pr-2">
                {activeTab === 'upcoming' ? (
                  filteredUpcomingAppointments.length === 0 ? (
                    <div className="text-center py-12 text-zinc-400">
                      <FileText className="w-16 h-16 mx-auto mb-3 opacity-50" />
                      <p className="text-lg">Nenhuma consulta futura encontrada</p>
                    </div>
                  ) : (
                    filteredUpcomingAppointments.map((appointment) => (
                      <div
                        key={appointment.id}
                        onClick={() => setSelectedAppointment(appointment)}
                        className={`border rounded-2xl p-5 hover:shadow-sm transition-all cursor-pointer ${
                          selectedAppointment?.id === appointment.id
                            ? 'border-violet-500 bg-violet-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="bg-zinc-100 p-2.5 rounded-2xl">
                              <User className="w-5 h-5 text-zinc-600" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900 text-lg">{appointment.patientName}</h3>
                              <p className="text-sm text-zinc-500">{appointment.patientId}</p>
                            </div>
                          </div>
                          <span
                            className={`text-xs px-3 py-1 rounded-2xl font-medium ${
                              appointment.status === 'confirmed'
                                ? 'bg-emerald-100 text-emerald-700'
                                : appointment.status === 'pending'
                                ? 'bg-amber-100 text-amber-700'
                                : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {appointment.status === 'confirmed' ? 'Confirmada' : 
                             appointment.status === 'pending' ? 'Pendente' : appointment.status}
                          </span>
                        </div>

                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2 text-zinc-600">
                            <Clock className="w-4 h-4" />
                            <span>{appointment.time} - {format(appointment.date, 'EEEE, dd MMMM yyyy', { locale: undefined })}</span>
                          </div>
                          <div className="pt-2 border-t border-gray-100">
                            <span className="text-sm font-medium text-zinc-700">{appointment.type}</span>
                          </div>
                        </div>
                      </div>
                    ))
                  )
                ) : (
                  filteredPastAppointments.length === 0 ? (
                    <div className="text-center py-12 text-zinc-400">
                      <FileText className="w-16 h-16 mx-auto mb-3 opacity-50" />
                      <p className="text-lg">Nenhuma consulta passada encontrada</p>
                    </div>
                  ) : (
                    filteredPastAppointments.map((appointment) => (
                      <div
                        key={appointment.id}
                        onClick={() => setSelectedAppointment(appointment)}
                        className={`border rounded-2xl p-5 hover:shadow-sm transition-all cursor-pointer ${
                          selectedAppointment?.id === appointment.id
                            ? 'border-violet-500 bg-violet-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="bg-emerald-100 p-2.5 rounded-2xl">
                              <User className="w-5 h-5 text-emerald-600" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900 text-lg">{appointment.patientName}</h3>
                              <p className="text-sm text-zinc-500">{appointment.patientId}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-zinc-600">{format(appointment.date, 'dd MMM yyyy')}</div>
                            <div className="text-xs text-zinc-400">{appointment.time}</div>
                          </div>
                        </div>

                        {appointment.diagnosis && (
                          <div className="bg-zinc-50 rounded-2xl p-3 mb-3">
                            <div className="text-xs font-medium text-zinc-500 mb-1">Diagnóstico</div>
                            <div className="text-sm text-zinc-700">{appointment.diagnosis}</div>
                          </div>
                        )}

                        {appointment.notes && (
                          <div className="text-sm text-zinc-600 mb-3 line-clamp-2">
                            <span className="font-medium">Notas:</span> {appointment.notes}
                          </div>
                        )}

                        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                          <span className="text-sm font-medium text-zinc-700">{appointment.type}</span>
                          <span className="text-xs text-zinc-400">Clique para ver detalhes completos</span>
                        </div>
                      </div>
                    ))
                  )
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Appointment Details */}
          <div className="xl:col-span-1">
            {selectedAppointment ? (
              <div className="bg-white border border-gray-200 rounded-3xl h-[520px] w-[360px] flex flex-col overflow-hidden">
                <div className="px-6 py-5 border-b flex gap-2 items-center justify-between flex-shrink-0">
                  <h2 className="text-lg font-semibold text-gray-900">Detalhes da Consulta</h2>
                  <button
                    onClick={() => setSelectedAppointment(null)}
                    className="text-sm text-zinc-500 hover:text-zinc-700 font-medium"
                  >
                    Fechar
                  </button>
                </div>

                <div className="flex-1 p-6 overflow-y-auto">
                  {/* Patient Info */}
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`${
                        selectedAppointment.status === 'completed' ? 'bg-emerald-100' : 'bg-zinc-100'
                      } p-3 rounded-2xl`}>
                        <User className={`w-6 h-6 ${
                          selectedAppointment.status === 'completed' ? 'text-emerald-600' : 'text-zinc-600'
                        }`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">{selectedAppointment.patientName}</h3>
                        <p className="text-sm text-zinc-500">{selectedAppointment.patientId}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-zinc-600">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">{selectedAppointment.time} - {format(selectedAppointment.date, 'dd/MM/yyyy')}</span>
                      </div>
                      <div className="flex items-center gap-2 text-zinc-600">
                        <Phone className="w-4 h-4" />
                        <span className="text-sm">{selectedAppointment.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-zinc-600">
                        <Mail className="w-4 h-4" />
                        <span className="text-sm">{selectedAppointment.email}</span>
                      </div>
                    </div>
                  </div>

                  {/* Appointment Type & Status */}
                  <div className="mb-6 pb-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs text-zinc-500 mb-1">Tipo de Consulta</div>
                        <div className="font-semibold text-gray-900">{selectedAppointment.type}</div>
                      </div>
                      <span
                        className={`text-xs px-3 py-1 rounded-2xl font-medium ${
                          selectedAppointment.status === 'confirmed'
                            ? 'bg-emerald-100 text-emerald-700'
                            : selectedAppointment.status === 'pending'
                            ? 'bg-amber-100 text-amber-700'
                            : selectedAppointment.status === 'completed'
                            ? 'bg-zinc-100 text-zinc-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {selectedAppointment.status === 'confirmed' ? 'Confirmada' : 
                         selectedAppointment.status === 'pending' ? 'Pendente' : 
                         selectedAppointment.status === 'completed' ? 'Concluída' : 'Cancelada'}
                      </span>
                    </div>
                  </div>

                  {/* Clinical Information (for completed appointments) */}
                  {selectedAppointment.status === 'completed' && (
                    <div className="space-y-4">
                      {selectedAppointment.diagnosis && (
                        <div>
                          <div className="text-xs font-medium text-zinc-500 mb-2">Diagnóstico</div>
                          <div className="bg-zinc-50 rounded-2xl p-4">
                            <p className="text-sm text-zinc-700">{selectedAppointment.diagnosis}</p>
                          </div>
                        </div>
                      )}

                      {selectedAppointment.notes && (
                        <div>
                          <div className="text-xs font-medium text-zinc-500 mb-2">Notas Clínicas</div>
                          <div className="bg-zinc-50 rounded-2xl p-4">
                            <p className="text-sm text-zinc-700">{selectedAppointment.notes}</p>
                          </div>
                        </div>
                      )}

                      {selectedAppointment.prescriptions && (
                        <div>
                          <div className="text-xs font-medium text-zinc-500 mb-2">Prescrições</div>
                          <div className="bg-emerald-50 rounded-2xl p-4">
                            <p className="text-sm text-zinc-700">{selectedAppointment.prescriptions}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Actions for upcoming appointments */}
                {selectedAppointment.status !== 'completed' && (
                  <div className="p-6 border-t bg-white flex-shrink-0 space-y-2">
                    <button className="w-full bg-zinc-900 text-white py-3 rounded-2xl font-medium hover:bg-black transition-colors">
                      Iniciar Consulta
                    </button>
                    <button className="w-full bg-zinc-100 text-zinc-700 py-3 rounded-2xl font-medium hover:bg-zinc-200 transition-colors">
                      Reagendar
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white border border-gray-200 rounded-3xl h-[420px]  flex flex-col items-center justify-center text-center p-8">
                <div className="text-center py-12 text-zinc-400">
                  <User className="w-16 h-16 mx-auto mb-3 opacity-50" />
                  <p className="text-lg">Selecione uma consulta</p>
                  <p className="text-sm mt-1">Clique em qualquer consulta para ver detalhes</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}