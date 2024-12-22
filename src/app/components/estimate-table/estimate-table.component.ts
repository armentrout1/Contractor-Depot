import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface EstimateItem {
  name: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

@Component({
  selector: 'app-estimate-table',
  standalone: true,
  templateUrl: './estimate-table.component.html',
  styleUrls: ['./estimate-table.component.scss'],
  imports: [CommonModule, FormsModule],
})
export class EstimateTableComponent {
  @Output() itemsChanged = new EventEmitter<EstimateItem[]>(); // Emit items to parent

  items: EstimateItem[] = [];

  addItem(): void {
    this.items.push({ name: '', quantity: 1, unitPrice: 0, total: 0 });
    this.emitItems();
  }

  removeItem(index: number): void {
    this.items.splice(index, 1);
    this.emitItems();
  }

  updateTotal(index: number): void {
    const item = this.items[index];
    item.total = item.quantity * item.unitPrice;
    this.emitItems();
  }

  emitItems(): void {
    this.itemsChanged.emit(this.items);
  }
}
