// src/hooks/useToast.ts (new version)
import { toast as sonnerToast } from "sonner";

export const toast = sonnerToast;

export function useToast() {
  return {
    toast: sonnerToast
  };
}