import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StockCardComponent } from './stock-card.component';
import { Stock } from '../../../../models/stock';

const mockStock: Stock = {
  symbol: 'AAPL',
  name: 'Apple Inc.',
  currentPrice: 200,
  priceChangePercent: 1.5,
  dailyHigh: 205,
  dailyLow: 195,
  volume: 1000000,
  isRecommended: true,
  confidence: 95,
  sentiment: {
    score: 0.8,
    label: 'Positive',
    emoji: '😃',
    color: '#4caf50',
    confidence: 0.9,
    sources: { news: 5, social: 10, reddit: 2 }
  },
  lastUpdated: new Date().toISOString()
};

describe('StockCardComponent', () => {
  let component: StockCardComponent;
  let fixture: ComponentFixture<StockCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockCardComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(StockCardComponent);
    component = fixture.componentInstance;
    component.stock = mockStock;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render stock symbol and name', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.stock-symbol')?.textContent).toContain('AAPL');
    expect(compiled.querySelector('.stock-name')?.textContent).toContain('Apple Inc.');
  });
}); 