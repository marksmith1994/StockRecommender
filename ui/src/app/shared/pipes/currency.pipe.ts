import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gbp',
  standalone: true
})
export class GbpPipe implements PipeTransform {
  transform(value: number | undefined | null): string {
    if (value === undefined || value === null || isNaN(value)) {
      return '£0.00';
    }
    
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP'
    }).format(value);
  }
} 