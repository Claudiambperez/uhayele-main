import { SidebarDoctor } from "@/components/SidebarDoctor";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppHeader from "@/components/AppHeader";   // ← We'll create this
import { SidebarPatient } from "@/components/SidebarPatient";
import { DashboardHeader } from "@/components/DashboardHeader";

export default function DoctorDashboardLayout({ children }: { children: React.ReactNode }) {

// Mock data matching Prisma schema
const mockPatient = {
  id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  firstName: 'Sarah',
  lastName: 'Johnson',
  dateOfBirth: new Date('1985-06-15'),
  gender: 'Female',
  email: 'sarah.johnson@email.com',
  phone: '(555) 123-4567',
};
  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden bg-zinc-50">
        
        {/* Sidebar */}
        <SidebarPatient />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          
          {/* Top Header */}
        <AppHeader 
  user={{
    role: "PATIENT",
    firstName: "Maria",
    lastName: "Clara",
  }} />

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