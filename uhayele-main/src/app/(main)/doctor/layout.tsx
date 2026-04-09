import { SidebarDoctor } from "@/components/SidebarDoctor";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppHeader from "@/components/AppHeader";   // ← We'll create this

export default function DoctorDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden bg-zinc-50">
        
        {/* Sidebar */}
        <SidebarDoctor />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          
          {/* Top Header */}
          <AppHeader />

          {/* Page Content */}
          <main className="flex-1 overflow-auto p-6 bg-zinc-50">
            {children}
          </main>
        </div>

        {/* Backdrop - Automatically shown by SidebarProvider when sidebar is open on mobile */}
        <div className="sidebar-backdrop" />

      </div>
    </SidebarProvider>
  );
}