"use client";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <main>
      <div
        className={cn(
          "transition-bg relative flex h-[100vh] flex-col items-center justify-center text-slate-950 overflow-hidden",
          className,
        )}
        style={{
          background: "linear-gradient(90deg, rgba(225, 225, 225, 1) 100%, rgba(255, 255, 255, 1) 10%)",
          
        }}
        {...props}
      >
        {/* Aurora Effect - Soft Light Version */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={
            {
              "--aurora": "repeating-linear-gradient(100deg,#a5b4fc_10%,#c4d0ff_15%,#dbeafe_20%,#e0e7ff_25%,#bfdbfe_30%)",
              "--white-gradient": "repeating-linear-gradient(100deg,#fff_0%,#fff_7%,transparent_10%,transparent_12%,#fff_16%)",
            } as React.CSSProperties
          }
        >
          <div
            className={cn(
              `after:animate-aurora pointer-events-none absolute -inset-[10px] 
               [background-image:var(--white-gradient),var(--aurora)] 
               [background-size:300%,_200%] 
               [background-position:50%_50%,50%_50%] 
               opacity-40 blur-[12px] will-change-transform 
               [--aurora:repeating-linear-gradient(100deg,#a5b4fc_10%,#c4d0ff_15%,#dbeafe_20%,#e0e7ff_25%,#bfdbfe_30%)] 
               after:absolute after:inset-0 after:[background-image:var(--white-gradient),var(--aurora)] 
               after:[background-size:200%,_100%] after:[background-attachment:fixed] 
               after:mix-blend-soft-light after:content-[""]`,
              showRadialGradient &&
                `[mask-image:radial-gradient(ellipse_at_100%_0%,rgba(0,0,0,0.9)_20%,transparent_70%)]`,
            )}
          ></div>
        </div>

        {children}
      </div>
    </main>
  );
};