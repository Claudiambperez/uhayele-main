"use client";

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Phone, Mail, Stethoscope, Award } from 'lucide-react';
import { Doctor } from "@/app/assets/data/mockData";
import { useRouter } from 'next/navigation';

interface DoctorProfileModalProps {
  doctor: Doctor | undefined;        // ← Allow undefined safely
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function DoctorProfileModal({ 
  doctor, 
  open, 
  onOpenChange 
}: DoctorProfileModalProps) {

  // Safety check - Don't render anything if doctor is not available
  if (!doctor) {
    return null;
  }

  const mainSpeciality = doctor.speciality?.[0]?.name || "Médico";
  const router = useRouter();
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <Avatar className="w-12 h-12">
              <AvatarFallback className="text-2xl bg-gradient-to-br from-blue-500 to-emerald-500 text-white">
                {doctor.firstName?.[0]}{doctor.lastName?.[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              Dr. {doctor.firstName} {doctor.lastName}
              <Badge variant="secondary" className="ml-3">
                {mainSpeciality}
              </Badge>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-8 py-4">
          {/* Descrição */}
          <div>
            <p className="text-zinc-600 leading-relaxed">{doctor.description}</p>
          </div>

          {/* Especialidades */}
          <div>
            <h3 className="font-semibold flex items-center gap-2 mb-3">
              <Stethoscope className="w-5 h-5" />
              Especialidades
            </h3>
            <div className="flex flex-wrap gap-2">
              {doctor.speciality?.map((spec) => (
                <Badge key={spec.id} variant="outline">
                  {spec.name}
                </Badge>
              )) || <p className="text-gray-500">Nenhuma especialidade registrada</p>}
            </div>
          </div>

          {/* Contacto */}
          <div className="grid grid-cols-2 gap-6">
            <div className="flex gap-3">
              <Phone className="w-5 h-5 text-zinc-500 mt-0.5" />
              <div>
                <p className="text-sm text-zinc-500">Telefone</p>
                <p className="font-medium">{doctor.phone}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Mail className="w-5 h-5 text-zinc-500 mt-0.5" />
              <div>
                <p className="text-sm text-zinc-500">Email</p>
                <p className="font-medium">{doctor.email}</p>
              </div>
            </div>
          </div>

          {/* Experiência */}
          <div className="flex items-center gap-3">
            <Award className="w-5 h-5 text-zinc-500" />
            <div>
              <p className="text-sm text-zinc-500">Experiência</p>
              <p className="font-medium">{doctor.yearsOfExperience} anos de experiência</p>
            </div>
          </div>

          {/* Disponibilidade */}
          {doctor.availability && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5">
              <p className="text-emerald-700 font-medium flex items-center gap-2">
                <Clock className="w-5 h-5" />
                {doctor.availability}
              </p>
            </div>
          )}

          <Button 
            onClick={() => router.push(`/patient/doctor/book/${doctor.serialNumber}`)}
          className="w-full h-12 text-base" size="lg">
            Marcar Consulta com Dr. {doctor.firstName}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}