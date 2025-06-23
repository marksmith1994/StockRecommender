import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error-message',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="error-container">
      <div class="error-icon">⚠️</div>
      <h3>{{ title }}</h3>
      <p>{{ message }}</p>
      <button 
        *ngIf="showRetry" 
        class="retry-btn" 
        (click)="onRetry.emit()">
        {{ retryText }}
      </button>
    </div>
  `,
  styles: [`
    .error-container {
      text-align: center;
      padding: 2rem;
      background: #fff3cd;
      border: 1px solid #ffeaa7;
      border-radius: 12px;
      margin: 1rem 0;
    }

    .error-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    h3 {
      color: #856404;
      margin-bottom: 0.5rem;
    }

    p {
      color: #856404;
      margin-bottom: 1rem;
    }

    .retry-btn {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 600;
      transition: all 0.3s ease;
    }

    .retry-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
    }
  `]
})
export class ErrorMessageComponent {
  @Input() title: string = 'Oops! Something went wrong';
  @Input() message: string = 'An error occurred. Please try again.';
  @Input() showRetry: boolean = true;
  @Input() retryText: string = 'Try Again';
  @Output() onRetry = new EventEmitter<void>();
} 