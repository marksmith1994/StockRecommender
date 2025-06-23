import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Core Services
import { StockService } from '../../core/services/stock.service';
import { CurrencyService } from '../../core/services/currency.service';
import { SentimentService } from '../../core/services/sentiment.service';
import { PortfolioService, PortfolioRecommendation } from '../../core/services/portfolio.service';

// Models
import { Stock } from '../../models/stock';

// Presentational Components
import { StockCardComponent } from './components/stock-card/stock-card.component';
import { PortfolioSummaryComponent } from './components/portfolio-summary/portfolio-summary.component';
import { AllocationCardComponent } from './components/allocation-card/allocation-card.component';

// Shared Components
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { ErrorMessageComponent } from '../../shared/components/error-message/error-message.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    StockCardComponent,
    PortfolioSummaryComponent,
    AllocationCardComponent,
    LoadingSpinnerComponent,
    ErrorMessageComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  // Stock data
  stocks: Stock[] = [];
  filteredStocks: Stock[] = [];
  searchTerm: string = '';
  
  // Loading states
  loading: boolean = false;
  generatingPortfolio: boolean = false;
  
  // Error handling
  error: string = '';
  
  // Currency data
  exchangeRate: number = 0.79; // Default fallback rate
  lastRateUpdate: Date | null = null;
  refreshingRate: boolean = false;
  
  // Portfolio optimization
  portfolioAmount: number = 10000;
  riskTolerance: 'Conservative' | 'Moderate' | 'Aggressive' = 'Moderate';
  portfolioRecommendation: PortfolioRecommendation | null = null;

  constructor(
    private stockService: StockService,
    private currencyService: CurrencyService,
    private sentimentService: SentimentService,
    private portfolioService: PortfolioService
  ) {}

  ngOnInit(): void {
    this.loadExchangeRate();
    this.loadStocks();
  }

  // Currency methods
  loadExchangeRate(): void {
    this.exchangeRate = this.currencyService.getCachedRate();
    this.lastRateUpdate = this.currencyService.getLastUpdateTime();
    
    this.currencyService.getExchangeRate().subscribe(rate => {
      this.exchangeRate = rate;
      this.lastRateUpdate = this.currencyService.getLastUpdateTime();
    });
  }

  refreshExchangeRate(): void {
    this.refreshingRate = true;
    this.currencyService.refreshRate().subscribe({
      next: (rate) => {
        this.exchangeRate = rate;
        this.lastRateUpdate = this.currencyService.getLastUpdateTime();
        this.refreshingRate = false;
      },
      error: (err) => {
        this.refreshingRate = false;
      }
    });
  }

  // Stock methods
  loadStocks(): void {
    this.loading = true;
    this.error = '';

    this.stockService.getStocks().subscribe({
      next: (data) => {
        this.stocks = data;
        this.filteredStocks = data;
        this.loadSentimentForStocks(data);
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load stocks. Please try again.';
        this.loading = false;
      }
    });
  }

  loadSentimentForStocks(stocks: Stock[]): void {
    stocks.forEach(stock => {
      this.sentimentService.getSentiment(stock.symbol).subscribe(sentimentData => {
        stock.sentiment = {
          score: sentimentData.score,
          label: this.sentimentService.getSentimentLabel(sentimentData.score),
          emoji: this.sentimentService.getSentimentEmoji(sentimentData.score),
          color: this.sentimentService.getSentimentColor(sentimentData.score),
          confidence: sentimentData.confidence,
          sources: sentimentData.sources
        };
      });
    });
  }

  onSearchChange(): void {
    if (!this.searchTerm.trim()) {
      this.filteredStocks = this.stocks;
      return;
    }

    const searchLower = this.searchTerm.toLowerCase();
    this.filteredStocks = this.stocks.filter(stock => 
      stock.symbol.toLowerCase().includes(searchLower) ||
      (stock.name && stock.name.toLowerCase().includes(searchLower))
    );
  }

  searchStocks(): void {
    if (!this.searchTerm.trim()) {
      this.loadStocks();
      return;
    }

    this.loading = true;
    this.error = '';

    this.stockService.getStock(this.searchTerm.trim().toUpperCase()).subscribe({
      next: (data) => {
        this.stocks = [data];
        this.filteredStocks = [data];
        this.loadSentimentForStocks([data]);
        this.loading = false;
      },
      error: (err) => {
        this.error = `Stock "${this.searchTerm}" not found. Please try a different symbol.`;
        this.loading = false;
      }
    });
  }

  // Portfolio methods
  generatePortfolio(): void {
    this.generatingPortfolio = true;
    this.portfolioRecommendation = null;

    this.portfolioService.generatePortfolio(this.portfolioAmount, this.riskTolerance)
      .subscribe({
        next: (portfolio) => {
          this.portfolioRecommendation = portfolio;
          this.generatingPortfolio = false;
        },
        error: (err) => {
          console.error('Error generating portfolio:', err);
          this.generatingPortfolio = false;
        }
      });
  }

  getRiskDescription(): string {
    const descriptions = {
      Conservative: 'Lower risk, stable returns, suitable for near-term goals',
      Moderate: 'Balanced risk and return, suitable for medium-term goals',
      Aggressive: 'Higher risk, higher potential returns, suitable for long-term goals'
    };
    return descriptions[this.riskTolerance];
  }

  // Event handlers
  onStockClick(stock: Stock): void {
    // Handle stock card click - could open detailed view, etc.
    // Future enhancement: Navigate to detailed stock view
  }

  onRetry(): void {
    this.loadStocks();
  }

  // Helper methods
  convertToGBP(usdAmount?: number): number {
    if (!usdAmount) return 0;
    return this.currencyService.convertUSDToGBP(usdAmount);
  }

  formatGBP(amount: number): string {
    return this.currencyService.formatGBP(amount);
  }
} 