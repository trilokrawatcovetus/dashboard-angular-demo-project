import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MetricCardComponent } from '../../components/metric-card/metric-card.component';
import { DataChartComponent } from '../../components/data-chart/data-chart.component';
import { TransactionsTableComponent } from '../../components/transactions-table/transactions-table.component';
import { DataService } from '../../services/data.service';
import { Metric } from '../../models/metric.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MetricCardComponent,
    DataChartComponent,
    TransactionsTableComponent,
    RouterLink
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  metrics: Metric[] = [];

  constructor(private dataService: DataService) {
    this.dataService.getMetrics().subscribe(data => {
      this.metrics = data;
    });
  }
}