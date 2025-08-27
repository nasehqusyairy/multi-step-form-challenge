import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer inline-flex items-center data-[state=checked]:bg-blue-950 data-[state=unchecked]:bg-blue-950 dark:data-[state=unchecked]:bg-blue-950/80 disabled:opacity-50 shadow-xs border border-transparent focus-visible:border-ring rounded-full outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 w-10 h-[1.15rem] transition-all cursor-pointer disabled:cursor-not-allowed shrink-0",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "block bg-background dark:data-[state=checked]:bg-primary-foreground dark:data-[state=unchecked]:bg-foreground rounded-full ring-0 size-3 transition-transform data-[state=checked]:translate-x-[calc(200%)] data-[state=unchecked]:translate-x-1 pointer-events-none"
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
