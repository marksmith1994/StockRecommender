import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';

// Standalone components
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';

// Standalone pipes
import { GbpPipe } from './pipes/currency.pipe';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    // Import standalone components and pipes
    ErrorMessageComponent,
    LoadingSpinnerComponent,
    GbpPipe
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    // Export standalone components and pipes
    ErrorMessageComponent,
    LoadingSpinnerComponent,
    GbpPipe
  ]
})
export class SharedModule { }
