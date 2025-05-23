import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Transaction } from '../models/transaction.model';
import { Metric } from '../models/metric.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private metrics: Metric[] = [
    { id: 1, name: 'Sales Revenue', value: 54890, currency: '$', icon: 'bi-currency-dollar', trend: 12.5, color: 'primary' },
    { id: 2, name: 'Active Users', value: 9432, icon: 'bi-people-fill', trend: 8.3, color: 'info' },
    { id: 3, name: 'Orders', value: 1243, icon: 'bi-cart-fill', trend: -4.7, color: 'success' }
  ];

  private transactions: Transaction[] = [
    { id: 1, date: new Date('2023-12-15'), customer: 'John Smith', amount: 1299.99, status: 'Completed', type: 'Purchase' },
    { id: 2, date: new Date('2023-12-14'), customer: 'Emily Johnson', amount: 849.50, status: 'Processing', type: 'Purchase' },
    { id: 3, date: new Date('2023-12-14'), customer: 'Michael Brown', amount: 74.99, status: 'Completed', type: 'Subscription' },
    { id: 4, date: new Date('2023-12-13'), customer: 'Sarah Wilson', amount: 299.95, status: 'Completed', type: 'Purchase' },
    { id: 5, date: new Date('2023-12-12'), customer: 'David Miller', amount: 599.99, status: 'Refunded', type: 'Purchase' },
    { id: 6, date: new Date('2023-12-11'), customer: 'Jessica Taylor', amount: 129.99, status: 'Completed', type: 'Purchase' },
    { id: 7, date: new Date('2023-12-10'), customer: 'Thomas Anderson', amount: 49.99, status: 'Completed', type: 'Subscription' },
    { id: 8, date: new Date('2023-12-09'), customer: 'Lisa Martinez', amount: 899.95, status: 'Processing', type: 'Purchase' },
    { id: 9, date: new Date('2023-12-08'), customer: 'Robert Clark', amount: 199.50, status: 'Completed', type: 'Purchase' },
    { id: 10, date: new Date('2023-12-07'), customer: 'Jennifer Lewis', amount: 74.99, status: 'Refunded', type: 'Subscription' },
    { id: 11, date: new Date('2023-12-06'), customer: 'Kevin Walker', amount: 159.99, status: 'Completed', type: 'Purchase' },
    { id: 12, date: new Date('2023-12-05'), customer: 'Amanda White', amount: 1499.99, status: 'Completed', type: 'Purchase' }
  ];

  private monthlyData = [
    { month: 'Jan', sales: 42500, users: 6800, orders: 980 },
    { month: 'Feb', sales: 39800, users: 7200, orders: 920 },
    { month: 'Mar', sales: 45200, users: 7600, orders: 1050 },
    { month: 'Apr', sales: 48900, users: 8100, orders: 1120 },
    { month: 'May', sales: 52100, users: 8500, orders: 1190 },
    { month: 'Jun', sales: 49700, users: 8300, orders: 1150 },
    { month: 'Jul', sales: 51800, users: 8700, orders: 1210 },
    { month: 'Aug', sales: 54300, users: 9100, orders: 1280 },
    { month: 'Sep', sales: 56200, users: 9400, orders: 1320 },
    { month: 'Oct', sales: 53600, users: 9200, orders: 1260 },
    { month: 'Nov', sales: 56900, users: 9500, orders: 1340 },
    { month: 'Dec', sales: 54890, users: 9432, orders: 1243 }
  ];

  private _filteredTransactions = new BehaviorSubject<Transaction[]>(this.transactions);
  filteredTransactions$ = this._filteredTransactions.asObservable();

  getMetrics(): Observable<Metric[]> {
    return of(this.metrics);
  }

  getTransactions(): Observable<Transaction[]> {
    return of(this.transactions);
  }

  getMonthlyData(): Observable<any[]> {
    return of(this.monthlyData);
  }

  filterTransactions(searchTerm: string): void {
    if (!searchTerm) {
      this._filteredTransactions.next(this.transactions);
      return;
    }
    
    const filtered = this.transactions.filter(transaction => 
      transaction.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.amount.toString().includes(searchTerm)
    );
    
    this._filteredTransactions.next(filtered);
  }
}