"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import Image from "next/image";
import { cn } from "@/lib/utils"

function Avatar({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root>) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        "relative flex size-10  shrink-0 overflow-hidden rounded-full",
        className
      )}
      {...props}
    />
  )
}
function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof Image>) { // Change type to Image props
  return (
    <Image
      data-slot="avatar-image"
      
      fill 
      className={cn("object-cover w-full h-full", className)} // Add object-cover for proper image fitting; keep other classes
      {...props}
    />
  );
}

function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "bg-muted flex size-full items-center justify-center rounded-full",
        className
      )}
      {...props}
    />
  )
}

export { Avatar, AvatarImage, AvatarFallback }
