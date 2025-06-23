import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';
import { PortfolioRecommendation } from '../../../../core/services/portfolio.service';

@Component({
  selector: 'app-portfolio-summary',
  standalone: true,
  imports: [CommonModule, SharedModule],
  template: `
    <div class="portfolio-summary">
      <div class="summary-card">
        <h3>Portfolio Summary</h3>
        <div class="summary-stats">
          <div class="stat-item">
            <span class="stat-value">{{ portfolio.expectedAnnualReturn.toFixed(1) }}%</span>
            <span class="stat-label">Expected Return</span>
          </div>
          <div class="stat-item">
            <span class="stat-value risk-score" [style.color]="getRiskScoreColor(portfolio.riskScore)">
              {{ portfolio.riskScore }}/10
            </span>
            <span class="stat-label">Risk Score</span>
          </div>
          <div class="stat-item">
            <span class="stat-value diversification" [style.color]="getDiversificationColor(portfolio.diversification)">
              {{ portfolio.diversification }}/10
            </span>
            <span class="stat-label">Diversification</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">{{ portfolio.allocations.length }}</span>
            <span class="stat-label">Stocks</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./portfolio-summary.component.scss']
})
export class PortfolioSummaryComponent {
  @Input() portfolio!: PortfolioRecommendation;

  getRiskScoreColor(score: number): string {
    if (score <= 3) return '#4caf50';
    if (score <= 6) return '#ff9800';
    return '#f44336';
  }

  getDiversificationColor(score: number): string {
    if (score >= 8) return '#4caf50';
    if (score >= 6) return '#ff9800';
    return '#f44336';
  }
} 