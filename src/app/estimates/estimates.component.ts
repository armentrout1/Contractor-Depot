import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-estimates',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule],
  templateUrl: './estimates.component.html',
  styleUrls: ['./estimates.component.scss'],
})
export class EstimatesComponent {
  estimates = [
    {
      id: 101,
      customerName: 'John Doe',
      description: 'Kitchen Remodel',
      amount: 12500,
      status: 'Pending',
    },
    {
      id: 102,
      customerName: 'Jane Smith',
      description: 'Bathroom Renovation',
      amount: 8500,
      status: 'Approved',
    },
    {
      id: 103,
      customerName: 'Bob Johnson',
      description: 'Deck Installation',
      amount: 5000,
      status: 'Declined',
    },
  ];

  filteredEstimates = [...this.estimates];
  searchQuery = '';
  selectedStatus = '';
  currentPage = 1;
  itemsPerPage = 5;
  selectedEstimate: any = null;

  get totalPages() {
    return Math.ceil(this.filteredEstimates.length / this.itemsPerPage);
  }

  get paginatedEstimates() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredEstimates.slice(start, start + this.itemsPerPage);
  }

  filterEstimates() {
    this.filteredEstimates = this.estimates.filter(
      (estimate) =>
        estimate.description.toLowerCase().includes(this.searchQuery.toLowerCase()) &&
        (this.selectedStatus ? estimate.status === this.selectedStatus : true)
    );
  }

  filterByStatus() {
    this.filterEstimates();
  }

  previousPage() {
    if (this.currentPage > 1) this.currentPage--;
  }

  nextPage() {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }

  createEstimate() {
    console.log('Navigate to Create Estimate page');
  }

  openProductServices() {
    console.log('Navigate to Products & Services page');
  }

  uploadCSV() {
    console.log('Upload CSV clicked');
  }

  exportAsPDF() {
    console.log('Export as PDF clicked');
  }

  exportEstimates() {
    const csvContent = this.filteredEstimates
      .map((e) => `${e.id},${e.customerName},${e.description},${e.amount},${e.status}`)
      .join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'estimates.csv';
    a.click();
  }

  editEstimate(estimate: any) {
    console.log('Editing estimate:', estimate);
  }

  duplicateEstimate(estimate: any) {
    console.log('Duplicating estimate:', estimate);
  }

  deleteEstimate(estimate: any) {
    console.log('Deleting estimate:', estimate);
  }

  viewDetails(estimate: any) {
    this.selectedEstimate = estimate;
  }

  closeDetails() {
    this.selectedEstimate = null;
  }
}
