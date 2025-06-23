import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';
import { Stock } from '../../../../models/stock';

@Component({
  selector: 'app-stock-card',
  standalone: true,
  imports: [CommonModule, SharedModule],
  template: `
    <div class="stock-card" 
         [class.recommended]="stock.isRecommended"
         [style.border-left-color]="stock.sentiment?.color">
      
      <!-- Stock Header -->
      <div class="stock-header">
        <div class="stock-info">
          <h3 class="stock-symbol">{{ stock.symbol }}</h3>
          <p class="stock-name">{{ stock.name || 'N/A' }}</p>
        </div>
        <div class="stock-price">
          <span class="current-price">{{ stock.currentPrice | gbp }}</span>
          <span class="price-change"
                [class.positive]="stock.priceChangePercent && stock.priceChangePercent > 0"
                [class.negative]="stock.priceChangePercent && stock.priceChangePercent < 0">
            {{ stock.priceChangePercent ? (stock.priceChangePercent > 0 ? '+' : '') + stock.priceChangePercent.toFixed(2) + '%' : 'N/A' }}
          </span>
        </div>
      </div>

      <!-- AI Sentiment Badge -->
      <div *ngIf="stock.sentiment" 
           class="sentiment-badge" 
           [style.background-color]="stock.sentiment.color + '20'">
        <span class="sentiment-emoji">{{ stock.sentiment.emoji }}</span>
        <span class="sentiment-label">{{ stock.sentiment.label }}</span>
        <span class="sentiment-score">({{ (stock.sentiment.score * 100).toFixed(0) }}%)</span>
        <span class="sentiment-confidence">Confidence: {{ (stock.sentiment.confidence * 100).toFixed(0) }}%</span>
      </div>

      <!-- Stock Details -->
      <div class="stock-details">
        <div class="detail-row">
          <span class="detail-label">Daily High:</span>
          <span class="detail-value">{{ stock.dailyHigh | gbp }}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Daily Low:</span>
          <span class="detail-value">{{ stock.dailyLow | gbp }}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Volume:</span>
          <span class="detail-value">{{ stock.volume ? (stock.volume / 1000000).toFixed(1) + 'M' : 'N/A' }}</span>
        </div>
      </div>

      <!-- Sentiment Sources -->
      <div *ngIf="stock.sentiment" class="sentiment-sources">
        <div class="source-item">
          <span class="source-icon">📰</span>
          <span class="source-count">{{ stock.sentiment.sources.news }} news</span>
        </div>
        <div class="source-item">
          <span class="source-icon">🐦</span>
          <span class="source-count">{{ stock.sentiment.sources.social }} social</span>
        </div>
        <div class="source-item">
          <span class="source-icon">💬</span>
          <span class="source-count">{{ stock.sentiment.sources.reddit }} reddit</span>
        </div>
      </div>

      <!-- Recommendation Badge -->
      <div *ngIf="stock.isRecommended" class="recommendation-badge">
        <span class="badge-icon">⭐</span>
        <span class="badge-text">Recommended</span>
        <span class="confidence">({{ stock.confidence }}% confidence)</span>
      </div>

      <!-- Last Updated -->
      <div class="last-updated">
        <small>Updated: {{ stock.lastUpdated | date:'short' }}</small>
      </div>
    </div>
  `,
  styleUrls: ['./stock-card.component.scss']
})
export class StockCardComponent {
  @Input() stock!: Stock;
  @Output() stockClick = new EventEmitter<Stock>();

  onStockClick(): void {
    this.stockClick.emit(this.stock);
  }
} 