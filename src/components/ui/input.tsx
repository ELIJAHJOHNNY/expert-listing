import type { InputHTMLAttributes } from "react";
import { cn } from "@/utils/cn";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "w-full bg-transparent text-lg text-[#173b35] outline-none placeholder:text-[#71827b]",
        className,
      )}
      {...props}
    />
  );
}
