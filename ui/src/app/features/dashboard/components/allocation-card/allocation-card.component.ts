import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';
import { PortfolioAllocation } from '../../../../core/services/portfolio.service';

@Component({
  selector: 'app-allocation-card',
  standalone: true,
  imports: [CommonModule, SharedModule],
  template: `
    <div class="allocation-card">
      <div class="allocation-header">
        <div class="stock-info">
          <h4>{{ allocation.symbol }}</h4>
          <p>{{ allocation.name }}</p>
        </div>
        <div class="allocation-percentage">
          {{ allocation.allocation.toFixed(1) }}%
        </div>
      </div>
      
      <div class="allocation-details">
        <div class="detail-row">
          <span>Investment:</span>
          <span>{{ allocation.amount | gbp }}</span>
        </div>
        <div class="detail-row">
          <span>Shares:</span>
          <span>{{ allocation.shares }}</span>
        </div>
        <div class="detail-row">
          <span>Expected Return:</span>
          <span class="return-value">{{ allocation.expectedReturn.toFixed(1) }}%</span>
        </div>
      </div>
      
      <div class="allocation-footer">
        <span class="risk-badge" [style.background-color]="getRiskColor(allocation.riskLevel)">
          {{ allocation.riskLevel }} Risk
        </span>
        <p class="reasoning">{{ allocation.reasoning }}</p>
      </div>
    </div>
  `,
  styleUrls: ['./allocation-card.component.scss']
})
export class AllocationCardComponent {
  @Input() allocation!: PortfolioAllocation;

  getRiskColor(riskLevel: string): string {
    switch (riskLevel) {
      case 'Low': return '#4caf50';
      case 'Medium': return '#ff9800';
      case 'High': return '#f44336';
      default: return '#757575';
    }
  }
} 