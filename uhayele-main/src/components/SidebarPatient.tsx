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
  ChevronRight,
  Bell,
  Search,
  Activity
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
import { FcCalendar } from "react-icons/fc";


export function SidebarPatient() {
  const pathname = usePathname();

  const [openSections, setOpenSections] = React.useState({
    consultas: true,
    medicalRecord: true,
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
                  isActive={pathname === "/patient"}
                >
                  <Link href="/patient">
                    <LayoutDashboard className="h-5 w-5" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

            {/* CONSULTAS - Collapsible */}
               <Collapsible 
          open={openSections.consultas} 
          onOpenChange={(open) => setOpenSections(prev => ({ ...prev, consultas: open }))}
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
                <SidebarMenuButton asChild isActive={pathname === "/patient/findDoctor"}>
                  <Link href="/patient/findDoctor">
                    <Search className="h-5 w-5" />
                    <span>Encontrar Doctor  </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
                     <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/patient/book"}>
                  <Link href="/patient/book">
                    <Calendar className="h-5 w-5" />
                    <span>Marcar Consulta </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/patient/appointment"}>
                      <Link href="/patient/appointment">
                        <FcCalendar className="h-5 w-5" />
                        <span>Consulta Virtual </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                      <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/patient/appointmentHistory"}>
                      <Link href="/patient/appointmentHistory">
                        <History className="h-5 w-5" />
                        <span>Histórico de Consultas  </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
     {/* PRESCRIÇÕES */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sm font-medium text-neutral-500 px-3 mb-1">
            Ficha Médica
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/patient/medicalRecord"}>
                  <Link href="/patient/medicalRecord">
                     <Activity className="w-5 h-5" />
                    <span>Ficha Médica</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>


        {/* PRESCRIÇÕES */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sm font-medium text-neutral-500 px-3 mb-1">
            PRESCRIÇÕES
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/patient/prescriptions"}>
                  <Link href="/patient/prescriptions">
                    <FileText className="h-5 w-5" />
                    <span>Histórico de Prescrições</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* FINANCEIRO */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sm font-medium text-neutral-500 px-3 mb-1">
            FINANCEIRO
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/patient/payments"}>
                  <Link href="/patient/payments">
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