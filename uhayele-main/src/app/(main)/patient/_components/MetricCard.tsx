import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  sublabel?: string;
  status?: 'default' | 'warning' | 'success';
}

export function MetricCard({ label, value, icon: Icon, sublabel, status = 'default' }: MetricCardProps) {
  const statusColors = {
    default: 'bg-primary/10 text-primary',
    warning: 'bg-yellow-500/10 text-yellow-600',
    success: 'bg-green-500/10 text-green-600',
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-start justify-between mb-4">
        <div className={`size-8 rounded-lg ${statusColors[status]} flex items-center justify-center`}>
          <Icon className="size-4" />
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-md text-foreground">{value}</p>
        <p className="text-sm text-muted-foreground">{label}</p>
        {sublabel && <p className="text-xs text-muted-foreground">{sublabel}</p>}
      </div>
    </div>
  );
}
