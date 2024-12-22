import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-summary-box',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './summary-box.component.html',
  styleUrls: ['./summary-box.component.scss'],
})
export class SummaryBoxComponent {
  @Input() items: { total: number }[] = []; // Receive items array from parent
  subtotal: number = 0;
  taxRate: number = 10; // Default tax percentage
  grandTotal: number = 0;

  ngOnChanges(): void {
    this.calculateTotals();
  }

  calculateTotals(): void {
    this.subtotal = this.items.reduce((sum, item) => sum + item.total, 0);
    this.calculateGrandTotal();
  }

  calculateGrandTotal(): void {
    this.grandTotal = this.subtotal + (this.subtotal * this.taxRate) / 100;
  }
}
