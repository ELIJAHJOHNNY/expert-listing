import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/utils/cn";

export function Button({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-full bg-[#173b35] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#285149] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d7f05a] disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}
