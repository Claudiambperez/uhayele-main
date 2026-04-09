import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { commonSpecialities } from "../../constants";

interface Specialty {
  speciality: string;
  icon: React.ReactNode;
}

interface SelectScrollableProps {
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  showIcons?: boolean; // New prop to toggle icons
}

export function SelectScrollable({ 
  value, 
  onValueChange, 
  placeholder = "Selecione uma especialidade",
  className = "w-full max-w-64",
  showIcons = true
}: SelectScrollableProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="max-h-96 overflow-y-auto">
        <SelectGroup>
          <SelectLabel>Especialidades Médicas (Telemedicina)</SelectLabel>
          {commonSpecialities.map(({ speciality, icon }) => (
            <SelectItem 
              key={speciality} 
              value={speciality.toLowerCase().replace(/\s+/g, '_')}
              className="flex items-center gap-2 p-2"
            >
              {showIcons && icon}
              <span>{speciality}</span>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}