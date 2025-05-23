export interface Transaction {
  id: number;
  date: Date;
  customer: string;
  amount: number;
  status: string;
  type: string;
}