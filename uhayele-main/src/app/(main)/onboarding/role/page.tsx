"use client";


import { useRouter } from "next/navigation";
import { AlertTriangle } from "lucide-react";
import { AuroraBackground } from "@/components/ui/aurora-background";
import Link from "next/link";
import { RiArrowGoBackLine } from "react-icons/ri";
import { FocusCards } from "@/components/ui/focus-cards";
import { roleCard } from "../../../../../constants";

export default function RoleSelectionPage() {
  const router = useRouter();

  const selectRole = (role: "patient" | "doctor") => {
    console.log(`User selected role: ${role}`);

    // Temporary frontend storage (we'll replace with backend later)
    localStorage.setItem("userRole", role);
    localStorage.setItem("hasCompletedOnboarding", "true");

    // Redirect to respective dashboard
    if (role === "doctor") {
      router.push("/doctor/dashboard");
    } else {
      router.push("/patient/dashboard");
    }
  };

  return (
    <section className="remove-scrollbar bg-[#f8f9fa] flex flex-col items-center justify-center p-6 min-h-screen dark:bg-[#1a1a1a]">
      
           {/* Back Button */}
      <Link
        href="/login"
        className="absolute top-8 left-8 z-50 flex items-center gap-2 text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors group"
      >
        <RiArrowGoBackLine className="text-3xl group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-medium hidden sm:inline">Voltar </span>
      </Link>
      
      <AuroraBackground className="w-[900px] max-w-[1000px] h-[620px] rounded-3xl overflow-hidden shadow-2xl relative flex items-center justify-center">
        
       <div className="relative z-10 flex h-full w-full items-center justify-center">
    
    <div className="w-full max-w-md text-center px-8">
      
      <h1 className="text-2xl font-bold text-black mb-4 normal-case tracking-tight">
        Bem-vindo à Uhayele!
      </h1>
      
      <p className="mt-2 text-sm text-neutral-600 italic dark:text-neutral-400 ">
        Para personalizar sua experiência, escolha seu perfil:
      </p>

      <FocusCards cards={roleCard} />

      <p className="mt-4 flex items-center justify-center gap-2 text-xs italic text-gray-600">
        <AlertTriangle className="h-4 w-4 text-amber-500 animate-pulse" />
        <span className="animate-[pulse_2s_ease-in-out_infinite]">
          Esta escolha será feita apenas uma vez.
        </span>
      </p>

    </div>

  </div>
      </AuroraBackground>
    </section>
  );
}