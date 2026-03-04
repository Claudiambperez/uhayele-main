"use client"

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { testimonialModal } from "../../../constants"

import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { useState } from "react"
import { motion } from "motion/react"

export function CarouselPlugin() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonialModal.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonialModal.length) % testimonialModal.length);
  };

  const isActive = (index: number) => {
    return index === active;
  };

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full flex-1   bg-white" // Updated: Removed max-w-lg for full width
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {testimonialModal.map((person, index) => (
          <CarouselItem key={index} className="mx-auto p-4 antialiased">
            <motion.div
              key={active}
              initial={{
                y: 20,
                opacity: 0,
              }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              exit={{
                y: -20,
                opacity: 0,
              }}
              transition={{
                duration: 0.2,
                ease: "easeInOut",
              }}
              className="px-8"
            >
              <div className="border-l-4 border-sex">
                <div className="flex flex-col justify-between py-4">
                  <motion.p className="mt-8 text-md pl-4 text-justify leading-7 text-gray-500 dark:text-neutral-300">
                    {testimonialModal[active].message.split(" ").map((word, index) => (
                      <motion.span
                        key={index}
                        initial={{
                          filter: "blur(10px)",
                          opacity: 0,
                          y: 5,
                        }}
                        animate={{
                          filter: "blur(0px)",
                          opacity: 1,
                          y: 0,
                        }}
                        transition={{
                          duration: 0.2,
                          ease: "easeInOut",
                          delay: 0.02 * index,
                        }}
                        className="inline-block text-justify"
                      >
                        {word}&nbsp;
                      </motion.span>
                    ))}
                  </motion.p>
                  <div className="flex gap-4 pl-4 mt-4 items-center">
                    <div className="">
                      <Avatar>
                        <AvatarImage
                          src={person.img}
                          alt=""
                        />
                      </Avatar>
                    </div>
                    <div className="flex flex-col">
                      <h3 className="text-xl font-bold text-sex dark:text-white">
                        {testimonialModal[active].name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-neutral-500">
                        {testimonialModal[active].title}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}