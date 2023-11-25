import { Customer } from './../../models/customer.model';
import { Component, OnInit, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { AddCustomer } from '../../models/add-customer.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-customer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-customer.component.html',
  styleUrl: './add-customer.component.css',
})
export class AddCustomerComponent implements OnInit {
  form!: FormGroup;
  model!: AddCustomer;

  constructor(private customer: CustomerService, private router: Router) {
    this.model = {
      name: '',
    };
  }
  ngOnInit() {}

  saveCustomer(customerForm: any) {
    debugger;
    this.model = customerForm.value;
    // Call the service to save the new customer
    this.customer.createCustomer(this.model).subscribe({
      next: (response) => {
        // Handle success, e.g., show a success message
        console.log('Customer created successfully:', response);

        this.router.navigate(['/customers']);

        // Clear the input field after successful creation
      },
      error: (error) => {
        // Handle error, e.g., show an error message
        console.error('Error creating customer:', error);
      },
    });
  }
}
