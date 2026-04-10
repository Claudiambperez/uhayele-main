"use client";
import { FileText, CheckCircle2, Clock } from 'lucide-react';
import { format } from 'date-fns';

interface PrescriptionItem {
  name: string;
  description?: string;
  quantity: number;
}

interface Prescription {
  id: string;
  doctorName: string;
  createdAt: Date;
  items: PrescriptionItem[];
  isSigned: boolean;
  appointmentType: string;
}

interface PrescriptionCardProps {
  prescription: Prescription;
}

export function PrescriptionCard({ prescription }: PrescriptionCardProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-5 hover:border-primary/30 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3">
          <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <FileText className="size-5 text-primary" />
          </div>
          <div>
            <h4 className="text-foreground mb-1">Prescription #{prescription.id.slice(0, 8)}</h4>
            <p className="text-sm text-muted-foreground"> {prescription.doctorName}</p>
          </div>
        </div>
   
      </div>

      <div className="space-y-2 mb-4">
        {prescription.items.map((item, idx) => (
          <div key={idx} className="flex items-start justify-between py-2 border-b border-border last:border-0">
            <div>
              <p className="text-sm text-foreground">{item.name}</p>
              {item.description && (
                <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
              )}
            </div>
            <span className="text-sm text-muted-foreground">Qtd: {item.quantity}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{prescription.appointmentType}</span>
        <span>{format(prescription.createdAt, 'MMM d, yyyy')}</span>
      </div>
    </div>
  );
}
