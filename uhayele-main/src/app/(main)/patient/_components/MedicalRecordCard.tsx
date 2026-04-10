"use client";
import { Heart, AlertCircle, Shield, Stethoscope } from 'lucide-react';
import { format } from 'date-fns';

interface MedicalRecord {
  id: string;
  bloodType?: string;
  allergy?: string;
  diagnosis?: string;
  treatment?: string;
  virtualVisitDate?: Date;
  doctorName: string;
  immunizations: Array<{
    type: string;
    dateAdministered: Date;
  }>;
}

interface MedicalRecordCardProps {
  record: MedicalRecord;
}

export function MedicalRecordCard({ record }: MedicalRecordCardProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-start justify-between mb-5">
        <div>
          <h3 className="text-foreground mb-1">Ficha Médica</h3>
          <p className="text-sm text-muted-foreground">Dr. {record.doctorName}</p>
        </div>
        {record.virtualVisitDate && (
          <span className="text-xs text-muted-foreground">
            {format(record.virtualVisitDate, 'MMM d, yyyy')}
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-5">
        {record.bloodType && (
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-lg bg-red-500/10 flex items-center justify-center">
              <Heart className="size-4 text-red-600" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Tipo Sanguíneo</p>
              <p className="text-sm text-foreground">{record.bloodType}</p>
            </div>
          </div>
        )}

        {record.allergy && (
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-lg bg-yellow-500/10 flex items-center justify-center">
              <AlertCircle className="size-4 text-yellow-600" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Alergia</p>
              <p className="text-sm text-foreground">{record.allergy}</p>
            </div>
          </div>
        )}
      </div>

      {record.diagnosis && (
        <div className="mb-4 pb-4 border-b border-border">
          <div className="flex items-start gap-2 mb-2">
            <Stethoscope className="size-4 text-primary mt-0.5" />
            <div className="flex-1">
              <p className="text-xs text-muted-foreground mb-1">Diagnóstico</p>
              <p className="text-sm text-foreground">{record.diagnosis}</p>
            </div>
          </div>
        </div>
      )}

      {record.treatment && (
        <div className="mb-4">
          <p className="text-xs text-muted-foreground mb-1">Tratamento</p>
          <p className="text-sm text-foreground">{record.treatment}</p>
        </div>
      )}

      {record.immunizations.length > 0 && (
        <div className="pt-4 border-t border-border">
          <div className="flex items-center gap-2 mb-3">
            <Shield className="size-4 text-primary" />
            <p className="text-xs text-muted-foreground">Imunizações Recentes</p>
          </div>
          <div className="space-y-2">
            {record.immunizations.slice(0, 3).map((imm, idx) => (
              <div key={idx} className="flex items-center justify-between text-sm">
                <span className="text-foreground">{imm.type}</span>
                <span className="text-muted-foreground text-xs">
                  {format(imm.dateAdministered, 'MMM d, yyyy')}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

