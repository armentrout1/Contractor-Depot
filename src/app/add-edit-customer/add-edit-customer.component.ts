import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-edit-customer',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="form-container">
      <h2>{{ customer?.id ? 'Edit Customer' : 'Add Customer' }}</h2>
      <form (ngSubmit)="onSubmit()">
        <label for="name">Name</label>
        <input
          type="text"
          id="name"
          [(ngModel)]="customer.name"
          name="name"
          required
        />

        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          [(ngModel)]="customer.email"
          name="email"
          required
        />

        <label for="phone">Phone</label>
        <input
          type="text"
          id="phone"
          [(ngModel)]="customer.phone"
          name="phone"
          required
        />

        <label for="address">Address</label>
        <input
          type="text"
          id="address"
          [(ngModel)]="customer.address"
          name="address"
          required
        />

        <div class="form-actions">
          <button type="submit">Save</button>
          <button type="button" (click)="onCancel()">Cancel</button>
        </div>
      </form>
    </div>
  `,
  styleUrls: ['./add-edit-customer.component.scss'],
})
export class AddEditCustomerComponent {
  @Input() customer: any = { id: null, name: '', email: '', phone: '', address: '' };
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  onSubmit() {
    this.save.emit(this.customer); // Emit the save event to parent when "Save" is clicked
  }

  onCancel() {
    this.cancel.emit(); // Emit the cancel event to parent when "Cancel" is clicked
  }
}
