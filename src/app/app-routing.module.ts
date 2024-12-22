import { Routes } from '@angular/router';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { EstimatesComponent } from './estimates/estimates.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { ChangeOrderComponent } from './change-order/change-order.component';
import {ProProfileComponent} from './pro-profile/pro-profile.component';

export const routes: Routes = [
  { path: 'customer-list', component: CustomerListComponent },
  { path: 'estimates', component: EstimatesComponent }, // Correct path for the estimate tool
  { path: 'invoices', component: InvoicesComponent },
  { path: 'schedule', component: ScheduleComponent },
  { path: 'change-order', component: ChangeOrderComponent },
  { path: '', redirectTo: 'customer-list', pathMatch: 'full' }, // Default route
  { path: '**', redirectTo: 'customer-list' }, // Wildcard route for 404
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // Default route
  { path: 'profile', component: ProProfileComponent }, // Profile route
];


