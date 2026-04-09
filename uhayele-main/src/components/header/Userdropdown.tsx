import {
  BadgeCheckIcon,
  BellIcon,
  CreditCardIcon,
  Edit,
  Info,
  Link,
  LogOutIcon,
  Settings,
  User,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { assets } from "@/app/assets/images"

import { useRouter } from 'next/navigation';

export function UserDropdown() {

   const router = useRouter();

  const navigateTo = (path: string) => {
    router.push(path);
  };

  const handleLogout = () => {
    // Clear auth + redirect
    localStorage.removeItem('token');
    router.push('/login');
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="w-9 h-9">
                    <AvatarImage src={assets.doctor} alt="Dr. João Manuel Mendes" />
                    <AvatarFallback>JM</AvatarFallback>
                  </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem 
              onSelect={() => navigateTo('/doctor/profile')}
            className="cursor-pointer focus:bg-accent">
              
              <User className="h-4 w-4" />
              Editar Perfil
            
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings />
            Definições
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Info/>
            Suporte
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
                  onSelect={handleLogout}
          className="cursor-pointer focus:bg-destructive focus:text-destructive-foreground border-t"

        >
        
            <LogOutIcon />
            Sair
        
      
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
