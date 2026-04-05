import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface SelectScrollableProps {
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const commonSpecialities = [
  "Cardiologia", 
  "Pediatria", 
  "Ginecologia", 
  "Neurologia", 
  "Dermatologia", 
  "Psiquiatria",
  "Medicina Geral",
  "Nutricionista",
  "Psicologia",
  "Endocrinologia",
  "Urologia"
];

export function SelectScrollable({ 
  value, 
  onValueChange, 
  placeholder = "Selecione uma especialidade",
  className = "w-full max-w-64"
}: SelectScrollableProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="max-h-96 overflow-y-auto">
        <SelectGroup>
          <SelectLabel>Especialidades Médicas (Telemedicina)</SelectLabel>
          {commonSpecialities.map((speciality) => (
            <SelectItem 
              key={speciality} 
              value={speciality.toLowerCase().replace(/\s+/g, '_')}
            >
              {speciality}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}