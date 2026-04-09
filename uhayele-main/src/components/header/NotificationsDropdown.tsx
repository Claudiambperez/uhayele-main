"use client";

import { useState } from 'react';
import { Bell, CheckCircle, Clock, XCircle, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Notification {
  id: string;
  message: string;
  sentDate: Date | null;
  status: 'Sent' | 'Failed' | 'Pending' | 'Scheduled';
  read: boolean;
}

interface NotificationsDropdownProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
}

export default function NotificationsDropdown({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
}: NotificationsDropdownProps) {
  const [open, setOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Sent':
        return <CheckCircle className="w-4 h-4 text-emerald-500" />;
      case 'Failed':
        return <XCircle className="w-4 h-4 text-red-500" />;
      case 'Pending':
      case 'Scheduled':
        return <Clock className="w-4 h-4 text-amber-500" />;
      default:
        return <Bell className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-medium rounded-full flex items-center justify-center">
              {unreadCount}
            </div>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-80 p-0">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <h3 className="font-semibold text-gray-900">Notificações</h3>
          {unreadCount > 0 && (
            <button
              onClick={onMarkAllAsRead}
              className="text-xs text-zinc-600 hover:text-zinc-900 font-medium"
            >
              Marcar todas como lidas
            </button>
          )}
        </div>

        <div className="max-h-[420px] overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <Bell className="w-10 h-10 mx-auto mb-3 opacity-40" />
              <p>Nenhuma notificação</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 border-b last:border-b-0 hover:bg-zinc-50 transition-colors cursor-pointer ${
                  !notification.read ? 'bg-zinc-50' : ''
                }`}
                onClick={() => onMarkAsRead(notification.id)}
              >
                <div className="flex gap-3">
                  <div className="mt-0.5">
                    {getStatusIcon(notification.status)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-800 leading-snug">
                      {notification.message}
                    </p>
                    {notification.sentDate && (
                      <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {format(new Date(notification.sentDate), "dd MMM yyyy 'às' HH:mm", { locale: pt })}
                      </p>
                    )}
                  </div>
                  {!notification.read && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5" />
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-3 border-t text-center">
          <button className="text-xs text-zinc-500 hover:text-zinc-700">
            Ver todas as notificações
          </button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}