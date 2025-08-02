import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (date) => {
  const dateArr = date.split("-");
  const day = dateArr[2];
  const month = dateArr[1];
  const year = dateArr[0];
  return `${day}-${month}-${year}`;
};
