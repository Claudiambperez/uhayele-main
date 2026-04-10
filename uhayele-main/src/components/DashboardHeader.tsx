import { User, Bell, Menu, Search } from 'lucide-react';

interface DashboardHeaderProps {
  patientName: string;
  patientId: string;

}

export function DashboardHeader({ patientName, patientId }: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-card">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
       
          <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="size-6 text-primary" />
          </div>
          <div>
            <h1 className="text-foreground">{patientName}</h1>
            <p className="text-sm text-muted-foreground">Patient ID: {patientId}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="hidden md:flex items-center gap-2 bg-muted rounded-lg px-3 py-2 min-w-[240px]">
            <Search className="size-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search records, doctors..."
              className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none flex-1"
            />
          </div>

          {/* Notifications */}
          <button className="relative size-10 rounded-lg hover:bg-muted flex items-center justify-center transition-colors">
            <Bell className="size-5 text-muted-foreground" />
            <span className="absolute top-1.5 right-1.5 size-2 bg-red-600 rounded-full" />
          </button>
        </div>
      </div>
    </header>
  );
}
