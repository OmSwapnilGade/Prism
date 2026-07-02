import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names using clsx and resolves Tailwind conflicts with twMerge.
 * This is the single utility for all className composition in Prism.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
