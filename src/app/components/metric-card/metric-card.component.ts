import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Metric } from '../../models/metric.model';

@Component({
  selector: 'app-metric-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './metric-card.component.html',
  styleUrls: ['./metric-card.component.css']
})
export class MetricCardComponent {
  @Input() metric!: Metric;
  Math = Math; // Make Math available in the template
}