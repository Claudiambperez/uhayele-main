"use client";

import { useState } from 'react';
import { Bell, User } from 'lucide-react';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { assets } from '@/app/assets/images';
import { UserDropdown } from './header/Userdropdown';

// Mock Notifications (based on your Prisma Notification model)
const mockNotifications = [
  {
    id: "notif-1",
    message: "Nova consulta agendada para amanhã às 09:00 com Maria dos Santos",
    sentDate: new Date(2026, 3, 8, 14, 30),
    status: "Pending" as const,
    read: false,
  },
  {
    id: "notif-2",
    message: "Resultado do exame de sangue de António Oliveira está disponível",
    sentDate: new Date(2026, 3, 8, 11, 15),
    status: "Sent" as const,
    read: true,
  },
  {
    id: "notif-3",
    message: "Pagamento da consulta de Ana Paula Costa foi confirmado (Kz 12.500)",
    sentDate: new Date(2026, 3, 7, 16, 45),
    status: "Sent" as const,
    read: false,
  },
  {
    id: "notif-4",
    message: "Lembrete: Atualizar prontuário de Isabel Santos",
    sentDate: new Date(2026, 3, 7, 9, 20),
    status: "Scheduled" as const,
    read: false,
  },
];

export default function AppHeader() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const getStatusColor = (status: string) => {
    if (status === "Pending" || status === "Scheduled") return "text-amber-500";
    if (status === "Sent") return "text-emerald-500";
    return "text-red-500";
  };

  return (
    <header className="border-b bg-white px-6 py-4 flex items-center justify-between sticky top-0 z-50">
      
      {/* Left Side */}
      <div className="flex items-center gap-4">
        <div className="l">
          <SidebarTrigger />
        </div>
      
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-6">
        
        {/* Notifications Dropdown */}
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
                    <div className="flex gap-3">
                      <div className={`mt-1 ${getStatusColor(notif.status)}`}>
                        ●
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-800 leading-snug">
                          {notif.message}
                        </p>
                        {notif.sentDate && (
                          <p className="text-xs text-gray-500 mt-2">
                            {format(notif.sentDate, "dd 'de' MMMM 'às' HH:mm", { locale: pt })}
                          </p>
                        )}
                      </div>
                      {!notif.read && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-3 text-center border-t">
              <button className="text-xs text-zinc-500 hover:text-zinc-700">
                Ver todas as notificações
              </button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Profile */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium">Dr. João Manuel Mendes</p>
            <p className="text-xs text-gray-500">Cardiologista</p>
          </div>
             <UserDropdown />
        </div>
      </div>
    </header>
  );
}