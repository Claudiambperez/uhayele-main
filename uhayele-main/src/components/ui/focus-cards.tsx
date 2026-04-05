"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { RoleSelectionCard } from "@/app/types";

// Updated RoleIcon (kept your nice design)
function RoleIcon({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="
        relative flex h-[72px] w-[72px] items-center justify-center
        rounded-[22px]
        bg-white/70 backdrop-blur-xl
        border border-white/40
        shadow-[0_8px_20px_rgba(0,0,0,0.06)]
        transition-all duration-300
        group-hover:scale-[1.04]
      "
    >
      {/* subtle light reflection */}
      <div className="pointer-events-none absolute inset-0 rounded-[22px] bg-[linear-gradient(180deg,rgba(255,255,255,0.6),transparent_60%)]" />
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

type CardProps = {
  card: RoleSelectionCard;
  index: number;
  hovered: number | null;
  setHovered: React.Dispatch<React.SetStateAction<number | null>>;
  isLoading: boolean;
  onSelect: (role: string, index: number) => void;
};

const Card = React.memo(
  ({ card, index, hovered, setHovered, isLoading, onSelect }: CardProps) => {
    const isSelected = hovered === index;

    return (
      <div
        onMouseEnter={() => setHovered(index)}
        onMouseLeave={() => setHovered(null)}
        onClick={() => onSelect(card.key || card.role.toLowerCase(), index)}
      className={cn(
          "rounded-2xl relative bg-gray-100 dark:bg-neutral-900 overflow-hidden h-[280px] md:h-[380px] w-[260px] md:w-[300px] transition-all duration-300 ease-out cursor-pointer flex-shrink-0",
          hovered !== null && hovered !== index && "blur-sm scale-[0.98]"
        )}
      >
        {/* Background subtle pattern */}
        {/* <div className="absolute inset-0 bg-[radial-gradient(#e5e5e5_0.8px,transparent_1px)] dark:bg-[radial-gradient(#404040_0.8px,transparent_1px)] bg-[length:4px_4px]" /> */}

        <div className="relative h-full flex flex-col items-center justify-center p-10 text-center">
          
          {/* Icon */}
          <div className="mb-10">
            {card.icon}
          </div>

          {/* Role Title */}
          <h3 className="text-3xl font-semibold tracking-tight text-neutral-900 dark:text-white mb-4">
            {card.title}
          </h3>

          {/* Description */}
          <p className="text-neutral-600 italic dark:text-neutral-400 text-[15px] leading-relaxed max-w-[240px]">
            {card.description}
          </p>

          {/* Loading State Overlay */}
          {isLoading && isSelected && (
            <div className="absolute inset-0 bg-white/90 dark:bg-neutral-900/90 flex items-center justify-center backdrop-blur-sm z-20 rounded-3xl">
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="h-8 w-8 animate-spin text-neutral-600 dark:text-neutral-400" />
                <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                  A preparar a sua experiência...
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Bottom highlight bar */}
        <div
          className={cn(
            "absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-emerald-600 transition-all duration-300",
            isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-30"
          )}
        />
      </div>
    );
  }
);

Card.displayName = "Card";

export function FocusCards({ cards }: { cards: RoleSelectionCard[] }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [loadingIndex, setLoadingIndex] = useState<number | null>(null);

  const handleRoleSelect = async (roleKey: string, index: number) => {
    setLoadingIndex(index);

    try {
      // Simulate API / processing delay (you can replace with real navigation later)
      await new Promise((resolve) => setTimeout(resolve, 1600));

      console.log(`✅ Role selected: ${roleKey}`);

      // TODO: Later connect to real backend + navigation
      // For now, go to dashboard or next step
      window.location.href = roleKey === "doctor" 
        ? "/onboarding/doctor" 
        : "/onboarding/patient";

    } catch (error) {
      console.error("Error selecting role:", error);
    } finally {
      setLoadingIndex(null);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-12 items-center justify-center min-h-[500px] px-2">
      {cards.map((card, index) => (
        <Card
          key={card.key || index}
          card={card}
          index={index}
          hovered={hovered}
          setHovered={setHovered}
          isLoading={loadingIndex === index}
          onSelect={handleRoleSelect}
        />
      ))}
    </div>
  );
}