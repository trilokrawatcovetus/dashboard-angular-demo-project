import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { Transaction } from '../../models/transaction.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-transactions-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transactions-table.component.html',
  styleUrls: ['./transactions-table.component.css']
})
export class TransactionsTableComponent implements OnInit, OnDestroy {
  transactions: Transaction[] = [];
  filteredTransactions: Transaction[] = [];
  displayedTransactions: Transaction[] = [];
  searchTerm = '';

  // Sorting
  sortColumn = 'date';
  sortDirection = 'desc';

  // Pagination
  itemsPerPage = 5;
  currentPage = 1;
  totalPages = 1;
  pages: number[] = [];
  startIndex = 0;
  endIndex = 0;

  private subscription: Subscription | null = null;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.subscription = this.dataService.filteredTransactions$.subscribe(transactions => {
      this.filteredTransactions = transactions;
      this.sortData();
      this.updatePagination();
    });

    this.dataService.getTransactions().subscribe(transactions => {
      this.transactions = transactions;
      this.dataService.filterTransactions('');
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onSearch(): void {
    this.dataService.filterTransactions(this.searchTerm);
    this.currentPage = 1;
  }

  sortBy(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.sortData();
  }

  sortData(): void {
    this.filteredTransactions.sort((a, b) => {
      let valueA: any;
      let valueB: any;

      switch (this.sortColumn) {
        case 'date':
          valueA = new Date(a.date).getTime();
          valueB = new Date(b.date).getTime();
          break;
        case 'customer':
          valueA = a.customer.toLowerCase();
          valueB = b.customer.toLowerCase();
          break;
        case 'amount':
          valueA = a.amount;
          valueB = b.amount;
          break;
        case 'status':
          valueA = a.status.toLowerCase();
          valueB = b.status.toLowerCase();
          break;
        case 'type':
          valueA = a.type.toLowerCase();
          valueB = b.type.toLowerCase();
          break;
        default:
          valueA = a[this.sortColumn as keyof Transaction];
          valueB = b[this.sortColumn as keyof Transaction];
      }

      const comparison = valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
      return this.sortDirection === 'asc' ? comparison : -comparison;
    });

    this.updatePagination();
  }

  getSortIcon(column: string): string {
    if (this.sortColumn !== column) {
      return 'bi-chevron-expand';
    }
    return this.sortDirection === 'asc' ? 'bi-chevron-up' : 'bi-chevron-down';
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Completed': return 'bg-success';
      case 'Processing': return 'bg-primary';
      case 'Refunded': return 'bg-danger';
      default: return 'bg-secondary';
    }
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredTransactions.length / this.itemsPerPage);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);

    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages || 1;
    }

    this.startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.endIndex = Math.min(this.startIndex + this.itemsPerPage, this.filteredTransactions.length);

    this.displayedTransactions = this.filteredTransactions.slice(this.startIndex, this.endIndex);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
    }
  }
}