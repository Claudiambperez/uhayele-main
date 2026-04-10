"use client";

import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { UserDropdown } from './header/Userdropdown';

type UserRole = 'DOCTOR' | 'PATIENT';

interface AppHeaderProps {
  user: {
    role: UserRole;
    firstName: string;
    lastName: string;
    speciality?: string;     // Apenas para médicos
    avatarUrl?: string;
  };
}

// Mock Notifications
const mockNotifications = [
  {
    id: "notif-1",
    message: "Nova consulta agendada para amanhã às 09:00 com Maria dos Santos",
    sentDate: new Date(2026, 3, 8, 14, 30),
    read: false,
  },
  {
    id: "notif-2",
    message: "Resultado do exame de sangue de António Oliveira está disponível",
    sentDate: new Date(2026, 3, 8, 11, 15),
    read: true,
  },
  {
    id: "notif-3",
    message: "Pagamento da consulta de Ana Paula Costa foi confirmado (Kz 12.500)",
    sentDate: new Date(2026, 3, 7, 16, 45),
    read: false,
  },
];

export default function AppHeader({ user }: AppHeaderProps) {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;
  const fullName = `${user.firstName} ${user.lastName}`;

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif => notif.id === id ? { ...notif, read: true } : notif)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
  };

  return (
    <header className="border-b bg-white px-6 py-4 flex items-center justify-between sticky top-0 z-50">
      
      {/* Left Side */}
      <div className="flex items-center gap-4">
        <SidebarTrigger />
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-6">

        {/* Notifications */}
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger className="relative p-2 hover:bg-zinc-100 rounded-full transition-colors">
            <Bell className="w-5 h-5 text-gray-700" />
            {unreadCount > 0 && (
              <div className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-medium w-5 h-5 flex items-center justify-center rounded-full">
                {unreadCount}
              </div>
            )}
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-80 p-0">
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <h3 className="font-semibold">Notificações</h3>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-xs text-zinc-600 hover:text-zinc-900"
                >
                  Marcar todas como lidas
                </button>
              )}
            </div>

            <div className="max-h-[380px] overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  Nenhuma notificação no momento
                </div>
              ) : (
                notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`p-4 border-b last:border-b-0 hover:bg-zinc-50 cursor-pointer transition-colors ${
                      !notif.read ? 'bg-zinc-50' : ''
                    }`}
                    onClick={() => markAsRead(notif.id)}
                  >
                    <p className="text-sm text-gray-800 leading-snug">{notif.message}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      {format(notif.sentDate, "dd 'de' MMMM 'às' HH:mm", { locale: pt })}
                    </p>
                  </div>
                ))
              )}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Info */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium">{fullName}</p>
            {user.role === 'DOCTOR' ? (
              <p className="text-xs text-emerald-600 font-medium">
                {user.speciality || 'Médico'}
              </p>
            ) : (
              <p className="text-xs text-blue-600 font-medium">Paciente</p>
            )}
          </div>


         <UserDropdown 
  user={{
    role: "PATIENT",
    firstName: "Maria",
    lastName: "Clara",
  }} 
/>
        </div>
      </div>
    </header>
  );
}