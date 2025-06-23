import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Dashboard Components
import { DashboardComponent } from './dashboard.component';
import { StockCardComponent } from './components/stock-card/stock-card.component';
import { PortfolioSummaryComponent } from './components/portfolio-summary/portfolio-summary.component';
import { AllocationCardComponent } from './components/allocation-card/allocation-card.component';

// Shared Components
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { ErrorMessageComponent } from '../../shared/components/error-message/error-message.component';

// Material Modules
import { MaterialModule } from '../../shared/material/material.module';

@NgModule({
  declarations: [
    DashboardComponent,
    StockCardComponent,
    PortfolioSummaryComponent,
    AllocationCardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { } 