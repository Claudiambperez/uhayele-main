"use client";
import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Calendar, 
  Video, 
  History, 
  FileText, 
  CreditCard, 
  ChevronRight
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import Image from "next/image";
import { assets } from "@/app/assets/images";


export function SidebarDoctor() {
  const pathname = usePathname();

  const [openSections, setOpenSections] = React.useState({
    consultas: true,
    prescriptions: true,
  });

  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarHeader className="p-5">
        <Link href="#" className="flex items-center space-x-2">
          <Image
            src={assets.logorb}
            alt="logo"
            width={80}
            height={80}
            className="rounded-md"
          />
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-3">
        {/* DASHBOARD */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  isActive={pathname === "/doctor"}
                >
                  <Link href="/doctor">
                    <LayoutDashboard className="h-5 w-5" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

            {/* PRESCRIÇÕES  Collapsible*/}
        <Collapsible 
          open={openSections.prescriptions} 
          onOpenChange={(open) => setOpenSections(prev => ({ ...prev, prescriptions: open }))}
        >
          <SidebarGroup>
            <CollapsibleTrigger asChild>
              <SidebarGroupLabel className="flex items-center justify-between cursor-pointer px-3 py-2 hover:bg-neutral-100 rounded-md text-sm font-medium text-neutral-500">
                CONSULTAS
                <ChevronRight 
                  className={`h-4 w-4 transition-transform ${openSections.consultas ? "rotate-90" : ""}`} 
                />
              </SidebarGroupLabel>
            </CollapsibleTrigger>

            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/doctor/appointments"}>
                      <Link href="/doctor/appointments">
                        <Calendar className="h-5 w-5" />
                        <span>Agenda Semana/Mês</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/dashboard/doctor/start-consultation"}>
                      <Link href="/dashboard/doctor/start-consultation">
                        <Video className="h-5 w-5" />
                        <span>Iniciar Consulta</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/doctor/history"}>
                      <Link href="/doctor/history">
                        <History className="h-5 w-5" />
                        <span>Histórico de Consultas</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>

               <Collapsible 
          open={openSections.consultas} 
          onOpenChange={(open) => setOpenSections(prev => ({ ...prev, consultas: open }))}
        >
          <SidebarGroup>
            <CollapsibleTrigger asChild>
              <SidebarGroupLabel className="flex items-center justify-between cursor-pointer px-3 py-2 hover:bg-neutral-100 rounded-md text-sm font-medium text-neutral-500">
                   PRESCRIÇÕES
                <ChevronRight 
                  className={`h-4 w-4 transition-transform ${openSections.consultas ? "rotate-90" : ""}`} 
                />
              </SidebarGroupLabel>
            </CollapsibleTrigger>

            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                     <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/doctor/prescriptions"}>
                  <Link href="/doctor/prescriptions">
                    <FileText className="h-5 w-5" />
                    <span>Emitir Prescrição</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/doctor/historyprescriptions"}>
                      <Link href="/doctor/historyprescriptions">
                        <History className="h-5 w-5" />
                        <span>Histórico de Prescrições  </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>


        {/* FINANCEIRO */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sm font-medium text-neutral-500 px-3 mb-1">
            FINANCEIRO
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/doctor/payments"}>
                  <Link href="/doctor/payments">
                    <CreditCard className="h-5 w-5" />
                    <span>Histórico de Pagamentos</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}