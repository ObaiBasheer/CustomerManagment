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
    if (this.model.name != '') {
      // Call the service to save the new customer
      this.customer.createCustomer(this.model).subscribe({
        next: (response) => {
          console.log('Customer created successfully:', response);

          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Error creating customer:', error);
        },
      });
    } else {
      alert('Please add customer name');
    }
  }
}
