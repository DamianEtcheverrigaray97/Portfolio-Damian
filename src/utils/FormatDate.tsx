import { DateField } from "@prismicio/client";

export function formatDateFull(dateStr: DateField): string {
  if (!dateStr) return "";
  const date = new Date(dateStr);

  // Options for formatting
  const options: Intl.DateTimeFormatOptions = {
    // weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  // Format the date
  return new Intl.DateTimeFormat("es-UY", options).format(date);
}

export function formatDateMonth(dateStr: DateField): string {
  if (!dateStr) return "";
  const date = new Date(dateStr);

  // Options for formatting
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short", 
  };

  // Format the date
  return new Intl.DateTimeFormat("es-UY", options).format(date);
}