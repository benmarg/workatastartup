import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getHeadcountBound(companysize: string) {
  switch (companysize) {
    case "sub10":
      return { headcountLowerBound: 0, headcountUpperBound: 10 };
    case "sub50":
      return { headcountLowerBound: 11, headcountUpperBound: 50 };
    case "sub300":
      return { headcountLowerBound: 51, headcountUpperBound: 300 };
    case "over300":
      return { headcountLowerBound: 301, headcountUpperBound: 100000000 };
  }
}

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

export const USDollarCompact = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
  notation: "compact",
});