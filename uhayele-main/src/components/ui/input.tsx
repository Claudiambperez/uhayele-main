"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useMotionTemplate, useMotionValue, motion } from "motion/react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, onMouseMove, onMouseEnter, onMouseLeave, ...props }, ref) => {
    const radius = 100;
    const [visible, setVisible] = React.useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
      const { left, top } = e.currentTarget.getBoundingClientRect();
      mouseX.set(e.clientX - left);
      mouseY.set(e.clientY - top);
      onMouseMove?.(e as unknown as React.MouseEvent<HTMLInputElement>);
    }

    function handleMouseEnter(e: React.MouseEvent<HTMLDivElement>) {
      setVisible(true);
      onMouseEnter?.(e as unknown as React.MouseEvent<HTMLInputElement>);
    }

    function handleMouseLeave(e: React.MouseEvent<HTMLDivElement>) {
      setVisible(false);
      onMouseLeave?.(e as unknown as React.MouseEvent<HTMLInputElement>);
    }

    return (
      <motion.div
        style={{
          background: useMotionTemplate`
            radial-gradient(
              ${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
              #3b82f6,
              transparent 80%
            )
          `,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="group/input rounded-lg p-[2px] transition duration-300"
      >
        <input
          ref={ref}
          type={type}
          data-slot="input"
          className={cn(
            "shadow-input flex h-8 w-full min-w-0 rounded-md border border-transparent bg-gray-50 px-3 py-2 text-sm text-black transition duration-300 group-hover/input:shadow-none placeholder:text-neutral-400 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-800 dark:text-white dark:placeholder:text-neutral-500 dark:shadow-[0px_0px_1px_1px_#404040] dark:focus-visible:ring-neutral-600",
            "aria-invalid:border-red-400 aria-invalid:ring-2 aria-invalid:ring-red-200 dark:aria-invalid:border-red-700 dark:aria-invalid:ring-red-900/40",
            className
          )}
          {...props}
        />
      </motion.div>
    );
  }
);

Input.displayName = "Input";

export { Input };