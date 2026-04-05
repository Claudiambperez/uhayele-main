"use client";

import React from "react";
import { AuroraBackground } from "@/components/ui/aurora-background";
import Link from 'next/link';
import Image from 'next/image';
import { assets } from '../assets/images';
import { RiArrowGoBackLine } from "react-icons/ri";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="remove-scrollbar bg-[#f8f9fa] flex flex-col items-center justify-center p-6 min-h-screen dark:bg-[#1a1a1a]">
      
      {/* Back Button */}
      <Link
        href="/"
        className="absolute top-8 left-8 z-50 flex items-center gap-2 text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors group"
      >
        <RiArrowGoBackLine className="text-3xl group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-medium hidden sm:inline">Voltar ao Início</span>
      </Link>

      {/* Main Card with Aurora Background */}
      <AuroraBackground className="w-full max-w-[1000px] h-[620px] rounded-3xl overflow-hidden flex flex-col lg:flex-row shadow-2xl relative">
        
        {/* LEFT SIDE */}
        <div className="lg:w-1/2 relative z-10 flex flex-col h-full justify-between p-10 lg:p-12 min-h-[620px] overflow-hidden">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src={assets.logorb}
              alt="Uhayele Logo"
              width={80}
              height={80}
              className="drop-shadow-lg"
            />
          </Link>

          {/* Stethoscope - Stops cleanly at the middle */}
          <div className="flex-1 flex items-center justify-center relative -mr-8 lg:-mr-20 overflow-hidden">
            <Image
              src={assets.sthetocospe1}
              alt="Stethoscope"
              width={520}
              height={520}
              className="object-contain scale-[1.05]"
              priority
            />
          </div>

          {/* Welcome Text - Back to original style */}
          <div className="relative z-20">
            <h2 className="normal-case text-5xl lg:text-6xl font-bold text-white leading-none tracking-tight drop-shadow-lg">
              Bem-vindo
            </h2>
            <p className="text-2xl text-white/90 mt-4 drop-shadow-md">
              ao futuro do seu bem-estar
            </p>
          </div>
        </div>

        {/* RIGHT SIDE - Sign Up Form */}
        <div className="lg:w-1/2 relative z-20 flex items-center bg-white/95 dark:bg-[#1a1a1a]/95 backdrop-blur-md p-8 lg:p-12 rounded-r-3xl drop-shadow-2xl">
          {children}
        </div>

      </AuroraBackground>
    </section>
  );
}