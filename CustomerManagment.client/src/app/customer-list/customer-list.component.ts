import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../models/customer.model';
import { AddresssService } from '../../services/address.service';
import { Address } from '../../models/address.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.css',
})
export class CustomerListComponent implements OnInit {
  customers: Customer[] = [];
  address: Address[] = [];
  customerid: Customer | any;
  constructor(
    private customerService: CustomerService,
    private addressService: AddresssService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.loadCustomers();
  }
  loadCustomers() {
    this.customerService.getCustomers().subscribe({
      next: (data) => {
        this.customers = data;
      },
      error: (error) => {
        console.error('Error loading customers', error);
      },
    });
  }

  GetAddreess(id: number) {
    debugger;

    this.addressService.getAddressByCustomerId(id).subscribe({
      next: (val) => {
        this.address = val;
      },
    });
  }

  Delete(id: number) {
    this.customerService.deleteCustomer(id).subscribe({
      next: (value) => {},
      complete: () => {
        alert('the user is Deleted');
        window.location.reload();
      },
    });
  }

  Edit(id: number) {

    this.router.navigate(['/update-customer', id]);
  }
}
