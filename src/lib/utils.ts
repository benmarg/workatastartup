import { clsx, type ClassValue } from "clsx";
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInMonths,
  differenceInYears,
} from "date-fns";
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

export function formatDistanceCompact(date: Date) {
  const now = new Date();
  const years = differenceInYears(now, date);
  if (years === 1) return "1 Year";
  if (years > 0) return `${years}Years`;

  const months = differenceInMonths(now, date);
  if (months === 1) return "1 Month";
  if (months > 0) return `${months} Months`;

  const days = differenceInDays(now, date);
  if (days === 1) return "1 Day";
  if (days > 0) return `${days} Days`;

  const hours = differenceInHours(now, date);
  if (hours === 1) return "1 Hour";
  if (hours > 0) return `${hours} Hours`;

  const minutes = differenceInMinutes(now, date);
  if (minutes === 1) return "1 Min";
  if (minutes > 0) return `${minutes} Minutes`;

  return "Just now";
}

export function firstNameLastInitial(name: string) {
  const names = name.split(" ");
  if (names.length === 1) return name;
  const firstName = names[0];
  const lastInitial = names[names.length - 1]?.[0] ?? "";

  return `${firstName} ${lastInitial}.`;
}
