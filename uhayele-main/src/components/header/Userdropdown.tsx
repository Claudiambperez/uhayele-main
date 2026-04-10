"use client";

import React from 'react';
import { 
  User, 
  Settings, 
  Info, 
  LogOutIcon, 
  Calendar, 
  FileText 
} from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from 'next/navigation';

type UserRole = 'DOCTOR' | 'PATIENT';

interface UserDropdownProps {
  user: {
    role: UserRole;
    firstName: string;
    lastName: string;
    speciality?: string;
    avatarUrl?: string;
  };
}

export function UserDropdown({ user }: UserDropdownProps) {
  const router = useRouter();
  const fullName = `${user.firstName} ${user.lastName}`;

  const navigateTo = (path: string) => {
    router.push(path);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Avatar className="w-9 h-9">
           
            <AvatarFallback className="bg-zinc-100 text-zinc-700 font-medium">
              {user.firstName[0]}{user.lastName[0]}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-64">
        {/* User Info */}
        <div className="px-4 py-3 border-b">
          <p className="font-medium">{fullName}</p>
          {user.role === 'DOCTOR' ? (
            <p className="text-xs text-emerald-600">{user.speciality || 'Médico'}</p>
          ) : (
            <p className="text-xs text-blue-600">Paciente</p>
          )}
        </div>

        <DropdownMenuGroup className="p-1">
          {/* Role-specific menu items */}
          {user.role === 'DOCTOR' ? (
            <>
              <DropdownMenuItem 
                onSelect={() => navigateTo('/doctor/profile')}
                className="cursor-pointer"
              >
                <User className="h-4 w-4 mr-3" />
                Editar Perfil
              </DropdownMenuItem>

              <DropdownMenuItem onSelect={() => navigateTo('/doctor/appointments')}>
                <Calendar className="h-4 w-4 mr-3" />
                Minhas Consultas
              </DropdownMenuItem>

              <DropdownMenuItem onSelect={() => navigateTo('/doctor/patients')}>
                <FileText className="h-4 w-4 mr-3" />
                Meus Pacientes
              </DropdownMenuItem>
            </>
          ) : (
            <>
              <DropdownMenuItem 
                onSelect={() => navigateTo('/patient/profile')}
                className="cursor-pointer"
              >
                <User className="h-4 w-4 mr-3" />
                Editar Perfil
              </DropdownMenuItem>

              <DropdownMenuItem onSelect={() => navigateTo('/patient/appointments')}>
                <Calendar className="h-4 w-4 mr-3" />
                Minhas Consultas
              </DropdownMenuItem>

              <DropdownMenuItem onSelect={() => navigateTo('/patient/records')}>
                <FileText className="h-4 w-4 mr-3" />
                Meus Registos Médicos
              </DropdownMenuItem>
            </>
          )}

          <DropdownMenuItem onSelect={() => navigateTo('/settings')}>
            <Settings className="h-4 w-4 mr-3" />
            Definições
          </DropdownMenuItem>

          <DropdownMenuItem onSelect={() => navigateTo('/support')}>
            <Info className="h-4 w-4 mr-3" />
            Suporte
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onSelect={handleLogout}
          className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
        >
          <LogOutIcon className="h-4 w-4 mr-3" />
          Sair da Conta
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}