import { Component } from '@angular/core';
import { HomeBarComponent } from './home-bar/home-bar.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router'; // Import RouterModule
import { EstimateHeaderComponent } from './components/estimate-header/estimate-header.component';
import { EstimateTableComponent } from './components/estimate-table/estimate-table.component';
import { SummaryBoxComponent } from './components/summary-box/summary-box.component';
import { EstimateFooterComponent } from "./components/estimate-footer/estimate-footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule, // <-- Ensure RouterModule is imported
    HomeBarComponent,
    NavBarComponent,
    EstimateHeaderComponent,
    EstimateTableComponent,
    SummaryBoxComponent,
    EstimateFooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title: string = 'crm-app';

  // Define the `items` property to store estimate line items
  items: { total: number }[] = [];

  // Method to update `items` when the Estimate Table emits data
  updateItems(updatedItems: { total: number }[]): void {
    this.items = updatedItems;
  }

  // Button click handler (optional functionality)
  onButtonClick() {
    alert('Button Clicked!');
  }
}
