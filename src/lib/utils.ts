// lib/utils.ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// Your existing cn function
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}