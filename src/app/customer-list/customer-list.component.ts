import { Component } from '@angular/core';
import { AddEditCustomerComponent } from '../add-edit-customer/add-edit-customer.component';
import { NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [NgIf, NgForOf, AddEditCustomerComponent, FormsModule],
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
})
export class CustomerListComponent {
  // Initial customer list
  customers = [
    { id: 1, name: 'John Doe', email: 'johndoe@example.com', phone: '123-456-7890', address: '123 Main St' },
    { id: 2, name: 'Jane Smith', email: 'janesmith@example.com', phone: '987-654-3210', address: '456 Oak Ave' },
  ];

  filteredCustomers = [...this.customers];
  showForm = false; // Controls the Add/Edit form visibility
  showDeleteConfirmation = false; // Controls the Delete confirmation modal
  selectedCustomer: any = null; // Holds the current customer being edited
  customerToDelete: any = null; // Holds the customer selected for deletion
  deleteInput = ''; // Stores the "yes" confirmation for deletion
  searchQuery = '';

  // Add Customer
  onAddCustomer() {
    this.resetModals(); // Close any other modals
    this.selectedCustomer = { id: null, name: '', email: '', phone: '', address: '' };
    this.showForm = true;
  }

  // Edit Customer
  onEditCustomer(customer: any) {
    this.resetModals(); // Close any other modals
    this.selectedCustomer = { ...customer };
    this.showForm = true;
  }

  // Delete Customer
  onDeleteCustomer(customer: any) {
    this.resetModals(); // Close any other modals
    this.customerToDelete = customer;
    this.deleteInput = ''; // Reset input field
    this.showDeleteConfirmation = true;
  }

  // Confirm Delete
  onConfirmDelete() {
    if (this.deleteInput.toLowerCase() === 'yes') {
      this.customers = this.customers.filter((c) => c.id !== this.customerToDelete.id);
      this.filteredCustomers = [...this.customers];
      this.resetModals(); // Close delete confirmation modal
    }
  }

  // Cancel Delete
  onCancelDelete() {
    this.resetModals();
  }

  // Save Customer
  onSaveCustomer(customer: any) {
    if (customer.id) {
      // Update existing customer
      const index = this.customers.findIndex((c) => c.id === customer.id);
      if (index !== -1) {
        this.customers[index] = customer;
      }
    } else {
      // Add new customer
      customer.id = this.customers.length + 1;
      this.customers.push(customer);
    }
    this.filteredCustomers = [...this.customers];
    this.resetModals(); // Close form
  }

  // Cancel Form
  onCancelForm() {
    this.resetModals();
  }

  // Filter Customers
  filterCustomers(event?: Event) {
    const query = event ? (event.target as HTMLInputElement).value.toLowerCase() : this.searchQuery.toLowerCase();
    this.filteredCustomers = this.customers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(query) ||
        customer.email.toLowerCase().includes(query) ||
        customer.phone.toLowerCase().includes(query) ||
        customer.address.toLowerCase().includes(query)
    );
  }

  // Reset all modals
  private resetModals() {
    this.showForm = false;
    this.showDeleteConfirmation = false;
    this.selectedCustomer = null;
    this.customerToDelete = null;
    this.deleteInput = '';
  }
}
