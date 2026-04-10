"use client";
import { Calendar, Clock, MapPin, User } from 'lucide-react';
import { format } from 'date-fns';

interface Appointment {
  id: string;
  doctorName: string;
  speciality: string;
  dateTime: Date;
  appointmentType: string;
  platform?: string;
  status: string;
  notes?: string;
}

interface AppointmentCardProps {
  appointment: Appointment;
}

export function AppointmentCard({ appointment }: AppointmentCardProps) {
    const STATUS_LABELS = {
  pt: {
    Scheduled: 'Agendada',
    Completed: 'Concluída',
    Cancelled: 'Cancelada',
    'In Progress': 'Em Andamento',
    Rescheduled: 'Reagendada',    // ✅ ADDED
    'Pending Approval': 'Pendente',
    'Payment Pending': 'Pagamento Pendente'
  }
};

const formatStatus = (status: string) => STATUS_LABELS.pt[status as keyof typeof STATUS_LABELS.pt] || status ;

  const statusColors = {
    Scheduled: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
    Completed: 'bg-green-500/10 text-green-600 border-green-500/20',
    Cancelled: 'bg-red-500/10 text-red-600 border-red-500/20',
    NoShow: 'bg-gray-500/10 text-gray-600 border-gray-500/20',
    ReScheduled: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20',
  };

  return (
    <div className="bg-card border border-border rounded-lg p-5 hover:border-primary/30 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-foreground mb-1">DR. {appointment.doctorName}</h3>
          <p className="text-sm text-muted-foreground">{appointment.speciality}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs border ${statusColors[appointment.status as keyof typeof statusColors] || statusColors.Scheduled}`}>
      {formatStatus(appointment.status)}

        </span>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="size-4" />
          <span>{format(appointment.dateTime, 'EEEE, MMMM d, yyyy')}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="size-4" />
          <span>{format(appointment.dateTime, 'h:mm a')}</span>
        </div>
        {appointment.platform && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="size-4" />
            <span>{appointment.platform}</span>
          </div>
        )}
      </div>

      <div className="mt-4 pt-4 border-t flex justify-between gap-4 border-border">
        <span className="text-xs text-muted-foreground">Tipo: {appointment.appointmentType}</span>
        <span className="text-xs text-muted-foreground">Notas: {appointment.notes ? appointment.notes : 'Nenhuma nota adicionada'}</span>
      </div>
    </div>
  );
}
