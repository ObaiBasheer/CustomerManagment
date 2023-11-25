import { AddCustomerComponent } from './add-customer/add-customer.component';
import { AddressListComponent } from './address-list/address-list.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', component: CustomerListComponent },
  { path: 'add-customer', component: AddCustomerComponent },
  { path: 'Address', component: AddressListComponent },
];
