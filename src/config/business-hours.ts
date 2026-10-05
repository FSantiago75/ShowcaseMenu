export type BusinessStatusName = "opening" | "open" | "closing" | "closed";

export interface BusinessStatus {
  state: BusinessStatusName;
  label: string;
  detail: string;
}

export interface BusinessHours {
  open: number;
  close: number;
}

export const BUSINESS_TIME_ZONE = "America/Sao_Paulo";
export const STATUS_WINDOW_MINUTES = 30;
export const WEEKDAYS = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];
export const BUSINESS_HOURS: Array<BusinessHours | null> = [
  null,
  { open: 11 * 60, close: 23 * 60 },
  { open: 11 * 60, close: 23 * 60 },
  { open: 11 * 60, close: 23 * 60 },
  { open: 11 * 60, close: 23 * 60 },
  { open: 11 * 60, close: 23 * 60 },
  { open: 11 * 60, close: 23 * 60 },
];

export const STATUS_LABELS: Record<BusinessStatusName, string> = {
  opening: "Abrindo",
  open: "Aberto",
  closing: "Fechando",
  closed: "Fechado",
};
