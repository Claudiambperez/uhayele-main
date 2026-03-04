"use client";
import React from "react";

import { Modal, ModalBody, ModalContent, ModalFooter, ModalTrigger } from "@/components/ui/animated-modal";
import { FcFeedback } from "react-icons/fc";

import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { people } from "../../../constants";

import { CarouselPlugin } from "./TModal";
import { BackgroundGradient } from "@/components/ui/background-gradient";

export function AnimatedModalDemo() {
  return (
    <>
      <Modal>
        <ModalTrigger className="dark:text-white text-black flex justify-center group/modal-btn">
          <span className="group-hover/modal-btn:translate-x-60 text-center underline transition duration-500">
            40 Pacientes satisfeitos
          </span>
          <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
            <FcFeedback className="h-6 w-6" />
          </div>
        </ModalTrigger>
        <ModalBody>
          <BackgroundGradient className=" dark:bg-zinc-900">
            <ModalContent> 
              <div className="flex flex-col items-center justify-center ">
                <h4 className="text-lg md:text-2xl text-white dark:text-neutral-100 font-bold text-center mb-2">
                  Testemunhos
                </h4>
                <p className="font-light text-white dark:text-neutral-400 p-2">
                  Junte-se a Comunidade Uhayele e coloque o seu bem-estar em primeiro lugar.
                </p>
                <div className="flex flex-row items-center justify-center w-full p-2">
                  <AnimatedTooltip items={people} />
                </div>
              </div>
              </ModalContent>
              </BackgroundGradient>
                <CarouselPlugin />
            
           
          
          <ModalFooter className="gap-4">
            <button className="bg-black text-white dark:bg-white dark:text-black text-sm px-2 py-1 rounded-md border border-black w-28">
              Ver Mais
            </button>
          </ModalFooter>
        </ModalBody>
      </Modal>
    </>
  );
}
