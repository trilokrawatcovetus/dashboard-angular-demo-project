import { Component, OnInit, OnDestroy } from '@angular/core';
import { Chart, registerables, ChartDataset } from 'chart.js';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { ThemeService } from '../../services/theme.service';
import { Subscription } from 'rxjs';

// Register Chart.js components
Chart.register(...registerables);

@Component({
  selector: 'app-data-chart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './data-chart.component.html',
  styleUrls: ['./data-chart.component.css']
})
export class DataChartComponent implements OnInit, OnDestroy {
  selectedMetric = 'sales';
  chart: Chart | undefined;
  monthlyData: any[] = [];
  isDarkMode = false;
  private subscriptions: Subscription[] = [];

  constructor(
    private dataService: DataService,
    private themeService: ThemeService
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.dataService.getMonthlyData().subscribe(data => {
        this.monthlyData = data;
        this.initChart();
      })
    );

    this.subscriptions.push(
      this.themeService.isDarkMode$.subscribe(isDark => {
        this.isDarkMode = isDark;
        if (this.chart) {
          this.updateChartTheme();
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    if (this.chart) {
      this.chart.destroy();
    }
  }

  initChart(): void {
    const ctx = document.getElementById('performanceChart') as HTMLCanvasElement;
    if (!ctx) return;

    const labels = this.monthlyData.map(item => item.month);
    const data = this.monthlyData.map(item => item[this.selectedMetric]);

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: this.getMetricLabel(),
            data: data,
            borderColor: this.getMetricColor(),
            backgroundColor: this.getMetricBackgroundColor(),
            tension: 0.4,
            fill: true,
            pointStyle: 'circle',
            pointRadius: 4,
            pointHoverRadius: 6,
            pointBorderWidth: 1,
            pointBorderColor: '#fff',
            pointBackgroundColor: this.getMetricColor()
          } as ChartDataset<'line'>
        ]
      },
      options: this.getChartOptions()
    });
  }

  updateChart(): void {
    if (!this.chart) return;

    const data = this.monthlyData.map(item => item[this.selectedMetric]);
    const dataset = this.chart.data.datasets[0] as ChartDataset<'line'>;

    dataset.label = this.getMetricLabel();
    dataset.data = data;
    dataset.borderColor = this.getMetricColor();
    dataset.backgroundColor = this.getMetricBackgroundColor();
    dataset.pointBackgroundColor = this.getMetricColor();

    this.chart.update();
  }

  updateChartTheme(): void {
    if (!this.chart) return;

    // Update options for dark/light mode
    this.chart.options = this.getChartOptions();
    this.chart.data.datasets[0].backgroundColor = this.getMetricBackgroundColor();

    this.chart.update();
  }

  getMetricLabel(): string {
    switch (this.selectedMetric) {
      case 'sales': return 'Sales Revenue';
      case 'users': return 'Active Users';
      case 'orders': return 'Orders';
      default: return 'Sales Revenue';
    }
  }

  getMetricColor(): string {
    switch (this.selectedMetric) {
      case 'sales': return '#0d6efd'; // primary
      case 'users': return '#0dcaf0'; // info
      case 'orders': return '#198754'; // success
      default: return '#0d6efd';
    }
  }

  getMetricBackgroundColor(): string {
    const color = this.getMetricColor();
    return `${color}33`; // 20% opacity
  }

  getChartOptions(): any {
    const textColor = this.isDarkMode ? '#f8f9fa' : '#212529';
    const gridColor = this.isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';

    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          labels: {
            color: textColor
          }
        },
        tooltip: {
          mode: 'index',
          intersect: false,
          backgroundColor: this.isDarkMode ? '#343a40' : 'rgba(255, 255, 255, 0.9)',
          titleColor: this.isDarkMode ? '#f8f9fa' : '#212529',
          bodyColor: this.isDarkMode ? '#f8f9fa' : '#212529',
          borderColor: this.isDarkMode ? '#495057' : '#e9ecef',
          borderWidth: 1,
          padding: 10,
          displayColors: true,
          callbacks: {
            label: (context: any) => {
              let label = context.dataset.label || '';
              if (label) {
                label += ': ';
              }
              if (context.parsed.y !== null) {
                if (this.selectedMetric === 'sales') {
                  label += '$' + context.parsed.y.toLocaleString();
                } else {
                  label += context.parsed.y.toLocaleString();
                }
              }
              return label;
            }
          }
        }
      },
      scales: {
        x: {
          grid: {
            color: gridColor
          },
          ticks: {
            color: textColor
          }
        },
        y: {
          grid: {
            color: gridColor
          },
          ticks: {
            color: textColor,
            callback: (value: any) => {
              if (this.selectedMetric === 'sales') {
                return '$' + value.toLocaleString();
              }
              return value.toLocaleString();
            }
          }
        }
      }
    };
  }
}