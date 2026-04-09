"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Stethoscope,
  Users,
  Calendar,
  FileText,
  Settings,
  ChevronRight,
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

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { Separator } from "@/components/ui/separator";

export function AppSidebar() {
  const pathname = usePathname();
  const [openSections, setOpenSections] = React.useState({
    content: true,
    settings: true,
  });

  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center">
            <Stethoscope className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="font-semibold text-xl tracking-tight">Uhayele</p>
            <p className="text-xs text-neutral-500 -mt-1">Médico</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/dashboard/doctor"}>
                  <Link href="/dashboard/doctor">
                    <LayoutDashboard className="h-5 w-5" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator className="my-4 mx-4" />

        {/* Consultas & Patients */}
        <Collapsible 
          open={openSections.content} 
          onOpenChange={(open) => setOpenSections(prev => ({...prev, content: open}))}
        >
          <SidebarGroup>
            <CollapsibleTrigger asChild>
              <SidebarGroupLabel className="flex items-center justify-between cursor-pointer px-4 py-2 hover:bg-neutral-100 rounded-md">
                <span>Consultas</span>
                <ChevronRight className={`h-4 w-4 transition-transform ${openSections.content ? "rotate-90" : ""}`} />
              </SidebarGroupLabel>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/dashboard/doctor/appointments">
                        <Calendar className="h-5 w-5" />
                        <span>Agendamentos</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/dashboard/doctor/patients">
                        <Users className="h-5 w-5" />
                        <span>Pacientes</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/dashboard/doctor/prescriptions">
                        <FileText className="h-5 w-5" />
                        <span>Prescrições</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>

        <Separator className="my-4 mx-4" />

        {/* Settings */}
        <Collapsible 
          open={openSections.settings} 
          onOpenChange={(open) => setOpenSections(prev => ({...prev, settings: open}))}
        >
          <SidebarGroup>
            <CollapsibleTrigger asChild>
              <SidebarGroupLabel className="flex items-center justify-between cursor-pointer px-4 py-2 hover:bg-neutral-100 rounded-md">
                <span>Configurações</span>
                <ChevronRight className={`h-4 w-4 transition-transform ${openSections.settings ? "rotate-90" : ""}`} />
              </SidebarGroupLabel>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/dashboard/doctor/settings">
                        <Settings className="h-5 w-5" />
                        <span>Definições</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      </SidebarContent>

      <SidebarFooter className="p-4 text-xs text-neutral-500 border-t">
        Uhayele • Médico
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}