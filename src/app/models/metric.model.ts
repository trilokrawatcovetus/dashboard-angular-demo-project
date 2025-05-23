export interface Metric {
  id: number;
  name: string;
  value: number;
  currency?: string;
  icon: string;
  trend: number;
  color: string;
}